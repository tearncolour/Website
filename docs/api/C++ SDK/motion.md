# Motion 运动控制

本文档介绍了LZMotion C++ SDK中运动控制的相关功能。

## 1. 运动参数配置

### 1.1 运动参数结构体

```cpp
struct MotionParams {
    float speed;             // 运动速度 (mm/s 或 deg/s)
    float acceleration;      // 加速度 (mm/s² 或 deg/s²)
    float deceleration;      // 减速度 (mm/s² 或 deg/s²)
    float jerk;              // 加加速度 (mm/s³ 或 deg/s³)
    CoordinateSystem coord;  // 坐标系类型
};
```

### 1.2 设置默认运动参数

```cpp
// 设置默认运动参数
int setDefaultMotionParams(const MotionParams& params);
```

**参数**：
- `params`：默认运动参数

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
    
    // 设置默认运动参数
    LZMotion::MotionParams params;
    params.speed = 100.0f;
    params.acceleration = 500.0f;
    params.deceleration = 500.0f;
    params.jerk = 1000.0f;
    params.coord = LZMotion::CoordinateSystem::BASE;
    
    int result = motion.setDefaultMotionParams(params);
    if (result != 0) {
        std::cout << "设置默认运动参数失败，错误码：" << result << std::endl;
    }
    
    motion.release();
    return 0;
}
```

## 2. 关节运动控制

### 2.1 关节角运动

```cpp
// 关节角运动
int moveJoint(const std::vector<float>& jointAngles, const MotionParams& params = {});
```

**参数**：
- `jointAngles`：目标关节角度数组
- `params`：运动参数（可选，默认使用默认参数）

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
    
    // 关节角运动
    std::vector<float> jointAngles = {0.0f, -30.0f, 60.0f, 0.0f, 30.0f, 0.0f};
    int result = motion.moveJoint(jointAngles);
    if (result != 0) {
        std::cout << "关节角运动失败，错误码：" << result << std::endl;
    }
    
    motion.release();
    return 0;
}
```

### 2.2 关节角增量运动

```cpp
// 关节角增量运动
int moveJointIncrement(const std::vector<float>& jointAnglesDelta, const MotionParams& params = {});
```

**参数**：
- `jointAnglesDelta`：关节角度增量数组
- `params`：运动参数（可选，默认使用默认参数）

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
    
    // 关节角增量运动（每个关节增加10度）
    std::vector<float> jointAnglesDelta = {10.0f, 10.0f, 10.0f, 10.0f, 10.0f, 10.0f};
    int result = motion.moveJointIncrement(jointAnglesDelta);
    if (result != 0) {
        std::cout << "关节角增量运动失败，错误码：" << result << std::endl;
    }
    
    motion.release();
    return 0;
}
```

## 3. 笛卡尔坐标运动

### 3.1 笛卡尔坐标位置运动

```cpp
// 笛卡尔坐标位置运动
int moveCartesian(const std::vector<float>& pose, const MotionParams& params = {});
```

**参数**：
- `pose`：目标笛卡尔坐标位置（X, Y, Z, Rx, Ry, Rz）
- `params`：运动参数（可选，默认使用默认参数）

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
    
    // 笛卡尔坐标位置运动
    std::vector<float> pose = {100.0f, 200.0f, 300.0f, 0.0f, 0.0f, 0.0f};
    LZMotion::MotionParams params;
    params.speed = 50.0f;
    params.coord = LZMotion::CoordinateSystem::BASE;
    
    int result = motion.moveCartesian(pose, params);
    if (result != 0) {
        std::cout << "笛卡尔坐标运动失败，错误码：" << result << std::endl;
    }
    
    motion.release();
    return 0;
}
```

### 3.2 笛卡尔坐标增量运动

```cpp
// 笛卡尔坐标增量运动
int moveCartesianIncrement(const std::vector<float>& poseDelta, const MotionParams& params = {});
```

**参数**：
- `poseDelta`：笛卡尔坐标增量（X, Y, Z, Rx, Ry, Rz）
- `params`：运动参数（可选，默认使用默认参数）

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
    
    // 笛卡尔坐标增量运动（X轴增加50mm）
    std::vector<float> poseDelta = {50.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f};
    int result = motion.moveCartesianIncrement(poseDelta);
    if (result != 0) {
        std::cout << "笛卡尔坐标增量运动失败，错误码：" << result << std::endl;
    }
    
    motion.release();
    return 0;
}
```

## 4. 线性运动

```cpp
// 线性运动
int moveLinear(const std::vector<float>& targetPose, const MotionParams& params = {});
```

**参数**：
- `targetPose`：目标笛卡尔坐标位置
- `params`：运动参数（可选，默认使用默认参数）

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
    
    // 线性运动
    std::vector<float> targetPose = {150.0f, 250.0f, 350.0f, 0.0f, 0.0f, 0.0f};
    int result = motion.moveLinear(targetPose);
    if (result != 0) {
        std::cout << "线性运动失败，错误码：" << result << std::endl;
    }
    
    motion.release();
    return 0;
}
```

