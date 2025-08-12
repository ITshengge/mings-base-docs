# 消息订阅功能

很多时候，我们除了要订阅后端推送过来的消息之外，还需要在客户端主动发送消息到后端，这个时候，我们可以使用 stomp 来实现这个功能。消息订阅功能是通过`@stomp/stompjs`这个库来实现的，在使用的时候，如果不清楚，可以查看相关文档[@stomp/stompjs 官方文档](https://stomp-js.github.io/)。

---

## 功能介绍

stomp 功能被封装在`@/services/communication/stomp`目录下，该功能包括三个类：StompClient 类，Stomp 类，ClientManager 类。

- 1、StompClient 类：该类主要用于创建和管理 Stomp 实例，在项目中，我们只需要创建一次 StompClient 类的实例，然后通过调用该实例的 create 方法创建多个 stomp 对象，来满足业务中可能需要多个 stomp 的需求。当不需要 stomp 对象时，我们可以调用 StompClient 实例的 delete 方法，来删除该 stomp 对象并断开连接。

```ts
import { StompClient } from "@/services/communication";
const stompClient = new StompClient();
const stomp = stompClient.create({
  brokerURL: "ws://localhost:8080/ws",
});
// 删除当前的stomp
stompClient.delete(stomp);
// 清空所有的stomp
stompClient.clear();
// 获取当前 stomp对象
const currentStomp = stompClient.get(id);
```

- 2、Stomp 类：该类主要用于连接 socket，在 rabbitmq 或者 rocketmq 中一般都会支持 stomp 协议连接方式，通常用于这种消息队列的消息通信，内置超时重连功能，当我们连接成功之后，我们可以调用 stomp 对象的 subscribe 方法监听某个主题的消息，也可以调用 sendMessage 方法，主动发送消息。

```ts
import { StompClient } from "@/services/communication";
import type { IMessage } from "@stomp/stompjs";
const stompClient = new StompClient();
const stomp = stompClient.create({
  brokerURL: "ws://localhost:8080/ws",
  // 登录账号和密码，如果需要的话
  connectHeaders: {
    login: "xxx",
    passcode: "xxx",
  },
});
// 订阅某个主题的消息
stomp.subscribe("/topic/queue", (message: IMessage) => {
  console.log(message);
});
// 客户端主动发送消息
stomp.sendMessage({
  destination: "/topic/chat",
  body: "hello",
});
```

- 3、ClientManager 类，该类主要是用于管理通过 StompClient 实例的 create 方法创建的 socket 对象。当我们创建 StompClient 实例时，这个 ClientManager 会挂载在该实例中。不会暴露给外部使用。

---

## 使用方法

引入 StompClient，并创建 ScoketClient 实例，调用 SocketClient 对象的 create 方法，创建 stomp 实例。

```ts
import { StompClient } from "@/services/communication";
import type { IMessage } from "@stomp/stompjs";
const stompClient = new StompClient();
const stomp = stompClient.create({
  brokerURL: "ws://localhost:8080/ws",
  // 登录账号和密码，如果需要的话
  connectHeaders: {
    login: "xxx",
    passcode: "xxx",
  },
});
// 订阅某个主题的消息
stomp.subscribe("/topic/queue", (message: IMessage) => {
  console.log(message);
});
// 客户端主动发送消息
stomp.sendMessage({
  destination: "/topic/chat",
  body: "需要发送的消息",
});
```

如果项目可能存在多个 stomp，那么我们可以将 stompClient 保存在 vue 的全局属性中，这样我们就可以在任何地方都能获取到 stompClient 对象来创建 stomp 对象。需要注意的是，当我们关闭页面时，一定要删除这个 stomp 对象。

```ts
import { StompClient } from "@/services/communication";
import { getCurrentInstance } from "vue";
import type { IMessage } from "@stomp/stompjs";
const stompClient = new StompClient();
// 挂载到vue的全局属性中
const current = getCurrentInstance()!;
current.appContext.config.globalProperties.$stompClient = stompClient;
```

## 创建 stomp 对象时的 options 属性

我们创建的 stomp 对象时传入的 options 属性，都是来自@stomp/stompjs 这个库的`StompConfig`类型中，除此之外，我们还新增了两个属性，reconnectCount 和 needReconnect。

```ts
import { type StompConfig } from "@stomp/stompjs";
```

我们这里就列一下以下几个属性，其他的大家可以自己去看官方文档。

| 参数           | 说明                               | 类型                                                                     | 默认值 | 是否必填 |
| -------------- | ---------------------------------- | ------------------------------------------------------------------------ | ------ | -------- |
| brokerURL      | 连接的 socket 地址                 | string                                                                   | -      | 是       |
| connectHeaders | 连接的头信息，一般是设置账号和密码 | `Record<string , any>，一般我们就配置{login: string; passcode: string;}` | -      | 否       |
| needReconnect  | 是否需要重连                       | boolean                                                                  | true   | 否       |
| reconnectCount | 重连次数                           | number                                                                   | 5      | 否       |

---

## stomp 对象的方法

| 属性        | 说明     | 类型                                                                                             | 默认值 | 是否必填 |
| ----------- | -------- | ------------------------------------------------------------------------------------------------ | ------ | -------- |
| subscribe   | 订阅消息 | (queueName: string , callback: (message: IMessage) => void) =>void                               | -      | 否       |
| sendMessage | 发送消息 | `(options: IPublishParams) => void，一般只需要传入{destination: '消息主题' , body : '消息内容'}` | -      | 否       |
| disconnect  | 断开连接 | () => void                                                                                       | -      | 否       |
