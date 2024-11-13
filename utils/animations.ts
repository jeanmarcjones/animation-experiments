import {
  type AnimatableValue,
  type Animation,
  defineAnimation,
} from 'react-native-reanimated'

interface TickAnimation extends Animation<TickAnimation> {
  lastTimestamp: number
  elapsed: number
}

/**
 * The tick animation configuration.
 *
 * @param interval - The pause between animations (in milliseconds).
 * Defaults to 1000.
 * @param increment - The incremental change in radians per animation, calculated as π divided by this value.
 * Defaults to 10
 * @param startAngle - The initial angle (in radians).
 * Defaults to 0.
 */
interface TickConfig {
  interval?: number
  increment?: number
  startAngle?: number
}

type withTickType = (userConfig?: TickConfig) => number

// TODO validate config
// TODO investigate testing
// TODO composable with withTiming
/**
 * An animation that mimics the ticking of a clock's hand.
 *
 * @param config - The tick animation configuration - {@link TickConfig}.
 *
 * @returns An [animation
 *   object](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/glossary#animation-object)
 *   which holds the current state of the animation.
 * */
export const withTick = function (
  userConfig?: TickConfig
): Animation<TickAnimation> {
  'worklet'

  return defineAnimation(0, () => {
    'worklet'

    const test = (animation: TickAnimation, now: number): boolean => {
      const { lastTimestamp } = animation
      const config = {
        interval: 1000,
        increment: 10,
        ...userConfig,
      }

      const deltaTime = Math.min(now - lastTimestamp, 64)

      animation.lastTimestamp = now

      if (animation.elapsed < config.interval) {
        animation.elapsed += deltaTime

        return false
      }
      animation.current =
        ((animation.current as number) ?? 0) + Math.PI / config.increment
      animation.elapsed = 0

      return true
    }

    const onStart = (
      animation: TickAnimation,
      value: AnimatableValue
    ): void => {
      const { current } = animation

      const startAngle = userConfig?.startAngle ?? 0
      const newCurrent = current === 0 ? startAngle : current

      animation.current = (newCurrent as number) + (value as number)
      animation.lastTimestamp = 0
      animation.elapsed = 0
    }

    return {
      onFrame: test,
      onStart,
      current: 0,
      lastTimestamp: 0,
      elapsed: 0,
    }
  })
} as unknown as withTickType
