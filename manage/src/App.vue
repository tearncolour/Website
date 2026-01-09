<template>
  <t-layout class="manage-layout">
    <t-aside width="300px" class="manage-aside">
      <div class="aside-header">
        <h3>文档库管理系统</h3>
        <t-space size="small">
          <t-button variant="outline" shape="square" @click="fetchTree">
            刷新
          </t-button>
          <t-button variant="outline" shape="square" @click="showCreateDialog('dir')">
            + 文件夹
          </t-button>
          <t-button variant="outline" shape="square" @click="showCreateDialog('file')">
            + 文件
          </t-button>
        </t-space>
      </div>
      <t-tree
        :data="treeData"
        hover
        expand-all
        @click="handleNodeClick"
        class="doc-tree"
      >
        <template #label="{ node }">
          <div class="tree-node-label">
            <span>{{ node.data.type === 'dir' ? '📁' : '📄' }} {{ node.label }}</span>
            <t-button 
              size="extra-small" 
              variant="text" 
              theme="danger" 
              class="delete-btn"
              @click.stop="confirmDelete(node.data)"
            >
              删除
            </t-button>
          </div>
        </template>
      </t-tree>
    </t-aside>
    
    <t-layout>
      <t-header class="manage-header">
        <div class="brand">
          <img src="https://img.pconline.com.cn/images/upload/upc/tx/itbd/1406/11/c3/35165158_1402473636734.jpg" class="admin-logo" />
          <span>灵掌智能 | 后台管理</span>
        </div>
        <div class="breadcrumb" v-if="currentFile">
          正在编辑: <strong>{{ currentFile }}</strong>
        </div>
        <t-space>
          <t-button v-if="currentFile" theme="primary" :loading="saving" @click="saveFile">
            保存当前文件
          </t-button>
          <t-divider layout="vertical" />
          <t-button 
            variant="outline" 
            theme="warning" 
            :disabled="buildInfo.isBuilding" 
            @click="publishDocs"
          >
            {{ buildInfo.isBuilding ? '正在构建...' : '发布/更新文档库' }}
          </t-button>
        </t-space>
      </t-header>
      
      <t-content class="manage-content">
        <!-- 构建进度展示区 -->
        <div v-if="buildInfo.isBuilding || buildInfo.lastBuildTime || buildInfo.error" class="build-status-card">
          <div class="status-header">
            <span class="status-title">
              {{ buildInfo.isBuilding ? '🚀 正在构建文档库' : (buildInfo.error ? '❌ 构建失败' : '✅ 最近构建成功') }}
            </span>
            <span v-if="buildInfo.lastBuildTime" class="build-time">时间: {{ buildInfo.lastBuildTime }}</span>
          </div>
          <t-progress 
            :percentage="buildInfo.progress" 
            :status="buildInfo.error ? 'exception' : (buildInfo.progress === 100 ? 'success' : 'active')"
            class="progress-bar"
          />
          <div v-if="buildInfo.isBuilding || buildInfo.error" class="log-window" ref="logWindow">
            <div v-for="(log, index) in buildInfo.logs" :key="index" class="log-line">
              <span class="log-timestamp">[{{ new Date().toLocaleTimeString() }}]</span> {{ log }}
            </div>
          </div>
        </div>

        <div v-if="currentFile" class="editor-container">
          <textarea 
            v-model="fileContent" 
            class="markdown-editor"
            placeholder="在此输入 Markdown 内容..."
            @keydown.ctrl.s.prevent="saveFile"
          ></textarea>
        </div>
        <div v-else class="empty-state">
          <div style="font-size: 64px; margin-bottom: 24px;">🏢</div>
          <h2>灵掌机器人文档管理中心</h2>
          <p>请从左侧侧边栏选择一个项目开始，或创建新的文档目录结构。</p>
        </div>
      </t-content>
    </t-layout>

    <!-- 创建弹窗 -->
    <t-dialog
      v-model:visible="createDialog.visible"
      :header="createDialog.type === 'dir' ? '新建目录' : '新建文档'"
      @confirm="handleCreate"
    >
      <t-form>
        <t-form-item label="名称">
          <t-input v-model="createDialog.name" placeholder="请输入名称" />
        </t-form-item>
      </t-form>
    </t-dialog>
  </t-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MessagePlugin, DialogPlugin } from 'tdesign-vue-next';

interface TreeNode {
  label: string;
  value: string;
  type: 'file' | 'dir';
  children?: TreeNode[];
}

const treeData = ref<TreeNode[]>([]);
const currentFile = ref('');
const fileContent = ref('');
const saving = ref(false);
const logWindow = ref<HTMLElement | null>(null);

const buildInfo = ref({
  isBuilding: false,
  progress: 0,
  logs: [] as string[],
  lastBuildTime: null as string | null,
  error: null as string | null
});

let pollTimer: any = null;

const createDialog = ref({
  visible: false,
  type: 'file' as 'file' | 'dir',
  name: ''
});

const fetchTree = async () => {
  try {
    const res = await fetch('/api/docs/tree');
    const result = await res.json();
    if (result.success) {
      treeData.value = result.data;
    }
  } catch (err) {
    MessagePlugin.error('获取文档树失败');
  }
};

