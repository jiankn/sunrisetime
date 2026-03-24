# SunriseTime.co — 产品需求文档 (PRD)

> **域名**：sunrisetime.co  
> **定位**：全球日出日落 / 黄金时段 / 月相 / 祈祷时间数据工具站  
> **商业模式**：AdSense 广告变现  
> **技术栈**：Astro (SSG + SSR Hybrid) + Cloudflare Pages  
> **创建日期**：2026-03-24

---

## 1. 产品概述

### 1.1 产品愿景
成为全球用户查询日出日落时间、黄金时段、月相和伊斯兰祈祷时间的**首选工具站**。通过程序化 SEO 生成海量城市 × 日期组合的精准数据页，以长尾流量聚合实现 AdSense 变现。

### 1.2 市场验证
| 验证词 | Ahrefs KD | 等级 |
|---|---|---|
| sunrise time New York | **2** | Easy |
| sunset today Los Angeles | **1** | Easy |
| prayer times London | **7** | Easy |
| golden hour today | **24** | Medium |
| moon phase tonight | 69 | Hard（不做主力） |

**结论**：4/5 验证词 KD ≤ 24。竞品 sunsethue.com（DR 11）仅 2 个外链即排 Google 第三，证明新站完全可行。

### 1.3 竞品分析
| 竞品 | DR | 优势 | 弱点 |
|---|---|---|---|
| timeanddate.com | 91 | 权威老牌，数据全 | 页面重、加载慢、广告多、UX 陈旧 |
| sunrise-sunset.org | 71 | 有 API | UI 极简陋，功能单一 |
| sunsethue.com | 11 | 专注黄金时段 | 功能少，城市覆盖低 |
| islamicfinder.org | — | 祈祷时间权威 | 仅覆盖祈祷，无日出日落 |

**差异化机会**：
1. 更快（纯静态/边缘计算，TTFB < 50ms vs timeanddate ~500ms）
2. 更美（现代 UI，暗色模式，图表可视化）
3. 更全（日出日落 + 黄金时段 + 月相 + 祈祷时间 = 一站式）
4. 更 SEO 友好（每页精准匹配一个搜索意图）

---

## 2. 用户画像

| 用户群 | 搜索行为 | 需求 | 预估占比 |
|---|---|---|---|
| 📸 摄影师 | "golden hour today [city]" | 黄金时段精确到分钟 | 25% |
| 🕌 穆斯林用户 | "prayer times [city]" | 每日 5 次祈祷时间 | 30% |
| 🏕️ 户外运动者 | "sunrise time [city]" | 日出日落规划行程 | 20% |
| 🌾 农业从业者 | "daylight hours [city]" | 日照时长趋势 | 10% |
| 🔍 普通好奇者 | "sunset today" | 随手查 | 15% |

---

## 3. 功能规划

### 3.1 MVP（Phase 1 — Week 1-2）
| 功能 | 优先级 | 说明 |
|---|---|---|
| 🌅 日出日落时间 | P0 | 任意城市今日日出/日落/天文曙暮光 |
| ☀️ 日照时长 | P0 | 当日总日照时间 |
| 📸 黄金时段 | P0 | 早晚黄金时段精确时间 |
| 🌙 月相 | P1 | 当日月相名称 + 发光百分比 |
| 🔗 内链网络 | P0 | 每页链接附近城市和相关日期 |
| 🗺️ 城市搜索 | P0 | 首页搜索框 + 自动补全 |
| 📱 响应式设计 | P0 | 移动端优先 |

### 3.2 Phase 2（Week 3-4）
| 功能 | 优先级 | 说明 |
|---|---|---|
| 🕌 伊斯兰祈祷时间 | P1 | 5 次祈祷时间（支持多法学派） |
| 📊 月度日照图表 | P1 | 可视化全年日照变化趋势 |
| 📅 特定日期查询 | P1 | `/sunrise/new-york/2026-03-24/` |
| 🌑 月升月落时间 | P2 | 月亮升落时间 |

