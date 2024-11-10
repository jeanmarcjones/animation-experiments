import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
  useState,
} from 'react'

const TimerContext = createContext<string | null>(null)
const TimerDispatchContext = createContext<Dispatch<
  SetStateAction<string>
> | null>(null)

export function TimerProvider({ children }: PropsWithChildren) {
  const [duration, setDuration] = useState('')

  return (
    <TimerContext.Provider value={duration}>
      <TimerDispatchContext.Provider value={setDuration}>
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

  const setTimer = (time: string) => {
    const parsedTime = time.padStart(6, '0')
    dispatch(parsedTime)
  }

  return setTimer
}
