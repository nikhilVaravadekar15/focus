import React, { useState } from 'react'
import "./Timer.css"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

function Timer() {
    const [duration, setDuration] = useState<number>(0);

    return (
        <div className="Timer">
            <div className="status">
                1 of 5 cycles | Focus for 10 minutes
            </div>
            <div className="progress">
                <CountdownCircleTimer
                    isPlaying
                    duration={duration}
                    strokeWidth={12}
                    colors={"#2596be"}
                >
                    {Counter}
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

function Counter({ remainingTime }: any) {
    let hrs, mins, secs: string = ""
    let hours: number = Math.floor(remainingTime / 3600)
    let minutes: number = Math.floor((remainingTime % 3600) / 60)
    const seconds: number = remainingTime % 60

    if (hours.toString().length === 1) {
        hrs = "0" + hours.toString()
    }
    if (minutes.toString().length === 1) {
        mins = "0" + minutes.toString()
    }
    if (seconds.toString().length === 1) {
        secs = "0" + seconds.toString()
    }

    return (
        <div className="Counter">
            <div className='actual-counter'>{hrs}:{mins}:{secs}</div>
            <div className="units">
                <span>hr</span>
                <span>min</span>
                <span>sec</span>
            </div>
        </div>
    )
}

export default Timer
