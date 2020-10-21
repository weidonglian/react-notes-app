import React from 'react'

export const actions = {
  SHOW_MESSAGE: 'show_message',
  HIDE_MESSAGE: 'hide_message'
}

export const variants = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error'
}

const appState = {
  appMessage: {
    message: '',
    variant: variants.SUCCESS,
    visible: false
  }
}

function appStateReducer(state = appState, action) {
  switch (action.type) {
    case actions.SHOW_MESSAGE:
      return {
        ...state, appMessage: {
          message: action.payload.message,
          variant: action.payload.variant,
          visible: true
        }
      }
    case actions.HIDE_MESSAGE:
      return {
        ...state, appMessage: {
          message: "",
          variant: variants.INFO,
          visible: false
        }
      }
    default:
      return state
  }
}

const appStateContext = React.createContext(undefined)

export const useAppState = () => React.useContext(appStateContext)

export default function AppStateProvider({ children }) {
  const [state, dispatch] = React.useReducer(appStateReducer, appState, undefined)
  return (
    <appStateContext.Provider value={[state, dispatch]}>
      {children}
    </appStateContext.Provider>
  )
}
