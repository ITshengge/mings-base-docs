import type { UserConfig } from 'vitepress'

export const config: UserConfig = {
  base: '/mings-base-docs/',
  title: 'mings-base-frame',
  description: 'a Vue 3 based component library for designers and developers',
  themeConfig: {
    logo: '/images/vite.svg',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-PRESENT Mings contributors'
    },
    algolia: {
      apiKey: 'your_api_key',
      indexName: 'index_name'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/component/what-is-mings-base-frame' }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/vangleer' }],
    sidebar: {
      '/component/': [
        {
          text: '简介',
          items: [
            {
              text: 'mings-base-frame',
              link: '/component/what-is-mings-base-frame'
            },
            {
              text: 'mings-base-frame 开发模式',
              link: '/component/dev-mode'
            },
            {
              text: '基础框架配置',
              link: '/component/config'
            },
            {
              text: '集成功能',
              link: '/component/integration'
            },
            {
              text: '文件结构',
              link: '/component/structure'
            },
            {
              text: '离线安装开发环境',
              link: '/component/offline-env'
            },
          ]
        },
        {
          text: '开发规范',
          items: [
            {
              text: '代码审查规范',
              link: '/component/eslint'
            },
            {
              text: '代码提交规范',
              link: '/component/commit'
            },
            {
              text: '项目部署',
              link: '/component/deploy'
            },
            {
              text: '接口管理',
              link: '/component/api'
            },
            {
              text: 'ts类型管理',
              link: '/component/ts-type'
            },
            {
              text: '项目开发规范',
              link: '/component/dev-standard'
            },
            {
              text: '路由',
              link: '/component/router'
            },
            {
              text: '样式规范',
              link: '/component/style'
            },
            {
              text: '国际化',
              link: '/component/i18n'
            },
          ]
        },
        {
          text: '通信功能',
          items: [
            {
              text: '什么是通信功能？',
              link: '/component/communication'
            },
            {
              text: 'websock功能',
              link: '/component/websocket'
            },
            {
              text: '消息订阅功能',
              link: '/component/stomp'
            },
            {
              text: 'sse功能',
              link: '/component/sse'
            },
          ]
        },
        {
          text: '基础功能',
          items: [
            {
              text: '换肤功能',
              link: '/component/theme'
            },
            {
              text: '统一用户登陆功能',
              link: '/component/auth'
            },
            {
              text: '数据mock功能',
              link: '/component/mock'
            },
            {
              text: '自动生成配置文件',
              link: '/component/config-gen'
            },
            {
              text: '页面缓存',
              link: '/component/keepalive'
            },
          ]
        },
      ]
    }
  }
}

export default config
