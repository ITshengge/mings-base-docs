# 项目开发规范

mings-base-frame 前端基础框架，定义了一系列的开发标准，来规范前端开发工程师在项目开发中的行为，来促进大家朝着统一的标准进行开发。

## vue 文件规范

每次创建的.vue 文件的格式必须保持一致，而且每个.vue 文件都必须在文件顶部写上作者@author 和描述@description。

- @author: 指的是这个文件是谁写的。

- @description: 指的是这个文件（组件）的作用是什么。

.vue 的文件格式为：

```vue
<!---
  @author: 作者
  @description: 文件的作用，这个文件主要是用来做什么
-->
<template></template>
<script lang="ts" setup></script>
<style lang="less" scoped></style>
```

这个格式是固定的，不能随意更改，也不能调整标签位置。如果没有都要这样写，嫌麻烦，我们可以通过 vscode 来配置代码片段，当我们输入快捷键时，就能快速生成文件代码结构。具体做法：首先找到 vscode 的首选项 vscode/首选项/配置代码片段。然后选择 vue 进行配置，配置如下：

```json
{
  "vue文件模板": {
    "prefix": "t",
    "body": [
      "<!---",
      "\t@author: 写你自己的名字",
      "\t@description: 写对应组件的描述",
      "-->",
      "<template>",
      "",
      "</template>",
      "<script lang='ts' setup>",
      "",
      "</script>",
      "<style lang='less' scoped>",
      "",
      "</style>"
    ],
    "description": "输入 t 回车，输出 vue 文件目录"
  }
}
```

保存后，当我们创建一个.vue 的文件，然后输入 t 回车，代码片段就生成好了，我们只需要写上名字和描述即可。

## 创建 vue 组件文件名称规范

创建 vue 组件时，组件文件名称一定要是双驼峰写法，不能是中间杠的写法，双驼峰写法，也就是首字母都要大写，比如 User.vue 组件，UserItem.vue 组件这样命名。除此之外，组件名要见文知意，不要随意命名，在使用该组件的时候，组件文件名称必须和引入组件时的组件名称保持一致。

```ts
import UserItrem from "./UserItem.vue";
import User from "./User.vue";
```

## 路由规范

前端路由层级配置最多 2 层，如果超过 2 层，那么在 vue3 中的 vue-router 路由层级太深，会导致 keep-alive 组件缓存失效，所以建议路由配置最多 2 层，一般来说，就是一级目录和二级目录，如果实际项目中存在三级目录，那么我们可以在 pages 中的页面层级可以区分，但是在路由配置文件中，就不要在区分，只到 2 层即可。

```ts
import type { RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "root",
    redirect: "/home",
    component: () => import("@/pages/main.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/pages/home/index.vue"),
      },
      {
        path: "/home/info",
        name: "home-info",
        component: () => import("@/pages/home/info/index.vue"),
      },
    ],
  },
];
export default routes;
```

## 样式规范

编写样式时，要注意以下几点：

- 1、颜色：所有的关于颜色（边框色，文本颜色，背景颜色）都需要使用.useTheme()方法。

- 2、背景图片：背景图片需要使用.useBg()方法。

- 3、鼠标 hover 效果：使用定义好的 useHover()方法。

- 4、文本渐变色：使用定义好的 useTextGradientColor()方法。

- 5、背景渐变色：使用定义好的 useBgGradientColor()方法。

- 6、字体大小：使用定义好的 css 变量，具体做法：font-size: var(--font-size-base)，而不是直接写死。

- 7、字体样式：使用定义好的 css 变量--font-family，而不是直接写死。

- 8、像素单位：项目中所有的 px 都要改成 rem，因为会做大屏适配功能，就是通过 rem 来实现的，不管是自己写的代码，还是第三方组件库，还是自己的组件库。

一定要严格遵守上面的样式规范，因为我们要配合换肤功能，屏幕适配功能，同时也可以通过 js 全局调整字体大小和字体样式。

## 注释规范

代码开发时，对于定义的方法或者函数都需要写注释，对于判断分支，如果比较复杂，也需要写好注释，每个分支具体做的是什么业务，定义的变量，如果比较特殊也需要加上注释，注释必须这样写：

```ts
/*
 * 添加操作
 * @params { number } a 数字1
 * @params { number } b 数字2
 */
function add(a: number, b: number) {
  return a + b;
}
/*
 * 添加操作
 * @params { number } a 数字1
 * @params { number } b 数字2
 */
const add = (a: number, b: number) => {
  return a + b;
};
if (a === xxx) {
  // 注释1
} else {
  // 注释2
}
// 视频id列表
const videoIds = ref<string[]>([]);
```

## ts 类型规范

所有定义的变量都需要写 typescript 类型，不要出现 any。

## 代码风格规范

代码首行缩进都是 2 个空格，不要有 4 个空格。

## 项目结构规范

在开发组件时，如果组件是公共组件，那么就需要放到项目目录中最外一层的 components 中，如果开发的组件只是某个模块（页面）需要用到，那么就放在当前模块下面的 components 中。同时也包括我们开发 hooks 功能也一样，公共的 hook 功能就放到项目目录中最外一层的 hooks 文件夹中，当前模块（页面）用到的，就放到该模块目录下的 hooks 文件夹中，以此类推。

```text
src
├─ components # 项目中的全局组件目录
│
├─ hooks # 项目中的全局hooks目录
│
└─ pages # 页面目录，按照功能模块划分
   │
   ├─ module1 # 模块1
   │  │
   │  ├─ index.vue # module1页面入口
   │  ├─ components # module1模块的公共组件
   │  ├─ hooks # module1模块的公共hooks
   │  └─ 模块1其他模块公共的东西
   │
   ├─ module2 # 模块2
   │  │
   │  ├─ index.vue # module2页面入口
   │  ├─ components # module2模块的公共组件
   │  ├─ hooks # module2模块的公共hooks
   │  └─ 模块2其他公共的东西
   │
   └─ ...modulexxx # 模块xxx
```

## 变量声明规范

不能存在 var 声明变量，都要使用 const 或者 let。

## 内容加载规范

所有的依赖接口返回数据展示内容的组件，都需要有请求中的 loading 效果（不管是常规的 loading 还是骨架屏），接口响应无数据时的无数据状态展示效果。

## table 组件规范

对于 table 组件内容展示，除了要实现加载中效果，无数据效果之外，还需要实现当高度超出时，需要滚动条，并且要保证表头不滚动，只是内容滚动，同时还需要保证不会受到屏幕缩放的影响。这里需要注意的是，当展示无数据效果时，一定要使用 ant-table 组件中的 emptyText 插槽，在这个插槽里面直接放我们的 me-empty 组件，第二个需要注意的是，在写 table 时，不要使用 ant-table 组件自带的分页，一定要将 pagination 设置为 false，然后自己单独去写分页组件，这样我们可以统一对分页组件进行控制。

```json
<ant-table :columns="columns" :scroll="{y : 'calc(100% - 0.6rem)'}" :data-source="list" :pagination="false">
  <template #emptyText>
    <me-empty description="暂无数据" />
  </template>
</ant-table>
```

## table 页面布局规范

实际开发中，尽量都使用 flex 布局和 grid 布局，不要使用 float，行内块。
