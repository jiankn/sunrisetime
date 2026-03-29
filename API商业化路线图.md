# API 商业化路线图

最后更新：2026-03-29

## 一句话判断

`SunriseTime API` 适合先做成 `免费增长入口 + 商业信号探针 + 轻度开发者产品`，不适合现在就把 `单城市时间查询` 当成核心收费业务。

更直接的结论：

- `短期主目标` 不是 API 直接赚钱，而是拿到真实开发者需求、外链、品牌搜索和二次分发机会
- `中期主目标` 是把 API 从“数据查询”升级成“工作流产品”
- `长期收费点` 不在 `GET /api/v1/times` 本身，而在 `批量 / 历史 / 月历 / 白标 / SLA / 高配额`

## 第一性原理

### 1. 什么东西稀缺，什么东西不稀缺

不稀缺的部分：

- 给定坐标，返回 sunrise / sunset / moon phase
- 给定城市，返回 prayer times
- 基础算法和基础数据格式

原因：

- 太阳和月亮的基础计算可由公开方法或开源库完成
- prayer times 领域已经存在长期免费的公开 API

稀缺的部分：

- 稳定的开发者体验
- 不用自己做城市匹配和 slug 管理
- 商业可用的配额、速率限制、版本承诺、支持
- 能直接嵌到网站、App、widget、日历、CMS 的完整方案

所以真正能卖钱的不是“结果”，而是“省时间、降风险、少维护”。

### 2. 用户为什么会付费

用户不会因为“今天伦敦几点日出”付费。

用户会因为这些原因付费：

- 不想自己维护算法和城市库
- 不想承担 API 变更和精度争议
- 需要高配额、批量请求、历史/未来数据
- 需要白标组件和更快上线
- 需要商业许可、SLA、联系人和发票

### 3. 你的真实竞争对手是谁

不是普通内容站，而是三类产品：

- 免费/开源方案
  例如 SunCalc、公开 sunrise 计算资源、免费 prayer APIs
- 通用数据 API 平台
  例如带 astronomy/timezone 能力的平台
- 垂直工具
  例如 prayer calendar、摄影 planning 工具、旅行天气/天光工具

因此，`SunriseTime` 如果要商业化，必须避开“最容易被替代的那层”。

## 当前商业判断

### 结论评分

- `直接卖基础 API`: `3/10`
- `卖围绕 API 的工作流产品`: `7/10`
- `免费 API 对 SEO / 品牌的价值`: `7/10`
- `免费 API 对 AdSense 的直接价值`: `2/10`

### 为什么不是更高

因为基础 timing data 的进入门槛并不高，替代品很多。

### 为什么也不是更低

因为你的站点天然有几个可以转成产品的方向：

- prayer times
- sunrise / sunset
- golden hour
- moon phase
- city pages
- multilingual content

这说明你不是孤立的 API，而是可以把 API、内容页、guide、widget、directory 串成一个漏斗。

## 商业化路径

### Phase 0：免费 beta，先验证需求

目标：

- 获得真实接入者
- 观察最常见调用模式
- 找到真正愿意付费的使用场景

建议做法：

- 继续保持公开可用
- 不要求 API key
- 明确标注 `Public Beta`
- 严格限流，避免被薅
- 文档页强调“适合原型、实验、轻量集成”

这一阶段不要急着收费。

成功标准：

- 有外部站点真实调用
- 有开发者邮件咨询
- 有用户明确提出 `bulk`、`calendar`、`higher limit`、`commercial use`

### Phase 1：免费层 + 付费候补层

目标：

- 保留增长性
- 开始识别高意图客户

免费层建议：

- `GET /api/v1/cities`
- `GET /api/v1/times`
- 单城市
- 单日
- 公共缓存
- 中低限流

付费候补信号：

- 申请更高频率
- 批量请求
- 历史数据
- 月历/全年数据
- 无署名嵌入
- 商业再分发

这个阶段可以不立即开收费，但要开始：

- 接入 API key
- 记录 usage
- 记录 top referers
- 提供 `Contact for commercial use`

