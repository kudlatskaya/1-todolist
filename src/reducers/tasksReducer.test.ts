import {v1} from "uuid";
import {TasksStateType} from "../App";
import {
    addEmptyTasksAC,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC, removeTasksAC,
    TasksReducer
} from "./tasksReducer";

let todoListId1 = v1();
let todoListId2 = v1();
let todoListId3 = v1();

let taskId1 = v1();
let taskId2 = v1();
let taskId3 = v1();
let taskId4 = v1();
let taskId5 = v1();

const initialState: TasksStateType = {
    [todoListId1]: [
        {id: taskId1, title: "HTML & CSS", isDone: true},
        {id: taskId2, title: "ES6 & TS", isDone: true},
        {id: taskId3, title: "React & Redux", isDone: false},
    ],
    [todoListId2]: [
        {id: taskId4, title: "Book", isDone: false},
        {id: taskId5, title: "Milk", isDone: true},
    ],
}

test('remove task', () => {

    const expectedState = TasksReducer(initialState, removeTaskAC(taskId1, todoListId1))

    expect(expectedState[todoListId1].length).toBe(2);
    expect(expectedState[todoListId1][0].id).toBe(taskId2);
})

test('add task', () => {

    const expectedState = TasksReducer(initialState, addTaskAC('newTask', todoListId1))

    expect(expectedState[todoListId1].length).toBe(4);
    expect(expectedState[todoListId1][3].title).toBe('newTask');
})

test('change task status', () => {

    const expectedState = TasksReducer(initialState, changeTaskStatusAC(taskId1, false, todoListId1))

    expect(expectedState[todoListId1][0].isDone).toBe(false);
})

test('change task title', () => {

    const expectedState = TasksReducer(initialState, changeTaskTitleAC(taskId1, 'newTitle', todoListId1))

    expect(expectedState[todoListId1][0].title).toBe('newTitle');
})

test('add empty tasks array', () => {

    const expectedState = TasksReducer(initialState, addEmptyTasksAC(todoListId3))

    expect(expectedState[todoListId3]).toStrictEqual([]);
})

test('remove tasks array', () => {

    const expectedState = TasksReducer(initialState, removeTasksAC(todoListId1))

    expect(expectedState[todoListId1]).toBe(undefined);
})