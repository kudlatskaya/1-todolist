import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type ActionType = AddTodoListACType
    | RemoveTodoListACType
    | ChangeTodoListTitleACType
    | ChangeTodoListFilterValueACType;

export const todolistReducer = (state: TodoListType[], action: ActionType): TodoListType[] => {

    switch(action.type) {
        case 'ADD_TODOLIST':
            // добавить в tasks

           /* let filteredTodoList = todoLists.filter(item => item.id !== todoListId);
            setTodoLists(filteredTodoList);

            delete tasks[todoListId];
            setTasks({...tasks})*/
            return [...state, {id: v1(), title: action.payload.title, filter: 'all'}];

        case 'REMOVE_TODOLIST':
            // удалить из tasks
            return state.filter(item => item.id !== action.payload.id);

        case 'CHANGE_TODOLIST_TITLE': {
            let newState = [...state];
            let todoList = newState.find(item => item.id === action.payload.id);
            if (todoList) {
                todoList.title = action.payload.id;
            }
            // изменить в tasks
            return newState;
        }

        case "CHANGE_TODOLIST_FILTER_VALUE": {
            let newState = [...state];
            let todoList = newState.find(item => item.id === action.payload.id);
            if (todoList) {
                todoList.filter = action.payload.filter;
            }
            // изменить в tasks
            return newState;
        }

        default:
            return state;
    }
}

type AddTodoListACType = ReturnType<typeof addTodoListAC>

export const addTodoListAC = (title: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            title,
        }
    } as const
}

type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>

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