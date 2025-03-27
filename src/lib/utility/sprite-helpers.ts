import spriteKeys from "../common/generated/icons";

export default function getSprite(name: keyof typeof spriteKeys) {
	return spriteKeys[name];
}
