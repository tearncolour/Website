<template>
  <div class="docs-container">
    <div class="docs-header">
      <h1>灵掌机器人技术文档库</h1>
      <p>欢迎使用灵掌Wiki技术文档库</p>
    </div>
    
    <div class="docs-content">
      <div class="docs-intro">
        <p>本技术文档库提供了我们灵巧手产品和自动化解决方案的详细技术文档，包括用户指南、API 参考、技术规格等内容。</p>
        <p>您可以通过以下方式访问完整文档：</p>
      </div>
      
      <div class="docs-options">
        <div class="docs-option">
          <h3>在线文档（推荐）</h3>
          <p>访问完整的在线文档库，包含最新的文档内容和搜索功能。</p>
          <a href="//docs.dextroushands.com" class="btn btn-primary" target="_blank">
            <i class="icon-doc"></i>
            打开在线文档
          </a>
        </div>
        
        <div class="docs-option">
          <h3>本地文档</h3>
          <p>如果您无法访问在线文档，可以查看本地文档资源。</p>
          <a href="#" class="btn btn-secondary">
            <i class="icon-download"></i>
            下载本地文档
          </a>
        </div>
      </div>
      
      <div class="docs-quick-nav">
        <h3>快速导航</h3>
        <div class="nav-grid">
          <a href="//docs.dextroushands.com/guide/" class="nav-item" target="_blank">
            <i class="icon-guide"></i>
            用户指南
          </a>
          <a href="//docs.dextroushands.com/api/" class="nav-item" target="_blank">
            <i class="icon-api"></i>
            API 参考
          </a>
          <a href="//docs.dextroushands.com/about/" class="nav-item" target="_blank">
            <i class="icon-about"></i>
            关于文档
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 文档页面组件
</script>

<style scoped>
.docs-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.docs-header {
  text-align: center;
  margin-bottom: 3rem;
}

.docs-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.docs-header p {
  font-size: 1.2rem;
  color: #666;
}

.docs-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.docs-intro {
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
}

.docs-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.docs-option {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.docs-option:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.docs-option h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.docs-option p {
  margin-bottom: 1.5rem;
  color: #666;
  line-height: 1.6;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #1890ff;
  color: #fff;
  border: 1px solid #1890ff;
}

.btn-primary:hover {
  background-color: #40a9ff;
  border-color: #40a9ff;
}

.btn-secondary {
  background-color: #fff;
  color: #333;
  border: 1px solid #d9d9d9;
}

.btn-secondary:hover {
  background-color: #f5f5f5;
  border-color: #1890ff;
  color: #1890ff;
}

.docs-quick-nav {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 2rem;
}

.docs-quick-nav h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
  background-color: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  transition: all 0.3s ease;
}

.nav-item:hover {
  background-color: #1890ff;
  border-color: #1890ff;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
}

.icon-doc, .icon-download, .icon-guide, .icon-api, .icon-about {
  font-size: 2rem;
}
</style>
