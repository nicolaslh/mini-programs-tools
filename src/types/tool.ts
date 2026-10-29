export const TOOL_CATEGORIES = ['全部', '计算', '时间', '文本', '开发'] as const

export type ToolCategory = Exclude<(typeof TOOL_CATEGORIES)[number], '全部'>

export type ToolPlatform =
  | 'app'
  | 'h5'
  | 'mp-weixin'
  | 'mp-alipay'
  | 'mp-toutiao'

export interface ToolManifest {
  id: string
  name: string
  description: string
  category: ToolCategory
  route: string
  icon: string
  accent: string
  keywords: string[]
  platforms: ToolPlatform[]
  order?: number
}

