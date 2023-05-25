import {
    Card,
    Subtitle1,
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
    Text,
    makeStyles,
} from '@fluentui/react-components';
import { TollCost } from '../model';
import { moneyFmt } from '../utils';

type ResultsProps = {
    results: TollCost[];
};

const useStyles = makeStyles({
    table: {
        width: 'auto',
    },
    card: {
        minWidth: '250px',
    },
});

export function Results({ results }: ResultsProps) {
    const styles = useStyles();

    return (
        <>
            {results.length > 0 && (
                <Card className={styles.card}>
                    <Table arial-label='Αποτελέσματα' className={styles.table}>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell>
                                    <Text weight='bold'>Σταθμός</Text>
                                </TableHeaderCell>
                                <TableHeaderCell>
                                    <Text weight='bold'>Κόστος</Text>
                                </TableHeaderCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {results.map((item) => (
                                <TableRow key={item.station}>
                                    <TableCell>{item.station}</TableCell>
                                    <TableCell>{moneyFmt.format(item.cost)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Subtitle1 align='end'>
                        {`Σύνολο: ${moneyFmt.format(
                            results.reduce((accumulator, currentValue) => accumulator + currentValue.cost, 0),
                        )}`}
                    </Subtitle1>
                </Card>
            )}
        </>
    );
}
