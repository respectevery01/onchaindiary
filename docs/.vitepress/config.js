import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '链上日记',
  description: '区块链技术文档与博客集合',
  lang: 'zh-CN',
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css' }],
  ],
  
  vite: {
    css: {
      postcss: {},
      preprocessorOptions: {
        scss: {
          additionalData: `@import ".vitepress/theme/custom.css";`
        }
      }
    }
  },
    
  themeConfig: {
    outline: {
      level: [2, 6],
      label: '页面导航'
    },
    
    nav: [
      { text: '主页', link: '/' },
      { 
        text: '技术文档', link: '/docs/' 
      },
      { 
        text: '博客', link: '/blog/' },
      { text: '原创文章', link: '/write/' },
      { text: '关于', link: '/about' },
    ],

    sidebar: {
      '/': [
        {
          text: '📖 文档导航',
          items: [
            { text: 'Inco 网络文档', link: '/inco/' },
          ]
        }
      ],
      '/inco/': [
        {
          text: '🚀 快速开始',
          collapsed: false,
          items: [
            { text: '概述', link: '/inco/quickstart/' },
            { text: '快速开始指南', link: '/inco/quickstart/quickstart' },
            {
              text: '教程',
              collapsed: false,
              items: [
                { text: '构建机密代币', link: '/inco/quickstart/tutorials/build-confidential-token' },
                {
                  text: 'Hardhat 指南',
                  collapsed: true,
                  items: [
                    { text: '环境设置', link: '/inco/quickstart/tutorials/hardhat-guide/set-up-environment-for-hardhat' },
                    { text: '合约设置', link: '/inco/quickstart/tutorials/hardhat-guide/set-up-the-contract' },
                    { text: '理解机密 ERC-20', link: '/inco/quickstart/tutorials/hardhat-guide/understand-the-confidential-erc-20' },
                    { text: '合约函数', link: '/inco/quickstart/tutorials/hardhat-guide/contract-functions' },
                    { text: '完整合约实现', link: '/inco/quickstart/tutorials/hardhat-guide/complete-contract-implementation' }
                  ]
                },
                {
                  text: 'Foundry 指南',
                  collapsed: true,
                  items: [
                    { text: '设置', link: '/inco/quickstart/tutorials/foundry-guide/setup' },
                    { text: '在合约中导入 Inco', link: '/inco/quickstart/tutorials/foundry-guide/import-inco-in-your-contract' },
                    { text: '测试合约', link: '/inco/quickstart/tutorials/foundry-guide/test-your-contract' }
                  ]
                }
              ]
            },
            {
              text: '参考',
              collapsed: true,
              items: [
                { text: 'Cheatcode 参考', link: '/inco/quickstart/reference/cheatcode-reference' },
                { text: '参考库', link: '/inco/quickstart/reference/reference-library' }
              ]
            }
          ]
        },
        {
          text: '🔧 Solidity 开发',
          collapsed: false,
          items: [
            { text: '介绍', link: '/inco/solidity/' },
            {
              text: '架构',
              collapsed: false,
              items: [
                { text: '概述', link: '/inco/solidity/architecture/overview' },
                { text: '组件', link: '/inco/solidity/architecture/components' },
                { text: '解密机制', link: '/inco/solidity/architecture/decryption-mechanisms' }
              ]
            },
            {
              text: '概念指南',
              collapsed: false,
              items: [
                { text: '概念指南介绍', link: '/inco/solidity/concepts-guide/concepts-guide-introduction' },
                { text: '句柄', link: '/inco/solidity/concepts-guide/handles' },
                { text: '输入', link: '/inco/solidity/concepts-guide/inputs' },
                { text: '操作', link: '/inco/solidity/concepts-guide/operations' },
                { text: '控制流', link: '/inco/solidity/concepts-guide/control-flow' },
                { text: '访问控制', link: '/inco/solidity/concepts-guide/access-control' },
                { text: '解密', link: '/inco/solidity/concepts-guide/decryption' },
                { text: '重加密', link: '/inco/solidity/concepts-guide/reencryption' },
                { text: '最佳实践', link: '/inco/solidity/concepts-guide/best-practices' }
              ]
            }
          ]
        },
        {
          text: '💻 JS SDK',
          collapsed: false,
          items: [
            { text: '概述', link: '/inco/js-sdk/' },
            {
              text: '指南',
              collapsed: false,
              items: [
                { text: 'Next.js 启动器', link: '/inco/js-sdk/guide/nextjs-starter' },
                { text: '在现有项目中使用 IncoJS', link: '/inco/js-sdk/guide/use-incojs-in-existing-project' }
              ]
            }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/respectevery01/onchaindiary' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Onchain Diary'
    },

    search: {
      provider: 'local'
    }
  }
})