FROM node:20-alpine AS builder

WORKDIR /app

# 复制 package.json 文件
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/
COPY wasm/package*.json ./wasm/

# 安装依赖
RUN npm install
RUN cd client && npm install
RUN cd server && npm install
RUN cd wasm && npm install

# 复制源代码
COPY . .

# 构建项目
RUN npm run build

# 生产镜像
FROM node:20-alpine AS production

WORKDIR /app

# 只复制必要的文件
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/package*.json ./server/
COPY --from=builder /app/client/dist ./client/dist

# 安装生产依赖
RUN cd server && npm install --production

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# 暴露端口
EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# 启动服务
CMD ["node", "--max-old-space-size=128", "server/dist/index.js"]
