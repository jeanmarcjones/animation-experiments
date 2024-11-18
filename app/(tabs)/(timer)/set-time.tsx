import Ionicons from '@expo/vector-icons/Ionicons'
import { Link } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import ButtonCircle from '@/components/button-circle'
import NumberPad, { Row } from '@/components/number-pad'
import { useTimerDispatch } from '@/context/timer-context'
import { parseHhmmss } from '@/utils/time'

export default function SetTime() {
  const { updateDuration } = useTimerDispatch()

  const [duration, setDuration] = useState('')

  const appendValue = (input: string, maxLength = 6) => {
    setDuration((oldValue) => {
      return oldValue.length < maxLength ? `${oldValue}${input}` : oldValue
    })
  }
  const onBackSpace = () => setDuration((prev) => prev.slice(0, -1))

  const onReset = () => setDuration('')

  const onAppendNought = () => appendValue('0')
  const onAppendDoubleNought = () =>
    appendValue(duration.length < 5 ? '00' : '0')

  const onSetDuration = () => updateDuration(duration)

  return (
    <View style={styles.layout}>
      <Text style={styles.text}>{parseHhmmss(duration)}</Text>

      <NumberPad setValue={appendValue}>
        <Row>
          <ButtonCircle onPress={onAppendDoubleNought}>00</ButtonCircle>

          <ButtonCircle onPress={onAppendNought}>0</ButtonCircle>

          <ButtonCircle onPress={onBackSpace} onLongPress={onReset}>
            <Ionicons name="backspace" size={26} />
          </ButtonCircle>
        </Row>
      </NumberPad>

      <Row style={styles.row}>
        <Link href="/" asChild onPress={onReset}>
          <ButtonCircle variant="danger">
            <Ionicons name="trash" size={26} />
          </ButtonCircle>
        </Link>

        {duration.length > 0 && (
          <Link href="/" asChild onPress={onSetDuration}>
            <ButtonCircle variant="success">
              <Ionicons name="checkmark-sharp" size={26} />
            </ButtonCircle>
          </Link>
        )}
      </Row>
    </View>
  )
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 25,
    paddingBottom: 100,
    backgroundColor: '#F9F9F8',
    paddingHorizontal: 50,
  },
  text: {
    fontSize: 50,
    alignItems: 'flex-start',
  },
  row: {
    marginTop: 20,
    gap: 75,
  },
})
