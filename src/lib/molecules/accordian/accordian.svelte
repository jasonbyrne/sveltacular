<script lang="ts">
	import AngleUpIcon from '$src/lib/icons/angle-up-icon.svelte';

	export let title: string;
	export let expanded = false;
</script>

<div class:expanded class="accordian">
	<button on:click={() => (expanded = !expanded)}>
		<span class="title">
			{title}
		</span>
		<span class="icon">
			<AngleUpIcon />
		</span>
	</button>
	<div class="menu">
		<slot />
	</div>
</div>

<style lang="scss">
	.accordian {
		background: #eee;
		color: #000;
		height: 3rem;
		transition: height 0.3s ease;
		overflow: hidden;

		button {
			appearance: none;
			width: 100%;
			padding: 1rem;
			border: none;
			text-align: left;
			outline: none;
			transition: background 0.3s ease;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 1rem;

			.icon {
				width: 1rem;
				height: 1rem;
				display: block;
				transition: transform 0.3s ease;
			}

			&:hover {
				background: #ccc;
			}
		}

		.menu {
			padding: 1rem;
		}

		&.expanded {
			height: auto;

			.icon {
				transform: rotate(180deg);
			}
		}
	}
</style>
