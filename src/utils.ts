export const baseUrl = 'https://opass.dsw.mywire.org/api';

function getDiscount(pass: number): number {
    if (pass >= 0 && pass <= 5) {
        return 0.0;
    } else if (pass >= 6 && pass <= 10) {
        return 0.15;
    } else if (pass >= 11 && pass <= 20) {
        return 0.3;
    } else if (pass >= 21 && pass <= 30) {
        return 0.4;
    } else if (pass >= 31 && pass <= 40) {
        return 0.5;
    } else if (pass > 40) {
        return 0.6;
    } else {
        return NaN;
    }
}

export function calculateTollsDiscount(monthWorkingDays: number, cost: number): number {
    const monthPasses = 2 * monthWorkingDays;
    let totalCost = 0.0;

    [...Array(monthPasses)].map((_, i) => {
        totalCost += cost - cost * getDiscount(i);
    });

    return totalCost;
}

export function calculateTollsWithoutDiscount(monthWorkingDays: number, cost: number): number {
    const monthPasses = 2 * monthWorkingDays;

    return [...Array(monthPasses)].reduce((accumulator) => accumulator + cost, 0);
}

export const MONTHS = [
    'Ιανουάριος',
    'Φεβρουάριος',
    'Μάρτιος',
    'Απρίλιος',
    'Μάιος',
    'Ιούνιος',
    'Ιούλιος',
    'Αύγουστος',
    'Σεπτέμβριος',
    'Οκτώβριος',
    'Νοέμβριος',
    'Δεκέμβριος',
];

export const moneyFmt = new Intl.NumberFormat('el-EL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
});
