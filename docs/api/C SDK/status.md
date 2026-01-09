# 状态获取

本文档介绍了LZMotion C SDK中状态获取的相关函数。

## 1. 关节状态

### 1.1 `lzmotion_get_joint_angles`

**功能**：获取灵巧手当前的关节角度。

**函数声明**：

```c
int lzmotion_get_joint_angles(LZMotionContext ctx, float* joint_angles, int joint_count);
```

**参数**：
- `ctx`：LZMotionContext指针
- `joint_angles`：输出参数，用于存储关节角度数组（单位：度）
- `joint_count`：关节数量

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
    if (lzmotion_connect_by_id(ctx, "DEVICE_001") != 0) {
        printf("连接设备失败\n");
        lzmotion_release(ctx);
        return 1;
    }
    
    // 获取关节角度
    float joint_angles[6] = {0.0f};
    if (lzmotion_get_joint_angles(ctx, joint_angles, 6) != 0) {
        printf("获取关节角度失败\n");
        lzmotion_disconnect(ctx);
        lzmotion_release(ctx);
        return 1;
    }
    
    // 打印关节角度
    printf("关节角度：\n");
    for (int i = 0; i < 6; i++) {
        printf("关节 %d: %.2f 度\n", i+1, joint_angles[i]);
    }
    
    // 断开连接
    lzmotion_disconnect(ctx);
    lzmotion_release(ctx);
    return 0;
}
```

### 1.2 `lzmotion_get_joint_velocities`

**功能**：获取灵巧手当前的关节速度。

**函数声明**：

```c
int lzmotion_get_joint_velocities(LZMotionContext ctx, float* joint_velocities, int joint_count);
```

**参数**：
- `ctx`：LZMotionContext指针
- `joint_velocities`：输出参数，用于存储关节速度数组（单位：度/秒）
- `joint_count`：关节数量

**返回值**：
- 成功：返回0
- 失败：返回错误码

## 2. 笛卡尔坐标状态

### 2.1 `lzmotion_get_cartesian_position`

**功能**：获取灵巧手末端执行器当前的笛卡尔坐标位置和姿态。

**函数声明**：

```c
int lzmotion_get_cartesian_position(LZMotionContext ctx, float* position, float* orientation);
```

**参数**：
- `ctx`：LZMotionContext指针
- `position`：输出参数，用于存储位置坐标数组（x, y, z，单位：mm）
- `orientation`：输出参数，用于存储姿态数组（rx, ry, rz，单位：度）

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
    if (lzmotion_connect_by_id(ctx, "DEVICE_001") != 0) {
        printf("连接设备失败\n");
        lzmotion_release(ctx);
        return 1;
    }
    
    // 获取笛卡尔坐标
    float position[3] = {0.0f};
    float orientation[3] = {0.0f};
    if (lzmotion_get_cartesian_position(ctx, position, orientation) != 0) {
        printf("获取笛卡尔坐标失败\n");
        lzmotion_disconnect(ctx);
        lzmotion_release(ctx);
        return 1;
    }
    
    // 打印笛卡尔坐标
    printf("位置：X=%.2f mm, Y=%.2f mm, Z=%.2f mm\n", 
           position[0], position[1], position[2]);
    printf("姿态：RX=%.2f 度, RY=%.2f 度, RZ=%.2f 度\n", 
           orientation[0], orientation[1], orientation[2]);
    
    // 断开连接
    lzmotion_disconnect(ctx);
    lzmotion_release(ctx);
    return 0;
}
```

## 3. 设备状态

### 3.1 `lzmotion_get_device_status`

**功能**：获取设备的整体状态。

**函数声明**：

```c
int lzmotion_get_device_status(LZMotionContext ctx, int* status);
```

**参数**：
- `ctx`：LZMotionContext指针
- `status`：输出参数，用于存储设备状态
  - 0：未初始化
  - 1：已初始化
  - 2：空闲
  - 3：运动中
  - 4：暂停
  - 5：错误
  - 6：警告

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 3.2 `lzmotion_get_error_code`

**功能**：获取设备当前的错误代码。

**函数声明**：

```c
int lzmotion_get_error_code(LZMotionContext ctx, int* error_code, char* error_message, int message_length);
```

**参数**：
- `ctx`：LZMotionContext指针
- `error_code`：输出参数，用于存储错误代码
- `error_message`：输出参数，用于存储错误消息字符串
- `message_length`：错误消息字符串的最大长度

**返回值**：
- 成功：返回0
- 失败：返回错误码

## 4. IO状态

### 4.1 `lzmotion_get_digital_input`

**功能**：获取数字输入端口的状态。

**函数声明**：

```c
int lzmotion_get_digital_input(LZMotionContext ctx, int port, int* state);
```

**参数**：
- `ctx`：LZMotionContext指针
- `port`：数字输入端口号
- `state`：输出参数，用于存储端口状态（0：低电平，1：高电平）

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 4.2 `lzmotion_get_digital_output`

**功能**：获取数字输出端口的状态。

**函数声明**：

```c
int lzmotion_get_digital_output(LZMotionContext ctx, int port, int* state);
```

**参数**：
- `ctx`：LZMotionContext指针
- `port`：数字输出端口号
- `state`：输出参数，用于存储端口状态（0：低电平，1：高电平）

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 4.3 `lzmotion_get_analog_input`

**功能**：获取模拟输入端口的数值。

**函数声明**：

```c
int lzmotion_get_analog_input(LZMotionContext ctx, int port, float* value);
```

**参数**：
- `ctx`：LZMotionContext指针
- `port`：模拟输入端口号
- `value`：输出参数，用于存储端口数值（单位：V）

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 4.4 `lzmotion_get_analog_output`

**功能**：获取模拟输出端口的数值。

**函数声明**：

```c
int lzmotion_get_analog_output(LZMotionContext ctx, int port, float* value);
```

**参数**：
- `ctx`：LZMotionContext指针
- `port`：模拟输出端口号
- `value`：输出参数，用于存储端口数值（单位：V）

**返回值**：
- 成功：返回0
- 失败：返回错误码

## 5. 负载状态

### 5.1 `lzmotion_get_joint_torques`

**功能**：获取灵巧手当前的关节力矩。

**函数声明**：

```c
int lzmotion_get_joint_torques(LZMotionContext ctx, float* joint_torques, int joint_count);
```

**参数**：
- `ctx`：LZMotionContext指针
- `joint_torques`：输出参数，用于存储关节力矩数组（单位：Nm）
- `joint_count`：关节数量

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 5.2 `lzmotion_get_cartesian_force`

**功能**：获取灵巧手末端执行器当前的笛卡尔力。

**函数声明**：

```c
int lzmotion_get_cartesian_force(LZMotionContext ctx, float* force, float* torque);
```

**参数**：
- `ctx`：LZMotionContext指针
- `force`：输出参数，用于存储力向量（fx, fy, fz，单位：N）
- `torque`：输出参数，用于存储力矩向量（tx, ty, tz，单位：Nm）

**返回值**：
- 成功：返回0
- 失败：返回错误码
