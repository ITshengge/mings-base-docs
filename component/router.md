# 路由

项目的路由分为静态路由，动态路由，找不到路由。

## 静态路由

静态路由，主要是不需要鉴权就能直接方法的路由。我们可以在 src/router/routes/static.ts 文件中配置。

```ts
/**
 * @author: andy
 * @description: 静态路由
 */
import type { RouteRecordRaw } from "vue-router";
const staticRoutes: RouteRecordRaw[] = [
  {
    path: "/auth",
    name: "auth",
    children: [
      {
        path: "login",
        name: "login",
        meta: {},
        component: () => import("@/pages/cores/login/index.vue"),
      },
      {
        path: "logout",
        name: "logout",
        meta: {},
        component: () => import("@/pages/cores/logout/index.vue"),
      },
    ],
  },
];
export default staticRoutes;
```

## 动态路由

动态路由，主要是需要鉴权才能访问的路由，我们可以在 src/router/routes/dynamic.ts 文件中配置。

```ts
/**
 * @author : andy
 * @description : 动态路由
 */
import type { RouteRecordRaw } from "vue-router";
const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home/workbench",
    name: "root",
    component: () => import("@/layouts/BaseLayout.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        redirect: "/home/workbench",
        children: [
          {
            path: "/home/workbench",
            name: "workbench",
            component: () => import("@/pages/home/workbench/index.vue"),
            children: [],
          },
          {
            name: "analysis",
            path: "/home/analysis",
            component: () => import("@/pages/home/analysis/index.vue"),
            children: [],
          },
        ],
      },
      {
        name: "about",
        path: "/about",
        component: () => import("@/pages/about/index.vue"),
        children: [],
      },
      {
        name: "demo",
        path: "/demo",
        redirect: "/demo/function",
        children: [
          {
            name: "function",
            path: "/demo/function",
            component: () => import("@/pages/demo/function/index.vue"),
            children: [],
          },
          {
            name: "breadcrumb",
            path: "/demo/breadcrumb",
            component: () => import("@/pages/demo/breadcrumb/index.vue"),
            children: [],
          },
          {
            name: "page",
            path: "/demo/page",
            children: [
              {
                name: "iframe",
                path: "/demo/page/iframe",
                children: [
                  {
                    name: "baidu",
                    path: "/demo/page/iframe/baidu",
                    component: () =>
                      import("@/pages/demo/page/iframe/baidu/index.vue"),
                    children: [],
                  },
                  {
                    name: "sina",
                    path: "/demo/page/iframe/sina",
                    component: () =>
                      import("@/pages/demo/page/iframe/sina/index.vue"),
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            name: "login",
            path: "/demo/login",
            component: () => import("@/pages/demo/login/index.vue"),
            children: [],
          },
          {
            name: "icon",
            path: "/demo/icon",
            component: () => import("@/pages/demo/icon/index.vue"),
            children: [],
          },
          {
            name: "watermark",
            path: "/demo/watermark",
            component: () => import("@/pages/demo/watermark/index.vue"),
            children: [],
          },
          {
            name: "fullscreen",
            path: "/demo/fullscreen",
            component: () => import("@/pages/demo/fullscreen/index.vue"),
            children: [],
          },
          {
            name: "download",
            path: "/demo/download",
            component: () => import("@/pages/demo/download/index.vue"),
            children: [],
          },
          {
            name: "copy",
            path: "/demo/copy",
            component: () => import("@/pages/demo/copy/index.vue"),
            children: [],
          },
          {
            name: "notfound",
            path: "/demo/not-found",
            component: () => import("@/pages/demo/not-found/index.vue"),
            children: [],
          },
          {
            name: "popup",
            path: "/demo/popup",
            component: () => import("@/pages/demo/popup/index.vue"),
            children: [],
          },
          {
            name: "drawer",
            path: "/demo/drawer",
            component: () => import("@/pages/demo/drawer/index.vue"),
            children: [],
          },
          {
            name: "layout",
            path: "/demo/layout",
            component: () => import("@/pages/demo/layout/index.vue"),
            children: [],
          },
          {
            name: "drag",
            path: "/demo/drag",
            component: () => import("@/pages/demo/drag/index.vue"),
            children: [],
          },
          {
            name: "form",
            path: "/demo/form",
            children: [
              {
                name: "input",
                path: "/demo/form/input",
                component: () => import("@/pages/demo/form/input/index.vue"),
                children: [],
              },
              {
                name: "select",
                path: "/demo/form/select",
                component: () => import("@/pages/demo/form/select/index.vue"),
                children: [],
              },
            ],
          },
          {
            name: "address",
            path: "/demo/address",
            component: () => import("@/pages/demo/address/index.vue"),
            children: [],
          },
        ],
      },
    ],
  },
];
export default dynamicRoutes;
```

## 找不到路由

找不到路由，当页面匹配不到，就统一跳转到这里，我们可以在 src/router/routes/not-found.ts 文件中配置。

```ts
{
  path: '/:pathMatch(.*)*',
  name: 'not-found',
  component: () => import('@/pages/not-found.vue')
}
```
