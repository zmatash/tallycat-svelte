"""Process icon svgs, removing hardcoded properties and generating a module for easy access."""

import os
from pathlib import Path


def process_entry(entry: str, end: str) -> str:
    return f"{entry}{end}\n"


ROOT = "/sprite-sheet.svg#"

working_dir = os.getcwd()
icons_file = Path(working_dir) / "src" / "lib" / "common" / "generated" / "icons.ts"

icons = Path(working_dir) / "assets" / "icons"

icon_object = "export const spriteKeys: Sprites = {\n"
icon_object_interface = "export interface Sprites {\n"
icon_key_type = "export type SpriteKey = keyof Sprites;"

icon_paths = icons.iterdir()

for icon in icons.iterdir():
    icon_name = icon.stem
    if "-" in icon_name:
        icon_name = f'"{icon_name}"'

    entry = f'{icon_name}: "{ROOT}{icon.stem}"'
    icon_object += f"\t{process_entry(entry, ',')}"
    icon_object_interface += f"\treadonly {process_entry(entry, ';')}"

icon_object += "} as const;"
icon_object_interface += "};"

with open(icons_file, "w") as f:
    f.write(icon_object_interface + "\n\n")
    f.write(icon_key_type + "\n\n")
    f.write(icon_object + "\n")


print("Processed all icons")
