import { ADD_TRANSACTION, REMOVE_ITEM } from "./listTypes";

export const removeItem = id => ({
    type: REMOVE_ITEM,
    payload: id
})

export const addTransaction = transaction => ({
    type: ADD_TRANSACTION,
    payload: transaction
})