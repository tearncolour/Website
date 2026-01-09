// AssemblyScript 高性能计算模块
// 用于 WebAssembly 性能演示

// 矩阵乘法 - 高性能计算示例
export function matrixMultiply(
  a: Float64Array,
  b: Float64Array,
  n: i32
): Float64Array {
  const result = new Float64Array(n * n);
  
  for (let i: i32 = 0; i < n; i++) {
    for (let j: i32 = 0; j < n; j++) {
      let sum: f64 = 0;
      for (let k: i32 = 0; k < n; k++) {
        sum += a[i * n + k] * b[k * n + j];
      }
      result[i * n + j] = sum;
    }
  }
  
  return result;
}

// 斐波那契数列 - 递归性能测试
export function fibonacci(n: i32): i64 {
  if (n <= 1) return n as i64;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 迭代版斐波那契 - 更高效
export function fibonacciIterative(n: i32): i64 {
  if (n <= 1) return n as i64;
  
  let prev: i64 = 0;
  let curr: i64 = 1;
  
  for (let i: i32 = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }
  
  return curr;
}

// 质数检测
export function isPrime(n: i32): bool {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  
  const sqrt = i32(Math.sqrt(f64(n)));
  for (let i: i32 = 3; i <= sqrt; i += 2) {
    if (n % i === 0) return false;
  }
  
  return true;
}

// 计算 N 以内的质数个数
export function countPrimes(n: i32): i32 {
  if (n < 2) return 0;
  
  // 埃拉托斯特尼筛法
  const sieve = new Uint8Array(n + 1);
  let count: i32 = 0;
  
  for (let i: i32 = 2; i <= n; i++) {
    if (sieve[i] === 0) {
      count++;
      for (let j: i32 = i * 2; j <= n; j += i) {
        sieve[j] = 1;
      }
    }
  }
  
  return count;
}

// 数组求和 - SIMD 优化候选
export function arraySum(arr: Float64Array): f64 {
  let sum: f64 = 0;
  for (let i: i32 = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

// 向量点积
export function dotProduct(a: Float64Array, b: Float64Array): f64 {
  let result: f64 = 0;
  const len = Math.min(a.length, b.length) as i32;
  for (let i: i32 = 0; i < len; i++) {
    result += a[i] * b[i];
  }
  return result;
}

// 图像处理 - 灰度转换模拟
export function grayscaleConvert(
  pixels: Uint8Array,
  width: i32,
  height: i32
): Uint8Array {
  const result = new Uint8Array(width * height);
  const total = width * height;
  
  for (let i: i32 = 0; i < total; i++) {
    const idx = i * 4;
    // 使用加权平均计算灰度值
    const gray = u8(
      0.299 * f64(pixels[idx]) +
      0.587 * f64(pixels[idx + 1]) +
      0.114 * f64(pixels[idx + 2])
    );
    result[i] = gray;
  }
  
  return result;
}

// 简单哈希函数
export function simpleHash(data: Uint8Array): u32 {
  let hash: u32 = 5381;
  
  for (let i: i32 = 0; i < data.length; i++) {
    hash = ((hash << 5) + hash) ^ data[i];
  }
  
  return hash;
}

// 内存分配测试
let memoryBuffer: Uint8Array | null = null;

export function allocateMemory(size: i32): void {
  memoryBuffer = new Uint8Array(size);
  for (let i: i32 = 0; i < size; i++) {
    memoryBuffer![i] = u8(i % 256);
  }
}

export function freeMemory(): void {
  memoryBuffer = null;
}

export function getMemorySize(): i32 {
  return memoryBuffer ? memoryBuffer!.length : 0;
}
