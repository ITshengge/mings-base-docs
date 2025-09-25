# 什么是通信功能？

在我们项目中，通信功能指的就是，前端与后端通信的能力，其中包括：http 请求，websocket 通信，订阅消息，sse 以数据流的形式实现的服务端推送。http 请求，我们基于 axios 二次封装，统一请求前和响应后的通用逻辑。其余的 websocket，stomp 订阅消息，sse，我们都统一封装在 commnunication 目录中，通过配置的方式动态导入，把整体的通信功能封装成 vue 插件，以插件的形式去使用，同时将功能挂在在 vue 全局下，方便在项目中的任何组件去使用这些功能，后续就只需要配置是否启用即可，因为是动态导入，所以项目中没有使用的话，这些功能也不会打包，减小包的体积。

> 封装的 websocket，stomp，sse 内部都存在一个 id 唯一标识，目的是用于管理创建出来的实例。

```ts
import { createApp } from "vue";
import App from "./App.vue";
import communication from "@/services/communication";
function initApp() {
  const app = createApp(App);
  app.use(communication).mount("#app");
}
initApp();
```

---

## 如何使用通信功能

当我们以 vue 插件的方式将组件挂载到 vue 全局属性之后，我们可以在任何组件中使用这些通信功能，首先我们需要调用 getCurrentInstance 方法获取当前组件实例，然后通过`currentInstance.appContext.config.globalProperties`获取 vue 的全局属性，然后我们通过`$sseClient`、`$stompClient`、`$websocketClient`获取相关通信功能对象。

```vue
<template></template>

<script lang="ts" setup>
import { getCurrentInstance } from "vue";
const current = getCurrentInstance();
const sseClient = current?.appContext.config.globalProperties.$sseClient;
const stompClient = current?.appContext.config.globalProperties.$stompClient;
const websocketClient =
  current?.appContext.config.globalProperties.$websocketClient;
</script>

<style lang="less" scoped></style>
```

当我们拿到对象之后，就可以通过查看后续文档，使用这些通信功能。
