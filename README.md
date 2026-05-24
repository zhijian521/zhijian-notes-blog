# 知简个人网站

一个基于 `Next.js + MySQL` 的个人网站项目，当前先聚焦博客场景，包含前台展示、后台登录、文章编辑和接口层。

## 当前功能

- 前台首页
- 博客列表页
- 文章详情页
- 后台登录
- 后台新增文章
- 文章编辑与发布状态修改
- MySQL 数据读取
- 项目内置 SQL 初始化脚本

## 推荐目录结构

```text
src/
  app/
    admin/
      admin-console.tsx
      page.tsx
    api/
      admin/
        login/route.ts
        logout/route.ts
        posts/
          [id]/route.ts
          route.ts
      posts/route.ts
    blog/
      [slug]/page.tsx
      page.tsx
    globals.css
    layout.tsx
    page.tsx
  lib/
    auth.ts
    db.ts
    posts.ts
sql/
  init.sql
```

## 本地启动

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看前台，打开 [http://localhost:3000/admin](http://localhost:3000/admin) 查看后台。

## 环境变量

复制 `.env.example` 为 `.env.local`，至少配置以下变量：

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_URL=mysql://username:password@your-host:3306/your_database
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-this-password
ADMIN_SESSION_SECRET=replace-with-a-long-random-string
```

## 数据库初始化

项目内维护了一份可直接执行的初始化脚本：

- [sql/init.sql](C:/code/zhijian/sql/init.sql)

当表结构调整时，优先同步更新这份脚本，其他同事 clone 后只需要连接好自己的 MySQL，再执行这份 SQL 就能快速起步。

## 默认文章表结构

`posts` 表包含以下字段：

- `id`
- `slug`
- `title`
- `summary`
- `content`
- `status`
- `published_at`
- `created_at`
- `updated_at`

## 后续扩展建议

- 继续新增备忘录模块时，可以复用现有登录态和管理页结构
- 新增导航首页时，可以沿用 `app/ + api/ + lib/` 的同层组织方式
- 如果后续内容模型明显变复杂，再考虑拆出更细的模块目录
