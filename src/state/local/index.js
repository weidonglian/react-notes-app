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

const localState = {
  appMessage: {
    message: '',
    variant: variants.SUCCESS,
    visible: false
  }
}

function localStateReducer(state = localState, action) {
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

const localStateContext = React.createContext([])

export const useLocalState = () => React.useContext(localStateContext)

export default function LocalStateProvider({ children }) {
  const [state, dispatch] = React.useReducer(localStateReducer, localState, undefined)
  return (
    <localStateContext.Provider value={[state, dispatch]}>
      {children}
    </localStateContext.Provider>
  )
}
