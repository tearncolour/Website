import { FastifyInstance } from 'fastify';

// 内存缓存（针对微型服务器优化，避免使用 Redis）
const cache = new Map<string, { data: unknown; expires: number }>();

function getCache<T>(key: string): T | null {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() > item.expires) {
    cache.delete(key);
    return null;
  }
  return item.data as T;
}

function setCache(key: string, data: unknown, ttlMs: number = 60000): void {
  // 限制缓存大小
  if (cache.size > 100) {
    const oldestKey = cache.keys().next().value;
    if (oldestKey) cache.delete(oldestKey);
  }
  cache.set(key, { data, expires: Date.now() + ttlMs });
}

// 企业信息数据
const companyInfo = {
  name: '灵掌智能',
  slogan: '智能科技，引领未来',
  description: '灵掌智能致力于提供先进的人工智能解决方案，为企业数字化转型赋能。',
  founded: 2020,
  employees: '50+',
  contact: {
    email: 'contact@lingzhang.ai',
    phone: '+86 400-888-8888',
    address: '中国·深圳',
  },
  social: {
    weixin: 'lingzhang_ai',
    weibo: 'lingzhang_ai',
    linkedin: 'lingzhang-ai',
  },
};

// 服务列表
const services = [
  {
    id: 'ai-assistant',
    name: '智能助手',
    icon: '🤖',
    description: '基于大语言模型的企业级智能助手，支持多场景应用',
    features: ['自然语言理解', '多轮对话', '知识库集成', '个性化定制'],
  },
  {
    id: 'data-analytics',
    name: '数据分析',
    icon: '📊',
    description: '智能数据分析平台，洞察业务价值',
    features: ['实时数据处理', '可视化报表', '预测分析', '异常检测'],
  },
  {
    id: 'automation',
    name: '流程自动化',
    icon: '⚙️',
    description: 'RPA + AI 结合的智能自动化方案',
    features: ['流程挖掘', '智能编排', '无代码配置', '监控告警'],
  },
  {
    id: 'computer-vision',
    name: '视觉识别',
    icon: '👁️',
    description: '领先的计算机视觉技术，赋能各行业应用',
    features: ['图像识别', '目标检测', '人脸识别', '质检分析'],
  },
];

// 成功案例
const cases = [
  {
    id: 1,
    title: '金融科技智能风控',
    client: '某头部银行',
    industry: '金融',
    description: '部署智能风控系统，欺诈检测准确率提升40%',
    metrics: { accuracy: '99.2%', latency: '<50ms', cost: '-60%' },
  },
  {
    id: 2,
    title: '智能制造质检系统',
    client: '某汽车零部件企业',
    industry: '制造',
    description: '视觉质检方案，缺陷检测效率提升10倍',
    metrics: { accuracy: '99.8%', speed: '10x', roi: '300%' },
  },
  {
    id: 3,
    title: '智慧客服机器人',
    client: '某电商平台',
    industry: '零售',
    description: '7x24小时智能客服，日均处理10万+咨询',
    metrics: { satisfaction: '95%', resolution: '85%', cost: '-70%' },
  },
];

export async function apiRoutes(fastify: FastifyInstance) {
  // 获取企业信息
  fastify.get('/company', async () => {
    return { success: true, data: companyInfo };
  });

  // 获取服务列表
  fastify.get('/services', async () => {
    const cached = getCache('services');
    if (cached) return cached;
    
    const response = { success: true, data: services };
    setCache('services', response, 300000); // 5分钟缓存
    return response;
  });

  // 获取单个服务详情
  fastify.get<{ Params: { id: string } }>('/services/:id', async (request, reply) => {
    const { id } = request.params;
    const service = services.find(s => s.id === id);
    
    if (!service) {
      reply.code(404);
      return { success: false, error: '服务不存在' };
    }
    
    return { success: true, data: service };
  });

  // 获取成功案例
  fastify.get('/cases', async () => {
    const cached = getCache('cases');
    if (cached) return cached;
    
    const response = { success: true, data: cases };
    setCache('cases', response, 300000);
    return response;
  });

  // 联系表单提交
  fastify.post<{
    Body: {
      name: string;
      email: string;
      phone?: string;
      company?: string;
      message: string;
    };
  }>('/contact', async (request, reply) => {
    const { name, email, message } = request.body;
    
    // 基础验证
    if (!name || !email || !message) {
      reply.code(400);
      return { success: false, error: '请填写必填字段' };
    }
    
    // 实际项目中这里应该保存到数据库或发送邮件
    console.log('收到联系表单:', request.body);
    
    return {
      success: true,
      message: '感谢您的留言，我们会尽快与您联系！',
    };
  });

  // WebAssembly 性能演示数据
  fastify.get('/demo/performance', async () => {
    return {
      success: true,
      data: {
        description: 'WebAssembly vs JavaScript 性能对比',
        benchmarks: [
          { name: '矩阵乘法', wasm: '12ms', js: '156ms', speedup: '13x' },
          { name: '图像处理', wasm: '8ms', js: '95ms', speedup: '12x' },
          { name: '加密计算', wasm: '5ms', js: '78ms', speedup: '16x' },
        ],
      },
    };
  });
}
