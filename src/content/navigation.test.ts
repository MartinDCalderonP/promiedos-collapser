import { afterEach, describe, expect, test, vi } from 'vitest'

import { createNavigationObserver } from './navigation'

describe('createNavigationObserver', (): void => {
  afterEach((): void => {
    vi.unstubAllGlobals()
  })

  test('notifies on navigation events', (): void => {
    const callback: () => void = vi.fn((): void => undefined)
    const cleanup: () => void = createNavigationObserver({
      callback
    })

    globalThis.history.pushState({}, '', '/first')

    expect(callback).toHaveBeenCalledTimes(1)

    globalThis.history.replaceState({}, '', '/second')

    expect(callback).toHaveBeenCalledTimes(2)

    globalThis.dispatchEvent(new PopStateEvent('popstate'))

    expect(callback).toHaveBeenCalledTimes(3)

    cleanup()

    globalThis.history.pushState({}, '', '/third')

    expect(callback).toHaveBeenCalledTimes(3)
  })

  test('notifies when the location href changes directly', (): void => {
    type IntervalHandler = Parameters<typeof globalThis.setInterval>[0]

    const callback: () => void = vi.fn((): void => undefined)
    let intervalHandler: IntervalHandler | undefined

    vi.stubGlobal(
      'setInterval',
      vi.fn((handler: IntervalHandler): number => {
        intervalHandler = handler

        return 1
      })
    )
    vi.stubGlobal(
      'clearInterval',
      vi.fn((): void => undefined)
    )
    vi.stubGlobal('location', {
      href: 'https://www.promiedos.com.ar/'
    })

    const cleanup: () => void = createNavigationObserver({
      callback
    })

    if (intervalHandler === undefined)
      throw new Error('Missing interval handler')

    globalThis.location.href = 'https://www.promiedos.com.ar/ayer'

    if (typeof intervalHandler === 'function') intervalHandler()

    expect(callback).toHaveBeenCalledTimes(1)

    cleanup()
  })
})
