"""Process icon svgs, removing hardcoded properties and generating a module for easy access."""

import os
import re
from pathlib import Path

ROOT = "/sprite-sheet.svg#"

working_dir = os.getcwd()
icons_file = Path(working_dir) / "src" / "lib" / "common" / "generated" / "icons.ts"

icons = Path(working_dir) / "assets" / "icons"

pattern = r'stroke-width="[^"]+"'
icon_names = []

icon_dictionary_string = "const spriteKeys = {\n"

for icon in icons.iterdir():
    icon_name = icon.stem
    if "-" in icon_name:
        icon_name = f'"{icon_name}"'
    icon_dictionary_string += f'\t{icon_name}: "{ROOT}{icon.stem}",\n'

    with open(icon, "r") as f:
        content = f.read()

    modified_content = re.sub(pattern, "", content)

    with open(icon, "w") as f:
        f.write(modified_content)

icon_dictionary_string += "} as const;\n\nexport default spriteKeys;\n"

with open(icons_file, "w") as f:
    f.write(icon_dictionary_string)

print("Processed all icons")
