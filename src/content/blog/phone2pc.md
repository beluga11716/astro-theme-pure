---
title: 'Qtscrcpy'
publishDate: 2026-06-13
updatedDate: 2026-06-13
description: 'QtScrcpy：比 scrcpy 更好用的开源投屏神器，一键投屏 + 手机群控全教程（免费、无广告、无需 Root）'
tags:
  - 'utility_tools'
  - 'ACGN'
  - 'blog'
  - 'just_for_fun'
draft: false
---
QtScrcpy 是一款基于 scrcpy 改进的开源 Android 实时投屏与控制工具。它体积小巧、性能出色、延迟极低（接近零延迟），支持 USB 和无线连接、多设备同时投屏与群控，无需在手机上安装任何 App，也不需要 Root 权限。特别适合开发者测试、多机操控、游戏键鼠映射等场景。

QtScrcpy的来源是scrcpy

github：
[Genymobile/scrcpy](https://github.com/Genymobile/scrcpy)

在这个Scrcpy的基础上增加了ui界面 不需要命令行控制 支持中文 功能全面 延迟官方说是小于75ms
![QtScrcpy演示页面](https://tu.raynard.lol/file/blog/1781749253850.png)

# 1. 软件下载与准备

github仓库
[barry-ran/QtScrcpy](https://github.com/barry-ran/QtScrcpy)
- **官方下载地址** [release](https://github.com/barry-ran/QtScrcpy/releases)（推荐选择最新 Release 版本的 Windows/Mac/Linux 预编译包）。

下载完成后解压到任意目录（建议路径不含中文和空格）。软件自带 ADB 等依赖，开箱即用。

**前提准备**：
- 手机开启 **图中这几个选项**（设置 → 开发者选项 → USB 调试）。
 ![image.png](https://tu.raynard.lol/file/blog/1781750608045.png)
- Android 5.0+（API 21 以上）。
- Windows 用户建议以管理员身份运行程序。

# 2. USB 有线连接（最简单快速）

1. 用 USB 数据线连接手机和电脑。
2. 打开 QtScrcpy 主程序。
3. 点击 **“刷新设备”**，列表中应出现你的设备序列号。
4. 点击 **“启动服务”**（或“一键 USB 连接”）。
5. 稍等片刻，手机屏幕就会投射到电脑窗口上，可用鼠标键盘实时控制。

**常用配置（启动前设置）**：
- 分辨率、比特率（影响画质与流畅度）建议在10以上 不然画面会比较糊。
- 录制选项（支持后台录制）。
- 窗口置顶、自动息屏等。
- 下面是我个人自用的配置 可参考
![image.png](https://tu.raynard.lol/file/blog/1781751042806.png)
# 3. 无线连接步骤（推荐长期使用）

无线连接需先通过 USB 完成一次初始化，后续可脱离数据线：

1. 确保手机和电脑在同一局域网（Wi-Fi）btw亲测直连热点不行。
2. USB 连接手机，点击 **“刷新设备”**。
3. 点击 **“获取设备 IP”**（获取手机 IP 地址）。
4. 点击 **“启动 adbd”**（启动无线调试服务）。
5. 点击 **“无线连接”**。
6. 再次 **“刷新设备”**，列表中会出现以 IP 开头的设备，选择它。
7. 点击 **“启动服务”** 即可投屏。

**注意**：启动 adbd 后可拔掉 USB 线，后续连接无需重复此步骤（除非 adbd 重启）。

# 4. 多设备群控与批量操作

QtScrcpy 最大亮点之一是支持同时投屏并控制多台手机：

- 重复以上步骤连接多台设备。
- 每个设备会有独立窗口，或通过界面批量管理。
- **批量控制**：可同时对所有连接设备执行相同操作（如群控测试、同步操作）。

适合开发者多型号适配测试或自动化场景。

# 5. 高级功能使用

- **截图与录屏**：界面有对应按钮，支持录制视频（可设置保存路径、格式）。
- **文件传输与 APK 安装**：直接拖拽 APK 或文件到投屏窗口即可安装/传输。
- **剪贴板同步**：
  - Ctrl + C：设备复制到电脑。
  - Ctrl + Shift + V：电脑粘贴到设备。
  - Ctrl + V：输入电脑剪贴板文本。
- **声音同步**：Android 10+ 支持（基于 sndcpy，可用蓝牙替代）。要在手机上开发者选项打开通过usb下载的权限 然后点sndcpy安装 安装完成之后点击开始音频即可电脑播放手机声音
- **全屏与快捷键**：Ctrl + F 全屏、Ctrl + H 返回主页、Ctrl + B 返回等。

# 6. 自定义按键映射（键鼠玩手机游戏）

支持自定义键盘鼠标映射，特别适合玩《和平精英》等游戏：

1. 在 `keymap` 目录放入自定义脚本（或使用默认的和平精英/抖音映射）。
2. 程序中 **刷新脚本** → 选择脚本 → 连接设备后 **应用脚本**。
3. 按 `~` 键切换映射模式。

# 7. 常见问题与优化

- 连接失败（“more than one device”）：尝试取消 “使用 Reverse” 选项。
- 无线识别不到：检查同一局域网、USB 调试、adbd 是否启动。
- 性能优化：调整分辨率/比特率；推荐 USB 连接延迟更低。
- 更多 FAQ 可参考项目 GitHub docs/FAQ.md。

# 总结

QtScrcpy 继承了 scrcpy 的轻量高效，同时通过 Qt 界面大幅提升易用性和扩展性（多设备、自定义映射等）。无论是日常投屏、开发测试还是游戏娱乐，都是免费开源的优秀选择。

# 实在不会可参考视频教程
https://www.bilibili.com/video/BV1wfK5eHEWU/
