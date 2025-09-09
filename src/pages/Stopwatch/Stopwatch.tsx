import type React from "react";
import { useEffect, useReducer } from "react";

import styles from "./Stopwatch.module.scss";


type TimerState = {
    id: number,
    ms: number,
    ss: number,
    mm: number,
    stateRun: boolean,
    statePause: boolean,
    startTime: Date
}

type TimerPayload = {
    startTime?: Date,
    nowTime?: Date,
    run?: boolean,
    pause?: boolean
}

type TimerActions = {
    type: string,
    payload: TimerPayload
}

const FORM_TIMER_ACTIONS = {
    setStartTime: 'setStartTime',
    setRun: 'setRun',
    setPause: 'setPause',
    setClear: 'setClear',
    viewTime: 'viewTime'
}

const Timer: TimerState = {
    id: 0,
    ms: 0,
    ss: 0,
    mm: 0,
    stateRun: false,
    statePause: false,
    startTime: new Date(Date.now())
}

function timerReducer(state: TimerState, action: TimerActions) {
    switch (action.type) {
        case FORM_TIMER_ACTIONS.setStartTime:
            return {
                ...state,
                startTime: action.payload.startTime ?? new Date(Date.now())
            };

        case FORM_TIMER_ACTIONS.setRun:
            return {
                ...state,
                stateRun: action.payload.run ?? false
            };

        case FORM_TIMER_ACTIONS.setClear:
            return {
                ...state,
                ms: 0,
                ss: 0,
                mm: 0
            }

        case FORM_TIMER_ACTIONS.setPause:
            return {
                ...state,
                statePause: action.payload.pause ?? false
            };

        case FORM_TIMER_ACTIONS.viewTime:
            if (!action.payload.nowTime) return state;
            const diff = action.payload.nowTime.getTime() - state.startTime.getTime();
            const mm = Math.floor(diff / 60000);
            const ss = Math.floor((diff % 60000) / 1000);
            const ms = Math.floor((diff % 1000));
            return {
                ...state,
                mm,
                ss,
                ms
            };
        default: return state;
    }
}

const Stopwatch: React.FC = () => {
    const [timer, timerDispatch] = useReducer(timerReducer, Timer)

    const handleStart = () => {
        timerDispatch({ type: FORM_TIMER_ACTIONS.setRun, payload: { run: true } })

        const nowTime = new Date(Date.now());
        timerDispatch({ type: FORM_TIMER_ACTIONS.setStartTime, payload: { startTime: nowTime } });

        if (timer.statePause) timerDispatch({ type: FORM_TIMER_ACTIONS.setPause, payload: { pause: false } })
    }

    const handleStop = () => {
        timerDispatch({ type: FORM_TIMER_ACTIONS.setRun, payload: { run: false } });
        timerDispatch({ type: FORM_TIMER_ACTIONS.setPause, payload: { pause: true } })
    }

    const handleResume = () => {
        timerDispatch({ type: FORM_TIMER_ACTIONS.setPause, payload: { pause: false } });
        timerDispatch({ type: FORM_TIMER_ACTIONS.setRun, payload: { run: true } })
    }

    const handleClean = () => {
        timerDispatch({ type: FORM_TIMER_ACTIONS.setClear, payload: {} })
        timerDispatch({ type: FORM_TIMER_ACTIONS.setRun, payload: { run: false } })
        timerDispatch({ type: FORM_TIMER_ACTIONS.setPause, payload: { pause: false } })
    }

    useEffect(() => {
        if (!timer.stateRun) return

        const interval = setInterval(() => {
            const nowTime = new Date(Date.now());
            timerDispatch({ type: FORM_TIMER_ACTIONS.viewTime, payload: { nowTime: nowTime } })
        }, 50)

        return (() => { clearInterval(interval) })
    }, [timer.stateRun])

    return (
        <div className={styles.stopwatch}>
            <p className={styles.stopwatch__time}>{`${timer.mm.toString().padStart(2, '0')}:${timer.ss.toString().padStart(2, '0')}.${timer.ms.toString().padStart(3, '0')} `}</p>

            <button className={styles.stopwatch__start} onClick={handleStart} disabled={timer.stateRun || timer.statePause}>Начать</button>
            {timer.statePause
                ? <button className={styles.stopwatch__buttons} onClick={handleResume}>Продолжить</button>
                : <button className={styles.stopwatch__buttons} onClick={handleStop} disabled={!timer.stateRun}>Пауза</button>}
            <button className={styles.stopwatch__buttons} onClick={handleClean} disabled={(timer.ms === 0 && timer.ss === 0 && timer.mm === 0)}>Сбросить</button>
        </div>
    );
};

export default Stopwatch;