import { TFocustabsData } from "../types/types"
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


export {
    focusTabs
}
