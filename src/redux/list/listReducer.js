import { ADD_TRANSACTION, REMOVE_ITEM } from "./listTypes"
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    list: [
        { id: uuidv4(), type: 'Income', category: 'Salary', amount: 50, date: 'Fri Apr 16' },
        { id: uuidv4(), type: 'Expense', category: 'Pets', amount: 30, date: 'Fri Apr 22' },
        { id: uuidv4(), type: 'Income', category: 'Business', amount: 150, date: 'Fri Apr 09' }
    ]
}

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_ITEM: {
            const list = state.list.filter((item) => action.payload !== item.id)
            return {
                ...state,
                list
            }
        }
        case ADD_TRANSACTION: {
            const list = [...state.list, action.payload]
            return {
                ...state,
                list
            }
        }
        default: return state
    }
}

export default listReducer