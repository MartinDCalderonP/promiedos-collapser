import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { createDebouncedObserver } from './observer'

interface CreatedObserver {
  callback: MutationCallback
  observe: ReturnType<typeof vi.fn>
}

const createdObservers: CreatedObserver[] = []

class MockMutationObserver {
  callback: MutationCallback

  observe = vi.fn()

  constructor(callback: MutationCallback) {
    this.callback = callback
    createdObservers.push(this)
  }
}

describe('createDebouncedObserver', (): void => {
  beforeEach((): void => {
    vi.useFakeTimers()
    vi.stubGlobal('MutationObserver', MockMutationObserver)
  })

  afterEach((): void => {
    createdObservers.length = 0
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  test('observes attribute and character changes and debounces callback', (): void => {
    const callback: () => void = vi.fn((): void => undefined)

    createDebouncedObserver({
      callback,
      root: document.body
    })

    const createdObserver: CreatedObserver | undefined = createdObservers[0]

    if (!createdObserver) {
      throw new Error('Expected a created observer')
    }

    expect(createdObserver.observe).toHaveBeenCalledWith(document.body, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    })

    createdObserver.callback([], {} as MutationObserver)
    createdObserver.callback([], {} as MutationObserver)

    vi.advanceTimersByTime(119)

    expect(callback).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
