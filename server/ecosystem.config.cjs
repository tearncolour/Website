module.exports = {
  apps: [
    {
      name: 'dextroushands-server',
      script: './dist/index.js',
      instances: 1, // 针对微型服务器使用 1 个实例
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOST: '127.0.0.1' // 生产环境仅监听本地地址，由 Nginx 进行代理
      },
      // 优雅退出设置
      kill_timeout: 3000,
      wait_ready: true,
      listen_timeout: 3000
    }
  ]
};