### 3.3 Phase 3（Week 5+）
| 功能 | 优先级 | 说明 |
|---|---|---|
| 🌍 多语言 | P2 | 西班牙语、法语、阿拉伯语等 |
| 📧 邮件订阅 | P3 | 每日日出日落推送 |
| 📲 PWA | P3 | 离线可用 |
| 🔌 API | P3 | 开放 API → 获取外链 |

---

## 4. 技术架构

### 4.1 整体架构

```
┌─────────────────────────────────────────────┐
│           Cloudflare CDN Edge                │
│        (300+ 全球节点，自动缓存)               │
├──────────────┬──────────────────────────────┤
│   SSG 静态页  │     SSR 动态页                │
│  (≤ 20K 文件) │  (Workers + KV Cache)        │
│              │                              │
│ • 首页       │ • 长尾城市日出日落页            │
│ • Top 1000   │ • 特定日期页                  │
│   城市今日页  │ • 祈祷时间页                   │
│ • sitemap    │                              │
│ • 静态资源   │ 流程:                          │
│              │ 1. 请求到 Worker               │
│              │ 2. 查 KV → 命中返回            │
│              │ 3. 未命中 → SunCalc 计算       │
│              │ 4. 写入 KV (TTL=24h) → 返回   │
└──────────────┴──────────────────────────────┘
```

### 4.2 项目结构

```
sunrisetime/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/
│   ├── favicon.svg
│   └── og-image.png
├── src/
│   ├── assets/                     ← 静态资源
│   │   └── styles/
│   │       ├── global.css          ← 全局样式(暗色主题)
│   │       └── variables.css       ← CSS 变量
│   ├── components/
│   │   ├── Header.astro            ← 导航头
│   │   ├── Footer.astro            ← 页脚(隐私政策/关于链接)
│   │   ├── SearchBox.astro         ← 城市搜索自动补全
│   │   ├── SunTimes.astro          ← 日出日落时间卡片
│   │   ├── GoldenHour.astro        ← 黄金时段卡片
│   │   ├── MoonPhase.astro         ← 月相卡片
│   │   ├── PrayerTimes.astro       ← 祈祷时间表
│   │   ├── DaylightChart.astro     ← 日照时长图表
│   │   ├── RelatedCities.astro     ← 附近城市链接(内链)
│   │   ├── DateNav.astro           ← 前一天/后一天导航
│   │   ├── AdUnit.astro            ← AdSense 广告组件
│   │   └── LanguageSwitcher.astro  ← 语言切换(预留)
│   ├── data/
│   │   ├── cities.json             ← GeoNames top 5000 城市
│   │   └── city-groups.json        ← 城市按国家/大洲分组
│   ├── i18n/
│   │   ├── en.json                 ← 英语翻译
│   │   └── utils.ts                ← t() 翻译函数
│   ├── utils/
│   │   ├── suncalc.ts              ← 日出日落/黄金时段计算
│   │   ├── moon.ts                 ← 月相计算
│   │   ├── prayer-times.ts         ← 祈祷时间算法
│   │   ├── seo.ts                  ← meta/canonical/JSON-LD 生成
│   │   ├── sitemap.ts              ← sitemap 分块生成
│   │   └── slug.ts                 ← 城市名 → URL slug 转换
│   ├── layouts/
│   │   └── Base.astro              ← HTML 骨架 + head + 广告
│   └── pages/
│       ├── index.astro             ← 首页 (SSG)
│       ├── sunrise/
│       │   ├── [city].astro        ← 城市今日页 (SSR)
│       │   └── [city]/
│       │       └── [date].astro    ← 特定日期页 (SSR)
│       ├── golden-hour/
│       │   └── [city].astro        ← 黄金时段页 (SSR)
│       ├── prayer-times/
│       │   └── [city].astro        ← 祈祷时间页 (SSR)
│       ├── city/
│       │   └── [city].astro        ← 城市 Hub 页 (SSR)
│       ├── about.astro             ← 关于页 (SSG)
│       ├── privacy.astro           ← 隐私政策 (SSG)
│       ├── sitemap/
│       │   └── [index].xml.ts      ← 分块 sitemap
│       └── robots.txt.ts           ← robots.txt
```

