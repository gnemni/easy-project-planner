import dayjs from 'dayjs';

const frenchHolidays = [
    '2025-01-01',
    '2025-04-21',
    '2025-05-01',
    '2025-05-08',
    '2025-05-29',
    '2025-07-14',
    '2025-08-15',
    '2025-11-01',
    '2025-12-25',
];

export const isWeekendOrHoliday = (dateStr: string): boolean => {
    const date = dayjs(dateStr);
    return date.day() === 0 || date.day() === 6 || frenchHolidays.includes(date.format('YYYY-MM-DD'));
};

export const generateWorkDays = (startDateStr: string, totalDays: number): Date[] => {
    const result: Date[] = [];
    let currentDate = dayjs(startDateStr);

    while (result.length < Math.ceil(totalDays)) {
        const dateStr = currentDate.format('YYYY-MM-DD');
        if (!isWeekendOrHoliday(dateStr)) {
            result.push(currentDate.toDate());
        }
        currentDate = currentDate.add(0.5, 'day'); // Demi-journées
    }

    return result.slice(0, totalDays);
};