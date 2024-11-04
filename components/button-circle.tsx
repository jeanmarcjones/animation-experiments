import { type ReactNode } from 'react'
import { type PressableProps, StyleSheet } from 'react-native'

import Button, { styles as buttonStyles } from '@/components/button'

interface Props extends Omit<PressableProps, 'children'> {
  children: ReactNode
}

export default function ButtonCircle({ children, ...rest }: Props) {
  return (
    <Button {...rest} style={button}>
      {children}
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    padding: 0,
    borderRadius: 100,
  },
})

const button = StyleSheet.flatten([buttonStyles.button, styles.button])
