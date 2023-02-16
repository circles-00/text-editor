import { EffectCallback, useEffect, useRef, useState } from 'react'

type UpdateCallback = EffectCallback | { (): Promise<void> }

export const useEffectOnce = (callback: UpdateCallback) => {
  const cleanupCallback = useRef<void | Promise<void> | (() => void)>()

  const isEffectCalled = useRef(false)

  const isRenderedAfterEffect = useRef(false)

  const [, forceUpdate] = useState({})

  // Because the component is guaranteed
  // to be rendered once, we block
  // the first cleanup with the
  // `isRenderedAfterEffect` flag (row 43)
  // That's why we need to unblock it (row 37),
  // ensuring a second rerender
  if (isEffectCalled.current) {
    isRenderedAfterEffect.current = true
  }

  useEffect(() => {
    // Executes effect only once
    if (!isEffectCalled.current) {
      cleanupCallback.current = callback()
      isEffectCalled.current = true
    }

    // In StrictMode the component
    // in which this effect lives
    // is rendered once but we prevent
    // the code to the cleanup function.
    // That's why we need to trigger
    // another rerender to unblock (row 12)
    // the final cleanup code
    forceUpdate({})

    return () => {
      ;(async () => {
        // This prevents cleanup to be called
        // after the first effect is cleaned up
        // in StrictMode
        if (!isRenderedAfterEffect.current) {
          return
        }

        const func = await cleanupCallback.current

        if (typeof func === 'function') {
          await func()
        }
      })()
    }
  }, [])
}
