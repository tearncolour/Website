# 设备连接与管理

本文档介绍了LZMotion C SDK中设备连接与管理的相关函数。

## 1. 设备信息结构体

```c
typedef struct {
    char id[32];          // 设备唯一标识符
    char name[64];        // 设备名称
    char model[32];       // 设备型号
    char firmware_version[16]; // 固件版本
    int status;           // 设备状态
    char ip[16];          // 设备IP地址（网络设备）
    int port;             // 设备端口（网络设备）
    char serial_port[32]; // 串口名称（串口设备）
    int baud_rate;        // 波特率（串口设备）
} LZDeviceInfo;
```

## 2. 设备搜索

### 2.1 `lzmotion_scan_devices`

**功能**：搜索网络中的LZMotion设备。

**函数声明**：

```c
int lzmotion_scan_devices(LZMotionContext ctx, LZDeviceInfo** devices, int* count);
```

**参数**：
- `ctx`：LZMotionContext指针
- `devices`：输出参数，用于存储搜索到的设备信息数组
- `count`：输出参数，用于存储搜索到的设备数量

**返回值**：
- 成功：返回0
- 失败：返回错误码

**示例**：

```c
#include "lzmotion.h"
#include <stdio.h>

int main() {
    LZMotionContext ctx = lzmotion_init();
    if (ctx == NULL) {
        printf("初始化失败\n");
        return 1;
    }
    
    LZDeviceInfo* devices = NULL;
    int count = 0;
    int ret = lzmotion_scan_devices(ctx, &devices, &count);
    if (ret == 0) {
        printf("找到 %d 台设备：\n", count);
        for (int i = 0; i < count; i++) {
            printf("设备 %d：ID=%s, 名称=%s, 型号=%s\n", 
                   i+1, devices[i].id, devices[i].name, devices[i].model);
        }
    } else {
        printf("搜索设备失败，错误码：%d\n", ret);
    }
    
    // 释放设备信息内存
    if (devices != NULL) {
        free(devices);
    }
    
    lzmotion_release(ctx);
    return 0;
}
```

## 3. 设备连接

### 3.1 `lzmotion_connect_by_id`

**功能**：通过设备ID连接设备。

**函数声明**：

```c
int lzmotion_connect_by_id(LZMotionContext ctx, const char* device_id);
```

**参数**：
- `ctx`：LZMotionContext指针
- `device_id`：设备唯一标识符

**返回值**：
- 成功：返回0
- 失败：返回错误码

**示例**：

```c
#include "lzmotion.h"
#include <stdio.h>

int main() {
    LZMotionContext ctx = lzmotion_init();
    if (ctx == NULL) {
        printf("初始化失败\n");
        return 1;
    }
    
    // 连接设备
    int ret = lzmotion_connect_by_id(ctx, "DEVICE_001");
    if (ret != 0) {
        printf("连接设备失败，错误码：%d\n", ret);
        lzmotion_release(ctx);
        return 1;
    }
    
    printf("设备连接成功\n");
    
    // 断开连接
    lzmotion_disconnect(ctx);
    
    lzmotion_release(ctx);
    return 0;
}
```

### 3.2 `lzmotion_connect_by_ip`

**功能**：通过IP地址和端口连接网络设备。

**函数声明**：

```c
int lzmotion_connect_by_ip(LZMotionContext ctx, const char* ip, int port);
```

**参数**：
- `ctx`：LZMotionContext指针
- `ip`：设备IP地址
- `port`：设备端口

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 3.3 `lzmotion_connect_by_serial`

**功能**：通过串口名称和波特率连接串口设备。

**函数声明**：

```c
int lzmotion_connect_by_serial(LZMotionContext ctx, const char* serial_port, int baud_rate);
```

**参数**：
- `ctx`：LZMotionContext指针
- `serial_port`：串口名称
- `baud_rate`：波特率

**返回值**：
- 成功：返回0
- 失败：返回错误码

## 4. 设备断开

### 4.1 `lzmotion_disconnect`

**功能**：断开与设备的连接。

**函数声明**：

```c
int lzmotion_disconnect(LZMotionContext ctx);
```

**参数**：
- `ctx`：LZMotionContext指针

**返回值**：
- 成功：返回0
- 失败：返回错误码

## 5. 设备状态检查

### 5.1 `lzmotion_is_connected`

**功能**：检查设备是否已连接。

**函数声明**：

```c
int lzmotion_is_connected(LZMotionContext ctx);
```

**参数**：
- `ctx`：LZMotionContext指针

**返回值**：
- 已连接：返回1
- 未连接：返回0
- 错误：返回-1

### 5.2 `lzmotion_get_device_info`

**功能**：获取当前连接设备的信息。

**函数声明**：

```c
int lzmotion_get_device_info(LZMotionContext ctx, LZDeviceInfo* info);
```

**参数**：
- `ctx`：LZMotionContext指针
- `info`：输出参数，用于存储设备信息

**返回值**：
- 成功：返回0
- 失败：返回错误码
