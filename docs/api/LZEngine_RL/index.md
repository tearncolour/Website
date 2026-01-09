# LZEngine_RL

本文档介绍了LZMotion SDK中的LZEngine_RL模块，用于灵巧手的强化学习训练和部署。

## 1. 概述

LZEngine_RL是一个强化学习引擎模块，提供了完整的强化学习训练框架和部署工具，帮助开发者为灵巧手开发和训练智能控制策略。它支持多种强化学习算法，并提供了与灵巧手硬件的无缝集成。

## 2. 功能特性

- **算法支持**：支持多种主流强化学习算法
- **环境集成**：内置灵巧手仿真环境和真实环境接口
- **训练工具**：提供完整的训练流程和可视化工具
- **模型部署**：支持将训练好的模型部署到灵巧手设备
- **性能优化**：针对灵巧手控制进行了性能优化

## 3. 快速开始

### 3.1 导入强化学习引擎

```python
import lzmotion.rl_engine
```

### 3.2 创建训练环境

```python
# 创建RL引擎实例
rl_engine = lzmotion.rl_engine.RLEngine()

# 配置训练环境
rl_engine.set_env_config({
    "env_type": "real",  # 或 "simulation"
    "device_port": "COM3",
    "observation_space": ["joint_positions", "joint_velocities", "force_sensors"],
    "action_space": "joint_torques"
})
```

### 3.3 配置训练算法

```python
# 配置PPO算法
rl_engine.set_algorithm_config({
    "algorithm": "ppo",
    "learning_rate": 0.0003,
    "gamma": 0.99,
    "gae_lambda": 0.95,
    "clip_range": 0.2,
    "entropy_coef": 0.01
})
```

### 3.4 开始训练

```python
# 开始训练
rl_engine.train(total_timesteps=1000000, log_interval=1000)
```

### 3.5 部署模型

```python
# 保存训练好的模型
rl_engine.save_model("output/grasping_policy")

# 部署模型到灵巧手
rl_engine.deploy_model("output/grasping_policy", "COM3")
```

## 4. API参考

### 4.1 RLEngine 类

**功能**：强化学习引擎主类，用于管理训练和部署流程

**构造函数**：

```python
class RLEngine:
    def __init__(self, config=None):
        # 初始化强化学习引擎
```

**参数**：
- `config`：引擎配置字典（可选）

**返回值**：
- 强化学习引擎实例

### 4.2 `set_env_config`

**功能**：配置训练环境

**函数声明**：

```python
def set_env_config(self, config):
    # 配置训练环境
```

**参数**：
- `config`：环境配置字典

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 4.3 `set_algorithm_config`

**功能**：配置训练算法

**函数声明**：

```python
def set_algorithm_config(self, config):
    # 配置训练算法
```

**参数**：
- `config`：算法配置字典

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 4.4 `train`

**功能**：开始训练模型

**函数声明**：

```python
def train(self, total_timesteps, log_interval=1000, callback=None):
    # 开始训练
```

**参数**：
- `total_timesteps`：总训练步数
- `log_interval`：日志记录间隔（可选）
- `callback`：训练回调函数（可选）

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 4.5 `save_model`

**功能**：保存训练好的模型

**函数声明**：

```python
def save_model(self, path):
    # 保存模型
```

**参数**：
- `path`：模型保存路径

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 4.6 `deploy_model`

**功能**：部署模型到灵巧手设备

**函数声明**：

```python
def deploy_model(self, model_path, device_port):
    # 部署模型
```

**参数**：
- `model_path`：模型文件路径
- `device_port`：设备端口

**返回值**：
- 成功：返回0
- 失败：返回错误码

## 5. 示例代码

### 完整训练流程示例

```python
import lzmotion.rl_engine
import logging

# 设置日志级别
logging.basicConfig(level=logging.INFO)

# 创建RL引擎实例
rl_engine = lzmotion.rl_engine.RLEngine()

# 配置训练环境（仿真环境）
print("配置训练环境...")
rl_engine.set_env_config({
    "env_type": "simulation",
    "robot_model": "lz_dexterous_hand_v2",
    "observation_space": ["joint_positions", "joint_velocities", "force_sensors"],
    "action_space": "joint_torques",
    "max_episode_steps": 500
})

# 配置PPO算法
print("配置训练算法...")
rl_engine.set_algorithm_config({
    "algorithm": "ppo",
    "learning_rate": 0.0003,
    "gamma": 0.99,
    "gae_lambda": 0.95,
    "clip_range": 0.2,
    "entropy_coef": 0.01,
    "vf_coef": 0.5,
    "max_grad_norm": 0.5
})

# 训练回调函数
def training_callback(timestep, episode_reward, policy_loss, value_loss):
    if timestep % 5000 == 0:
        print(f"Timestep {timestep}: Episode Reward = {episode_reward:.2f}, "
              f"Policy Loss = {policy_loss:.4f}, Value Loss = {value_loss:.4f}")

# 开始训练
print("开始训练...")
rl_engine.train(
    total_timesteps=500000,
    log_interval=1000,
    callback=training_callback
)

# 保存训练好的模型
print("保存训练模型...")
rl_engine.save_model("output/grasping_policy")

# 部署模型到真实设备
print("部署模型到真实设备...")
rl_engine.deploy_model("output/grasping_policy", "COM3")

print("训练和部署完成!")
```

## 6. 常见问题

### 6.1 仿真环境和真实环境有什么区别？

- 仿真环境：快速迭代，无硬件风险，适合算法开发和初步训练
- 真实环境：真实物理反馈，适合最终验证和部署，但训练速度较慢

### 6.2 支持哪些强化学习算法？

- PPO (Proximal Policy Optimization)
- DDPG (Deep Deterministic Policy Gradient)
- TD3 (Twin Delayed DDPG)
- SAC (Soft Actor-Critic)
- Q-Learning (用于离散动作空间)

### 6.3 如何提高训练效率？

- 先在仿真环境中训练，再迁移到真实环境
- 合理设置批次大小和学习率
- 使用经验回放和并行训练
- 针对特定任务优化奖励函数

## 7. 更新日志

- **v1.0.0** (2023-10-15)
  - 初始版本发布
  - 支持PPO和DDPG算法
  - 内置仿真环境

- **v1.1.0** (2023-11-20)
  - 新增TD3和SAC算法
  - 改进真实环境接口
  - 增加训练可视化工具

- **v1.2.0** (2024-01-10)
  - 优化训练性能
  - 支持多任务学习
  - 改进模型部署流程