## 5. PTP运动

```cpp
// PTP运动
int movePTP(const std::vector<float>& targetPose, const MotionParams& params = {});
```

**参数**：
- `targetPose`：目标笛卡尔坐标位置
- `params`：运动参数（可选，默认使用默认参数）

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
    
    // PTP运动
    std::vector<float> targetPose = {200.0f, 300.0f, 400.0f, 0.0f, 0.0f, 0.0f};
    int result = motion.movePTP(targetPose);
    if (result != 0) {
        std::cout << "PTP运动失败，错误码：" << result << std::endl;
    }
    
    motion.release();
    return 0;
}
```

## 6. 运动状态管理

### 6.1 停止运动

```cpp
// 停止运动
int stop(bool emergency = false);
```

**参数**：
- `emergency`：是否紧急停止

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
    
    // 停止运动
    int result = motion.stop();
    if (result != 0) {
        std::cout << "停止运动失败，错误码：" << result << std::endl;
    }
    
    motion.release();
    return 0;
}
```

### 6.2 暂停运动

```cpp
// 暂停运动
int pause();
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
    
    // 暂停运动
    int result = motion.pause();
    if (result != 0) {
        std::cout << "暂停运动失败，错误码：" << result << std::endl;
    }
    
    motion.release();
    return 0;
}
```

### 6.3 恢复运动

```cpp
// 恢复运动
int resume();
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
    
    // 恢复运动
    int result = motion.resume();
    if (result != 0) {
        std::cout << "恢复运动失败，错误码：" << result << std::endl;
    }
    
    motion.release();
    return 0;
}
```

### 6.4 检查运动状态

```cpp
// 检查运动是否完成
bool isMotionCompleted();

// 获取当前运动状态
MotionState getMotionState();
```

**参数**：
- 无

**返回值**：
- `isMotionCompleted()`：运动完成返回true，否则返回false
- `getMotionState()`：返回当前运动状态

**示例**：

```cpp
#include <LZMotion.h>
#include <iostream>
#include <thread>
#include <chrono>

int main() {
    LZMotion motion;
    motion.init();
    
    // 连接设备
    motion.connectById("DEVICE_001");
    
    // 执行运动
    std::vector<float> jointAngles = {0.0f, -30.0f, 60.0f, 0.0f, 30.0f, 0.0f};
    motion.moveJoint(jointAngles);
    
    // 等待运动完成
    while (!motion.isMotionCompleted()) {
        std::cout << "运动进行中..." << std::endl;
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }
    
    std::cout << "运动完成！" << std::endl;
    
    // 获取当前运动状态
    LZMotion::MotionState state = motion.getMotionState();
    std::cout << "当前运动状态：" << static_cast<int>(state) << std::endl;
    
    motion.release();
    return 0;
}
```

## 7. 轨迹规划

### 7.1 开始轨迹规划

```cpp
// 开始轨迹规划
int startTrajectory();
```

**参数**：
- 无

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 7.2 添加轨迹点

```cpp
// 添加关节角轨迹点
int addJointWaypoint(const std::vector<float>& jointAngles, const MotionParams& params = {});

// 添加笛卡尔坐标轨迹点
int addCartesianWaypoint(const std::vector<float>& pose, const MotionParams& params = {});
```

**参数**：
- `jointAngles`：关节角度
- `pose`：笛卡尔坐标位置
- `params`：运动参数（可选，默认使用默认参数）

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 7.3 执行轨迹

```cpp
// 执行轨迹
int executeTrajectory();
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
    
    // 开始轨迹规划
    int result = motion.startTrajectory();
    if (result != 0) {
        std::cout << "开始轨迹规划失败，错误码：" << result << std::endl;
        return 1;
    }
    
    // 设置默认运动参数
    LZMotion::MotionParams params;
    params.speed = 80.0f;
    params.coord = LZMotion::CoordinateSystem::BASE;
    motion.setDefaultMotionParams(params);
    
    // 添加轨迹点
    motion.addJointWaypoint({0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f});
    motion.addJointWaypoint({30.0f, -15.0f, 45.0f, 0.0f, 20.0f, 0.0f});
    motion.addJointWaypoint({60.0f, -30.0f, 60.0f, 0.0f, 30.0f, 0.0f});
    
    // 执行轨迹
    result = motion.executeTrajectory();
    if (result != 0) {
        std::cout << "执行轨迹失败，错误码：" << result << std::endl;
    }
    
    motion.release();
    return 0;
}
```

