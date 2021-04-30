import { ADD_TRANSACTION, REMOVE_ITEM, SORT_TRANSACTIONS } from "./listTypes"
import { v4 as uuidv4 } from 'uuid';
import { sortBy } from 'lodash';

const initialState = JSON.parse(localStorage.getItem('transactions'))[0] ? {
    list: JSON.parse(localStorage.getItem('transactions')),
    sort: {
        type: 'amount'
    }
} : {
    list: [
        { "id": "de8fa74d-528d-4bce-bd63-a3e813078b24", "type": "Income", "category": "Extra income", "amount": 30, "date": "2021-04-24" },
        { "id": "5ba44256-0b30-4ffa-b409-0462e95395e5", "type": "Income", "category": "Gifts", "amount": 150, "date": "2021-04-24" },
        { "id": "4af3265d-3d5f-44b6-b8dd-eafbcd46effd", "type": "Income", "category": "Investments", "amount": 50, "date": "2021-04-24" },
        { "id": "e1de55ad-38ac-42eb-8330-933cb260ae34", "type": "Income", "category": "Savings", "amount": 50, "date": "2021-04-24" },
        { "id": "8e6024d6-1161-4b78-8548-f7769e80ba85", "type": "Expense", "category": "Shopping", "amount": 50, "date": "2021-04-24" },
        { "id": "054c7313-5ca6-47c3-bd86-dadd28c75e97", "type": "Expense", "category": "Pets", "amount": 50, "date": "2021-04-24" },
        { "id": "aa1a1fcd-7d90-4271-9f18-3ebd453a8de6", "type": "Expense", "category": "Travel", "amount": 30, "date": "2021-04-24" }
    ],
    sort: {
        type: 'amount'
    }}

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_ITEM: {
            const list = state.list.filter((item) => action.payload !== item.id)
            localStorage.setItem('transactions', JSON.stringify(list))
            return {
                ...state,
                list
            }
        }
        case ADD_TRANSACTION: {
            const list = [...state.list, {
                id: uuidv4(),
                type: action.payload.type,
                category: action.payload.category,
                amount: action.payload.amount,
                date: action.payload.date
            }]
            localStorage.setItem('transactions', JSON.stringify(list))
            return {
                ...state,
                list
            }
        }
        case SORT_TRANSACTIONS: {
            const list = sortBy(state.list, [action.payload])
            const sort = {type: action.payload}
            console.log(sort)
            localStorage.setItem('transactions', JSON.stringify(list))
            return {
                ...state,
                sort,
                list
            }
        }
        default: return state
    }
}

export default listReducer