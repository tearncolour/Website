# Message Center 消息中心

本文档介绍了LZMotion C++ SDK中消息中心的相关功能。

## 1. 消息定义

### 1.1 基本消息结构

```cpp
// 消息结构体
struct Message {
    std::string id;              // 消息ID
    std::string topic;           // 消息主题
    std::string content;         // 消息内容（JSON格式）
    long long timestamp;         // 时间戳
    std::string sender;          // 发送者
    std::string receiver;        // 接收者
    int priority;                // 优先级（0-100）
};
```

### 1.2 消息主题

LZMotion SDK支持以下预定义消息主题：

| 主题名称 | 描述 |
|---------|------|
| system.info | 系统信息 |
| system.warning | 系统警告 |
| system.error | 系统错误 |
| device.status | 设备状态 |
| device.command | 设备命令 |
| motion.status | 运动状态 |
| motion.command | 运动命令 |
| io.status | IO状态 |
| io.command | IO命令 |
| event.trigger | 事件触发 |

## 2. 消息发送

### 2.1 发送消息

```cpp
// 发送消息
int sendMessage(const Message& message);
```

**参数**：
- `message`：要发送的消息对象

**返回值**：
- 0：成功
- 非0：失败，错误码

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 创建消息
    LZMotion::Message msg;
    msg.id = "msg_001";
    msg.topic = "motion.command";
    msg.content = "{\"command\":\"stop\"}";
    msg.sender = "app";
    msg.receiver = "device";
    msg.priority = 50;
    
    // 发送消息
    int result = motion.sendMessage(msg);
    if (result == 0) {
        std::cout << "消息发送成功" << std::endl;
    } else {
        std::cout << "消息发送失败，错误码：" << result << std::endl;
    }
    
    motion.release();
    return 0;
}
```

### 2.2 发送简单消息

```cpp
// 发送简单消息
int sendSimpleMessage(const std::string& topic, const std::string& content, int priority = 50);
```

**参数**：
- `topic`：消息主题
- `content`：消息内容（JSON格式）
- `priority`：消息优先级（0-100），默认50

**返回值**：
- 0：成功
- 非0：失败，错误码

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 发送简单消息
    int result = motion.sendSimpleMessage("motion.command", "{\"command\":\"stop\"}", 50);
    if (result == 0) {
        std::cout << "消息发送成功" << std::endl;
    } else {
        std::cout << "消息发送失败，错误码：" << result << std::endl;
    }
    
    motion.release();
    return 0;
}
```

## 3. 消息接收

### 3.1 接收消息

```cpp
// 接收消息
Message receiveMessage(const std::string& topic = "", int timeout = -1);
```

**参数**：
- `topic`：消息主题，默认接收所有主题
- `timeout`：超时时间（毫秒），-1表示阻塞等待

**返回值**：
- 接收到的消息对象

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 接收消息
    LZMotion::Message msg = motion.receiveMessage("device.status", 5000);
    
    if (!msg.id.empty()) {
        std::cout << "接收到消息：" << std::endl;
        std::cout << "ID: " << msg.id << std::endl;
        std::cout << "主题: " << msg.topic << std::endl;
        std::cout << "内容: " << msg.content << std::endl;
        std::cout << "时间戳: " << msg.timestamp << std::endl;
    } else {
        std::cout << "未接收到消息" << std::endl;
    }
    
    motion.release();
    return 0;
}
```

### 3.2 接收所有消息

```cpp
// 接收所有消息
std::vector<Message> receiveAllMessages(const std::string& topic = "");
```

**参数**：
- `topic`：消息主题，默认接收所有主题

**返回值**：
- 接收到的消息列表

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 接收所有消息
    std::vector<LZMotion::Message> messages = motion.receiveAllMessages("device.status");
    
    std::cout << "接收到 " << messages.size() << " 条消息" << std::endl;
    
    for (const auto& msg : messages) {
        std::cout << "消息ID: " << msg.id << "，主题: " << msg.topic << std::endl;
    }
    
    motion.release();
    return 0;
}
```

## 4. 消息订阅

### 4.1 订阅主题

```cpp
// 订阅主题
int subscribeTopic(const std::string& topic);
```

**参数**：
- `topic`：要订阅的主题

