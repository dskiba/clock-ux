import React, {useState} from 'react'
import * as s from './styles'
import {useInterval} from './useInterval'

const randomArr = maxLength => {
    let arr = []
    while (arr.length < maxLength) {
        var r = Math.floor(Math.random() * maxLength) + 1
        if (arr.indexOf(r) === -1) arr.push(r)
    }
    return arr
}

export const Ticks = ({degs}) => {
    const {ticks, hrs, mins, secs} = degs
    return (
        <div className={'clock_ticks'}>
            {ticks.map((t, idx) => {
                const id = idx + 1
                return (
                    <s.clockTick d={id} key={t} className={'clock_tick'}>
                        <s.Number
                            d={id - 1}
                            isHour={hrs === id}
                            isMin={mins === id}
                            isSec={secs === id}
                        >
                            {t}
                        </s.Number>
                    </s.clockTick>
                )
            })}
        </div>
    )
}

const findTrueIdx = (arr, value) => {
    const trueIdx = arr.findIndex(v => {
        return v === value
    })
    return trueIdx + 1
}

export const Clock = () => {
    const [isRunning, setIsRunning] = useState(true)
    useInterval(() => {
            handleSeTicks()
        },
        isRunning ? 1000 : null
    )
    const getTicks = () => {
        const ticks = randomArr(60)
        const now = new Date()
        const nowHrs = now.getHours()
        const nowMins = now.getMinutes()
        const nowSecs = now.getSeconds()
        const hrs = findTrueIdx(ticks, nowHrs)
        const mins = findTrueIdx(ticks, nowMins)
        const secs = findTrueIdx(ticks, nowSecs)
        return {ticks, hrs, mins, secs}
    }
    const {ticks, hrs, mins, secs} = getTicks()

    const [state, setState] = useState({
        ticks,
        hrs,
        mins,
        secs
    })

    const handleSeTicks = () => {
        const newTicks = getTicks()
        setState(newTicks)
    }

    return (
        <>
            <s.ButtonsWrapper>
                <s.Button onClick={handleSeTicks}>Tick!</s.Button>
                <s.Button
                    onClick={() => {
                        if (!isRunning) {
                            handleSeTicks()
                        }
                        setIsRunning(!isRunning)
                    }}
                >
                    {isRunning ? 'Stop' : 'Start'}
                </s.Button>
            </s.ButtonsWrapper>

            <s.Clock id="clock">
                <Ticks degs={state}/>
                <s.clockHour deg={state.hrs}/>
                <s.clockMinute deg={state.mins}/>
                <s.clockSecond
                    deg={state.secs}
                />
            </s.Clock>
        </>
    )
}
