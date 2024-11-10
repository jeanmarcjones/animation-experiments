// TODO docs
const padTime = (time: number): string => time.toString().padStart(2, '0')

// TODO docs
function millisecondsToHhmmss(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000)

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secondsRemaining = seconds % 60

  return `${padTime(hours)}:${padTime(minutes)}:${padTime(secondsRemaining)}`
}

// TODO docs
// TODO handle malformed?
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

// TODO test + docs
function parseHhmmss(value: string): string {
  const parsed = value.padStart(6, '0')

  return parsed.split('').reduce((prev, cur, i) => {
    if (i === 0) return cur

    if (i % 2 === 0) {
      return `${prev}:${cur}`
    }

    return `${prev}${cur}`
  }, '')
}

export { hhmmssToMilliseconds, millisecondsToHhmmss, parseHhmmss }
