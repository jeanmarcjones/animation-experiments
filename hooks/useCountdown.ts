import { useEffect } from 'react'

import { useTimer, useTimerDispatch } from '@/context/timer-context'

export const useCountdown = () => {
  const { duration, countdown, paused } = useTimer()
  const { advanceCountdown, resetCountdown, togglePause } = useTimerDispatch()

  useEffect(() => {
    if (countdown === 0 || paused) return

    const interval = setInterval(() => {
      advanceCountdown()
    }, 100)

    return () => clearInterval(interval)
  }, [countdown, paused, advanceCountdown])

  return {
    duration,
    countdown,
    paused,
    toggle: togglePause,
    reset: resetCountdown,
  }
}
