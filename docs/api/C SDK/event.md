# 事件处理

本文档介绍了LZMotion C SDK中事件处理的相关函数。

## 1. 事件定义

LZMotion SDK支持以下类型的事件：

| 事件类型 | 描述 |
|---------|------|
| LZ_EVENT_MOTION_COMPLETE | 运动完成事件 |
| LZ_EVENT_ERROR_OCCURRED | 错误发生事件 |
| LZ_EVENT_WARNING_OCCURRED | 警告发生事件 |
| LZ_EVENT_DEVICE_CONNECTED | 设备连接事件 |
| LZ_EVENT_DEVICE_DISCONNECTED | 设备断开事件 |
| LZ_EVENT_INPUT_TRIGGERED | 输入触发事件 |
| LZ_EVENT_OUTPUT_CHANGED | 输出变化事件 |
| LZ_EVENT_SAFETY_STOP | 安全停止事件 |

## 2. 事件回调

### 2.1 回调函数定义

事件处理通过注册回调函数实现。回调函数的定义如下：

```c
typedef void (*LZMotionEventCallback)(LZMotionContext ctx, int event_type, void* event_data, void* user_data);
```

**参数**：
- `ctx`：LZMotionContext指针
- `event_type`：事件类型（见上表）
- `event_data`：事件数据（根据事件类型不同而不同）
- `user_data`：用户自定义数据

## 3. 事件注册与管理

### 3.1 `lzmotion_register_event_callback`

**功能**：注册事件回调函数。

**函数声明**：

```c
int lzmotion_register_event_callback(LZMotionContext ctx, LZMotionEventCallback callback, void* user_data);
```

**参数**：
- `ctx`：LZMotionContext指针
- `callback`：事件回调函数指针
- `user_data`：用户自定义数据（将在回调中传递）

**返回值**：
- 成功：返回0
- 失败：返回错误码

**示例**：

```c
#include "lzmotion.h"
#include <stdio.h>

// 事件回调函数
void motion_event_callback(LZMotionContext ctx, int event_type, void* event_data, void* user_data) {
    switch (event_type) {
        case LZ_EVENT_MOTION_COMPLETE:
            printf("运动完成事件\n");
            break;
        case LZ_EVENT_ERROR_OCCURRED:
            {
                int* error_code = (int*)event_data;
                printf("错误发生事件，错误码：%d\n", *error_code);
            }
            break;
        case LZ_EVENT_DEVICE_CONNECTED:
            printf("设备连接事件\n");
            break;
        case LZ_EVENT_DEVICE_DISCONNECTED:
            printf("设备断开事件\n");
            break;
        default:
            printf("未知事件类型：%d\n", event_type);
            break;
    }
}

int main() {
    LZMotionContext ctx = lzmotion_init();
    if (ctx == NULL) {
        printf("初始化失败\n");
        return 1;
    }
    
    // 注册事件回调
    if (lzmotion_register_event_callback(ctx, motion_event_callback, NULL) != 0) {
        printf("注册事件回调失败\n");
        lzmotion_release(ctx);
        return 1;
    }
    
    // 连接设备
    if (lzmotion_connect_by_id(ctx, "DEVICE_001") != 0) {
        printf("连接设备失败\n");
        lzmotion_release(ctx);
        return 1;
    }
    
    // 执行一些操作...
    
    // 断开连接
    lzmotion_disconnect(ctx);
    lzmotion_release(ctx);
    return 0;
}
```

### 3.2 `lzmotion_unregister_event_callback`

**功能**：取消注册事件回调函数。

**函数声明**：

```c
int lzmotion_unregister_event_callback(LZMotionContext ctx, LZMotionEventCallback callback);
```

**参数**：
- `ctx`：LZMotionContext指针
- `callback`：要取消注册的事件回调函数指针

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 3.3 `lzmotion_process_events`

**功能**：处理待处理的事件。在非阻塞模式下，需要定期调用此函数来处理事件。

**函数声明**：

```c
int lzmotion_process_events(LZMotionContext ctx);
```

**参数**：
- `ctx`：LZMotionContext指针

**返回值**：
- 成功：返回0
- 失败：返回错误码

**示例**：

```c
#include "lzmotion.h"
#include <stdio.h>
#include <unistd.h>

// 事件回调函数
void motion_event_callback(LZMotionContext ctx, int event_type, void* event_data, void* user_data) {
    // 处理事件...
}

int main() {
    LZMotionContext ctx = lzmotion_init();
    if (ctx == NULL) {
        printf("初始化失败\n");
        return 1;
    }
    
    // 注册事件回调
    if (lzmotion_register_event_callback(ctx, motion_event_callback, NULL) != 0) {
        printf("注册事件回调失败\n");
        lzmotion_release(ctx);
        return 1;
    }
    
    // 连接设备
    if (lzmotion_connect_by_id(ctx, "DEVICE_001") != 0) {
        printf("连接设备失败\n");
        lzmotion_release(ctx);
        return 1;
    }
    
    // 主循环
    while (1) {
        // 处理事件
        lzmotion_process_events(ctx);
        
        // 其他操作...
        
        // 延时
        usleep(10000); // 10毫秒
    }
    
    // 断开连接
    lzmotion_disconnect(ctx);
    lzmotion_release(ctx);
    return 0;
}
```

