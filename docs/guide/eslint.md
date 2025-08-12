# 代码审查规范

mings-base-frame 前端基础框架使用 eslint 实现代码审查规范。eslint 配置规则包括：基础规则、代码风格规则、错误保护规则、ts 类型规则、vue 代码规则等。当我们在本地开发时的规范。

> 如果代码不需要 eslint 规范，能本地不报错，并且右边标识用，提交代码前请务必规范 eslint 代码规范。只有满足条件才会成功。

## 基础规则

```json
{
  // 禁止使用未声明的变量
  "no-undef": "error",
  // 禁止声明未使用的变量
  "no-unused-vars": ["error", { "args": "none" }],
  // 强制使用===或者!==判断相等或者不相等
  "eqeqeq": "error",
  // 禁止使用var，声明变量使用let，const
  "no-var": "error",
  // 声明后未修改的变量强制用 const
  "prefer-const": "error",
  // 禁止重复声明变量
  "no-redeclare": "error"
}
```

## 代码风格规则

```json
{
  // 强制缩进风格，2空格
  "indent": ["error", 2],
  // 强制分号结尾
  "semi": "off",
  // 强制不要在对象/数组尾随逗号
  "comma-dangle": "error",
  // 关闭对象大括号内空格{ xxx }
  "object-curly-spacing": "off",
  // 箭头函数参数括号，当只有一个参数并知道类型，就不需要使用括号，其他情况都需要使用括号
  "arrow-parens": ["error", "as-needed"]
}
```

## 错误保护规则

```json
{
  // 禁止对象字面量重复键名
  "no-dupe-keys": "error",
  // 禁止不可达代码（如 return 后的语句）
  "no-unreachable": "error"
}
```

## ts 类型规则

```json
{
  // 禁止使用 any 类型
  "@typescript-eslint/no-explicit-any": "error",
  // 禁止声明未使用的变量
  "@typescript-eslint/no-unused-vars": "error",
  // 强制类型导入风格（如 import type）
  "@typescript-eslint/consistent-type-imports": "error"
}
```

## vue 代码规则

```json
{
  // 组件名不必须多单词
  "vue/multi-word-component-names": "off"
}
```

目前只定义了上述代码规范，后续在实际开发中，如需新增规则可统一再去新增。
