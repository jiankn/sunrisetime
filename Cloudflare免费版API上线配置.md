# Cloudflare 免费版 API 上线配置

最后更新：2026-03-29

## 目标

在 `Cloudflare Pages Free` 上公开 `SunriseTime API` 时，优先保护主站可用性，避免 API 流量先吃完 Functions 免费额度。

## 当前建议策略

- API 文档公开
- API 作为 `Public Beta`
- API JSON `noindex`
- 浏览器侧 CORS 仅允许第一方域名
- 通过 Cloudflare edge rate limiting 控制匿名访问

## 为什么不能只靠应用代码限流

当前项目没有已经接好的 KV / Durable Object / D1 之类的共享状态存储。

在这种前提下：

- 用内存 Map 做“每日每 IP 100 次”
- 或在单实例里做计数

都不可靠。

因为：

- Pages Functions 是分布式运行
- 不同 colo / 不同实例之间不共享内存
- 重启后计数会丢

所以，真实的 `100 次 / IP / 天` 应该放在 Cloudflare edge 做，而不是在应用层伪实现。

## 建议的 Cloudflare 规则

### 主规则

用途：

- 控制匿名 API 总量

建议：

- 路径：`/api/v1/*`
- 维度：`IP`
- 阈值：`100 requests`
- 周期：`1 day`
- 动作：`Block` 或 `Managed Challenge`

更推荐：

- 初期用 `Managed Challenge`
- 稳定后再决定是否直接 `Block`

### 可选的短周期保护

如果你的套餐允许更多规则，再加一条：

- 路径：`/api/v1/*`
- 维度：`IP`
- 阈值：`10 requests`
- 周期：`1 minute`
- 动作：`Managed Challenge`

用途：

- 防止一分钟内的突发刷请求

如果免费计划下只能保留最关键的一条规则，优先保留 `100 / day` 这条。

## Cloudflare 后台配置要点

建议位置：

- `Security`
- `WAF`
- `Rate limiting rules`

匹配逻辑建议：

- Host equals `sunrisetime.co`
- URI path starts with `/api/v1/`

如果你同时使用 `www.sunrisetime.co`，也要同步覆盖。

## 上线前检查清单

- API JSON 已带 `X-Robots-Tag: noindex`
- `robots.txt` 已 `Disallow: /api/`
- API 文档页已明确写 `Public Beta`
- API 文档页已写清楚匿名访问会受限
- CORS 已收紧到第一方域名
- Cloudflare edge 规则已开启
- 部署后手动测试：
  - `/api/v1/times`
  - `/api/v1/cities`
  - `/api/v1/openapi.json`

## 文档对外话术建议

英文建议：

- `Public Beta`
- `Anonymous access is subject to edge rate limiting`
- `Browser-side access is currently limited to first-party origins`

中文建议：

- `公开 beta`
- `匿名访问会受 Cloudflare 边缘限流保护`
- `浏览器侧访问当前仅对第一方域名开放`

## 后续升级路径

当你准备把 API 从 beta 提升为真正产品时，再做这些：

- API key
- usage logging
- key 级别限额
- Free / Builder / Pro 配额分层
- 商业使用白名单

到那时，`100 / IP / 天` 就不再是长期主策略，而只是匿名层保护。
