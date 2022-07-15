import React, {FormEvent, useEffect, useState} from 'react';
import './App.css';
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import style from './app.module.scss'

function App() {
    const [maxValue, setMaxValue] = useState(5)
    const [startValue, setStartValue] = useState(0)
    const [counter, setCounter] = useState<number>(0)
    const [error, setError] = useState("")
    useEffect( () => {
        let startValueFromLocalStorage = localStorage.getItem('startValue')
        // startValueFromLocalStorage ? setStartValue(JSON.parse(startValueFromLocalStorage)) : return
        if(startValueFromLocalStorage) {
            let newValue = JSON.parse(startValueFromLocalStorage)
            setStartValue(newValue)
        }

        let maxValueFromLocalStorage = localStorage.getItem('maxValue')
        // maxValueFromLocalStorage ? setMaxValue(JSON.parse(maxValueFromLocalStorage)) : return
        if(maxValueFromLocalStorage) {
            let newValue = JSON.parse(maxValueFromLocalStorage)
            setMaxValue(newValue)
        }

        let counterFromLocalStorage = localStorage.getItem('counterValue')
        // counterFromLocalStorage ? setCounter(JSON.parse(counterFromLocalStorage)) : return
        if(counterFromLocalStorage) {
            let newValue = JSON.parse(counterFromLocalStorage)
            setCounter(newValue)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
    }, [maxValue])
    useEffect(() => {
        localStorage.setItem('startValue', JSON.stringify(startValue))
    }, [startValue])
    useEffect(() => {
        localStorage.setItem('counterValue', JSON.stringify(counter))
    }, [counter])

    useEffect(() => {
        const err_maxEqualOrLowerStart = "start cant be bigger or equal max"
        const err_maxTooLow = "max cant be lower than 0"
        const err_startTooLow = "start cant be lower than 0"
        const reset = ""

        if (startValue >= maxValue && error !== err_maxEqualOrLowerStart) {
            setError(err_maxEqualOrLowerStart)
        }
        if (maxValue < 0 && error !== err_maxTooLow) {
            setError(err_maxTooLow)
        }
        if (startValue < 0 && error !== err_startTooLow) {
            setError(err_startTooLow)
        }
        if (!(startValue >= maxValue) && !(maxValue < 0) && !(startValue < 0)) {
            setError(reset)
        }
    }, [maxValue, startValue])

    const onChangeHandler = (e: FormEvent<HTMLInputElement>, setValue: (value: number) => void) => {
        setValue(+e.currentTarget.value)
    }

    const onClickSetValue = () => {
        setCounter(startValue)
    }
    const onClickHandlerAdd = () => {
        if (counter === maxValue) {
            return
        } else setCounter(counter + 1)
    }
    const onClickHandlerReset = () => {
        setCounter(startValue)
    }

    return (
        <>
            <div className={style.container}>
                <div className={style.settings}>
                    <div className={style.input_container}>
                        <label>
                            max value
                            <Input
                                type={"number"}
                                error={error}
                                value={maxValue}
                                setValue={setMaxValue}
                                onChangeHandler={onChangeHandler}
                            />
                        </label>
                        <label>
                            start value
                            <Input
                                type={"number"}
                                error={error}
                                value={startValue}
                                setValue={setStartValue}
                                onChangeHandler={onChangeHandler}
                            />
                        </label>
                        <Button
                            name={"set"}
                            onClickHandler={onClickSetValue}
                            isDisabled={!!error}
                        />
                    </div>
                </div>
                <div className={style.counter}>
                    <div className={style.screen}>
                        <span style={maxValue === counter || error ? {color: "red"} : {}}>{error ? error : counter}</span>
                    </div>
                    <div>
                        <Button
                            name={"inc"}
                            onClickHandler={onClickHandlerAdd}
                            isDisabled={maxValue === counter}
                        />
                        <Button
                            name={"reset"}
                            onClickHandler={onClickHandlerReset}
                            isDisabled={startValue === counter}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
