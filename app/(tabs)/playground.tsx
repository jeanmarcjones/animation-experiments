import { Canvas, Group, RoundedRect, vec } from '@shopify/react-native-skia'
import { Dimensions, StyleSheet } from 'react-native'
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

import { useMount } from '@/hooks/useMount'
import { withTick } from '@/utils/animations'

const { width, height } = Dimensions.get('window')
const center = vec(width / 2, height / 2)

const squareDimension = 225

const x = center.x - squareDimension / 2
const y = center.y - squareDimension / 2

export default function PlaygroundScreen() {
  const rotate = useSharedValue(0)

  const transform = useDerivedValue(() => {
    return [{ rotate: rotate.value }]
  })

  useMount(() => {
    rotate.value = withRepeat(withTick(withTiming(Math.PI / 10)), 10, false)
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
