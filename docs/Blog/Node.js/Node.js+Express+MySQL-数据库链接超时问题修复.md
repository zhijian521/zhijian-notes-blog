---
title: Node.js + Express + MySQL - 数据库链接超时问题修复
createTime: 2024/11/15 21:37:08
permalink: /article/oqgx23t7/
tags:
  - Node.js
  - Express
  - MySQL
---
`报错信息：Can't add new command when connection is in closed state`

<!-- more -->


## 前言

最近在用 Node.js + Express + MySQL 做导航页项目时，遇到了数据库链接超时的问题。

日志报错信息：
```shell 
[错误信息:{"message":"Can't add new command when connection is in closed state"}]
```

## 问题

通过查询报错信息，基本可以确定是数据库链接超时的问题。因为 MySQL 默认的链接超时时间是 8 小时，所以当数据库链接超过 8 小时没有使用时，就会自动断开。再次使用数据库查询等操作时，就会出现上述的错误。 

由于导航页项目暂时只有几个人使用，每天晚上休息，第二天早上再打开项目时，就会出现数据库链接超时的问题，😂😂😂 差不多正好是 8 小时。

## 尝试解决

我使用的链接 MySQL 的库是 `mysql2`，所以解决方案也是针对 `mysql2` 的。具体链接方式如下：

```js
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: 'xxx.xxx.xxx.xxx',
    user: 'xxx',
    password: 'xxx',
    database: 'xxx',
});
```


在 stackoverflow 查看一个相同报错的解决方案，链接如下：

> https://stackoverflow.com/questions/47548434/cant-add-new-command-when-connection-is-in-closed-state

添加 `keepAliveInitialDelay` 和 `enableKeepAlive` 配置项，具体代码如下：
```js
const pool = mysql.createPool({
  ...
  keepAliveInitialDelay: 10000, // 0 by default.
  enableKeepAlive: true, // false by default.
});
```

但是，我尝试了该方案，发现并没有解决问题。第二天早上打开项目时，依然会出现数据库链接超时的问题。😭😭😭

## 解决方案




后面我又打开了上面 stackoverflow 的链接，发现一个 issue ，链接如下：

> https://github.com/sidorares/node-mysql2/issues/683


有人提到了一个骚方法，如下：

<div style="text-align: center; margin: 12px 40px;">
    ![MySQL](@source/Blog/Node.js/images/image1.png)
</div>


发现可以解决问题。第二天早上打开项目时，不会出现数据库链接超时的问题。骚方法很好用，但是总觉得有点不靠谱。😂😂😂


## 总结
首先感谢[midnightcodr](https://github.com/midnightcodr)大佬提供的方案。

如果你有更好的解决方案，欢迎联系我📧或者者在评论区留言💬。谢谢各位大佬！♥ 

