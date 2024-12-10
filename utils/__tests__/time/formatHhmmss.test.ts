import { formatHhmmss } from '@/utils/time';

test('formats seconds', () => {
  const received = formatHhmmss('000023')
  expect(received).toEqual('00:00:23')
})

test('formats minuets', () => {
  const received = formatHhmmss('003200')
  expect(received).toEqual('00:32:00')
})

test('formats hours', () => {
  const received = formatHhmmss('230000')
  expect(received).toEqual('23:00:00')
})

test('formats empty string', () => {
  const received = formatHhmmss('')
  expect(received).toEqual('00:00:00')
})

test('adds missing digits', () => {
  const received = formatHhmmss('12')
  expect(received).toEqual('00:00:12')
})