### Phase 2：真正开始收费

先卖三类东西，不卖“无限基础查询”。

#### 1. Pro API

适合：

- 独立开发者
- 小网站
- 小工具作者

卖点：

- 更高配额
- API key
- 使用统计
- 稳定版本承诺
- 更高缓存/优先级

#### 2. Data Packs / Calendar API

适合：

- 内容站
- 清真寺 / prayer 网站
- 摄影工具站
- 旅行计划工具

卖点：

- 月历
- 全年日照表
- Ramadan / prayer calendar
- 批量城市返回
- CSV / JSON 下载

#### 3. White-label Widgets

适合：

- 低技术客户
- 需要快速上线的站长

卖点：

- 一段 script 直接嵌入
- 自定义品牌
- 自定义语言
- 自定义 prayer method
- 免自己开发

这是我最看好的收费方向之一，因为它最接近用户愿意直接掏钱的“完成品”。

## 定价建议

### 不建议现在做的定价

不要一上来这样卖：

- `$9/月 无限 times API`
- `$19/月 更多请求`

原因：

- 容易被拿去和免费方案直接对比
- 价格锚点太低，后面提价困难
- 很难解释为什么值得付费

### 建议的第一版定价

#### Free

- `$0`
- 无 key 或轻量 key
- 适合测试和小规模使用
- 单城市、单日
- 低配额
- 必须保留缓存
- 文档公开

#### Builder

- `$19/月`
- 适合个人项目、原型、插件
- 更高请求量
- API key
- 基础 usage dashboard
- 商业使用许可

#### Pro

- `$49/月`
- 适合小团队和稳定流量站点
- 更高请求量
- 批量 endpoint
- 月历 endpoint
- 更高限流
- 邮件支持

#### Business

- `$149/月` 起
- 适合垂直站、SaaS、白标集成
- 白标 widget
- 自定义配额
- 专属支持
- SLA / 合同

#### Enterprise

- `Contact Sales`
- 区域包
- 高并发
- 数据导出
- 自定义部署 / edge strategy

### 为什么这个价格带是合理的

参考市场，通用 API 产品常见定价起点在 `$19/月` 左右，且免费层通常只适合测试和小项目。对你来说，`Builder = 19` 是合理锚点；更低会让商业化很难成立。

## 最值得卖的能力排序

按商业价值排序，我的建议是：

1. `White-label widgets`
2. `Calendar / bulk / historical APIs`
3. `Higher-rate commercial API`
4. `Priority support / SLA`
5. `Raw single-city single-day API`

也就是说，最不该单独当主产品卖的，恰恰是你现在最容易做出来的那一层。

## 免费 API 和 AdSense 的关系

### 直接关系

直接帮助很弱。

原因：

- API JSON 本身没有广告展示价值
- 开发者流量的广告点击率通常不高
- 文档页如果太薄，广告价值反而可能偏低

### 间接关系

有帮助，但前提是你把 API 当成“内容和产品资产”来做。

可带来的间接价值：

- 增加外链
- 增加品牌搜索
- 提升站点可信度
- 增加 guides / docs / methodology 页面访问
- 带来二次分发和引用

### 最关键的原则

不要把 API 文档页做成“薄内容 + 广告页”。

对 Google AdSense 和 Google Search 来说，低价值内容、无足够 publisher-content 的页面，以及只是复制/嵌入内容而没有额外价值的页面，都不是理想的广告承载面。

正确做法：

- 文档足够完整
- 有参数表、错误码、示例代码、方法说明
- 有清晰 use cases
- 有独立价值，不是只为了广告

## 我对 AdSense 的专家判断

### 有帮助的前提

只有在以下条件成立时，免费 API 才会正向帮助 AdSense：

- 文档页本身足够有用
- 文档页带来外链和品牌搜索
- API 反过来推动 guides / methodology / city pages 的权威感
- API 流量不是孤立的，而能流回站内高价值页面

### 没帮助甚至有风险的情况

