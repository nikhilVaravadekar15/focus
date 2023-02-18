
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

// DButton 
export type TDButton = {
    icon: string
    title: string
    handler: (flag: boolean) => void
}

// WebsiteContent
export type TWebsiteContent = {
    currentWebsiteOrigin: string
    currentWebsiteHostname: string
    currentWebsiteFavIcon: string
}


// focusSectionInput
export type TFocusSectionInput = {
    title: string
    type: string
    name: string
    description: string
    min: number
    max: number
    value: number
    unit: string
}

export type TFocus = {
    status: boolean
    tempStatus: boolean
    current: number
    focusArray: TFocusSectionInput[]
}

export type TFocusSectionInputhandler = TFocusSectionInput & {
    handleOnChange: (event: any) => void
}

// dashboard navigationbar
export type TNavigationbarData = {
    image: string
    title: string
    url: string
}

// navigationbarTabs
export type TNavigationbarTabs = {
    index: number
    title: string
    image: string
    url: string
}


// blocked website
export type TBlockedWebsite = {
    websiteFavIcon: string
    websiteOrigin: string // "www.github.com",
    hostname: string // "github.com",
    blockedStatus: boolean, //true
}

// focus mode details
export type TfocusMode = {
    focusTime: number
    breakTime: number
    numberOfCycles: number
}


// BlockInput
export type TBlockInput = {
    value: string
    setInputValue: (val: string) => void
    handleClick: (event: any) => void
}

// snackbar
export type TSnackbar = {
    flag: boolean
    icon: string
    value: string
}

// BlockedSiteList 
export type TBlockedSiteList = {
    list: TBlockedWebsite[]
    updateBlockList: (websiteOrigin: string) => void
    deleteBlockListItem: (websiteOrigin: string, index: number) => void
}

// redirect 
export type TRedirect = {
    redirectFlag: boolean
    setRedirectFlagStatus: (flag: boolean) => void
}

// schedule
export type TSchedule = {
    scheduleFlag: boolean
    setScheduleFlagStatus: (flag: boolean) => void
}

export type TMainActive = {
    mainActive: boolean
    setMainActiveFlagStatus: (flag: boolean) => void
}

export type TScheduleDay = {
    title: string
    abbrev: string
    flag: boolean
}

export type TScheduleData = {
    status: boolean
    starttime: string
    endtime: string
    days: TScheduleDay[]
}

// Categories 
export type TCategories = {
    image: string
    title: string
    status: boolean
}

//  TSetting  
export type TSetting = {
    title: string
    description: string
    reditect?: string
    flag: boolean
}