## 4. 事件数据详解

不同类型的事件提供不同的事件数据：

### 4.1 LZ_EVENT_ERROR_OCCURRED

事件数据为`int*`类型，指向错误代码。

### 4.2 LZ_EVENT_WARNING_OCCURRED

事件数据为`int*`类型，指向警告代码。

### 4.3 LZ_EVENT_INPUT_TRIGGERED

事件数据为`LZInputEventData*`类型，包含输入端口号和状态。

```c
typedef struct {
    int port;
    int state;
} LZInputEventData;
```

### 4.4 LZ_EVENT_OUTPUT_CHANGED

事件数据为`LZOutputEventData*`类型，包含输出端口号和状态。

```c
typedef struct {
    int port;
    int state;
} LZOutputEventData;
```

## 5. 示例：完整的事件处理流程

```c
#include "lzmotion.h"
#include <stdio.h>
#include <stdlib.h>

// 用户自定义数据结构
typedef struct {
    int motion_count;
    int error_count;
} UserData;

// 事件回调函数
void motion_event_callback(LZMotionContext ctx, int event_type, void* event_data, void* user_data) {
    UserData* data = (UserData*)user_data;
    
    switch (event_type) {
        case LZ_EVENT_MOTION_COMPLETE:
            data->motion_count++;
            printf("运动完成事件，累计运动次数：%d\n", data->motion_count);
            break;
            
        case LZ_EVENT_ERROR_OCCURRED:
            data->error_count++;
            int* error_code = (int*)event_data;
            printf("错误发生事件，错误码：%d，累计错误次数：%d\n", *error_code, data->error_count);
            break;
            
        case LZ_EVENT_WARNING_OCCURRED:
            int* warning_code = (int*)event_data;
            printf("警告发生事件，警告码：%d\n", *warning_code);
            break;
            
        case LZ_EVENT_DEVICE_CONNECTED:
            printf("设备连接事件\n");
            break;
            
        case LZ_EVENT_DEVICE_DISCONNECTED:
            printf("设备断开事件\n");
            break;
            
        case LZ_EVENT_INPUT_TRIGGERED:
            {
                LZInputEventData* input_data = (LZInputEventData*)event_data;
                printf("输入触发事件，端口：%d，状态：%d\n", input_data->port, input_data->state);
            }
            break;
            
        case LZ_EVENT_OUTPUT_CHANGED:
            {
                LZOutputEventData* output_data = (LZOutputEventData*)event_data;
                printf("输出变化事件，端口：%d，状态：%d\n", output_data->port, output_data->state);
            }
            break;
            
        case LZ_EVENT_SAFETY_STOP:
            printf("安全停止事件\n");
            break;
            
        default:
            printf("未知事件类型：%d\n", event_type);
            break;
    }
}

int main() {
    LZMotionContext ctx = NULL;
    UserData user_data = {0};
    int result = 0;
    
    // 初始化SDK
    ctx = lzmotion_init();
    if (ctx == NULL) {
        printf("初始化SDK失败\n");
        return 1;
    }
    
    // 注册事件回调
    result = lzmotion_register_event_callback(ctx, motion_event_callback, &user_data);
    if (result != 0) {
        printf("注册事件回调失败，错误码：%d\n", result);
        lzmotion_release(ctx);
        return 1;
    }
    
    // 连接设备
    result = lzmotion_connect_by_id(ctx, "DEVICE_001");
    if (result != 0) {
        printf("连接设备失败，错误码：%d\n", result);
        lzmotion_release(ctx);
        return 1;
    }
    
    // 执行一些操作...
    printf("设备连接成功，开始执行操作...\n");
    
    // 示例：发送一个简单的运动指令
    float joint_angles[6] = {0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f};
    LZMotionParams params;
    params.velocity = 50.0f;
    params.acceleration = 100.0f;
    params.blending = 0.0f;
    params.coordinate_system = LZ_COORDINATE_JOINT;
    
    result = lzmotion_move_joint(ctx, joint_angles, 6, &params);
    if (result != 0) {
        printf("发送运动指令失败，错误码：%d\n", result);
    }
    
    // 处理事件一段时间
    for (int i = 0; i < 100; i++) {
        lzmotion_process_events(ctx);
        usleep(100000); // 100毫秒
    }
    
    // 断开连接
    result = lzmotion_disconnect(ctx);
    if (result != 0) {
        printf("断开连接失败，错误码：%d\n", result);
    }
    
    // 取消注册事件回调
    result = lzmotion_unregister_event_callback(ctx, motion_event_callback);
    if (result != 0) {
        printf("取消注册事件回调失败，错误码：%d\n", result);
    }
    
    // 释放资源
    lzmotion_release(ctx);
    
    printf("程序结束，累计运动次数：%d，累计错误次数：%d\n", user_data.motion_count, user_data.error_count);
    
    return 0;
}
```

## 6. 注意事项

1. 事件回调函数应该尽量简短，避免在回调中执行耗时操作
2. 回调函数可能在不同的线程中执行，需要注意线程安全
3. 在非阻塞模式下，需要定期调用`lzmotion_process_events`函数来处理事件
4. 不再需要事件通知时，应该调用`lzmotion_unregister_event_callback`取消注册回调函数
5. 回调函数中不要直接调用SDK的释放函数（如`lzmotion_release`）
