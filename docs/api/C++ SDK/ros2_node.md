# ROS2 Node ROS2节点

本文档介绍了LZMotion C++ SDK中ROS2节点的相关功能。

## 1. 概述

LZMotion ROS2节点提供了与ROS2（Robot Operating System 2）的集成接口，允许用户通过ROS2的话题（Topics）、服务（Services）和动作（Actions）来控制灵巧手设备。

## 2. 安装与配置

### 2.1 依赖环境

- ROS2 Foxy/Humble/Iron
- C++17或更高版本
- LZMotion C++ SDK

### 2.2 安装ROS2节点包

```bash
# 安装LZMotion ROS2节点包
cd ~/ros2_ws/src
git clone <lzmotion_ros2_repo_url>
cd ~/ros2_ws
colcon build
```

### 2.3 配置环境变量

```bash
# 加载ROS2环境
source /opt/ros/humble/setup.bash

# 加载LZMotion ROS2节点环境
source ~/ros2_ws/install/setup.bash
```

## 3. ROS2节点启动

### 3.1 启动LZMotion ROS2节点

```bash
# 启动LZMotion ROS2节点
ros2 run lzmotion_ros2 lzmotion_ros2_node
```

### 3.2 带参数启动

```bash
# 带参数启动LZMotion ROS2节点
ros2 run lzmotion_ros2 lzmotion_ros2_node --ros-args -p device_id:=DEVICE_001 -p baud_rate:=115200
```

### 3.3 使用launch文件启动

```bash
# 使用launch文件启动LZMotion ROS2节点
ros2 launch lzmotion_ros2 lzmotion_ros2_node.launch.py
```

### 3.4 参数说明

| 参数名称 | 类型 | 默认值 | 描述 |
|---------|------|-------|------|
| device_id | string | "DEVICE_001" | 设备ID |
| baud_rate | int | 115200 | 波特率 |
| ip_address | string | "192.168.1.100" | IP地址 |
| port | int | 5000 | 端口号 |
| robot_type | string | "dexterous_hand" | 灵巧手类型 |
| joint_number | int | 6 | 关节数量 |
| rate | double | 100.0 | 发布频率(Hz) |
| use_sim_time | bool | false | 使用仿真时间 |

## 4. ROS2话题

### 4.1 发布的话题

#### 4.1.1 /joint_states

**类型**：sensor_msgs/msg/JointState

**描述**：发布灵巧手关节状态

**示例**：

```
header:
  stamp:
    sec: 1620000000
    nanosec: 123456789
  frame_id: "base_link"
name: ["joint_1", "joint_2", "joint_3", "joint_4", "joint_5", "joint_6"]
position: [0.0, -1.57, 1.57, 0.0, 0.0, 0.0]
velocity: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
effort: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
```

#### 4.1.2 /robot_state

**类型**：lzmotion_ros2/msg/RobotState

**描述**：发布灵巧手整体状态

**定义**：

```
# RobotState.msg
int32 state_code
string state_description
bool is_connected
bool is_moving
bool is_error
double voltage
double temperature
```

#### 4.1.3 /tool_position

**类型**：geometry_msgs/msg/PoseStamped

**描述**：发布工具坐标系位置

**示例**：

```
header:
  stamp:
    sec: 1620000000
    nanosec: 234567890
  frame_id: "base_link"
pose:
  position:
    x: 100.0
    y: 0.0
    z: 200.0
  orientation:
    x: 0.0
    y: 0.0
    z: 0.0
    w: 1.0
```

### 4.2 订阅的话题

#### 4.2.1 /joint_trajectory

**类型**：trajectory_msgs/msg/JointTrajectory

**描述**：订阅关节轨迹命令

**示例**：

```
header:
  stamp:
    sec: 1620000000
    nanosec: 345678901
  frame_id: ""
joint_names: ["joint_1", "joint_2", "joint_3", "joint_4", "joint_5", "joint_6"]
points:
  - positions: [0.0, -1.57, 1.57, 0.0, 0.0, 0.0]
    velocities: []
    accelerations: []
    effort: []
    time_from_start: {sec: 2, nanosec: 0}
  - positions: [0.5, -1.0, 1.0, 0.5, 0.0, 0.0]
    velocities: []
    accelerations: []
    effort: []
    time_from_start: {sec: 4, nanosec: 0}
```

#### 4.2.2 /cartesian_pose

**类型**：geometry_msgs/msg/PoseStamped

**描述**：订阅笛卡尔坐标位置命令

**示例**：

```
header:
  stamp:
    sec: 1620000000
    nanosec: 456789012
  frame_id: "base_link"
pose:
  position:
    x: 150.0
    y: 50.0
    z: 250.0
  orientation:
    x: 0.0
    y: 0.0
    z: 0.0
    w: 1.0
```

#### 4.2.3 /robot_command

**类型**：lzmotion_ros2/msg/RobotCommand

**描述**：订阅灵巧手控制命令

**定义**：

```
# RobotCommand.msg
int32 command_code
string command_data
```

## 5. ROS2服务

### 5.1 /connect_device

**类型**：lzmotion_ros2/srv/ConnectDevice

