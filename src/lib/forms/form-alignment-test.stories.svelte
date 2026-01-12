<script context="module" lang="ts">
	import type { StoryContext } from '$src/lib/types/storybook.js';

	export const meta = {
		title: 'Forms/Alignment Test',
		tags: ['autodocs']
	};
</script>

<script lang="ts">
	import FormRow from './form-row/form-row.svelte';
	import FormSection from './form-section/form-section.svelte';
	import TextBox from './text-box/text-box.svelte';
	import NumberBox from './number-box/number-box.svelte';
	import DateBox from './date-box/date-box.svelte';
	import TimeBox from './time-box/time-box.svelte';
	import MoneyBox from './money-box/money-box.svelte';
	import PhoneBox from './phone-box/phone-box.svelte';
	import ListBox from './list-box/list-box.svelte';
	import Slider from './slider/slider.svelte';
	import type { DropdownOption } from '$src/lib/types/form.js';

	const dropdownOptions: DropdownOption[] = [
		{ name: 'Option 1', value: '1' },
		{ name: 'Option 2', value: '2' },
		{ name: 'Option 3', value: '3' },
		{ name: 'Option 4', value: '4' }
	];

	let textValue = $state('');
	let numberValue = $state(42);
	let dateValue = $state('2026-01-12');
	let timeValue = $state('14:30');
	let moneyValue = $state(1234.56);
	let phoneValue = $state('5551234567');
	let listValue = $state<string | null>('1');
	let sliderValue = $state(50);

	let textValue2 = $state('');
	let numberValue2 = $state(null);
	let dateValue2 = $state<string | null>(null);
	let timeValue2 = $state<string | null>(null);
	let moneyValue2 = $state<number | null>(null);
	let phoneValue2 = $state<string | null>(null);
</script>

