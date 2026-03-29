# API 定价模型

最后更新：2026-03-29

## 一句话结论

`SunriseTime API` 不应该按“基础查询次数”做低价竞争，而应该按 `场景价值 + 降本增效 + 商业使用权限` 定价。

更具体地说：

- `Free` 用来拿增长和需求信号
- `Builder / Pro` 用来覆盖独立开发者和小团队
- `Business / Enterprise` 才是主要利润来源

如果长期只卖 `单城市 + 单天 + 基础时间数据`，即使有收入，也大概率是小体量业务。

## 第一性原理

### 定价不是从成本出发，而是从替代成本出发

客户不会问你：

- “你算这个时间花了多少钱？”

客户会问：

- “我自己做要花多少钱？”
- “我不用你，换成别家或开源方案，损失多大？”

所以，真正能定价的不是“返回一段 JSON”，而是：

- 免去自己维护算法
- 免去城市 slug 和地理匹配
- 免去月历 / 全年历生成
- 免去前端 widget 开发
- 免去商用风险和支持成本

### 你的成本结构

当前部署在 Cloudflare Pages / Workers 体系上，这类 API 的边际成本很低。

根据 Cloudflare 官方当前价格：

- `Workers Paid` 基础费：`$5 / month`
- 含 `10M requests / month`
- 超出部分：`$0.30 / million requests`

这意味着：

- 早期真正的瓶颈不是算力成本
- 真正的瓶颈是：
  - 客户获取
  - 产品差异化
  - 免费层滥用

所以你不能按“低成本 -> 低价格”来思考，否则会掉进 commodity 陷阱。

## 产品分层

我建议把产品拆成四层，而不是只卖一个 API。

### Layer 1：Free Beta

目标：

- 试用
- 增长
- 外链
- 收集需求

包含：

- `/api/v1/cities`
- `/api/v1/times`
- 单城市
- 单天
- 公共缓存
- 基础文档

### Layer 2：Builder

目标：

- 独立开发者
- 小工具
- 原型项目

包含：

- API key
- 更高限额
- 商业使用许可
- usage dashboard
- 优先支持 email

### Layer 3：Pro

目标：

- 小型 SaaS
- 内容网站
- 插件作者

包含：

- Builder 全部能力
- 批量查询
- 月历接口
- 更高配额
- 更快支持

### Layer 4：Business / Enterprise

目标：

- 站点级嵌入
- 白标
- 合作伙伴
- B2B

包含：

- 白标 widget
- 自定义配额
- 年度 / 区域数据包
- SLA
- 合同 / 商业支持

## 套餐建议

### 1. Free

建议价格：

- `$0`

建议限制：

- 无需 key 或可选 key
- 每日 `200 - 500` 次请求 / IP 或 / key
- 仅开放：
  - `/api/v1/cities`
  - `/api/v1/times`
- 不开放：
  - bulk
  - monthly calendar
  - historical
  - attribution-free commercial embed

建议定位：

- Public Beta
- 用于测试、原型、小规模网站

必须写清楚：

- 可能限流
- 可能调整额度
- 无 SLA
- 不保证长期无限免费

### 2. Builder

建议价格：

- `$19 / month`

建议权益：

- `100,000 - 300,000 requests / month`
- API key
- 商业使用许可
- 稳定版本承诺
- 基础 usage dashboard
- 邮件支持

适合：

- 独立开发者
- 小插件
- 小工具网站

为什么是 `$19`

- 这是通用 API 市场常见心理锚点
- 足够低，便于第一次付费
- 足够高，不会把自己锁死在低价陷阱里

### 3. Pro

建议价格：

- `$49 / month`

建议权益：

- `1M requests / month`
- 包含 Builder 全部能力
- 开放 bulk endpoint
- 开放 monthly calendar endpoint
- 更高速率限制
- 更明确的商业许可

适合：

- 小团队
- niche SaaS
- 有稳定流量的网站

### 4. Business

建议价格：

- `$149 / month`

建议权益：

- `5M requests / month`
- 更高并发
- widget 嵌入权限
- attribution 可协商
- 优先支持
- 商业咨询入口

适合：

- prayer / travel / photography 站点
- 多站点复用
- 中小型 B2B 场景

### 5. Enterprise

建议价格：

- `Custom / Contact Sales`

建议权益：

- 自定义配额
- 自定义数据包
- SLA
- 白标
- 区域批量交付
- 专属支持

适合：

- 商业合作
- 机构客户
- 数据再分发

## 不建议的定价策略

### 不建议 1：过低起步

例如：

- `$5 / month`
- `$9 / month`

风险：

- 后面很难涨价
- 付费用户质量不高
- 更容易吸引低价值、高支持成本用户

### 不建议 2：按“无限基础调用”卖

风险：

- 最容易被滥用
- 免费替代太多
- 难证明价值

### 不建议 3：一开始就做太多档

早期不要上 6-8 个套餐。

更合理的是：

- Free
- Builder
- Pro
- Business
- Enterprise

## 建议的 endpoint 分层

### 免费开放

- `GET /api/v1/cities`
- `GET /api/v1/times`

### 付费开放

- `GET /api/v1/calendar?city=<slug>&month=YYYY-MM`
- `POST /api/v1/bulk/times`
- `GET /api/v1/yearly?city=<slug>&year=YYYY`
- `GET /api/v1/ramadan?city=<slug>&year=YYYY`

### 高价开放

- widget script
- 白标
- 数据导出
- 大批量区域包

## 云成本模型

