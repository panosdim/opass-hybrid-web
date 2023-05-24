import { Card, Display, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import logo from './logo.png';

const useStyles = makeStyles({
    headerImage: {
        ...shorthands.borderRadius('4px'),
        maxWidth: '92px',
        maxHeight: '92px',
        marginRight: tokens.spacingHorizontalS,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    card: {
        marginBottom: tokens.spacingHorizontalM,
    },
});

export function Header() {
    const styles = useStyles();
    return (
        <Card className={styles.card}>
            <div className={styles.header}>
                <img className={styles.headerImage} src={logo} alt='Opass Calculator Logo' />
                <Display align='center'>Opass Calculator</Display>
            </div>
        </Card>
    );
}
