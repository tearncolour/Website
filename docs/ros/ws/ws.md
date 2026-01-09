# ROS2 工作空间配置

本指南介绍了如何为灵掌机器人驱动配置基本的 ROS2 工作空间环境。

## 环境要求

- **操作系统**：Ubuntu 22.04 (Jammy) 或 24.04 (Noble)
- **ROS2 版本**：Humble 或 Jazzy
- **串口权限**：确保当前用户具有访问串口的权限。

### 串口权限设置

灵巧手通过串口（USB）进行通信。你需要将用户加入 `dialout` 组：

```bash
sudo usermod -a -G dialout $USER
```
*注：执行此命令后，需要注销并重新登录才能生效。*

## 创建工作空间

如果你还没有 ROS2 工作空间，可以按照以下步骤创建一个：

```bash
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws/src
```

## 安装通用依赖

编译驱动之前，通常需要安装以下常用工具：

```bash
sudo apt update
sudo apt install python3-colcon-common-extensions python3-rosdep
```

### 安装驱动依赖库

灵巧手驱动依赖 `serial_driver`：

```bash
sudo apt install ros-$ROS_DISTRO-serial-driver
```

## 常用开发命令

### 编译工程

在工作空间根目录下执行：

```bash
colcon build --symlink-install
```

### 运行节点

确保已经 `source` 了环境：

```bash
source install/setup.bash
ros2 launch lz_gripper_ros2 lz_gripper.launch.py
```

### 检查话题列表

```bash
ros2 topic list
```
