<script lang="ts">
	import { nobr } from '$src/lib/helpers/nobr.js';
	import { splitNewLines } from '$src/lib/helpers/split-new-lines.js';

	let {
		streetAddress = '',
		city = '',
		region = '',
		postalCode = '',
		country = ''
	}: {
		streetAddress?: string;
		city?: string;
		region?: string;
		postalCode?: string;
		country?: string;
	} = $props();

	let streetAddressArray = $derived(splitNewLines(streetAddress));
	let flatAddress = $derived(
		nobr(`${streetAddress}, ${city}, ${region} ${postalCode}, ${country}`.replace(/,\s+/g, ', '))
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
