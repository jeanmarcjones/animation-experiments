import { useEffect, useState } from 'react'

export const useCountdown = (duration = 1000) => {
  const [countdown, setCountdown] = useState(duration)
  const [isPaused, setIsPaused] = useState<boolean>(true)

  useEffect(() => {
    if (countdown === 0 || isPaused) return

    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 100)
    }, 100)

    return () => clearInterval(interval)
  }, [countdown, isPaused])

  useEffect(() => {
    setCountdown(duration)
  }, [duration])

  const toggle = () => setIsPaused((prevIsPaused) => !prevIsPaused)
  const reset = (countdown?: string) =>
    setCountdown(Number(countdown) ?? duration)

  return {
    countdown,
    toggle,
    isPaused,
    reset,
  }
}
