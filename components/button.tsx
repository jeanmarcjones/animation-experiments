import { forwardRef, type PropsWithChildren } from 'react'
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native'

import { StyleGuide } from '@/components/style-guide'

type Variant = 'primary' | 'success' | 'danger'

export interface Props extends PropsWithChildren<PressableProps> {
  variant?: Variant
  style?: StyleProp<ViewStyle>
}

const Button = forwardRef<View, Props>(
  ({ variant = 'primary', style, disabled, children, ...rest }: Props, ref) => {
    const backgroundColor = tmp(variant)

    return (
      <Pressable
        {...rest}
        {...{ disabled }}
        ref={ref}
        style={[
          style ?? styles.button,
          { backgroundColor },
          disabled && styles.disabled,
        ]}
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

const tmp = (variant: Variant) => {
  switch (variant) {
    case 'primary':
    default: {
      return StyleGuide.palette.primary
    }
    case 'success': {
      return StyleGuide.palette.success
    }
    case 'danger': {
      return StyleGuide.palette.danger
    }
  }
}

export default Button
