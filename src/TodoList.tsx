import React, {ChangeEvent, RefObject, useRef, useState} from 'react';
import TasksList from "./TasksList";
import {FilterValuesType} from "./App";

type TotoListPropsType = {
    id: string,
    title: string,
    filter: FilterValuesType,
    tasks: Array<TaskType>,
    changeFilterValue: (filter: FilterValuesType, todoListId: string) => void,
    removeTask: (taskId: string, todoListId: string) => void,
    addTask: (title: string, todoListId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void,
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
    const [ error, setError ] = useState<boolean>(false)
    const maxLengthUserMessage: number = 15
    const isUserMessageToLong: boolean = title.length > maxLengthUserMessage

    const changeLocalTitle = (e:ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
            props.addTask(trimmedTitle, props.id)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const onKeyDownAddTask = (e:React.KeyboardEvent<HTMLInputElement>) => {e.key === 'Enter' && addTask()}

    const handlerCreator = (filter: FilterValuesType) => {
        return () => props.changeFilterValue(filter, props.id)
    }
    const setAllFilterValue = handlerCreator('all')
    const setActiveFilterValue = handlerCreator('active')
    const setCompletedFilterValue = handlerCreator('completed')

    const userMaxLengthMessage = isUserMessageToLong && <div style={{color: 'hotpink'}}>Task title is to long</div>
    const userErrorMessage = error && <div style={{color: 'hotpink'}}>Title is required!</div>
    const inputErrorClasses = error || isUserMessageToLong ? 'input-error' : ''
    const isAddBtnDisabled = title.length === 0

    return (
        <div className={'todolist'}>
            <h3>{props.title}</h3>
            <div>
                {/*<input ref={addTaskInput}/>*/}
                {/*<button onClick={addTask}>+</button>*/}
                <input
                    value={title}
                    placeholder={'Please input title'}
                    onChange={changeLocalTitle}
                    onKeyDown={onKeyDownAddTask}
                    className={inputErrorClasses}
                />
                <button
                    disabled={isAddBtnDisabled}
                    onClick={addTask}>+
                </button>

                {userMaxLengthMessage}
                {userErrorMessage}
            </div>

            <TasksList
                id={props.id}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
            />

            <div className={'filter-btn-container'}>
                <button className={props.filter === 'all' ? 'active-filter-btn' : 'filter-btn'} onClick={setAllFilterValue}>All</button>
                <button className={props.filter === 'active' ? 'active-filter-btn' : 'filter-btn'} onClick={setActiveFilterValue}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter-btn' : 'filter-btn'} onClick={setCompletedFilterValue}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;