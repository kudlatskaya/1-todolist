import React from 'react';
import TasksList from "./TasksList";

type TotoListPropsType = {
    title: string,
    tasks: Array<TaskType>
}

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

const TodoList = (props: TotoListPropsType) => {
    return (
        <div className={'todolist'}>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <TasksList tasks={props.tasks} />
            </ul>

            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;