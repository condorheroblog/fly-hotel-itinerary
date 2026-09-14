# TripSheet · 机票 / 酒店行程单生成器

> 免费 · 无需注册 · 浏览器本地运行

在线访问：[https://condorheroblog.github.io/fly-hotel-itinerary/](https://condorheroblog.github.io/fly-hotel-itinerary/)

几分钟内生成专业的机票行程单和酒店入住凭证。行业级版式模板、中英双语内容、实时预览，一键导出高清 PNG / JPG 或可打印 PDF。

## ✨ 特性

### 📝 5 套真实还原的单据版式

**机票 · 3 套**

- **Trip.com 时间轴版** — 现代时间轴版式，含中转信息与费用明细
- **去哪儿打字机版** — 经典等宽字体行程单，信息表格呈现
- **航空凭证版** — 航空公司正式边框凭证，含完整须知

**酒店 · 2 套**

- **携程边框卡片版** — 经典边框入住凭证，分区明细清晰
- **蓝色横幅版** — 品牌色页眉横幅的现代凭证版式

### 🌐 三语内容输出

行程单支持三种输出模式：纯英文、纯中文、中英双语。网站界面语言也可一键切换中 / 英。

### 👁 实时预览

每次输入都会即时呈现在像素级、可打印的预览画布中，所见即所得。

### 📤 多种导出格式

- **PNG / JPG** — 基于 [snapDOM](https://github.com/zumerlab/snapdom) 渲染高清图片
- **PDF** — 调用浏览器原生打印对话框，选择「存储为 PDF」

### 🛠 智能细节

- **订单编号** — 系统自动生成符合平台格式的确认编号，也可手动输入
- **表单校验** — IATA 机场代码、日期先后、邮箱 / 手机号等实时验证
- **数据持久化** — 草稿自动保存到 localStorage，刷新页面不丢失
- **重置 / 载入示例** — 快速清空或一键填充样例数据

### 🎨 暗色模式 & 移动端

深色 / 浅色主题自由切换，手机触控优化，390px 起流畅适配。

## 🧩 技术栈

| 类别     | 技术                              |
|----------|-----------------------------------|
| 框架     | React 19 + TypeScript             |
| 构建     | Vite 8                            |
| 样式     | Tailwind CSS 4                    |
| 路由     | React Router 8                    |
| 国际化   | i18next + react-i18next           |
| URL 状态 | nuqs                              |
| 图片导出 | @zumer/snapdom                    |
| 代码规范 | ESLint (Antfu) + simple-git-hooks |

## 🚀 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 类型检查
pnpm typecheck

# 代码检查
pnpm lint

# 生产构建
pnpm build
```

## 📦 项目结构

```
src/
├── components/           # 通用组件（Header / Footer / ExportBar / Stage …）
│   ├── generator/        # 生成器壳与表单（FlightForm / HotelForm）
│   └── ui/               # 基础 UI 控件
├── hooks/                # 自定义 Hook（useExporter / useTheme）
├── i18n/                 # 中英双语词条
├── itinerary/            # 核心模板引擎
│   ├── flight/           # 机票 3 套模板
│   ├── hotel/            # 酒店 2 套模板
│   ├── defaults.ts       # 示例数据
│   ├── validate.ts       # 表单校验
│   └── types.ts          # 数据类型定义
├── pages/                # 路由页面（Landing / Flight / Hotel）
└── App.tsx               # 入口与路由配置
```

## 📄 License

[MIT](https://github.com/condorheroblog/fly-hotel-itinerary/blob/main/LICENSE) License © 2026-Present [Condor Hero](https://github.com/condorheroblog)
