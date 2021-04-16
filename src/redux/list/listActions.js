import { REMOVE_ITEM } from "./listTypes";

export const removeItem = id => ({
    type: REMOVE_ITEM,
    payload: id
})