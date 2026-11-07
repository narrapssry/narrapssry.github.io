# Personal website

简洁的学术个人主页，使用 Jekyll 和 GitHub Pages，包含 Home、Research、Teaching 三个独立页面。无需 JavaScript、外部字体或前端构建工具。

## 填写内容

| 内容 | 修改文件 |
| --- | --- |
| 姓名（导航、首页、页脚统一更新）、网站描述 | `_config.yml` |
| Home：个人简介、联系方式 | `index.md` |
| Research：研究项目、论文 | `research.md` |
| Teaching：课程、教学资料 | `teaching.md` |
| 颜色、字体、间距 | `assets/css/main.css` |
| 三个页面共用的结构 | `_layouts/default.html` |

三个页面目前只有 `Coming soon.` 占位文字。填写时保留文件开头两行 `---` 之间的配置，将下方占位段落替换成 Markdown 即可。姓名在 `_config.yml` 的 `name` 中修改，一处修改后全站同步。

例如，`research.md` 可以写成：

```markdown
---
title: Research
permalink: /research/
---

## Working papers

论文标题，合作者，年份。[PDF](链接)
```

## GitHub Pages

本仓库保留 Jekyll 原生结构，可在仓库 **Settings → Pages** 中选择 **Deploy from a branch → main → /(root)**。GitHub Pages 会构建 Markdown 页面；现有工作流仅检查构建并保存产物，不单独部署。

仓库地址为 [`narrapssry/narrapssry.github.io`](https://github.com/narrapssry/narrapssry.github.io)，对应个人主页地址为 [https://narrapssry.github.io/](https://narrapssry.github.io/)。`_config.yml` 已设置 `url: "https://narrapssry.github.io"` 和 `baseurl: ""`，导航和样式均使用根路径。上线状态请以 **Settings → Pages** 为准。

参考：[GitHub Pages 与 Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll)。

## 本地预览

安装 Ruby 和 Bundler 后，在仓库目录运行：

```sh
bundle install
bundle exec jekyll serve
```

打开终端显示的本地根地址（通常为 `http://127.0.0.1:4000/`），无需额外的项目路径。

旧博客的文章、头像、搜索、分类、评论和统计代码已移除；历史版本仍保留在 Git 中。原仓库的 `LICENSE` 保留。
