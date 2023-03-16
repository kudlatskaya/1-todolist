import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string,
    onChange: (newValue: string) => void,
}

export function EditableSpan(props: EditableSpanPropsType) {
    // const taskClasses = ['task']
    // task.isDone && taskClasses.push('task-done')
    //className={taskClasses.join(' ')}
    const {title, onChange} = props;

    let [editMode, setEditMode] = useState<boolean>(false);
    let [newTitle, setNewTitle] = useState<string>('');

    const activatedEditMode = () => {
        setEditMode(true);
        setNewTitle(title);
    }

    const activatedViewMode = () => {
        setEditMode(false);
        onChange(newTitle);
    }

    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value);

    return (
        editMode
            ? <input type="text" value={newTitle} onBlur={activatedViewMode} onChange={onChangeTitleHandler} autoFocus/>
            : <span onDoubleClick={activatedEditMode}>{props.title}</span>
    )
}