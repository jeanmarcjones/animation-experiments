import { Link, type LinkProps } from 'expo-router'
import { type ReactNode } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

interface Props extends LinkProps<any> {
  children: ReactNode
}

export default function Button({ href, onPress, children }: Props) {
  return (
    <Link href={href} asChild onPress={onPress}>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0D74CE',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#EEEEEE',
  },
})
