# 样式规范

mings-base-frame 前端基础框架使用 less 来编写样式，其中我们定义了很多 less 方法，用于项目开发，其中主要方式都是为了解决换肤的问题。

## 布局

项目布局尽量都使用 flex 布局或者 grid 布局。

## 像素单位

因为我们的屏幕适配功能是使用 rem 方式来实现，所以只要是用 px 的地方我们都要改用 rem 来开发，比例是：1rem = 100px，比如设计稿是 20px，那么我们就要写成 0.2rem。字体大小，边距，间距，宽度，高度，边框宽度等，只要是 px 的，我们都要改成 rem。

## 字体大小

我们定义了专门的字体大小的 css 变量。

```css
:root {
  --font-size-small: 0.12rem;
  --font-size-base: 0.14rem;
  --font-size-medium: 0.16rem;
  --font-size-large: 0.18rem;
  --font-size-larger: 0.2rem;
}
```

当我们在开发中，遇到需要设置字体大小时，统一使用这种方式。

```less
.box {
  font-size: var(--font-size-base);
}
```

## 字体样式

我们定义了专门的字体样式的 css 变量。

```css
:root {
  --font-family: sans-serif;
}
```

当我们在开发中，遇到需要设置字体样式时，统一使用这种方式。

```less
html,
body {
  font-family: var(--font-family);
}
```

## 圆角

我们定义了专门的圆角的 css 变量。

```css
:root {
  --radius: 0.04rem;
}
```

当我们在开发中，遇到需要设置圆角时，统一使用这种方式。

```less
.box {
  border-radius: var(--radius);
}
```

## 颜色

这里的颜色变量，包括：color(文本颜色)、border-color(边框色)、background-color(背景色)。我们规定所有类于颜色的样式，我们需要变量去使用 .useTheme 方法去定义。具体使用参考相关文档。

```less
.box {
  .useTheme({
    color: text-color;
    background-color: page-bg-color;
    border-color: border-color
  });
}
```

## 背景图片

我们规定所有的关于背景图片的样式，我们都要使用 .useBg 方法来定义。具体使用参考相关文档。

## 渐变色

渐变色，包括背景渐变色和文本渐变色，我们可以使用 .useBgGradientColor 和.useTextGradientColor 方法来实现，具体使用参考相关文档。
