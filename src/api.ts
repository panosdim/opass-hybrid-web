import { Category, Direction, baseUrl } from './model';

export function fetchDirections(): Promise<Direction[]> {
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    };
    return fetch(baseUrl + '/directions', options)
        .then((response) => response.json())
        .catch((error) => console.log(error));
}

export function fetchCategories(): Promise<Category[]> {
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    };
    return fetch(baseUrl + '/categories', options)
        .then((response) => response.json())
        .catch((error) => console.log(error));
}

export function fetchEnters(direction: number): Promise<string[]> {
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
            direction: direction,
        }),
    };
    return fetch(baseUrl + '/enters', options)
        .then((response) => response.json())
        .catch((error) => console.log(error));
}

export function fetchExits(direction: number, enter: string): Promise<string[]> {
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
            direction: direction,
            enter: enter,
        }),
    };
    return fetch(baseUrl + '/exits', options)
        .then((response) => response.json())
        .catch((error) => console.log(error));
}
