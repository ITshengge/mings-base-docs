module.exports = {
  base: '/mings-base-docs/',
  title: "mings-base-frame",
  description: "基于vite/webpack构建的前端基础框架",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "文档", link: "/guide/" },
    ],
    sidebar: [
      {
        title: "简介",
        children: [
          "/guide/what-is-mings-base-frame.md",
          "/guide/dev-mode.md",
          "/guide/config.md",
          "/guide/integration.md",
          "/guide/structure.md",
          "/guide/offline-env.md",
        ],
      },
      {
        title: "开发规范",
        children: [
          "/guide/eslint.md",
          "/guide/commit.md",
          "/guide/deploy.md",
          "/guide/api.md",
          "/guide/ts-type.md",
          "/guide/dev-standard.md",
          "/guide/router.md",
          "/guide/style.md",
          "/guide/i18n.md",
        ],
      },
      {
        title: "通信功能",
        children: [
          "/guide/communication.md",
          "/guide/websocket.md",
          "/guide/stomp.md",
          "/guide/sse.md",
        ],
      },
      {
        title: "基础功能",
        children: [
          "/guide/theme.md",
          "/guide/auth.md",
          "/guide/mock.md",
          "/guide/config-gen.md",
          "/guide/keepalive.md",
        ],
      },
    ],
  },
};
