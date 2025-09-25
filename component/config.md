# 基础框架配置

mings-base-frame 前端基础框架配置包括：全局配置，侧边栏配置，用户登录配置，面包屑导航配置，标签栏配置，顶栏配置,切换切换动画配置，通信功能启用配置等。

## 全局通用配置

```ts
/** 应用全局配置 */
export interface AppConfig {
  /** 应用名称 */
  name: string;
  /** 应用布局 */
  layout: LayoutType;
  /** 应用水印 */
  watermark: boolean;
  /** 应用主题色 */
  theme: ThemeType;
  /** 应用字体大小 */
  size: number;
  /** 应用字体样式 */
  family: string;
  /** 应用类型 */
  type: AppType;
  /** 是否支持页面切换时动态修改标题 */
  dynamicTitle: boolean;
  /** 应用水印内容 */
  watermarkText: string;
  /** 圆角大小 */
  radius: number;
}
```

## 侧边栏配置

```ts
/**
 * 侧边栏配置
 */
export interface SidebarConfig {
  /** 是否启用 */
  enable: boolean;
  /** 侧边栏宽度 */
  width: number;
  /** 侧边栏是否可折叠 */
  collapsed: boolean;
  /** 侧边栏是否隐藏 */
  hidden: boolean;
}
```

## 用户登录配置

```ts
/**
 * 用户中心配置
 */
export interface AuthConfig {
  /** 是否为开发模式，设置为true */
  dev: boolean;
  /** 应用id，当用户调用接口时，需要先认证，只有认证通过后，才有权限调用接口 */
  clientId: string;
  /** 应用秘钥，获取token需要 */
  clientSecret: string;
  /** sdk请求超时时间 */
  requestTimeout: number;
  /** 用户中心登录页面ip，说白了就是你这个项目的用户中心部署在哪里，你就用那个哪个ip */
  authServerIp: string;
  /** 用户中心登录页面端口，说白了就是你这个项目的用户中心的端口号是哪个，你就写哪个 */
  authServerPort: number;
  /** 用户中心是否为https  */
  authServerSsl: boolean;
  /** 登录成功后的回调地址，登录成功后用户中心将跳转到此地址，此地址为用户中心应用中注册过的回调地址 */
  loginRedirectUri: string;
  /** 用户中心代理路径，说白了就是前端在vue.config.ts或者vite.config.ts文件中配置的请求代理 */
  proxyPath: string;
  /** 心跳代理路径，说白了就是前端在vue.config.ts或者vite.config.ts文件中配置的请求代理，
   * 默认如果没有配置heartbeatIp和heartbeatPort，那么就使用heartbeatPath，如果已经配置了heartbeatIp和heartbeatPort，
   * 就会使用配置的这个heartbeatIp和heartbeatPort作为心跳代理路径，如果这三个选项都没有配置，就不会开启心跳检测 */
  heartbeatPath?: string;
  /** 心跳ip，如果配置了心跳ip，就会用配置的ip作为心跳代理路径，heartbeatIp和heartbeatPort要一起使用 */
  heartbeatIp?: string;
  /** 心跳端口号，如果配置了心跳端口，就会用配置的端口号作为心跳嗲里的端口号 */
  heartbeatPort?: number;
  /** 终端类型。可以选择web、app，说白了你做的是web前端就是web，是app应用就是app */
  terminalType: string;
  /** 是否跟着其他系统一起登出，一般传false，如果是true，那么当一个系统退出登录后，当前你用的这台电脑的其他接了用户中心的系统也都会退出登录，如果为fasle，就不会 */
  logoutTogether: boolean;
  /** 用户中心的系统id，用于标识当前用户在哪个系统上，这个是和心跳一起使用的，因为发送心跳的时候，会把这个带上 */
  appCode: string;
}
```

## 面包屑导航配置

```ts
/**
 * 面包屑导航配置
 */
export interface BreadcrumbConfig {
  /** 是否启用 */
  enable: boolean;
  /** 是否显示图标 */
  showIcon: boolean;
  /** 面包屑导航风格 */
  style: BreadcrumbStyleType;
  /** 是否显示主页 */
  showHome: boolean;
}
```

## 标签栏配置

```ts
/**
 * 标签栏配置
 */
export interface TabbarConfig {
  /** 是否启用 */
  enable: boolean;
  /** 是否可拖拽 */
  draggable: boolean;
  /** 标签栏高度 */
  height: number;
  /** 是否开启标签页缓存 */
  keepAlive: boolean;
  /** 是否显示图标 */
  showIcon: boolean;
  /** 是否显示全屏按钮 */
  showFullscreen: boolean;
  /** 是否显示更多按钮 */
  showMore: boolean;
  /** 标签页风格 */
  style: TabbarStyleType;
}
```

