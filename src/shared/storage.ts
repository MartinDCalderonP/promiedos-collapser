import browser from 'webextension-polyfill'

const STORAGE_KEY: string = 'collapsedTournamentIds'

interface SaveCollapsedIdsParams {
  ids: string[]
}

export const loadCollapsedIds = async (): Promise<Set<string>> => {
  const storedValue: Record<string, unknown> =
    await browser.storage.local.get(STORAGE_KEY)
  const rawIds: unknown = storedValue[STORAGE_KEY]

  const ids: string[] = Array.isArray(rawIds)
    ? rawIds.filter((item: unknown): item is string => typeof item === 'string')
    : []

  return new Set(ids)
}

export const saveCollapsedIds = async ({
  ids
}: SaveCollapsedIdsParams): Promise<void> => {
  await browser.storage.local.set({
    [STORAGE_KEY]: ids
  })
}
