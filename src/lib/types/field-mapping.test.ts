import { describe, it, expect } from 'vitest';
import { createFieldMapper, mapFields, type FieldNameMapping } from './form.js';

// Sample database types for testing
type Topic = {
	id: number;
	name: string;
	slug: string;
};

type Category = {
	categoryId: string;
	title: string;
	description: string;
	isActive: boolean;
};

describe('createFieldMapper', () => {
	describe('toReferenceItem', () => {
		it('should map database object with default field names', () => {
			const mapper = createFieldMapper<any>(undefined);
			const item = { label: 'Test', value: 1 };
			const result = mapper.toReferenceItem(item);

			expect(result).toEqual({
				label: 'Test',
				value: 1,
				description: undefined,
				disabled: undefined
			});
		});

		it('should map database object with custom field names', () => {
			const fieldNames: FieldNameMapping = { label: 'name', value: 'id' };
			const mapper = createFieldMapper<Topic>(fieldNames);
			const topic: Topic = { id: 1, name: 'AI', slug: 'ai' };
			const result = mapper.toReferenceItem(topic);

			expect(result).toEqual({
				label: 'AI',
				value: 1,
				description: undefined,
				disabled: undefined
			});
		});

		it('should map all optional fields when provided', () => {
			const fieldNames: FieldNameMapping = {
				label: 'title',
				value: 'categoryId',
				description: 'description',
				disabled: 'isActive'
			};
			const mapper = createFieldMapper<Category>(fieldNames);
			const category: Category = {
				categoryId: 'tech',
				title: 'Technology',
				description: 'Tech articles',
				isActive: false
			};
			const result = mapper.toReferenceItem(category);

			expect(result).toEqual({
				label: 'Technology',
				value: 'tech',
				description: 'Tech articles',
				disabled: false
			});
		});

		it('should convert label to string', () => {
			const fieldNames: FieldNameMapping = { label: 'id', value: 'id' };
			const mapper = createFieldMapper<any>(fieldNames);
			const item = { id: 123, name: 'Test' };
			const result = mapper.toReferenceItem(item);

			expect(result.label).toBe('123');
			expect(typeof result.label).toBe('string');
		});

		it('should handle missing fields', () => {
			const fieldNames: FieldNameMapping = { label: 'name', value: 'id' };
			const mapper = createFieldMapper<any>(fieldNames);
			const item = { something: 'else' };
			const result = mapper.toReferenceItem(item);

			expect(result.label).toBe('');
			expect(result.value).toBeNull();
		});

	it('should handle null values', () => {
		const fieldNames: FieldNameMapping = { label: 'name', value: 'id' };
		const mapper = createFieldMapper<any>(fieldNames);
		const item = { name: null, id: null };
		const result = mapper.toReferenceItem(item);

		expect(result.label).toBe('');
		expect(result.value).toBeNull();
	});
	});

	describe('fromReferenceItem', () => {
		it('should convert ReferenceItem back to database object with default field names', () => {
			const mapper = createFieldMapper<any>(undefined);
			const refItem = { label: 'Test', value: 1, description: 'Desc', disabled: false };
			const result = mapper.fromReferenceItem(refItem);

			expect(result).toEqual({
				label: 'Test',
				value: 1,
				description: 'Desc',
				disabled: false
			});
		});

		it('should convert ReferenceItem back to database object with custom field names', () => {
			const fieldNames: FieldNameMapping = { label: 'name', value: 'id' };
			const mapper = createFieldMapper<Topic>(fieldNames);
			const refItem = { label: 'AI', value: 1, description: undefined, disabled: undefined };
			const result = mapper.fromReferenceItem(refItem);

			expect(result).toEqual({
				name: 'AI',
				id: 1
			});
		});

		it('should include optional fields when defined', () => {
			const fieldNames: FieldNameMapping = {
				label: 'title',
				value: 'categoryId',
				description: 'description',
				disabled: 'isActive'
			};
			const mapper = createFieldMapper<Category>(fieldNames);
			const refItem = {
				label: 'Technology',
				value: 'tech',
				description: 'Tech articles',
				disabled: false
			};
			const result = mapper.fromReferenceItem(refItem);

			expect(result).toEqual({
				title: 'Technology',
				categoryId: 'tech',
				description: 'Tech articles',
				isActive: false
			});
		});

		it('should not include optional fields when undefined', () => {
			const fieldNames: FieldNameMapping = {
				label: 'name',
				value: 'id',
				description: 'desc'
			};
			const mapper = createFieldMapper<any>(fieldNames);
			const refItem = {
				label: 'Test',
				value: 1,
				description: undefined,
				disabled: undefined
			};
			const result = mapper.fromReferenceItem(refItem);

			expect(result).toEqual({
				name: 'Test',
				id: 1
			});
			expect('description' in result).toBe(false);
			expect('disabled' in result).toBe(false);
		});
	});

	describe('extractValue', () => {
		it('should extract value with default field names', () => {
			const mapper = createFieldMapper<any>(undefined);
			const item = { value: 123, label: 'Test' };
			const result = mapper.extractValue(item);

			expect(result).toBe(123);
		});

		it('should extract value with custom field names', () => {
			const fieldNames: FieldNameMapping = { label: 'name', value: 'id' };
			const mapper = createFieldMapper<Topic>(fieldNames);
			const topic: Topic = { id: 42, name: 'AI', slug: 'ai' };
			const result = mapper.extractValue(topic);

			expect(result).toBe(42);
		});

		it('should handle string values', () => {
			const fieldNames: FieldNameMapping = { label: 'title', value: 'categoryId' };
			const mapper = createFieldMapper<any>(fieldNames);
			const category = { categoryId: 'tech', title: 'Technology' };
			const result = mapper.extractValue(category);

			expect(result).toBe('tech');
		});

		it('should return null for missing value field', () => {
			const fieldNames: FieldNameMapping = { label: 'name', value: 'id' };
			const mapper = createFieldMapper<any>(fieldNames);
			const item = { name: 'Test' };
			const result = mapper.extractValue(item);

			expect(result).toBeNull();
		});
	});

	describe('findByValue', () => {
		it('should find item by value with default field names', () => {
			const mapper = createFieldMapper<any>(undefined);
			const items = [
				{ value: 1, label: 'A' },
				{ value: 2, label: 'B' },
				{ value: 3, label: 'C' }
			];
			const result = mapper.findByValue(items, 2);

			expect(result).toEqual({ value: 2, label: 'B' });
		});

		it('should find item by value with custom field names', () => {
			const fieldNames: FieldNameMapping = { label: 'name', value: 'id' };
			const mapper = createFieldMapper<Topic>(fieldNames);
			const topics: Topic[] = [
				{ id: 1, name: 'AI', slug: 'ai' },
				{ id: 2, name: 'Web', slug: 'web' },
				{ id: 3, name: 'Cloud', slug: 'cloud' }
			];
			const result = mapper.findByValue(topics, 2);

			expect(result).toEqual({ id: 2, name: 'Web', slug: 'web' });
		});

		it('should return undefined for non-existent value', () => {
			const fieldNames: FieldNameMapping = { label: 'name', value: 'id' };
			const mapper = createFieldMapper<Topic>(fieldNames);
			const topics: Topic[] = [
				{ id: 1, name: 'AI', slug: 'ai' },
				{ id: 2, name: 'Web', slug: 'web' }
			];
			const result = mapper.findByValue(topics, 999);

			expect(result).toBeUndefined();
		});

		it('should handle string value matching', () => {
			const fieldNames: FieldNameMapping = { label: 'title', value: 'categoryId' };
			const mapper = createFieldMapper<any>(fieldNames);
			const categories = [
				{ categoryId: 'tech', title: 'Technology' },
				{ categoryId: 'business', title: 'Business' }
			];
			const result = mapper.findByValue(categories, 'tech');

			expect(result).toEqual({ categoryId: 'tech', title: 'Technology' });
		});

		it('should handle null value', () => {
			const fieldNames: FieldNameMapping = { label: 'name', value: 'id' };
			const mapper = createFieldMapper<any>(fieldNames);
			const items = [
				{ id: 1, name: 'A' },
				{ id: null, name: 'None' }
			];
			const result = mapper.findByValue(items, null);

			expect(result).toEqual({ id: null, name: 'None' });
		});
	});

	describe('bidirectional transformation', () => {
		it('should maintain data integrity through round-trip transformation', () => {
			const fieldNames: FieldNameMapping = { label: 'name', value: 'id' };
			const mapper = createFieldMapper<Topic>(fieldNames);
			const original: Topic = { id: 1, name: 'AI', slug: 'ai' };

			// Convert to ReferenceItem
			const refItem = mapper.toReferenceItem(original);
			expect(refItem.label).toBe('AI');
			expect(refItem.value).toBe(1);

			// Convert back to database object
			const restored = mapper.fromReferenceItem(refItem);
			expect(restored.name).toBe('AI');
			expect(restored.id).toBe(1);
		});

		it('should lose unmapped fields during transformation', () => {
			const fieldNames: FieldNameMapping = { label: 'name', value: 'id' };
			const mapper = createFieldMapper<Topic>(fieldNames);
			const original: Topic = { id: 1, name: 'AI', slug: 'ai' };

			// Convert to ReferenceItem and back
			const refItem = mapper.toReferenceItem(original);
			const restored = mapper.fromReferenceItem(refItem);

			// 'slug' field is lost because it's not mapped
			expect('slug' in restored).toBe(false);
		});
	});
});