**返回值**：
- 0：成功
- 非0：失败，错误码

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 订阅主题
    int result = motion.subscribeTopic("device.status");
    if (result == 0) {
        std::cout << "订阅主题成功" << std::endl;
    } else {
        std::cout << "订阅主题失败，错误码：" << result << std::endl;
    }
    
    motion.release();
    return 0;
}
```

### 4.2 取消订阅

```cpp
// 取消订阅
int unsubscribeTopic(const std::string& topic);
```

**参数**：
- `topic`：要取消订阅的主题

**返回值**：
- 0：成功
- 非0：失败，错误码

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 取消订阅
    int result = motion.unsubscribeTopic("device.status");
    if (result == 0) {
        std::cout << "取消订阅成功" << std::endl;
    } else {
        std::cout << "取消订阅失败，错误码：" << result << std::endl;
    }
    
    motion.release();
    return 0;
}
```

### 4.3 获取订阅列表

```cpp
// 获取订阅列表
std::vector<std::string> getSubscribedTopics();
```

**参数**：
- 无

**返回值**：
- 订阅的主题列表

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 获取订阅列表
    std::vector<std::string> topics = motion.getSubscribedTopics();
    
    std::cout << "已订阅主题：" << std::endl;
    for (const auto& topic : topics) {
        std::cout << "- " << topic << std::endl;
    }
    
    motion.release();
    return 0;
}
```

## 5. 消息回调

### 5.1 设置消息回调

```cpp
// 消息回调函数类型
typedef void (*MessageCallback)(const Message& message);

// 设置消息回调
int setMessageCallback(MessageCallback callback);
```

**参数**：
- `callback`：消息回调函数

**返回值**：
- 0：成功
- 非0：失败，错误码

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

// 消息回调函数
void onMessageReceived(const LZMotion::Message& message) {
    std::cout << "[消息回调] 接收到消息：" << std::endl;
    std::cout << "  ID: " << message.id << std::endl;
    std::cout << "  主题: " << message.topic << std::endl;
    std::cout << "  内容: " << message.content << std::endl;
    std::cout << "  发送者: " << message.sender << std::endl;
    std::cout << "  时间戳: " << message.timestamp << std::endl;
}

int main() {
    LZMotion motion;
    motion.init();
    
    // 设置消息回调
    motion.setMessageCallback(onMessageReceived);
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 订阅主题
    motion.subscribeTopic("device.status");
    
    // 等待消息
    std::cout << "等待消息..." << std::endl;
    std::cin.get();
    
    motion.release();
    return 0;
}
```

## 6. 消息队列管理

### 6.1 获取队列长度

```cpp
// 获取队列长度
int getMessageQueueLength(const std::string& topic = "");
```

**参数**：
- `topic`：消息主题，默认所有主题

**返回值**：
- 队列长度

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 获取队列长度
    int length = motion.getMessageQueueLength("device.status");
    std::cout << "设备状态消息队列长度：" << length << std::endl;
    
    motion.release();
    return 0;
}
```

### 6.2 清空队列

```cpp
// 清空队列
int clearMessageQueue(const std::string& topic = "");
```

**参数**：
- `topic`：消息主题，默认所有主题

**返回值**：
- 0：成功
- 非0：失败，错误码

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 清空队列
    int result = motion.clearMessageQueue("device.status");
    if (result == 0) {
        std::cout << "队列清空成功" << std::endl;
    } else {
        std::cout << "队列清空失败，错误码：" << result << std::endl;
    }
    
    motion.release();
    return 0;
}
```

## 7. 消息过滤

### 7.1 设置消息过滤器

```cpp
// 设置消息过滤器
int setMessageFilter(const std::string& topic, const std::function<bool(const Message&)>& filter);
```

**参数**：
- `topic`：消息主题
- `filter`：过滤函数，返回true表示接收该消息，false表示过滤掉

**返回值**：
- 0：成功
- 非0：失败，错误码

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 设置消息过滤器，只接收优先级大于50的消息
    motion.setMessageFilter("device.status", [](const LZMotion::Message& msg) {
        return msg.priority > 50;
    });
    
    motion.release();
    return 0;
}
```

## 8. 示例：完整的消息中心使用流程

```cpp
#include <LZMotion.h>
#include <iostream>
#include <thread>
#include <chrono>

