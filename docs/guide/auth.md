# 统一用户登录功能

在实际项目开发中，通常我们都会实现用户登录的功能。目前我们基本上所有的项目都会接入用户中心，在前端我们会依赖`account-auth-sdk`包来实现用户统一登录功能。

---

## 如何使用

- 1、引入`account-auth-sdk`包，我们需要把`account-auth-sdk`包手动的放到`node_modules`中。
- 2、我们在`src/services/auth.ts`里封装了基于`account-auth-sdk`包的登录功能类，我们可以直接使用。
- 3、在全局路由守卫中写用户登录的逻辑，具体代码写在`src/router/guard.ts`中。
- 4、在`vite.config.ts`或`vue.config.ts`配置文件中，配置用户登录需要用到的接口代理。

---

## 用户登录逻辑

项目中的用户登录逻辑具体如下：

- 1、初始化 authClient 实例，传入用户登录需要的配置数据。
- 2、检查用户是否已经登录，如果没有登录，则登录。
- 3、登录成功，则会返回一个`{url: 重定向地址}`对象，这个 url 就是我们访问页面的地址，这样在登录成功后，就会跳转到对应的页面；登录异常，则会返回一个布尔值`false`，那么我们直接在 router.beforeEach 钩子中返回 false，这样页面就会一直白屏，表示用户登录失败了。
- 4、捕获登录报错，如果登录报错了（这里指的是登录接口报错了），那么就会重新登录。
- 5、token 过期，那么会在 axios 的响应拦截器里，重新刷新 token 后，重新请求接口。

---

## 用户登录配置

项目中会需要用到的用户登录配置如下：

```ts
{
  dev : true,
  clientId : 'base-frame-app',
  clientSecret : '0agg0x3g2pwaart5cnp4vo0h0r4wk1t58coqks3ct4iazlxixoj1jsrm797yuqzi',
  requestTimeout : 60000,
  authServerIp : '10.44.52.219',
  authServerPort : 23001,
  authServerSsl : false,
  loginRedirectUri : window.location.origin,
  proxyPath : '/authentication-server',
  terminalType : 'web',
  logoutTogether : false,
  appCode : ''
}
```

## 配置说明

```ts
// 用户中心配置
interface AuthConfig {
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
  heartbeatPath: string;
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

## 项目中的用户登录接口代理

```ts
import { defineConfig } from "vite";
export default defineConfig(() => {
  return {
    server: {
      proxy: {
        "/authentication-server/": {
          target: "http://10.44.52.219:23001/",
          rewrite: (path) => path.replace(/^\/authentication-server/, ""),
        },
        "/account-server/": {
          target: "http://10.44.52.219:23000/",
          rewrite: (path) => path.replace(/^\/account-server/, ""),
        },
      },
    },
  };
});
```
