import IconBlocked from "../assets/images/icon-banned.png"
import IconFocus from "../assets/images/icon-focus.png"
import IconInsight from "../assets/images/icon-insight.png"
import IconBlockByWords from "../assets/images/icon_add-words.png"
import IconCategories from "../assets/images/icon_category.png"
import IconSettings from "../assets/images/icon-settings.png"
import IconAbout from "../assets/images/icon_about.png"
import { TCategories, TNavigationbarData, TScheduleData, TSetting } from "../types/types"


const navigationbarData: TNavigationbarData[] = [
    {
        "image": IconBlocked,
        "title": "Block Sites",
        "url": "#/block-sites"
    },
    {
        "image": IconFocus,
        "title": "Focus Mode",
        "url": "#/focus-mode"
    },
    {
        "image": IconInsight,
        "title": "Insights",
        "url": "#/insights"
    },
    {
        "image": IconBlockByWords,
        "title": "Block By Words",
        "url": "#/block-by-words"
    },
    {
        "image": IconCategories,
        "title": "Categories",
        "url": "#/categories"
    },
    {
        "image": IconSettings,
        "title": "Settings",
        "url": "#/settings"
    },
    {
        "image": IconAbout,
        "title": "About",
        "url": "#/about"
    }
]

const categoriesData: TCategories[] = [
    {
        "image": "🔞",
        "title": "Adult",
        "status": true
    },
    {
        "image": "💬",
        "title": "Social",
        "status": false
    },
    {
        "image": "🛍",
        "title": "Shopping",
        "status": false
    },
    {
        "image": "🗞",
        "title": "News",
        "status": false
    },
    {
        "image": "🏀",
        "title": "Sports",
        "status": false
    },
    {
        "image": "🃏",
        "title": "Gambling",
        "status": true
    },
    {
        "image": "⚕️",
        "title": "Health",
        "status": false
    },
    {
        "image": "🎮",
        "title": "Games",
        "status": false
    },
    {
        "image": "💸",
        "title": "Finance",
        "status": false
    },
    {
        "image": "👭",
        "title": "Community and Society Website",
        "status": false
    },
    {
        "image": "🎭",
        "title": "Arts & Entertainment",
        "status": false
    }
]

const scheduleData: TScheduleData = {
    "status": false,
    "starttime": "00:00",
    "endtime": "00:00",
    "days": [
        {
            "title": "monday",
            "abbrev": "M",
            "flag": true
        },
        {
            "title": "tuesday",
            "abbrev": "T",
            "flag": true
        },
        {
            "title": "wednesday",
            "abbrev": "W",
            "flag": true
        },
        {
            "title": "thursday",
            "abbrev": "T",
            "flag": true
        },
        {
            "title": "friday",
            "abbrev": "F",
            "flag": true
        },
        {
            "title": "saturday",
            "abbrev": "S",
            "flag": true
        },
        {
            "title": "sunday",
            "abbrev": "S",
            "flag": true
        }
    ]
}

const settingsData: TSetting[] = [
    {
        "title": "Close the tab when blocked wessite is accessed",
        "description": "Enable this to close tab when blocked website is accessed instead of redirected",
        "flag": false
    },
    {
        "title": "Show remaining time on favicon",
        "description": "Enable this to show the time left in current interval on the extension's favicon.",
        "flag": true
    },
    {
        "title": "Enable \"Block By Category\" Blocking",
        "description": "Allows BlockSite to access your visited URLs, IP address, operating system, and browser information, for use as directed in our",
        "reditect": "Privacy Policy.",
        "flag": true
    },
    {
        "title": "Enable BlockSite shortcut option using right-click",
        "description": "Add sites to your block list or your focus mode list by right-clicking and selecting the BlockSite menu on a website.",
        "flag": true
    }
]

const data: any = {
    "mainActive": true,
    "navigation": 0,
    "redirectUrl": "redirect.html",
    "focusModeStatus": false,
    "focusModeCurrent": 1,
    "focusModeDetails": {
        "focusTime": 25,
        "breakTime": 5,
        "numberOfCycles": 2
    },
    "scheduleData": scheduleData,
    "categoriesData": categoriesData,
    "settingsData": settingsData,
    "blockByWords": [],
    "blockedWebsites": [],
    "focusBlockList": []
}

export {
    navigationbarData,
    scheduleData,
    categoriesData,
    settingsData,
    data
}
