// What the site remembers for each reader: margin notes, drafts, exercise results and
// pages visited. Everything lands in this browser first so the page renders at once.
// Inside a Claude viewer that grants the `db` and `user` capabilities, the same data is
// kept in the reader's private store (data/users/<id>/...), which follows them across
// devices; the browser copy then acts as a cache. Anywhere else it stays in the browser.
//
// Cloud layout (private to each reader):
//   data/users/<id>/library               one doc: { visits: {key: ts}, results: {key: {...}}, drafts: {key: {...}} }
//   data/users/<id>/library/notes/<noteId> one doc per highlight or note
(function () {
  "use strict";
  const M = window.Marginalia;
  const LOCAL_KEY = "marginalia.memory.v1";

  const state = { notes: {}, visits: {}, results: {}, drafts: {} };
  const listeners = new Set();
  let mode = "browser"; // "browser" | "cloud"
  let cloud = null; // { libraryRef, notesRef }
  let libraryTimer = 0;

  function loadLocal() {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) Object.assign(state, JSON.parse(raw));
    } catch (e) {
      /* storage blocked: start empty */
    }
    // Drafts saved before this layer existed.
    const legacy = { "gsbs.kernel": "marginalia.gsbs.kernel-draft", "pb.pov": "marginalia.pb.pov-draft" };
    Object.entries(legacy).forEach(([key, old]) => {
      if (state.drafts[key]) return;
      const v = M.util.store.get(old);
      if (v) state.drafts[key] = { value: v, at: Date.now() };
    });
  }

  function saveLocal() {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      return false;
    }
  }

  function emit(kind) {
    listeners.forEach((fn) => {
      try {
        fn(kind);
      } catch (e) {
        console.error(e);
      }
    });
  }

  function dropCloud(e) {
    // A write the store refused (view-only reader, revoked grant): keep going in the browser.
    if (mode === "cloud") console.warn("Marginalia: keeping notes in this browser only.", e && e.code);
    mode = "browser";
    cloud = null;
    emit("mode");
  }

  // visits, results and drafts share one library document; coalesce bursts of changes.
  function scheduleLibraryWrite() {
    if (!cloud) return;
    clearTimeout(libraryTimer);
    libraryTimer = setTimeout(() => {
      if (!cloud) return;
      cloud.libraryRef
        .set({ visits: state.visits, results: state.results, drafts: state.drafts })
        .catch(dropCloud);
    }, 900);
  }

  async function connect() {
    const claude = window.claude;
    if (!claude || typeof claude.use !== "function") return;
    const [db, user] = await Promise.all([claude.use("db"), claude.use("user")]);
    if (!db || !user) return;
    const uid = await user.id();
    if (!uid) return;
    const libraryRef = db.doc(`data/users/${uid}/library`);
    const notesRef = libraryRef.collection("notes");
    let snap;
    let notes;
    try {
      [snap, notes] = await Promise.all([libraryRef.get(), notesRef.get()]);
    } catch (e) {
      return;
    }
    cloud = { libraryRef, notesRef };
    mode = "cloud";

    // Merge: the newer copy of each item wins; anything only local is uploaded.
    const remote = snap.exists ? snap.data() : {};
    ["visits", "results", "drafts"].forEach((k) => {
      const merged = { ...(remote[k] || {}) };
      Object.entries(state[k]).forEach(([key, val]) => {
        const r = merged[key];
        const tLocal = typeof val === "number" ? val : val && val.at;
        const tRemote = typeof r === "number" ? r : r && r.at;
        if (r === undefined || (tLocal || 0) > (tRemote || 0)) merged[key] = val;
      });
      state[k] = merged;
    });
    const remoteNotes = {};
    notes.docs.forEach((d) => (remoteNotes[d.id] = d.data()));
    const uploads = Object.values(state.notes).filter((n) => !remoteNotes[n.id] || (n.updatedAt || 0) > (remoteNotes[n.id].updatedAt || 0));
    state.notes = { ...remoteNotes };
    uploads.forEach((n) => (state.notes[n.id] = n));
    saveLocal();
    emit("all");
    scheduleLibraryWrite();
    for (const n of uploads) {
      if (!cloud) break;
      await notesRef.doc(n.id).set(n).catch(dropCloud);
    }

    // Live updates from the reader's other tabs and devices.
    notesRef.onSnapshot(
      (qs) => {
        const next = {};
        qs.docs.forEach((d) => (next[d.id] = d.data()));
        state.notes = next;
        saveLocal();
        emit("notes");
      },
      () => {}
    );
  }

  const newId = () => "n" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  M.memory = {
    get mode() {
      return mode;
    },
    onChange(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },

    /* Notes: { id, book, page, para, quote, note, createdAt, updatedAt } */
    notes(filter) {
      const all = Object.values(state.notes).sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
      if (!filter) return all;
      return all.filter((n) => (!filter.book || n.book === filter.book) && (!filter.page || n.page === filter.page));
    },
    addNote(fields) {
      const now = Date.now();
      const note = { id: newId(), note: "", createdAt: now, updatedAt: now, ...fields };
      state.notes[note.id] = note;
      saveLocal();
      emit("notes");
      if (cloud) cloud.notesRef.doc(note.id).set(note).catch(dropCloud);
      return note;
    },
    updateNote(id, fields) {
      const cur = state.notes[id];
      if (!cur) return;
      const next = { ...cur, ...fields, updatedAt: Date.now() };
      state.notes[id] = next;
      saveLocal();
      emit("notes");
      if (cloud) cloud.notesRef.doc(id).set(next).catch(dropCloud);
    },
    removeNote(id) {
      delete state.notes[id];
      saveLocal();
      emit("notes");
      if (cloud) cloud.notesRef.doc(id).delete().catch(dropCloud);
    },

    /* Visits: "<book>/<page>" -> last visit time */
    visit(book, page) {
      state.visits[`${book}/${page}`] = Date.now();
      saveLocal();
      scheduleLibraryWrite();
    },
    visited(book) {
      return Object.keys(state.visits)
        .filter((k) => k.startsWith(book + "/"))
        .map((k) => k.slice(book.length + 1));
    },

    /* Results: key -> { label, score, total, detail, at } */
    result(key, value) {
      state.results[key] = { ...value, at: Date.now() };
      saveLocal();
      scheduleLibraryWrite();
      emit("results");
    },
    results() {
      return { ...state.results };
    },

    /* Drafts: key -> { value, at }. Writes are coalesced while someone types. */
    draft(key) {
      return state.drafts[key] ? state.drafts[key].value : null;
    },
    setDraft(key, value) {
      state.drafts[key] = { value, at: Date.now() };
      const ok = saveLocal();
      scheduleLibraryWrite();
      return ok || mode === "cloud";
    },
    drafts() {
      return Object.fromEntries(Object.entries(state.drafts).map(([k, v]) => [k, v.value]));
    }
  };

  loadLocal();
  connect().catch(() => {});
})();