describe('mapFields helper', () => {
	it('should create FieldNameMapping with required fields', () => {
		const result = mapFields('name', 'id');

		expect(result).toEqual({
			label: 'name',
			value: 'id'
		});
	});

	it('should create FieldNameMapping with description', () => {
		const result = mapFields('name', 'id', 'desc');

		expect(result).toEqual({
			label: 'name',
			value: 'id',
			description: 'desc'
		});
	});

	it('should create FieldNameMapping with all fields', () => {
		const result = mapFields('name', 'id', 'desc', 'disabled');

		expect(result).toEqual({
			label: 'name',
			value: 'id',
			description: 'desc',
			disabled: 'disabled'
		});
	});

	it('should not include optional fields when not provided', () => {
		const result = mapFields('name', 'id');

		expect('description' in result).toBe(false);
		expect('disabled' in result).toBe(false);
	});
});

describe('backwards compatibility', () => {
	it('should work with undefined fieldNames (defaults to ReferenceItem shape)', () => {
		const mapper = createFieldMapper<any>(undefined);
		const item = { label: 'Test', value: 1 };
		const refItem = mapper.toReferenceItem(item);

		expect(refItem).toEqual({
			label: 'Test',
			value: 1,
			description: undefined,
			disabled: undefined
		});
	});

	it('should work with empty fieldNames object (uses defaults)', () => {
		const mapper = createFieldMapper<any>({});
		const item = { label: 'Test', value: 1 };
		const refItem = mapper.toReferenceItem(item);

		expect(refItem).toEqual({
			label: 'Test',
			value: 1,
			description: undefined,
			disabled: undefined
		});
	});
});

