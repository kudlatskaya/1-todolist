import {TodoListType} from "../App";
import {v1} from "uuid";

type ActionType = AddTodoListACType | RemoveTodoListACType;

export const TodolistReducer = (state: TodoListType[], action: ActionType): TodoListType[] => {

    switch(action.type) {
        case 'ADD_TODOLIST':
            return [...state, {id: v1(), title: action.payload.title, filter: 'all'}];

        case 'REMOVE_TODOLIST':
            return state.filter(item => item.id !== action.payload.id);

        default:
            return state;
    }
}

type AddTodoListACType = ReturnType<typeof addTodoListAC>

const addTodoListAC = (title: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            title,
        }
    } as const
}

type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>

const removeTodoListAC = (id: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            id,
        }
    } as const
}