# mini-programs-tools

基于 uni-app、Vue 3 和 TypeScript 的模块化工具集，可编译为 App、H5、微信小程序、支付宝小程序和抖音小程序。

项目还包含一个带固定演示标识的社交界面实验区，用于原型与培训。实验区使用虚构身份，不生成可冒充真实记录的内容。

## 开始使用

```bash
pnpm install
pnpm dev:h5
```

常用命令：

```bash
pnpm dev:app
pnpm dev:mp-weixin
pnpm build:h5
pnpm build:mp-weixin
pnpm type-check
pnpm test
```

App 命令生成 App 资源；正式安装包仍需使用 HBuilderX 或 DCloud CLI 配置应用标识、证书与原生模块后打包。

## 新增工具

每个工具都是 `src/tools` 下的独立目录。新增工具时：

1. 创建 `src/tools/<tool-id>/manifest.json`。
2. 创建页面 `src/tools/<tool-id>/index.vue`。
3. 将可测试的业务逻辑放在同目录的 `logic.ts`。
4. 运行 `pnpm tools:generate`。

生成器会校验工具清单，并更新 `src/tools/generated.ts` 和 `src/pages.json`。所有开发、构建命令都会先自动执行生成器。

工具清单示例：

```json
{
  "id": "example",
  "name": "示例工具",
  "description": "说明这个工具解决什么问题",
  "category": "开发",
  "route": "/tools/example/index",
  "icon": "例",
  "accent": "#3f648c",
  "keywords": ["示例", "关键词"],
  "platforms": ["app", "h5", "mp-weixin", "mp-alipay", "mp-toutiao"],
  "order": 100
}
```

## 设计边界

- `src/tools`：独立工具及其业务逻辑。
- `src/platform`：剪贴板、文件、分享等平台能力适配。
- `src/stores`：收藏、历史记录和全局偏好。
- `src/components`：跨工具复用的展示组件。
- `scripts/generate-tools.mjs`：工具发现、校验和路由生成。

工具页面不要直接调用微信、支付宝或 App 专有 API。先在 `src/platform` 中定义统一接口，再通过条件编译实现各平台差异。
