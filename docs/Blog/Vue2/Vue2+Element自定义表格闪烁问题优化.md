---
title: 消除 Vue2 + Element 表格闪烁抖动问题 - 提升用户体验的实用技巧
createTime: 2024/11/18 21:41:49
permalink: /article/jm7lzd07/
tags:
  - Vue2
---
`修复 vue2 + element-ui 在使用表格组件的自定义表头时，切换不同表格出现闪烁抖动问题`
<!-- more -->
## 前言

最近再工作中遇到一个问题，在使用 `vue2` + `element-ui` 的表格组件时，使用  `tabs` 页签或其他按钮切换表格时，发现表格会闪烁抖动。用户体验不佳，提出优化。

先说最终解决方案：使用 Element 表格中的 `doLayout()` 方法，在 `beforeUpdate` 钩子中调用，重新渲染表格。
```js
beforeUpdate() {
  this.$nextTick(() => {
    this.$refs.table.doLayout()
  })
},
```
> 下为 Element 官方文档 对于 `doLayout()` 方法的解释

<div style="text-align: center; margin: 12px 20px;">
    ![PNG](@source/Blog/Vue2/images/image0.png)
</div>


## 问题复现

新建了一个 `vue2` 项目，引入 `element-ui`，使用 `el-table` 组件，在 `el-table` 组件上使用自定义表头，切换不同表格时，问题复现。

::: details 点击查看代码
```vue
<template>
  <div id="app">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户列表" name="first"> </el-tab-pane>
      <el-tab-pane label="角色列表" name="second"></el-tab-pane>
    </el-tabs>
    <el-table ref="table" :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column v-for="item, index in tableHeader" :key="index" :prop="item.prop" :label="item.label"
        :width="item.width">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first',
      loading: false,
      tableData: [],
      tableHeader: []
    }
  },
  created() {
    this.handleClick()
  },
  methods: {
    async handleClick() {
      this.loading = true
      this.tableHeader = []
      this.tableData = []
      // 模拟加载表头
      setTimeout(() => {
        this.tableHeader = [
          { label: '用户创建日期', prop: 'date', width: '120' },
          { label: '用户姓名', prop: 'name', width: '100' },
          { label: '用户创建常用地址(已验证地址)', prop: 'address', width: '250' },
          { label: '最后登录日期', prop: 'date', width: '150' },
          { label: '用户常用邮箱', prop: 'email', width: '200' },
          { label: '用户常用电话', prop: 'tel', width: '200' }
        ]
      }, 1000);
      // 模拟加载数据
      setTimeout(() => {
        this.tableData = [
          { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', tel: '1234567890', email: '1234567890@qq.com' },
          { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄', tel: '1234567890', email: '1234567890@qq.com' },
        ]
        this.loading = false
      }, 2000)
    }
  }
}

</script>
<style>
#app {
  height: 300px;
  width: 600px;
  margin: 50px auto;
  background-color: #ccc;
  border-radius: 12px;
  padding: 24px;
}
</style>
```
:::


如上详情代码中所示，我们使用 `setTimeout` 模拟异步加载 表头 和 表格数据。

复现效果如下，可以到明显看到切换或者加载表格时表现出抖动和闪烁，影响体验。

<div style="text-align: center; margin: 12px 40px;">
    ![GIF](@source/Blog/Vue2/images/gif1.gif)
</div>

## 问题研究

录制视频逐帧分析，发现闪烁和抖动的原因是表格在加载过程中，渲染表头时出现换行，导致表格高度变化，从而出现抖动和闪烁。如下图：
<div style="text-align: center; margin: 12px 20px;">
    ![PNG](@source/Blog/Vue2/images/image1.png)
</div>

只有很短的几帧时间，随后表头渲染完成，表格高度恢复正常。如下：
<div style="text-align: center; margin: 12px 20px;">
    ![PNG](@source/Blog/Vue2/images/image2.png)
</div>

## 解决方案

知道了问题的原因，尝试解决：

1. 使用 `key` 强制刷新表格

```html
<el-table ref="table" :key="tableKey" :data="tableData" style="width: 100%" v-loading="loading">
    <el-table-column v-for="item, index in tableHeader" :key="index" :prop="item.prop" :label="item.label"
      :width="item.width">
    </el-table-column>
</el-table>
```
```js
data() {
  return {
    tableKey: new Date().getTime()
  }
},

// ...
async handleClick() {
  // 在加载完表头和表格数据后，强制刷新表格
  this.$nextTick(() => {
    this.tableKey = new Date().getTime()
  })
}
```
如上代码所示，我们使用 `key` 强制刷新表格，然后并未解决表格闪烁和抖动问题。此方法不可行。

2. 使用 `v-if` 控制表格的渲染，直接借助，原 `loading` 属性实现。

```html
<el-table ref="table" v-if="!loading" :data="tableData" style="width: 100%" v-loading="loading">
  <el-table-column v-for="item, index in tableHeader" :key="index" :prop="item.prop" :label="item.label"
    :width="item.width">
  </el-table-column>
</el-table>
```
```js
// ...
async handleClick() {
  // 在加载完表头和表格数据后，更改 loading 状态，控制表格的渲染
  this.$nextTick(() => {
    this.loading = false
  })
}
```
实现效果如下：

<div style="text-align: center; margin: 12px 40px;">
    ![PNG](@source/Blog/Vue2/images/gif2.gif)
</div>

可以看到，使用 `v-if` 控制表格的渲染，解决了表格闪烁和抖动问题。但是，又存在一个问题，就是表格在加载过程中，无法显示加载状态，体验较差。需要单独在外层元素中，使用 `v-loading` 属性控制加载状态。


```html
<div id="app" v-loading="loading">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户列表" name="first"> </el-tab-pane>
    <el-tab-pane label="角色列表" name="second"></el-tab-pane>
  </el-tabs>
  <el-table ref="table" v-if="!loading" :data="tableData" style="width: 100%">
    <el-table-column v-for="item, index in tableHeader" :key="index" :prop="item.prop" :label="item.label"
      :width="item.width">
    </el-table-column>
  </el-table>
</div>
```
实现效果如下，可以看到，表格在加载过程中，可以显示加载状态，体验较好。

<div style="text-align: center; margin: 12px 40px;">
    ![PNG](@source/Blog/Vue2/images/gif3.gif)
</div>

3. 使用 ElementUI 的 `el-table` 组件的  `doLayout` 方法，在 `beforeUpdate` 生命周期中调用，重新渲染表格。

```js
beforeUpdate() {
  this.$nextTick(() => {
    this.$refs.table.doLayout()
  })
},
```
实现效果如下，可以看到表格在加载过程中正常，可以显示加载状态，体验较好。并且不需要添加额外代码，推荐使用。

<div style="text-align: center; margin: 12px 40px;">
    ![PNG](@source/Blog/Vue2/images/gif4.gif)
</div>

## 总结

以上，我们可以通过 `v-if`  和 `doLayout` 方法，解决 Vue2 + ElementUI 自定义表格闪烁和抖动问题。推荐使用 `doLayout` 方法，在 `beforeUpdate` 生命周期中调用，重新渲染表格。

如果您有其他更好的优化方式，欢迎联系讨论。















