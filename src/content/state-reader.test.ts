import { describe, expect, test } from 'vitest'

import { parseChevronTransform, readCollapsedState } from './state-reader'

describe('parseChevronTransform', (): void => {
  test.each([
    {
      expected: false,
      value: 'rotate(180deg)'
    },
    {
      expected: true,
      value: 'rotate(90deg)'
    },
    {
      expected: undefined,
      value: ''
    }
  ])(
    'returns expected collapsed state for $value',
    ({ expected, value }): void => {
      const state: boolean | undefined = parseChevronTransform({
        value
      })

      expect(state).toBe(expected)
    }
  )
})

describe('readCollapsedState', (): void => {
  test('prioritizes aria-expanded when available', (): void => {
    const button: HTMLButtonElement = document.createElement('button')
    button.setAttribute('aria-expanded', 'false')

    const state: boolean | undefined = readCollapsedState({
      button
    })

    expect(state).toBe(true)
  })

  test('treats a disabled button as collapsed when aria state is missing', (): void => {
    document.body.innerHTML = `
      <button disabled>
        <svg></svg>
      </button>
    `

    const button: HTMLButtonElement | null = document.querySelector('button')

    if (button === null) throw new Error('Button not found')

    expect(
      readCollapsedState({
        button
      })
    ).toBe(true)
  })
})
