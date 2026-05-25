import type { ReadCollapsedStateParams } from './types'

interface ParseChevronTransformParams {
  value: string
}

const EXPANDED_ROTATION: string = 'rotate(180deg)'

const readAriaState = ({
  button
}: ReadCollapsedStateParams): boolean | undefined => {
  const ariaExpanded: string | null = button.getAttribute('aria-expanded')

  if (ariaExpanded === 'true') return false

  if (ariaExpanded === 'false') return true

  return undefined
}

export const parseChevronTransform = ({
  value
}: ParseChevronTransformParams): boolean | undefined => {
  const hasExpandedRotation: boolean = value.includes(EXPANDED_ROTATION)
  const hasAnyTransform: boolean = value.trim().length > 0

  if (hasExpandedRotation) return false

  if (hasAnyTransform) return true

  return undefined
}

export const readCollapsedState = ({
  button
}: ReadCollapsedStateParams): boolean | undefined => {
  const ariaState: boolean | undefined = readAriaState({
    button
  })

  if (ariaState !== undefined) return ariaState

  if (button.disabled) return true

  const chevron: SVGElement | null = button.querySelector('svg')
  const transform: string = chevron?.style.transform ?? ''

  return parseChevronTransform({
    value: transform
  })
}
