# 图像分类

本文档介绍了LZVision SDK中的图像分类模块，用于实现灵巧手视觉系统中的物体分类功能。

## 1. 概述

图像分类模块是LZVision的核心组件之一，用于识别和分类灵巧手工作空间中的物体。它基于深度学习技术，能够将输入图像分类为预定义的类别之一，为灵巧手的操作提供物体类型信息。

## 2. 功能特性

- **高效分类**：支持快速图像分类
- **多类别支持**：可识别多种不同类型的物体
- **高精度**：基于先进的深度学习模型
- **实时性**：针对实时应用进行了优化
- **轻量级**：提供轻量级模型选项
- **可扩展**：支持自定义类别扩展

## 3. 快速开始

### 3.1 导入图像分类模块

```python
import lzmotion.vision.classfy
```

### 3.2 初始化分类器

```python
# 创建图像分类器实例
classifier = lzmotion.vision.classfy.ImageClassifier()

# 加载预训练模型
classifier.load_model("models/mobilenet_v2.onnx")
```

### 3.3 执行图像分类

```python
import cv2

# 读取图像
image = cv2.imread("object.jpg")

# 执行图像分类
result = classifier.classify(image)

# 处理分类结果
print(f"分类结果: {result['class']}")
print(f"置信度: {result['confidence']:.2f}")
```

## 4. API参考

### 4.1 ImageClassifier 类

**功能**：图像分类器主类，用于执行图像分类任务

**构造函数**：

```python
class ImageClassifier:
    def __init__(self, config=None):
        # 初始化图像分类器
```

**参数**：
- `config`：分类器配置字典（可选）

**返回值**：
- 图像分类器实例

### 4.2 `load_model`

**功能**：加载预训练的图像分类模型

**函数声明**：

```python
def load_model(self, model_path, model_type="mobilenet"):
    # 加载模型
```

**参数**：
- `model_path`：模型文件路径
- `model_type`：模型类型（可选，默认"mobilenet"）

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 4.3 `classify`

**功能**：执行图像分类

**函数声明**：

```python
def classify(self, image, top_k=1):
    # 执行图像分类
```

**参数**：
- `image`：输入图像（BGR格式）
- `top_k`：返回前K个分类结果（可选，默认1）

**返回值**：
- 分类结果字典或列表

### 4.4 `set_class_names`

**功能**：设置类别名称

**函数声明**：

```python
def set_class_names(self, class_names):
    # 设置类别名称
```

**参数**：
- `class_names`：类别名称列表

**返回值**：
- 成功：返回0
- 失败：返回错误码

## 5. 示例代码

### 实时视频流分类示例

```python
import lzmotion.vision.classfy
import cv2

# 创建图像分类器实例
classifier = lzmotion.vision.classfy.ImageClassifier()

# 加载预训练模型
classifier.load_model("models/mobilenet_v2.onnx")

# 设置类别名称
classifier.set_class_names([
    "background",
    "cube",
    "cylinder",
    "sphere",
    "ring",
    "tool"
])

# 打开摄像头
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("无法打开摄像头")
    exit()

print("开始实时分类，按'q'键退出...")

while True:
    # 读取一帧图像
    ret, frame = cap.read()
    
    if not ret:
        print("无法获取图像帧")
        break
    
    # 执行图像分类
    result = classifier.classify(frame, top_k=1)
    
    # 显示分类结果
    cv2.putText(
        frame,
        f"类别: {result['class']} ({result['confidence']:.2f})",
        (10, 30),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 0),
        2
    )
    
    # 显示图像
    cv2.imshow("实时图像分类", frame)
    
    # 按'q'键退出
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# 释放资源
cap.release()
cv2.destroyAllWindows()

print("分类结束")
```

## 6. 常见问题

### 6.1 支持哪些模型格式？

- ONNX
- TensorRT
- TensorFlow Lite
- PyTorch

### 6.2 如何提高分类精度？

- 使用更高精度的预训练模型
- 针对特定场景进行模型微调
- 确保图像质量良好
- 提供充足的训练数据

### 6.3 如何增加自定义类别？

- 收集自定义类别的图像数据
- 对预训练模型进行微调
- 更新类别名称列表
- 重新加载模型

## 7. 更新日志

- **v1.0.0** (2023-10-15)
  - 初始版本发布
  - 支持MobileNetV2模型
  - 基本图像分类功能

- **v1.1.0** (2023-11-20)
  - 新增多种模型支持
  - 优化分类速度
  - 增加Top-K分类结果

- **v1.2.0** (2024-01-10)
  - 支持自定义类别
  - 改进模型精度
  - 优化内存占用
