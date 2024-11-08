import { forwardRef, type ReactNode } from 'react'
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native'

interface Props extends Omit<PressableProps, 'children' | 'style'> {
  style?: StyleProp<ViewStyle>
  children: ReactNode
}

const Button = forwardRef<View, Props>(
  ({ style, disabled, children, ...rest }: Props, ref) => {
    return (
      <Pressable
        {...rest}
        {...{ disabled }}
        ref={ref}
        style={[style ?? styles.button, disabled && styles.disabled]}
      >
        <Text style={[styles.buttonText, disabled && styles.disabledText]}>
          {children}
        </Text>
      </Pressable>
    )
  }
)
Button.displayName = 'Button'

export const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00749E',
    padding: 15,
    borderRadius: 10,
  },
  disabled: {
    backgroundColor: '#E2E1DE',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EEEEEC',
  },
  disabledText: {
    color: '#63635E',
  },
})

export default Button
