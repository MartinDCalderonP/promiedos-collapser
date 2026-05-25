import { readCollapsedState } from './state-reader'
import type { TournamentRecord } from './types'

interface ShouldToggleParams {
  currentValue: boolean
  desiredValue: boolean
}

const shouldToggle = ({
  currentValue,
  desiredValue
}: ShouldToggleParams): boolean => {
  return currentValue !== desiredValue
}

interface ReconcileRecordParams {
  collapsedIds: Set<string>
  record: TournamentRecord
}

export const reconcileRecord = ({
  collapsedIds,
  record
}: ReconcileRecordParams): void => {
  const { button, id } = record
  const desiredCollapsed: boolean = collapsedIds.has(id)
  const currentCollapsed: boolean | undefined = readCollapsedState({
    button
  })

  if (currentCollapsed === undefined) return

  const shouldToggleState: boolean = shouldToggle({
    currentValue: currentCollapsed,
    desiredValue: desiredCollapsed
  })

  if (!shouldToggleState) return

  button.click()
}
