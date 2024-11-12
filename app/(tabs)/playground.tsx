import { Canvas, Group, RoundedRect, vec } from '@shopify/react-native-skia'
import { Dimensions, StyleSheet } from 'react-native'
import {
  useDerivedValue,
  useFrameCallback,
  useSharedValue,
} from 'react-native-reanimated'

const INTERVAL = 1000

const { width, height } = Dimensions.get('window')
const center = vec(width / 2, height / 2)

const squareDimension = 225

const x = center.x - squareDimension / 2
const y = center.y - squareDimension / 2

// TODO create a higher order animation for smoother transitions

export default function PlaygroundScreen() {
  const rotate = useSharedValue(0)
  const elapsed = useSharedValue(0)

  const transform = useDerivedValue(() => {
    return [{ rotate: rotate.value }]
  })

  useFrameCallback((frameInfo) => {
    const { timeSincePreviousFrame } = frameInfo

    const nextRotation = rotate.value + Math.PI / 10
    elapsed.value += timeSincePreviousFrame ?? 0

    if (elapsed.value < INTERVAL) return

    if (nextRotation < Math.PI) {
      rotate.value = nextRotation
    } else {
      rotate.value = 0
    }

    elapsed.value = 0
  })

  return (
    <Canvas style={styles.canvas}>
      <Group origin={{ x: center.x, y: center.y }} transform={transform}>
        <RoundedRect
          x={x}
          y={y}
          width={squareDimension}
          height={squareDimension}
          r={15}
          color="#1D3D47"
        />
      </Group>
    </Canvas>
  )
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
})
