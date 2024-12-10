/**
 * Pads a single-digit number with a leading zero.
 *
 * @param time - The input number to pad (should be between 0 and 59).
 *
 * @returns A string representation of the number with leading zero if necessary.
 */
const padTime = (time: number): string => time.toString().padStart(2, '0')

/**
 * Converts milliseconds to a formatted time string in the format HH:mm:ss.
 *
 * @param milliseconds - The number of milliseconds to convert.
 *
 * @returns A formatted time string in the format HH:mm:ss.
 */
function millisecondsToHhmmss(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000)

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secondsRemaining = seconds % 60

  return `${padTime(hours)}:${padTime(minutes)}:${padTime(secondsRemaining)}`
}

// TODO handle malformed?
/**
 * Converts an HH:MM:SS time string to milliseconds.
 *
 * @param hhmmss - The time string in HH:MM:SS format.
 *
 * @returns The number of milliseconds since midnight.
 */
function hhmmssToMilliseconds(hhmmss: string): number {
  const formattedHhssmm = hhmmss.replaceAll(':', '')

  const hh = formattedHhssmm.slice(0, 2)
  const mm = formattedHhssmm.slice(2, 4)
  const ss = formattedHhssmm.slice(4, 8)

  const seconds = Number(ss) * 1_000
  const minutes = Number(mm) * 60_000
  const hours = Number(hh) * 3_600_000

  return seconds + minutes + hours
}

/**
 * Formats a time string in HHMMSS format into a readable HH:MM:SS format.
 *
 * @param value - The input time string in HHMMSS format.

 * @returns The formatted time string in HH:MM:SS format.
 */
function formatHhmmss(value: string): string {
  const parsed = value.padStart(6, '0')

  return parsed.split('').reduce((prev, cur, i) => {
    if (i === 0) return cur

    if (i % 2 === 0) {
      return `${prev}:${cur}`
    }

    return `${prev}${cur}`
  }, '')
}

export { formatHhmmss, hhmmssToMilliseconds, millisecondsToHhmmss }
