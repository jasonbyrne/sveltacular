# BoolBox Variants Guide

## Quick Reference

The `BoolBox` component now supports **4 variants** for displaying boolean (true/false) values:

### 1. Dropdown Variant (Default)
```svelte
<BoolBox
  variant="dropdown"
  label="Enable feature"
  options={['Yes', 'No']}
  bind:value={enabled}
/>
```
**When to use:**
- In forms where space is limited
- When consistency with other dropdowns is desired
- For formal or business applications

**Visual:** Standard dropdown/select showing one option at a time

---

### 2. Switch Variant
```svelte
<BoolBox
  variant="switch"
  label="Enable notifications"
  options={['On', 'Off']}
  bind:value={notificationsOn}
/>
```
**When to use:**
- Settings and preferences
- Feature toggles
- On/off states
- Modern, mobile-friendly interfaces

**Visual:** Toggle switch with sliding animation
**Note:** The text label automatically updates to show current state (e.g., "On" when true, "Off" when false)

---

### 3. Checkbox Variant
```svelte
<BoolBox
  variant="checkbox"
  label="Subscribe to newsletter"
  options={['Subscribe', 'Unsubscribe']}
  bind:value={subscribed}
/>
```
**When to use:**
- Single boolean selections
- Agreements and confirmations
- Traditional forms
- When users are familiar with checkbox conventions

**Visual:** Checkbox with checkmark that displays current state text
**Note:** Shows "Subscribe" when checked, "Unsubscribe" when unchecked

---

### 4. Radio Variant
```svelte
<BoolBox
  variant="radio"
  label="Account status"
  options={['Active', 'Inactive']}
  bind:value={isActive}
/>
```
**When to use:**
- When both options should be explicitly visible
- For important decisions where users should see both choices
- When the false option is as important as the true option
- Status selections

**Visual:** Two radio buttons side-by-side showing both options
**Note:** Perfect for scenarios like Active/Inactive, Public/Private, Enable/Disable

---

## Size Options

All variants support these sizes:
- `sm` - Small
- `md` - Medium (default)
- `lg` - Large
- `xl` - Extra Large
- `full` - Full width (for dropdown only)

```svelte
<BoolBox variant="switch" size="lg" options={['On', 'Off']} bind:value={val} />
```

---

## Common Option Pairs

Here are some common option combinations for different use cases:

| Use Case | Options | Best Variant |
|----------|---------|--------------|
| General boolean | `['Yes', 'No']` | Any |
| Technical | `['True', 'False']` | Dropdown or Radio |
| Power state | `['On', 'Off']` | Switch |
| Feature state | `['Enabled', 'Disabled']` | Switch or Radio |
| Status | `['Active', 'Inactive']` | Radio or Switch |
| Visibility | `['Visible', 'Hidden']` | Switch or Checkbox |
| Access | `['Public', 'Private']` | Radio or Dropdown |
| Agreement | `['Agree', 'Disagree']` | Checkbox or Radio |
| Subscription | `['Subscribe', 'Unsubscribe']` | Checkbox |

---

## Complete Example

```svelte
<script lang="ts">
  let notifications = $state(true);
  let newsletter = $state(false);
  let accountStatus = $state(true);
  let autoSave = $state(true);
</script>

<!-- Switch for settings -->
<BoolBox
  variant="switch"
  label="Enable notifications"
  options={['On', 'Off']}
  bind:value={notifications}
  helperText="Receive push notifications"
/>

<!-- Checkbox for opt-in -->
<BoolBox
  variant="checkbox"
  label="Newsletter subscription"
  options={['Subscribed', 'Not subscribed']}
  bind:value={newsletter}
/>

<!-- Radio for status -->
<BoolBox
  variant="radio"
  label="Account status"
  options={['Active', 'Inactive']}
  bind:value={accountStatus}
/>

<!-- Dropdown for forms -->
<BoolBox
  variant="dropdown"
  label="Auto-save"
  options={['Enabled', 'Disabled']}
  bind:value={autoSave}
/>
```

---

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `boolean` | `false` | The boolean value (bindable) |
| `variant` | `'dropdown' \| 'switch' \| 'checkbox' \| 'radio'` | `'dropdown'` | Visual variant |
| `options` | `[string, string]` | `['Yes', 'No']` | Labels for [true, false] |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Component size |
| `label` | `string` | `undefined` | Label above input |
| `helperText` | `string` | `undefined` | Helper text below input |
| `feedback` | `FormFieldFeedback` | `undefined` | Error/success feedback |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Required indicator |
| `onChange` | `(value: boolean) => void` | `undefined` | Change callback |

---

## Migration from SwitchBox

If you're migrating from the old `SwitchBox` component:

**Old:**
```svelte
<SwitchBox bind:checked={value}>
  My Switch
</SwitchBox>
```

**New:**
```svelte
<BoolBox
  variant="switch"
  bind:value={value}
  options={['On', 'Off']}
  label="My Switch"
/>
```

**Changes:**
1. Import `BoolBox` instead of `SwitchBox`
2. Add `variant="switch"` prop
3. Change `checked` to `value`
4. Move text from children to `label` prop
5. Add `options` array for displayed text
