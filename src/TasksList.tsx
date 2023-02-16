import React from 'react';
import {TaskType} from "./TodoList";

type TasksListPropsType = {
    tasks: Array<TaskType>,
    removeTask: (taskId: string) => void,
}

const TasksList = (props: TasksListPropsType) => {

    const tasksItems = props.tasks.length
        ? props.tasks.map((task) => {
            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={() => props.removeTask(task.id)}>x</button>
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

export default TasksList;