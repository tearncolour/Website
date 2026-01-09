# Core 核心功能

本文档介绍了LZMotion C++ SDK中的核心功能和类。

## 1. LZMotion类

LZMotion类是LZMotion C++ SDK的核心类，提供了所有功能的入口点。

### 1.1 构造与析构

```cpp
// 构造函数
LZMotion();

// 析构函数
~LZMotion();
```

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    // 创建LZMotion实例
    LZMotion motion;
    
    // 使用完成后自动析构
    return 0;
}
```

### 1.2 初始化与释放

```cpp
// 初始化SDK
int init();

// 释放SDK资源
int release();

// 获取SDK版本
std::string getVersion();
```

**参数**：
- 无

**返回值**：
- 成功：返回0
- 失败：返回错误码

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    
    // 初始化SDK
    int result = motion.init();
    if (result != 0) {
        std::cout << "初始化SDK失败，错误码：" << result << std::endl;
        return 1;
    }
    
    // 获取SDK版本
    std::string version = motion.getVersion();
    std::cout << "SDK版本：" << version << std::endl;
    
    // 释放SDK资源
    motion.release();
    
    return 0;
}
```

## 2. 设备管理

### 2.1 设备信息结构

```cpp
struct DeviceInfo {
    std::string id;          // 设备唯一标识符
    std::string name;        // 设备名称
    std::string model;       // 设备型号
    std::string ip;          // IP地址
    int port;                // 端口号
    std::string serial_port; // 串口
    std::string firmware;    // 固件版本
    int status;              // 设备状态
};
```

### 2.2 设备搜索

```cpp
// 搜索设备
std::vector<DeviceInfo> scanDevices(int timeout_ms = 5000);
```

**参数**：
- `timeout_ms`：搜索超时时间（毫秒），默认5000毫秒

**返回值**：
- 设备信息列表

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 搜索设备
    std::vector<LZMotion::DeviceInfo> devices = motion.scanDevices();
    
    // 打印设备信息
    for (const auto& device : devices) {
        std::cout << "设备ID：" << device.id << std::endl;
        std::cout << "设备名称：" << device.name << std::endl;
        std::cout << "设备型号：" << device.model << std::endl;
        std::cout << "IP地址：" << device.ip << std::endl;
        std::cout << "端口：" << device.port << std::endl;
        std::cout << "固件版本：" << device.firmware << std::endl;
        std::cout << "状态：" << device.status << std::endl;
        std::cout << "----------------------------" << std::endl;
    }
    
    motion.release();
    return 0;
}
```

## 3. 运动参数

### 3.1 运动参数结构

```cpp
enum CoordinateSystem {
    JOINT,      // 关节坐标系
    CARTESIAN,  // 笛卡尔坐标系
    TOOL,       // 工具坐标系
    USER        // 用户坐标系
};

struct MotionParams {
    double velocity;               // 速度 (单位：度/秒 或 mm/秒)
    double acceleration;           // 加速度 (单位：度/秒² 或 mm/秒²)
    double blending;               // 轨迹平滑度 (0-100)
    CoordinateSystem coordinate;   // 坐标系
    bool blocking;                 // 是否阻塞执行
};
```

### 3.2 默认运动参数

```cpp
// 获取默认运动参数
MotionParams getDefaultMotionParams();
```

**返回值**：
- 默认运动参数

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    
    // 获取默认运动参数
    LZMotion::MotionParams params = motion.getDefaultMotionParams();
    
    std::cout << "默认速度：" << params.velocity << std::endl;
    std::cout << "默认加速度：" << params.acceleration << std::endl;
    std::cout << "默认平滑度：" << params.blending << std::endl;
    
    return 0;
}
```

## 4. 错误处理

### 4.1 获取错误信息

```cpp
// 获取最后一次错误的描述
std::string getLastError();

// 根据错误码获取错误描述
std::string getErrorDescription(int errorCode);
```

**参数**：
- `errorCode`：错误码

**返回值**：
- 错误描述字符串

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    
    // 初始化SDK
    int result = motion.init();
    if (result != 0) {
        std::cout << "初始化失败，错误码：" << result << std::endl;
        std::cout << "错误描述：" << motion.getLastError() << std::endl;
        return 1;
    }
    
    motion.release();
    return 0;
}
```

## 5. 日志功能

### 5.1 设置日志级别

```cpp
enum LogLevel {
    DEBUG,    // 调试信息
    INFO,     // 普通信息
    WARNING,  // 警告信息
    ERROR     // 错误信息
};

