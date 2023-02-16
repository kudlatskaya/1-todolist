import React, {ChangeEvent, RefObject, useRef, useState} from 'react';
import TasksList from "./TasksList";
import {FilterValuesType} from "./App";

type TotoListPropsType = {
    title: string,
    tasks: Array<TaskType>,
    changeFilterValue: (filter: FilterValuesType) => void,
    removeTask: (taskId: string) => void,
    addTask: (title: string) => void,
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

const TodoList = (props: TotoListPropsType) => {
    // const addTaskInput: RefObject<HTMLInputElement> = useRef(null)
    //
    // const addTask = () => {
    //     if(addTaskInput.current) {
    //         props.addTask(addTaskInput.current.value)
    //         addTaskInput.current.value = ""
    //     }
    // }

    const [ title, setTitle ] = useState<string>('')

    const changeLocalTitle = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
            props.addTask(title)
        }
        setTitle('')
    }

    const onKeyDownAddTask = (e:React.KeyboardEvent<HTMLInputElement>) => {e.key === 'Enter' && addTask()}

    const setAllFilterValue = () => props.changeFilterValue('all')
    const setActiveFilterValue = () => props.changeFilterValue('active')
    const setCompletedFilterValue = () => props.changeFilterValue('completed')

    return (
        <div className={'todolist'}>
            <h3>{props.title}</h3>
            <div>
                {/*<input ref={addTaskInput}/>*/}
                {/*<button onClick={addTask}>+</button>*/}
                <input
                    value={title}
                    onChange={changeLocalTitle}
                    onKeyDown={onKeyDownAddTask}
                />
                <button
                    disabled={title.length === 0}
                    onClick={addTask}>+
                </button>

                {title.length > 15 && <div style={{color: 'hotpink'}}>Task title is to long</div>}
            </div>

            <TasksList tasks={props.tasks} removeTask={props.removeTask}/>

            <div>
                <button onClick={setAllFilterValue}>All</button>
                <button onClick={setActiveFilterValue}>Active</button>
                <button onClick={setCompletedFilterValue}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;