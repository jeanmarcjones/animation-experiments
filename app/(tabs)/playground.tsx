import { Canvas, Circle, useClock } from '@shopify/react-native-skia'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { useDerivedValue, useSharedValue } from 'react-native-reanimated'

export default function PlaygroundScreen() {
  const { height, width } = useWindowDimensions()
  const size = useSharedValue({ width, height })

  const circleCenter = useDerivedValue(() => {
    return size.value.width / 2
  }, [size])

  const t = useClock()

  const transform = useDerivedValue(() => {
    const scale = (2 / (3 - Math.cos(2 * t.value))) * 200
    return [
      { translateX: scale * Math.cos(t.value) },
      { translateY: scale * (Math.sin(2 * t.value) / 2) },
    ]
  })

  return (
    <Canvas style={styles.layout}>
      <Circle
        cx={circleCenter}
        cy={circleCenter}
        r={50}
        color="cyan"
        transform={transform}
      />
    </Canvas>
  )
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
})
