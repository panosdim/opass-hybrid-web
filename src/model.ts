export const baseUrl = 'http://localhost:8080/api';

export type Direction = {
    id: number;
    name: string;
};

export type Category = {
    id: number;
    name: string;
};

export type OptionOnSelectData = {
    optionValue: string | undefined;
    optionText: string | undefined;
    selectedOptions: string[];
};
