# ROS1 Node ROS1节点

本文档介绍了LZMotion C++ SDK中ROS1节点的相关功能。

## 1. 概述

LZMotion ROS1节点提供了与ROS1（Robot Operating System 1）的集成接口，允许用户通过ROS1的话题（Topics）、服务（Services）和动作（Actions）来控制灵巧手设备。

## 2. 安装与配置

### 2.1 依赖环境

- ROS1 Kinetic/Melodic/Noetic
- C++11或更高版本
- LZMotion C++ SDK

### 2.2 安装ROS1节点包

```bash
# 安装LZMotion ROS1节点包
cd ~/catkin_ws/src
git clone <lzmotion_ros1_repo_url>
cd ~/catkin_ws
catkin_make
```

### 2.3 配置环境变量

```bash
# 加载ROS1环境
source /opt/ros/noetic/setup.bash

# 加载LZMotion ROS1节点环境
source ~/catkin_ws/devel/setup.bash
```

## 3. ROS1节点启动

### 3.1 启动LZMotion ROS1节点

```bash
# 启动LZMotion ROS1节点
roslaunch lzmotion_ros1 lzmotion_ros1_node.launch
```

### 3.2 带参数启动

```bash
# 带参数启动LZMotion ROS1节点
roslaunch lzmotion_ros1 lzmotion_ros1_node.launch device_id:=DEVICE_001 baud_rate:=115200
```

### 3.3 参数说明

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

## 4. ROS1话题

### 4.1 发布的话题

#### 4.1.1 /joint_states

**类型**：sensor_msgs/JointState

**描述**：发布灵巧手关节状态

**示例**：

```
header:
  seq: 123
  stamp:
    secs: 1620000000
    nsecs: 123456789
  frame_id: "base_link"
name: ["joint_1", "joint_2", "joint_3", "joint_4", "joint_5", "joint_6"]
position: [0.0, -1.57, 1.57, 0.0, 0.0, 0.0]
velocity: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
effort: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
```

#### 4.1.2 /robot_state

**类型**：lzmotion_ros1/RobotState

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

**类型**：geometry_msgs/PoseStamped

**描述**：发布工具坐标系位置

**示例**：

```
header:
  seq: 456
  stamp:
    secs: 1620000000
    nsecs: 234567890
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

**类型**：trajectory_msgs/JointTrajectory

**描述**：订阅关节轨迹命令

**示例**：

```
header:
  seq: 789
  stamp:
    secs: 1620000000
    nsecs: 345678901
  frame_id: ""
joint_names: ["joint_1", "joint_2", "joint_3", "joint_4", "joint_5", "joint_6"]
points:
  - positions: [0.0, -1.57, 1.57, 0.0, 0.0, 0.0]
    velocities: []
    accelerations: []
    effort: []
    time_from_start: {secs: 2, nsecs: 0}
  - positions: [0.5, -1.0, 1.0, 0.5, 0.0, 0.0]
    velocities: []
    accelerations: []
    effort: []
    time_from_start: {secs: 4, nsecs: 0}
```

#### 4.2.2 /cartesian_pose

**类型**：geometry_msgs/PoseStamped

**描述**：订阅笛卡尔坐标位置命令

**示例**：

```
header:
  seq: 101
  stamp:
    secs: 1620000000
    nsecs: 456789012
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

**类型**：lzmotion_ros1/RobotCommand

**描述**：订阅灵巧手控制命令

**定义**：

```
# RobotCommand.msg
int32 command_code
string command_data
```

## 5. ROS1服务

### 5.1 /connect_device

**类型**：lzmotion_ros1/ConnectDevice

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

**类型**：lzmotion_ros1/DisconnectDevice

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

**类型**：lzmotion_ros1/StopMotion

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

**类型**：lzmotion_ros1/SetDigitalOutput

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

**类型**：lzmotion_ros1/GetDigitalInput

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

## 6. ROS1动作

### 6.1 /move_joint

**类型**：lzmotion_ros1/MoveJointAction

**描述**：关节运动动作

**目标**：

```
# MoveJointGoal.msg
alias "float64[]" as JointAngles
JointAngles joint_angles
float64 velocity
float64 acceleration
float64 time_from_start
```

**反馈**：

```
# MoveJointFeedback.msg
float64 progress
```

**结果**：

```
# MoveJointResult.msg
bool success
string message
```

### 6.2 /move_cartesian

**类型**：lzmotion_ros1/MoveCartesianAction

**描述**：笛卡尔坐标运动动作

**目标**：

```
# MoveCartesianGoal.msg
geometry_msgs/PoseStamped pose
float64 velocity
float64 acceleration
float64 time_from_start
```

**反馈**：

```
# MoveCartesianFeedback.msg
float64 progress
```

**结果**：

```
# MoveCartesianResult.msg
bool success
string message
```

## 7. C++ API示例

### 7.1 ROS1节点代码示例

```cpp
#include <ros/ros.h>
#include <lzmotion_ros1/lzmotion_ros1_node.h>
#include <LZMotion.h>

int main(int argc, char** argv) {
    // 初始化ROS1节点
    ros::init(argc, argv, "lzmotion_ros1_node");
    ros::NodeHandle nh("~");
    
    // 创建LZMotion ROS1节点
    lzmotion_ros1::LZMotionROS1Node ros1Node(nh);
    
    // 初始化LZMotion SDK
    int result = ros1Node.init();
    if (result != 0) {
        ROS_ERROR("初始化LZMotion SDK失败，错误码：%d", result);
        return 1;
    }
    
    // 连接设备
    std::string deviceId;
    nh.param<std::string>("device_id", deviceId, "DEVICE_001");
    
    result = ros1Node.connectDevice(deviceId);
    if (result != 0) {
        ROS_ERROR("连接设备失败，错误码：%d", result);
        return 1;
    }
    
    // 启动ROS1节点循环
    ros::Rate rate(100);
    while (ros::ok()) {
        // 发布状态
        ros1Node.publishStatus();
        
        // 处理ROS1回调
        ros::spinOnce();
        
        rate.sleep();
    }
    
    // 断开设备连接
    ros1Node.disconnectDevice();
    
    // 释放资源
    ros1Node.release();
    
    return 0;
}
```

