export const Canada_Provinces = [
	{ name: 'Alberta', value: 'ALB' },
	{ name: 'British Columbia', value: 'BC' },
	{ name: 'Labrador', value: 'LAB' },
	{ name: 'Manitoba', value: 'MAN' },
	{ name: 'New Brunswick', value: 'NB' },
	{ name: 'Newfoundland', value: 'NFD' },
	{ name: 'Newfoundland & Labrador', value: 'NFD' },
	{ name: 'Nova Scotia', value: 'NS' },
	{ name: 'Nunavut', value: 'NU' },
	{ name: 'Northwest Territories', value: 'NWT' },
	{ name: 'Ontario', value: 'ONT' },
	{ name: 'Prince Edward Island', value: 'PEI' },
	{ name: 'Quebec', value: 'QUE' },
	{ name: 'Saskatchewan', value: 'SAS' },
	{ name: 'Yukon', value: 'YT' }
];

export const Canada_ProvinceCodes = Canada_Provinces.map((row) => ({ ...row, name: row.value }));
