import {
  type AnimatableValue,
  type Animation,
  type AnimationObject,
  defineAnimation,
} from 'react-native-reanimated'

interface TickAnimation extends Animation<TickAnimation> {
  current: AnimatableValue
  lastTimestamp: number
  elapsed: number
  started: boolean
  step: number
  toValue: number
}

/**
 * The tick animation configuration.
 *
 * @param interval - The pause between animations (in milliseconds).
 * Defaults to 1000.
 */
interface TickConfig {
  interval?: number
}

type withTickType = <T extends AnimatableValue>(
  animation: T,
  userConfig?: TickConfig
) => T

// TODO validate config
// TODO investigate testing
// TODO use withDelay instead of elapsed?
// TODO is step needed?
// TODO startAngle

/**
 * An animation that mimics the ticking of a clock's hand.
 *
 * @param config - The tick animation configuration - {@link TickConfig}.
 * @param nextAnimation - The animation to tick.
 *
 * @returns An [animation
 *   object](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/glossary#animation-object)
 *   which holds the current state of the animation.
 * */
export const withTick = function <T extends AnimationObject>(
  _nextAnimation: T | (() => T),
  userConfig?: TickConfig
): Animation<TickAnimation> {
  'worklet'

  return defineAnimation(0, () => {
    'worklet'
    const config = {
      interval: 1000,
      ...userConfig,
    }

    const nextAnimation =
      typeof _nextAnimation === 'function' ? _nextAnimation() : _nextAnimation

    const tick = (animation: TickAnimation, now: number): boolean => {
      const { current, lastTimestamp, started, step, toValue, previousAnimation } =
        animation

      if (
        typeof current !== 'number' ||
        typeof nextAnimation.current !== 'number'
      ) {
        console.warn('[withTick] Invalid animation state')
        return true
      }

      const deltaTime = Math.min(now - lastTimestamp, 64)

      animation.lastTimestamp = now

      if (animation.elapsed < config.interval) {
        animation.elapsed += deltaTime

        return false
      }

      if (!started) {
        nextAnimation.onStart(nextAnimation, 0, now, previousAnimation)
        animation.started = true
      }

      const startValue = step * toValue

      nextAnimation.onFrame(nextAnimation, now)
      animation.current = nextAnimation.current + startValue

      const finished =
        current > startValue &&
        current === (nextAnimation.current ?? 0) + startValue

      if (finished) {
        animation.step += 1
      }

      return finished
    }

    const onStart = (
      animation: TickAnimation,
      value: AnimatableValue,
      _now: number,
      previousAnimation: Animation<any> | null
    ): void => {
      const { step, toValue } = animation

      animation.current = (value as number) + step * toValue
      animation.lastTimestamp = 0
      animation.elapsed = 0
      animation.started = false
      animation.previousAnimation = previousAnimation
    }

    return {
      onFrame: tick,
      onStart,
      current: 0,
      lastTimestamp: 0,
      elapsed: 0,
      stared: false,
      step: 0,
      toValue: nextAnimation.toValue,
      previousAnimation: null,
    }
  })
} as unknown as withTickType
