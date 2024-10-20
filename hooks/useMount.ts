import { type EffectCallback, useEffect } from 'react'

const useMount = (effect: EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps -- Empty dependencies required to run effect once on mount
  useEffect(effect, [])
}

export { useMount }
