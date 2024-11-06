import {
  Canvas,
  Group,
  Path,
  Skia,
  type SkRect,
  SweepGradient,
  vec,
} from '@shopify/react-native-skia'
import { Dimensions, StyleSheet } from 'react-native'
import { type SharedValue } from 'react-native-reanimated'

const { width } = Dimensions.get('window')

const canvasDimension = width - 50
const center = vec(canvasDimension / 2, canvasDimension / 2)

const startDegrees = 135
const endDegrees = 270

const strokeWidth = 10
const arcDimension = canvasDimension * 0.8

const x = center.x - arcDimension / 2
const y = center.y - arcDimension / 2 + strokeWidth * 2
const arcRect: SkRect = {
  x,
  y,
  width: arcDimension,
  height: arcDimension,
}

const arcPath = Skia.Path.Make().addArc(arcRect, startDegrees, endDegrees)

interface Props {
  progress: SharedValue<number>
}

export default function CircularProgress({ progress }: Props) {
  return (
    <Canvas style={styles.canvas}>
      <Group style="stroke" strokeWidth={strokeWidth} strokeCap="round">
        <Path path={arcPath} color="#46A758"></Path>
        <Path path={arcPath} color="#A144AF" end={progress}>
          <SweepGradient
            c={vec(canvasDimension / 2, canvasDimension / 2)}
            colors={['#A144AF', '#DEADE3', '#A144AF']}
            end={330}
          />
        </Path>
      </Group>
    </Canvas>
  )
}

const styles = StyleSheet.create({
  canvas: {
    width: canvasDimension,
    height: canvasDimension,
  },
})
