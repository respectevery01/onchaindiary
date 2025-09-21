import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '链上日记',
  description: '区块链技术文档与博客集合',
  lang: 'zh-CN',
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
      '/docs/': [
        {
          text: '📖 文档导航',
          items: [
            { text: 'Inco 网络文档', link: '/docs/inco/' },
            { text: '其他项目文档', link: '/docs/others/' }
          ]
        }
      ],
      '/docs/inco/': [
        {
          text: '🚀 快速开始',
          collapsed: false,
          items: [
            { text: '概述', link: '/docs/inco/quickstart/' },
            { text: '快速开始指南', link: '/docs/inco/quickstart/quickstart' },
            {
              text: '教程',
              collapsed: false,
              items: [
                { text: '构建机密代币', link: '/docs/inco/quickstart/tutorials/build-confidential-token' },
                {
                  text: 'Hardhat 指南',
                  collapsed: true,
                  items: [
                    { text: '环境设置', link: '/docs/inco/quickstart/tutorials/hardhat-guide/set-up-environment-for-hardhat' },
                    { text: '合约设置', link: '/docs/inco/quickstart/tutorials/hardhat-guide/set-up-the-contract' },
                    { text: '理解机密 ERC-20', link: '/docs/inco/quickstart/tutorials/hardhat-guide/understand-the-confidential-erc-20' },
                    { text: '合约函数', link: '/docs/inco/quickstart/tutorials/hardhat-guide/contract-functions' },
                    { text: '完整合约实现', link: '/docs/inco/quickstart/tutorials/hardhat-guide/complete-contract-implementation' }
                  ]
                },
                {
                  text: 'Foundry 指南',
                  collapsed: true,
                  items: [
                    { text: '设置', link: '/docs/inco/quickstart/tutorials/foundry-guide/setup' },
                    { text: '在合约中导入 Inco', link: '/docs/inco/quickstart/tutorials/foundry-guide/import-inco-in-your-contract' },
                    { text: '测试合约', link: '/docs/inco/quickstart/tutorials/foundry-guide/test-your-contract' }
                  ]
                }
              ]
            },
            {
              text: '参考',
              collapsed: true,
              items: [
                { text: 'Cheatcode 参考', link: '/docs/inco/quickstart/reference/cheatcode-reference' },
                { text: '参考库', link: '/docs/inco/quickstart/reference/reference-library' }
              ]
            }
          ]
        },
        {
          text: '🔧 Solidity 开发',
          collapsed: false,
          items: [
            { text: '介绍', link: '/docs/inco/solidity/' },
            {
              text: '架构',
              collapsed: false,
              items: [
                { text: '概述', link: '/docs/inco/solidity/architecture/overview' },
                { text: '组件', link: '/docs/inco/solidity/architecture/components' },
                { text: '解密机制', link: '/docs/inco/solidity/architecture/decryption-mechanisms' }
              ]
            },
            {
              text: '概念指南',
              collapsed: false,
              items: [
                { text: '概念指南介绍', link: '/docs/inco/solidity/concepts-guide/concepts-guide-introduction' },
                { text: '句柄', link: '/docs/inco/solidity/concepts-guide/handles' },
                { text: '输入', link: '/docs/inco/solidity/concepts-guide/inputs' },
                { text: '操作', link: '/docs/inco/solidity/concepts-guide/operations' },
                { text: '控制流', link: '/docs/inco/solidity/concepts-guide/control-flow' },
                { text: '访问控制', link: '/docs/inco/solidity/concepts-guide/access-control' },
                { text: '解密', link: '/docs/inco/solidity/concepts-guide/decryption' },
                { text: '重加密', link: '/docs/inco/solidity/concepts-guide/reencryption' },
                { text: '最佳实践', link: '/docs/inco/solidity/concepts-guide/best-practices' }
              ]
            }
          ]
        },
        {
          text: '💻 JS SDK',
          collapsed: false,
          items: [
            { text: '概述', link: '/docs/inco/js-sdk/' },
            {
              text: '指南',
              collapsed: false,
              items: [
                { text: 'Next.js 启动器', link: '/docs/inco/js-sdk/guide/nextjs-starter' },
                { text: '在现有项目中使用 IncoJS', link: '/docs/inco/js-sdk/guide/use-incojs-in-existing-project' }
              ]
            }
          ]
        }
      ],

      '/docs/others/': [
        {
          text: '🔮 其他项目',
          items: [
            { text: '项目列表', link: '/docs/others/' },
            { text: '即将添加...', link: '/docs/others/coming-soon' }
          ]
        }
      ],
      '/blog/': [
        {
          text: '📝 博客导航',
          items: [
            { text: 'Inco 博客', link: '/blog/inco/' },
            { text: 'Altius 博客', link: '/blog/altius/' },
            { text: 'Delta 博客', link: '/blog/delta/' },
            { text: 'Rialo 博客', link: '/blog/rialo/' },
            { text: '其他博客', link: '/blog/others/' }
          ]
        }
      ],
      '/blog/inco/': [
        {
          text: '🔒 机密计算技术',
          collapsed: false,
          items: [
            { text: '介绍 Inco：模块化机密计算网络', link: '/blog/inco/introduction-to-inco-modular-confidential-computing-network' },
            { text: '什么是全同态加密（FHE）？', link: '/blog/inco/what-is-fhe' },
            { text: '什么是机密代币？', link: '/blog/inco/什么是机密代币？' },
            { text: '如何创建机密代币', link: '/blog/inco/如何创建机密代币' },
            { text: '什么是机密可组合性？', link: '/blog/inco/什么是机密可组合性？' },
            { text: '什么是可验证计算？', link: '/blog/inco/什么是可验证计算？' }
          ]
        },
        {
          text: '🛡️ 隐私与安全',
          collapsed: false,
          items: [
            { text: '区块链隐私的四个层次', link: '/blog/inco/blockchain-privacy-four-levels' },
            { text: '互联网需要 HTTPS——区块链需要加密层', link: '/blog/inco/web-need-https-blockchain-need-encryption-layer' },
            { text: '链上加密方案：全同态加密（FHE）与可信执行环境（TEE）有何区别？', link: '/blog/inco/onchain-encryption-solutions-full-homomorphic-encryption-and-trusted-execution-environments-what-s-the-difference' }
          ]
        },
        {
          text: '🚀 应用场景',
          collapsed: false,
          items: [
            { text: '30+ 由 Inco 解锁的区块链机密应用场景', link: '/blog/inco/30+由Inco解锁的区块链机密应用场景' }
          ]
        },
        {
          text: '📰 项目动态',
          collapsed: false,
          items: [
            { text: 'Inco 2024 年度总结', link: '/blog/inco/Inco 2024 年度总结' },
            { text: 'Inco 筹集 450 万美元打造通用机密层', link: '/blog/inco/Inco 筹集 450 万美元打造通用机密层' },
            { text: 'Inco 完成 500 万美元融资 加速构建区块链隐私层', link: '/blog/inco/Inco 完成 500 万美元融资 加速构建区块链隐私层' },
            { text: 'Inco Gentry 测试网正式发布', link: '/blog/inco/Inco Gentry 测试网正式发布' },
            { text: 'Inco 闪电网络已在 Base Sepolia 上线，使开发者能够构建机密应用', link: '/blog/inco/Inco 闪电网络已在 Base Sepolia 上线，使开发者能够构建机密应用' },
            { text: 'ETH 丹佛活动回顾', link: '/blog/inco/ETH 丹佛活动回顾' }
          ]
        },
        {
          text: '🤝 合作伙伴',
          collapsed: true,
          items: [
            { text: 'Circle Research 与 Inco 探索基于加密技术的机密性 ERC20 代币框架', link: '/blog/inco/Circle Research 与 Inco 探索基于加密技术的机密性 ERC20 代币框架' },
            { text: 'Inco 加入 ERC3643 协会 通过可编程机密技术助推 RWA 发展', link: '/blog/inco/inco-join-erc3643' },
            { text: 'Inco 与 Open Zeppelin 和 Zama 联合推出机密代币协会', link: '/blog/inco/inco-and-openzeppelin-and-zama-launch-confidential-token-alliance' },
            { text: 'Inco 与 Tally 合作开发解决方案，实现机密链上治理', link: '/blog/inco/inco-and-tally-launch-confidential-chain-governance' },
            { text: 'Inco 与 Toku 宣布采用 cERC20 标准为 W2 雇员提供机密稳定币薪资支付方案', link: '/blog/inco/inco-and-toku-launch-confidential-payroll' },
            { text: 'Melee Games 在 Monad 测试网上推出由 Inco 技术驱动的《三分之二游戏》', link: '/blog/inco/melee-games-launch-3-2-game-on-monad-testnet-with-inco' }
          ]
        }
      ],
      '/blog/altius/': [
        {
          text: '📖 资源',
          collapsed: false,
          items: [
            { text: 'Altius 中文白皮书', link: '/blog/altius/Altius中文白皮书' }
          ]
        },
        {
          text: '📚 区块链基础',
          collapsed: false,
          items: [
            { text: '什么是智能合约？', link: '/blog/altius/什么是智能合约？' },
            { text: '智能合约与传统合约：关键差异解析', link: '/blog/altius/智能合约与传统合约：关键差异解析' },
            { text: '区块链与传统数据库对比：信任、控制与透明度指南', link: '/blog/altius/区块链与传统数据库对比：信任、控制与透明度指南' },
            { text: '区块链中的去中心化是什么？', link: '/blog/altius/区块链中的去中心化是什么？' },
            { text: '区块链节点详解：类型、功能及工作原理', link: '/blog/altius/区块链节点详解：类型、功能及工作原理' },
            { text: '公有链与私有链：有何不同？', link: '/blog/altius/公有链与私有链：有何不同？' },
            { text: '什么是代币经济学？完整指南及其重要性（2025 年）', link: '/blog/altius/what-is-token-economics-complete-guide-and-its-importance-2025' }
          ]
        },
        {
          text: '⚡ 扩容与架构',
          collapsed: false,
          items: [
            { text: '区块链可扩展性：三难困境与现代扩容方案', link: '/blog/altius/区块链可扩展性：三难困境与现代扩容方案' },
            { text: '区块链互操作性：跨链消息传递如何驱动统一的 Web3', link: '/blog/altius/区块链互操作性：跨链消息传递如何驱动统一的 Web3' },
            { text: '单体链与模块化链：区块链架构的未来', link: '/blog/altius/单体链与模块化链：区块链架构的未来' },
            { text: 'ZK Rollups 与 Optimistic Rollups 详解', link: '/blog/altius/ZK Rollups 与 Optimistic Rollups 详解' }
          ]
        },
      ],
      '/blog/rialo/': [
        {
          text: '🌍 现实世界资产',
          collapsed: false,
          items: [
            { text: '介绍 Rialo：为现实世界构建的区块链', link: '/blog/rialo/introduction-to-rialo' },
            { text: 'Rialo 让现实世界资产真正触手可及', link: '/blog/rialo/Rialo 让现实世界资产真正触手可及' }
          ]
        }
      ],
      '/blog/delta/': [
        {
          text: '📖 资源',
          collapsed: false,
          items: [
            { text: '介绍 Delta', link: '/blog/delta/introduction-to-rialo' },
            { text: 'Litepaper', link: '/blog/delta/litepaper' },
            { text: '什么是域', link: '/blog/delta/什么是域' },
            { text: '技术解析 #1：概览', link: '/blog/delta/delta-tech-1' },
            { text: '技术解析 #2：全局法则与域内法则', link: '/blog/delta/delta-tech-2' },
            { text: '技术解析 #3：无缝迁移', link: '/blog/delta/delta-tech-3' }
          ]
        },
        {
          text: '💭 技术思考',
          collapsed: false,
          items: [
            { text: 'Web 之后是什么', link: '/blog/delta/Web 之后是什么' },
            { text: '2027 年的金融', link: '/blog/delta/2027 年的金融' },
            { text: '停止优化链：迈向更远的可验证系统', link: '/blog/delta/停止优化链：迈向更远的可验证系统' },
            { text: '如何打造加密领域的英伟达', link: '/blog/delta/如何打造加密领域的英伟达' },
            { text: '从世界计算机到担保机：第一部分', link: '/blog/delta/delta-from-world-computer-to-guaranteed-machine-1' },
            { text: '从世界计算机到担保机：第二部分', link: '/blog/delta/delta-from-world-computer-to-guaranteed-machine-2' },
            { text: '从世界计算机到担保机：第三部分', link: '/blog/delta/delta-from-world-computer-to-guaranteed-machine-3' }
          ]
        },
      ],
      '/blog/others/': [
        {
          text: '🔮 其他博客',
          items: [
            { text: '博客列表', link: '/blog/others/' },
            { text: '即将添加...', link: '/blog/others/coming-soon' }
          ]
        }
      ],
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