**描述**：连接设备

**请求**：

```
# ConnectDevice.srv
string device_id
---
bool success
string message
```

**响应**：

```
success: True
message: "Device connected successfully"
```

### 5.2 /disconnect_device

**类型**：lzmotion_ros2/srv/DisconnectDevice

**描述**：断开设备连接

**请求**：

```
# DisconnectDevice.srv
---
bool success
string message
```

**响应**：

```
success: True
message: "Device disconnected successfully"
```

### 5.3 /stop_motion

**类型**：lzmotion_ros2/srv/StopMotion

**描述**：停止运动

**请求**：

```
# StopMotion.srv
---
bool success
string message
```

**响应**：

```
success: True
message: "Motion stopped successfully"
```

### 5.4 /set_digital_output

**类型**：lzmotion_ros2/srv/SetDigitalOutput

**描述**：设置数字输出

**请求**：

```
# SetDigitalOutput.srv
int32 port
bool value
---
bool success
string message
```

**响应**：

```
success: True
message: "Digital output set successfully"
```

### 5.5 /get_digital_input

**类型**：lzmotion_ros2/srv/GetDigitalInput

**描述**：获取数字输入

**请求**：

```
# GetDigitalInput.srv
int32 port
---
bool value
bool success
string message
```

**响应**：

```
value: True
success: True
message: "Digital input read successfully"
```

## 6. ROS2动作

### 6.1 /move_joint

**类型**：lzmotion_ros2/action/MoveJoint

**描述**：关节运动动作

**目标**：

```
# MoveJoint.action
alias "float64[]" as JointAngles
JointAngles joint_angles
float64 velocity
float64 acceleration
float64 time_from_start
---
bool success
string message
---
float64 progress
```

### 6.2 /move_cartesian

**类型**：lzmotion_ros2/action/MoveCartesian

**描述**：笛卡尔坐标运动动作

**目标**：

```
# MoveCartesian.action
geometry_msgs/PoseStamped pose
float64 velocity
float64 acceleration
float64 time_from_start
---
bool success
string message
---
float64 progress
```

## 7. C++ API示例

### 7.1 ROS2节点代码示例

```cpp
#include <rclcpp/rclcpp.hpp>
#include <lzmotion_ros2/lzmotion_ros2_node.hpp>
#include <LZMotion.h>

int main(int argc, char** argv) {
    // 初始化ROS2节点
    rclcpp::init(argc, argv);
    
    // 创建LZMotion ROS2节点
    auto ros2Node = std::make_shared<lzmotion_ros2::LZMotionROS2Node>();
    
    // 初始化LZMotion SDK
    int result = ros2Node->init();
    if (result != 0) {
        RCLCPP_ERROR(ros2Node->get_logger(), "初始化LZMotion SDK失败，错误码：%d", result);
        return 1;
    }
    
    // 连接设备
    std::string deviceId = ros2Node->get_parameter("device_id").as_string();
    
    result = ros2Node->connectDevice(deviceId);
    if (result != 0) {
        RCLCPP_ERROR(ros2Node->get_logger(), "连接设备失败，错误码：%d", result);
        return 1;
    }
    
    // 启动ROS2节点循环
    rclcpp::spin(ros2Node);
    
    // 断开设备连接
    ros2Node->disconnectDevice();
    
    // 释放资源
    ros2Node->release();
    
    // 关闭ROS2节点
    rclcpp::shutdown();
    
    return 0;
}
```

### 7.2 使用ROS2服务示例