<div class="story-wrapper">
	<h1>Form Controls Alignment Test</h1>
	<p>
		This page tests that all form controls have consistent dimensions and alignment when used
		together in FormRow layouts.
	</p>

	<FormSection title="Test 1: All Controls with Labels">
		<p>All controls should align perfectly at the label, input, and helper text levels.</p>
		<FormRow>
			<TextBox bind:value={textValue} label="Text Input" helperText="Helper text" />
			<NumberBox bind:value={numberValue} label="Number Input" helperText="Helper text" />
			<DateBox bind:value={dateValue} label="Date Input" helperText="Helper text" />
		</FormRow>
		<FormRow>
			<TimeBox bind:value={timeValue} label="Time Input" helperText="Helper text" />
			<MoneyBox bind:value={moneyValue} label="Money Input" helperText="Helper text" />
			<PhoneBox bind:value={phoneValue} label="Phone Input" helperText="Helper text" />
		</FormRow>
		<FormRow>
			<ListBox
				bind:value={listValue}
				items={dropdownOptions}
				label="List Box"
				helperText="Helper text"
			/>
			<Slider bind:value={sliderValue} label="Slider" helperText="Helper text" />
		</FormRow>
	</FormSection>

	<FormSection title="Test 2: All Controls Without Labels">
		<p>All controls should align perfectly even without labels.</p>
		<FormRow>
			<TextBox bind:value={textValue} placeholder="Text Input" />
			<NumberBox bind:value={numberValue} placeholder="Number" />
			<DateBox bind:value={dateValue} placeholder="Date" />
		</FormRow>
		<FormRow>
			<TimeBox bind:value={timeValue} />
			<MoneyBox bind:value={moneyValue} placeholder="Money" />
			<PhoneBox bind:value={phoneValue} />
		</FormRow>
		<FormRow>
			<ListBox bind:value={listValue} items={dropdownOptions} placeholder="Select..." />
			<Slider bind:value={sliderValue} />
		</FormRow>
	</FormSection>

	<FormSection title="Test 3: Nullable Controls">
		<p>
			All nullable controls should have consistent checkbox positioning and padding adjustments.
		</p>
		<FormRow>
			<TextBox bind:value={textValue2} label="Nullable Text" nullable={true} />
			<NumberBox bind:value={numberValue2} label="Nullable Number" nullable={true} />
			<DateBox bind:value={dateValue2} label="Nullable Date" nullable={true} />
		</FormRow>
		<FormRow>
			<TimeBox bind:value={timeValue2} label="Nullable Time" nullable={true} />
			<MoneyBox bind:value={moneyValue2} label="Nullable Money" nullable={true} />
			<PhoneBox bind:value={phoneValue2} label="Nullable Phone" nullable={true} />
		</FormRow>
	</FormSection>

	<FormSection title="Test 4: With Feedback States">
		<p>Controls should maintain alignment with success and error feedback.</p>
		<FormRow>
			<TextBox
				bind:value={textValue}
				label="Success State"
				feedback={{ text: 'Looks good!', isError: false }}
			/>
			<NumberBox
				bind:value={numberValue}
				label="Error State"
				feedback={{ text: 'Invalid value', isError: true }}
			/>
			<DateBox
				bind:value={dateValue}
				label="Normal State"
				helperText="This is helper text"
			/>
		</FormRow>
	</FormSection>

	<FormSection title="Test 5: Disabled and Readonly States">
		<p>Disabled and readonly controls should maintain alignment.</p>
		<FormRow>
			<TextBox bind:value={textValue} label="Disabled Text" disabled={true} />
			<NumberBox bind:value={numberValue} label="Disabled Number" disabled={true} />
			<DateBox bind:value={dateValue} label="Readonly Date" readonly={true} />
		</FormRow>
		<FormRow>
			<TimeBox bind:value={timeValue} label="Readonly Time" readonly={true} />
			<ListBox
				bind:value={listValue}
				items={dropdownOptions}
				label="Readonly List"
				readonly={true}
			/>
			<PhoneBox bind:value={phoneValue} label="Readonly Phone" readonly={true} />
		</FormRow>
	</FormSection>

	<FormSection title="Test 6: Required Fields">
		<p>Required indicators should be consistent across all controls.</p>
		<FormRow>
			<TextBox bind:value={textValue} label="Required Text" required={true} />
			<NumberBox bind:value={numberValue} label="Required Number" required={true} />
			<DateBox bind:value={dateValue} label="Required Date" required={true} />
		</FormRow>
		<FormRow>
			<TimeBox bind:value={timeValue} label="Required Time" required={true} />
			<MoneyBox bind:value={moneyValue} label="Required Money" required={true} />
			<PhoneBox bind:value={phoneValue} label="Required Phone" required={true} />
		</FormRow>
		<FormRow>
			<ListBox
				bind:value={listValue}
				items={dropdownOptions}
				label="Required List"
				required={true}
			/>
			<Slider bind:value={sliderValue} label="Required Slider" required={true} />
		</FormRow>
	</FormSection>

	<FormSection title="Test 7: Mixed Sizes">
		<p>Controls with different size props should still align properly.</p>
		<FormRow>
			<TextBox bind:value={textValue} label="Small" size="sm" />
			<NumberBox bind:value={numberValue} label="Medium" size="md" />
			<DateBox bind:value={dateValue} label="Large" size="lg" />
			<TimeBox bind:value={timeValue} label="Extra Large" size="xl" />
		</FormRow>
	</FormSection>

	<FormSection title="Test 8: Prefix and Suffix">
		<p>Controls with prefix/suffix should maintain consistent padding and alignment.</p>
		<FormRow>
			<TextBox bind:value={textValue} label="With Prefix" prefix="@" />
			<TextBox bind:value={textValue} label="With Suffix" suffix=".com" />
			<NumberBox bind:value={numberValue} label="With Both" prefix="$" suffix="USD" />
		</FormRow>
		<FormRow>
			<MoneyBox bind:value={moneyValue} label="Money with Suffix" suffix="USD" />
		</FormRow>
	</FormSection>

	<FormSection title="Dimension Verification">
		<div class="measurement-guide">
			<h3>Expected Dimensions (per control):</h3>
			<ul>
				<li><strong>Label:</strong> font-size: var(--font-base), margin: 0</li>
				<li><strong>Input Area:</strong> Exactly 34px high (2rem line-height + 2px border)</li>
				<li>
					<strong>Helper/Feedback:</strong> font-size: var(--font-sm), line-height: 1.25rem,
					padding: var(--spacing-xs)
				</li>
				<li><strong>Gap between sections:</strong> 0.25rem (set by FormField)</li>
			</ul>
			<p>
				Use browser dev tools to verify that all input containers have identical height across all
				controls.
			</p>
		</div>
	</FormSection>

	<FormSection title="Visual Inspection Checklist">
		<div class="checklist">
			<h3>Verify the following:</h3>
			<ul>
				<li>✅ All labels align horizontally across FormRow</li>
				<li>✅ All input areas are exactly the same height (34px)</li>
				<li>✅ All helper text / feedback text aligns horizontally across FormRow</li>
				<li>✅ Nullable checkboxes are positioned identically in all nullable controls</li>
				<li>✅ Left padding is consistent (except where prefix/suffix adjusts it)</li>
				<li>✅ Border radius and border thickness are identical</li>
				<li>✅ Font sizes are consistent (--font-md for input)</li>
				<li>✅ Disabled/readonly states look consistent</li>
				<li>✅ Error/success borders are the same width as normal borders</li>
				<li>✅ All controls respond consistently to focus states</li>
			</ul>
		</div>
	</FormSection>
</div>

<style>
	.story-wrapper {
		padding: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	h1 {
		margin-bottom: 1rem;
		color: var(--body-fg);
	}

	.measurement-guide,
	.checklist {
		background-color: var(--surface-bg, #f8f9fa);
		padding: 1.5rem;
		border-radius: var(--radius-md);
		margin-top: 1rem;
	}

	.measurement-guide h3,
	.checklist h3 {
		margin-top: 0;
		color: var(--body-fg);
	}

	.measurement-guide ul,
	.checklist ul {
		margin: 0.5rem 0;
		padding-left: 1.5rem;
	}

	.measurement-guide li,
	.checklist li {
		margin: 0.5rem 0;
		line-height: 1.6;
	}

	.checklist li {
		list-style: none;
		padding-left: 0;
	}
</style>
