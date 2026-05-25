import { SELECTORS } from './selectors'

interface NormalizeTournamentNameParams {
  value: string
}

export const normalizeTournamentName = ({
  value
}: NormalizeTournamentNameParams): string => {
  const normalizedValue: string = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()

  return normalizedValue
}

interface ResolveTitleFromContainerParams {
  container: Element
}

const resolveTitleFromContainer = ({
  container
}: ResolveTitleFromContainerParams): string | null => {
  const titleSelector: string = SELECTORS.tournamentTitles.join(',')
  const titleNode: Element | null = container.querySelector(titleSelector)
  const textValue: string = titleNode?.textContent?.trim() ?? ''

  return textValue || null
}

interface ResolveTitleFromAncestorsParams {
  button: HTMLButtonElement
}

const resolveTitleFromAncestors = ({
  button
}: ResolveTitleFromAncestorsParams): string | null => {
  const titleSelector: string = SELECTORS.tournamentTitles.join(',')
  let currentElement: Element | null = button.parentElement

  while (currentElement !== null) {
    const titleNode: Element | null =
      currentElement.querySelector(titleSelector)
    const titleValue: string = titleNode?.textContent?.trim() ?? ''

    if (titleValue) return titleValue

    currentElement = currentElement.parentElement
  }

  return null
}

interface ResolveTournamentIdParams {
  button: HTMLButtonElement
}

export const resolveTournamentId = ({
  button
}: ResolveTournamentIdParams): string | null => {
  const containerId: string = button.getAttribute('aria-controls') ?? ''
  const titleValue: string | null = resolveTitleFromAncestors({
    button
  })
  const containerSelector: string = SELECTORS.containers.join(',')
  const container: Element | null = button.closest(containerSelector)
  const containerTitleValue: string | null = container
    ? resolveTitleFromContainer({
        container
      })
    : null

  const baseId: string = titleValue ?? containerTitleValue ?? containerId
  const normalizedId: string = normalizeTournamentName({
    value: baseId
  })

  return normalizedId || null
}
