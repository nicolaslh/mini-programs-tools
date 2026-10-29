import { describe, expect, it } from 'vitest'
import { dateTimeToTimestamp, formatDateTime, timestampToDateTime } from './logic'

describe('timestamp converter', () => {
  it('round-trips a local date and Unix timestamp', () => {
    const dateTime = '2026-10-21 14:35:08'
    expect(timestampToDateTime(dateTimeToTimestamp(dateTime))).toBe(dateTime)
  })

  it('accepts millisecond timestamps', () => {
    const date = new Date(2026, 9, 21, 14, 35, 8)
    expect(timestampToDateTime(String(date.getTime()))).toBe(formatDateTime(date))
  })

  it('rejects normalized invalid dates', () => {
    expect(() => dateTimeToTimestamp('2026-02-30 10:00:00')).toThrow('请输入有效日期时间')
  })
})

