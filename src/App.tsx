import {Reducer, useReducer} from 'react';
import './App.css';
import TodoList, {TaskType} from "./todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    ActionType as TodolistActionType,
    addTodoListAC,
    changeTodoListFilterValueAC,
    changeTodoListTitleAC, removeTodoListAC,
    todolistReducer,
} from "./state/todolistReducer";
import {
    ActionType as TasksActionType,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./state/tasksReducer";

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

export type TasksStateType = {
    // [key type]: value type
    [key: string]: TaskType[],
}

function App() {
    //BLL:
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, dispatchTodoLists] = useReducer<Reducer<TodoListType[], TodolistActionType>>(todolistReducer, [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchTasks] = useReducer<Reducer<TasksStateType, TasksActionType>>(tasksReducer, {
        [todoListId1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "ES6 & TS", isDone: true},
            {id: v1(), title: "React & Redux", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
        ],
    })

    const removeTask = (taskId: string, todoListId: string) => {
        dispatchTasks(removeTaskAC(taskId, todoListId))
    }

    const addTask = (title: string, todoListId: string) => {
        dispatchTasks(addTaskAC(title, todoListId))
    }

    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        dispatchTasks(changeTaskStatusAC(taskId, newIsDone, todoListId))
    }

    const changeTaskTitle = (taskId: string, newValue: string, todoListId: string) => {
        dispatchTasks(changeTaskTitleAC(taskId, newValue, todoListId))
    }

    const changeTodoListTitle = (todoListId: string, newValue: string) => {
        dispatchTodoLists(changeTodoListTitleAC(todoListId, newValue));
    }

    const changeFilterValue = (filter: FilterValuesType, todoListId: string) => {
        dispatchTodoLists(changeTodoListFilterValueAC(filter, todoListId));
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone);
            case 'completed':
                return tasks.filter(t => t.isDone);
            default:
                return tasks;
        }
    }

    const removeTodoList = (todoListId: string) => {
        const action = removeTodoListAC(todoListId)
        dispatchTasks(action)
        dispatchTodoLists(action)
    }

    const addTodoList = (title: string) => {
        const action = addTodoListAC(v1(), title)
        dispatchTasks(action)
        dispatchTodoLists(action)
    }

//UI:
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container>
                <Grid container style={{padding:'20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map((item, index) => {
                            return (
                                <Grid item key={index}>
                                    <Paper style={{padding:'10px'}} elevation={3}>
                                        <TodoList
                                            key={item.id}
                                            id={item.id}
                                            title={item.title}
                                            tasks={getFilteredTasks(tasks[item.id], item.filter)}
                                            filter={item.filter}
                                            changeFilterValue={changeFilterValue}
                                            removeTask={removeTask}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                            removeTodoList={removeTodoList}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
