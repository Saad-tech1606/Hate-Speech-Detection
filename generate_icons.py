"""Generate PNG icons for the Chrome extension."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

SIZES = (16, 48, 128)
OUTPUT_DIR = Path(__file__).resolve().parent / "Chrome Extension" / "icons"


def draw_icon(size: int) -> Image.Image:
    image = Image.new("RGBA", (size, size), (15, 23, 42, 255))
    draw = ImageDraw.Draw(image)

    margin = max(2, size // 8)
    draw.rounded_rectangle(
        (margin, margin, size - margin, size - margin),
        radius=max(2, size // 6),
        fill=(99, 102, 241, 255),
    )

    font_size = max(8, size // 3)
    try:
        font = ImageFont.truetype("arial.ttf", font_size)
    except OSError:
        font = ImageFont.load_default()

    text = "HS"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    position = ((size - text_width) / 2, (size - text_height) / 2 - 1)
    draw.text(position, text, fill=(255, 255, 255, 255), font=font)

    return image


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for size in SIZES:
        icon = draw_icon(size)
        icon.save(OUTPUT_DIR / f"icon{size}.png")
        print(f"Created {OUTPUT_DIR / f'icon{size}.png'}")


if __name__ == "__main__":
    main()