## 顶栏配置

```ts
/**
 * 顶栏配置
 */
export interface HeaderConfig {
  /** 是否启用 */
  enable: boolean;
  /** 顶栏菜单位置 */
  menuAlign: HeaderMenuAlignType;
  /** 顶栏是否隐藏 */
  hidden: boolean;
  /** 顶栏显示模式 */
  mode: HeaderModeType;
  /** 顶栏的高度 */
  height: number;
}
```

## 页面切换动画配置

```ts
export interface TransitionConfig {
  /** 是否启用切换页面动画 */
  enable: boolean;
  /** 是否开启页面加载 loading */
  loading: boolean;
  /** 页面切换动画 */
  name: PageTransitionType;
  /** 是否开启页面进度条加载 */
  progress: boolean;
}
```

## 通信功能配置

```ts
export interface Ability {
  /** 是否启用 websocket 功能 */
  websocket: boolean;
  /** 是否启用 stomp 功能 */
  stomp: boolean;
  /** 是否启用 sse 功能 */
  sse: boolean;
}
```

## 更新配置

我们使用 useConfigStorehook 提供的 updateConfig 方法来更新配置。

```ts
import { useConfigStore } from '@/stores/configs/config';
const configStore = useConfigStore();
configStore.updateConfig({
  app : {
    ...
  },
  tabbar : {
    ...
  }
})
```

## 更新字体大小

```ts
import { useConfigStore } from "@/stores/configs/config";
const configStore = useConfigStore();
configStore.updateFontSize(16);
```

## 更新字体样式

```ts
import { useConfigStore } from "@/stores/configs/config";
const configStore = useConfigStore();
configStore.updateFontFamily("字体样式");
```

## 更新主题

```ts
import { useConfigStore } from "@/stores/configs/config";
const configStore = useConfigStore();
configStore.updateTheme("dark");
```

## 更新圆角

```ts
import { useConfigStore } from "@/stores/configs/config";
const configStore = useConfigStore();
configStore.updateRadius(10);
```

## 应用快捷配置

功能概述: 1、组件开发的背景和需求： 1、每个客户都会有自己应用的整体风格，我们可以通过配置不同主题的方式来灵活的切换应用主题风格，满足用户需求。 2、每个客户对于字体大小和字体样式，也有对应的需求，有些希望字体大一些，希望有其他的字体样式，所以我们也可以通过配置来快速切换字体大小和字体样式。 3、支持多种导航布局，满足客户需求。 为了满足客户需求，我们设计的功能清单如下： 2、功能清单： 1、切换主题 2、切换导航布局 3、侧边栏 4、面包屑导航 5、标签栏 6、顶栏 6、通用功能 3、组件依赖：ant-design-vue，vue-draggable-plus。

数据结构:

```ts
interface GlobalConfig {
  /** 应用全局配置 */
  app: AppConfig;
  /** 登录配置 */
  auth: AuthConfig;
  /** 面包屑导航配置 */
  breadcrumb: BreadcrumbConfig;
  /** 顶栏配置 */
  header: HeaderConfig;
  /** 侧边栏配置 */
  sidebar: SidebarConfig;
  /** 标签栏配置 */
  tabbar: TabbarConfig;
  /** 页面切换动画配置 */
  transition: TransitionConfig;
  /** 导航菜单配置 */
  navigation: NavigationConfig;
  /** logo 配置 */
  logo: LogoConfig;
  /** 应用的功能配置 */
  ability: Ability;
}
```

单系统下的菜单层级： 一级菜单： 1、应用快捷配置 二级菜单（图片）： 1、主题 2、布局 1、导航栏 2、侧边栏 3、标签栏 4、顶栏 5、面包屑导航 3、通用功能 1、水印 2、切换字体大小和字体样式 3、页面跳转动画

多系统下的菜单层级： 一级菜单： 1、应用系统名称 二级菜单： 1、应用快捷配置 三级菜单： 1、主题 2、布局 1、导航栏 2、侧边栏 3、标签栏 4、顶栏 5、面包屑导航 3、通用功能 1、水印 2、切换字体大小和字体样式 3、页面跳转动画 配置数据管理： 配置数据前端浏览器本地持久化（localStorage），后续可以将数据保存到数据库中，通过接口的方式提供。每个系统都保存各自的配置数据。