## 8. 示例：完整的运动控制流程

```cpp
#include <LZMotion.h>
#include <iostream>
#include <vector>
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
        
        // 连接设备
        std::cout << "正在连接设备..." << std::endl;
        result = motion.connectById("DEVICE_001");
        if (result != 0) {
            std::cout << "连接设备失败，错误码：" << result << std::endl;
            return 1;
        }
        
        std::cout << "设备连接成功！" << std::endl;
        
        // 设置默认运动参数
        LZMotion::MotionParams params;
        params.speed = 100.0f;
        params.acceleration = 500.0f;
        params.deceleration = 500.0f;
        params.coord = LZMotion::CoordinateSystem::BASE;
        
        motion.setDefaultMotionParams(params);
        std::cout << "默认运动参数设置成功" << std::endl;
        
        // 执行关节角运动
        std::cout << "执行关节角运动..." << std::endl;
        std::vector<float> jointPose1 = {0.0f, -30.0f, 60.0f, 0.0f, 30.0f, 0.0f};
        motion.moveJoint(jointPose1);
        
        // 等待运动完成
        while (!motion.isMotionCompleted()) {
            std::this_thread::sleep_for(std::chrono::milliseconds(500));
        }
        
        std::cout << "关节角运动完成！" << std::endl;
        
        // 执行笛卡尔坐标运动
        std::cout << "执行笛卡尔坐标运动..." << std::endl;
        std::vector<float> cartPose1 = {100.0f, 200.0f, 300.0f, 0.0f, 0.0f, 0.0f};
        motion.moveCartesian(cartPose1);
        
        // 等待运动完成
        while (!motion.isMotionCompleted()) {
            std::this_thread::sleep_for(std::chrono::milliseconds(500));
        }
        
        std::cout << "笛卡尔坐标运动完成！" << std::endl;
        
        // 执行线性运动
        std::cout << "执行线性运动..." << std::endl;
        std::vector<float> cartPose2 = {150.0f, 250.0f, 350.0f, 0.0f, 0.0f, 0.0f};
        params.speed = 50.0f;  // 降低速度
        motion.moveLinear(cartPose2, params);
        
        // 等待运动完成
        while (!motion.isMotionCompleted()) {
            std::this_thread::sleep_for(std::chrono::milliseconds(500));
        }
        
        std::cout << "线性运动完成！" << std::endl;
        
        // 执行轨迹规划
        std::cout << "执行轨迹规划..." << std::endl;
        
        // 开始轨迹规划
        motion.startTrajectory();
        
        // 添加轨迹点
        motion.addJointWaypoint({0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f});
        motion.addJointWaypoint({10.0f, -10.0f, 20.0f, 0.0f, 10.0f, 0.0f});
        motion.addJointWaypoint({20.0f, -20.0f, 40.0f, 0.0f, 20.0f, 0.0f});
        
        // 执行轨迹
        motion.executeTrajectory();
        
        // 等待轨迹执行完成
        while (!motion.isMotionCompleted()) {
            std::this_thread::sleep_for(std::chrono::milliseconds(500));
        }
        
        std::cout << "轨迹规划执行完成！" << std::endl;
        
        // 返回初始位置
        std::cout << "返回初始位置..." << std::endl;
        std::vector<float> homePose = {0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f};
        motion.moveJoint(homePose);
        
        // 等待运动完成
        while (!motion.isMotionCompleted()) {
            std::this_thread::sleep_for(std::chrono::milliseconds(500));
        }
        
        std::cout << "返回初始位置完成！" << std::endl;
        
    } catch (const std::exception& e) {
        std::cout << "发生异常：" << e.what() << std::endl;
        return 1;
    }
    
    // 断开设备连接
    motion.disconnect();
    
    // 释放SDK资源
    motion.release();
    
    std::cout << "程序结束" << std::endl;
    return 0;
}
```

## 9. 注意事项

1. 在调用运动控制函数前，确保设备已成功连接
2. 设置合理的运动参数，避免速度和加速度过大导致设备损坏
3. 执行运动前，确保灵巧手工作空间内没有障碍物
4. 使用轨迹规划功能时，注意轨迹点之间的平滑过渡
5. 在运动过程中，如遇到紧急情况，使用emergency参数调用stop()函数
6. 定期检查设备状态，确保设备工作正常
