
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
