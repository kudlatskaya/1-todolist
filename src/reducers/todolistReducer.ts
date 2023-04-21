import {FilterValuesType, TodoListType} from "../App";

type ActionType = AddTodoListACType
    | RemoveTodoListACType
    | ChangeTodoListTitleACType
    | ChangeTodoListFilterValueACType;

export const todolistReducer = (state: TodoListType[], action: ActionType): TodoListType[] => {
    switch(action.type) {

        case 'ADD_TODOLIST':
            return [...state, {id: action.payload.id, title: action.payload.title, filter: 'all'}];

        case 'REMOVE_TODOLIST':
            return state.filter(item => item.id !== action.payload.id);

        case 'CHANGE_TODOLIST_TITLE': {

            let newState = [...state];
            let todoList = newState.find(item => item.id === action.payload.id);
            if (todoList) {
                todoList.title = action.payload.title;
            }

            return newState;
        }

        case "CHANGE_TODOLIST_FILTER_VALUE": {

            let newState = [...state];
            let todoList = newState.find(item => item.id === action.payload.id);
            if (todoList) {
                todoList.filter = action.payload.filter;
            }

            return newState;
        }

        default:
            return state;
    }
}

export type AddTodoListACType = ReturnType<typeof addTodoListAC>

export const addTodoListAC = (id: string, title: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            id,
            title,
        }
    } as const
}

export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>

export const removeTodoListAC = (id: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            id,
        }
    } as const
}

type ChangeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>

export const changeTodoListTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            id,
            title,
        }
    } as const
}

type ChangeTodoListFilterValueACType = ReturnType<typeof changeTodoListFilterValueAC>

export const changeTodoListFilterValueAC = (filter: FilterValuesType, id: string) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER_VALUE',
        payload: {
            id,
            filter,
        }
    } as const
}