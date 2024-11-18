import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  useContext,
  useReducer,
} from 'react'

import { hhmmssToMilliseconds } from '@/utils/time';

interface TimerState {
  duration: string
  countdown: number
  paused: boolean
}

enum ActionTypes {
  UPDATE_DURATION = 'UPDATE_DURATION',
  ADVANCE_COUNTDOWN = 'ADVANCE_COUNTDOWN',
  RESET_COUNTDOWN = 'RESET_COUNTDOWN',
  TOGGLE_PAUSE = 'TOGGLE_PAUSE',
}

type Actions =
  | { type: ActionTypes.UPDATE_DURATION; duration: string }
  | { type: ActionTypes.ADVANCE_COUNTDOWN }
  | { type: ActionTypes.RESET_COUNTDOWN }
  | { type: ActionTypes.TOGGLE_PAUSE }

const TimerContext = createContext<TimerState | null>(null)
const TimerDispatchContext = createContext<Dispatch<Actions> | null>(null)

export function TimerProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(timerReducer, initialState)

  return (
    <TimerContext.Provider value={state}>
      <TimerDispatchContext.Provider value={dispatch}>
        {children}
      </TimerDispatchContext.Provider>
    </TimerContext.Provider>
  )
}

export function useTimer() {
  const context = useContext(TimerContext)
  if (typeof context === 'undefined' || context === null) {
    throw new Error(`useTimer must be used within a TimerProvider`)
  }
  return context
}

export function useTimerDispatch() {
  const dispatch = useContext(TimerDispatchContext)
  if (!dispatch) {
    throw new Error(`useTimerDispatch must be used within a TimerProvider`)
  }

  const updateDuration = (duration: string) =>
    dispatch({ type: ActionTypes.UPDATE_DURATION, duration })

  const advanceCountdown = () => dispatch({ type: ActionTypes.ADVANCE_COUNTDOWN })
  const resetCountdown = () => dispatch({ type: ActionTypes.RESET_COUNTDOWN })

  const togglePause = () => dispatch({ type: ActionTypes.TOGGLE_PAUSE })

  return { updateDuration, advanceCountdown, resetCountdown, togglePause }
}

const initialState = {
  duration: '000010',
  countdown: 10000,
  paused: true,
}

function timerReducer(state: TimerState, action: Actions) {
  switch (action.type) {
    case ActionTypes.UPDATE_DURATION: {
      const parsedDuration = action.duration.padStart(6, '0')
      return {
        ...state,
        duration: parsedDuration,
        countdown: hhmmssToMilliseconds(parsedDuration)
      }
    }
    case ActionTypes.ADVANCE_COUNTDOWN: {
      return {
        ...state,
        countdown: state.countdown - 100,
      }
    }
    case ActionTypes.RESET_COUNTDOWN: {
      return {
        ...state,
        countdown: hhmmssToMilliseconds(state.duration),
      }
    }
    case ActionTypes.TOGGLE_PAUSE: {
      return {
        ...state,
        paused: !state.paused,
      }
    }
  }
}
