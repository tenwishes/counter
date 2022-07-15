import React from 'react';
import style from './button.module.scss'

type ButtonPropsType = {
    name: string
    className?: string
    onClickHandler?: () => void
    isDisabled?: boolean
}

const Button = ({name, className, onClickHandler, isDisabled}: ButtonPropsType) => {
    return (
        <button
            disabled={isDisabled}
            onClick={onClickHandler}
            className={className ? className : style.button}
        >{name}</button>
    );
};

export default Button;