# sse 功能

sse 功能，属于服务端推送技术，主要用于 AI 推送的数据。sse，其实也就是一个 http 请求，在前端中，有一个 EventSource 对象，这个对象主要就是用于服务端推送技术，但是这个对象只有 get 请求，而且请求的参数也是 querystring，我们没有办法扩展各种类型的请求参数，所以我们最终自己封装了原生的 xhr 实现了 post 请求，其他的请求方式一般也不会用到。

---

## 功能介绍

sse 功能被封装在`@/services/communication/sse`目录下，该功能包括三个类：SSEClient 类，ServerSentEvents 类，ClientManager 类。

- 1、SSEClient 类：该类主要用于创建和管理 sse 实例，在项目中，我们需要创建 SSEClient 实例，然后调用该实例的 create 方法，创建一个 sse 对象，然后通过调用 post 方法来发送请求，不需要该 sse 对象时，我们可以调用 SSEClient 实例的 delete 方法，来删除该 sse 对象。

```ts
import { SSEClient } from "@/services/communication";
const sseClient = new SSEClient();
const sse = sseClient.create();
// 删除 sse 实例
sseClient.delete(sse);
// 清空 sse 实例
sseClient.clear();
// 获取 sse 实例
sseClient.get(sse.id);
```

- 2、ServerSentEvents 类：该类主要用于创建原生 xhr 对象，发送 post 请求，包括解析接口返回的数据，并通过 onMessage 来接收返回的数据，onError 来处理请求异常。

```ts
import { SSEClient } from "@/services/communication";
const sseClient = new SSEClient();
const sse = sseClient.create();
const xhr = sse.post({
  url: "/xxx",
  body: {
    name: "andy",
  },
  onMessage({ data }) {
    console.log(data);
  },
  onError(evt: any) {
    console.log(evt);
  },
});
```

- 3、ClientManager 类，该类主要是用于管理通过 sseClient 实例的 create 方法创建的 sse 对象。当我们创建 sseClient 实例时，这个 ClientManager 会挂载在该实例中。不会暴露给外部使用。

---

## 使用方法

引入 SSEClient，并创建 SSEClient 实例，调用 SSEClient 对象的 create 方法，创建 sse 实例。

```ts
import { SSEClient } from "@/services/communication";
const sseClient = new SSEClient();
const sse = sseClient.create();
const xhr = sse.post({
  url: "/xxx",
  body: {
    name: "andy",
  },
  onMessage({ data }) {
    console.log(data);
  },
  onError(evt: any) {
    console.log(evt);
  },
});
```

> 这里需要注意的一点，当我们调用 post 方法，返回 xhr 对象，然后当我们切换组件或者页面的时候，我们可能都需要终止之前的请求，这个时候，我们可以通过调用 xhr 对象的 abort 方法来实现。

如果项目可能存在多个地方都需要使用 sse，那么我们可以将创建的 sse 对象保存在 vue 的全局属性中，这样我们就可以在任何地方都能获取到 sse 对象来发送 post 请求。

```ts
import { SSEClient } from "@/services/communication";
const sseClient = new SSEClient();
const sse = sseClient.create();
const current = getCurrentInstance()!;
// 挂载到vue的全局属性中
current.appContext.config.globalProperties.$sse = sse;
```

---

## 发送 post 请求需要的参数

| 参数           | 说明           | 类型                     | 默认值 | 是否必填 |
| -------------- | -------------- | ------------------------ | ------ | -------- |
| headers        | 请求头信息     | Record<string, string>   | {}     | 否       |
| body           | 请求体         | Record<string, string>   | -      | 是       |
| timeout        | 请求超时时间   | number                   | 30 秒  | 否       |
| reconnectCount | 超时重连次数   | number                   | 5      | 否       |
| url            | 请求路径       | string                   | -      | 是       |
| onMessage      | 接收消息的回调 | (...args: any[]) => void | -      | 否       |
| onError        | 请求失败的回调 | (...args: any[]) => void | -      | 否       |
