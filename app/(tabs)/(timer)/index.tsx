import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Link } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import {
  cancelAnimation,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import CircularProgress from '@/components/animations/circular-progress'
import ButtonCircle from '@/components/button-circle'
import { useCountdown } from '@/hooks/useCountdown'
import { millisecondsToHhmmss } from '@/utils/time'

export default function Timer() {
  const { countdown, setCountdown, isPaused, toggle, reset } = useCountdown()

  const [countdownDuration, setCountdownDuration] = useState(
    countdown.toString()
  )
  const parsedCountdownDuration = Number(countdownDuration)

  const progress = useSharedValue(0)

  const onToggle = () => {
    if (isPaused) {
      progress.value = withTiming(1, { duration: parsedCountdownDuration })
    } else {
      cancelAnimation(progress)
    }

    toggle()
  }

  const onReset = () => {
    if (!isPaused) {
      toggle()
    }

    progress.value = 0
    reset(countdownDuration)
  }

  const onChangeText = (text: string) => {
    const parsedText = Number(text)

    if (!isNaN(parsedText)) {
      setCountdown(parsedText)
      setCountdownDuration(text)
    }
  }

  const inProgress = countdown === 0
  const isFinished = countdown === parsedCountdownDuration

  const timeRemaining = millisecondsToHhmmss(countdown)

  return (
    <View style={styles.layout}>
      <TextInput
        style={styles.input}
        inputMode="numeric"
        value={countdownDuration}
        onChangeText={onChangeText}
        editable={isPaused}
      />

      <Text style={styles.countdown}>{timeRemaining}</Text>

      <CircularProgress {...{ progress }} />

      <View style={styles.directionRow}>
        <Link href="/set-time" asChild disabled={!isPaused}>
          <ButtonCircle disabled={!isPaused}>
            <Ionicons name="add" size={50} />
          </ButtonCircle>
        </Link>

        <ButtonCircle onPress={onToggle} disabled={inProgress}>
          <Ionicons
            name={isPaused ? 'play' : 'pause'}
            size={50}
            style={[styles.icon, inProgress && styles.iconDisabled]}
          />
        </ButtonCircle>

        <ButtonCircle onPress={onReset} disabled={isFinished}>
            <MaterialIcons
              name="refresh"
              size={60}
              style={[styles.icon, isFinished && styles.iconDisabled]}
            />
        </ButtonCircle>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  layout: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#BCBBB5',
    borderRadius: 5,
    minWidth: '20%',
    textAlign: 'center',
  },
  countdown: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 20,
  },
  directionRow: {
    flexDirection: 'row',
    gap: 20,
  },
  icon: {
    color: '#EEEEEC',
  },
  iconDisabled: {
    color: '#63635E',
  }
})
