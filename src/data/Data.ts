import { TFocusSectionInput, TFocustabsData } from "../types/types"
import IconBlocked from "../assets/images/icon-banned.png"
import IconFocus from "../assets/images/icon-focus.png"
import IconInsight from "../assets/images/icon-insight.png"

const focusTabs: TFocustabsData[] = [
    {
        "title": "Blocked",
        "image": IconBlocked,
        "background": "red"
    },
    {
        "title": "Focus",
        "image": IconFocus,
        "background": "green"
    },
    {
        "title": "Insight",
        "image": IconInsight,
        "background": "yellow"
    }
]

const focusSectionInput: TFocusSectionInput[] = [
    {
        "title": "Focus time",
        "type": "number",
        "name": "focus-time",
        "min": 10,
        "max": 999,
        "value": 25,
        "unit": "Minutes",
        handleOnChange: () => {}
    },
    {
        "title": "Break time",
        "type": "number",
        "name": "break-time",
        "min": 1,
        "max": 60,
        "value": 5,
        "unit": "Minutes",
        handleOnChange: () => {}
    },
    {
        "title": "Number of cycles",
        "type": "number",
        "name": "number-of-cycles",
        "min": 1,
        "max": 48,
        "value": 2,
        "unit": "Cycles",
        handleOnChange: () => {}
    }
]

export {
    focusTabs,
    focusSectionInput
}
