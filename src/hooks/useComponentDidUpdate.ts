import { useEffect, useRef } from '@wordpress/element'

export default function useComponentDidUpdate(effect: React.EffectCallback, deps?: React.DependencyList) {
  const initialMount = useRef(true)

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false

      return
    }

    effect()

  }, deps)
}