// 消息回调函数
void onMessageReceived(const LZMotion::Message& message) {
    std::cout << "[消息回调] 接收到消息：" << std::endl;
    std::cout << "  ID: " << message.id << std::endl;
    std::cout << "  主题: " << message.topic << std::endl;
    std::cout << "  内容: " << message.content << std::endl;
    std::cout << "  发送者: " << message.sender << std::endl;
    std::cout << "  接收者: " << message.receiver << std::endl;
    std::cout << "  优先级: " << message.priority << std::endl;
    std::cout << "  时间戳: " << message.timestamp << std::endl;
    std::cout << "--------------------------" << std::endl;
}

int main() {
    LZMotion motion;
    
    try {
        // 初始化SDK
        int result = motion.init();
        if (result != 0) {
            std::cout << "初始化SDK失败，错误码：" << result << std::endl;
            return 1;
        }
        
        // 设置消息回调
        result = motion.setMessageCallback(onMessageReceived);
        if (result != 0) {
            std::cout << "设置消息回调失败，错误码：" << result << std::endl;
            return 1;
        }
        
        // 连接设备
        std::cout << "正在连接设备..." << std::endl;
        result = motion.connectById("DEVICE_001");
        if (result != 0) {
            std::cout << "连接设备失败，错误码：" << result << std::endl;
            return 1;
        }
        
        std::cout << "设备连接成功！" << std::endl;
        
        // 订阅主题
        motion.subscribeTopic("device.status");
        motion.subscribeTopic("motion.status");
        motion.subscribeTopic("io.status");
        
        // 打印订阅列表
        std::vector<std::string> subscribedTopics = motion.getSubscribedTopics();
        std::cout << "已订阅主题：" << std::endl;
        for (const auto& topic : subscribedTopics) {
            std::cout << "- " << topic << std::endl;
        }
        
        // 发送测试消息
        LZMotion::Message testMsg;
        testMsg.id = "test_msg_001";
        testMsg.topic = "system.info";
        testMsg.content = "{\"message\":\"Hello from SDK\"}";
        testMsg.sender = "app";
        testMsg.receiver = "device";
        testMsg.priority = 50;
        
        result = motion.sendMessage(testMsg);
        if (result == 0) {
            std::cout << "测试消息发送成功" << std::endl;
        } else {
            std::cout << "测试消息发送失败，错误码：" << result << std::endl;
        }
        
        // 接收消息（阻塞方式）
        std::thread receiveThread([&motion]() {
            std::cout << "\n启动消息接收线程..." << std::endl;
            while (true) {
                LZMotion::Message msg = motion.receiveMessage("", 1000);
                if (!msg.id.empty()) {
                    std::cout << "[接收线程] 接收到消息：" << std::endl;
                    std::cout << "  ID: " << msg.id << std::endl;
                    std::cout << "  主题: " << msg.topic << std::endl;
                    std::cout << "--------------------------" << std::endl;
                }
            }
        });
        
        // 运行5秒
        std::cout << "\n程序运行5秒后退出..." << std::endl;
        std::this_thread::sleep_for(std::chrono::seconds(5));
        
        // 停止接收线程
        receiveThread.detach();
        
        // 获取消息队列长度
        int queueLength = motion.getMessageQueueLength();
        std::cout << "\n消息队列总长度：" << queueLength << std::endl;
        
        // 取消订阅
        motion.unsubscribeTopic("motion.status");
        motion.unsubscribeTopic("io.status");
        
    } catch (const std::exception& e) {
        std::cout << "发生异常：" << e.what() << std::endl;
        return 1;
    }
    
    // 断开设备连接
    motion.disconnect();
    
    // 释放SDK资源
    motion.release();
    
    std::cout << "\n程序结束" << std::endl;
    return 0;
}
```

## 7. 注意事项

1. 在使用消息中心功能前，确保SDK已成功初始化
2. 消息发送和接收需要设备已连接
3. 消息内容默认使用JSON格式，便于解析和处理
4. 消息优先级范围为0-100，值越大优先级越高
5. 消息回调函数在SDK内部线程中执行，避免在回调函数中执行长时间阻塞操作
6. 订阅主题后，会自动接收该主题的所有消息
7. 消息队列有默认大小限制，超出限制的消息会被丢弃或覆盖，可通过配置文件修改队列大小
8. 使用消息过滤功能可以减少不必要的消息处理，提高系统性能
9. 频繁发送高优先级消息可能会影响设备性能，建议合理设置消息优先级和发送频率
10. 消息ID建议使用唯一标识，便于跟踪和调试
