# NNOON Blog

一个基于 Hexo 搭建的中文技术博客，主要记录代码、工具与系统设计相关内容。仓库同时保存博客源码、主题配置和部署流程，适合作为个人博客的长期维护仓库。

在线地址：<https://nnoon010911.github.io>

## 项目概览

- 静态博客框架：Hexo 8
- 主题：Butterfly
- 语言：简体中文（`zh-CN`）
- 时区：`Asia/Shanghai`
- 发布方式：推送到 `main` 后由 GitHub Actions 自动构建并部署到 GitHub Pages

## 当前特性

- 首页、归档页、关于页已配置完成
- 使用 Butterfly 主题进行界面与布局定制
- 支持文章分类、归档、目录、代码高亮与分享组件
- 支持本地预览与静态构建
- 已配置 GitHub Pages 自动部署工作流

## 本地开发

### 1. 安装依赖

```bash
npm install
```

### 2. 启动本地预览

```bash
npm run server
```

默认访问地址：

```text
http://localhost:4000
```

### 3. 常用命令

```bash
npm run clean
npm run build
npm run server
```

对应说明：

- `npm run clean`：清理 Hexo 生成缓存
- `npm run build`：生成静态文件到 `public/`
- `npm run server`：启动本地预览服务

### 4. Git Bash 快速预览与部署

如果你习惯在网站根目录中使用 Git Bash，可以按下面的顺序执行：

```bash
hexo clean
hexo g
hexo s
```

对应说明：

- `hexo clean`：清理缓存与旧的生成结果
- `hexo g`：生成静态博客目录
- `hexo s`：启动本地预览服务

本地确认无误后，再执行部署：

```bash
hexo d
```

注意：

- `hexo s` 启动后会占用当前终端用于本地预览
- 如果要继续执行 `hexo d`，需要先停止预览，或新开一个终端窗口
- 当前仓库已配置部署目标，执行 `hexo d` 后会把站点发布到对应 GitHub Pages 仓库
- 部署完成后，其他人就可以通过 `https://你的用户名.github.io` 访问你的网站

## 写文章流程

### 1. 新建文章

```bash
npx hexo new "文章标题"
```

文章会生成在 `source/_posts/` 目录下。

### 2. 编辑内容

文章使用 Markdown 编写，常见 Front Matter 例如：

```markdown
---
title: 如何搭建自己的技术博客
date: 2026-04-10 23:30:00
categories:
  - 博客
tags:
  - Hexo
  - GitHub Pages
---
```

### 3. 本地预览

```bash
npm run server
```

如遇到本地内容未刷新，可依次执行：

```bash
npm run clean
npm run build
npm run server
```

### 4. 提交并发布

```bash
git add .
git commit -m "docs(post): 新增文章《文章标题》"
git push origin main
```

推送到 `main` 后，GitHub Actions 会自动构建并发布站点。

## 自动部署

仓库内置 GitHub Actions 工作流：

- 工作流文件：`.github/workflows/deploy-pages.yml`
- 触发条件：推送到 `main`，或手动触发
- 运行环境：Node.js 20
- 构建命令：`npx hexo generate`
- 发布目录：`public/`

这意味着日常更新博客时，通常不需要手动执行 `hexo deploy`，直接提交源码并推送即可。

如果你希望直接从本地部署，也可以使用：

```bash
hexo d
```

当前仓库的部署配置已指向：

```text
https://github.com/nnoon010911/nnoon010911.github.io.git
```

因此本项目部署完成后，对应站点地址为：

```text
https://nnoon010911.github.io
```

## 目录结构

```text
.
├─ .github/                # GitHub Actions 工作流
├─ docs/                   # 设计与计划等辅助文档
├─ scaffolds/              # Hexo 模板
├─ source/                 # 站点内容
│  ├─ _posts/              # 博客文章
│  ├─ about/               # 关于页
│  ├─ archives/            # 归档页
│  ├─ categories/          # 分类页
│  └─ tags/                # 标签页
├─ themes/
│  └─ butterfly/           # Butterfly 主题源码与配置
├─ _config.yml             # Hexo 站点主配置
└─ package.json            # 项目依赖与脚本
```

## 常用定制入口

如果需要继续调整博客外观或结构，优先关注这些文件：

- `_config.yml`：站点标题、作者、描述、URL、部署配置
- `themes/butterfly/_config.yml`：主题菜单、首页、副标题、侧边栏、主题配色
- `themes/butterfly/layout/`：主题结构模板
- `themes/butterfly/source/css/`：主题样式
- `source/_posts/`：文章内容

## 相关文档

仓库中已经有两份适合日常维护的中文说明文档：

- `发文章操作指南.md`
- `博客界面修改速查表.md`

如果你的目标是持续写作与微调博客样式，建议先阅读这两份文档。

## 技术栈

- [Hexo](https://hexo.io/)
- [Butterfly Theme](https://butterfly.js.org/)
- [GitHub Pages](https://pages.github.com/)
- [GitHub Actions](https://docs.github.com/actions)

## License

本仓库当前未单独声明自定义 License。  
其中 `themes/butterfly/` 目录包含上游主题及其许可证文件，使用前请查看对应说明。