### 4.3 核心算法模块

#### SunCalc 日出日落计算
```typescript
// src/utils/suncalc.ts
// 基于 NOAA Solar Calculator 算法
// 输入: 纬度, 经度, 日期
// 输出: {
//   sunrise, sunset,          // 日出日落
//   solarNoon,                // 正午
//   civilDawn, civilDusk,     // 民用曙暮光
//   nauticalDawn, nauticalDusk, // 航海曙暮光
//   goldenHourStart, goldenHourEnd, // 黄金时段
//   dayLength                 // 日照时长
// }
```

#### 月相计算
```typescript
// src/utils/moon.ts
// 基于 Jean Meeus 算法
// 输入: 日期
// 输出: {
//   phase,          // 月相名称 (New Moon, Waxing Crescent, ...)
//   illumination,   // 发光百分比 (0-100)
//   moonrise,       // 月升时间
//   moonset,        // 月落时间
//   nextFullMoon,   // 下次满月
//   nextNewMoon     // 下次新月
// }
```

#### 祈祷时间计算
```typescript
// src/utils/prayer-times.ts
// 基于 PrayTimes.js 算法 (支持多法学派)
// 输入: 纬度, 经度, 日期, 计算方法
// 输出: {
//   fajr,    // 晨礼
//   sunrise, // 日出
//   dhuhr,   // 晌礼
//   asr,     // 晡礼
//   maghrib, // 昏礼
//   isha     // 宵礼
// }
```

### 4.4 数据模型

#### 城市数据 (cities.json)
```json
{
  "new-york": {
    "name": "New York",
    "country": "US",
    "countryName": "United States",
    "state": "New York",
    "lat": 40.7128,
    "lng": -74.0060,
    "timezone": "America/New_York",
    "population": 8336817,
    "nearby": ["newark", "jersey-city", "brooklyn", "yonkers"]
  }
}
```

---

## 5. 页面设计

### 5.1 首页 (`/`)
- **H1**: "Sunrise & Sunset Times Worldwide"
- 功能: 搜索框(自动补全) + 热门城市网格 + 今日统计
- 目标: 引导用户进入城市页

### 5.2 城市日出日落页 (`/sunrise/new-york/`)
- **H1**: "Sunrise & Sunset Times in New York Today"
- **核心数据**: 日出/日落/日照时长/黄金时段
- **附加数据**: 月相/月升月落
- **内链**: 附近城市 + 历史日期 + 祈祷时间链接
- **Schema**: JSON-LD (Place + FAQPage)
- **广告**: 页面中部 + 底部各一个 AdSense 单元

### 5.3 特定日期页 (`/sunrise/new-york/2026-03-24/`)
- 与城市页相同布局，但显示指定日期数据
- **内链**: 前一天/后一天导航 + 同城市其他日期

### 5.4 黄金时段页 (`/golden-hour/new-york/`)
- 专注摄影师群体
- **H1**: "Golden Hour in New York Today"
- 显示早/晚黄金时段精确时间 + 蓝色时刻

### 5.5 祈祷时间页 (`/prayer-times/london/`)
- 专注穆斯林用户
- **H1**: "Prayer Times in London Today"
- 5 次祈祷时间 + 日出 + 法学派切换

### 5.6 城市 Hub 页 (`/city/new-york/`)
- 汇聚：日出日落 + 黄金时段 + 祈祷时间 + 月相
- 链接到该城市所有子页面

---

## 6. SEO 策略

