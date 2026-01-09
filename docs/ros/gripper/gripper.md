# LZ Gripper ROS2 驱动包

`lz_gripper_ros2` 是灵掌灵巧手的 ROS2 驱动接口，包含底层驱动接口以及高层控制接口。它允许用户通过 ROS2 话题轻松控制灵巧手的关节位置、速度和力度，并获取实时状态。

## 功能特性

- **底层通信**：基于 Modbus RTU 的灵巧手底层通信。
- **控制接口**：提供高层控制话题，支持手掌整体状态及单个关节点的精细控制。
- **状态反馈**：通过 ROS2 话题实时发布灵巧手关节状态及压力传感器数据。
- **高度可配**：支持通过启动参数自定义通信接口（如串口名）和波特率。

## 依赖条件

- **ROS2**：建议使用 ROS2 Jazzy 或更高版本。
- **驱动库**：需安装 `serial_driver`。

## 安装步骤

1. **下载代码**：将驱动包克隆到你的 ROS2 工作空间（例如 `~/ros2_ws`）：
   ```bash
   cd ~/ros2_ws/src
   # 克隆仓库
   git clone <repository_url> lz_gripper_ros2
   ```

2. **编译工程**：
   ```bash
   cd ~/ros2_ws
   colcon build --packages-select lz_gripper_ros2
   ```

3. **环境初始化**：
   ```bash
   source install/setup.bash
   ```

## 使用指南

### 启动驱动节点

使用以下命令启动灵巧手驱动节点：

```bash
ros2 launch lz_gripper_ros2 lz_gripper.launch.py
```

### 启动参数

你可以通过命令行覆盖默认参数：

| 参数名 | 说明 | 默认值 |
| :--- | :--- | :--- |
| `port` | 连接灵巧手的串口名称 | `/dev/ttyUSB0` |
| `baud_rate` | 串口通信波特率 | `115200` |
| `publish_rate` | 关节状态话题的发布频率 (Hz) | `10.0` |

**示例命令**：
```bash
ros2 launch lz_gripper_ros2 lz_gripper.launch.py port:=/dev/ttyACM0 baud_rate:=115200
```

## ROS2 话题说明

### 订阅话题 (Subscribed Topics)

- **`/finger_positions`** (`std_msgs/Float32MultiArray`)
  - 设置单个手指的目标位置（范围 0-1000）。
  - 数组大小必须为 6（每个手指一个值）。
- **`/gripper_command`** (`std_msgs/Bool`)
  - `true`：控制灵巧手握紧。
  - `false`：控制灵巧手张开。
- **`/write_register`** (`std_msgs/Float32MultiArray`)
  - 综合控制接口，支持设置位置、速度、力度等。详见[控制逻辑详解](#控制逻辑详解)。

### 发布话题 (Published Topics)

- **`/lv_gripper_states`** (`sensor_msgs/JointState`)
  - 实时发布 5 个手指的当前关节位置。
  - 关节名称：`finger1`, `finger2`, `finger3`, `finger4`, `finger5`。
- **`/gripper_state`** (`std_msgs/Bool`)
  - 灵巧手的整体开合状态反馈。
  - `true`：已握紧；`false`：已张开。

### 获取压力传感器数据

灵巧手的压力传感器数据包含在 `/lv_gripper_states` 话题中（对应 `effort` 字段），有效值范围通常在 `750`–`3000` 之间。

```bash
ros2 topic echo /lv_gripper_states
```

## 控制逻辑详解

为了确保灵巧手按程序的顺序执行，建议使用 `/write_register` 话题进行控制。

### `set_register` 数据格式

发送给 `/write_register` 的数组（`Float32MultiArray`）应包含 10 位数据，格式如下：

| 索引 | 功能 (索引0) | 索引1 | 索引2 | 索引3 | 索引4 | 索引5 | 索引6 | 索引7 | 索引8 | 索引9 | 说明 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **位置设置** | `Finger_Positions` (1) | 左手2/右手1 | 运行时间(ms) | 大拇指翻转 | 大拇指弯曲 | 食指弯曲 | 中指弯曲 | 无名指弯曲 | 小拇指弯曲 | - | 设置各关节弯曲幅度(0-1000) |
| **开合控制** | `Gripper_Command` (2) | 左手2/右手1 | 运行时间(ms) | 动作值(0/1) | - | - | - | - | - | - | 0为张开，1为握紧 |
| **速度设置** | `Finger_Velocity` (3) | 左手2/右手1 | 紧急0/正常1 | 运行时间(ms) | 大拇指翻转速 | 大拇指速 | 食指速 | 中指速 | 无名指速 | 小拇指速 | 设置各关节运动速度(0-1000) |
| **力度设置** | `Finger_Effort` (4) | 左手2/右手1 | 紧急0/正常1 | 运行时间(ms) | 大拇指翻转力 | 大拇指力 | 食指力 | 中指力 | 无名指力 | 小拇指力 | 设置各关节抓取力度(0-1000) |

## Python 控制示例

以下是一个简单的 Python 节点示例，演示如何通过 `/write_register` 话题控制灵巧手：

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32MultiArray

# 常量定义
FINGER_POSITIONS = 1.0
FINGER_VELOCITY = 3.0
FINGER_EFFORT = 4.0
LEFT_HAND = 2.0
RIGHT_HAND = 1.0
NORMAL_MODE = 1.0

class GripperController(Node):
    def __init__(self):
        super().__init__('gripper_controller')
        self.register_pub = self.create_publisher(Float32MultiArray, 'write_register', 10)

    def set_gripper(self, data):
        msg = Float32MultiArray()
        msg.data = [float(x) for x in data]
        self.register_pub.publish(msg)
        self.get_logger().info(f'Published command: {msg.data}')

def main():
    rclpy.init()
    node = GripperController()

    # 1. 设置力度 (索引顺序：功能, 手ID, 运行模式, 运行时间, 翻转力, 指1力, 指2力, 指3力, 指4力, 指5力)
    node.set_gripper([FINGER_EFFORT, LEFT_HAND, NORMAL_MODE, 1.0, 1000.0, 1000.0, 1000.0, 1000.0, 1000.0, 1000.0])
    
    # 2. 设置速度
    node.set_gripper([FINGER_VELOCITY, LEFT_HAND, NORMAL_MODE, 1.0, 500.0, 500.0, 500.0, 500.0, 500.0, 500.0])
    
    # 3. 设置动作 (功能, 手ID, 持续时间ms, 翻转角度, 指1, 指2, 指3, 指4, 指5)
    # 示例：半握拳动作
    node.set_gripper([FINGER_POSITIONS, LEFT_HAND, 500.0, 500.0, 500.0, 500.0, 300.0, 300.0, 300.0])

    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```
