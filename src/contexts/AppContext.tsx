import { ReactNode, createContext, useContext, useState } from "react";

const initialState = { drawerOpen: false };
const AppContext = createContext<
  [typeof initialState, (state: typeof initialState) => void]
>([initialState, () => {}]);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const appState = useState(initialState);

  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
};

export const useAppState = () => useContext(AppContext);


export default AppProvider;
