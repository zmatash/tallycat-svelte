<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import type { SpriteKey } from "$lib/common/generated/icons";
	import getSprite from "$lib/utility/sprite-helpers";

	interface Props {
		goto: string;
		sprite: SpriteKey;
		label: string;

		isEnabled?: boolean;
	}

	let { isEnabled = true, ...props }: Props = $props();
	let isActive = $derived(page.route.id === props.goto);

	const onClick = () => {
		if (!isEnabled || isActive) return;
		goto(props.goto);
	};
</script>

<button
	class={["fill-parent col-centred", { disabled: !isEnabled, selected: isActive && isEnabled }]}
	type="button"
	aria-label={`Go to ${props.goto}`}
	onclick={onClick}
>
	<svg>
		<title>{props.sprite}</title>
		<use href={isEnabled ? getSprite(props.sprite) : getSprite("circle-chevron")} />
	</svg>
	{props.label}
</button>

<style>
	button.disabled {
		color: var(--overlay0);
	}

	button.selected {
		font-weight: 600;
		color: var(--mauve);
	}

	button {
		justify-content: space-evenly;
		color: var(--subtext0);
	}

	svg {
		color: inherit;
	}
</style>
