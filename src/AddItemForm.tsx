import React, {ChangeEvent, useState} from "react";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";

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

    const buttonSettings = {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px',
    }

    return <div>
        {/*<input ref={addTaskInput}/>*/}
        {/*<button onClick={addTask}>+</button>*/}
        {/*<input*/}
        {/*    value={title}*/}
        {/*    placeholder={'Please input title'}*/}
        {/*    onChange={changeLocalTitle}*/}
        {/*    onKeyDown={onKeyDownAddTask}*/}
        {/*    className={inputErrorClasses}*/}
        {/*/>*/}
        <TextField id="outlined-basic"
                   size='small'
                   value={title}
                   placeholder={'Please input title'}
                   onChange={changeLocalTitle}
                   onKeyDown={onKeyDownAddTask}
                   label={error ? "Title is required" : "Please type..."}
                   variant="outlined"
                   error={error}
        />
        {/*<button*/}
        {/*    disabled={isAddBtnDisabled}*/}
        {/*    onClick={addTask}>+*/}
        {/*</button>*/}
        <Button size="small"
                variant="contained"
                onClick={addTask}
                style={buttonSettings}
        >
            +
        </Button>

        {/*{userMaxLengthMessage}*/}
        {/*{userErrorMessage}*/}
    </div>
}