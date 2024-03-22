import SettingsContextProvider from "./settingsContext"

export default function layout({ children }) {
    return (
        <SettingsContextProvider>            
            {children}            
        </SettingsContextProvider>
    )
}
