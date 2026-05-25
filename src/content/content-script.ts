import { createDebouncedObserver } from './observer'
import { createNavigationObserver } from './navigation'
import { resolvePendingClickState } from './click-state'
import { mergePendingCollapsedIds } from './collapsed-ids'
import { reconcileRecord } from './reconciler'
import { findTournamentRecords } from './tournaments'
import { loadCollapsedIds, saveCollapsedIds } from '../shared/storage'

const pendingCollapsedIds: Map<string, boolean> = new Map()
const pendingTournamentIds: Set<string> = new Set()

const applyState = async (): Promise<void> => {
  const loadedCollapsedIds: Set<string> = await loadCollapsedIds()
  const collapsedIds: Set<string> = mergePendingCollapsedIds({
    collapsedIds: loadedCollapsedIds,
    pendingCollapsedIds
  })
  const records = findTournamentRecords({
    root: document
  })

  records.forEach((record): void => {
    if (pendingTournamentIds.has(record.id)) return

    reconcileRecord({
      collapsedIds,
      record
    })
  })
}

interface PersistClickResultParams {
  desiredCollapsed: boolean
  tournamentId: string
}

const persistClickResult = async ({
  desiredCollapsed,
  tournamentId
}: PersistClickResultParams): Promise<void> => {
  const collapsedIds: Set<string> = await loadCollapsedIds()

  if (desiredCollapsed) collapsedIds.add(tournamentId)
  else collapsedIds.delete(tournamentId)

  await saveCollapsedIds({
    ids: [...collapsedIds]
  })
}

interface OnDocumentPointerDownParams {
  event: Event
}

const onDocumentPointerDown = ({
  event
}: OnDocumentPointerDownParams): void => {
  const { target } = event

  if (!(target instanceof Element)) return

  void loadCollapsedIds().then((collapsedIds: Set<string>): void => {
    const pendingClickState = resolvePendingClickState({
      collapsedIds,
      target
    })

    if (!pendingClickState) return

    const { desiredCollapsed, tournamentId } = pendingClickState

    pendingCollapsedIds.set(tournamentId, desiredCollapsed)
    pendingTournamentIds.add(tournamentId)

    void persistClickResult({
      desiredCollapsed,
      tournamentId
    }).finally((): void => {
      pendingCollapsedIds.delete(tournamentId)
      pendingTournamentIds.delete(tournamentId)
    })
  })
}

const init = async (): Promise<void> => {
  createNavigationObserver({
    callback: (): void => {
      void applyState()
    }
  })

  document.addEventListener(
    'pointerdown',
    (event: Event) => onDocumentPointerDown({ event }),
    true
  )
  createDebouncedObserver({
    callback: (): void => {
      void applyState()
    },
    root: document.body
  })

  await applyState()
}

void init()
