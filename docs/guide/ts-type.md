# ts 类型管理

mings-base-frame 前端基础框架里，要求必须所有的数据都要有类型，而不是通过 any 或者其他不确定的类型去替代，同时我们整个框架也配置了 eslint 代码规范的警告，其中一条就是不允许使用 any，所以大家开发的过程中一定要注意类型的声明，如果不熟悉，建议大家去看一下[Typescript 官方文档](https://www.tslang.cn/)。

::: danger
主要的事情说三遍，不要写 any，不要写 any，不要写 any，写了也没用，代码会运行不起来，代码也提交不上去，所以大家还是死了这条心吧，要求是严格了一点，但是当我们都是按照规范去开发的时候，尤其是多人协作开发，项目不停穿插进行时，大家再也不会那么痛苦了，请一定要相信我。
:::

## ts 类型声明

整个框架中，src/types 目录就是用来管理整个项目的 ts 类型声明文件的。ts 类型声明文件的格式如下：

```ts
declare namespace 命名空间名称 {
  interface Type1 {}
  interface Type2 {}
}
export = 命名空间名称;
export as namespace 命名空间名称;
```

创建 ts 类型声明文件的时候，要以功能模块划分，将各自的模块的数据类型写在一起，不要随便去定义。

## 使用方法

我们以一个示例来说明，比如现在有一个用户模块，那么我们就需要在 src/types 目录下，创建一个 user.d.ts 的用户类型声明文件。

```ts
declare namespace User {
  /** 用户数据类型 */
  interface Data {
    /** 用户id */
    id: string;
    /** 用户名称 */
    name: string;
    /** 用户年龄 */
    age: number;
    /** 用户地址 */
    address: string;
    /** 用户职业 */
    job: string;
  }
  /** 用户查询所需参数 */
  interface Query {
    /** 用户id */
    id: string;
  }
  /** 用户菜单数据类型 */
  interface Menu {
    /** 菜单id */
    id: string;
    /** 菜单名称 */
    name: string;
    /** 菜单图标 */
    icon: string;
    /** 子菜单 */
    children: Menu[];
  }
}
export = User;
export as namespace User;
```

当我们需要使用用户菜单这个类型的时候，我们就可以这样

```ts
import { ref, onMounted } from "vue";
import { getUserMenuList } from "@/apis/api/user";
import { type User } from "@/types/user";
const menuList = ref<User.Menu[]>([]);
onMounted(async () => {
  const result = await getuserMenuList();
  menuList.value = result.data.list;
});
```

只有通过模块划分，我们的这个 ts 类型声明文件就不会混乱，我们也能快速的在对应的类型声明文件中定义当前模块下的数据类型。

::: danger
还有一点要注意，我们在写 ts 类型的时候，都要写上注释，而且注释必须是/\*_ 类型注释说明 _/这种格式，因为这种格式，我们将鼠标放上去的时候，会有类型提示说明，不要使用//这种。
:::
