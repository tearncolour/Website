# 目标检测

本文档介绍了LZVision SDK中的目标检测模块，用于实现灵巧手视觉系统中的物体检测功能。

## 1. 概述

目标检测模块是LZVision的核心组件之一，用于实时检测和识别灵巧手工作空间中的物体。它基于深度学习技术，能够准确识别多种物体类型，并提供物体的位置、大小和类别信息，为灵巧手的抓取和操作提供视觉引导。

## 2. 功能特性

- **实时检测**：支持高帧率实时物体检测
- **多物体识别**：可同时检测多种不同类型的物体
- **精确定位**：提供物体的精确位置和边界框信息
- **类别识别**：识别物体的具体类别
- **姿态估计**：可选支持物体姿态估计
- **模型优化**：针对嵌入式设备进行了优化

## 3. 快速开始

### 3.1 导入目标检测模块

```python
import lzmotion.vision.detect
```

### 3.2 初始化检测器

```python
# 创建目标检测器实例
detector = lzmotion.vision.detect.ObjectDetector()

# 加载预训练模型
detector.load_model("models/yolov5s.onnx")
```

### 3.3 执行目标检测

```python
import cv2

# 读取图像
image = cv2.imread("workspace.jpg")

# 执行目标检测
results = detector.detect(image)

# 处理检测结果
for result in results:
    print(f"物体: {result['class']}, 置信度: {result['confidence']:.2f}, "
          f"位置: {result['bbox']}")

# 可视化检测结果
annotated_image = detector.draw_results(image, results)
cv2.imshow("检测结果", annotated_image)
cv2.waitKey(0)
cv2.destroyAllWindows()
```

## 4. API参考

### 4.1 ObjectDetector 类

**功能**：目标检测器主类，用于执行物体检测任务

**构造函数**：

```python
class ObjectDetector:
    def __init__(self, config=None):
        # 初始化目标检测器
```

**参数**：
- `config`：检测器配置字典（可选）

**返回值**：
- 目标检测器实例

### 4.2 `load_model`

**功能**：加载预训练的目标检测模型

**函数声明**：

```python
def load_model(self, model_path, model_type="yolov5"):
    # 加载模型
```

**参数**：
- `model_path`：模型文件路径
- `model_type`：模型类型（可选，默认"yolov5"）

**返回值**：
- 成功：返回0
- 失败：返回错误码

### 4.3 `detect`

**功能**：执行目标检测

**函数声明**：

```python
def detect(self, image, conf_threshold=0.5, iou_threshold=0.45):
    # 执行目标检测
```

**参数**：
- `image`：输入图像（BGR格式）
- `conf_threshold`：置信度阈值（可选，默认0.5）
- `iou_threshold`：IOU阈值（可选，默认0.45）

**返回值**：
- 检测结果列表，每个结果包含物体的类别、置信度、边界框等信息

### 4.4 `draw_results`

**功能**：在图像上绘制检测结果

**函数声明**：

```python
def draw_results(self, image, results, color=(0, 255, 0), thickness=2):
    # 绘制检测结果
```

**参数**：
- `image`：输入图像
- `results`：检测结果列表
- `color`：绘制颜色（可选，默认绿色）
- `thickness`：绘制线宽（可选，默认2）

**返回值**：
- 绘制了检测结果的图像

## 5. 示例代码

### 实时视频流检测示例

```python
import lzmotion.vision.detect
import cv2

# 创建目标检测器实例
detector = lzmotion.vision.detect.ObjectDetector()

# 加载预训练模型
detector.load_model("models/yolov5s.onnx")

# 打开摄像头
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("无法打开摄像头")
    exit()

print("开始实时检测，按'q'键退出...")

while True:
    # 读取一帧图像
    ret, frame = cap.read()
    
    if not ret:
        print("无法获取图像帧")
        break
    
    # 执行目标检测
    results = detector.detect(frame, conf_threshold=0.5)
    
    # 绘制检测结果
    annotated_frame = detector.draw_results(frame, results)
    
    # 显示检测结果
    cv2.imshow("实时目标检测", annotated_frame)
    
    # 按'q'键退出
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# 释放资源
cap.release()
cv2.destroyAllWindows()

print("检测结束")
```

## 6. 常见问题

### 6.1 支持哪些模型格式？

- ONNX
- TensorRT
- TensorFlow Lite
- PyTorch

### 6.2 如何提高检测精度？

- 使用更高精度的预训练模型
- 针对特定场景进行模型微调
- 提高图像分辨率
- 优化光照条件

### 6.3 如何提高检测速度？

- 使用更轻量级的模型
- 降低图像分辨率
- 使用硬件加速（如GPU、NPU）
- 减少同时检测的物体数量

## 7. 更新日志

- **v1.0.0** (2023-10-15)
  - 初始版本发布
  - 支持YOLOv5模型
  - 基本目标检测功能

- **v1.1.0** (2023-11-20)
  - 新增模型类型支持
  - 优化检测速度
  - 增加姿态估计功能

- **v1.2.0** (2024-01-10)
  - 支持TensorRT加速
  - 改进多物体检测性能
  - 增加自定义类别支持
