import { Canvas, Path, Skia, usePathValue } from '@shopify/react-native-skia'
import { Dimensions, StyleSheet } from 'react-native'
import { interpolate, type SharedValue } from 'react-native-reanimated'

const { width } = Dimensions.get('window')

export const canvasDimension = width - 50

const startDegrees = 135
const endDegrees = 270

const strokeWidth = 10
const arcDimension = canvasDimension * 0.8

interface Props {
  progress: SharedValue<number>
}

export default function CircularProgress({ progress }: Props) {
  const x = canvasDimension / 2 - arcDimension / 2
  const y = canvasDimension / 2 - arcDimension / 2 + strokeWidth * 2

  const arcRect = {
    x,
    y,
    width: arcDimension,
    height: arcDimension,
  }

  const backgroundPath = Skia.Path.Make().addArc(
    arcRect,
    startDegrees,
    endDegrees
  )
  const path = Skia.Path.Make()

  const animatedPath = usePathValue((path) => {
    'worklet'
    const p = interpolate(progress.value, [0, 1], [0, endDegrees])

    path.addArc(arcRect, startDegrees, p)
  }, path)

  return (
    <Canvas style={styles.canvas}>
      <Path
        path={backgroundPath}
        style="stroke"
        strokeWidth={strokeWidth}
        strokeCap="round"
        color="#3E9B4F"
      />
      <Path
        path={animatedPath}
        style="stroke"
        strokeWidth={strokeWidth}
        strokeCap="round"
        color="#A144AF"
      />
    </Canvas>
  )
}

const styles = StyleSheet.create({
  canvas: {
    width: canvasDimension,
    height: canvasDimension,
  },
})