```cpp
#include <rclcpp/rclcpp.hpp>
#include <lzmotion_ros2/srv/connect_device.hpp>
#include <lzmotion_ros2/srv/disconnect_device.hpp>
#include <lzmotion_ros2/srv/stop_motion.hpp>

int main(int argc, char** argv) {
    // 初始化ROS2节点
    rclcpp::init(argc, argv);
    auto node = rclcpp::Node::make_shared("lzmotion_ros2_client");
    
    // 创建服务客户端
    auto connectClient = node->create_client<lzmotion_ros2::srv::ConnectDevice>("/lzmotion_ros2/connect_device");
    auto disconnectClient = node->create_client<lzmotion_ros2::srv::DisconnectDevice>("/lzmotion_ros2/disconnect_device");
    auto stopClient = node->create_client<lzmotion_ros2::srv::StopMotion>("/lzmotion_ros2/stop_motion");
    
    // 等待服务可用
    if (!connectClient->wait_for_service(std::chrono::seconds(10))) {
        RCLCPP_ERROR(node->get_logger(), "连接设备服务不可用");
        return 1;
    }
    
    // 连接设备
    auto connectRequest = std::make_shared<lzmotion_ros2::srv::ConnectDevice::Request>();
    connectRequest->device_id = "DEVICE_001";
    
    auto connectResult = connectClient->async_send_request(connectRequest);
    if (rclcpp::spin_until_future_complete(node, connectResult) == rclcpp::FutureReturnCode::SUCCESS) {
        RCLCPP_INFO(node->get_logger(), "连接设备结果：%s", connectResult.get()->message.c_str());
    } else {
        RCLCPP_ERROR(node->get_logger(), "调用连接设备服务失败");
        return 1;
    }
    
    // 停止运动
    if (!stopClient->wait_for_service(std::chrono::seconds(10))) {
        RCLCPP_ERROR(node->get_logger(), "停止运动服务不可用");
        return 1;
    }
    
    auto stopRequest = std::make_shared<lzmotion_ros2::srv::StopMotion::Request>();
    auto stopResult = stopClient->async_send_request(stopRequest);
    if (rclcpp::spin_until_future_complete(node, stopResult) == rclcpp::FutureReturnCode::SUCCESS) {
        RCLCPP_INFO(node->get_logger(), "停止运动结果：%s", stopResult.get()->message.c_str());
    } else {
        RCLCPP_ERROR(node->get_logger(), "调用停止运动服务失败");
        return 1;
    }
    
    // 断开设备连接
    if (!disconnectClient->wait_for_service(std::chrono::seconds(10))) {
        RCLCPP_ERROR(node->get_logger(), "断开设备连接服务不可用");
        return 1;
    }
    
    auto disconnectRequest = std::make_shared<lzmotion_ros2::srv::DisconnectDevice::Request>();
    auto disconnectResult = disconnectClient->async_send_request(disconnectRequest);
    if (rclcpp::spin_until_future_complete(node, disconnectResult) == rclcpp::FutureReturnCode::SUCCESS) {
        RCLCPP_INFO(node->get_logger(), "断开设备连接结果：%s", disconnectResult.get()->message.c_str());
    } else {
        RCLCPP_ERROR(node->get_logger(), "调用断开设备连接服务失败");
        return 1;
    }
    
    // 关闭ROS2节点
    rclcpp::shutdown();
    
    return 0;
}
```

## 8. 示例：使用ROS2工具控制灵巧手

### 8.1 使用ros2 topic工具

```bash
# 查看关节状态
ros2 topic echo /joint_states

# 发送关节轨迹命令
ros2 topic pub /joint_trajectory trajectory_msgs/msg/JointTrajectory "{
  joint_names: ['joint_1', 'joint_2', 'joint_3', 'joint_4', 'joint_5', 'joint_6'],
  points: [
    {positions: [0.0, -1.57, 1.57, 0.0, 0.0, 0.0], time_from_start: {sec: 2}},
    {positions: [0.5, -1.0, 1.0, 0.5, 0.0, 0.0], time_from_start: {sec: 4}}
  ]
}"
```

### 8.2 使用ros2 service工具

```bash
# 连接设备
ros2 service call /lzmotion_ros2/connect_device lzmotion_ros2/srv/ConnectDevice "device_id: 'DEVICE_001'"

# 设置数字输出
ros2 service call /lzmotion_ros2/set_digital_output lzmotion_ros2/srv/SetDigitalOutput "port: 0
value: true"

# 获取数字输入
ros2 service call /lzmotion_ros2/get_digital_input lzmotion_ros2/srv/GetDigitalInput "port: 0"

# 停止运动
ros2 service call /lzmotion_ros2/stop_motion lzmotion_ros2/srv/StopMotion

# 断开设备连接
ros2 service call /lzmotion_ros2/disconnect_device lzmotion_ros2/srv/DisconnectDevice
```

### 8.3 使用ros2 action工具

```bash
# 发送关节运动动作
ros2 action send_goal /move_joint lzmotion_ros2/action/MoveJoint "{
  joint_angles: [0.0, -1.57, 1.57, 0.0, 0.0, 0.0],
  velocity: 0.1,
  acceleration: 0.1,
  time_from_start: {sec: 2}
}"
```

## 9. 常见问题与解决方案

### 9.1 ROS2节点无法启动

**问题**：
```
[ERROR] [1620000000.123456789] [lzmotion_ros2_node]: 初始化LZMotion SDK失败，错误码：-1
```

**解决方案**：
1. 检查LZMotion SDK是否正确安装
2. 检查设备连接是否正常
3. 检查设备ID是否正确

### 9.2 话题订阅无响应

**问题**：
```
ros2 topic echo /joint_states
无输出
```

**解决方案**：
1. 检查ROS2节点是否正常运行
2. 检查设备是否连接成功
3. 检查发布频率是否设置正确

### 9.3 轨迹执行失败

**问题**：
```
[ERROR] [1620000000.234567890] [lzmotion_ros2_node]: 执行关节轨迹失败，错误码：-2
```

**解决方案**：
1. 检查关节角度是否在安全范围内
2. 检查速度和加速度是否设置合理
3. 检查设备是否处于运动就绪状态

## 10. 注意事项

1. 在使用ROS2节点前，确保LZMotion SDK已正确安装
2. 确保ROS2环境变量已正确设置
3. 首次使用时，请先进行安全检查
4. 调整灵巧手运动参数时，请确保灵巧手周围环境安全
5. 定期检查设备连接状态
6. 不要同时使用SDK直接控制和ROS2节点控制
7. 当灵巧手处于运动状态时，请勿手动干预
8. 在ROS2环境中，确保使用的DDS实现与LZMotion ROS2节点兼容
