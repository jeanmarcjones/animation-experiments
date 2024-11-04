import { type ReactNode } from 'react'
import {
  Pressable,
  type PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native'

interface Props extends Omit<PressableProps, 'children' | 'style'> {
  style?: StyleProp<ViewStyle>
  children: ReactNode
}

export default function Button({ style, disabled, children, ...rest }: Props) {
  return (
    <Pressable
      {...rest}
      {...{ disabled }}
      style={[style ?? styles.button, disabled && styles.disabled]}
    >
      <Text style={[styles.buttonText, disabled && styles.disabledText]}>
        {children}
      </Text>
    </Pressable>
  )
}

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
