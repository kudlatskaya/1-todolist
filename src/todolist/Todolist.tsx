import React from 'react';
import TasksList from "./TasksList";
import {FilterValuesType} from "../App";
import {AddItemForm} from "../components/AddItemForm";
import {EditableSpan} from "../components/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

type TotoListPropsType = {
    id: string,
    title: string,
    filter: FilterValuesType,
    tasks: Array<TaskType>,
    changeFilterValue: (filter: FilterValuesType, todoListId: string) => void,
    removeTask: (taskId: string, todoListId: string) => void,
    addTask: (title: string, todoListId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void,
    changeTaskTitle: (taskId: string, newValue: string, todoListId: string) => void,
    changeTodoListTitle: (todoListId: string, newValue: string) => void,
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

    const onChangeTodoListTitleHandler = (newValue: string) => {
        props.changeTodoListTitle(props.id, newValue)
    }

    return (
        <div className={'todolist'}>
            <h3>
                <EditableSpan title={props.title} onChange={onChangeTodoListTitleHandler}/>

                <IconButton aria-label="delete" onClick={removeTodoList}>
                    <DeleteIcon/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>

            <TasksList
                id={props.id}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
                changeTaskTitle={props.changeTaskTitle}
            />

            <div className={'filter-btn-container'}>
                <Button variant={props.filter === 'all' ? 'outlined' : 'contained'}
                        color="success"
                        onClick={setAllFilterValue}>
                    All
                </Button>
                <Button variant={props.filter === 'active' ? 'outlined' : 'contained'}
                        color="error"
                        onClick={setActiveFilterValue}>
                    Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                        color="secondary"
                        onClick={setCompletedFilterValue}>
                    Completed
                </Button>
            </div>
        </div>
    );
};


export default TodoList;