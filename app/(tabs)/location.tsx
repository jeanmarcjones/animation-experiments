import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, View } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

import { useMount } from '@/hooks/useMount'

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons)

export default function TabThreeScreen() {
  const sv = useSharedValue(0)

  useMount(() => {
    // TODO respect reduced motion setting
    sv.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withSpring(0, { mass: 0.2, damping: 2.5, stiffness: 55 }),
        withDelay(900, withTiming(0))
      ),
      -1,
      true
    )
  })

  const iconStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(sv.value, [0, 1], [0, -25]) }],
  }))

  const shadowStyles = useAnimatedStyle(() => ({
    transform: [
      { scaleX: 2 },
      { scale: interpolate(sv.value, [0, 1], [1, 0.6]) },
    ],
  }))

  return (
    <View style={styles.layout}>
      <View style={styles.square}>
        <View style={styles.animationCanvas}>
          <AnimatedIcon
            name="location-sharp"
            size={80}
            color="#087EA4"
            style={[styles.icon, iconStyles]}
          />
          <Animated.View style={[styles.shadow, shadowStyles]} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 225,
    height: 225,
    backgroundColor: '#1D3D47',
    borderRadius: 10,
    transform: [{ rotate: '45deg' }],
  },
  animationCanvas: {
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-45deg' }],
  },
  icon: {
    zIndex: 2,
    elevation: 2,
  },
  shadow: {
    width: 14,
    height: 14,
    backgroundColor: '#142a31',
    opacity: 0.6,
    borderRadius: 18,
    marginTop: -8,
    zIndex: 1,
    elevation: 1,
  },
})
