import { forwardRef, type ReactNode } from 'react'
import {
  type PressableProps,
  StyleSheet,
  View,
} from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import Button, { styles as buttonStyles } from '@/components/button'

const duration = 500

const AnimatedButton = Animated.createAnimatedComponent(Button)

interface Props extends Omit<PressableProps, 'children'> {
  children: ReactNode
}

const ButtonCircle = forwardRef<View, Props>(
  ({ children, ...rest }: Props, ref) => {
    const sv = useSharedValue(40)

    const animatedStyles = useAnimatedStyle(() => {
      return {
        borderRadius: sv.value,
      }
    })

    const onPressIn = () => {
      sv.value = withTiming(20, {
        duration,
        easing: Easing.out(Easing.quad),
      })
    }
    const onPressOut = () => {
      sv.value = withTiming(40, {
        duration,
        easing: Easing.in(Easing.quad),
      })
    }

    return (
      <AnimatedButton
        {...rest}
        ref={ref}
        style={[button, animatedStyles]}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        {children}
      </AnimatedButton>
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
  },
})

const button = StyleSheet.flatten([buttonStyles.button, styles.button])

export default ButtonCircle
