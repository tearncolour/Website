# 模型选择

本文档介绍了LZVision SDK中的模型选择模块，用于帮助开发者选择适合灵巧手视觉任务的最佳模型。

## 1. 概述

模型选择模块是LZVision的辅助组件，提供了模型评估、比较和推荐功能，帮助开发者根据具体应用场景和硬件条件选择最合适的视觉模型。它包含了多种预定义的模型配置和评估指标，支持自动化模型选择流程。

## 2. 功能特性

- **模型库**：包含多种预训练视觉模型
- **性能评估**：提供模型性能评估工具
- **硬件适配**：根据硬件条件推荐合适模型
- **任务匹配**：根据具体任务推荐最优模型
- **模型比较**：支持多模型性能对比
- **自动化选择**：提供自动化模型选择流程

## 3. 快速开始

### 3.1 导入模型选择模块

```python
import lzmotion.vision.modelselect
```

### 3.2 创建模型选择器

```python
# 创建模型选择器实例
model_selector = lzmotion.vision.modelselect.ModelSelector()

# 配置选择参数
model_selector.set_config({
    "task_type": "object_detection",  # 或 "classification", "segmentation"
    "hardware_type": "cpu",  # 或 "gpu", "npu"
    "max_model_size": 100,  # MB
    "min_accuracy": 0.8,
    "preferred_fps": 30
})
```

### 3.3 获取推荐模型

```python
# 获取推荐模型列表
top_models = model_selector.get_recommended_models(top_n=3)

# 显示推荐结果
for i, model in enumerate(top_models, 1):
    print(f"推荐模型 #{i}:")
    print(f"  名称: {model['name']}")
    print(f"  类型: {model['type']}")
    print(f"  大小: {model['size_mb']} MB")
    print(f"  准确率: {model['accuracy']:.2f}")
    print(f"  推理速度: {model['fps']:.1f} FPS")
    print(f"  适用硬件: {model['hardware_compatibility']}")
    print()
```

## 4. API参考

### 4.1 ModelSelector 类

**功能**：模型选择器主类，用于管理模型选择流程

**构造函数**：

```python
class ModelSelector:
    def __init__(self, config=None):
        # 初始化模型选择器
```

**参数**：
- `config`：选择器配置字典（可选）

**返回值**：
- 模型选择器实例

### 4.2 `set_config`

**功能**：设置模型选择参数

**函数声明**：

```python
def set_config(self, config):
    # 设置选择参数
```

**参数**：
- `config`：选择参数字典

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 4.3 `get_recommended_models`

**功能**：获取推荐模型列表

**函数声明**：

```python
def get_recommended_models(self, top_n=5, sort_by="score"):
    # 获取推荐模型
```

**参数**：
- `top_n`：返回前N个推荐模型（可选，默认5）
- `sort_by`：排序方式（可选，默认"score"，综合评分）

**返回值**：
- 推荐模型列表

### 4.4 `evaluate_model`

**功能**：评估特定模型的性能

**函数声明**：

```python
def evaluate_model(self, model_path, model_type):
    # 评估模型
```

**参数**：
- `model_path`：模型文件路径
- `model_type`：模型类型

**返回值**：
- 模型评估结果字典

### 4.5 `compare_models`

**功能**：比较多个模型的性能

**函数声明**：

```python
def compare_models(self, model_list):
    # 比较模型
```

**参数**：
- `model_list`：模型文件路径列表

**返回值**：
- 模型比较结果字典

## 5. 示例代码

### 完整模型选择流程示例

```python
import lzmotion.vision.modelselect

# 创建模型选择器实例
model_selector = lzmotion.vision.modelselect.ModelSelector()

# 定义应用场景
print("配置应用场景...")
model_selector.set_config({
    "task_type": "object_detection",
    "hardware_type": "cpu",
    "max_model_size": 200,  # MB
    "min_accuracy": 0.75,
    "preferred_fps": 20,
    "specific_classes": ["cube", "cylinder", "sphere"],
    "lighting_condition": "moderate",
    "distance_range": [0.1, 0.5]  # 米
})

# 获取推荐模型
print("获取推荐模型...")
top_models = model_selector.get_recommended_models(top_n=5)

# 显示推荐结果
print("\n=== 模型推荐结果 ===")
for i, model in enumerate(top_models, 1):
    print(f"\n推荐模型 #{i}:")
    print(f"  名称: {model['name']}")
    print(f"  类型: {model['type']}")
    print(f"  大小: {model['size_mb']} MB")
    print(f"  准确率: {model['accuracy']:.2f}")
    print(f"  推理速度: {model['fps']:.1f} FPS")
    print(f"  适用硬件: {model['hardware_compatibility']}")
    print(f"  综合评分: {model['score']:.2f}")

# 评估特定模型
print("\n=== 评估特定模型 ===")
eval_result = model_selector.evaluate_model(
    "custom_models/my_model.onnx",
    "object_detection"
)

print(f"自定义模型评估结果:")
print(f"  准确率: {eval_result['accuracy']:.2f}")
print(f"  推理速度: {eval_result['fps']:.1f} FPS")
print(f"  模型大小: {eval_result['size_mb']} MB")
print(f"  内存占用: {eval_result['memory_usage_mb']} MB")

# 比较多个模型
print("\n=== 模型比较 ===")
model_list = [
    "models/yolov5s.onnx",
    "models/yolov5m.onnx",
    "custom_models/my_model.onnx"
]

comparison_result = model_selector.compare_models(model_list)

print("模型比较结果:")
for model_name, metrics in comparison_result.items():
    print(f"\n{model_name}:")
    for metric, value in metrics.items():
        print(f"  {metric}: {value}")

print("\n模型选择完成!")
```

## 6. 常见问题

### 6.1 如何选择适合CPU的模型？

- 设置`hardware_type`为"cpu"
- 限制`max_model_size`为较小值（如<100MB）
- 考虑使用轻量级模型架构

### 6.2 如何平衡模型大小和性能？

- 设置合理的`max_model_size`限制
- 调整`min_accuracy`参数
- 考虑使用模型压缩技术

### 6.3 支持哪些任务类型？

- 目标检测（object_detection）
- 图像分类（classification）
- 语义分割（segmentation）
- 实例分割（instance_segmentation）
- 姿态估计（pose_estimation）

## 7. 更新日志

- **v1.0.0** (2023-10-15)
  - 初始版本发布
  - 支持目标检测和分类任务
  - 基本模型推荐功能

- **v1.1.0** (2023-11-20)
  - 新增分割任务支持
  - 改进模型评估指标
  - 增加硬件适配功能

- **v1.2.0** (2024-01-10)
  - 支持自动化模型选择
  - 新增姿态估计任务
  - 优化推荐算法
