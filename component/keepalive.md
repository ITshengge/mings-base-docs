# 页面缓存

我们通过控制配置项中的`tabbar.keepAlive`来开启页面缓存。除了 tabbar.keepAlive = true 设置为 true 之外，我们还需要在通过接口获取菜单的列表中设置哪些菜单页面需要缓存，给菜单项添加一个 isKeepAlive 属性并设置为 true，或者在配置的路由文件中，对单个路由的 meta 字段添加一个 isKeepAlive 属性并设置为 true。

缓存的页面 vue 组件都需要定义一个 name 属性，当项目运行的时候，我们会获取菜单列表和自己定义的路由列表，分别把配置了 isKeepAlive 属性为 true 的页面路径保存在`keepAlivePages`中。并最终作为 keep-alive 组件的 include 属性。

```vue
<router-view v-slot="{ Component }" v-if="isReload">
  <transition :name="config.transition.name" appear>
    <KeepAlive :include="accessStore.keepAlivePages">
      <component :is="Component" />
    </KeepAlive>
  </transition>
</router-view>
```

```ts
config: {
  tabbar: {
    keepAlive: true;
  }
}
```

- 1、通过接口获取菜单列表，并设置需要缓存的菜单页面，如果接口没有返回 isKeepAlive 字段，而是其他字段，那么前端要先格式化数据，添加一个 isKeepAlive 字段。

```ts
// 这里是通过mockjs模拟接口请求返回的菜单列表数据
{
  'get|/mock/auth/menu/list' : () => {
    return {
      data : Mock.mock([
        {
          name : '关于',
          path : '/about',
          isKeepAlive : true,
          icon : 'https://unpkg.com/@vbenjs/static-source@0.1.7/source/avatar-v1.webp',
          children : []
        }
      ] as DeepPartial<AccessMenuItem[]>)
    }
  }
}
```

- 2、配置路由给 meta 添加 isKeepAlive 字段，配置当前页面是否需要被缓存。

```ts
const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home/workbench",
    name: "root",
    component: () => import("@/layouts/BaseLayout.vue"),
    children: [
      {
        name: "about",
        path: "/about",
        meta: {
          isKeepAlive: true,
        },
        component: () => import("@/pages/about/index.vue"),
        children: [],
      },
    ],
  },
];
```

以上两种方式都可以，底层代码会去重处理，所以不管你是写一种，还是写两种都行，这么设计的目的是，因为有些页面可能不是通过菜单接口返回的，而是用户定义路由写死的，但是这个页面也需要被缓存，这个时候，除了接口返回的菜单数据之外，还需要在路由上面对这个页面做单独的配置。

---

## 注意点

当我们配置了页面缓存之后，onActivated 在组件挂载时也会调用，并且 onDeactivated 在组件卸载时也会调用，当前的页面在切换后就不会被卸载，所以如果在页面中有 onBeforeUnmounted 的逻辑处理，就需要放在 onDeactivated。

我们还需要给每一个需要缓存的页面的.vue 组件添加一个 name 属性，因为 vue 的 keep-alive 组件需要，我们需要手动定义一个。其他我们就可以不用管了，代码内部会去获取到这个 name 并添加到对应`keepAlivePages`中。

```vue
<template></template>

<script lang="ts" setup>
defineOptions({
  name: "组件名称",
});
</script>

<style lang="less" scoped></style>
```
