# C++ SDK 文档

欢迎使用灵掌智能 LZMotion C++ SDK 文档。本 SDK 提供了现代化的 C++ 接口，用于控制和操作我们的灵巧手产品。

## 概述

C++ SDK 是一个面向对象的开发工具包，基于 C SDK 构建，提供了更高级别的抽象和更简洁的 API，适用于现代 C++ 应用程序开发。

## 功能特性

- 现代化的 C++11 及以上标准
- 面向对象的 API 设计
- RAII（资源获取即初始化）模式
- 异常处理机制
- 跨平台支持（Windows、Linux、macOS）
- 与 C SDK 完全兼容
- 智能指针和内存管理

## 目录结构

```
├── include/          # 头文件目录
│   ├── lzmotion.hpp  # 主头文件
│   └── lzmotion/     # 命名空间目录
├── lib/              # 库文件目录
│   ├── lzmotioncpp.lib  # Windows 静态库
│   └── liblzmotioncpp.a # Linux 静态库
└── examples/         # 示例代码
```

## 快速开始

### 1. 安装 SDK

将 SDK 解压到您的项目目录中，并将 `include/` 目录添加到您的编译包含路径中。

### 2. 链接库文件

根据您的平台选择相应的库文件进行链接，并确保同时链接 C SDK 库。

### 3. 初始化 SDK

```cpp
#include "lzmotion.hpp"

int main() {
    try {
        // 使用 RAII 初始化 SDK
        lzmotion::Context ctx;

        // 使用 SDK 进行操作
        // ...

    } catch (const lzmotion::Exception& e) {
        std::cerr << "错误: " << e.what() << std::endl;
        return 1;
    }

    return 0;
}
```

## API 参考

- [核心类](core.md)
- [设备管理](device.md)
- [运动控制](motion.md)
- [状态监控](status.md)
- [消息中心](message_center.md)
- [ROS1 节点](ros1_node.md)
- [ROS2 节点](ros2_node.md)

## 示例代码

示例代码即将推出。

## 常见问题

常见问题文档即将推出。

## 更新日志

更新日志即将推出。
