# mings-base-frame 开发模式

mings-base-frame 的前端基础框架支持两种模式，一种是普通模式，一种是后台管理系统模式，根据具体业务需求选择使用哪一种。

---

## 如何使用

我们只需要在 `src/stores/configs/default.ts`，配置：`app.type` 字段，值可以是 `admin` 或者 `normal`。

```ts
export const defaultConfig: GlobalConfig = {
  app: "admin" | "normal",
};
```
