import React, {ChangeEvent} from 'react';
import {TaskType} from "./TodoList";

type TasksListPropsType = {
    id: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string, todoListId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void,
}

const TasksList = (props: TasksListPropsType) => {

    const tasksItems = props.tasks.length
        ? props.tasks.map((task) => {
            const taskClasses = ['task']
            task.isDone && taskClasses.push('task-done')

            const removeTaskHandler = () => props.removeTask(task.id, props.id);
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)};
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