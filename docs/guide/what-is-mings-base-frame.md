---
redirectFrom: /
---

# mings-base-frame

mings-base-frame 是一个基于 vite/webpack 构建的满足公司业务需求的前端基础框架，目的是帮助前端开发及工程师快速搭建项目，提高开发效率，统一整个前端开发规范。

目前我们已经搭建了两套前端基础框架，一套是 [mings-base-frame-vite](http://10.44.51.32:8080/me-lib/mings-base-frame-vite.git) 基于 vite 构建的前端框架，一套是 [mings-base-frame-webpack](http://10.44.51.32:8080/me-lib/mings-base-frame-webpack.git) 基于 webpack 的前端框架。其中框架又都包含了普通应用和后台管理系统的应用，我们只需要通过配置去选择具体使用哪个。

普通应用和后台管理系统的框架主要的区别就是，后台管理系统的应用已经集成了有关后台管理系统常用功能（比如：标签栏、菜单栏、面包屑、头部等），而普通应用就没有这些功能，其余部分全部都是一样的。

整个项目的包管理工具，我们使用 yarn，安装依赖都使用 yarn 来安装，不要使用其他的包管理工具。

::: danger
目前前端基础框架，在前端技术栈、代码 eslint 规范、代码提交规范、组件库、样式规范、基础功能等都已经做到了全都统一。我们可以根据不同的需求，选择合适的前端基础框架去快速开发项目。
:::

## 仓库地址

mings-base-frame-vite 前端基础框架仓库地址：[http://10.44.51.32:8080/me-lib/mings-base-frame-vite.git](http://10.44.51.32:8080/me-lib/mings-base-frame-vite.git)

mings-base-frame-webpack 前端基础框架仓库地址：[http://10.44.51.32:8080/me-lib/mings-base-frame-webpack.git](http://10.44.51.32:8080/me-lib/mings-base-frame-webpack.git)

## 使用

1. 拉取前端基础框架：

```shell
git clone http://10.44.51.32:8080/me-lib/mings-base-frame-vite.git
git clone http://10.44.51.32:8080/me-lib/mings-base-frame-webpack.git
```

2. 安装依赖

```shell
cd 项目地址
yarn install
```

3. 启动项目

```shell
yarn dev // vite构建
// 或
yarn serve // webpack构建
```

4. 打包项目

```shell
yarn build
```

## 特点

- 开箱即用
- 内置业务组件库，各种常见基础功能

## 技术栈

- vue3 + vue-router + pinia + axios
- typescript
- ant-design-vue
- echarts
- me-ui
- account-auth-sdk
- me-map-gl
- vueuse

## 安装环境

node.js 版本至少大于等于 18。

## 前端基础框架演示地址

演示地址
