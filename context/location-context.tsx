import { type LocationObject } from 'expo-location'
import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  useContext,
  useReducer,
} from 'react'

interface LocationState {
  location: LocationObject | null
  error: string | null
}

enum ActionTypes {
  SUCCESS = 'SUCCESS',
  REJECTED = 'REJECTED',
  RESET = 'RESET',
}

type Actions =
  | { type: ActionTypes.SUCCESS; location: LocationObject }
  | { type: ActionTypes.REJECTED; error: string }
  | { type: ActionTypes.RESET }

const LocationContext = createContext<LocationState | null>(null)
const LocationDispatchContext = createContext<Dispatch<Actions> | null>(null)

export function LocationProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(locationReducer, initialSate)

  return (
    <LocationContext.Provider value={state}>
      <LocationDispatchContext.Provider value={dispatch}>
        {children}
      </LocationDispatchContext.Provider>
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error(`useLocation must be used within a LocationProvider`)
  }
  return context
}

export function useLocationDispatch() {
  const dispatch = useContext(LocationDispatchContext)
  if (!dispatch) {
    throw new Error(`useLocationDispatch must be used within a LocationProvider`)
  }

  const success = (location: LocationObject) =>
    dispatch({ type: ActionTypes.SUCCESS, location })
  const rejected = (error: string) =>
    dispatch({ type: ActionTypes.REJECTED, error })
  const reset = () => dispatch({ type: ActionTypes.RESET })

  return {
    success,
    rejected,
    reset,
  }
}

const initialSate = {
  location: null,
  error: null,
}

function locationReducer(state: LocationState, action: Actions) {
  switch (action.type) {
    case ActionTypes.SUCCESS: {
      return {
        ...state,
        location: action.location,
      }
    }
    case ActionTypes.REJECTED: {
      return {
        ...state,
        error: action.error,
      }
    }
    case ActionTypes.RESET: {
      return {
        location: null,
        error: null,
      }
    }
  }
}
