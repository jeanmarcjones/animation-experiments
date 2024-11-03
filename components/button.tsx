import { type ReactNode } from 'react'
import { Pressable, type PressableProps, StyleSheet, Text } from 'react-native'

interface Props extends Omit<PressableProps, 'children'> {
  children: ReactNode
}

export default function Button({ children, ...rest }: Props) {
  return (
    <Pressable style={styles.button} {...rest}>
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0D74CE',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EEEEEE',
  },
})
