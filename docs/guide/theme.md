# 换肤功能

mings-base-frame 前端基础框架，采用 less 实现换肤功能。其中功能包括：颜色切换，图片切换。整个主题颜色规范是和 UI 统一商定好的。换肤功能不涉及到 javascript 代码，纯 less 实现，只需要写一遍样式，自动就会编译出多主题下的不同样式，大大节省了大家写样式的时间，提高了开发效率。

::: danger
一定要记住：在写样式的时候，所有的关于颜色（文本颜色，背景色，边框色）和图片，都要使用 less 定义的相关函数去实现，不要写死，不然无法完成换肤功能。
:::

## 颜色主题变量

我们定义了一个@themes 变量对象，默认包含@dark（深色主题）和@light（浅色主题）。整体的样式变量包括：`主题色`，`边框色`，`文本色`，`辅助色`。

```less
@themes: {
  @dark: {
    // 主色，用于选中信息高亮，重要信息高亮，关键行动点，所有与主色相近的颜色，都是通过主色的透明度去修改的不同颜色
    primary-color: #31e080;
    // 边框色，用于边框，分割线颜色
    border-color: #dddfe6;
    // 页面背景色，用于整个页面背景颜色
    page-bg-color: linear-gradient(to top, #f6f9ff, #e4f0fe);
    // 主文字颜色
    text-color: #333;
    // 次要文字颜色
    text-color-secondary: #666;
    // 说明文字颜色
    text-color-desc: #999;
    // 辅助文字颜色
    text-color-helpful: #b7c1cc;
    // 浮层阴影色
    box-shadow-color: 1px 1.7px 3px 2px #daeaff;
    // 基础色
    base-color: #007aff;
    // 成功色
    success-color: #7bbd48;
    // 错误色
    error-color: #ff231a;
    // 警告色
    warning-color: #ff9600;
    // 禁用色
    disabled-color: #f5f5f5;
    // 白色
    white-color: #fff;
  };
  @light: {
    // 主色，用于选中信息高亮，重要信息高亮，关键行动点，所有与主色相近的颜色，都是通过主色的透明度去修改的不同颜色
    primary-color: #2262fb;
    // 边框色，用于边框，分割线颜色
    border-color: #dddfe6;
    // 页面背景色，用于整个页面背景颜色
    page-bg-color: linear-gradient(to top, #f6f9ff, #e4f0fe);
    // 主文字颜色
    text-color: #333;
    // 次要文字颜色
    text-color-secondary: #666;
    // 说明文字颜色
    text-color-desc: #999;
    // 辅助文字颜色
    text-color-helpful: #b7c1cc;
    // 浮层阴影色
    box-shadow-color: 1px 1.7px 3px 2px #daeaff;
    // 基础色
    base-color: #007aff;
    // 成功色
    success-color: #7bbd48;
    // 错误色
    error-color: #ff231a;
    // 警告色
    warning-color: #ff9600;
    // 禁用色
    disabled-color: #f5f5f5;
    // 白色
    white-color: #fff;
  };
};
```

## 主题色

一般来说，一个应用中只有一个主题颜色（不排除有些项目会有 2 个或者 3 个），主题色我们使用的变量是`primary-color`，用于选中信息高亮，重要信息高亮，关键行动点，目前应用中所有与主题色相近的颜色，都是通过主色的透明度去修改的不同颜色。如果有多个主题色，那么就定义多个主题色变量，可以是 primary-color-red，primary-color-blue 等，其中 red 和 blue 可以根据主题颜色的值来定，具体如何定义，自己来定。

## 边框色

当我们在页面上设置`边框`，或者`分割线(列表之间的分割线，组件之间的分割线等)`的时候，我们就可以使用 less 变量`border-color`边框色，然后通过设置边框色的不同透明度，来实现不同的边框色。当我们切换主题的时候，我们就只需要改 border-color 这一个变量即可。

## 文本色

一般来说，一个应用会存在主文字颜色，次要文字颜色，说明文字颜色，辅助文字颜色，比如，页面会存在统一的普通文本颜色，标题文本的颜色，标题说明文字的颜色等。所以我们会通过`text-color`，`text-color-secondary`， `text-color-desc`，`text-color-helpful`这四个 less 变量去实现。整个文本颜色的色值是由深到浅，表示文本内容的重要程度。

- 1、text-color: 表示的是整个应用的统一文本颜色。

- 2、text-color-secondary: 表示的是整个应用中的次要文本颜色。

