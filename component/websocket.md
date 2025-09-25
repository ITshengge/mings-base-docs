# websocket 功能

实际开发过程中，我们会使用 webscoket 与后端进行通信，当后端有数据推送过来，前端就能接收到消息，并将数据展示到页面上。我们封装的 websocket 功能，内置了 websocket 连接，心跳检测，超时重连这三个主要的功能，可以根据项目需要进行配置。

---

## 功能介绍

websocket 功能被封装在@/services/communication/socket 目录下，该功能包括三个类：SocketClient 类，Socket 类，ClientManager 类。

- 1、SocketClient 类：该类主要用于创建和管理 Socket 实例，在项目中，我们只需要创建一次 SocketClient 类的实例，然后通过调用该实例的 create 方法创建多个 socket 对象，来满足业务中可能需要多个 socket 的需求。当不需要该 socket 对象时，我们可以调用 SocketClient 实例的 delete 方法，来删除该 socket 对象并断开 socket 连接。

```ts
import { SocketClient } from "@/services/communication";
const socketClient = new SocketClient();
const socket = socketClient.create({
  url: "ws://localhost:3000",
});
// 删除socket
scoketClient.delete(socket);
// 清空socket
socketClient.clear();
// 获取socket，这个方法外部用的比较少，因为在创建的时候，就已经返回了。
const currentSocket = socketClient.get(id);
```

- 2、Socket 类：该类主要用于连接 socket，内置心跳检测，超时重连功能，当我们连接 socket 成功之后，我们可以调用 socket 对象的 onMessage 方法来监听服务端推送过来的消息，调用 onError 方法，当连接异常时，我们可以对异常情况进行响应的处理，调用 onClose 方法，当连接关闭后，我们可以进行相应的逻辑处理。

```ts
import { SocketClient } from "@/services/communication";
const socketClient = new SocketClient();
const socket = socketClient.create({
  url: "ws://localhost:3000",
});
socket.onMessage((evt: MessageEvent) => {
  console.log(evt.data);
});
socket.onError((evt: MessageEvent) => {
  console.log("连接异常");
});
socket.onClose((evt: MessageEvent) => {
  console.log("连接关闭");
});
```

- 3、ClientManager 类，该类主要是用于管理通过 ScoketClient 实例的 create 方法创建的 socket 对象。当我们创建 SocketClient 实例时，这个 ClientManager 会挂载在该实例中。不会暴露给外部使用。

---

## 使用方法

引入 SocketClient，并创建 SocketClient 实例，调用 SocketClient 对象的 create 方法，创建 websocket 实例。

```ts
import { SocketClient } from "@/services/communication";
const socketClient = new SocketClient();
const socket = socketClient.create({
  url: "ws://localhost:3000",
});
// 接收消息
socket.onMessage((evt: MessageEvent) => {
  console.log(evt.data);
});
// 处理连接异常
socket.onError((evt: MessageEvent) => {
  console.log("连接异常");
});
// 关闭连接
socket.onClose((evt: MessageEvent) => {
  console.log("连接关闭");
});
```

如果项目可能存在多个 socket，那么我们可以将 socketClient 保存在 vue 的全局属性中，这样我们就可以在任何地方都能获取到 socketClient 对象来创建 socket 对象。需要注意的是，当我们关闭页面时，一定要删除这个 socket 对象。

```ts
import { SocketClient } from "@/services/communication";
import { getCurrentInstance } from "vue";
const socketClient = new SocketClient();
const current = getCurrentInstance()!;
// 挂载到vue的全局属性中
current.appContext.config.globalProperties.$socketClient = socketClient;
```

---

## 创建 socket 对象时的 options 属性（SocketParams）

| 参数              | 说明                                                                 | 类型    | 默认值                                                                 | 是否必填 |
| ----------------- | -------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------- | -------- |
| url               | socket 地址                                                          | string  | -                                                                      | 是       |
| heartBeat         | 心跳数据                                                             | string  | `{question: "", history: [], status_code: 2, page: "heartBeatContent"}` | 否       |
| heartBeatDuration | 发送心跳间隔时长，默认每隔 5 秒一次，设置为 0 表示不需要发送心跳检测 | number  | 5000                                                                   | 否       |
| reconnectCount    | 重连次数，默认 5 次，设置为 0 表示不限次数（直到成功）               | number  | 5                                                                      | 否       |
| needHeartBeat     | 是否需要发送心跳检测                                                 | boolean | false                                                                  | 否       |
| needReconnect     | 是否需要重连                                                         | boolean | true                                                                   | 否       |

---

## socket 实例的方法

| 属性          | 说明         | 类型                                            | 默认值 | 是否必填 |
| ------------- | ------------ | ----------------------------------------------- | ------ | -------- |
| sendHeartBeat | 发送心跳数据 | () => void                                      | -      | 否       |
| disconnect    | 关闭连接     | () => void                                      | -      | 否       |
| onMessage     | 监听消息     | (callback: (evt: MessageEvent) => void) => void | -      | 否       |
| onError       | 监听连接异常 | (callback: (evt: MessageEvent) => void) => void | -      | 否       |
| onOpen        | 监听连接成功 | (callback: (evt: MessageEvent) => void) => void | -      | 否       |
| onClose       | 监听连接关闭 | (callback: (evt: MessageEvent) => void) => void | -      | 否       |
