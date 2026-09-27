# Wentao Guo Homepage

Personal academic homepage for Wentao Guo, built with Jekyll.

## Local Development

Install Ruby, Bundler, Node.js, and npm, then run:

```bash
bundle install
npm install
bundle exec jekyll serve
```

The local site is usually available at `http://127.0.0.1:4000/`.

## Main Files

- `_config.yml`: site metadata and author profile.
- `_data/navigation.yml`: top navigation links.
- `_pages/about.md`: homepage content.
- `assets/css/home.css`: homepage-specific styles.
- `assets/cv`, `assets/img`, `assets/papers`: CVs, images, PDFs, videos, and paper media.
- `_posts/` (English) and `_posts/zh/` (Chinese), `_pages/blog.html`, `_layouts/post.html`, `assets/css/blog.css`: the blog.

## Writing a Blog Post

Create `_posts/YYYY-MM-DD-slug.md`; it is published at `/blog/YYYY/slug/`.

```yaml
---
title: "Post title"
description: "One-line summary for the blog list (optional; defaults to the first paragraph)"
tags: [robotics, data]
---
```

Slugs must be unique across the blog: two posts with the same slug in the same year
silently overwrite each other, and all versions of a post share `assets/blog/<slug>/`.

For a Chinese version, save it under `_posts/zh/` with the same filename as the
English post; it is published at `/blog/YYYY/slug/zh/`, the two pages get an
English/中文 switcher, and post lists show the article once. A post that only exists
in `_posts/zh/` is listed on its own with a 中文 label. Keep tags in English so the tag
filter groups both languages together. Post-page UI text lives in `_data/blog_ui.yml`.

Put images in `assets/blog/<slug>/`. `_drafts/writing-guide.md` is a formatting
reference (images, code, math, tables) that is never published; preview drafts with
`bundle exec jekyll serve --drafts`. The **Blog** link in the top nav appears
automatically once `_posts/` has at least one post.

On Ruby 4 the pinned Liquid needs the local shim preloaded:
`RUBYOPT="-r./_plugins/ruby4_compat.rb" bundle exec jekyll serve`.
