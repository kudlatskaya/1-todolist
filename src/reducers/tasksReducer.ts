import {v1} from "uuid";
import {TasksStateType} from "../App";

type ActionType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddEmptyTasksACType
    | RemoveTasksACType

export const TasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {

        case "REMOVE-TASK": {

            let tasks = [...state[action.payload.todoListId]];
            let filteredTasks = tasks.filter(t => t.id !== action.payload.taskId);

            return {...state, [action.payload.todoListId]: filteredTasks};
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

        case "ADD-EMPTY-TASKS":
            return {...state, [action.payload.todoListId]: []};

        case "REMOVE-TASKS":
            let _state = {...state}
            delete _state[action.payload.todoListId]
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

type AddEmptyTasksACType = ReturnType<typeof addEmptyTasksAC>

export const addEmptyTasksAC = (todoListId: string) => {
    return {
        type: 'ADD-EMPTY-TASKS',
        payload: {
            todoListId,
        }
    } as const
}

type RemoveTasksACType = ReturnType<typeof removeTasksAC>

export const removeTasksAC = (todoListId: string) => {
    return {
        type: 'REMOVE-TASKS',
        payload: {
            todoListId,
        }
    } as const
}
