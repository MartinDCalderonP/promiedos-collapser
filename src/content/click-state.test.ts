import { describe, expect, test } from 'vitest'

import { resolvePendingClickState } from './click-state'

describe('resolvePendingClickState', (): void => {
  test('requests collapse when the tournament is not stored as collapsed', (): void => {
    document.body.innerHTML = `
      <div class="event-header">
        <a href="/league/primera-c/ffjb" class="event-header_left__q8kgh ">
          Primera C Metropolitana
        </a>
        <div class="event-header_right__g4Ly6">
          <button class="event-header_icon__8_NSN" aria-expanded="true">
            <svg></svg>
          </button>
        </div>
      </div>
    `

    const button: HTMLButtonElement | null = document.querySelector('button')

    if (button === null) throw new Error('Button not found')

    const pendingClickState = resolvePendingClickState({
      collapsedIds: new Set<string>(),
      target: button
    })

    expect(pendingClickState).toEqual({
      desiredCollapsed: true,
      tournamentId: 'primera c metropolitana'
    })
  })

  test('requests expansion when the tournament is already stored as collapsed', (): void => {
    document.body.innerHTML = `
      <div class="event-header">
        <a href="/league/primera-c/ffjb" class="event-header_left__q8kgh ">
          Primera C Metropolitana
        </a>
        <div class="event-header_right__g4Ly6">
          <button class="event-header_icon__8_NSN" aria-expanded="false">
            <svg></svg>
          </button>
        </div>
      </div>
    `

    const button: HTMLButtonElement | null = document.querySelector('button')

    if (button === null) throw new Error('Button not found')

    const pendingClickState = resolvePendingClickState({
      collapsedIds: new Set<string>(['primera c metropolitana']),
      target: button
    })

    expect(pendingClickState).toEqual({
      desiredCollapsed: false,
      tournamentId: 'primera c metropolitana'
    })
  })

  test('ignores clicks outside a tournament container', (): void => {
    document.body.innerHTML = `
      <button aria-expanded="true">
        <svg></svg>
      </button>
    `

    const button: HTMLButtonElement | null = document.querySelector('button')

    if (button === null) throw new Error('Button not found')

    const pendingClickState = resolvePendingClickState({
      collapsedIds: new Set<string>(),
      target: button
    })

    expect(pendingClickState).toBeNull()
  })

  test('ignores a container that does not contain the tournament toggle', (): void => {
    document.body.innerHTML = `
      <div class="event-header">
        <a href="/league/primera-c/ffjb" class="event-header_left__q8kgh ">
          Primera C Metropolitana
        </a>
      </div>
    `

    const titleLink: HTMLAnchorElement | null = document.querySelector('a')

    if (titleLink === null) throw new Error('Title link not found')

    const pendingClickState = resolvePendingClickState({
      collapsedIds: new Set<string>(),
      target: titleLink
    })

    expect(pendingClickState).toBeNull()
  })
})
