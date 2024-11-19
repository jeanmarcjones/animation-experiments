import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import {
  cancelAnimation,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import CircularProgress from '@/components/animations/circular-progress'
import ButtonCircle from '@/components/button-circle'
import { useCountdown } from '@/hooks/useCountdown'
import { hhmmssToMilliseconds, millisecondsToHhmmss } from '@/utils/time'

// TODO integration tests

export default function Timer() {
  const { duration, countdown, paused, toggle, reset } = useCountdown()

  const parsedDuration = hhmmssToMilliseconds(duration)

  const progress = useSharedValue(0)

  const onToggle = () => {
    if (paused) {
      progress.value = withTiming(1, { duration: parsedDuration })
    } else {
      cancelAnimation(progress)
    }

    toggle()
  }

  const onReset = () => {
    if (!paused) {
      toggle()
    }

    progress.value = 0
    reset()
  }

  const inProgress = countdown === 0
  const isFinished = countdown === parsedDuration

  const timeRemaining = millisecondsToHhmmss(countdown)

  return (
    <View style={styles.layout}>
      <Text style={styles.countdown}>{timeRemaining}</Text>

      <CircularProgress {...{ progress }} />

      <View style={styles.directionRow}>
        <Link href="/set-time" asChild disabled={!paused}>
          <ButtonCircle disabled={!paused}>
            <Ionicons name="add" size={50} />
          </ButtonCircle>
        </Link>

        <ButtonCircle onPress={onToggle} disabled={inProgress}>
          <Ionicons
            name={paused ? 'play' : 'pause'}
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
  },
})
