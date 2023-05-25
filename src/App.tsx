import { makeStyles, tokens } from '@fluentui/react-components';
import { useState } from 'react';
import { DiscountResults } from './components/DiscountResults';
import { DiscountTable } from './components/DiscountTable';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { Results } from './components/Results';
import { TollCost } from './model';

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
    const [results, setResults] = useState<TollCost[]>([]);
    return (
        <>
            <Header />
            <div className={styles.container}>
                <InputForm setResults={setResults} />
                <DiscountTable />
                <Results results={results} />
                <div className={styles.results}>
                    <DiscountResults results={results} />
                </div>
            </div>
        </>
    );
}

export default App;
