import React, { useState } from 'react'
import "./Timer.css"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

type TTimer = {
    counter: number
    cycles: number
    duration: number
}

function Timer({ counter, cycles, duration }: TTimer) {

    return (
        <div className="Timer">
            <div className="status">
                {counter} of {cycles} cycles | Focus for {duration / 60} minutes
            </div>
            <div className="progress">
                <CountdownCircleTimer
                    isPlaying
                    duration={duration}
                    strokeWidth={12}
                    colors={"#2596be"}
                >
                    {CounterTime}
                </CountdownCircleTimer>
            </div>
            <div className="helper-text">
                <p>No sites in block list blocked</p>
                {/* <p>Focus session sites are blocked</p> */}
            </div>
            <div className="reset-button">
                <div>Reset</div>
            </div>
        </div>
    )
}

function CounterTime({ remainingTime }: any) {
    let hours: number = Math.floor(remainingTime / 3600)
    let minutes: number = Math.floor((remainingTime % 3600) / 60)
    let seconds: number = remainingTime % 60

    return (
        <div className="Counter">
            <div className='actual-counter'>{hours}:{minutes}:{seconds}</div>
            <div className="units">
                <span>hr</span>
                <span>min</span>
                <span>sec</span>
            </div>
        </div>
    )
}

export default Timer
