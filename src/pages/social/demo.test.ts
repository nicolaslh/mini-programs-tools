import { describe, expect, it } from 'vitest'
import { clampDemoValue, createInitialMessages } from './demo'

describe('social demo helpers', () => {
  it('keeps demo counters inside the display range', () => {
    expect(clampDemoValue(-1)).toBe(0)
    expect(clampDemoValue(12.6)).toBe(13)
    expect(clampDemoValue(1000000)).toBe(999999)
  })

  it('returns a fresh message list', () => {
    const first = createInitialMessages()
    const second = createInitialMessages()
    first.push({ id: 3, speaker: 'lan', text: '新增内容' })
    expect(second).toHaveLength(2)
  })
})

