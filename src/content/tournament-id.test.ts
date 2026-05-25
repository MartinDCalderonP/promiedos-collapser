import { describe, expect, test } from 'vitest'

import { normalizeTournamentName, resolveTournamentId } from './tournament-id'

describe('normalizeTournamentName', (): void => {
  test.each([
    {
      expected: 'liga profesional',
      value: '  Liga   Profesional  '
    },
    {
      expected: 'copa sudamericana',
      value: 'Copa Sudamericana'
    },
    {
      expected: 'torneo apertura',
      value: 'Torneo Ápertura'
    }
  ])('normalizes value: $value', ({ expected, value }): void => {
    const normalized: string = normalizeTournamentName({
      value
    })

    expect(normalized).toBe(expected)
  })
})

describe('resolveTournamentId', (): void => {
  test('uses the nearby title anchor instead of the button element', (): void => {
    document.body.innerHTML = `
      <div class="event-header">
        <a href="/league/primera-c/ffjb" class="event-header_left__q8kgh ">
          <img width="14.7" height="14.7" src="https://api.promiedos.com.ar/images/league/ffjb/1" alt="Primera C Metropolitana">
          Primera C Metropolitana
        </a>
        <div class="event-header_right__g4Ly6">
          <button class="event-header_icon__8_NSN">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down" style="transform: rotate(180deg);">
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </button>
        </div>
      </div>
    `

    const button: HTMLButtonElement | null = document.querySelector('button')

    if (button === null) throw new Error('Button not found')

    const tournamentId: string | null = resolveTournamentId({
      button
    })

    expect(tournamentId).toBe('primera c metropolitana')
  })
})
