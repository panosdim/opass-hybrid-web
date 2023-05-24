import { makeStyles, tokens } from '@fluentui/react-components';
import './App.css';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { Results } from './components/Results';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        columnGap: tokens.spacingHorizontalM,
    },
    results: {
        flexGrow: 2,
    },
});

function App() {
    const styles = useStyles();
    return (
        <>
            <Header />
            <div className={styles.container}>
                <InputForm />
                <div className={styles.results}>
                    <Results />
                </div>
            </div>
        </>
    );
}

export default App;
