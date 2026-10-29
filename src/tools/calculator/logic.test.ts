import { describe, expect, it } from 'vitest'
import { calculate, formatResult } from './logic'

describe('calculator', () => {
  it('supports the four basic operations', () => {
    expect(calculate(8, 2, 'add')).toBe(10)
    expect(calculate(8, 2, 'subtract')).toBe(6)
    expect(calculate(8, 2, 'multiply')).toBe(16)
    expect(calculate(8, 2, 'divide')).toBe(4)
  })

  it('rejects division by zero', () => {
    expect(() => calculate(8, 0, 'divide')).toThrow('除数不能为 0')
  })

  it('keeps decimal output readable', () => {
    expect(formatResult(0.1 + 0.2)).toBe('0.3')
  })
})

