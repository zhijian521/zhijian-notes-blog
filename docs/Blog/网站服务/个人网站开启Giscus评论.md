---
title: 个人网站开启Giscus评论系统 - GitHub-Giscus
author: 耶温
createTime: 2024/06/25 10:09:10
permalink: /article/qq3fsftw/
tags:
  - 网站服务
---
# 个人网站开启Giscus评论

Giscus 是一个开源的评论系统，基于 GitHub Discussions 构建，为个人网站提供强大的评论功能。它支持 GitHub 身份验证，实时更新评论，并提供多种主题样式，易于集成和自定义。

## 简介

- 易于集成：只需添加一小段代码到你的网站，即可快速启用评论功能。
- 实时更新：评论支持实时加载和更新，提升用户体验。
- GitHub 身份验证：用户需使用 GitHub 账号登录，有助于减少垃圾信息。
- 自定义性：提供多种主题样式，可调整以匹配你的网站设计。
- 开源免费：Giscus 是一个开源项目，遵循 MIT 许可证，对个人和商业项目均免费开放。

## 使用步骤

### 创建Github仓库

首先，你需要有一个 GitHub 账号，并创建一个新的仓库用于存放评论议题。这个仓库需要设置为公开。并且需要在仓库设置页面开放评论选项。

<div style="text-align: center; margin: 12px 40px;">
    <img style="border-radius: 12px;" src="@source/Blog/网站服务/images/image1.png" alt="PNG" />
</div>



### 安装Giscus App

> https://github.com/apps/giscus

Giscus 应用库可以帮助你更方便地管理设置。通过上述网站进入安装页面，直接安装。

<div style="text-align: center; margin: 12px 40px;">
    <img style="border-radius: 12px;" src="@source/Blog/网站服务/images/image2.png" alt="PNG" />
</div>


安装完成之后，点击设置，进入Giscus 设置页面。设置仓库访问权限，选择自己刚刚新建的用来当做评论的仓库。

<div style="text-align: center; margin: 12px 40px;">
    <img style="border-radius: 12px;" src="@source/Blog/网站服务/images/image3.png" alt="PNG" />
</div>

### 配置Giscus

> https://giscus.app/zh-CN

通过上述链接，进入配置Giscus页面。下拉，根据自己需求，分别配置语言、仓库、页面 ↔️ discussion 映射关系、Discussion 和主题分类。

输入自己刚刚设置的仓库地址，此项为必填项。
<div style="text-align: center; margin: 12px 20px;">
    <img style="border-radius: 12px;" src="@source/Blog/网站服务/images/image5.png" alt="PNG" />
</div>

选择自己的Discussion分类。

<div style="text-align: center; margin: 12px 20px;">
    <img style="border-radius: 12px;" src="@source/Blog/网站服务/images/image6.png" alt="PNG" />
</div>

查看下面的 嵌入的 `script` 代码中是否有 `data-repo` 、`data-repo-id` 、`data-category` 和 ``data-category-id`` 等参数。如果有，则说明配置成功。

### 嵌入到网站

配置完成之后，在 启用giscus  下面有一段带有 `<script>` 标签的代码，嵌入到自己网站的合适位置即可。

<div style="text-align: center; margin: 12px 40px;">
    <img style="border-radius: 12px;" src="@source/Blog/网站服务/images/image4.png" alt="PNG" />
</div>

如上图所示，只需要将代码复制到自己的网站中，添加一个 `giscus`类的元素容器即可。


## 总结

通过以上步骤，我们可以在个人网站上轻松地集成 Giscus 评论系统。具体的实现效果，如该文章的评论区所示。

