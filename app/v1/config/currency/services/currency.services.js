import { create_currency, find_all_currency, find_currency } from "../queries/currency.queries.js";

export const ADD_CURRENCY_SERVICES = async (CURRENCY) => {
    const check_currency = await find_currency(Number(CURRENCY.id));
    console.log({check_currency})
    if (check_currency) return false;
    const add_currency = await create_currency(CURRENCY);
    return add_currency;
};

export const FIND_ALL_CURRENCY_SERVICES = async () => {
    const all_currency = await find_all_currency();
    return all_currency;
};
