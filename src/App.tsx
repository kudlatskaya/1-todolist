import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

type TasksStateType = {
    // [key type]: value type
    [key: string]: TaskType[],
}

function App() {
    //BLL:
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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
        let _tasks = tasks[todoListId];
        let filteredTasks = _tasks.filter(t => t.id !== taskId);
        tasks[todoListId] = filteredTasks;
        setTasks({...tasks});
    }

    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }

        let newTodoList = [newTask, ...tasks[todoListId]]
        tasks[todoListId] = newTodoList;
        setTasks({...tasks})
    }

    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        let todoList = tasks[todoListId];

        let _todoList = todoList.map(item =>
            item.id === taskId
                ? {...item, isDone: newIsDone}
                : item
        )
        tasks[todoListId] = _todoList;

        setTasks({...tasks})
    }

    const changeTaskTitle = (taskId: string, newValue: string, todoListId: string) => {
        let todoList = tasks[todoListId];

        let _todoList = todoList.map(item =>
            item.id === taskId
                ? {...item, title: newValue}
                : item
        )
        tasks[todoListId] = _todoList;

        setTasks({...tasks})
    }

    const changeTodoListTitle = (todoListId: string, newValue: string) => {
        let _todoList = todoLists.find(item => item.id === todoListId);

        if(_todoList) {
            _todoList.title = newValue;
            setTodoLists([...todoLists]);
        }
    }

    const changeFilterValue = (filter: FilterValuesType, todoListId: string) => {
        let todoList = todoLists.find(item => item.id == todoListId)

        if (todoList) {
            todoList.filter = filter;
            setTodoLists([...todoLists]);
        }
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
        let filteredTodoList = todoLists.filter(item => item.id !== todoListId);
        setTodoLists(filteredTodoList);

        delete tasks[todoListId];
        setTasks({...tasks})
    }

    const addTodoList = (title: string) => {
        let todoList: TodoListType = {
            id: v1(),
            filter: 'all',
            title: title,
        }

        setTodoLists([todoList, ...todoLists])
        setTasks({...tasks, [todoList.id]: []})
    }

//UI:
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map(item => {
                    return (
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
                    )
                })
            }
        </div>
    );
}

export default App;
