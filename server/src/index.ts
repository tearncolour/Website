import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyCompress from '@fastify/compress';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyRateLimit from '@fastify/rate-limit';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import { apiRoutes } from './routes/api.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 针对微型服务器优化的配置
const server = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
  },
  // 优化内存使用
  bodyLimit: 1048576, // 1MB
  maxParamLength: 100,
});

async function bootstrap() {
  // 安全头配置
  await server.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "'wasm-unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
  });

  // CORS 配置
  await server.register(fastifyCors, {
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.ALLOWED_ORIGINS?.split(',') || false
      : true,
    credentials: true,
  });

  // 压缩响应（针对微型服务器优化）
  await server.register(fastifyCompress, {
    global: true,
    encodings: ['gzip', 'deflate'],
    threshold: 1024, // 只压缩大于1KB的响应
  });

  // 速率限制
  await server.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  // API 路由
  await server.register(apiRoutes, { prefix: '/api' });

  // 静态文件服务（生产环境）
  if (process.env.NODE_ENV === 'production') {
    await server.register(fastifyStatic, {
      root: join(__dirname, '../../client/dist'),
      prefix: '/',
      cacheControl: true,
      maxAge: '1d',
      immutable: true,
    });

    // 文档静态文件服务
    await server.register(fastifyStatic, {
      root: join(__dirname, '../../client/docs/.vitepress/dist'),
      prefix: '/docs',
      cacheControl: true,
      maxAge: '1d',
      immutable: true,
    });

    // SPA 路由回退
    server.setNotFoundHandler((request, reply) => {
      if (request.url.startsWith('/api')) {
        reply.code(404).send({ error: 'API endpoint not found' });
      } else if (request.url.startsWith('/docs')) {
        // 文档路由回退
        reply.sendFile('index.html', join(__dirname, '../../client/docs/.vitepress/dist'));
      } else {
        reply.sendFile('index.html');
      }
    });
  }

  // 健康检查端点
  server.get('/health', async () => {
    const memUsage = process.memoryUsage();
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      memory: {
        heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + 'MB',
        heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + 'MB',
        rss: Math.round(memUsage.rss / 1024 / 1024) + 'MB',
      },
      uptime: Math.round(process.uptime()) + 's',
    };
  });

  const port = parseInt(process.env.PORT || '3000', 10);
  const host = process.env.HOST || '0.0.0.0';

  try {
    await server.listen({ port, host });
    console.log(`🚀 灵掌智能企业网站服务启动成功`);
    console.log(`📍 地址: http://${host}:${port}`);
    console.log(`🔧 环境: ${process.env.NODE_ENV || 'development'}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

// 优雅关闭
process.on('SIGTERM', async () => {
  console.log('收到 SIGTERM 信号，正在关闭服务...');
  await server.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('收到 SIGINT 信号，正在关闭服务...');
  await server.close();
  process.exit(0);
});

bootstrap();
