# 消息中心

本文档介绍了LZMotion C SDK中消息中心的相关函数。

## 1. 消息定义

消息中心用于在SDK内部各模块之间传递消息，以及与外部应用程序通信。

### 1.1 消息结构

```c
typedef struct {
    int message_id;
    int sender_id;
    int receiver_id;
    int message_type;
    void* message_data;
    int data_length;
    uint64_t timestamp;
} LZMotionMessage;
```

**成员说明**：
- `message_id`：消息唯一标识符
- `sender_id`：发送者标识符
- `receiver_id`：接收者标识符
- `message_type`：消息类型
- `message_data`：消息数据指针
- `data_length`：消息数据长度
- `timestamp`：消息时间戳

## 2. 消息发送

### 2.1 `lzmotion_send_message`

**功能**：发送一条消息。

**函数声明**：

```c
int lzmotion_send_message(LZMotionContext ctx, const LZMotionMessage* message);
```

**参数**：
- `ctx`：LZMotionContext指针
- `message`：要发送的消息指针

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
    
    // 创建消息
    LZMotionMessage message;
    message.message_id = 1001;
    message.sender_id = 1;
    message.receiver_id = 2;
    message.message_type = 0;
    message.message_data = NULL;
    message.data_length = 0;
    message.timestamp = 0;
    
    // 发送消息
    if (lzmotion_send_message(ctx, &message) != 0) {
        printf("发送消息失败\n");
    }
    
    lzmotion_release(ctx);
    return 0;
}
```

## 3. 消息接收

### 3.1 `lzmotion_receive_message`

**功能**：接收一条消息。

**函数声明**：

```c
int lzmotion_receive_message(LZMotionContext ctx, LZMotionMessage* message, int timeout_ms);
```

**参数**：
- `ctx`：LZMotionContext指针
- `message`：输出参数，用于存储接收到的消息
- `timeout_ms`：超时时间（毫秒），0表示立即返回，-1表示无限等待

**返回值**：
- 成功：返回0
- 失败：返回错误码
- 超时：返回LZ_ERROR_TIMEOUT

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
    
    // 接收消息
    LZMotionMessage message;
    int result = lzmotion_receive_message(ctx, &message, 1000); // 1秒超时
    if (result == 0) {
        printf("接收到消息，ID：%d\n", message.message_id);
    } else if (result == LZ_ERROR_TIMEOUT) {
        printf("接收消息超时\n");
    } else {
        printf("接收消息失败，错误码：%d\n", result);
    }
    
    lzmotion_release(ctx);
    return 0;
}
```

### 3.2 `lzmotion_peek_message`

**功能**：查看队列中的第一条消息，但不将其从队列中移除。

**函数声明**：

```c
int lzmotion_peek_message(LZMotionContext ctx, LZMotionMessage* message);
```

**参数**：
- `ctx`：LZMotionContext指针
- `message`：输出参数，用于存储查看的消息

**返回值**：
- 成功：返回0
- 失败：返回错误码

## 4. 消息订阅

### 4.1 `lzmotion_subscribe_message`

**功能**：订阅特定类型的消息。

**函数声明**：

```c
int lzmotion_subscribe_message(LZMotionContext ctx, int message_type);
```

**参数**：
- `ctx`：LZMotionContext指针
- `message_type`：要订阅的消息类型

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 4.2 `lzmotion_unsubscribe_message`

**功能**：取消订阅特定类型的消息。

**函数声明**：

```c
int lzmotion_unsubscribe_message(LZMotionContext ctx, int message_type);
```

**参数**：
- `ctx`：LZMotionContext指针
- `message_type`：要取消订阅的消息类型

**返回值**：
- 成功：返回0
- 失败：返回错误码

## 5. 消息回调

### 5.1 `lzmotion_register_message_callback`

**功能**：注册消息回调函数，当收到指定类型的消息时触发。

**函数声明**：

```c
int lzmotion_register_message_callback(LZMotionContext ctx, int message_type, void (*callback)(LZMotionContext, LZMotionMessage*, void*), void* user_data);
```

**参数**：
- `ctx`：LZMotionContext指针
- `message_type`：要监听的消息类型
- `callback`：回调函数指针
- `user_data`：用户自定义数据

**返回值**：
- 成功：返回0
- 失败：返回错误码

**示例**：

```c
#include "lzmotion.h"
#include <stdio.h>

// 消息回调函数
void message_callback(LZMotionContext ctx, LZMotionMessage* message, void* user_data) {
    printf("收到消息：ID=%d，类型=%d\n", message->message_id, message->message_type);
}

int main() {
    LZMotionContext ctx = lzmotion_init();
    if (ctx == NULL) {
        printf("初始化失败\n");
        return 1;
    }
    
    // 注册消息回调
    if (lzmotion_register_message_callback(ctx, 0, message_callback, NULL) != 0) {
        printf("注册消息回调失败\n");
        lzmotion_release(ctx);
        return 1;
    }
    
    // 等待消息...
    
    lzmotion_release(ctx);
    return 0;
}
```

