# 训练器模块

本文档介绍了LZVision SDK中训练器模块的相关功能和API。

## 1. 概述

训练器模块是LZVision的核心组件之一，用于训练和优化灵巧手视觉识别模型。它提供了模型训练、数据标注、模型评估等功能，帮助开发者构建和优化适用于灵巧手的视觉识别模型。

## 2. 功能特性

- **模型训练**：支持多种深度学习模型的训练
- **数据标注**：提供便捷的数据标注工具和接口
- **模型评估**：评估模型性能并提供改进建议
- **模型导出**：将训练好的模型导出为可部署格式
- **训练监控**：实时监控训练过程和指标

## 3. 快速开始

### 3.1 导入训练器模块

```python
import lzmotion.vision.trainer
```

### 3.2 初始化训练器

```python
# 创建训练器实例
trainer = lzmotion.vision.trainer.Trainer()

# 设置训练参数
trainer.set_params({
    "model_type": "object_detection",
    "batch_size": 32,
    "epochs": 100,
    "learning_rate": 0.001
})
```

### 3.3 加载数据集

```python
# 加载训练数据集
trainer.load_dataset(
    train_images="path/to/train/images",
    train_labels="path/to/train/labels",
    val_images="path/to/val/images",
    val_labels="path/to/val/labels"
)
```

### 3.4 开始训练

```python
# 开始训练模型
trainer.train()
```

### 3.5 评估模型

```python
# 评估模型性能
eval_result = trainer.evaluate()
print(f"评估结果: {eval_result}")
```

### 3.6 导出模型

```python
# 导出训练好的模型
trainer.export_model("path/to/export/model.onnx")
```

## 4. API参考

### 4.1 Trainer 类

**功能**：训练器主类，用于管理模型训练流程

**构造函数**：

```python
class Trainer:
    def __init__(self, config=None):
        # 初始化训练器
```

**参数**：
- `config`：训练配置字典（可选）

**返回值**：
- 训练器实例

### 4.2 `set_params`

**功能**：设置训练参数

**函数声明**：

```python
def set_params(self, params):
    # 设置训练参数
```

**参数**：
- `params`：训练参数字典

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 4.3 `load_dataset`

**功能**：加载训练数据集

**函数声明**：

```python
def load_dataset(self, train_images, train_labels, val_images, val_labels):
    # 加载数据集
```

**参数**：
- `train_images`：训练图像路径
- `train_labels`：训练标签路径
- `val_images`：验证图像路径
- `val_labels`：验证标签路径

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 4.4 `train`

**功能**：开始训练模型

**函数声明**：

```python
def train(self, callback=None):
    # 开始训练
```

**参数**：
- `callback`：训练回调函数（可选）

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 4.5 `evaluate`

**功能**：评估模型性能

**函数声明**：

```python
def evaluate(self, dataset="val"):
    # 评估模型
```

**参数**：
- `dataset`：评估数据集（可选，默认"val"）

**返回值**：
- 评估结果字典

### 4.6 `export_model`

**功能**：导出训练好的模型

**函数声明**：

```python
def export_model(self, path, format="onnx"):
    # 导出模型
```

**参数**：
- `path`：导出路径
- `format`：导出格式（可选，默认"onnx"）

**返回值**：
- 成功：返回0
- 失败：返回错误码

## 5. 示例代码

### 完整训练流程示例

```python
import lzmotion.vision.trainer
import logging

# 设置日志级别
logging.basicConfig(level=logging.INFO)

# 创建训练器实例
trainer = lzmotion.vision.trainer.Trainer()

# 设置训练参数
trainer.set_params({
    "model_type": "object_detection",
    "model_name": "yolov5s",
    "batch_size": 16,
    "epochs": 50,
    "learning_rate": 0.001,
    "image_size": 640,
    "augmentation": True
})

# 加载数据集
print("加载数据集...")
result = trainer.load_dataset(
    train_images="data/train/images",
    train_labels="data/train/labels",
    val_images="data/val/images",
    val_labels="data/val/labels"
)

if result != 0:
    print("加载数据集失败")
    exit(1)

# 训练回调函数
def training_callback(epoch, loss, accuracy):
    print(f"Epoch {epoch}: Loss = {loss:.4f}, Accuracy = {accuracy:.4f}")

# 开始训练
print("开始训练...")
trainer.train(callback=training_callback)

# 评估模型
print("评估模型...")
eval_result = trainer.evaluate()
print(f"评估结果: {eval_result}")

# 导出模型
print("导出模型...")
trainer.export_model("output/model.onnx")

print("训练完成!")
```

## 6. 常见问题

### 6.1 训练过程中内存不足怎么办？

- 减少批次大小(batch_size)
- 降低图像分辨率(image_size)
- 使用混合精度训练
- 增加系统内存

### 6.2 模型训练效果不好怎么办？

- 增加训练数据集的规模和多样性
- 调整模型架构和超参数
- 使用数据增强技术
- 检查数据标注质量

### 6.3 支持哪些模型格式导出？

- ONNX
- TensorRT
- TensorFlow Lite
- PyTorch

## 7. 更新日志

- **v1.0.0** (2023-10-15)
  - 初始版本发布
  - 支持目标检测模型训练
  - 支持ONNX模型导出

- **v1.1.0** (2023-11-20)
  - 新增分类模型训练
  - 优化训练速度
  - 增加训练监控功能

- **v1.2.0** (2024-01-10)
  - 新增分割模型训练
  - 支持TensorRT和TensorFlow Lite导出
  - 改进模型评估指标
