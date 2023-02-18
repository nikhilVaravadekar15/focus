import React, { useState } from 'react'
import "./Focusio.css"

type TFocusio = {
    handleOnChange: (event: any) => void
    handleFocusMode: (event: any) => void
}

function Focusio({ handleOnChange, handleFocusMode }: TFocusio) {
    return (
        <div className="Focusio">
            <div className="options__focus-inputs">
                <h2> Timer Setup </h2>
                <div className="section_focus-middle">

                    <div className="focus-input-item middle__input-area focus-time">
                        <div className="input-area__time">
                            <div className="time__title" title={"Focus time"}>
                                <h3>{"Focus time"}</h3>
                                <p>{"Set the desired time to focus. Sites in your focus mode list will be blocked."}</p>
                            </div>
                            <div className="time__input">
                                <div className="input-area">
                                    <input
                                        type={'number'}
                                        name={"focus-time"}
                                        min={10}
                                        max={999}
                                        value={25}
                                        onChange={handleOnChange}
                                    />
                                </div>
                                <div className="input-unit">
                                    <h3>{"Minutes"}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="focus-input-item middle__input-area break-time">
                        <div className="input-area__time">
                            <div className="time__title" title={"Break time"}>
                                <h3>{"Break time"}</h3>
                                <p>{"Set the desired break time and freely visit those websites from your list."}</p>
                            </div>
                            <div className="time__input">
                                <div className="input-area">
                                    <input
                                        type={'number'}
                                        name={"break-time"}
                                        min={1}
                                        max={60}
                                        value={5}
                                        onChange={handleOnChange}
                                    />
                                </div>
                                <div className="input-unit">
                                    <h3>{"Minutes"}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="focus-input-item middle__input-area number-of-cycles">
                        <div className="input-area__time">
                            <div className="time__title" title={"Number of cycles"}>
                                <h3>{"Number of cycles"}</h3>
                                <p>{"The number of cycles of focus time and breaks you wish to run automatically."}</p>
                            </div>
                            <div className="time__input">
                                <div className="input-area">
                                    <input
                                        type={'number'}
                                        name={"number-of-cycles"}
                                        min={1}
                                        max={48}
                                        value={2}
                                        onChange={handleOnChange}
                                    />
                                </div>
                                <div className="input-unit">
                                    <h3>{"Cycles"}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="start-button"
                    onClick={(event) => handleFocusMode(event)}
                >
                    <div>Start Focus Session</div>
                </div>
            </div>
        </div>
    )
}

export default Focusio