### 7.2 使用ROS1服务示例

```cpp
#include <ros/ros.h>
#include <lzmotion_ros1/ConnectDevice.h>
#include <lzmotion_ros1/DisconnectDevice.h>
#include <lzmotion_ros1/StopMotion.h>

int main(int argc, char** argv) {
    // 初始化ROS1节点
    ros::init(argc, argv, "lzmotion_ros1_client");
    ros::NodeHandle nh;
    
    // 创建服务客户端
    ros::ServiceClient connectClient = nh.serviceClient<lzmotion_ros1::ConnectDevice>("/lzmotion_ros1/connect_device");
    ros::ServiceClient disconnectClient = nh.serviceClient<lzmotion_ros1::DisconnectDevice>("/lzmotion_ros1/disconnect_device");
    ros::ServiceClient stopClient = nh.serviceClient<lzmotion_ros1::StopMotion>("/lzmotion_ros1/stop_motion");
    
    // 连接设备
    lzmotion_ros1::ConnectDevice connectSrv;
    connectSrv.request.device_id = "DEVICE_001";
    
    if (connectClient.call(connectSrv)) {
        ROS_INFO("连接设备结果：%s", connectSrv.response.message.c_str());
    } else {
        ROS_ERROR("调用连接设备服务失败");
        return 1;
    }
    
    // 停止运动
    lzmotion_ros1::StopMotion stopSrv;
    
    if (stopClient.call(stopSrv)) {
        ROS_INFO("停止运动结果：%s", stopSrv.response.message.c_str());
    } else {
        ROS_ERROR("调用停止运动服务失败");
        return 1;
    }
    
    // 断开设备连接
    lzmotion_ros1::DisconnectDevice disconnectSrv;
    
    if (disconnectClient.call(disconnectSrv)) {
        ROS_INFO("断开设备连接结果：%s", disconnectSrv.response.message.c_str());
    } else {
        ROS_ERROR("调用断开设备连接服务失败");
        return 1;
    }
    
    return 0;
}
```

## 8. 示例：使用ROS1工具控制灵巧手

### 8.1 使用rostopic工具

```bash
# 查看关节状态
rostopic echo /joint_states

# 发送关节轨迹命令
rostopic pub /joint_trajectory trajectory_msgs/JointTrajectory "{
  joint_names: ['joint_1', 'joint_2', 'joint_3', 'joint_4', 'joint_5', 'joint_6'],
  points: [
    {positions: [0.0, -1.57, 1.57, 0.0, 0.0, 0.0], time_from_start: {secs: 2}},
    {positions: [0.5, -1.0, 1.0, 0.5, 0.0, 0.0], time_from_start: {secs: 4}}
  ]
}"
```

### 8.2 使用rosservice工具

```bash
# 连接设备
rosservice call /lzmotion_ros1/connect_device "device_id: 'DEVICE_001'"

# 设置数字输出
rosservice call /lzmotion_ros1/set_digital_output "port: 0
value: true"

# 获取数字输入
rosservice call /lzmotion_ros1/get_digital_input "port: 0"

# 停止运动
rosservice call /lzmotion_ros1/stop_motion

# 断开设备连接
rosservice call /lzmotion_ros1/disconnect_device
```

### 8.3 使用rosaction工具

```bash
# 发送关节运动动作
rosaction send_goal /move_joint lzmotion_ros1/MoveJointActionGoal "{
  goal_id: {id: 'move_joint_test'},
  goal: {
    joint_angles: [0.0, -1.57, 1.57, 0.0, 0.0, 0.0],
    velocity: 0.1,
    acceleration: 0.1,
    time_from_start: {secs: 2}
  }
}"
```

## 9. 常见问题与解决方案

### 9.1 ROS1节点无法启动

**问题**：
```
[ERROR] [1620000000.123456789]: 初始化LZMotion SDK失败，错误码：-1
```

**解决方案**：
1. 检查LZMotion SDK是否正确安装
2. 检查设备连接是否正常
3. 检查设备ID是否正确

### 9.2 话题订阅无响应

**问题**：
```
rostopic echo /joint_states
无输出
```

**解决方案**：
1. 检查ROS1节点是否正常运行
2. 检查设备是否连接成功
3. 检查发布频率是否设置正确

### 9.3 轨迹执行失败

**问题**：
```
[ERROR] [1620000000.234567890]: 执行关节轨迹失败，错误码：-2
```

**解决方案**：
1. 检查关节角度是否在安全范围内
2. 检查速度和加速度是否设置合理
3. 检查设备是否处于运动就绪状态

## 10. 注意事项

1. 在使用ROS1节点前，确保LZMotion SDK已正确安装
2. 确保ROS1环境变量已正确设置
3. 首次使用时，请先进行安全检查
4. 调整灵巧手运动参数时，请确保灵巧手周围环境安全
5. 定期检查设备连接状态
6. 不要同时使用SDK直接控制和ROS1节点控制
7. 当灵巧手处于运动状态时，请勿手动干预
