import React from 'react'
import "./Focusio.css"
import { focusSectionInput } from '../../../../data/Data'
import { TFocusSectionInput } from '../../../../types/types'
import FocusInput from '../../../../components/focusInput/FocusInput'



function Focusio() {
    return (
        <div className="Focusio">
            <div className="options__focus-inputs">
                <h2> Timer Setup </h2>
                <div className="section_focus-middle">
                    {
                        focusSectionInput.map((item: TFocusSectionInput, index: number) => {
                            return (
                                <FocusInput
                                    key={index}
                                    title={item["title"]}
                                    type={item["type"]}
                                    name={item["name"]}
                                    description={item["description"]}
                                    min={item["min"]}
                                    max={item["max"]}
                                    value={item["value"]}
                                    unit={item["unit"]}
                                    handleOnChange={() => { }}
                                />
                            )
                        })
                    }
                </div>
                <div className="start-button">
                    <div>Start Focus Session</div>
                </div>
            </div>
        </div>
    )
}

export default Focusio
