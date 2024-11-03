import { Canvas, Path, Skia, usePathValue } from '@shopify/react-native-skia'
import { Dimensions, StyleSheet, View } from 'react-native'
import { useSharedValue, withTiming } from 'react-native-reanimated'

import Button from '@/components/button'

const { width } = Dimensions.get('window')

const canvasDimension = width - 50
const strokeWidth = 10
const arcDimension = width * 0.8

const startDegrees = 135
const endDegrees = 270

export default function Timer() {
  const x = canvasDimension / 2 - arcDimension / 2
  const y = canvasDimension / 2 - arcDimension / 2 + strokeWidth * 2

  const arcRect = {
    x,
    y,
    width: arcDimension,
    height: arcDimension,
  }

  const backgroundPath = Skia.Path.Make().addArc(arcRect, startDegrees, endDegrees)
  const path = Skia.Path.Make()

  const endAngle = useSharedValue(0)
  const animatedPath = usePathValue((path) => {
    'worklet'
    path.addArc(arcRect, startDegrees, endAngle.value)
  }, path)

  const startAnimation = () => {
    if (endAngle.value !== startDegrees) {
      endAngle.value = 0
    }

    endAngle.value = withTiming(endDegrees, { duration: 10000 })
  }

  return (
    <View style={styles.container}>
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

      <Button onPress={startAnimation}>Start</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDFDFC',
  },
  canvas: {
    width: canvasDimension,
    height: canvasDimension,
  },
})
