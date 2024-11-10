import {
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from 'react'
import { StyleSheet, View, type ViewStyle } from 'react-native'

import ButtonCircle from '@/components/button-circle'

const grid = Array.from({ length: 3 }, (_, i) => i + 1)

interface Props {
  setValue: ((value: string) => void) | Dispatch<SetStateAction<string>>
}

export default function NumberPad({
  setValue,
  children,
}: PropsWithChildren<Props>) {
  return (
    <>
      {grid.map((row) => {
        const mod = row === 1 ? 0 : row === 2 ? row + 1 : row + 3

        return (
          <Row key={row}>
            {grid.map((column) => {
              const onPress = () => setValue(`${column + mod}`)

              return (
                <ButtonCircle onPress={onPress} key={column}>
                  {column + mod}
                </ButtonCircle>
              )
            })}
          </Row>
        )
      })}

      {children}
    </>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 25,
  },
})

export function Row({
  style,
  children,
}: PropsWithChildren<{
  style?: ViewStyle
}>) {
  return <View style={[styles.row, style]}>{children}</View>
}
