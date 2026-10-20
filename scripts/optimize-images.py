"""Generate optimised WebP derivatives of the curated original images.

Reads   scripts/image-selection.json
Source  docs/source-audit/assets/original/uploads/  (never modified)
Writes  public/images/<key>-<width>.webp
        src/data/images.json  (dimensions, srcset entries and alt text for the frontend)

Usage:  python scripts/optimize-images.py
"""
import json
import os

from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(ROOT, "docs", "source-audit", "assets", "original", "uploads")
OUT_DIR = os.path.join(ROOT, "public", "images")
DATA_OUT = os.path.join(ROOT, "src", "data", "images.json")
DEFAULT_WIDTHS = [480, 960, 1440]
QUALITY = 70


def main():
    with open(os.path.join(ROOT, "scripts", "image-selection.json"), encoding="utf-8") as fh:
        selection = json.load(fh)
    os.makedirs(OUT_DIR, exist_ok=True)
    for old in os.listdir(OUT_DIR):  # regenerate from scratch so no stale derivatives remain
        if old.endswith(".webp"):
            os.remove(os.path.join(OUT_DIR, old))
    manifest = {}
    total_in = total_out = 0

    for key, spec in selection.items():
        if key.startswith("_"):
            continue
        path = os.path.join(SRC_DIR, spec["src"])
        total_in += os.path.getsize(path)
        im = ImageOps.exif_transpose(Image.open(path))
        keep_alpha = spec.get("keepAlpha", False)
        im = im.convert("RGBA" if keep_alpha else "RGB")

        if "crop" in spec:
            l, t, r, b = spec["crop"]
            w, h = im.size
            im = im.crop((round(l * w), round(t * h), round(r * w), round(b * h)))

        w, h = im.size
        widths = sorted({min(x, w) for x in spec.get("widths", DEFAULT_WIDTHS)})
        entries = []
        for tw in widths:
            th = round(h * tw / w)
            out = im if tw == w else im.resize((tw, th), Image.LANCZOS)
            name = f"{key}-{tw}.webp"
            out.save(os.path.join(OUT_DIR, name), "WEBP", quality=QUALITY, method=6)
            total_out += os.path.getsize(os.path.join(OUT_DIR, name))
            entries.append({"w": tw, "src": f"/images/{name}"})

        manifest[key] = {
            "width": w,
            "height": h,
            "alt": spec["alt"],
            "src": entries[-1]["src"] if len(entries) < 2 else entries[1]["src"],
            "srcSet": entries,
            "original": spec["src"],
        }

    os.makedirs(os.path.dirname(DATA_OUT), exist_ok=True)
    with open(DATA_OUT, "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, indent=2, ensure_ascii=False)
    print(f"{len(manifest)} images; originals {total_in/1e6:.1f} MB -> derivatives {total_out/1e6:.1f} MB")


if __name__ == "__main__":
    main()
