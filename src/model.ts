export type Direction = {
    id: number;
    name: string;
};

export type Category = {
    id: number;
    name: string;
};

export type TollCost = {
    station: string;
    cost: number;
};

export type OptionOnSelectData = {
    optionValue: string | undefined;
    optionText: string | undefined;
    selectedOptions: string[];
};
