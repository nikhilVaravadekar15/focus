import { createContext } from "react";
import { TFocusTabsSection, TMainActive, TRedirect } from "../types/types";

export const pageContext = createContext<TFocusTabsSection>({
    currentTab: 0,
    setMenuItemClick: () => { }
});

export const redirectContext = createContext<TRedirect>({
    redirectFlag: false,
    setRedirectFlagStatus: () => { }
});

export const mainActiveContext = createContext<TMainActive>({
    mainActive: false,
    setMainActiveFlagStatus: () => { }
});
