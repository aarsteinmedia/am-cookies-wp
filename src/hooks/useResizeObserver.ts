import { useEffect } from '@wordpress/element'

export default function useResizeObserver(ref: React.RefObject<HTMLElement | null>,
  callback: ResizeObserverCallback) {
  useEffect(() => {
    const { current: el } = ref

    if (!el) {
      return
    }

    const resizeObserver = new ResizeObserver(callback)

    resizeObserver.observe(el)

    return () => {
      resizeObserver.disconnect()
    }

  }, [callback, ref])
}