# 数据 mock 功能

mings-base-frame 基础框架使用 mockjs 来模拟接口请求数据。如果你想要使用`mockjs`来模拟数据，首先要学会 mockjs 的常用的语法即可。具体请参考[mockjs 官方文档](https://github.com/nuysoft/Mock/wiki)。提供这样的功能的目的就是在前后端并行开发时，我们前端不需要依赖后端提供正式接口前，通过模拟接口请求数据，完成前后端交互的逻辑。等到后端开发完接口之后，我们只需要将 mock 接口替换为正式接口即可。

在基础框架中，我们统一封装了 mockjs 模拟接口请求的功能，这使得我们能够更加规范的使用该功能。

```ts
import Mock from "mockjs";
const modules: Record<string, { [key: string]: unknown }> = import.meta.glob(
  "./modules/**/*.ts",
  {
    eager: true,
  }
);
let apiList: [string, () => unknown | object][] = [];
Object.entries(modules).forEach((module) => {
  const moduleObj = module[1] as {
    default: Record<string, () => unknown | object>;
  };
  const list = Object.entries(moduleObj.default);
  apiList = apiList.concat(list);
});
apiList.forEach(([path, result]) => {
  const protocol = path.split("|");
  const [method, url] = protocol;
  Mock.mock(new RegExp("^" + url), method, result);
});
```

---

## mock 接口管理

我们将 mock 接口都放在`src/apis/mock`目录下，在这个目录下，我们可以根据功能模块去管理接口，`mock接口和正式接口的目录结构，文件名都要是一样的，包括接口请求方法和请求参数也都应该是一样的，他们只有接口地址是不同的`，我们可以这样划分接口管理（包含正式接口和 mock 接口）：

```text
apis
├─ api # 管理正式接口的目录
│  ├─ user.ts # 管理用户登录、登出、用户信息、用户菜单、用户权限功能的接口文件
│  │
│  ├─ module1.ts #  管理module1功能模块的接口文件
│  │
│  └─ module2.ts #  管理module2功能模块的接口文件
└─ mock # 管理mock接口的目录
   ├─ user.ts # 管理用户登录、登出、用户信息、用户菜单、用户权限功能的接口文件
   │
   ├─ module1.ts #  管理module1功能模块的接口文件
   │
   └─ module2.ts #  管理module2功能模块的接口文件
```

---

## mock 接口请求数据管理

我们将模拟的接口请求数据都统一在`src/mock`目录下进行，我们统一封装了`mockjs`的接口请求方式，只需要按照我们的规范标准去生成对应的请求数据即可。具体规范如下：

```ts
// 方式1：返回键是一个函数，返回一个对象
请求方式(get/post/put/delete)|请求地址: () => {
  return {
    data : '请求返回的数据',
    code : '响应状态码，通常是 200',
    msg : '响应文本描述，通常是 success'
  }
}
// 方式2：键是一个对象
请求方式(get/post/put/delete)|请求地址: {
  data : '请求返回的数据',
  code : '响应状态码，通常是 200',
  msg : '响应文本描述，通常是 success'
}
```

---

## 使用方式

我们在`src/mock/modules`目录下，按照功能模块划分，新建一个文件，用于生成这个功能模块下所有的接口请求需要生成的模拟数据，比如目前有一个用户模块，我们需要模拟用户接口请求生成对应的数据。

```ts
// 文件：src/mock/modules/user.ts
import Mock from "mockjs";
export default {
  // 模拟生成用户列表的数据
  "get|/mock/user/list": () => {
    return {
      data: Mock.mock({
        "list|10": [
          {
            id: "@id",
            name: "@cname",
            title: "@ctitle",
            content: "@cparagraph",
            date: "@datetime",
          },
        ],
      }),
      code: 200,
      msg: "success",
    };
  },
  // 模拟生成用户详情的数据
  "get|/mock/user/detail": () => {
    return {
      data: Mock.mock({
        id: "@id",
        name: "@cname",
        title: "@ctitle",
        content: "@cparagraph",
        date: "@datetime",
      }),
      code: 200,
      msg: "success",
    };
  },
  // 模拟生成用户菜单列表的数据
  "get|/mock/user/menu/list": {
    data: Mock.mock({
      "list|10": [
        {
          menuName: "@ctitle",
          menuId: "@id",
        },
      ],
    }),
    code: 200,
    msg: "success",
  },
};
```

当我们数据模拟完对应的接口请求生成数据之后，我们就需要写模拟接口请求的操作，通常的做法就是配合我们二次封装的 axios 请求。

- 1、第一步，引入封装好的 axios 功能，创建一个 axios 请求模块，这个 axios 请求只负责处理当前功能模块的接口，其他的模块，自己另外单独创建即可。

```ts
import createAxios from "../axios";
const axios = createAxios({
  baseURL: "/mock/user",
});
```

上面代码中，我们的基础路径就是`/mock/user`，表示的是这个 axios 只是负责处理 mock 接口用户数据，这样做的目的就是，我们通过调用 createAxios 方法，创建的每一个 axios 对象，都只是负责自己的模块的接口请求，这样的管理方式，让我们在开发接口的时候不会乱，方便我们的统一维护和管理。其他的比如`/mock/module1`只是处理 module1 接口数据。`正式接口的处理方式也一样，只是没有/mock这一级`。

- 2、编写 api 接口方法

```ts
export function getUserList() {
  return axios({
    method: "get",
    url: "/list",
  });
}
```

我们的请求方式是 get 请求，请求地址为：`/mock/user/list`，所以就能匹配到我们上面定义的对应的接口请求响应的数据，这样我们就完成了模拟接口请求数据的过程。

- 3、接口使用 我们做完上面的所有事情之后，只需要在对应的组件里面去使用接口了。

```ts
import { getUserList } from "@/apis/mock/user";
import { onMounted } from "vue";
onMounted(async () => {
  const result = await getUserList();
  console.log(result);
});
```

- 4、返回的数据展示 模拟接口数据展示

![模拟接口](/images/mock/mock.png)

## 接口返回的数据与 typescript 数据类型

按照规范，我们需要将接口返回的数据都要在一开始写好数据类型，这样我们才能更好的保证项目的稳定性和可维护性，每个数据的类型我们都需要清楚，而不是通过 any 来代替，这样就失去了我们使用 typescript 的意义。而我们写的数据类型怎么和接口请求的数据关联上呢？其实我们在封装 axios 的时候已经做了处理，内部接收一个泛型，当我们调用具体的接口，返回对应的数据，我们就传入对应的 ts 类型。

```ts
import { type User } from "@/types/user";
export function getUserList() {
  return axios<User[]>({
    method: "get",
    url: "/list",
  });
}
```

当我们调用这个接口 api 获取数据时，我们就能正确的知道返回的数据类型是什么。
