export const Canada_Provinces = [
	{ label: 'Alberta', value: 'ALB' },
	{ label: 'British Columbia', value: 'BC' },
	{ label: 'Labrador', value: 'LAB' },
	{ label: 'Manitoba', value: 'MAN' },
	{ label: 'New Brunswick', value: 'NB' },
	{ label: 'Newfoundland', value: 'NFD' },
	{ label: 'Newfoundland & Labrador', value: 'NFD' },
	{ label: 'Nova Scotia', value: 'NS' },
	{ label: 'Nunavut', value: 'NU' },
	{ label: 'Northwest Territories', value: 'NWT' },
	{ label: 'Ontario', value: 'ONT' },
	{ label: 'Prince Edward Island', value: 'PEI' },
	{ label: 'Quebec', value: 'QUE' },
	{ label: 'Saskatchewan', value: 'SAS' },
	{ label: 'Yukon', value: 'YT' }
];

export const Canada_ProvinceCodes = Canada_Provinces.map((row) => ({ ...row, name: row.value }));
