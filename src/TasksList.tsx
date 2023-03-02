import React, {ChangeEvent} from 'react';
import {TaskType} from "./TodoList";

type TasksListPropsType = {
    tasks: Array<TaskType>,
    removeTask: (taskId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean) => void,
}

const TasksList = (props: TasksListPropsType) => {

    const tasksItems = props.tasks.length
        ? props.tasks.map((task) => {
            const taskClasses = ['task']
            task.isDone && taskClasses.push('task-done')

            const removeTaskHandler = () => props.removeTask(task.id);
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {props.changeTaskStatus(task.id, e.currentTarget.checked)};
            return (
                <li key={task.id}>
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={changeTaskStatusHandler}
                    />
                    <span className={taskClasses.join(' ')}>{task.title}</span>
                    <button onClick={removeTaskHandler}>x</button>
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