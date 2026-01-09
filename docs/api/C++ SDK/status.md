# Status 状态获取

本文档介绍了LZMotion C++ SDK中状态获取的相关功能。

## 1. 关节状态获取

### 1.1 获取当前关节角度

```cpp
// 获取当前关节角度
std::vector<float> getJointAngles();
```

**参数**：
- 无

**返回值**：
- 关节角度数组

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 获取当前关节角度
    std::vector<float> jointAngles = motion.getJointAngles();
    
    std::cout << "当前关节角度：" << std::endl;
    for (size_t i = 0; i < jointAngles.size(); ++i) {
        std::cout << "关节 " << i+1 << ": " << jointAngles[i] << " 度" << std::endl;
    }
    
    motion.release();
    return 0;
}
```

### 1.2 获取关节角速度

```cpp
// 获取关节角速度
std::vector<float> getJointVelocities();
```

**参数**：
- 无

**返回值**：
- 关节角速度数组（deg/s）

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 获取关节角速度
    std::vector<float> jointVelocities = motion.getJointVelocities();
    
    std::cout << "当前关节角速度：" << std::endl;
    for (size_t i = 0; i < jointVelocities.size(); ++i) {
        std::cout << "关节 " << i+1 << ": " << jointVelocities[i] << " deg/s" << std::endl;
    }
    
    motion.release();
    return 0;
}
```

### 1.3 获取关节力矩

```cpp
// 获取关节力矩
std::vector<float> getJointTorques();
```

**参数**：
- 无

**返回值**：
- 关节力矩数组（Nm）

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 获取关节力矩
    std::vector<float> jointTorques = motion.getJointTorques();
    
    std::cout << "当前关节力矩：" << std::endl;
    for (size_t i = 0; i < jointTorques.size(); ++i) {
        std::cout << "关节 " << i+1 << ": " << jointTorques[i] << " Nm" << std::endl;
    }
    
    motion.release();
    return 0;
}
```

## 2. 笛卡尔坐标状态获取

### 2.1 获取当前笛卡尔坐标位置

```cpp
// 获取当前笛卡尔坐标位置
std::vector<float> getCartesianPosition(CoordinateSystem coord = CoordinateSystem::BASE);
```

**参数**：
- `coord`：坐标系类型，默认BASE坐标系

**返回值**：
- 笛卡尔坐标位置数组（X, Y, Z, Rx, Ry, Rz）

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 获取当前笛卡尔坐标位置
    std::vector<float> pose = motion.getCartesianPosition(LZMotion::CoordinateSystem::BASE);
    
    std::cout << "当前笛卡尔坐标位置：" << std::endl;
    std::cout << "X: " << pose[0] << " mm" << std::endl;
    std::cout << "Y: " << pose[1] << " mm" << std::endl;
    std::cout << "Z: " << pose[2] << " mm" << std::endl;
    std::cout << "Rx: " << pose[3] << " 度" << std::endl;
    std::cout << "Ry: " << pose[4] << " 度" << std::endl;
    std::cout << "Rz: " << pose[5] << " 度" << std::endl;
    
    motion.release();
    return 0;
}
```

### 2.2 获取工具坐标系位置

```cpp
// 获取工具坐标系位置
std::vector<float> getToolPosition(const std::string& toolId = "");
```

**参数**：
- `toolId`：工具ID，默认使用当前激活的工具

**返回值**：
- 工具坐标系位置数组

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 获取工具坐标系位置
    std::vector<float> toolPose = motion.getToolPosition();
    
    std::cout << "当前工具坐标系位置：" << std::endl;
    std::cout << "X: " << toolPose[0] << " mm" << std::endl;
    std::cout << "Y: " << toolPose[1] << " mm" << std::endl;
    std::cout << "Z: " << toolPose[2] << " mm" << std::endl;
    std::cout << "Rx: " << toolPose[3] << " 度" << std::endl;
    std::cout << "Ry: " << toolPose[4] << " 度" << std::endl;
    std::cout << "Rz: " << toolPose[5] << " 度" << std::endl;
    
    motion.release();
    return 0;
}
```

## 3. 设备状态获取

### 3.1 获取设备状态

```cpp
// 获取设备状态
DeviceStatus getDeviceStatus();
```

**参数**：
- 无

**返回值**：
- 设备状态枚举

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 获取设备状态
    LZMotion::DeviceStatus status = motion.getDeviceStatus();
    
    std::cout << "当前设备状态：" << static_cast<int>(status) << std::endl;
    
    motion.release();
    return 0;
}
```

### 3.2 获取设备温度

```cpp
// 获取设备温度
std::vector<float> getDeviceTemperatures();
```

**参数**：
- 无

