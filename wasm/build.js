import { execSync } from 'child_process';
import { mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distDir = join(__dirname, 'dist');

// 确保输出目录存在
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

console.log('🔧 正在编译 WebAssembly 模块...');

try {
  // 编译 AssemblyScript 到 WebAssembly
  execSync(
    `npx asc assembly/index.ts ` +
    `--outFile dist/compute.wasm ` +
    `--textFile dist/compute.wat ` +
    `--bindings esm ` +
    `--exportRuntime ` +
    `--optimize ` +
    `--sourceMap`,
    {
      cwd: __dirname,
      stdio: 'inherit',
    }
  );
  
  console.log('✅ WebAssembly 编译成功!');
  console.log(`📦 输出目录: ${distDir}`);
} catch (error) {
  console.error('❌ WebAssembly 编译失败:', error.message);
  process.exit(1);
}
