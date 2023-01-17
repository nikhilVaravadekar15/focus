import { createContext } from "react";
import { TFocusTabsSection, TRedirect } from "../types/types";

export const pageContext = createContext<TFocusTabsSection>({
    currentTab: 0,
    setMenuItemClick: () => {}
});

export const redirectContext = createContext<TRedirect>({
    redirectFlag: false,
    setRedirectFlagStatus: () => {}
});