**返回值**：
- 设备温度数组（℃）

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 获取设备温度
    std::vector<float> temperatures = motion.getDeviceTemperatures();
    
    std::cout << "当前设备温度：" << std::endl;
    for (size_t i = 0; i < temperatures.size(); ++i) {
        std::cout << "温度 " << i+1 << ": " << temperatures[i] << " ℃" << std::endl;
    }
    
    motion.release();
    return 0;
}
```

### 3.3 获取设备电压

```cpp
// 获取设备电压
float getDeviceVoltage();
```

**参数**：
- 无

**返回值**：
- 设备电压（V）

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 获取设备电压
    float voltage = motion.getDeviceVoltage();
    
    std::cout << "当前设备电压：" << voltage << " V" << std::endl;
    
    motion.release();
    return 0;
}
```

## 4. IO状态获取

### 4.1 获取数字输入状态

```cpp
// 获取数字输入状态
bool getDigitalInput(int port);
```

**参数**：
- `port`：输入端口号

**返回值**：
- 输入状态（true为高电平，false为低电平）

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 获取数字输入状态
    bool inputState = motion.getDigitalInput(0);
    
    std::cout << "输入端口 0 状态：" << (inputState ? "高电平" : "低电平") << std::endl;
    
    motion.release();
    return 0;
}
```

### 4.2 获取所有数字输入状态

```cpp
// 获取所有数字输入状态
std::vector<bool> getAllDigitalInputs();
```

**参数**：
- 无

**返回值**：
- 所有数字输入状态数组

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 获取所有数字输入状态
    std::vector<bool> inputStates = motion.getAllDigitalInputs();
    
    std::cout << "所有数字输入状态：" << std::endl;
    for (size_t i = 0; i < inputStates.size(); ++i) {
        std::cout << "输入端口 " << i << "：" << (inputStates[i] ? "高电平" : "低电平") << std::endl;
    }
    
    motion.release();
    return 0;
}
```

### 4.3 获取数字输出状态

```cpp
// 获取数字输出状态
bool getDigitalOutput(int port);
```

**参数**：
- `port`：输出端口号

**返回值**：
- 输出状态（true为高电平，false为低电平）

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 获取数字输出状态
    bool outputState = motion.getDigitalOutput(0);
    
    std::cout << "输出端口 0 状态：" << (outputState ? "高电平" : "低电平") << std::endl;
    
    motion.release();
    return 0;
}
```

### 4.4 获取所有数字输出状态

```cpp
// 获取所有数字输出状态
std::vector<bool> getAllDigitalOutputs();
```

**参数**：
- 无

**返回值**：
- 所有数字输出状态数组

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 获取所有数字输出状态
    std::vector<bool> outputStates = motion.getAllDigitalOutputs();
    
    std::cout << "所有数字输出状态：" << std::endl;
    for (size_t i = 0; i < outputStates.size(); ++i) {
        std::cout << "输出端口 " << i << "：" << (outputStates[i] ? "高电平" : "低电平") << std::endl;
    }
    
    motion.release();
    return 0;
}
```

### 4.5 获取模拟输入值

```cpp
// 获取模拟输入值
float getAnalogInput(int port);
```

**参数**：
- `port`：模拟输入端口号

**返回值**：
- 模拟输入值（V）

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 获取模拟输入值
    float analogValue = motion.getAnalogInput(0);
    
    std::cout << "模拟输入端口 0 值：" << analogValue << " V" << std::endl;
    
    motion.release();
    return 0;
}
```

### 4.6 获取模拟输出值

```cpp
// 获取模拟输出值
float getAnalogOutput(int port);
```

**参数**：
- `port`：模拟输出端口号

**返回值**：
- 模拟输出值（V）

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 获取模拟输出值
    float analogValue = motion.getAnalogOutput(0);
    
    std::cout << "模拟输出端口 0 值：" << analogValue << " V" << std::endl;
    
    motion.release();
    return 0;
}
```

## 5. 负载状态获取

### 5.1 获取负载质量

```cpp
// 获取负载质量
float getPayloadMass();
```

**参数**：
- 无

**返回值**：
- 负载质量（kg）

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 获取负载质量
    float mass = motion.getPayloadMass();
    
    std::cout << "当前负载质量：" << mass << " kg" << std::endl;
    
    motion.release();
    return 0;
}
```

### 5.2 获取负载惯性矩阵

```cpp
// 获取负载惯性矩阵
std::vector<float> getPayloadInertia();
```

**参数**：
- 无

**返回值**：
- 负载惯性矩阵（3x3矩阵，按行存储）

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 获取负载惯性矩阵
    std::vector<float> inertia = motion.getPayloadInertia();
    
    std::cout << "当前负载惯性矩阵：" << std::endl;
    std::cout << inertia[0] << " " << inertia[1] << " " << inertia[2] << std::endl;
    std::cout << inertia[3] << " " << inertia[4] << " " << inertia[5] << std::endl;
    std::cout << inertia[6] << " " << inertia[7] << " " << inertia[8] << std::endl;
    
    motion.release();
    return 0;
}
```

