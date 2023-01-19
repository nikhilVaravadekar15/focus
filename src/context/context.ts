import { createContext } from "react";
import { TFocusTabsSection, TRedirect, TSchedule } from "../types/types";

export const pageContext = createContext<TFocusTabsSection>({
    currentTab: 0,
    setMenuItemClick: () => { }
});

export const redirectContext = createContext<TRedirect>({
    redirectFlag: false,
    setRedirectFlagStatus: () => { }
});

export const scheduleContext = createContext<TSchedule>({
    scheduleFlag: false,
    setScheduleFlagStatus: () => { }
});
