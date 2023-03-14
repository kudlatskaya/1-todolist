import React from 'react';
import TasksList from "./TasksList";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";

type TotoListPropsType = {
    id: string,
    title: string,
    filter: FilterValuesType,
    tasks: Array<TaskType>,
    changeFilterValue: (filter: FilterValuesType, todoListId: string) => void,
    removeTask: (taskId: string, todoListId: string) => void,
    addTask: (title: string, todoListId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void,
    removeTodoList: (todoListId: string) => void,
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

const TodoList = (props: TotoListPropsType) => {
    const handlerCreator = (filter: FilterValuesType) => {
        return () => props.changeFilterValue(filter, props.id)
    }

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const setAllFilterValue = handlerCreator('all')
    const setActiveFilterValue = handlerCreator('active')
    const setCompletedFilterValue = handlerCreator('completed')

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    return (
        <div className={'todolist'}>
            <h3>{props.title}
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm  addItem={addTask}/>

            <TasksList
                id={props.id}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
            />

            <div className={'filter-btn-container'}>
                <button className={props.filter === 'all' ? 'active-filter-btn' : 'filter-btn'}
                        onClick={setAllFilterValue}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter-btn' : 'filter-btn'}
                        onClick={setActiveFilterValue}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter-btn' : 'filter-btn'}
                        onClick={setCompletedFilterValue}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;