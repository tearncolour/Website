# Device 设备连接与管理

本文档介绍了LZMotion C++ SDK中设备连接与管理的相关功能。

## 1. 设备连接

### 1.1 通过ID连接设备

```cpp
// 通过设备ID连接设备
int connectById(const std::string& deviceId, int timeout_ms = 5000);
```

**参数**：
- `deviceId`：设备唯一标识符
- `timeout_ms`：连接超时时间（毫秒），默认5000毫秒

**返回值**：
- 成功：返回0
- 失败：返回错误码

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 通过ID连接设备
    int result = motion.connectById("DEVICE_001");
    if (result != 0) {
        std::cout << "连接设备失败，错误码：" << result << std::endl;
        motion.release();
        return 1;
    }
    
    std::cout << "设备连接成功" << std::endl;
    
    motion.release();
    return 0;
}
```

### 1.2 通过IP地址连接设备

```cpp
// 通过IP地址连接设备
int connectByIp(const std::string& ip, int port = 502, int timeout_ms = 5000);
```

**参数**：
- `ip`：设备IP地址
- `port`：端口号，默认502
- `timeout_ms`：连接超时时间（毫秒），默认5000毫秒

**返回值**：
- 成功：返回0
- 失败：返回错误码

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 通过IP地址连接设备
    int result = motion.connectByIp("192.168.1.100", 502);
    if (result != 0) {
        std::cout << "连接设备失败，错误码：" << result << std::endl;
        motion.release();
        return 1;
    }
    
    std::cout << "设备连接成功" << std::endl;
    
    motion.release();
    return 0;
}
```

### 1.3 通过串口连接设备

```cpp
// 通过串口连接设备
int connectBySerial(const std::string& serialPort, int baudRate = 115200, int timeout_ms = 5000);
```

**参数**：
- `serialPort`：串口名称（如"COM3"、"/dev/ttyUSB0"）
- `baudRate`：波特率，默认115200
- `timeout_ms`：连接超时时间（毫秒），默认5000毫秒

**返回值**：
- 成功：返回0
- 失败：返回错误码

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 通过串口连接设备
    int result = motion.connectBySerial("COM3", 115200);
    if (result != 0) {
        std::cout << "连接设备失败，错误码：" << result << std::endl;
        motion.release();
        return 1;
    }
    
    std::cout << "设备连接成功" << std::endl;
    
    motion.release();
    return 0;
}
```

## 2. 设备断开

```cpp
// 断开设备连接
int disconnect();
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
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 断开设备连接
    int result = motion.disconnect();
    if (result != 0) {
        std::cout << "断开设备连接失败，错误码：" << result << std::endl;
    } else {
        std::cout << "设备已断开连接" << std::endl;
    }
    
    motion.release();
    return 0;
}
```

## 3. 设备状态

### 3.1 检查设备连接状态

```cpp
// 检查设备是否已连接
bool isConnected();
```

**参数**：
- 无

**返回值**：
- 已连接：返回true
- 未连接：返回false

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 检查设备连接状态
    bool connected = motion.isConnected();
    std::cout << "设备连接状态：" << (connected ? "已连接" : "未连接") << std::endl;
    
    motion.release();
    return 0;
}
```

### 3.2 获取当前连接设备信息

```cpp
// 获取当前连接的设备信息
DeviceInfo getCurrentDeviceInfo();
```

**参数**：
- 无

**返回值**：
- 设备信息结构体

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 获取当前连接设备信息
    LZMotion::DeviceInfo info = motion.getCurrentDeviceInfo();
    
    std::cout << "当前连接设备信息：" << std::endl;
    std::cout << "  ID: " << info.id << std::endl;
    std::cout << "  名称: " << info.name << std::endl;
    std::cout << "  型号: " << info.model << std::endl;
    std::cout << "  IP: " << info.ip << std::endl;
    std::cout << "  固件版本: " << info.firmware << std::endl;
    
    motion.release();
    return 0;
}
```

## 4. 设备控制

### 4.1 重启设备

```cpp
// 重启设备
int rebootDevice(int timeout_ms = 30000);
```

**参数**：
- `timeout_ms`：重启超时时间（毫秒），默认30000毫秒

**返回值**：
- 成功：返回0
- 失败：返回错误码

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 重启设备
    int result = motion.rebootDevice();
    if (result != 0) {
        std::cout << "重启设备失败，错误码：" << result << std::endl;
    } else {
        std::cout << "设备重启指令已发送" << std::endl;
    }
    
    motion.release();
    return 0;
}
```

### 4.2 更新设备固件

```cpp
// 更新设备固件
int updateFirmware(const std::string& firmwarePath, int timeout_ms = 600000);
```

**参数**：
- `firmwarePath`：固件文件路径
- `timeout_ms`：更新超时时间（毫秒），默认600000毫秒（10分钟）

**返回值**：
- 成功：返回0
- 失败：返回错误码

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 更新设备固件
    int result = motion.updateFirmware("firmware_v1.2.3.bin");
    if (result != 0) {
        std::cout << "更新固件失败，错误码：" << result << std::endl;
    } else {
        std::cout << "固件更新成功" << std::endl;
    }
    
    motion.release();
    return 0;
}
```

## 5. 设备参数配置

### 5.1 获取设备参数

```cpp
// 获取设备参数
std::string getDeviceParam(const std::string& paramName);

