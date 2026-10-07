#!/usr/bin/env python3
"""Bundle the site into one self-contained HTML file.

Inlines every local stylesheet and script that index.html references, so the
result can be opened or shared as a single file. Google Fonts stay as links.

    python3 tools/bundle.py                 # writes dist/marginalia.html
    python3 tools/bundle.py --fragment out.html
        # writes just the head links, styles and body content, without the
        # doctype/html/head/body wrapper, for hosts that add their own.
"""
import argparse
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent


def inline(html: str) -> str:
    def style(m):
        css = (ROOT / m.group(1)).read_text()
        return f"<style>\n{css}\n</style>"

    def script(m):
        js = (ROOT / m.group(1)).read_text()
        return f"<script>\n{js}\n</script>"

    html = re.sub(r'<link rel="stylesheet" href="(assets/[^"]+)">', style, html)
    return re.sub(r'<script src="(assets/[^"]+)"></script>', script, html)


def fragment(html: str) -> str:
    head = re.search(r"<head>(.*?)</head>", html, re.S).group(1)
    body = re.search(r"<body[^>]*>(.*?)</body>", html, re.S).group(1)
    head = re.sub(r"<meta[^>]*>\s*", "", head)
    return head.strip() + "\n" + body.strip() + "\n"


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("out", nargs="?", default=str(ROOT / "dist" / "marginalia.html"))
    parser.add_argument("--fragment", action="store_true", help="omit the document wrapper")
    args = parser.parse_args()

    html = inline((ROOT / "index.html").read_text())
    if args.fragment:
        html = fragment(html)
    out = pathlib.Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(html)
    print(f"wrote {out} ({len(html) // 1024} KB)")


if __name__ == "__main__":
    main()
