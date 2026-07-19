"""Create minimal valid PNG icons without Pillow dependency."""

from pathlib import Path
import struct
import zlib

OUT = Path(__file__).resolve().parent / "Chrome Extension" / "icons"
OUT.mkdir(parents=True, exist_ok=True)


def png_chunk(tag: bytes, data: bytes) -> bytes:
    return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)


def make_png(size: int, rgb=(99, 102, 241)) -> bytes:
    raw = bytearray()
    r, g, b = rgb
    for y in range(size):
        raw.append(0)  # filter none
        for x in range(size):
            # simple rounded-ish square: darker border
            border = min(x, y, size - 1 - x, size - 1 - y) < max(1, size // 8)
            if border:
                raw.extend((79, 70, 229))
            else:
                raw.extend((r, g, b))

    ihdr = struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0)
    return (
        b"\x89PNG\r\n\x1a\n"
        + png_chunk(b"IHDR", ihdr)
        + png_chunk(b"IDAT", zlib.compress(bytes(raw), 9))
        + png_chunk(b"IEND", b"")
    )


def main() -> None:
    for size in (16, 48, 128):
        path = OUT / f"icon{size}.png"
        path.write_bytes(make_png(size))
        print(f"Wrote {path} ({path.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
