import { millisecondsToHhmmss } from '@/utils/time'

test('can parse empty timer', () => {
  const received = millisecondsToHhmmss(0)
  expect(received).toBe('00:00:00')
})

test('can parse 23 second', () => {
  const received = millisecondsToHhmmss(23_000)
  expect(received).toBe('00:00:23')
})

test('can parse 1 minuet', () => {
  const received = millisecondsToHhmmss(1_920_000)
  expect(received).toBe('00:32:00')
})

test('can parse 1 hour', () => {
  const received = millisecondsToHhmmss(25_200_000)
  expect(received).toBe('07:00:00')
})

test('can parse 01:01:01', () => {
  const received = millisecondsToHhmmss(3_661_000)
  expect(received).toBe('01:01:01')
})
