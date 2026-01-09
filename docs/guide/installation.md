# 安装配置

本指南将帮助您完成灵掌机器人灵巧手产品的安装和配置。

## 硬件安装

1. **开箱检查**：确认产品包装完整，包含灵巧手本体、控制盒、电源适配器、通信线缆等组件。

2. **连接硬件**：
   - 将灵巧手与控制盒通过专用线缆连接
   - 连接电源适配器到控制盒
   - 通过 USB 或以太网将控制盒连接到计算机

3. **电源开启**：按下控制盒上的电源按钮，确认指示灯正常亮起。

## 软件安装

1. **下载驱动程序**：从 [灵掌机器人官网](https://www.lingzhang.com) 下载最新的驱动程序和控制软件。

2. **安装驱动**：运行驱动安装程序，按照提示完成安装。

3. **安装控制软件**：
   ```bash
   # Windows
   .\LingZhangControlSoftwareSetup.exe
   
   # Linux
   chmod +x LingZhangControlSoftware.tar.gz
   tar -xzf LingZhangControlSoftware.tar.gz
   cd LingZhangControlSoftware
   ./install.sh
   ```

## 配置连接

1. **打开控制软件**：启动灵掌机器人控制软件。

2. **连接设备**：在软件中选择相应的通信端口（USB 或以太网），点击「连接」按钮。

3. **测试连接**：软件显示设备连接成功后，可以进行简单的动作测试。

## 下一步

阅读 [使用教程](usage.md) 文档，学习如何使用灵巧手完成各种操作。
