# 运动控制

本文档介绍了LZMotion C SDK中运动控制的相关函数。

## 1. 运动基本概念

### 1.1 关节角与笛卡尔坐标

LZMotion SDK支持两种主要的运动控制方式：
- **关节角控制**：直接控制灵巧手每个关节的角度
- **笛卡尔坐标控制**：控制灵巧手末端执行器在笛卡尔坐标系中的位置和姿态

### 1.2 运动参数结构体

```c
typedef struct {
    float velocity;        // 运动速度（单位：%）
    float acceleration;    // 运动加速度（单位：%）
    float deceleration;    // 运动减速度（单位：%）
    float jerk;            // 运动加加速度（单位：%）
    int blend;             // 平滑过渡系数（0-100）
    int coordinate_system; // 坐标系类型（0：关节坐标系，1：笛卡尔坐标系）
} LZMotionParams;
```

## 2. 关节角控制

### 2.1 `lzmotion_move_joint`

**功能**：控制灵巧手以指定的关节角度运动。

**函数声明**：

```c
int lzmotion_move_joint(LZMotionContext ctx, const float* joint_angles, int joint_count, const LZMotionParams* params);
```

**参数**：
- `ctx`：LZMotionContext指针
- `joint_angles`：关节角度数组（单位：度）
- `joint_count`：关节数量
- `params`：运动参数结构体指针，NULL表示使用默认参数

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
    
    // 设置运动参数
    LZMotionParams params;
    params.velocity = 50.0f;      // 50%最大速度
    params.acceleration = 30.0f;  // 30%最大加速度
    params.deceleration = 30.0f;  // 30%最大减速度
    params.jerk = 20.0f;          // 20%最大加加速度
    params.blend = 0;             // 无平滑过渡
    params.coordinate_system = 0; // 关节坐标系
    
    // 多关节灵巧手关节角度（度）
    float joint_angles[6] = {0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f};
    
    // 运动到目标关节角度
    if (lzmotion_move_joint(ctx, joint_angles, 6, &params) != 0) {
        printf("运动失败\n");
        lzmotion_disconnect(ctx);
        lzmotion_release(ctx);
        return 1;
    }
    
    printf("运动命令发送成功\n");
    
    // 等待运动完成
    lzmotion_wait_motion_done(ctx, -1); // 无限等待
    
    // 断开连接
    lzmotion_disconnect(ctx);
    lzmotion_release(ctx);
    return 0;
}
```

## 3. 笛卡尔坐标控制

### 3.1 `lzmotion_move_cartesian`

**功能**：控制灵巧手以笛卡尔坐标方式运动到目标位置。

**函数声明**：

```c
int lzmotion_move_cartesian(LZMotionContext ctx, const float* position, const float* orientation, const LZMotionParams* params);
```

**参数**：
- `ctx`：LZMotionContext指针
- `position`：位置坐标数组（x, y, z，单位：mm）
- `orientation`：姿态数组（rx, ry, rz，单位：度）
- `params`：运动参数结构体指针，NULL表示使用默认参数

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
    
    // 设置运动参数
    LZMotionParams params;
    params.velocity = 50.0f;
    params.acceleration = 30.0f;
    params.deceleration = 30.0f;
    params.jerk = 20.0f;
    params.blend = 0;
    params.coordinate_system = 1; // 笛卡尔坐标系
    
    // 目标位置（x, y, z，单位：mm）
    float position[3] = {100.0f, 0.0f, 100.0f};
    
    // 目标姿态（rx, ry, rz，单位：度）
    float orientation[3] = {0.0f, 0.0f, 0.0f};
    
    // 运动到目标笛卡尔坐标
    if (lzmotion_move_cartesian(ctx, position, orientation, &params) != 0) {
        printf("运动失败\n");
        lzmotion_disconnect(ctx);
        lzmotion_release(ctx);
        return 1;
    }
    
    printf("运动命令发送成功\n");
    
    // 等待运动完成
    lzmotion_wait_motion_done(ctx, -1);
    
    // 断开连接
    lzmotion_disconnect(ctx);
    lzmotion_release(ctx);
    return 0;
}
```

## 4. 运动状态管理

### 4.1 `lzmotion_stop`

**功能**：停止当前运动。

**函数声明**：

```c
int lzmotion_stop(LZMotionContext ctx, int decelerate);
```

**参数**：
- `ctx`：LZMotionContext指针
- `decelerate`：是否减速停止（1：减速停止，0：立即停止）

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 4.2 `lzmotion_wait_motion_done`

**功能**：等待运动完成。

**函数声明**：

```c
int lzmotion_wait_motion_done(LZMotionContext ctx, int timeout_ms);
```

**参数**：
- `ctx`：LZMotionContext指针
- `timeout_ms`：超时时间（单位：毫秒），-1表示无限等待

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 4.3 `lzmotion_is_motion_done`

**功能**：检查运动是否完成。

**函数声明**：

```c
int lzmotion_is_motion_done(LZMotionContext ctx);
```

**参数**：
- `ctx`：LZMotionContext指针

**返回值**：
- 运动完成：返回1
- 运动中：返回0
- 错误：返回-1

## 5. 轨迹规划

### 5.1 `lzmotion_add_waypoint`

**功能**：向轨迹规划器添加路径点。

**函数声明**：

```c
int lzmotion_add_waypoint(LZMotionContext ctx, const float* position, const float* orientation, const LZMotionParams* params);
```

**参数**：
- `ctx`：LZMotionContext指针
- `position`：位置坐标数组（x, y, z，单位：mm）
- `orientation`：姿态数组（rx, ry, rz，单位：度）
- `params`：运动参数结构体指针

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 5.2 `lzmotion_execute_trajectory`

**功能**：执行已规划的轨迹。

**函数声明**：

```c
int lzmotion_execute_trajectory(LZMotionContext ctx);
```

**参数**：
- `ctx`：LZMotionContext指针

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 5.3 `lzmotion_clear_trajectory`

**功能**：清除已规划的轨迹。

**函数声明**：

```c
int lzmotion_clear_trajectory(LZMotionContext ctx);
```

**参数**：
- `ctx`：LZMotionContext指针

**返回值**：
- 成功：返回0
- 失败：返回错误码