- 文档页很薄
- 只有 endpoint，没有解释
- 广告比正文更显眼
- 页面只是“工具入口”，没有明显内容价值

### 结论

`免费 API` 不应该被当成 `AdSense 收益工具`，而应该被当成：

- `SEO 资产`
- `开发者漏斗`
- `未来商业化的前置基础设施`

## 最优产品组合

我建议你把整个产品线拆成三层：

### Layer 1：内容层

- 城市页
- guides
- methodology
- HTML sitemap

作用：

- SEO
- AdSense
- 品牌词增长

### Layer 2：开发者层

- `/api/v1/cities`
- `/api/v1/times`
- OpenAPI
- Docs

作用：

- 外链
- 集成
- 开发者需求验证

### Layer 3：商业层

- 批量和月历接口
- 白标 widgets
- 商业许可
- SLA
- 付费支持

作用：

- 直接收入

这三层互相支撑。真正健康的模式不是“API 单挑变现”，而是“内容获客 + API 建信任 + 商业层收钱”。

## 90 天执行计划

### 0-30 天

- 继续保持 API 免费 beta
- 上 API key 体系
- 上 usage logging
- 上 rate limiting
- 文档补 changelog
- 文档补 attribution / commercial use 说明
- 加一个 `Contact for commercial use`

目标：

- 先收集使用信号，不急收费

### 31-60 天

- 新增 `monthly calendar` endpoint
- 新增 `bulk city` endpoint
- 设计 widget demo 页
- 做 2-3 个真实嵌入场景模板
  - prayer widget
  - sunrise widget
  - golden hour widget

目标：

- 测试“谁会为完整方案付费”

### 61-90 天

- 启动 Builder / Pro 价格页
- 免费层改成明确额度
- 商业客户走邮件或表单
- 给高频使用者发升级触达

目标：

- 验证第一个付费用户，而不是追求大规模营收

## 必须监控的指标

### API 指标

- 每日请求量
- 独立调用域名数
- 成功率
- 错误率
- 热门城市
- 高峰时段
- top referrers

### 商业信号

- 请求更高限额的人数
- 商业使用咨询数
- 请求 bulk / calendar / widget 的人数
- 文档页到联系页点击率

### 内容 / AdSense 协同指标

- `/guides/api/` 的自然流量
- 文档页外链域名数
- API 文档页到 guides / methodology / city pages 的回流率
- 文档页 RPM / CTR / engagement

## 做与不做的边界

### 该做

- 免费 beta
- 强文档
- 强 use case
- 明确商业入口
- 先卖更完整的产品，而不是卖最基础的数据

### 不该做

- 立即押注 API 直接变成主要收入来源
- 免费无限量
- 文档页堆广告
- 没有 rate limit 就开放
- 没有 usage 数据就拍脑袋定价

## 放弃条件

如果连续 3-6 个月出现以下情况，应降低 API 商业化优先级：

- 基本没有外部真实调用
- 没有人问商业使用
- 文档页没有外链增长
- API 维护成本高于带来的品牌和流量收益

那就说明它更适合继续做站内能力，而不是独立产品线。

## 最终建议

当前最优策略不是：

- “把 API 做出来，然后马上收费”

而是：

- “把 API 做成一个真正可用的开发者入口”
- “用免费层换需求信号、外链、品牌和工作流发现”
- “等 bulk / calendar / widget 跑通后，再对商业层收费”

一句话总结：

`SunriseTime API` 的商业前景，取决于你能不能把“原始时间数据”升级成“低维护、高可复用、可直接集成的垂直解决方案”。如果只是基础查询，收费前景一般；如果做到 widget、calendar、bulk、SLA，前景会明显改善。

## 参考

- Google Publisher Policies: https://support.google.com/adsense/answer/10502938
- Google helpful, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- IPGeolocation pricing: https://ipgeolocation.io/pricing.html
- AlAdhan Prayer Times API: https://aladhan.com/prayer-times-api
- AlAdhan API clients: https://aladhan.com/clients-api
