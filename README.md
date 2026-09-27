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

## Homepage Card Images

Publication and project cards load a small `<name>-card.webp` next to the original
image (the originals are several MB but the cards are only 320px wide). After adding
or replacing a card image, regenerate its card copy and point `_pages/about.md` at it:

```bash
ffmpeg -i images/projects/foo.png -vf "scale='min(720,iw)':'min(405,ih)':force_original_aspect_ratio=decrease" -pix_fmt yuva420p -c:v libwebp -quality 82 images/projects/foo-card.webp
```

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

Posts with at least three `##`/`###` sections get a table of contents in the left
column in place of the author profile (a collapsible box on phones), and the byline
names the author. Set `toc: false` in the front matter to turn it off.

Put images in `assets/blog/<slug>/`. `_drafts/writing-guide.md` is a formatting
reference (images, code, math, tables) that is never published; preview drafts with
`bundle exec jekyll serve --drafts`. The **Blog** link in the top nav appears
automatically once `_posts/` has at least one post.

On Ruby 4 the pinned Liquid needs the local shim preloaded:
`RUBYOPT="-r./_plugins/ruby4_compat.rb" bundle exec jekyll serve`.
