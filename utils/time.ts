// TODO docs
const parseMilliseconds = (milliseconds: number): string =>
  milliseconds.toString().padStart(2, '0')

// TODO test + docs
function millisecondsToHhmmss(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000)

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secondsRemaining = seconds % 60

  return `${parseMilliseconds(hours)}:${parseMilliseconds(minutes)}:${parseMilliseconds(secondsRemaining)}`
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

export { millisecondsToHhmmss, parseHhmmss }
