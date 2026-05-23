---
title: Vue2 + Element - Table表头顺序错乱问题
author: 耶温
tags:
  - Vue2
createTime: 2024/05/16 16:58:07
permalink: /article/cwn7bsvt/
---


# Element-Table表头顺序错乱问题

在之前写了一个 关于 Vue2组件自我调用 的笔记，在封装 `Element` 的 `Table` 组件时，发现 `Table` 组件的表头乱序问题。


后测试发现是在循环嵌套 `el-table-column` 时，不能添加其他元素比如 `div`， 可以使用 `template` 代替。并且需要在 `el-table-column` 元素添加 `key` 值。

## 原问题代码

`app.vue`，主表格页面。其中引入了 `elTableColumnPlus` 组件实现根据数据动态生成多级表头。

```vue
<template>
  <div id="app">
    <el-table :data="option.tableData" style="width: 100%">
      <elTableColumnPlus :option="option.headerData"></elTableColumnPlus>
    </el-table>
  </div>
</template>
<script>
import elTableColumnPlus from "./elTableColumnPlus.vue";
export default {
  name: "App",
  components: {  elTableColumnPlus },
  data() {
    return { option: {} };
  },
  created() {
    this.option = require("./demo.json");
  },
};
</script>
```


`demo.json`，自定义表头数据，和表格数据。
::: details 点击查看 demo.json

```json
{
    "headerData": [
        {
            "label": "日期",
            "prop": "date"
        },
        {
            "label": "名字",
            "prop": "name"
        },
        {
            "label": "成绩",
            "children": [
                {
                    "label": "语文",
                    "prop": "score1"
                },
                {
                    "label": "数学",
                    "prop": "score2"
                },
                {
                    "label": "英语",
                    "prop": "score3"
                },
                {
                    "label": "理综",
                    "children": [
                        {
                            "label": "物理",
                            "prop": "score4"
                        },
                        {
                            "label": "化学",
                            "prop": "score5"
                        },
                        {
                            "label": "生物",
                            "prop": "score6"
                        }
                    ]
                }
            ]
        }
    ],
    "tableData": [
        {
            "date": "2016-05-02",
            "name": "王小虎",
            "score1": 150,
            "score2": 150,
            "score3": 150,
            "score4": 110,
            "score5": 100,
            "score6": 90
        },
        {
            "date": "2016-05-04",
            "name": "王小明",
            "score1": 150,
            "score2": 150,
            "score3": 150,
            "score4": 110,
            "score5": 100,
            "score6": 90
        },
        {
            "date": "2016-05-01",
            "name": "王小丽",
            "score1": 150,
            "score2": 150,
            "score3": 150,
            "score4": 110,
            "score5": 100,
            "score6": 90
        },
        {
            "date": "2016-05-03",
            "name": "王小飞",
            "score1": 150,
            "score2": 150,
            "score3": 150,
            "score4": 110,
            "score5": 100,
            "score6": 90
        }
    ]
}
```

:::
`elTableColumnPlus.vue`，使用递归组件，实现多级表头。

```vue
<template>
    <div v-for="item in option" :key="item.value">
        <el-table-column v-if="!item.children || !item.children.length" :prop="item.prop" :label="item.label">
        </el-table-column>
        <el-table-column v-else :prop="item.prop" :label="item.label">
            <elTableColumnPlus :option="item.children"> </elTableColumnPlus>
        </el-table-column>
    </div>
</template>
<script>
export default {
  name: "elTableColumnPlus",
  props: ["option"],
  components: {},
};
</script>
```
运行效果如下，发现本来在第一列的日期数据，现在跑到最后一列了。


<div style="text-align: center; margin: 12px 20px;">
    <img style="border-radius:12px;" src="@source/Blog/Vue2/images/image5.png" alt="Node.js" />
</div>

## 优化后代码

`app.vue` 主页面 和 `demo.json` 表头表格数据内容不变。


`elTableColumnPlus.vue` 组件修改如下：需要去掉当前页面嵌套的 `div` 。需要使用 `v-if` 的地方，直接添加到 `template` 标签上。防止出现多余的 其他 标签。

```vue
<template>
  <el-table-column :prop="item.prop" :label="item.label">
    <template v-if="item.children && item.children.length">
      <elTableColumnPlus v-for="it in item.children" :key="it.value" :item="it"></elTableColumnPlus>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "elTableColumnPlus",
  props: ["item"],
  components: {},
};
</script>
```

<div style="text-align: center; margin: 12px 20px;">
    <img style="border-radius:12px;"  src="@source/Blog/Vue2/images/image6.png" alt="Node.js" />
</div>

## 总结

总的来说，我们对 Element Table 组件 或者 其他组件进行操作时，不能额外添加多余的标签，否则可能会导致意想不到的问题。我们可以使用 `template` 标签代替，因为 `template` 标签不会被解析和渲染到页面上。不会影响到组件原有的结构。