### Cloudflare 成本的现实意义

在早期请求量下，Cloudflare 的基础设施成本非常低。

一个简化估算：

- `10M requests / month` 内，大部分都落在 `Workers Paid $5` 基础费内
- 即使到 `20M requests / month`
  - 超出的 `10M`
  - 额外成本也只是 `约 $3`

所以：

- 不是“多一个 API 用户你就亏钱”
- 而是“多一个低价用户会不会占用支持和产品资源”

### 成本真正会变高的地方

- 不是请求数
- 而是支持成本
- 白标交付成本
- 定制开发成本
- 客户沟通成本

因此定价时要覆盖的是：

- 基础设施成本
- 滥用风险
- 支持成本
- 机会成本

## 转化模型

下面给一个现实而保守的转化模型，不是乐观 PPT。

### 场景 A：轻度成功

假设：

- 月活开发者 / API 使用者：`500`
- Free 用户：`480`
- Builder：`15`
- Pro：`4`
- Business：`1`

对应收入：

- Builder：`15 x $19 = $285`
- Pro：`4 x $49 = $196`
- Business：`1 x $149 = $149`

总计：

- `MRR = $630`

这是一个很现实的早期状态。

### 场景 B：产品开始成立

假设：

- 月活开发者 / API 使用者：`2,000`
- Builder：`50`
- Pro：`15`
- Business：`5`

对应收入：

- Builder：`50 x $19 = $950`
- Pro：`15 x $49 = $735`
- Business：`5 x $149 = $745`

总计：

- `MRR = $2,430`

这已经是一个健康的小产品了。

### 场景 C：垂直化跑通

假设：

- 月活开发者 / API 使用者：`5,000`
- Builder：`120`
- Pro：`35`
- Business：`12`
- Enterprise：`2 x $500`

对应收入：

- Builder：`120 x $19 = $2,280`
- Pro：`35 x $49 = $1,715`
- Business：`12 x $149 = $1,788`
- Enterprise：`$1,000`

总计：

- `MRR = $6,783`

这是我认为“做得不错”的阶段。

### 场景 D：真正做成一条产品线

假设：

- Builder：`250`
- Pro：`80`
- Business：`25`
- Enterprise：`5 x $1,000`

对应收入：

- Builder：`$4,750`
- Pro：`$3,920`
- Business：`$3,725`
- Enterprise：`$5,000`

总计：

- `MRR = $17,395`

这个级别已经不是“卖基础 API”，而是“卖垂直工作流和白标能力”了。

## 收入天花板判断

### 如果只卖当前基础 API

收入区间更可能是：

- `0 - 500 MRR`
- `500 - 3,000 MRR`

这是最现实的预期。

### 如果补齐月历、批量、widget、白标

收入区间可以来到：

- `2,000 - 10,000 MRR`

### 如果能拿到稳定 B2B 客户

收入上限可以进一步上探：

- `10,000 - 30,000+ MRR`

但这已经不是现在这个基础接口层的自然延伸，而是新产品阶段。

## 定价与 Cloudflare 免费计划的关系

你现在跑在 `Cloudflare Pages Free` 上，这意味着在没有收费之前，免费 API 必须先受控。

所以免费层建议一定要包含这些限制：

- rate limiting
- 文档明确 `Public Beta`
- `X-Robots-Tag: noindex` 用在 API JSON
- 必要时收紧 CORS
- 优先保护主站，不优先保护 API

如果不这样做，免费层还没转化，先把免费计划打爆了，商业化会直接失真。

## 什么时候该涨价

满足以下任意两条，就该涨价或收紧免费层：

- 免费层请求明显接近或超过预算
- 开始出现商业使用咨询
- 支持成本明显上升
- 免费用户反复要求批量 / 月历 / 更高配额
- Pro 用户的留存显著高于 Builder

### 涨价方式

不要直接对老用户暴力涨。

建议：

- 新用户按新价格
- 老用户保留 3-6 个月
- 免费层同步收紧

## 最佳执行顺序

### 第一步

先上线：

- Free
- Builder
- Pro
- `Contact for Business`

### 第二步

补：

- monthly calendar endpoint
- bulk endpoint
- usage dashboard
- API keys

### 第三步

再上：

- widget
- white-label
- Business / Enterprise 页面

## 最终推荐定价

如果今天就要我拍板，我会这么定：

| 套餐 | 价格 | 核心定位 |
|---|---:|---|
| Free | `$0` | 测试、原型、轻量接入 |
| Builder | `$19/mo` | 独立开发者、小工具 |
| Pro | `$49/mo` | 小团队、小型 SaaS |
| Business | `$149/mo` | 商业集成、站点级使用 |
| Enterprise | `Custom` | 白标、SLA、批量合作 |

## 最终判断

这个 API 的定价，不该围绕“我这次请求成本多少钱”来定，而应该围绕：

- 节省了用户多少开发和维护时间
- 是否允许商业使用
- 是否解决了批量、月历、widget、白标这些完整需求

一句话总结：

`基础 API` 的合理价格是低中档，`完整工作流产品` 才有机会做出真正可观的收入。

## 参考

- Cloudflare Workers pricing: https://developers.cloudflare.com/workers/platform/pricing/
- Cloudflare Pages Functions pricing: https://developers.cloudflare.com/pages/functions/pricing/
- WeatherAPI pricing: https://www.weatherapi.com/pricing.aspx
- IPGeolocation pricing: https://ipgeolocation.io/pricing.html
- OpenWeather pricing: https://openweathermap.org/price
