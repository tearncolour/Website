export default {
  nav: {
    home: '首页',
    products: '产品',
    about: '关于我们',
    downloads: '下载中心',
    docs: '技术文档'
  },
  hero: {
    slides: [
      {
        title: '灵掌科技',
        subtitle: '驭巧于精，工业赋能',
        btnPrimary: '探索工业之美',
        btnOutline: '关于我们'
      },
      {
        title: '感知·触达',
        subtitle: '赋予机器人人类般的灵巧与触觉特性',
        btnPrimary: '探索技术',
        btnOutline: '查看文档'
      },
      {
        title: '智能互联',
        subtitle: '端到端深度学习，适应极其复杂的作业环境',
        btnPrimary: '成功案例',
        btnOutline: '联系我们'
      }
    ]
  },
  footer: {
    slogan: '灵巧手技术，赋能自动化未来',
    products: {
      title: '产品中心',
      s1: '智能助手',
      s2: '数据分析',
      s3: '流程自动化',
      s4: '视觉识别'
    },
    about: {
      title: '关于我们',
      a1: '公司简介',
      a2: '团队成员',
      a3: '发展历程',
      a4: '联系我们'
    },
    contact: {
      title: '联系我们',
      location: '中国·无锡'
    },
    social: {
      wechat: '微信',
      weibo: '微博',
      linkedin: 'LinkedIn'
    },
    copyright: '无锡灵掌机器人科技有限公司. 保留所有权利.'
  },
  productsPage: {
    title: '我们的产品',
    subtitle: '提供先进的灵巧手硬件及智能解决方案',
    list: [
      { id: 'dexterous-hand-01', name: 'LZ-01 灵巧手', description: '高精度工业级灵巧手' },
      { id: 'dexterous-hand-silent', name: 'LZ-Silent', description: '医疗级静音灵巧手' },
      { id: 'dexterous-hand-pro', name: 'LZ-Pro', description: '高性能科研灵巧手' },
      { id: 'gripper-base', name: '通用底座', description: '灵巧手快速适配底座' },
      { id: 'sensor-tactile', name: '触觉传感器', description: '高灵敏度纹理感知' },
      { id: 'control-box', name: '智能控制盒', description: '多路驱动集成方案' },
      { id: 'data-analytics', name: '数据分析', description: '智能数据分析平台' },
      { id: 'automation', name: '流程自动化', description: '智能自动化方案' },
      { id: 'computer-vision', name: '视觉识别', description: '领先的视觉技术' },
      { id: 'sdk-python', name: 'Python SDK', description: '易用的二次开发接口' },
      { id: 'sdk-cpp', name: 'C++ SDK', description: '高性能底层驱动库' },
      { id: 'ros2-package', name: 'ROS2 驱动', description: '标准的机器人中间件' },
    ]
  },
  contactPage: {
    title: '联系我们',
    subtitle: '联系方式',
    email: '邮箱',
    phone: '电话',
    address: '地址',
    addressDetail: '江苏省无锡市经开区华清大道与清源路交叉口产发园二期三栋二楼',
    form: {
      send: '发送消息',
      name: '姓名',
      namePlaceholder: '请输入您的姓名',
      email: '邮箱',
      emailPlaceholder: '请输入您的邮箱',
      phone: '电话（可选）',
      phonePlaceholder: '请输入您的电话',
      company: '公司（可选）',
      companyPlaceholder: '请输入您的公司名称',
      message: '消息',
      messagePlaceholder: '请输入您的消息',
      submit: '提交'
    }
  },
  home: {
    products: {
      title: '我们的产品',
      learnMore: '了解更多',
      items: [
        { name: '灵巧手产品', description: '高精度、高灵活性的灵巧手产品，适用于多种工业自动化场景' },
        { name: '数据分析', description: '智能数据分析平台，洞察业务价值' },
        { name: '自动化解决方案', description: '灵巧手驱动的智能自动化方案' },
        { name: '视觉识别', description: '领先的计算机视觉技术，赋能各行业应用' }
      ]
    },
    product: {
      title: '灵巧手驱动的自动化解决方案',
      description: '我们的产品结合了最新的灵巧手技术，为企业提供高效、智能的自动化解决方案，帮助企业提升竞争力。',
      button: '探索产品'
    },
    cases: {
      title: '携手全球合作伙伴，赋能机器人灵巧进化',
      clientPrefix: '客户：',
      items: [
        { title: '金融科技智能风控', client: '某头部银行', industry: '金融', description: '部署智能风控系统，欺诈检测准确率提升40%', metrics: { '准确率': '99.2%', '延迟': '<50ms' } },
        { title: '智能制造质检系统', client: '某汽车零部件企业', industry: '制造', description: '视觉质检方案，缺陷检测效率提升10倍', metrics: { '准确率': '99.8%', '速度': '10x' } },
        { title: '智慧客服机器人', client: '某电商平台', industry: '零售', description: '7x24小时智能客服，日均处理10万+咨询', metrics: { '满意度': '95%', '解决率': '85%' } }
      ]
    },
    contact: {
      title: '准备好开始了吗？',
      description: '联系我们，了解如何利用灵巧手技术提升您的业务自动化水平。',
      button: '联系我们'
    }
  }
}
