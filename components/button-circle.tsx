import { forwardRef, type ReactNode } from 'react'
import { type PressableProps, StyleSheet, View } from 'react-native'

import Button, { styles as buttonStyles } from '@/components/button'

interface Props extends Omit<PressableProps, 'children'> {
  children: ReactNode
}

const ButtonCircle = forwardRef<View, Props>(
  ({ children, ...rest }: Props, ref) => {
    return (
      <Button {...rest} ref={ref} style={button}>
        {children}
      </Button>
    )
  }
)
ButtonCircle.displayName = 'ButtonCircle'

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

export default ButtonCircle
