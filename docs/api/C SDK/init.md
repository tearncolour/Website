# 初始化与释放

本文档介绍了LZMotion C SDK的初始化和释放函数。

## 1. 初始化 SDK

### 1.1 `lzmotion_init`

**功能**：初始化LZMotion SDK并创建上下文。

**函数声明**：

```c
LZMotionContext lzmotion_init(void);
```

**参数**：无。

**返回值**：
- 成功：返回有效的LZMotionContext指针
- 失败：返回NULL

**示例**：

```c
#include "lzmotion.h"

int main() {
    LZMotionContext ctx = lzmotion_init();
    if (ctx == NULL) {
        printf("初始化失败\n");
        return 1;
    }
    
    // 使用SDK
    
    return 0;
}
```

## 2. 释放 SDK

### 2.1 `lzmotion_release`

**功能**：释放LZMotion SDK资源并销毁上下文。

**函数声明**：

```c
void lzmotion_release(LZMotionContext ctx);
```

**参数**：
- `ctx`：LZMotionContext指针，由`lzmotion_init`函数返回

**返回值**：无。

**示例**：

```c
#include "lzmotion.h"

int main() {
    LZMotionContext ctx = lzmotion_init();
    if (ctx == NULL) {
        printf("初始化失败\n");
        return 1;
    }
    
    // 使用SDK
    
    // 释放资源
    lzmotion_release(ctx);
    return 0;
}
```

## 3. 获取SDK版本

### 3.1 `lzmotion_get_version`

**功能**：获取LZMotion SDK的版本信息。

**函数声明**：

```c
const char* lzmotion_get_version(void);
```

**参数**：无。

**返回值**：
- 成功：返回SDK版本字符串，如"1.0.0"
- 失败：返回NULL

**示例**：

```c
#include "lzmotion.h"
#include <stdio.h>

int main() {
    const char* version = lzmotion_get_version();
    printf("LZMotion SDK 版本：%s\n", version ? version : "获取失败");
    return 0;
}
```
