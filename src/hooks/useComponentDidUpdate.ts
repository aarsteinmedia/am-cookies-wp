import { useEffect, useRef } from '@wordpress/element'

export default function useComponentDidUpdate(effect: React.EffectCallback, deps?: React.DependencyList) {
  const initialMountRef = useRef(true)

  useEffect(() => {
    if (initialMountRef.current) {
      initialMountRef.current = false

      return
    }

    effect()

  }, deps)
}