import React, {ChangeEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void,
}

export function AddItemForm(props: AddItemFormPropsType) {
    // const addTaskInput: RefObject<HTMLInputElement> = useRef(null)
    //
    // const addTask = () => {
    //     if(addTaskInput.current) {
    //         props.addTask(addTaskInput.current.value)
    //         addTaskInput.current.value = ""
    //     }
    // }

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const maxLengthUserMessage: number = 15
    const isUserMessageToLong: boolean = title.length > maxLengthUserMessage
    const isAddBtnDisabled = title.length === 0
    const userErrorMessage = error && <div style={{color: 'hotpink'}}>Title is required!</div>
    const userMaxLengthMessage = isUserMessageToLong && <div style={{color: 'hotpink'}}>Task title is to long</div>

    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const onKeyDownAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTask()
    }

    const inputErrorClasses = error || isUserMessageToLong ? 'input-error' : ''

    return <div>
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
}