import { SELECTORS } from './selectors'
import { resolveTournamentId } from './tournament-id'
import type { TournamentRecord } from './types'

interface FindTournamentRecordsParams {
  root: ParentNode
}

export const findTournamentRecords = ({
  root
}: FindTournamentRecordsParams): TournamentRecord[] => {
  const selector: string = SELECTORS.tournamentButtons.join(',')
  const buttonNodes: NodeListOf<Element> = root.querySelectorAll(selector)
  const records: TournamentRecord[] = []

  buttonNodes.forEach((node: Element): void => {
    if (!(node instanceof HTMLButtonElement)) return

    const id: string | null = resolveTournamentId({
      button: node
    })

    if (!id) return

    records.push({
      button: node,
      id
    })
  })

  return records
}
