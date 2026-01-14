<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from '../button/button.svelte';
	import type { ButtonVariant } from '$src/lib/types';

	export interface ButtonOpts {
		type?: 'submit' | 'button';
		variant?: ButtonVariant;
		text: string;
		onClick?: () => void;
	}

	let {
		children,
		buttons = [
			{
				type: 'submit',
				variant: 'primary',
				text: 'Save'
			}
		]
	}: {
		children?: Snippet;
		buttons?: ButtonOpts[];
	} = $props();
</script>

<div class="form-actions">
	{#if children}
		<div class="content">
			{@render children()}
		</div>
	{/if}
	<div class="buttons">
		{#each buttons as button}
			<Button
				type={button.type ?? 'submit'}
				variant={button.variant ?? 'secondary'}
				onClick={button.onClick ?? undefined}
			>
				{button.text}
			</Button>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '$styles/breakpoints' as *;

	.form-actions {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: var(--spacing-md);

		/* Vertical spacing - separate form from actions and actions from content below */
		margin-top: var(--spacing-xl);
		margin-bottom: var(--spacing-lg);
		padding-top: var(--spacing-lg);

		/* Optional: Add a subtle top border to visually separate from form content */
		border-top: 1px solid var(--gray-200);

		.content {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: var(--spacing-sm);
			flex: 0 1 auto; /* Don't grow, can shrink, auto basis */
		}

		.buttons {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: var(--spacing-sm);
			flex: 0 0 auto; /* Don't grow, don't shrink, auto basis */
			margin-left: auto; /* Push to the right */
		}

		/* Responsive: Stack on mobile */
		@include breakpoint-down('phablet') {
			flex-direction: column;
			align-items: stretch;
			gap: var(--spacing-md);

			.content,
			.buttons {
				width: 100%;
				justify-content: flex-start;
			}

			.buttons {
				margin-left: 0;
				justify-content: flex-end;
			}
		}
	}
</style>