const handleNodeClick = async (context: { node: any }) => {
  const node = context.node.data;
  if (node.type === 'file') {
    try {
      const res = await fetch(`/api/docs/file?path=${encodeURIComponent(node.value)}`);
      const result = await res.json();
      if (result.success) {
        currentFile.value = node.value;
        fileContent.value = result.data;
      }
    } catch (err) {
      MessagePlugin.error('读取文件失败');
    }
  }
};

const saveFile = async () => {
  if (!currentFile.value) return;
  saving.value = true;
  try {
    const res = await fetch('/api/docs/file', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: currentFile.value,
        content: fileContent.value
      })
    });
    const result = await res.json();
    if (result.success) {
      MessagePlugin.success('文件保存成功');
    } else {
      MessagePlugin.error(result.error);
    }
  } catch (err) {
    MessagePlugin.error('文件保存失败');
  } finally {
    saving.value = false;
  }
};

const publishDocs = async () => {
  try {
    const res = await fetch('/api/docs/build', { method: 'POST' });
    const result = await res.json();
    if (result.success) {
      MessagePlugin.info('开始异步构建文档库...');
      startPolling();
    } else {
      MessagePlugin.error(result.error || '无法启动构建');
    }
  } catch (err) {
    MessagePlugin.error('服务器连接失败');
  }
};

const fetchBuildStatus = async () => {
  try {
    const res = await fetch('/api/docs/build-status');
    const result = await res.json();
    if (result.success) {
      buildInfo.value = result.data;
      
      if (logWindow.value) {
        logWindow.value.scrollTop = logWindow.value.scrollHeight;
      }
      
      if (!result.data.isBuilding) {
        stopPolling();
      }
    }
  } catch (err) {
    console.error('Polling error:', err);
  }
};

const startPolling = () => {
  if (pollTimer) return;
  pollTimer = setInterval(fetchBuildStatus, 1500);
};

const stopPolling = () => {
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
};

const showCreateDialog = (type: 'file' | 'dir') => {
  createDialog.value = {
    visible: true,
    type,
    name: ''
  };
};

const handleCreate = async () => {
  const { name, type } = createDialog.value;
  if (!name) return;
  const path = name.endsWith('.md') || type === 'dir' ? name : `${name}.md`;
  try {
    const res = await fetch('/api/docs/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path, type })
    });
    const result = await res.json();
    if (result.success) {
      MessagePlugin.success('创建成功');
      createDialog.value.visible = false;
      fetchTree();
    } else {
      MessagePlugin.error(result.error);
    }
  } catch (err) {
    MessagePlugin.error('创建失败');
  }
};

const confirmDelete = (data: TreeNode) => {
  DialogPlugin.confirm({
    header: '确认删除',
    body: `你确定要删除 ${data.label} 吗？${data.type === 'dir' ? '该操作会删除目录下所有文件！' : ''}`,
    onConfirm: async () => {
      try {
        const res = await fetch(`/api/docs/delete?path=${encodeURIComponent(data.value)}`, {
          method: 'DELETE'
        });
        const result = await res.json();
        if (result.success) {
          MessagePlugin.success('删除成功');
          if (currentFile.value === data.value) {
            currentFile.value = '';
            fileContent.value = '';
          }
          fetchTree();
        }
      } catch (err) {
        MessagePlugin.error('删除失败');
      }
    }
  });
};

onMounted(() => {
  fetchTree();
  fetchBuildStatus();
});
</script>

<style>
body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
</style>

<style scoped>
.manage-layout {
  height: 100vh;
  background-color: #f3f3f3;
}

.manage-aside {
  background: white;
  border-right: 1px solid #e7e7e7;
  display: flex;
  flex-direction: column;
}

.aside-header {
  padding: 16px;
  border-bottom: 1px solid #e7e7e7;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.aside-header h3 {
  margin: 0;
  font-size: 16px;
  color: #0052d9;
}

.doc-tree {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.tree-node-label {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.tree-node-label span {
  flex: 1;
}

.delete-btn {
  opacity: 0;
  transition: opacity 0.2s;
}

.tree-node-label:hover .delete-btn {
  opacity: 1;
}

.manage-header {
  background: white;
  border-bottom: 1px solid #e7e7e7;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: bold;
  font-size: 18px;
}

.admin-logo {
  height: 32px;
  border-radius: 4px;
}

.breadcrumb {
  color: #666;
  font-size: 14px;
}

.manage-content {
  padding: 24px;
  height: calc(100vh - 64px);
  overflow-y: auto;
}

.build-status-card {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  color: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.status-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
}

.log-window {
  background: #000;
  border-radius: 4px;
  padding: 12px;
  max-height: 200px;
  overflow-y: auto;
  font-family: 'Consolas', monospace;
  font-size: 12px;
  line-height: 1.5;
  color: #00ff00;
  margin-top: 12px;
}

.log-line {
  margin-bottom: 4px;
  white-space: pre-wrap;
}

.log-timestamp {
  color: #888;
  margin-right: 8px;
}

.editor-container {
  height: calc(100% - 120px);
  min-height: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
}

.markdown-editor {
  flex: 1;
  width: 100%;
  padding: 24px;
  border: none;
  resize: none;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 16px;
  line-height: 1.6;
  outline: none;
  color: #2c3e50;
}

.empty-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999;
  text-align: center;
}

.empty-state h2 {
  color: #333;
  margin-bottom: 8px;
}
</style>
