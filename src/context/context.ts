import { createContext } from "react";
import { TFocusTabsSection } from "../types/types";

export const pageContext = createContext<TFocusTabsSection>({
    currentTab: 0,
    setMenuItemClick: () => {}
});
