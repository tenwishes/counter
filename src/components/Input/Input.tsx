import React, {FormEvent} from 'react';
import s from './input.module.scss'

type InputPropsType = {
    className?: string
    type?: any
    value?: string | number
    onChangeHandler: (e: FormEvent<HTMLInputElement>, setValue: (value: number) => void) => void
    setValue: (value: number) => void
    error?: string

}

const Input = ({value, onChangeHandler, className, type, error, setValue}: InputPropsType) => {
    const errorStyle = {
        border: "1px solid red"
    }

    return (
        <>
            <input
                style={error ? errorStyle : {}}
                type={type} value={value}
                onChange={(e) => onChangeHandler(e, setValue)}
                className={className ? className : s.input}
            />
        </>
    );
};

export default Input;