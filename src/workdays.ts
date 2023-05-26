import {
    add,
    differenceInBusinessDays,
    endOfMonth,
    isAfter,
    isBefore,
    isEqual,
    setMonth,
    startOfMonth,
    sub,
} from 'date-fns';

function getOrthodoxEaster(year: number): Date {
    const oed: Date = new Date();

    const r1 = year % 4;
    const r2 = year % 7;
    const r3 = year % 19;
    const r4 = (19 * r3 + 15) % 30;
    const r5 = (2 * r1 + 4 * r2 + 6 * r4 + 6) % 7;
    let days = r5 + r4 + 13;

    if (days > 39) {
        days = days - 39;
        oed.setFullYear(year);
        oed.setMonth(4);
        oed.setDate(days);
    } else if (days > 9) {
        days = days - 9;
        oed.setFullYear(year);
        oed.setMonth(3);
        oed.setDate(days);
    } else {
        days = days + 22;
        oed.setFullYear(year);
        oed.setMonth(2);
        oed.setDate(days);
    }
    return oed;
}

function getBankHolidays(year: number): Date[] {
    const holidays: Date[] = [];
    const newYearEve = new Date(year, 0, 1);
    const epiphany = new Date(year, 0, 6);
    const easter = getOrthodoxEaster(year);
    const cleanMonday = sub(easter, { days: 48 });
    const independenceDay = new Date(year, 2, 25);
    const goodFriday = sub(easter, { days: 2 });
    const easterMonday = add(easter, { days: 1 });
    const labourDay = new Date(year, 4, 1);
    const whitMonday = add(easter, { days: 50 });
    const assumption = new Date(year, 7, 15);
    const ochiDay = new Date(year, 9, 28);
    const christmas = new Date(year, 11, 25);
    const glorifying = new Date(year, 11, 26);
    holidays.push(newYearEve);
    holidays.push(epiphany);
    holidays.push(cleanMonday);
    holidays.push(independenceDay);
    holidays.push(goodFriday);
    holidays.push(easterMonday);
    holidays.push(labourDay);
    holidays.push(whitMonday);
    holidays.push(assumption);
    holidays.push(ochiDay);
    holidays.push(christmas);
    holidays.push(glorifying);
    return holidays;
}

const isBetween = (date: Date, from: Date, to: Date, inclusively = '[]') => {
    if (!['()', '[]', '(]', '[)'].includes(inclusively)) {
        throw new Error('Inclusively parameter must be one of (), [], (], [)');
    }

    const isBeforeEqual = inclusively[0] === '[',
        isAfterEqual = inclusively[1] === ']';

    return (
        (isBeforeEqual ? isEqual(from, date) || isBefore(from, date) : isBefore(from, date)) &&
        (isAfterEqual ? isEqual(to, date) || isAfter(to, date) : isAfter(to, date))
    );
};

export function getWorkingDays(month: number): number {
    const now = new Date();
    const curMonth = setMonth(now, month);
    const nextMonth = add(endOfMonth(curMonth), { days: 1 });

    let businessDays = differenceInBusinessDays(startOfMonth(nextMonth), startOfMonth(curMonth));

    const holidays = getBankHolidays(now.getFullYear());

    holidays.forEach((holiday) => {
        if (isBetween(holiday, startOfMonth(curMonth), endOfMonth(curMonth))) {
            businessDays -= 1;
        }
    });

    return businessDays;
}