### 5.2 `lzmotion_unregister_message_callback`

**功能**：取消注册消息回调函数。

**函数声明**：

```c
int lzmotion_unregister_message_callback(LZMotionContext ctx, int message_type, void (*callback)(LZMotionContext, LZMotionMessage*, void*));
```

**参数**：
- `ctx`：LZMotionContext指针
- `message_type`：要取消监听的消息类型
- `callback`：要取消注册的回调函数指针

**返回值**：
- 成功：返回0
- 失败：返回错误码

## 6. 消息队列管理

### 6.1 `lzmotion_get_message_queue_size`

**功能**：获取消息队列的大小。

**函数声明**：

```c
int lzmotion_get_message_queue_size(LZMotionContext ctx, int* queue_size);
```

**参数**：
- `ctx`：LZMotionContext指针
- `queue_size`：输出参数，用于存储消息队列的大小

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 6.2 `lzmotion_clear_message_queue`

**功能**：清空消息队列。

**函数声明**：

```c
int lzmotion_clear_message_queue(LZMotionContext ctx);
```

**参数**：
- `ctx`：LZMotionContext指针

**返回值**：
- 成功：返回0
- 失败：返回错误码

## 7. 示例：完整的消息处理流程

```c
#include "lzmotion.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 自定义消息类型
#define MSG_TYPE_CUSTOM 100

// 自定义消息数据结构
typedef struct {
    char content[256];
    int value;
} CustomMessageData;

// 消息回调函数
void message_callback(LZMotionContext ctx, LZMotionMessage* message, void* user_data) {
    printf("收到消息：\n");
    printf("  ID: %d\n", message->message_id);
    printf("  类型: %d\n", message->message_type);
    printf("  发送者: %d\n", message->sender_id);
    printf("  接收者: %d\n", message->receiver_id);
    printf("  时间戳: %llu\n", message->timestamp);
    
    // 处理自定义消息
    if (message->message_type == MSG_TYPE_CUSTOM && message->message_data != NULL) {
        CustomMessageData* data = (CustomMessageData*)message->message_data;
        printf("  内容: %s\n", data->content);
        printf("  值: %d\n", data->value);
    }
}

int main() {
    LZMotionContext ctx = NULL;
    int result = 0;
    
    // 初始化SDK
    ctx = lzmotion_init();
    if (ctx == NULL) {
        printf("初始化SDK失败\n");
        return 1;
    }
    
    // 注册消息回调
    result = lzmotion_register_message_callback(ctx, MSG_TYPE_CUSTOM, message_callback, NULL);
    if (result != 0) {
        printf("注册消息回调失败，错误码：%d\n", result);
        lzmotion_release(ctx);
        return 1;
    }
    
    // 创建自定义消息
    CustomMessageData custom_data;
    strcpy(custom_data.content, "Hello, LZMotion!");
    custom_data.value = 12345;
    
    LZMotionMessage message;
    message.message_id = 1;
    message.sender_id = 1;
    message.receiver_id = 0; // 广播消息
    message.message_type = MSG_TYPE_CUSTOM;
    message.message_data = &custom_data;
    message.data_length = sizeof(CustomMessageData);
    message.timestamp = 0; // 由系统自动填充
    
    // 发送消息
    result = lzmotion_send_message(ctx, &message);
    if (result != 0) {
        printf("发送消息失败，错误码：%d\n", result);
        lzmotion_release(ctx);
        return 1;
    }
    
    printf("消息发送成功\n");
    
    // 等待回调处理
    for (int i = 0; i < 10; i++) {
        lzmotion_process_events(ctx);
        usleep(100000); // 100毫秒
    }
    
    // 取消注册消息回调
    result = lzmotion_unregister_message_callback(ctx, MSG_TYPE_CUSTOM, message_callback);
    if (result != 0) {
        printf("取消注册消息回调失败，错误码：%d\n", result);
    }
    
    // 释放资源
    lzmotion_release(ctx);
    
    printf("程序结束\n");
    return 0;
}
```

## 8. 注意事项

1. 消息数据的内存管理由调用者负责，确保在消息处理完成前不会释放数据
2. 避免在消息回调中执行耗时操作，以免阻塞消息处理线程
3. 对于高频消息，建议使用消息队列接收模式，而不是回调模式
4. 消息ID应该全局唯一，建议使用递增或UUID生成方式
5. 消息中心支持广播消息（receiver_id为0）和定向消息
