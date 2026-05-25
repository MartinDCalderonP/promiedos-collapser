export interface TournamentRecord {
  button: HTMLButtonElement
  id: string
}

export interface ReadCollapsedStateParams {
  button: HTMLButtonElement
}

export interface TogglePersistenceParams {
  collapsedIds: Set<string>
  id: string
  isCollapsed: boolean
}

export interface StartSyncParams {
  root: ParentNode
}