- 3、text-color-desc: 表示的是整个应用的说明文字颜色。

- 4、text-color-helpful: 表示的是整个应用的辅助文字颜色。

我们最常用的可能就是 text-color 和 text-color-desc。具体视项目需求而定。

## 辅助色

在应用中，会存在一些提示的文字颜色，列表或者表格数据中会存在一些列表的操作功能（新增，添加，删除，查看等），操作按钮，标签列表，禁用按钮，表单验证失败时的文本提示等，这些我们都会使用到辅助颜色。目前我们定义的辅助色包括：`base-color`，`success-color`，`error-color`，`warning-color`，`disabled-color`。

- 1、base-color: 基础色，比如列表中的查看按钮，新增按钮，查询按钮等都可以使用这个基础色。

- 2、success-color: 成功色，比如操作成功的提示。

- 3、error-color: 错误色，比如操作失败的提示，删除按钮，表单验证失败时的提示等都可以使用。

- 4、warning-color: 警告色，验证失败时的文本提示会使用。

- 5、disabled-color: 禁用色，禁用按钮，禁用表单组件等会使用。

## 其他颜色

除了上面定义的颜色变量之外，还有一些额外的颜色变量，包括：`page-bg-color`，`box-shadow-color`，`white-color`，用于辅助应用开发的颜色值。

- 1、page-bg-color: 整个应用的页面背景色。

- 2、box-shadow-color: 整个应用的浮层阴影颜色。

- 3、white-color: 整个应用的白色。

## 使用说明

我们定义了一套完整的 less 方法，用于处理主题色和北京图片的切换，当我们在实际开发过程中，如果遇到有关颜色的 css 样式，我们都需要使用定义好的 less 方法去实现，具体写法如下：

> - 1、颜色样式，包括：文本颜色，边框颜色，背景颜色，我们使用.useTheme()方法来实现。

```less
.box {
  .useTheme({
    color: text-color;
    border-color: border-color;
    background-color: primary-color;
  });
}
```

> - 2、图片，对于背景图片，我们不要使用 img 标签来实现，而是要是背景图片的方式来实现，我们使用.useBg()方法来实现，我们只需要传入图片路径即可。

```less
.box {
  .useBg("@/assets/images/#{}/xxx/xx.png");
}
```

> 注意点：

在使用.useBg()方法的时候，传入图片路径的时候，一定要有一个`#{}`的占位符，这个占位符会被替换为 dark 或者 light。在 src 目录下的 assets/images 目录下，我们需要创建 dark 和 light 目录，对应存放不同主题下的图片。如果需要新增主题的话，那么除了在@themes 变量中，新增一个主题变量，还需要在 assets/images 目录下，新建一个对应主题变量的目录，存放对应主题下的图片。

```less
@themes: {
  @dark: {
    ...;
  };
  @light: {
    ...;
  };
  @custom: {
    ...;
  };
};
```

```text
src
├─ assets 静态资源目录
│  ├─ iconfont 字体样式目录
│  └─ images 图片目录
│     ├─ dark 深色主题的图片目录
│     ├─ light 浅色主题的图片目录
│     └─ custom 第三个主题的图片目录
└─ ...
```

> - 3、如果是同一个颜色变量的近似颜色值，那么我们可以通过修改颜色变量的透明度去实现，而不是重新定义一个颜色变量。

```less
.box {
  .useTheme({
    color: primary-color;
    background-color: primary-color;
  } , 0.6);
}
```

上面代码中，就是定义了样式为主题色透明度 0.6 的颜色，如果文本颜色和背景颜色不同的话，我们可以分开写：

```less
.box {
  .useTheme({
    color: primary-color;
  } , 0.6);
  .useTheme({
    background-color: primary-color;
  } , 0.8);
}
```

> - 4、鼠标 hover 效果，我们可以使用.useHover()方法来实现，用法和 useTheme()方法一样。

```less
.box {
  .useHover({
    background-color: primary-color;
  } , 0.2);
}
```

> - 5、渐变颜色，包括背景色渐变，文本颜色渐变，我们分别可以使用.useBgGradientColor()方法和.useTextGradientColor()方法来实现，我们只需要定义一个 less 颜色变量，比如上面的 page-bg-color，就是一个渐变色。

```less
.box {
  // 背景渐变色
  .useBgGradientColor(page-bg-color);
}
.app {
  // 文本渐变色
  .useTextGradientColor(page-bg-color);
}
```