// 获取设备参数（整数类型）
int getDeviceParamInt(const std::string& paramName);

// 获取设备参数（浮点数类型）
float getDeviceParamFloat(const std::string& paramName);
```

**参数**：
- `paramName`：参数名称

**返回值**：
- 成功：返回参数值
- 失败：返回默认值或错误

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 获取设备参数
    std::string deviceName = motion.getDeviceParam("device_name");
    int maxSpeed = motion.getDeviceParamInt("max_speed");
    float acceleration = motion.getDeviceParamFloat("acceleration");
    
    std::cout << "设备名称：" << deviceName << std::endl;
    std::cout << "最大速度：" << maxSpeed << std::endl;
    std::cout << "加速度：" << acceleration << std::endl;
    
    motion.release();
    return 0;
}
```

### 5.2 设置设备参数

```cpp
// 设置设备参数
int setDeviceParam(const std::string& paramName, const std::string& value);

// 设置设备参数（整数类型）
int setDeviceParamInt(const std::string& paramName, int value);

// 设置设备参数（浮点数类型）
int setDeviceParamFloat(const std::string& paramName, float value);
```

**参数**：
- `paramName`：参数名称
- `value`：参数值

**返回值**：
- 成功：返回0
- 失败：返回错误码

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 设置设备参数
    int result1 = motion.setDeviceParam("device_name", "Robot_001");
    int result2 = motion.setDeviceParamInt("max_speed", 100);
    int result3 = motion.setDeviceParamFloat("acceleration", 50.5f);
    
    if (result1 == 0 && result2 == 0 && result3 == 0) {
        std::cout << "设备参数设置成功" << std::endl;
    } else {
        std::cout << "设备参数设置失败" << std::endl;
    }
    
    motion.release();
    return 0;
}
```

## 6. 示例：完整的设备管理流程

```cpp
#include <LZMotion.h>
#include <iostream>
#include <thread>
#include <chrono>

int main() {
    LZMotion motion;
    
    try {
        // 初始化SDK
        int result = motion.init();
        if (result != 0) {
            std::cout << "初始化SDK失败，错误码：" << result << std::endl;
            return 1;
        }
        
        // 搜索设备
        std::cout << "正在搜索设备..." << std::endl;
        std::vector<LZMotion::DeviceInfo> devices = motion.scanDevices();
        
        if (devices.empty()) {
            std::cout << "未找到任何设备" << std::endl;
            motion.release();
            return 1;
        }
        
        // 打印设备列表
        for (size_t i = 0; i < devices.size(); ++i) {
            std::cout << "设备 " << i+1 << ":" << std::endl;
            std::cout << "  ID: " << devices[i].id << std::endl;
            std::cout << "  名称: " << devices[i].name << std::endl;
            std::cout << "  型号: " << devices[i].model << std::endl;
            std::cout << "  IP: " << devices[i].ip << std::endl;
        }
        
        // 选择第一个设备连接
        const auto& selectedDevice = devices[0];
        std::cout << "正在连接设备 " << selectedDevice.name << "..." << std::endl;
        
        // 通过ID连接设备
        result = motion.connectById(selectedDevice.id);
        if (result != 0) {
            std::cout << "连接设备失败，错误码：" << result << std::endl;
            motion.release();
            return 1;
        }
        
        std::cout << "设备连接成功！" << std::endl;
        
        // 检查连接状态
        if (motion.isConnected()) {
            std::cout << "设备当前处于连接状态" << std::endl;
        }
        
        // 获取当前设备信息
        LZMotion::DeviceInfo currentDevice = motion.getCurrentDeviceInfo();
        std::cout << "当前设备信息：" << std::endl;
        std::cout << "  ID: " << currentDevice.id << std::endl;
        std::cout << "  名称: " << currentDevice.name << std::endl;
        std::cout << "  固件版本: " << currentDevice.firmware << std::endl;
        
        // 设置设备参数
        std::cout << "正在设置设备参数..." << std::endl;
        result = motion.setDeviceParam("device_name", "LZMotion_Robot");
        if (result == 0) {
            std::cout << "设备名称设置成功" << std::endl;
        }
        
        // 获取设备参数
        std::string deviceName = motion.getDeviceParam("device_name");
        std::cout << "更新后的设备名称：" << deviceName << std::endl;
        
        // 模拟设备使用
        std::cout << "设备正在运行中..." << std::endl;
        std::this_thread::sleep_for(std::chrono::seconds(3));
        
        // 断开设备连接
        std::cout << "正在断开设备连接..." << std::endl;
        result = motion.disconnect();
        if (result == 0) {
            std::cout << "设备已成功断开连接" << std::endl;
        }
        
    } catch (const std::exception& e) {
        std::cout << "发生异常：" << e.what() << std::endl;
    }
    
    // 释放SDK资源
    motion.release();
    
    std::cout << "程序结束" << std::endl;
    return 0;
}
```

## 7. 注意事项

1. 在调用设备相关功能前，确保设备已成功连接
2. 连接设备时建议设置合理的超时时间
3. 设备参数的设置可能需要设备重启后才能生效
4. 更新固件时确保设备有足够的电量，避免更新过程中断电
5. 断开设备连接前，确保所有操作已完成
