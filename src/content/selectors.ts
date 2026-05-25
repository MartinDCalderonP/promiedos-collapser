const TOURNAMENT_BUTTON_SELECTORS: string[] = [
  'button[class*="event-header_button"]',
  'button[aria-controls][aria-expanded]',
  'button[class*="event-header"]'
]

const TITLE_SELECTORS: string[] = [
  'a[class*="event-header_left"]',
  'a[href*="/league/"]',
  '[class*="event-header_title"]',
  '[class*="event-header_name"]',
  '[role="heading"]',
  'h2',
  'h3'
]

const CONTAINER_SELECTORS: string[] = [
  '[class*="event-header"]',
  '[class*="event"]',
  '[data-id*="event"]',
  'section',
  'article'
]

export const SELECTORS = {
  containers: CONTAINER_SELECTORS,
  tournamentButtons: TOURNAMENT_BUTTON_SELECTORS,
  tournamentTitles: TITLE_SELECTORS
}
