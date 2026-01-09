# C SDK 文档

欢迎使用灵掌智能 LZMotion C SDK 文档。本 SDK 提供了 C 语言接口，用于控制和操作我们的灵巧手产品。

## 概述

C SDK 是一个轻量级的开发工具包，适用于资源受限的嵌入式系统或需要高性能的应用场景。

## 功能特性

- 提供简洁的 C 语言 API
- 支持所有灵掌智能灵巧手产品
- 低内存占用，高性能
- 完整的错误处理机制
- 跨平台支持（Windows、Linux、嵌入式系统）

## 目录结构

```
├── include/          # 头文件目录
│   ├── lzmotion.h    # 主头文件
│   └── lzmotion_types.h # 类型定义
├── lib/              # 库文件目录
│   ├── lzmotion.lib  # Windows 静态库
│   └── liblzmotion.a # Linux 静态库
└── examples/         # 示例代码
```

## 快速开始

### 1. 安装 SDK

将 SDK 解压到您的项目目录中，并将 `include/` 目录添加到您的编译包含路径中。

### 2. 链接库文件

根据您的平台选择相应的库文件进行链接。

### 3. 初始化 SDK

```c
#include "lzmotion.h"

int main() {
    // 初始化 SDK
    LZMotionContext ctx = lzmotion_init();
    if (ctx == NULL) {
        printf("初始化失败\n");
        return 1;
    }

    // 使用 SDK 进行操作
    // ...

    // 释放资源
    lzmotion_release(ctx);
    return 0;
}
```

## API 参考

- [初始化与释放](init.md)
- [设备连接与管理](device.md)
- [运动控制](motion.md)
- [状态获取](status.md)
- [事件处理](event.md)
- [消息中心](message_center.md)

## 示例代码

示例代码即将推出。

## 常见问题

常见问题文档即将推出。

## 更新日志

更新日志即将推出。
