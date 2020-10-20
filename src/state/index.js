import React from 'react'
import { messageState } from './message'

const appState = {
    appMessage: messageState
}

const appStateContext = React.createContext(appState)
const dispatchAppStateContext = React.createContext(undefined)

export const useAppState = () => [
    React.useContext(appStateContext),
    React.useContext(dispatchAppStateContext)
]

export default AppStateProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(
        (state, newValue) => ({ ...state, ...newValue }),
        state
    )
    return (
        <appStateContext.Provider value={state}>
            <dispatchAppStateContext.Provider value={dispatch}>
                {children}
            </dispatchAppStateContext.Provider>
        </appStateContext.Provider>
    )
}
