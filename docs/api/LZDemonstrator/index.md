# LZDemonstrator

本文档介绍了LZMotion SDK中的LZDemonstrator模块，用于展示和演示灵巧手的各种功能和应用场景。

## 1. 概述

LZDemonstrator是一个演示工具模块，提供了一系列预定义的演示程序和示例代码，帮助开发者快速了解和体验灵巧手的各种功能。它包含了从基础运动控制到复杂任务执行的各种演示场景。

## 2. 功能特性

- **基础运动演示**：展示灵巧手的基本运动能力
- **抓取演示**：演示各种物体的抓取策略
- **轨迹规划演示**：展示不同轨迹规划算法的效果
- **力控制演示**：演示灵巧手的力反馈和力控制功能
- **协作演示**：演示多只灵巧手的协作工作

## 3. 快速开始

### 3.1 导入演示模块

```python
import lzmotion.demonstrator
```

### 3.2 运行基础演示

```python
# 创建演示器实例
demo = lzmotion.demonstrator.Demonstrator()

# 连接灵巧手设备
demo.connect_device("COM3")

# 运行基础运动演示
demo.run_basic_demo()

# 运行抓取演示
demo.run_grasping_demo("cube")

# 断开设备连接
demo.disconnect_device()
```

## 4. API参考

### 4.1 Demonstrator 类

**功能**：演示器主类，用于管理各种演示程序

**构造函数**：

```python
class Demonstrator:
    def __init__(self, config=None):
        # 初始化演示器
```

**参数**：
- `config`：演示器配置字典（可选）

**返回值**：
- 演示器实例

### 4.2 `connect_device`

**功能**：连接到灵巧手设备

**函数声明**：

```python
def connect_device(self, port):
    # 连接设备
```

**参数**：
- `port`：设备端口（如"COM3"或"/dev/ttyUSB0"）

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 4.3 `run_basic_demo`

**功能**：运行基础运动演示

**函数声明**：

```python
def run_basic_demo(self):
    # 运行基础演示
```

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 4.4 `run_grasping_demo`

**功能**：运行抓取演示

**函数声明**：

```python
def run_grasping_demo(self, object_type):
    # 运行抓取演示
```

**参数**：
- `object_type`：物体类型（如"cube"、"cylinder"、"sphere"等）

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 4.5 `disconnect_device`

**功能**：断开与灵巧手设备的连接

**函数声明**：

```python
def disconnect_device(self):
    # 断开设备连接
```

**返回值**：
- 成功：返回0
- 失败：返回错误码

## 5. 示例代码

### 完整演示流程示例

```python
import lzmotion.demonstrator
import time

# 创建演示器实例
demo = lzmotion.demonstrator.Demonstrator()

# 配置演示参数
demo.set_config({
    "speed": 0.5,
    "acceleration": 0.2,
    "feedback_enable": True
})

# 连接设备
print("连接设备...")
result = demo.connect_device("COM3")

if result != 0:
    print("设备连接失败")
    exit(1)

print("设备连接成功")

# 运行基础运动演示
print("\n运行基础运动演示...")
demo.run_basic_demo()

# 等待用户输入
input("按Enter键继续...")

# 运行抓取演示
print("\n运行立方体抓取演示...")
demo.run_grasping_demo("cube")

# 等待用户输入
input("按Enter键继续...")

# 运行轨迹规划演示
print("\n运行轨迹规划演示...")
demo.run_trajectory_demo()

# 等待用户输入
input("按Enter键继续...")

# 运行力控制演示
print("\n运行力控制演示...")
demo.run_force_control_demo()

# 断开设备连接
print("\n断开设备连接...")
demo.disconnect_device()

print("演示完成!")
```

## 6. 常见问题

### 6.1 演示程序无法连接到设备怎么办？

- 检查设备端口是否正确
- 确保设备已正确连接到计算机
- 检查设备驱动是否已安装
- 确保设备没有被其他程序占用

### 6.2 演示过程中灵巧手运动异常怎么办？

- 停止当前演示
- 检查设备连接状态
- 重新初始化设备
- 检查演示参数设置

### 6.3 如何自定义演示程序？

- 继承Demonstrator类
- 重写或扩展演示方法
- 自定义运动轨迹和控制逻辑
- 添加新的演示场景

## 7. 更新日志

- **v1.0.0** (2023-10-15)
  - 初始版本发布
  - 支持基础运动演示
  - 支持简单抓取演示

- **v1.1.0** (2023-11-20)
  - 新增轨迹规划演示
  - 新增力控制演示
  - 优化演示界面

- **v1.2.0** (2024-01-10)
  - 新增协作演示
  - 支持自定义演示场景
  - 改进演示稳定性
