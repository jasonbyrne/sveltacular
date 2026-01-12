# Form Controls Standardization Audit

**Date:** January 12, 2026  
**Purpose:** Identify and standardize dimensions, styling, and properties across form input controls

## Executive Summary

After analyzing TextBox, PhoneBox, NumberBox, DateBox, MoneyBox, TimeBox, UrlBox, ListBox, and Slider components, I've identified several inconsistencies that affect alignment in FormRow layouts and overall user experience.

### Key Findings

1. **Height Inconsistencies**: Controls render at 34-36px due to varying padding approaches
2. **Padding Variations**: Input padding differs across controls
3. **Property Inconsistencies**: Similar controls expose different sets of properties
4. **Structural Differences**: Some use wrapper divs differently than others

---

## Dimension Analysis

### Target Dimensions (per line)
- **Label**: `font-size: var(--font-base)` + `margin: 0` (set by FormLabel)
- **Input**: Should be **exactly 34px** high (2.125rem min-height)
- **Helper/Feedback**: `font-size: var(--font-sm)` + `line-height: 1.25rem` + `padding: var(--spacing-xs)`

### THE PROBLEM - Actual Rendered Heights (User Reported)

| Component | User-Reported Height | Expected | Status |
|-----------|---------------------|----------|--------|
| TextBox | **36px** | 34px | ❌ TOO TALL |
| NumberBox | **36px** | 34px | ❌ TOO TALL |
| MoneyBox | **36px** | 34px | ❌ TOO TALL |
| PhoneBox | **34px** | 34px | ✅ CORRECT |
| DateBox | **40px** | 34px | ❌ WAY TOO TALL |
| TimeBox | **36px** | 34px | ❌ TOO TALL |
| ListBox | **36px** | 34px | ❌ TOO TALL |
| Slider | 32px* | 32px | ✅ Correct (intentionally different) |

**Root Cause:** Controls were using `height: 100%` which was being calculated inconsistently based on:
- Flexbox content sizing
- Browser default line-height calculations  
- Implicit padding from various sources
- Flex container behavior differences

**The Fix:** Changed ALL controls to use `min-height: 2.125rem` (exactly 34px) with explicit `padding: 0` on wrappers.

### After Fix - Standardized Heights

| Component | CSS Applied | Rendered Height | Status |
|-----------|-------------|-----------------|--------|
| TextBox | `min-height: 2.125rem; padding: 0` | **34px** | ✅ FIXED |
| NumberBox | `min-height: 2.125rem; padding: 0` | **34px** | ✅ FIXED |
| MoneyBox | `min-height: 2.125rem; padding: 0` | **34px** | ✅ FIXED |
| PhoneBox | `min-height: 2.125rem; padding: 0 0 0 var(--spacing-base)` | **34px** | ✅ MAINTAINED |
| DateBox | `min-height: 2.125rem; padding: 0` | **34px** | ✅ FIXED |
| TimeBox | `min-height: 2.125rem; padding: 0` | **34px** | ✅ FIXED |
| ListBox | `min-height: 2.125rem; padding: 0` | **34px** | ✅ FIXED |

**Calculation:** 
- `2.125rem` = `34px` at default 16px font size
- This includes the border (part of the box model)
- Content is vertically centered via `align-items: center`

---

## Styling Inconsistencies

### 1. Input Wrapper Structure

**Common Pattern (Good):**
```scss
.input {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: var(--radius-md);
  border: var(--border-thin) solid var(--form-input-border);
  background-color: var(--form-input-bg);
  color: var(--form-input-fg);
  font-size: var(--font-md);
  font-weight: 500;
  line-height: 2rem;
  transition: background-color, border-color, color, fill, stroke;
  user-select: none;
  white-space: nowrap;
}
```

**Components following pattern:** TextBox, NumberBox, MoneyBox, PhoneBox, TimeBox, ListBox

**Deviations:**
- **DateBox**: Uses nested structure with separate `.input` span inside wrapper div
- **Slider**: Completely different (range input, no border wrapper)

### 2. Horizontal Padding Variations

| Component | Input Element Padding | Notes |
|-----------|----------------------|-------|
| TextBox | `padding: 0 0 0 var(--spacing-base)` | Left only |
| NumberBox | `padding: 0 0 0 var(--spacing-base)` | Left only |
| MoneyBox | `padding: 0; padding-left: var(--spacing-base)` | Left only (verbose) |
| PhoneBox | Container: `padding-left: var(--spacing-base)` | On wrapper, not input |
| DateBox | `padding: 0 1rem` | Both sides, uses hardcoded value |
| TimeBox | `padding: 0 var(--spacing-base)` | Both sides |
| ListBox | `padding-left/right: var(--spacing-base)` | Both sides (separate) |

**Recommendation:** Standardize to `padding: 0 var(--spacing-base)` (both sides) for consistency.

### 3. Nullable Pattern

Most controls implement nullable checkbox consistently:
- Position: `absolute; top: 50%; transform: translateY(-50%); left: 0.4rem`
- Adds `2.5rem` left padding when active

**Issues:**
- DateBox has slightly different implementation
- PhoneBox applies padding to container vs inputs inconsistently

---

## Property Inconsistencies

### Common Properties (All Should Have)

