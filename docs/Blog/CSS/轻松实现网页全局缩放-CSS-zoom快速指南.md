---
title: 轻松实现网页全局缩放 - CSS-zoom 快速指南
author: 耶温
createTime: 2024/07/16 15:59:24
permalink: /article/uo3er3lr/
tags:
  - CSS
---

## 前言



在写一些简单的工具类页面时，在自己的小屏笔记本上显示效果很好。放到屏幕大一点的电脑上时，发现页面元素过大，页面显得很空旷。但是又不想做响应式，因为页面内容与功能不多，没必要。就想有没有什么简单高效的方法。快速实现页面整体缩放。于是找到了 CSS 中的 `zoom` 属性。

## 简介
 
CSS 的 zoom 属性是一个非标准的、浏览器特定的属性，主要用于 Internet Explorer 和基于 WebKit 的浏览器（如早期的 Safari 和 Chrome）。此属性允许缩放元素及其包含的所有子元素，但不会影响文档流中的布局。这意味着即使元素被缩放，页面上的其他元素也会像未缩放时那样定位。

简单来说，zoom 属性的设置就像用户调整当前窗口的缩放等级一样。因为我们的方案也是如此，屏幕过小，我们就把当前窗口缩放调整到 100% 以下，实现整体缩小。同理，如果当前屏幕过大，可以调整 100% 以上，实现整体放大。

<div style="text-align: center; margin: 12px 40px;">
    ![PNG](@source/Blog/CSS/images/image3.png)
</div>


## 兼容性
可以从MDN看到，在2024年5月份已经把 `zoom` 设置为标准属性。

<div style="text-align: center; margin: 12px 40px;">
    <img style="border-radius: 12px;" src="@source/Blog/CSS/images/image1.png" alt="PNG" />
</div>


zoom 兼容大部分现在浏览器，只不过 reset 值基本都不兼容，无所谓，我们解决方案只需要 zoom 就够。


<div style="text-align: center; margin: 12px 40px;">
    <img style="border-radius: 12px;" src="@source/Blog/CSS/images/image2.png" alt="PNG" />
</div>



## 解决方案

很简单，我们直接使用媒体查询，给 `html` 或者 `body` 设置 `zoom` 属性即可。

```css
@media (max-width: 1200px) {
    body {
        zoom: 0.9;
    }
}
@media (max-width: 1000px) {
    body {
        zoom: 0.8;
    }
}
@media (max-width: 800px) {
    body {
        zoom: 0.7;
    }
}
```

## 代码演示

我们可以点击 示例按钮 缩放窗口大小查看效果。

::: normal-demo zoom 代码演示
```html
<div style="text-align: center; margin-bottom: 20px">
    <button id="zoom-in">zoom 放大</button>
    <button id="zoom-out">zoom 缩小</button>
</div>

<div id="zoom-demo" class='zoom-demo'>
    <header>
        <h1>个人博客</h1>
        <nav>
            <a href="#">首页</a>
            <a href="#">关于我</a>
            <a href="#">联系</a>
        </nav>
    </header>
    <div class="container">
        <main>
            <h2>最新文章</h2>
            <article>
                <h3>文章标题 1</h3>
                <p>这是文章 1 的简短介绍...</p>
            </article>
            <article>
                <h3>文章标题 2</h3>
                <p>这是文章 2 的简短介绍...</p>
            </article>
        </main>
        <aside>
            <h2>侧边栏</h2>
            <p>这里可以放一些链接</p>
        </aside>
    </div>
    <footer>
        <p>© 2024 我的个人博客</p>
    </footer>
</div>
```
```css
header { background: #333; color: #fff; padding: 10px; text-align: center; }
nav { margin: 10px 0; }
nav a { margin: 0 15px; color: #fff; text-decoration: none; }
.container { display: flex; }
main { flex: 3; padding: 20px; }
aside { flex: 1; background: #ccc; padding: 20px; }
footer { text-align: center; padding: 10px; background: #333; color: #fff; }
```
```js
const content = document.getElementById('zoom-demo');
let zoom = 1; // 初始字体大小
document.getElementById('zoom-in').addEventListener('click', () => {
    zoom += 0.1
    content.style.zoom =  zoom
});
document.getElementById('zoom-out').addEventListener('click', () => {
    zoom -= 0.1
    content.style.zoom =  zoom
});
```
:::

## 注意事项

特别注意，如果代码里有使用 `vh` 或者 `vw` 单位的话，缩放后可能会出现布局错乱。


## 总结

总的来说，CSS 的 zoom 属性是一个简单而强大的工具，可以轻松实现网页的全局缩放。但是也只推荐使用在简单的放大缩小场景，尤其是需要快速调整页面布局时。

如果是需要更复杂的响应式布局，建议使用更为友好的响应式布局方案，如媒体查询、REM布局、Flex布局、网格布局，也可以结合起来一起使用。