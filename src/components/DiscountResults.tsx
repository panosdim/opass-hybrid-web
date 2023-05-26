import { Card, Subtitle1, Subtitle2, Text, makeStyles, tokens } from '@fluentui/react-components';
import { TollCost } from '../model';
import { MONTHS, calculateTollsDiscount, calculateTollsWithoutDiscount, moneyFmt } from '../utils';
import { getWorkingDays } from '../workdays';

type DiscountResultsProps = {
    results: TollCost[];
};

const useStyles = makeStyles({
    table: {
        width: 'auto',
    },
    card: {
        minWidth: '250px',
    },
    flex: {
        display: 'flex',
        flexDirection: 'column',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
        justifyContent: 'center',
        columnGap: tokens.spacingHorizontalXL,
        rowGap: tokens.spacingHorizontalXL,
    },
});

export function DiscountResults({ results }: DiscountResultsProps) {
    const styles = useStyles();
    const costPerPass = results.reduce((accumulator, currentValue) => accumulator + currentValue.cost, 0);

    return (
        <>
            {results.length > 0 && (
                <Card className={styles.card}>
                    <Subtitle1 align='center'>Μηνιαίο Κόστος για εργάσιμες ημέρες</Subtitle1>
                    <Subtitle2 align='center'>Αριθμός Ημερήσιων Διελευσεων 2</Subtitle2>
                    <div className={styles.grid}>
                        {MONTHS.map((month: string, index: number) => (
                            <div key={month} className={styles.flex}>
                                <Text size={500} weight='bold'>
                                    {month}
                                </Text>
                                <Text>Χωρίς Opass</Text>
                                <Text>
                                    {moneyFmt.format(calculateTollsWithoutDiscount(getWorkingDays(index), costPerPass))}
                                </Text>
                                <Text>Με Opass</Text>
                                <Text size={500} weight='bold'>
                                    {moneyFmt.format(calculateTollsDiscount(getWorkingDays(index), costPerPass))}
                                </Text>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </>
    );
}