describe('edge cases', () => {
	it('should handle numeric IDs', () => {
		const fieldNames: FieldNameMapping = { label: 'name', value: 'id' };
		const mapper = createFieldMapper<any>(fieldNames);
		const item = { id: 42, name: 'Test' };
		const refItem = mapper.toReferenceItem(item);

		expect(refItem.value).toBe(42);
		expect(typeof refItem.value).toBe('number');
	});

	it('should handle string IDs', () => {
		const fieldNames: FieldNameMapping = { label: 'name', value: 'id' };
		const mapper = createFieldMapper<any>(fieldNames);
		const item = { id: 'abc-123', name: 'Test' };
		const refItem = mapper.toReferenceItem(item);

		expect(refItem.value).toBe('abc-123');
		expect(typeof refItem.value).toBe('string');
	});

	it('should handle boolean disabled field', () => {
		const fieldNames: FieldNameMapping = {
			label: 'name',
			value: 'id',
			disabled: 'isInactive'
		};
		const mapper = createFieldMapper<any>(fieldNames);
		const item = { id: 1, name: 'Test', isInactive: true };
		const refItem = mapper.toReferenceItem(item);

		expect(refItem.disabled).toBe(true);
	});

	it('should handle empty string label', () => {
		const fieldNames: FieldNameMapping = { label: 'name', value: 'id' };
		const mapper = createFieldMapper<any>(fieldNames);
		const item = { id: 1, name: '' };
		const refItem = mapper.toReferenceItem(item);

		expect(refItem.label).toBe('');
	});

	it('should handle zero as value', () => {
		const fieldNames: FieldNameMapping = { label: 'name', value: 'id' };
		const mapper = createFieldMapper<any>(fieldNames);
		const item = { id: 0, name: 'Test' };
		const refItem = mapper.toReferenceItem(item);

		expect(refItem.value).toBe(0);
	});
});
