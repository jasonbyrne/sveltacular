<script lang="ts">
	import { nobr } from '$src/lib/helpers/nobr.js';
	import { splitNewLines } from '$src/lib/helpers/split-new-lines.js';

	export let streetAddress: string = '';
	export let city: string = '';
	export let region: string = '';
	export let postalCode: string = '';
	export let country: string = '';

	$: streetAddressArray = splitNewLines(streetAddress);
	$: flatAddress = nobr(
		`${streetAddress}, ${city}, ${region} ${postalCode}, ${country}`.replace(/,\s+/g, ', ')
	);
</script>

<address>
	<a href="https://maps.google.com/?q={flatAddress}" target="_blank" rel="noopener">
		{#each streetAddressArray as line}
			<div>{line}</div>
		{/each}
		<div>
			{city}, {region}
			{country}
			{postalCode}
		</div>
	</a>
</address>

<style lang="scss">
	address {
		display: block;
		margin-bottom: 1rem;
		font-style: normal;

		a {
			color: inherit;
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}
		}
	}
</style>
