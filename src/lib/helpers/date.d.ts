export declare const currentDate: () => string;
export declare const currentDateTime: () => string;
/**
 * Get the current date plus x days in YYYY-MM-DD format
 *
 * @param days
 * @param fromDate
 * @returns YYYY-MM-DD
 */
export declare const addDays: (days: number, fromDate?: string) => string;
export declare const dateTimeFromSupabase: (dateTime: string | null) => string;
export declare const dateTimeToSupabase: (dateTime: string) => string | null;
export declare const dateTimeToHuman: (dateTime: string) => string;
