# Python SDK 文档

欢迎使用灵掌智能 LZMotion Python SDK 文档。本 SDK 提供了简洁易用的 Python 接口，用于控制和操作我们的灵巧手产品。

## 概述

Python SDK 是一个面向开发者的高级工具包，基于 C SDK 构建，提供了直观的 Python API，适用于快速开发、原型设计和自动化测试。

## 功能特性

- 简洁直观的 Python API
- 完整的类型注解
- 支持异步操作
- 丰富的示例代码
- 跨平台支持（Windows、Linux、macOS）
- 与 NumPy 等科学计算库兼容
- 自动内存管理

## 安装

使用 pip 安装 Python SDK：

```bash
pip install lzmotion
```

## 快速开始

### 1. 导入 SDK

```python
import lzmotion
```

### 2. 初始化并连接设备

```python
# 创建上下文
with lzmotion.Context() as ctx:
    # 搜索设备
    devices = ctx.scan_devices()
    if not devices:
        print("未找到设备")
        exit(1)
    
    # 连接设备
    device = ctx.connect(devices[0].id)
    
    # 读取设备信息
    info = device.get_info()
    print(f"设备名称: {info.name}")
    print(f"设备型号: {info.model}")
    print(f"固件版本: {info.firmware_version}")
    
    # 使用设备进行操作
    # ...
```

## API 参考

API 参考文档即将推出。

## 示例代码

示例代码即将推出。

## 常见问题

常见问题文档即将推出。

## 更新日志

更新日志即将推出。
