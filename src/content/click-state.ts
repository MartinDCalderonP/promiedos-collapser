import { SELECTORS } from './selectors'
import { resolveTournamentId } from './tournament-id'

interface ResolvePendingClickStateParams {
  collapsedIds: Set<string>
  target: Element
}

export interface PendingClickState {
  desiredCollapsed: boolean
  tournamentId: string
}

export const resolvePendingClickState = ({
  collapsedIds,
  target
}: ResolvePendingClickStateParams): PendingClickState | null => {
  const buttonSelector: string = SELECTORS.tournamentButtons.join(',')
  const button: HTMLButtonElement | null = target.closest(buttonSelector)

  if (!(button instanceof HTMLButtonElement)) return null

  const tournamentId: string | null = resolveTournamentId({
    button
  })

  if (!tournamentId) return null

  return {
    desiredCollapsed: !collapsedIds.has(tournamentId),
    tournamentId
  }
}
