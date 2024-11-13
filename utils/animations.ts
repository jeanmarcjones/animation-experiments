import {
  type AnimatableValue,
  type Animation,
  type AnimationObject,
  defineAnimation,
} from 'react-native-reanimated'

interface TickAnimation extends Animation<TickAnimation> {
  lastTimestamp: number
  elapsed: number
}

type withTickType = <T extends AnimatableValue>(
  interval?: number
  // _nextAnimation: T
) => number

// TODO docs + investigate testing
// TODO composable with withRepeat
// TODO composable with withTiming
export const withTick = function <T extends AnimationObject>(
  interval = 1000
  // _nextAnimation: T | (() => T)
): Animation<TickAnimation> {
  'worklet'

  return defineAnimation(0, () => {
    'worklet'

    // const nextAnimation =
    //   typeof _nextAnimation === 'function' ? _nextAnimation() : _nextAnimation

    const test = (animation: TickAnimation, now: number): boolean => {
      const { lastTimestamp } = animation


      const deltaTime = Math.min(now - lastTimestamp, 64)

      animation.lastTimestamp = now

      if (animation.elapsed < interval) {
        animation.elapsed += deltaTime
      } else {
        animation.current = ((animation.current as number) ?? 0) + Math.PI / 10
        animation.elapsed = 0
      }

      // const finished = nextAnimation.onFrame(nextAnimation, now)

      return false
    }

    const onStart = (
      animation: Animation<any>,
      value: AnimatableValue,
      now: number,
      previousAnimation: Animation<any> | null
    ): void => {
      animation.current = value
      animation.lastTimestamp = 0
      animation.elapsed = interval - 100

      // nextAnimation.onStart(nextAnimation, value, now, previousAnimation)
    }

    return {
      onFrame: test,
      onStart,
      lastTimestamp: 0,
      elapsed: 0,
    }
  })
} as unknown as withTickType
