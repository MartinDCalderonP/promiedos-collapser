import type { Timer } from '../shared/types'

interface CreateNavigationObserverParams {
  callback: () => void
}

type HistoryMethod = typeof history.pushState

const URL_CHECK_DELAY_MS: number = 120

const NAVIGATION_EVENTS: Array<'hashchange' | 'popstate'> = [
  'hashchange',
  'popstate'
]

export const createNavigationObserver = ({
  callback
}: CreateNavigationObserverParams): (() => void) => {
  let lastHref: string = globalThis.location.href

  const notify = (): void => {
    callback()
  }

  const originalPushState: HistoryMethod = history.pushState
  const originalReplaceState: HistoryMethod = history.replaceState
  const intervalId: Timer = globalThis.setInterval((): void => {
    const currentHref: string = globalThis.location.href
    const hasChanged: boolean = currentHref !== lastHref

    if (!hasChanged) return

    lastHref = currentHref
    notify()
  }, URL_CHECK_DELAY_MS)

  history.pushState = ((...args) => {
    const result: ReturnType<HistoryMethod> = originalPushState.apply(
      history,
      args
    )

    lastHref = globalThis.location.href
    notify()

    return result
  }) as HistoryMethod

  history.replaceState = ((...args) => {
    const result: ReturnType<HistoryMethod> = originalReplaceState.apply(
      history,
      args
    )

    lastHref = globalThis.location.href
    notify()

    return result
  }) as HistoryMethod

  const onNavigationEvent = (): void => {
    notify()
  }

  NAVIGATION_EVENTS.forEach((eventName): void => {
    globalThis.addEventListener(eventName, onNavigationEvent)
  })

  return (): void => {
    history.pushState = originalPushState
    history.replaceState = originalReplaceState
    globalThis.clearInterval(intervalId)

    NAVIGATION_EVENTS.forEach((eventName): void => {
      globalThis.removeEventListener(eventName, onNavigationEvent)
    })
  }
}
