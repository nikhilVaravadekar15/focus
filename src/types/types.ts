import { type } from "os"

// main
export type TFocustabsData = {
    title: string
    image: string
    background: string
}

// tabs actions
export type TFocusTabsSection = {
    currentTab: number
    setMenuItemClick: (index: number) => void
}

// tabs details
export type TTabsSection = {
    index: number
    title: string
    image: string
    background: string
    currentTab: number
    handleMenuItemClick: (index: number) => void
}

// aio
export type TCustomClassName = {
    classname: string
}

// WebsiteContent
export type TWebsiteContent = {
    currentWebsiteOrigin: string
    currentWebsiteHostname: string
    currentWebsiteFavIcon: string
}

// CoverUpSection
export type TCoverUpSection = {
    classname: string
    title: string
}


// focusSectionInput
export type TFocusSectionInput = {
    title: string
    type: string
    name: string
    min: number
    max: number
    value: number
    unit: string
    handleOnChange: (event: any) => void 
}

// dashboard navigationbar
export type TNavigationbarData = {
    image: string
    title: string
    url: string
}