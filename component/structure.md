# 文件结构

mings-base-frame 前端基础框架整体结构划分较为清晰，每个目录都有自己需要承担的功能。我们将 src 目录作为项目的根目录，整个基础框架的目录结构如下：

```text
src
|─ apis #接口管理目录
│  ├─ api #正式接口请求管理目录
│  ├─ mock #模拟接口请求管理目录
│  └─ axios.ts #二次封装axios功能文件
│
├─ assets #静态资源目录
│  ├─ iconfont #字体样式目录
│  └─ images #图片目录
│     ├─ dark #深色主题的图片目录
│     └─ light #浅色主题的图片目录
│
├─ components #项目中的全局组件目录
│
├─ configs #项目中的配置目录
│
├─ hooks #项目中的全局hooks目录
│
├─ layouts #应用布局目录，已经封装好了（后台管理应用布局和普通应用布局）
│  ├─ AdminLayout.vue #后台管理系统的布局组件
│  ├─ BaseLayout.vue #基本布局组件
│  ├─ Breadcrumb.vue #面包屑组件
│  ├─ HeaderSidebar.vue #头部导航组件
│  ├─ IconButton.vue #图标按钮组件
│  ├─ Iframe.vue #内嵌页面组件
│  ├─ LayoutContent.vue #内容展示组件
│  ├─ LayoutHeader.vue #顶栏组件
│  ├─ LayoutMenu.vue #菜单组件
│  ├─ LayoutSidebar.vue #侧边栏组件
│  ├─ LayoutTabbar.vue #标签栏
│  ├─ Logo.vue #logo组件
│  ├─ MixedHeader.vue #混合菜单组件
│  ├─ NormalLayout.vue #普通布局组件
│  ├─ SubMenu.vue #子菜单组件
│  └─ TabbarTool.vue #标签栏工具组件
│
├─ mock #模拟数据目录
│  ├─ modules #按功能模块划分的mock接口请求响应的数据目录
│  └─ index.ts #封装mockjs功能文件
│
├─ pages #页面目录，按照功能模块划分
│  └─ cores #应用基础页面目录
│     ├─ fallback #各种异常情况的页面目录
│     │  ├─ not-found #路由匹配不上页面（找不到页面）
│     │  └─ offline #网路异常页面
│     ├─ forget-password #忘记密码，重新设置密码页面
│     ├─ login #登录页面
│     └─ logout #登出页面
│
├─ plugins #vue插件目录
│  └─ flex.ts #屏幕适配功能插件
│
├─ router #路由目录
│  ├─ index.ts #路由入口文件
│  ├─ guard.ts #路由导航功能文件
│  ├─ nprogress.ts #页面切换时进度条展示功能文件
│  ├─ utils.ts #路由业务处理时的工具方法
│  └─ routes #具体路由文件
│     ├─ dynamic.ts #动态路由文件
│     ├─ index.ts #所有路由的入口文件
│     ├─ not-found.ts #找不到路由文件
│     └─ static.ts #静态路由文件
│
├─ services #功能服务目录
│  ├─ auth.ts #统一登录功能服务
│  └─ communication #通信功能目录
│     ├─ socket #统一封装websocket功能服务
│     ├─ sse #统一封装sse功能服务
│     ├─ stomp #统一封装mq功能服务
│     ├─ utils #通信功能会用到的公共的工具管理类
│     └─ index.ts #通信功能入口文件
│
├─ stores pinia数据状态管理目录
│  ├─ access #权限相关数据目录
│  │  ├─ access.ts #权限数据相关
│  │  ├─ auth.ts #用户相关（登录/登出，获取用户信息）
│  │  ├─ user.ts #用户相关数据
│  │  ├─ types.ts #权限相关数据ts类型
│  │  └─ utils.ts #权限相关hook会用到的工具方法
│  ├─ configs #应用配置数据目录
│  │  ├─ coinfg.ts #配置数据相关hook
│  │  ├─ default.ts #默认应用配置数据
│  │  └─ types.ts #应用配置数据ts类型
│  ├─ modules #应用业务模块相关数据目录
│  ├─ index.ts #pinia入口文件
│  └─ pinia.ts #创建pinia
│
├─ styles #样式目录
│  ├─ antd.less #全局修改ant-design-vue组件库样式
│  ├─ base.less #项目基础样式，定义的css变量
│  ├─ index.less #样式入口文件
│  ├─ meui.less #全局修改me-ui组件库样式
│  ├─ theme.less #主题样式文件
│  └─ transition.less #全局过渡动画样式
│
├─ types #ts类型声明文件目录，按照功能模块划分，每个模块创建一个类型声明文件
│  ├─ helper.d.ts #自定义可复用的ts类型检测工具
│  └─ result.d.ts #接口响应数据类型声明文件
│
├─ utils #工具方法目录
│  ├─ copy.ts #复制功能
│  └─ tree.ts #树操作功能
│
├─ App.vue #应用路由页面主入口文件
│
├─ main.ts #应用主入口文件
│
└─ vite-env.d.ts #ant-design-vue、me-ui组件库类型声明文件
```
