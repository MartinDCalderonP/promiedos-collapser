import type { Timer } from '../shared/types'

interface CreateObserverParams {
  callback: () => void
  root: Node
}

const OBSERVER_DELAY_MS: number = 120

export const createDebouncedObserver = ({
  callback,
  root
}: CreateObserverParams): MutationObserver => {
  let timeoutId: Timer | undefined

  const observer: MutationObserver = new MutationObserver((): void => {
    if (timeoutId !== undefined) globalThis.clearTimeout(timeoutId)

    timeoutId = globalThis.setTimeout((): void => {
      callback()
      timeoutId = undefined
    }, OBSERVER_DELAY_MS)
  })

  observer.observe(root, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
  })

  return observer
}
