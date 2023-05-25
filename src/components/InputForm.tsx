import { Button, Card, Dropdown, Option, useId } from '@fluentui/react-components';
import React, { useState } from 'react';
import { calculateTolls, fetchCategories, fetchDirections, fetchEnters, fetchExits } from '../api';
import { Category, Direction, OptionOnSelectData, TollCost } from '../model';

type InputFormProps = {
    setResults: (data: TollCost[]) => void;
};

export function InputForm({ setResults }: InputFormProps) {
    const directionDropdownId = useId('direction-dropdown');
    const enterDropdownId = useId('enter-dropdown');
    const exitDropdownId = useId('exit-dropdown');
    const categoryDropdownId = useId('category-dropdown');

    const [directions, setDirections] = useState<Direction[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [enters, setEnters] = useState<string[]>([]);
    const [exits, setExits] = useState<string[]>([]);

    const [selectedDirection, setSelectedDirection] = React.useState<OptionOnSelectData>();
    const [selectedCategory, setSelectedCategory] = React.useState<OptionOnSelectData>();

    const [enterValue, setEnterValue] = React.useState<string>('');
    const [enterSelected, setEnterSelected] = React.useState<string[]>([]);
    const [exitValue, setExitValue] = React.useState<string>('');
    const [exitSelected, setExitSelected] = React.useState<string[]>([]);

    React.useEffect(() => {
        fetchDirections().then((data: Direction[]) => setDirections(data));
        fetchCategories().then((data: Category[]) => setCategories(data));
    }, []);

    React.useEffect(() => {
        if (selectedDirection) {
            fetchEnters(Number(selectedDirection.optionValue)).then((data) => setEnters(data));
        }
    }, [selectedDirection]);

    React.useEffect(() => {
        if (selectedDirection && !!enterValue) {
            fetchExits(Number(selectedDirection.optionValue), enterValue).then((data) => setExits(data));
            setExitValue('');
            setExitSelected([]);
        }
    }, [enterValue, selectedDirection]);

    const onDirectionOptionSelect = (_event: unknown, data: OptionOnSelectData) => {
        if (data.optionValue !== selectedDirection?.optionValue) {
            setSelectedDirection(data);
            setEnterValue('');
            setEnterSelected([]);
            setExitValue('');
            setExitSelected([]);
        }
    };

    const onCategoryOptionSelect = (_event: unknown, data: OptionOnSelectData) => {
        if (data.optionValue !== selectedCategory?.optionValue) {
            setSelectedCategory(data);
        }
    };

    const onEnterOptionSelect = (_event: unknown, data: OptionOnSelectData) => {
        setEnterValue(data.optionText ?? '');
        setEnterSelected(data.selectedOptions);
    };

    const onExitOptionSelect = (_event: unknown, data: OptionOnSelectData) => {
        setExitValue(data.optionText ?? '');
        setExitSelected(data.selectedOptions);
    };

    const isFormValid = (): boolean => {
        return !!selectedDirection && !!enterValue && !!exitValue && !!selectedCategory;
    };

    const calculate = () => {
        calculateTolls(
            Number(selectedDirection?.optionValue),
            enterValue,
            exitValue,
            Number(selectedCategory?.optionValue),
        ).then((data) => setResults(data));
    };

    return (
        <Card>
            <label id={directionDropdownId}>Κατεύθυνση</label>
            <Dropdown
                disabled={directions && directions.length == 0}
                onOptionSelect={onDirectionOptionSelect}
                aria-labelledby={directionDropdownId}
                placeholder='Select a direction'
            >
                {directions.map((option) => (
                    <Option key={option.id} value={option.id.toString()}>
                        {option.name}
                    </Option>
                ))}
            </Dropdown>

            <label id={enterDropdownId}>Είσοδος</label>
            <Dropdown
                disabled={enters.length == 0}
                aria-labelledby={enterDropdownId}
                placeholder='Select an entry station'
                onOptionSelect={onEnterOptionSelect}
                value={enterValue}
                selectedOptions={enterSelected}
            >
                {enters.map((option) => (
                    <Option key={option}>{option}</Option>
                ))}
            </Dropdown>

            <label id={exitDropdownId}>Έξοδος</label>
            <Dropdown
                disabled={exits.length == 0}
                aria-labelledby={exitDropdownId}
                placeholder='Select an exit station'
                onOptionSelect={onExitOptionSelect}
                value={exitValue}
                selectedOptions={exitSelected}
            >
                {exits.map((option) => (
                    <Option key={option}>{option}</Option>
                ))}
            </Dropdown>

            <label id={categoryDropdownId}>Κατηγορία</label>
            <Dropdown
                aria-labelledby={categoryDropdownId}
                placeholder='Select a category'
                onOptionSelect={onCategoryOptionSelect}
            >
                {categories.map((option) => (
                    <Option key={option.id} value={option.id.toString()}>
                        {option.name}
                    </Option>
                ))}
            </Dropdown>

            <Button onClick={calculate} disabled={!isFormValid()} appearance='primary'>
                Υπολογισμός
            </Button>
        </Card>
    );
}
