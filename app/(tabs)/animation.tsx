import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat, withSequence,
  withSpring, withTiming
} from 'react-native-reanimated';
import { useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons'

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

export default function TabThreeScreen() {
  const translateY = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}]
  }));

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-40, { duration: 1000 }),
        withSpring(0, { mass: 0.2, damping: 2.5, stiffness: 55 })
      ), -1, true);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.square}>
        <AnimatedIcon name="location-sharp" size={80} color="#087EA4" style={animatedStyles} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    backgroundColor: '#1D3D47',
    borderRadius: 5,
  },
  icon: {
    width: 20,
    height: 20,
    backgroundColor: '',
    borderRadius: 10,
  }
})
