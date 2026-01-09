import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '灵掌WIKI',
  description: '灵掌机器人技术文档库',
  themeConfig: {
    siteTitle: false,
    nav: [
      { text: '首页', link: '/' },
      { text: '用户指南', link: '/guide/' },
      { text: 'API 参考', link: '/api/' },
      { text: '产品目录', link: '/products/' },
      { text: '关于我们', link: '/about/' }
    ],
    sidebar: {
      '/guide/': [
        { text: '快速开始', link: '/guide/' },
        { text: '安装配置', link: '/guide/installation' },
        { text: '使用教程', link: '/guide/usage' }
      ],
      '/api/': [
        { text: 'API 概述', link: '/api/' },
        { 
          text: 'C SDK', 
          items: [
            { text: '概述', link: '/api/C SDK/index.md' },
            { text: '初始化', link: '/api/C SDK/init.md' },
            { text: '设备管理', link: '/api/C SDK/device.md' },
            { text: '运动控制', link: '/api/C SDK/motion.md' },
            { text: '状态获取', link: '/api/C SDK/status.md' },
            { text: '事件处理', link: '/api/C SDK/event.md' },
            { text: '消息中心', link: '/api/C SDK/message_center.md' }
          ]
        },
        { 
          text: 'C++ SDK', 
          items: [
            { text: '概述', link: '/api/C++ SDK/index.md' },
            { text: '核心功能', link: '/api/C++ SDK/core.md' },
            { text: '设备管理', link: '/api/C++ SDK/device.md' },
            { text: '运动控制', link: '/api/C++ SDK/motion.md' },
            { text: '状态获取', link: '/api/C++ SDK/status.md' },
            { text: '消息中心', link: '/api/C++ SDK/message_center.md' },
            { text: '日志功能', link: '/api/C++ SDK/log.md' },
            { text: '数据采集', link: '/api/C++ SDK/data_collect.md' },
            { text: '多线程支持', link: '/api/C++ SDK/multithreads.md' },
            { text: 'ROS1节点', link: '/api/C++ SDK/ros1_node.md' },
            { text: 'ROS2节点', link: '/api/C++ SDK/ros2_node.md' }
          ]
        },
        { 
          text: 'Python SDK', 
          items: [
            { text: '概述', link: '/api/PythonSDK/index.md' }
          ]
        },
        {
          text: 'LZVision',
          items: [
            { text: '概述', link: '/api/LZVision/index.md' },
            { text: '图像分类', link: '/api/LZVision/classfy.md' },
            { text: '目标检测', link: '/api/LZVision/detect.md' },
            { text: '模型选择', link: '/api/LZVision/modelselect.md' },
            { text: '训练器', link: '/api/LZVision/trainer.md' }
          ]
        },
        {
          text: 'LZDemonstrator',
          items: [
            { text: '概述', link: '/api/LZDemonstrator/index.md' }
          ]
        },
        {
          text: 'LZEngine_RL',
          items: [
            { text: '概述', link: '/api/LZEngine_RL/index.md' }
          ]
        },
        { 
          text: 'LZ-LLM', 
          items: [
            { text: '概述', link: '/api/LZ-LLM/index.md' }
          ]
        }
      ],
      '/products/': [
        { text: '产品目录', link: '/products/' },
        { text: 'LZ-01 灵巧手', link: '/products/LZ-01/' },
        { text: 'LZ-Slient 静音灵巧手', link: '/products/LZ-Slient/' },
        { text: 'Client 客户端软件', link: '/products/Client/' }
      ]
    },
    notFound: {
      title: '找不到页面',
      quote: '抱歉，您访问的页面不存在或已被移动。',
      linkText: '返回首页'
    }
  }
})