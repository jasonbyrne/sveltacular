<script lang="ts">
	import { capitalize } from '$src/lib/helpers/capitalize.js';
	import MobilePhoneIcon from '$src/lib/icons/mobile-phone-icon.svelte';
	import PhoneIcon from '$src/lib/icons/phone-icon.svelte';

	export let value: string;
	export let type: 'sms' | 'mobile' | 'home' | 'work' | 'fax' | 'other' = 'mobile';

	const getDigits = (phoneNumber: string) => {
		return phoneNumber.replace(/[^0-9]/g, '');
	};

	const formatPhoneNumber = (phoneNumber: string) => {
		const cleaned = getDigits(phoneNumber);
		const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
		if (match) {
			return '(' + match[1] + ') ' + match[2] + '-' + match[3];
		}
		return phoneNumber;
	};

	$: formattedPhoneNumber = formatPhoneNumber(value);
	$: phoneNumberDigits = getDigits(value);
	$: protocol = type === 'sms' ? 'sms:' : 'tel:';
	$: isCellPhone = type == 'mobile' || type == 'sms';
</script>

<a href="{protocol}:{phoneNumberDigits}" title={capitalize(type)}>
	<span class="icon">
		{#if isCellPhone}
			<MobilePhoneIcon />
		{:else}
			<PhoneIcon />
		{/if}
	</span>
	<span class="number">
		{formattedPhoneNumber}
	</span>
</a>

<style lang="scss">
	a {
		color: inherit;
		text-decoration: none;

		span {
			display: inline-block;
			vertical-align: middle;
			line-height: 1.5rem;
		}

		.icon {
			width: 1rem;
			height: 1rem;
			position: relative;
		}

		&:hover {
			.number {
				text-decoration: underline;
			}
		}
	}
</style>
