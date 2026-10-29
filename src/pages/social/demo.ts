export type ChatSpeaker = 'lan' | 'qiao'

export interface DemoMessage {
  id: number
  speaker: ChatSpeaker
  text: string
}

export function clampDemoValue(value: number, maximum = 999999): number {
  if (!Number.isFinite(value)) return 0
  return Math.min(maximum, Math.max(0, Math.round(value)))
}

export function createInitialMessages(): DemoMessage[] {
  return [
    { id: 1, speaker: 'lan', text: '下午的原型评审改到三点，可以吗？' },
    { id: 2, speaker: 'qiao', text: '可以，我会提前把演示数据准备好。' },
  ]
}

