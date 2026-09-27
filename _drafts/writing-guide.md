---
title: "How to Write a Post (draft template)"
description: "A formatting reference for this blog: front matter, images, code, math, and tables."
tags: [meta, guide]
# last_modified_at: 2026-10-01
---

这是一篇草稿，放在 `_drafts/` 里，线上不会发布。本地用 `--drafts` 预览时才能看到。
要发布一篇文章，在 `_posts/` 下新建 `YYYY-MM-DD-slug.md`，参考下面的写法。

## Front matter

每篇文章开头是一段 YAML：

```yaml
---
title: "文章标题"
description: "一句话摘要，会显示在 Blog 列表里（不写就用正文第一段）"
tags: [robotics, data]
---
```

文件名里的日期就是发布日期，`slug` 会变成网址：`/blog/2026/slug/`。slug 要全站唯一，同一年里同名的两篇会互相覆盖。

## 中英双语

英文版放在 `_posts/`，中文版放在 `_posts/zh/`，**文件名保持一致**：

```text
_posts/2026-10-01-my-post.md      →  /blog/2026/my-post/
_posts/zh/2026-10-01-my-post.md   →  /blog/2026/my-post/zh/
```

两篇会自动配对：文章页顶部出现 English / 中文 切换，Blog 列表和首页只显示英文版，并附一个"中文"链接。只写了中文版的文章（只在 `_posts/zh/` 里）也会单独列出，带"中文"标记。标签两边都写英文，这样标签筛选能把两个版本归到一起。图片两个版本共用 `assets/blog/<slug>/`。

## 图片

图片放在 `assets/blog/<slug>/` 下面：

```markdown
![alt 文本](/assets/blog/my-post/figure1.png)
```

需要图注的话，直接写 HTML：

```html
<figure>
  <img src="/assets/blog/my-post/figure1.png" alt="...">
  <figcaption>Figure 1. 图注写在这里。</figcaption>
</figure>
```

图片默认撑满正文宽度。偏高或分辨率低的图可以写成 `<figure class="medium">`（最宽 600px）或 `<figure class="narrow">`（最宽 460px）。

## 代码

Inline code looks like `policy.act(obs)`, and fenced blocks get syntax highlighting:

```python
def collect(policy, env, steps):
    obs = env.reset()
    for _ in range(steps):
        action = policy.act(obs)
        obs, reward, done, info = env.step(action)
        if done:
            obs = env.reset()
```

## 公式

MathJax 已经全站开启。注意 kramdown 里行内公式也用双美元符号：$$\pi_\theta(a \mid s)$$（单个 `$` 不生效）。块公式单独成段：

$$
\mathcal{L}(\theta) = -\mathbb{E}_{(s,a)\sim\mathcal{D}} \left[ \log \pi_\theta(a \mid s) \right]
$$

## 引用和表格

> 引用块适合放论文里的一句话，或者别人说过的话。

| Method | Success | Episodes |
| ------ | ------: | -------: |
| BC     |   62.0% |      200 |
| DAgger |   81.5% |      200 |

---

写完之后 `git push`，GitHub Pages 大约一两分钟后更新。第一篇文章发布后，导航栏会自动出现 **Blog** 入口。
