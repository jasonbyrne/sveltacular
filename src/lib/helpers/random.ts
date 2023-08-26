// Generate random integer between min and max
export const randomInt = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
// Generate random float between min and max
export const randomFloat = (min: number, max: number): number => {
	return Math.random() * (max - min) + min;
};
// Generate random boolean
export const randomBool = (): boolean => {
	return Math.random() >= 0.5;
};
// Generate random string
export const randomString = (length: number): string => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};
// Generate random date
export const randomDate = (start: Date, end: Date): Date => {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};
// Generate random color
export const randomColor = (): string => {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
};
// Generate random hex
export const randomHex = (length: number): string => {
	let result = '';
	const characters = 'abcdef0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};
// Generate random rgb
export const randomRGB = (): string => {
	return `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
};
// Generate random rgba
export const randomRGBA = (): string => {
	return `rgba(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomFloat(
		0,
		1
	)})`;
};
// Generate random hsl
export const randomHSL = (): string => {
	return `hsl(${randomInt(0, 360)}, ${randomInt(0, 100)}%, ${randomInt(0, 100)}%)`;
};
// Generate random hsla
export const randomHSLA = (): string => {
	return `hsla(${randomInt(0, 360)}, ${randomInt(0, 100)}%, ${randomInt(0, 100)}%, ${randomFloat(
		0,
		1
	)})`;
};
// Generate random email
export const randomEmail = (): string => {
	return `${randomString(10)}@${randomString(5)}.com`;
};
// Generate random phone number
export const randomPhone = (): string => {
	return `${randomInt(100, 999)}-${randomInt(100, 999)}-${randomInt(1000, 9999)}`;
};
// Generate random address
export const randomAddress = (): string => {
	return `${randomInt(100, 999)} ${randomString(10)} ${randomString(5)}`;
};
// Generate random city
export const randomCity = (): string => {
	return `${randomString(10)}`;
};
// Generate random state
export const randomState = (): string => {
	return `${randomString(2)}`;
};
// Generate random zip
export const randomZip = (): string => {
	return `${randomInt(10000, 99999)}`;
};
// Generate random country
export const randomCountry = (): string => {
	return `${randomString(10)}`;
};
// Generate random name
export const randomName = (): string => {
	return `${randomString(10)} ${randomString(10)}`;
};
// Generate random first name
export const randomFirstName = (): string => {
	return `${randomString(10)}`;
};
// Generate random last name
export const randomLastName = (): string => {
	return `${randomString(10)}`;
};
// Generate random username
export const randomUsername = (): string => {
	return `${randomString(10)}`;
};
// Generate random password
export const randomPassword = (): string => {
	return `${randomString(10)}`;
};
// Generate random avatar
export const randomAvatar = (): string => {
	return `https://avatars.dicebear.com/api/avataaars/${randomString(10)}.svg`;
};
