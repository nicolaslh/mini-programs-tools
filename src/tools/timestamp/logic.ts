function pad(value: number): string {
  return String(value).padStart(2, '0')
}

export function formatDateTime(date: Date): string {
  if (Number.isNaN(date.getTime())) {
    throw new Error('无效时间戳')
  }

  return [
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`,
  ].join(' ')
}

export function timestampToDateTime(input: string): string {
  const value = input.trim()
  if (!/^\d{10}$|^\d{13}$/.test(value)) {
    throw new Error('请输入 10 位秒或 13 位毫秒时间戳')
  }

  const milliseconds = value.length === 10 ? Number(value) * 1000 : Number(value)
  return formatDateTime(new Date(milliseconds))
}

export function dateTimeToTimestamp(input: string): string {
  const match = input
    .trim()
    .match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})$/)

  if (!match) {
    throw new Error('请按 YYYY-MM-DD HH:mm:ss 输入')
  }

  const [, year, month, day, hour, minute, second] = match.map(Number)
  const date = new Date(year, month - 1, day, hour, minute, second)
  const isExactDate =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    date.getHours() === hour &&
    date.getMinutes() === minute &&
    date.getSeconds() === second

  if (!isExactDate) {
    throw new Error('请输入有效日期时间')
  }

  return String(Math.floor(date.getTime() / 1000))
}