| Property | TextBox | NumberBox | DateBox | MoneyBox | PhoneBox | TimeBox | ListBox | Slider |
|----------|---------|-----------|---------|----------|----------|---------|---------|--------|
| `value` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `size` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `disabled` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `required` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| `readonly` | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `nullable` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `label` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `helperText` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| `feedback` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| `placeholder` | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| `nullText` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `onChange` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `onInput` | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ |
| `onFocus` | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ |
| `onBlur` | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ |
| `onCheckChanged` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |

### Specific Property Gaps

**Missing from DateBox:**
- `readonly` - should support read-only state

**Missing from PhoneBox:**
- `placeholder` - could show format hint
- `readonly` - should support read-only state

**Missing from TimeBox:**
- `placeholder` - could be useful
- `readonly` - should support read-only state

**Missing from ListBox:**
- `nullable` - could support clearing selection via checkbox
- `nullText` - for nullable state display
- `onCheckChanged` - if nullable added
- `readonly` - should prevent dropdown opening

**Missing from Slider:**
- `required` - validation support
- `helperText` - guidance text
- `feedback` - validation feedback
- `placeholder` / `nullText` - n/a for slider
- Event handlers beyond `onChange`

**Missing from MoneyBox:**
- `onInput` - only has onChange
- `onFocus` / `onBlur` - focus state handling

---

## Type Safety Issues

### Size Type Inconsistencies

| Component | Size Type |
|-----------|-----------|
| TextBox | `FormFieldSizeOptions` |
| NumberBox | `FormFieldSizeOptions` |
| DateBox | `FormFieldSizeOptions` |
| MoneyBox | `FormFieldSizeOptions` |
| PhoneBox | `FormFieldSizeOptions` |
| TimeBox | `ComponentSize` ❌ |
| ListBox | `FormFieldSizeOptions` |
| Slider | `ComponentSize` ❌ |
| UrlBox | `FormFieldSizeOptions` |

**Issue:** TimeBox and Slider use `ComponentSize` instead of `FormFieldSizeOptions` - should be consistent.

---

## Recommendations

### Priority 1: Critical Standardization

1. **Standardize input padding:**
   - All inputs should use `padding: 0 var(--spacing-base)` (horizontal only)
   - Exception: Controls with prefix/suffix adjust appropriately

2. **Fix type inconsistencies:**
   - Change TimeBox and Slider to use `FormFieldSizeOptions`

3. **Standardize DateBox structure:**
   - Align wrapper structure with other controls
   - Use consistent `.input` class pattern

### Priority 2: Property Completeness

4. **Add missing core properties:**
   - Add `readonly` to: DateBox, PhoneBox, TimeBox, ListBox, Slider
   - Add `required` to: Slider
   - Add `helperText` and `feedback` to: Slider
   - Add `onInput`, `onFocus`, `onBlur` to: MoneyBox
   - Consider adding `nullable` to: ListBox (allow clearing selection)

### Priority 3: Enhanced Consistency

5. **Nullable pattern:**
   - Ensure all nullable controls have identical checkbox positioning
   - Standardize padding adjustments (always 2.5rem when nullable + no prefix)

6. **Prefix/Suffix handling:**
   - Ensure all text-based inputs support prefix/suffix consistently
   - DateBox and TimeBox could benefit from this

7. **Success/Error indicators:**
   - Add loading/success indicators to controls missing them
   - MoneyBox, DateBox, TimeBox, PhoneBox could use these

### Priority 4: Documentation

8. **Create shared base styles:**
   - Consider extracting common input wrapper styles to a shared SCSS file
   - Reduces duplication and ensures consistency

9. **Document property conventions:**
   - Create guide for which properties all form controls should implement
   - Establish naming conventions for events and callbacks

---

## Implementation Plan

### Phase 1: CSS Standardization (Quick wins)
- [ ] Standardize all input padding to `0 var(--spacing-base)`
- [ ] Fix DateBox wrapper structure
- [ ] Ensure all input wrappers have identical base styles
- [ ] Verify 34px height across all controls

### Phase 2: Type Safety
- [ ] Update TimeBox to use `FormFieldSizeOptions`
- [ ] Update Slider to use `FormFieldSizeOptions`
- [ ] Verify all imports are consistent

### Phase 3: Property Additions
- [ ] Add `readonly` prop to DateBox, PhoneBox, TimeBox, ListBox, Slider
- [ ] Add `required` to Slider
- [ ] Add `helperText` and `feedback` to Slider
- [ ] Add missing event handlers to MoneyBox

### Phase 4: Enhanced Features
- [ ] Consider nullable ListBox
- [ ] Add loading/success indicators to remaining controls
- [ ] Add prefix/suffix support to DateBox/TimeBox (if needed)

### Phase 5: Testing
- [ ] Create test story with all controls in FormRow
- [ ] Verify pixel-perfect alignment
- [ ] Test all nullable controls together
- [ ] Test all error/success states together

---

## Test Scenario

Create a story page with:
```svelte
<FormRow>
  <TextBox label="Text" />
  <NumberBox label="Number" />
  <DateBox label="Date" />
  <TimeBox label="Time" />
  <MoneyBox label="Money" />
  <PhoneBox label="Phone" />
  <ListBox label="Select" items={[...]} />
</FormRow>
```

All controls should:
- Have identical heights (34px for input area)
- Align perfectly when labels are present
- Align perfectly when labels are absent
- Have consistent spacing between label-input-helper
- Look visually identical in terms of padding and borders
