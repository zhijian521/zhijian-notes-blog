SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS posts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(120) NOT NULL,
  title VARCHAR(200) NOT NULL,
  summary VARCHAR(500) NOT NULL,
  content MEDIUMTEXT NOT NULL,
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  published_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_posts_slug (slug),
  KEY idx_posts_status_published_at (status, published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO posts (slug, title, summary, content, status, published_at)
SELECT
  'build-a-next-fullstack-personal-site',
  '先把博客搭起来，再把它长成你的个人网站',
  '用 Next.js 自带的页面、接口和服务端能力，先把博客做好，后续再接备忘录、导航和作品页。',
  '对个人网站来说，最核心的是内容持续发布，而不是一开始就把系统拆得很重。'
  '\n\n'
  '把博客、后台管理和接口放进同一个 Next.js 项目里，开发和部署路径都会更短，也更适合个人长期维护。'
  '\n\n'
  '等博客稳定后，再逐步补充备忘录、导航首页、项目陈列和关于页，会比一开始铺太大更从容。',
  'published',
  '2026-05-24 09:30:00'
WHERE NOT EXISTS (
  SELECT 1
  FROM posts
  WHERE slug = 'build-a-next-fullstack-personal-site'
);

INSERT INTO posts (slug, title, summary, content, status, published_at)
SELECT
  'why-self-hosted-admin-can-be-simpler',
  '为什么个人站的后台，自己做反而更轻',
  '内容模型稳定时，自己做一个轻后台，通常会比引入额外 CMS 更贴近需求，也更方便部署。',
  '博客后台最常见的需求就是登录、查看文章、修改文章和发布状态控制，这些能力并不复杂。'
  '\n\n'
  '当页面结构、字段模型和权限边界都很清晰时，直接在 Next.js 里封装接口，会有更高的掌控感。'
  '\n\n'
  '这样后续扩展新模块时，也可以继续沿用同一套页面、接口和数据库连接方式，不需要维护两套系统。',
  'published',
  '2026-05-20 20:15:00'
WHERE NOT EXISTS (
  SELECT 1
  FROM posts
  WHERE slug = 'why-self-hosted-admin-can-be-simpler'
);
