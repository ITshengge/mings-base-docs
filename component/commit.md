# 代码提交规范

mings-base-frame 前端基础框架使用 husky + commitizen + cz-customizable 来实现代码提交规范标准。在框架根目录中新建.cz-config.json 文件，配置 git 提交文本描述。

## 配置

```json
{
  "types": [
    { "value": "feat", "name": "特性:    ⚡ 一个新的特性或者功能" },
    { "value": "fix", "name": "修复:    🐛 修复一个Bug" },
    { "value": "docs", "name": "文档:    ✏️  变更的只有文档" },
    { "value": "style", "name": "格式:    💄 空格, 分号等格式修复" },
    { "value": "refactor", "name": "重构:    ♻️  代码重构" },
    { "value": "perf", "name": "性能:    ⚡ 性能优化" },
    { "value": "test", "name": "测试:    ✅ 添加一个测试" },
    { "value": "build", "name": "构建:    ⚡ 影响构建系统或外部依赖项的更改" },
    { "value": "ci", "name": "ci:      👷 更改为我们的CI配置文件和脚本" },
    { "value": "revert", "name": "revert:  ⏪ 代码回退" },
    { "value": "chore", "name": "chore:   📦 重新打包或更新依赖工具等杂活" }
  ],

  "messages": {
    "type": "选择一种你的提交类型:",
    "scope": "选择一个scope (可选):",
    "customScope": "模块名称:",
    "subject": "短描述:\n",
    "body": "长描述，使用'|'换行(可选)：\n",
    "breaking": "非兼容性说明 (可选):\n",
    "footer": "关联关闭的issue，例如：#1, #2(可选):\n",
    "confirmCommit": "确定提交?"
  },
  "allowCustomScopes": true,
  "allowBreakingChanges": ["feat", "fix"],
  "subjectLimit": 100
}
```

## 代码提交格式

```json
<type>(<scope>): <subject>
<body>
<footer>
```

提交分为上面三个部分：

1、标题行：必填, 描述主要修改类型和内容。

2、主题内容: 描述为什么修改, 做了什么样的修改, 以及开发的思路等等。

3、页脚注释: 放 Breaking Changes 或 Closed Issues，这个不需要管。

## 提交类型

- feat: 新功能、前功能
- fix: 修复 Bug
- docs: 文档变更
- style: 代码格式(不影响代码运行的变动)
- refactor: 代码重构
- perf: 性能优化
- test: 增加测试
- build: 构建相关
- ci: 持续集成
- chore: 其他修改, 比如构建流程、依赖管理
- revert: 回退

## 短描述（subject）

简明扼要，建议不超过 50 个字符。

## 长描述（body）

详细描述本次提交的内容、原因、影响等。

> 比如：1、修改样式 | 2、新增登录功能 | 3、新增 xxx 模块

## footer

一条或多条，主要用于关闭 issue。

## 使用方式

当我们开发完一个功能后，我们使用 yarn commit 提交代码，就不要使用 git commit 去提交。接下来，我将以图文并茂的方式给大家展示如果使用 husky 提交代码。

1. 执行 yarn commit 命令，选择我们需要的提交类型，选择之后，回车。

![yarn commit 选择类型](/images/commit/commit1.png)

2. 填写短描述（subject），也就是本次提交的主要概述，输入完之后，回车。

![yarn commit 填写描述](/images/commit/commit2.png)

3. 填写长描述，使用"|"换行，也就是对本次提交的代码进行具体的描述，可以使用"|"换行，你这次提交代码，具体做了哪些功能，输入完之后，回车。

![yarn commit 校验](/images/commit/commit3.png)

4. 当我们输入完之后，就回车，提交代码。

![yarn commit 平台展示](/images/commit/commit4.png)

5. 当我们把代码提交到 gitlab 之后，就会展示成这样，这样我们可以很明确的知道，每次的提交都做了什么功能。

![yarn commit 平台展示](/images/commit/commit5.png)
