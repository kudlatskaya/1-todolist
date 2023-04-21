import {v1} from "uuid";
import {TasksStateType} from "../App";
import {AddTodoListACType, RemoveTodoListACType} from './todolistReducer'

type ActionType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodoListACType
    | RemoveTodoListACType

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {

        case "REMOVE-TASK": {

            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId]
                    .filter(t => t.id !== action.payload.taskId)
            };
        }

        case "ADD-TASK": {

            let newTask = {id: v1(), title: action.payload.title, isDone: false};
            let tasks = [...state[action.payload.todoListId], newTask];

            return {...state, [action.payload.todoListId]: tasks};
        }

        case "CHANGE-TASK-STATUS": {

            let tasks = [...state[action.payload.todoListId]];
            let newTasks = tasks.map(item =>
                item.id === action.payload.taskId
                    ? {...item, isDone: action.payload.isDone}
                    : item
            )

            return {...state, [action.payload.todoListId]: newTasks};
        }

        case "CHANGE-TASK-TITLE": {

            let tasks = [...state[action.payload.todoListId]];
            let newTasks = tasks.map(item =>
                item.id === action.payload.taskId
                    ? {...item, title: action.payload.title}
                    : item
            )

            return {...state, [action.payload.todoListId]: newTasks};
        }

        case "ADD_TODOLIST":
            return {...state, [action.payload.id]: []};

        case "REMOVE_TODOLIST":
            let _state = {...state}
            delete _state[action.payload.id]
            return _state;

        default:
            return state;
    }
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId,
            todoListId,
        }
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (title: string, todoListId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todoListId,
        }
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskId,
            todoListId,
            isDone,
        }
    } as const
}

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            taskId,
            todoListId,
            title,
        }
    } as const
}

// type AddTodolistACType = ReturnType<typeof addTodolistAC>
//
// export const addTodolistAC = (todoListId: string, title: string) => {
//     return {
//         type: 'ADD-TODOLIST',
//         payload: {
//             todoListId,
//             title,
//         }
//     } as const
// }

// type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
//
// export const removeTodolistAC = (todoListId: string) => {
//     return {
//         type: 'REMOVE-TODOLIST',
//         payload: {
//             todoListId,
//         }
//     } as const
// }
