import React, {ChangeEvent} from 'react';
import {TaskType} from "./Todolist";
import {EditableSpan} from "../components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from '@mui/material/Checkbox';

type TasksListPropsType = {
    id: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string, todoListId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void,
    changeTaskTitle: (taskId: string, newValue: string, todoListId: string) => void,
}

const TasksList = (props: TasksListPropsType) => {

    const tasksItems = props.tasks.length
        ? props.tasks.map((task) => {
            const removeTaskHandler = () => props.removeTask(task.id, props.id);
            const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
            };

            const onChangeTitleHandler = (newValue: string) => {
                props.changeTaskTitle(task.id, newValue, props.id)
            }

            return (
                <li key={task.id}>
                    {/*<input*/}
                    {/*    type="checkbox"*/}
                    {/*    checked={task.isDone}*/}
                    {/*    onChange={onChangeTaskStatusHandler}*/}
                    {/*/>*/}
                    <Checkbox checked={task.isDone} onChange={onChangeTaskStatusHandler} />

                    <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
                    {/*<button onClick={removeTaskHandler}>x</button>*/}
                    <IconButton aria-label="delete" onClick={removeTaskHandler}>
                        <DeleteIcon/>
                    </IconButton>
                </li>
            )
        })
        : <span>Your tasks list is empty</span>

    return (
        <div>
            {tasksItems}
        </div>
    );
};


//31.39
export default TasksList;