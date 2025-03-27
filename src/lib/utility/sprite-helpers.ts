import { spriteKeys, type SpriteKey } from "$lib/common/generated/icons";

export default function getSprite(name: SpriteKey) {
	return spriteKeys[name];
}