## 6. 示例：完整的状态获取流程

```cpp
#include <LZMotion.h>
#include <iostream>
#include <vector>

int main() {
    LZMotion motion;
    
    try {
        // 初始化SDK
        int result = motion.init();
        if (result != 0) {
            std::cout << "初始化SDK失败，错误码：" << result << std::endl;
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
        
        // 获取关节状态
        std::cout << "\n=== 关节状态 ===" << std::endl;
        
        // 获取关节角度
        std::vector<float> jointAngles = motion.getJointAngles();
        std::cout << "关节角度：" << std::endl;
        for (size_t i = 0; i < jointAngles.size(); ++i) {
            std::cout << "  关节 " << i+1 << ": " << jointAngles[i] << " 度" << std::endl;
        }
        
        // 获取关节角速度
        std::vector<float> jointVelocities = motion.getJointVelocities();
        std::cout << "关节角速度：" << std::endl;
        for (size_t i = 0; i < jointVelocities.size(); ++i) {
            std::cout << "  关节 " << i+1 << ": " << jointVelocities[i] << " deg/s" << std::endl;
        }
        
        // 获取关节力矩
        std::vector<float> jointTorques = motion.getJointTorques();
        std::cout << "关节力矩：" << std::endl;
        for (size_t i = 0; i < jointTorques.size(); ++i) {
            std::cout << "  关节 " << i+1 << ": " << jointTorques[i] << " Nm" << std::endl;
        }
        
        // 获取笛卡尔坐标状态
        std::cout << "\n=== 笛卡尔坐标状态 ===" << std::endl;
        
        // 获取笛卡尔坐标位置
        std::vector<float> cartPose = motion.getCartesianPosition(LZMotion::CoordinateSystem::BASE);
        std::cout << "笛卡尔坐标位置：" << std::endl;
        std::cout << "  X: " << cartPose[0] << " mm" << std::endl;
        std::cout << "  Y: " << cartPose[1] << " mm" << std::endl;
        std::cout << "  Z: " << cartPose[2] << " mm" << std::endl;
        std::cout << "  Rx: " << cartPose[3] << " 度" << std::endl;
        std::cout << "  Ry: " << cartPose[4] << " 度" << std::endl;
        std::cout << "  Rz: " << cartPose[5] << " 度" << std::endl;
        
        // 获取设备状态
        std::cout << "\n=== 设备状态 ===" << std::endl;
        
        // 获取设备状态
        LZMotion::DeviceStatus deviceStatus = motion.getDeviceStatus();
        std::cout << "设备状态：" << static_cast<int>(deviceStatus) << std::endl;
        
        // 获取设备温度
        std::vector<float> temperatures = motion.getDeviceTemperatures();
        std::cout << "设备温度：" << std::endl;
        for (size_t i = 0; i < temperatures.size(); ++i) {
            std::cout << "  温度 " << i+1 << ": " << temperatures[i] << " ℃" << std::endl;
        }
        
        // 获取设备电压
        float voltage = motion.getDeviceVoltage();
        std::cout << "设备电压：" << voltage << " V" << std::endl;
        
        // 获取IO状态
        std::cout << "\n=== IO状态 ===" << std::endl;
        
        // 获取数字输入状态
        std::vector<bool> inputStates = motion.getAllDigitalInputs();
        std::cout << "数字输入状态：" << std::endl;
        for (size_t i = 0; i < inputStates.size(); ++i) {
            std::cout << "  输入 " << i << ": " << (inputStates[i] ? "高电平" : "低电平") << std::endl;
        }
        
        // 获取数字输出状态
        std::vector<bool> outputStates = motion.getAllDigitalOutputs();
        std::cout << "数字输出状态：" << std::endl;
        for (size_t i = 0; i < outputStates.size(); ++i) {
            std::cout << "  输出 " << i << ": " << (outputStates[i] ? "高电平" : "低电平") << std::endl;
        }
        
        // 获取负载状态
        std::cout << "\n=== 负载状态 ===" << std::endl;
        
        // 获取负载质量
        float mass = motion.getPayloadMass();
        std::cout << "负载质量：" << mass << " kg" << std::endl;
        
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

1. 在调用状态获取函数前，确保设备已成功连接
2. 状态获取函数是实时的，会返回设备当前的实际状态
3. 频繁调用状态获取函数可能会影响设备性能，建议根据实际需求设置合理的采样频率
4. 不同的状态获取函数有不同的返回值格式，请参考示例代码正确解析
5. 部分状态获取函数支持不同的坐标系或参数，请根据实际需求选择合适的参数
