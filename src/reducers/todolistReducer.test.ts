import {v1} from "uuid";
import {TodoListType} from "../App";
import {
    addTodoListAC,
    changeTodoListFilterValueAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistReducer
} from "./todolistReducer";
import {tasksReducer} from "./tasksReducer";
import {initialState as initialTasksState} from './tasksReducer.test'

test('remove todolist', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    const initialState: TodoListType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ]

    const expectedState = todolistReducer(initialState, removeTodoListAC(todoListId1))

    expect(expectedState.length).toBe(1);
    expect(expectedState[0].id).toBe(todoListId2);

})

test('add todolist', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();
     let todoListId3 = v1();

    const initialState: TodoListType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ]
    const action = addTodoListAC(todoListId3, 'newTodoList');

    const expectedState = todolistReducer(initialState, action)
    const expectedTasksState = tasksReducer(initialTasksState, action)
    const keys = Object.keys(expectedTasksState);

    expect(expectedState.length).toBe(3);
    expect(keys[2]).toBe(action.payload.id);
    expect(expectedState[2].id).toBe(action.payload.id);

})

test('change todolist title', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    const initialState: TodoListType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ]

    const expectedState = todolistReducer(initialState, changeTodoListTitleAC( todoListId1, 'newTodoList'))

    expect(expectedState.length).toBe(2);
    expect(expectedState[0].title).toBe('newTodoList');

})

test('change todolist filter', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    const initialState: TodoListType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ]

    const expectedState = todolistReducer(initialState, changeTodoListFilterValueAC( 'active', todoListId1))

    expect(expectedState.length).toBe(2);
    expect(expectedState[0].filter).toBe('active');

})