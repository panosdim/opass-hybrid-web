import {
    Card,
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
    Text,
    makeStyles,
} from '@fluentui/react-components';

const useStyles = makeStyles({
    table: {
        width: 'max-content',
    },
    tableBody: {
        textAlign: 'center',
    },
});

export function DiscountTable() {
    const styles = useStyles();
    return (
        <Card>
            <Table arial-label='Πρόγραμμα κλιμακωτών εκπτώσεων VALUE' className={styles.table}>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>
                            <Text weight='bold'>Αριθμός Μηνιαίων Διελεύσεων</Text>
                        </TableHeaderCell>
                        <TableHeaderCell>
                            <Text weight='bold'>% έκπτωσης ανά διέλευση</Text>
                        </TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody className={styles.tableBody}>
                    <TableRow>
                        <TableCell>1-5</TableCell>
                        <TableCell>0%</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>6-10</TableCell>
                        <TableCell>15%</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>11-20</TableCell>
                        <TableCell>30%</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>21-30</TableCell>
                        <TableCell>40%</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>31-40</TableCell>
                        <TableCell>50%</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>40+</TableCell>
                        <TableCell>60%</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    );
}
