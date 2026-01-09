# 灵掌智能企业网站

基于 Vue 3.6 Vapor Mode + Node.js + WebAssembly + TypeScript 的高性能企业网站，针对微型服务器优化。

## 🚀 技术栈

### 前端
- **Vue 3.6 (Vapor Mode)** - 最新的高性能渲染模式
- **TypeScript** - 类型安全
- **Vite** - 极速开发体验
- **Vue Router** - 路由管理
- **Pinia** - 状态管理
- **Sass** - 样式预处理

### 后端
- **Node.js** - 运行时环境
- **Fastify** - 高性能 Web 框架
- **TypeScript** - 类型安全

### WebAssembly
- **AssemblyScript** - TypeScript 子集编译到 WASM
- 高性能计算模块演示

## 📦 项目结构

```
Website/
├── client/                 # 前端项目
│   ├── src/
│   │   ├── components/     # 通用组件
│   │   ├── views/          # 页面组件
│   │   ├── router/         # 路由配置
│   │   ├── styles/         # 全局样式
│   │   └── main.ts         # 入口文件
│   ├── public/             # 静态资源
│   └── vite.config.ts      # Vite 配置
├── server/                 # 后端项目
│   └── src/
│       ├── routes/         # API 路由
│       └── index.ts        # 服务入口
├── wasm/                   # WebAssembly 模块
│   └── assembly/           # AssemblyScript 源码
└── package.json            # 根项目配置
```

## 🛠️ 开发环境

### 前置要求
- Node.js >= 20.0.0
- npm >= 10.0.0

### 安装依赖

```bash
# 安装所有依赖
npm run install:all

# 或分别安装
npm install
cd client && npm install
cd ../server && npm install
cd ../wasm && npm install
```

### 开发模式

```bash
# 同时启动前后端开发服务器
npm run dev

# 或分别启动
npm run dev:client  # 前端 http://localhost:5173
npm run dev:server  # 后端 http://localhost:3000
```

### 构建生产版本

```bash
# 构建所有项目
npm run build

# 分别构建
npm run build:wasm    # 构建 WebAssembly 模块
npm run build:client  # 构建前端
npm run build:server  # 构建后端
```

### 启动生产服务

```bash
npm start
```

## 🔧 针对微型服务器优化

本项目针对低配置服务器进行了多项优化：

### 服务端优化
- 使用 Fastify 替代 Express（更高性能、更低内存占用）
- 内置响应压缩（gzip/deflate）
- 内存缓存替代 Redis（适合小规模部署）
- 可配置的内存限制启动参数
- 优雅关闭机制

### 前端优化
- Vue 3.6 Vapor Mode（更小的运行时）
- 代码分割和懒加载
- 资源压缩（gzip + brotli）
- 图片懒加载
- CSS 代码分割
- 静态资源缓存

### 推荐服务器配置
- **最低配置**: 1 核 CPU, 512MB RAM
- **推荐配置**: 2 核 CPU, 1GB RAM

## 📝 环境变量

复制 `.env.example` 为 `.env` 并配置：

```env
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
ALLOWED_ORIGINS=https://yourdomain.com
```

## 🌐 部署指南

### Docker 部署

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm run install:all && npm run build
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
```

### PM2 部署

```bash
# 安装 PM2
npm install -g pm2

# 启动服务
pm2 start server/dist/index.js --name lingzhang-web --max-memory-restart 200M
```

### Nginx 反向代理配置

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📄 API 接口

| 端点 | 方法 | 描述 |
|------|------|------|
| `/api/company` | GET | 获取公司信息 |
| `/api/services` | GET | 获取服务列表 |
| `/api/services/:id` | GET | 获取服务详情 |
| `/api/cases` | GET | 获取成功案例 |
| `/api/contact` | POST | 提交联系表单 |
| `/health` | GET | 健康检查 |

## 📜 许可证

MIT License

## 👥 关于灵掌智能

灵掌智能致力于为企业提供领先的人工智能解决方案，推动数字化转型。

- 官网: https://dextroushands.com
- 邮箱: contact@dextroushands.com
- 电话: 400-888-8888
