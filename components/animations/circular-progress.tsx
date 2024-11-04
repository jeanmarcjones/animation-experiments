import {
  Canvas,
  Group,
  Path,
  Skia,
  type SkRect,
} from '@shopify/react-native-skia'
import { Dimensions, StyleSheet } from 'react-native'
import { type SharedValue } from 'react-native-reanimated'

const { width } = Dimensions.get('window')

export const canvasDimension = width - 50

const startDegrees = 135
const endDegrees = 270

const strokeWidth = 10
const arcDimension = canvasDimension * 0.8

const x = canvasDimension / 2 - arcDimension / 2
const y = canvasDimension / 2 - arcDimension / 2 + strokeWidth * 2
const arcRect: SkRect = {
  x,
  y,
  width: arcDimension,
  height: arcDimension,
}

const arcPath = Skia.Path.Make().addArc(
  arcRect,
  startDegrees,
  endDegrees
)

interface Props {
  progress: SharedValue<number>
}

export default function CircularProgress({ progress }: Props) {
  return (
    <Canvas style={styles.canvas}>
      <Group style="stroke" strokeWidth={strokeWidth} strokeCap="round">
        <Path path={arcPath} color="#3E9B4F" />
        <Path path={arcPath} color="#A144AF" end={progress} />
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
