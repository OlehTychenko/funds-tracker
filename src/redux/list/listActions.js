import { ADD_TRANSACTION, REMOVE_ITEM, SORT_TRANSACTIONS } from "./listTypes";

export const removeItem = id => ({
    type: REMOVE_ITEM,
    payload: id
})

export const addTransaction = transaction => ({
    type: ADD_TRANSACTION,
    payload: transaction
})

export const sortTransactions = payload => ({
    type: SORT_TRANSACTIONS,
    payload: payload
})