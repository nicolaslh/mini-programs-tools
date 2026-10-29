export type Operation = 'add' | 'subtract' | 'multiply' | 'divide'

export function calculate(left: number, right: number, operation: Operation): number {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new Error('请输入有效数字')
  }
  if (operation === 'divide' && right === 0) {
    throw new Error('除数不能为 0')
  }

  const operations: Record<Operation, () => number> = {
    add: () => left + right,
    subtract: () => left - right,
    multiply: () => left * right,
    divide: () => left / right,
  }

  return operations[operation]()
}

export function formatResult(value: number): string {
  if (Number.isInteger(value)) return String(value)
  return String(Number(value.toFixed(10)))
}

