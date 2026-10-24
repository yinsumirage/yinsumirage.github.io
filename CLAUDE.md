# CLAUDE.md

Wentao Guo 的个人学术主页，Jekyll 站点，托管在 GitHub Pages，域名 **wentaoguo.net**。
内容怎么改（卡片图、博客、双语文章）看 `README.md`；这份文档管的是**基础设施和不能踩的坑**。

这个仓库是公开的，本文件也会被别人看到（只是不会发布到网站上，见 `_config.yml` 的 `exclude`）。
**不要往这里写任何账号、密码、邮箱验证码、付款或地址信息。**

## 架构

| 环节 | 现状 |
|---|---|
| 源码 | `github.com/yinsumirage/yinsumirage.github.io`，`main` 分支根目录 |
| 构建 | GitHub Pages 自带的 Jekyll 构建（legacy，非 Actions），推送到 `main` 后约 1 分钟上线 |
| 域名 | `wentaoguo.net`，2026-10-24 在 **Cloudflare Registrar** 注册，到期 2027-10-24，自动续费 |
| DNS | Cloudflare（ns: `ara` / `zac.ns.cloudflare.com`） |
| HTTPS | GitHub 自动签发并续期 Let's Encrypt 证书，已开 Enforce HTTPS |
| 旧地址 | `yinsumirage.github.io/*` 自动 301 到 `wentaoguo.net/*`，旧链接不会失效 |
| 搜索 | Google Search Console 已添加**网域**资源 `wentaoguo.net`，已提交 `https://wentaoguo.net/sitemap.xml`（`jekyll-sitemap` 自动生成） |

### Cloudflare DNS 记录（全部 DNS only，灰色云朵）

| Type | Name | Content | 作用 |
|---|---|---|---|
| A | `@` | `185.199.108.153` | GitHub Pages |
| A | `@` | `185.199.109.153` | GitHub Pages |
| A | `@` | `185.199.110.153` | GitHub Pages |
| A | `@` | `185.199.111.153` | GitHub Pages |
| CNAME | `www` | `yinsumirage.github.io` | `www` 跳到主域名 |
| TXT | `_github-pages-challenge-yinsumirage` | （GitHub 给的验证码） | GitHub 域名验证，防域名接管 |
| TXT | `@` | （Google 给的验证码） | Search Console 验证 |

## 不要动的东西

- **不要打开 Cloudflare 的代理（橙色云朵）。** GitHub 会因此签发不了 / 续不了 HTTPS 证书。
- **不要删两条 TXT 验证记录。** GitHub 和 Google 都会定期复查，删了验证就失效。
- **不要删或改仓库根目录的 `CNAME` 文件**，也不要改 `_config.yml` 的 `url`。域名绑定靠它们。
- **页脚的 hits.sh 访客计数仍以 `yinsumirage.github.io` 为 key**（`_includes/footer/custom.html`），
  这是故意的：改成新域名会把计数清零。
- 不要在 Cloudflare 里开任何付费服务（Pro 套餐、Workers 付费版等）。正常账单只有域名注册费，约 12 USD/年。

## 常见任务

**新论文项目页。** 两种方式，都会落在 `wentaoguo.net/<名字>/`，权重集中在主站：

1. 项目有自己的仓库且在 **yinsumirage 个人账号**下：那个仓库 Settings → Pages 开启即可，
   自动出现在 `wentaoguo.net/<仓库名>/`，不用碰 DNS。仓库名用小写短名（网址区分大小写），
   **不要叫 `blog` / `assets` / `images` 等与主站路径重名的名字**，会把主站页面挡掉。
2. 只是一个展示页：直接放进本仓库的子文件夹（如 `robolineage/index.html`）。

**组织账号**（如 `github.com/robolineage`）下的仓库不会自动挂到域名下。要么用方式 2，要么用子域名：
Cloudflare 加 CNAME `<sub>` → `<org>.github.io`（DNS only），再在那个仓库的 Pages 设置里填 `<sub>.wentaoguo.net`。

**排查网站打不开。** 依次查：

```bash
gh api repos/yinsumirage/yinsumirage.github.io/pages
```

看 `status`、`cname`、`https_certificate.state`、`protected_domain_state`（应为 `verified`）；
再用 `curl -s "https://cloudflare-dns.com/dns-query?name=wentaoguo.net&type=A" -H 'accept: application/dns-json'`
确认 A 记录还是上面四个 GitHub IP（如果解析出的是 Cloudflare 的 IP，说明有人开了代理）。
最后用 Verisign RDAP 看域名状态：

```bash
curl -s https://rdap.verisign.com/net/v1/domain/wentaoguo.net
```

状态里出现 `hold` 说明域名被暂停（续费失败或注册人邮箱未验证），需要 Wentao 登录 Cloudflare 处理。

**每年 10 月续费。** 自动续费，Wentao 只需确认扣款成功。账单地址已改为香港（不收税）；
第一年按日本地址收了 10% 消费税。

## 账号（只记归属，不记凭据）

- Cloudflare：Wentao 用 Google 账号登录（无单独密码），安全性取决于其 Google 账号的两步验证。
- GitHub：`yinsumirage`。
- 涉及登录、付款、改账单的操作一律由 Wentao 本人在浏览器里完成；AI 只给步骤、查状态、改仓库。

## 本地构建与上线前检查

- 推送前如果改了 JS：**行内 `<script>` 只用 `/* */` 注释**。生产构建（`compress_html`）会把页面压成一行，
  `//` 注释会吞掉后面所有代码，曾导致线上按钮全部失效。用
  `JEKYLL_ENV=production bundle exec jekyll build` 构建后再检查，`jekyll serve` 不压缩，测不出来。
- 本机 Ruby 4 + Jekyll 3.9：构建需预加载 `RUBYOPT="-r$(pwd)/_plugins/ruby4_compat.rb"`（该文件不进仓库）。
- Windows 上停止后台 `jekyll serve` 后 ruby.exe 常常还活着，会继续往 `_site/` 写，重启前按 PID 杀干净。

## 改内容时的偏好

- 称呼写 "a Ph.D. student"，不写 first-year / incoming。
- Wentao 是后位作者的论文只平实写录用，不写 Congratulations。
- 紫色的 venue / award 标签和作者列表里加粗的名字是有意的强调，不要改灰；不要加放大镜之类的提示图标。
- 手机端页面已经偏长，新元素不能让手机页面整体变长。
- 改动保持简单，大改先提方案再动手。

## 相关仓库

CV / 简历源码在本机 `E:\Desktop\CV`（独立仓库，有自己的 CLAUDE.md）。主页上的
`assets/cv/WentaoGuo_CV.pdf` 是从那里 `bash build.sh` 生成的 `build/cv.pdf` 复制过来的。
