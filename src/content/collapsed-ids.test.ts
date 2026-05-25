import { describe, expect, test } from 'vitest'

import { mergePendingCollapsedIds } from './collapsed-ids'

describe('mergePendingCollapsedIds', (): void => {
  test('adds pending collapsed ids to the saved set', (): void => {
    const collapsedIds: Set<string> = new Set(['conmebol copa libertadores'])
    const pendingCollapsedIds: Map<string, boolean> = new Map([
      ['conmebol copa sudamericana', true]
    ])

    const mergedCollapsedIds: Set<string> = mergePendingCollapsedIds({
      collapsedIds,
      pendingCollapsedIds
    })

    expect(mergedCollapsedIds.has('conmebol copa libertadores')).toBe(true)
    expect(mergedCollapsedIds.has('conmebol copa sudamericana')).toBe(true)
  })

  test('removes pending expanded ids from the saved set', (): void => {
    const collapsedIds: Set<string> = new Set([
      'conmebol copa libertadores',
      'conmebol copa sudamericana'
    ])
    const pendingCollapsedIds: Map<string, boolean> = new Map([
      ['conmebol copa libertadores', false]
    ])

    const mergedCollapsedIds: Set<string> = mergePendingCollapsedIds({
      collapsedIds,
      pendingCollapsedIds
    })

    expect(mergedCollapsedIds.has('conmebol copa libertadores')).toBe(false)
    expect(mergedCollapsedIds.has('conmebol copa sudamericana')).toBe(true)
  })
})
