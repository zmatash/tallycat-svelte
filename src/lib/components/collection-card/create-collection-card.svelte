<script lang="ts">
	import getSprite from "$lib/utility/sprite-helpers";
</script>

<button aria-label="Create Collection" type="button" class="col-centred just-center gap-8">
	<div class="icon-container col-centred just-center">
		<svg>
			<title>Plus</title>
			<use href={getSprite("plus")} />
		</svg>
	</div>
</button>

<style>
	button {
		border-radius: var(--size16);
		background: var(--surface0);
		width: 100%;
		aspect-ratio: 1.2;
	}

	svg {
		width: var(--size40);
		height: var(--size40);
	}

	.icon-container {
		background: var(--surface1);
		border-radius: 50%;
		width: var(--size64);
		height: var(--size64);
	}
</style>