// 设置日志级别
int setLogLevel(LogLevel level);

// 设置日志文件
int setLogFile(const std::string& filePath);
```

**参数**：
- `level`：日志级别
- `filePath`：日志文件路径

**返回值**：
- 成功：返回0
- 失败：返回错误码

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    
    // 设置日志级别为DEBUG
    motion.setLogLevel(LZMotion::LogLevel::DEBUG);
    
    // 设置日志文件
    motion.setLogFile("lzmotion.log");
    
    // 初始化SDK
    motion.init();
    
    // 其他操作...
    
    motion.release();
    return 0;
}
```

## 6. 配置管理

### 6.1 加载配置

```cpp
// 加载配置文件
int loadConfig(const std::string& configPath);

// 保存配置文件
int saveConfig(const std::string& configPath);
```

**参数**：
- `configPath`：配置文件路径

**返回值**：
- 成功：返回0
- 失败：返回错误码

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    
    // 加载配置文件
    int result = motion.loadConfig("config.json");
    if (result != 0) {
        std::cout << "加载配置文件失败，错误码：" << result << std::endl;
        return 1;
    }
    
    // 初始化SDK
    motion.init();
    
    // 其他操作...
    
    // 保存配置文件
    motion.saveConfig("config.json");
    
    motion.release();
    return 0;
}
```

## 7. 示例：完整的核心功能使用流程

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    // 创建LZMotion实例
    LZMotion motion;
    
    try {
        // 设置日志级别
        motion.setLogLevel(LZMotion::LogLevel::INFO);
        
        // 加载配置文件
        int result = motion.loadConfig("config.json");
        if (result != 0) {
            std::cout << "加载配置文件失败，将使用默认配置" << std::endl;
        }
        
        // 初始化SDK
        result = motion.init();
        if (result != 0) {
            std::cout << "初始化SDK失败，错误码：" << result << std::endl;
            std::cout << "错误描述：" << motion.getLastError() << std::endl;
            return 1;
        }
        
        // 获取SDK版本
        std::string version = motion.getVersion();
        std::cout << "LZMotion SDK版本：" << version << std::endl;
        
        // 搜索设备
        std::cout << "搜索设备..." << std::endl;
        std::vector<LZMotion::DeviceInfo> devices = motion.scanDevices();
        
        // 打印找到的设备
        std::cout << "找到 " << devices.size() << " 个设备：" << std::endl;
        for (size_t i = 0; i < devices.size(); ++i) {
            std::cout << "设备 " << i+1 << ":" << std::endl;
            std::cout << "  ID: " << devices[i].id << std::endl;
            std::cout << "  名称: " << devices[i].name << std::endl;
            std::cout << "  型号: " << devices[i].model << std::endl;
            std::cout << "  IP: " << devices[i].ip << std::endl;
            std::cout << "  固件版本: " << devices[i].firmware << std::endl;
        }
        
        // 获取默认运动参数
        LZMotion::MotionParams defaultParams = motion.getDefaultMotionParams();
        std::cout << "默认运动参数：" << std::endl;
        std::cout << "  速度: " << defaultParams.velocity << std::endl;
        std::cout << "  加速度: " << defaultParams.acceleration << std::endl;
        std::cout << "  平滑度: " << defaultParams.blending << std::endl;
        
        // 保存当前配置
        motion.saveConfig("updated_config.json");
        std::cout << "配置已保存到 updated_config.json" << std::endl;
        
    } catch (const std::exception& e) {
        std::cout << "发生异常：" << e.what() << std::endl;
    }
    
    // 释放SDK资源
    motion.release();
    
    std::cout << "程序结束" << std::endl;
    return 0;
}
```

## 8. 注意事项

1. LZMotion类不是线程安全的，在多线程环境中需要使用锁进行保护
2. 每个应用程序通常只需要一个LZMotion实例
3. 确保在使用任何功能之前调用init()方法初始化SDK
4. 程序结束时调用release()方法释放资源
5. 建议使用try-catch块捕获可能的异常
