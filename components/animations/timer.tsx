import { Canvas, Path, Skia, usePathValue, vec } from '@shopify/react-native-skia'
import { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text,TextInput, View } from 'react-native'
import { useSharedValue, withTiming } from 'react-native-reanimated'

import Button from '@/components/button'

const { width, height } = Dimensions.get('window')
const center = vec(width / 2, height / 2)

const canvasDimension = width - 50
const strokeWidth = 10
const arcDimension = width * 0.8

const startDegrees = 135
const endDegrees = 270

export const useCountdown = (totalTime: number) => {
  const [countdown, setCountdown] = useState<number>(totalTime)
  const [isPaused, setIsPaused] = useState<boolean>(true)

  useEffect(() => {
    if (countdown === 0 || isPaused) return

    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1000)
    }, 1000)

    return () => clearInterval(interval)
  }, [countdown, isPaused])

  const toggle = () => setIsPaused((prevIsPaused) => !prevIsPaused)
  const reset = () => setCountdown(totalTime)

  return { countdown, toggle, isPaused, reset }
}

export default function Timer() {
  const [duration, setDuration] = useState('0')
  const { countdown, isPaused, toggle, reset } = useCountdown(Number(duration))

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

  const endAngle = useSharedValue(0)
  const animatedPath = usePathValue((path) => {
    'worklet'
    path.addArc(arcRect, startDegrees, endAngle.value)
  }, path)

  const startAnimation = () => {
    if (endAngle.value !== startDegrees) {
      endAngle.value = 0
      reset()
    }

    toggle()
    endAngle.value = withTiming(endDegrees, { duration: Number(duration) })
  }

  return (
    <View style={styles.layout}>
      <TextInput
        style={styles.input}
        inputMode="numeric"
        value={duration}
        onChangeText={setDuration}
      />
      
      <Text style={styles.countdown}>{countdown}</Text>
      
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
  layout: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDFDFC',
  },
  canvas: {
    width: canvasDimension,
    height: canvasDimension,
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#BCBBB5',
  },
  countdown: {
    position: 'absolute',
    top: center.y,
    alignSelf: 'center',
    fontSize: 20,
  }
})
