import Ionicons from '@expo/vector-icons/Ionicons'
import { Link } from 'expo-router'
import { ReactNode, useState } from 'react'
import { StyleSheet, Text, View, type ViewStyle } from 'react-native'

import ButtonCircle from '@/components/button-circle'
import { parseHhmmss } from '@/utils/time'

const grid = Array.from({ length: 3 }, (_, i) => i + 1)

function Row({ style, children }: { style?: ViewStyle; children: ReactNode }) {
  return <View style={[styles.row, style]}>{children}</View>
}

// TODO create context to share value with timer route
// TODO Add press animation to circle buttons

export default function NumberPad() {
  const [value, setValue] = useState('')

  const appendValue = (input: string, maxLength = 6) =>
    setValue((oldValue) =>
      oldValue.length < maxLength ? `${oldValue}${input}` : oldValue
    )

  const onReset = () => setValue('')

  const onAppendNought = (input: '0' | '00') => () => {
    const maxLength = input === '00' ? 5 : 6
    appendValue(input, maxLength)
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.layout}>
        <Text style={styles.text}>{parseHhmmss(value)}</Text>

        {grid.map((row) => {
          const mod = row === 1 ? 0 : row === 2 ? row + 1 : row + 3

          return (
            <Row key={row}>
              {grid.map((column) => {
                const onPress = () => appendValue(`${column + mod}`)

                return (
                  <ButtonCircle onPress={onPress} key={column}>
                    {column + mod}
                  </ButtonCircle>
                )
              })}
            </Row>
          )
        })}

        <Row>
          <ButtonCircle onPress={onAppendNought('00')}>00</ButtonCircle>
          <ButtonCircle onPress={onAppendNought('0')}>0</ButtonCircle>
          <ButtonCircle onPress={onReset}>
            <Ionicons name="backspace" size={26} />
          </ButtonCircle>
        </Row>

        <Row style={styles.lastRow}>
          <Link href="/" asChild>
            <ButtonCircle>
              <Ionicons name="trash" size={26} />
            </ButtonCircle>
          </Link>

          {value.length > 0 && (
            <Link href="/" asChild>
              <ButtonCircle>
                <Ionicons name="play" size={26} />
              </ButtonCircle>
            </Link>
          )}
        </Row>
      </View>
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
  },
  row: {
    flexDirection: 'row',
    gap: 25,
  },
  text: {
    fontSize: 50,
    alignItems: 'flex-start',
  },
  lastRow: {
    marginTop: 20,
    gap: 75,
  },
})
