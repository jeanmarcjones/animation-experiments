import { hhmmssToMilliseconds } from '@/utils/time'

test('can parse empty timer', () => {
  const received = hhmmssToMilliseconds('000000')
  expect(received).toBe(0)
})

test('can parse 23 second', () => {
  const received = hhmmssToMilliseconds('000023')
  expect(received).toBe(23_000)
})

test('can parse 1 minuet', () => {
  const received = hhmmssToMilliseconds('003200')
  expect(received).toBe(1_920_000)
})

test('can parse 1 hour', () => {
  const received = hhmmssToMilliseconds('070000')
  expect(received).toBe(25_200_000)
})

test('can parse 01:01:01', () => {
  const received = hhmmssToMilliseconds('010101')
  expect(received).toBe(3_661_000)
})

test('can parse 12:34:56', () => {
  const received = hhmmssToMilliseconds('123456')
  expect(received).toBe(45_296_000)
})

test('can parse time with colons', () => {
  const received = hhmmssToMilliseconds('12:34:56')
  expect(received).toBe(45_296_000)
})

test('can parse minutes and hours over 60', () => {
  const received = hhmmssToMilliseconds('008080')
  expect(received).toBe(4_880_000)
})