### 6.1 页面 SEO
| 元素 | 规则 |
|---|---|
| Title | `Sunrise & Sunset Times in {City} Today - SunriseTime` |
| Meta Description | `Today's sunrise in {City} is at {time}. Sunset at {time}. {dayLength} of daylight. Golden hour starts at {time}.` |
| H1 | 每页唯一，精确匹配搜索意图 |
| Canonical | 自动生成，指向标准 URL |
| Hreflang | 多语言预留 |

### 6.2 结构化数据
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Sunrise & Sunset Times in New York Today",
  "description": "...",
  "mainEntity": {
    "@type": "Place",
    "name": "New York",
    "geo": { "@type": "GeoCoordinates", "latitude": 40.71, "longitude": -74.01 }
  }
}
```

### 6.3 内链策略
每页最少 15 个内链：
- 4-6 个附近城市日出日落页
- 3 个同城市不同功能页（黄金时段/祈祷/月相）
- 3 个历史日期（昨天/一周前/去年同日）
- 2-3 个同国家其他大城市
- 1 个首页链接

### 6.4 Sitemap 策略
- 按国家分块：`/sitemap/us-cities.xml`, `/sitemap/uk-cities.xml`
- 每个 sitemap ≤ 50,000 URL
- `sitemap-index.xml` 汇总

---

## 7. 广告策略（AdSense）

### 7.1 广告位布局
| 位置 | 类型 | 说明 |
|---|---|---|
| 数据区下方 | 横幅广告 | 用户看完核心数据后展示 |
| 内链区上方 | 原生广告 | 与内容融合 |
| 移动端底部 | 锚定广告 | 不干扰阅读 |

### 7.2 AdSense 申请要求
- [ ] ≥ 30 个有实质内容的页面
- [ ] 隐私政策页面
- [ ] 关于我们页面
- [ ] 联系方式信息
- [ ] 无违规内容

---

## 8. 性能目标

| 指标 | 目标值 |
|---|---|
| Lighthouse Performance | ≥ 95 |
| Lighthouse SEO | ≥ 98 |
| TTFB | < 50ms (Cloudflare Edge) |
| FCP | < 1.0s |
| LCP | < 1.5s |
| CLS | < 0.05 |
| 页面大小 | < 50KB (HTML + CSS) |

---

## 9. 里程碑

### M1: 项目脚手架（Day 1-2）
- [ ] 初始化 Astro 项目
- [ ] 配置 Cloudflare adapter
- [ ] 配置 i18n 预留
- [ ] 准备城市数据（GeoNames top 1000）
- [ ] 实现基础布局组件

### M2: 核心算法（Day 3-4）
- [ ] 实现 SunCalc 日出日落计算
-  [ ] 实现黄金时段计算
- [ ] 实现月相计算
- [ ] 单元测试（对比 timeanddate.com 数据验证精度）

### M3: 页面模板（Day 5-7）
- [ ] 首页模板 + 搜索
- [ ] 城市日出日落页模板
- [ ] 黄金时段页模板
- [ ] 城市 Hub 页模板
- [ ] 响应式适配

### M4: SEO + 部署（Day 8-10）
- [ ] meta/canonical/schema 自动生成
- [ ] sitemap 分块生成
- [ ] robots.txt
- [ ] 内链网络
- [ ] 部署 Cloudflare Pages
- [ ] 提交 Google Search Console

### M5: 优化（Day 11-14）
- [ ] Lighthouse 优化至目标
- [ ] AdSense 广告位集成（或等流量后申请）
- [ ] 数据精度验证
- [ ] 扩展至 5000 城市

---

## 10. 成功指标

| 指标 | 30 天 | 90 天 | 180 天 |
|---|---|---|---|
| 索引页面数 | 1,000 | 10,000 | 50,000+ |
| 日均自然流量 | 50 | 500 | 5,000 |
| AdSense 月收入 | $0 | $10-50 | $100-500 |
| Google 排名页面 | 100 | 1,000 | 5,000+ |
