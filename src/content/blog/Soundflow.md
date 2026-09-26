---
title: '声音流转方法'
publishDate: 2026-03-12
description: '声音流转方法'
tags:
  - 'APP'
  - 'utility_tools'
draft: false
---
# 提供一些手机和电脑声音相互流转的方法

# 1.手机或其他设备流转至电脑

> [!NOTE]
> 在打游戏白给时迅速拿手机开刷的工具

AudioPlaybackConnector

[ysc3839/AudioPlaybackConnector](https://github.com/ysc3839/AudioPlaybackConnector)

AudioPlaybackConnector[release页面](https://github.com/ysc3839/AudioPlaybackConnector/releases)

在release页面下载后点击运行 会发现右下角有个蓝牙和小喇叭的图标

![如图](https://tu.raynard.lol/file/blog/1780239557071.png)

在手机通过蓝牙连上电脑后 左键点击右下角的图标 点击想连接的设备连接 然后就可以在电脑里听到对应设备的声音了

> [!TIP]
> 有的时候连上了但是耳机没出现声音 需要更换一下播放设备再换回来 点右下角调声音大小的部分 点音量旁的选择声音输出 切换到其他播放装置再切换回你想播放的装置

![image.png](https://tu.raynard.lol/file/blog/1780240060337.png)

# 手机流转至电脑方案二：Bluetooth Audio Reciver

[Bluetooth Audio Reciver](https://apps.microsoft.com/detail/9n9wclwdqs5j?hl=zh-cn&gl=CN)可以直接在微软商店中搜索下载 功能一样 但是Bluetooth Audio Reciver不能像AudioPlaybackConnector那样在右下角隐藏 只能最小化 如果不小心把最小化的窗口关掉的话就直接关闭程序了 所以使用体验上还是AudioPlaybackConnector比较好些

# 2.电脑声音流转至手机 
这个有很多限制 首先如果是如果是校园网环境 需要了解你的校园网账号支持多少个设备 如果只支持一台那就寄了 不用看下去了

准备条件：
1.两台设备要连上同一个WIFI网络
2.手机只能是安卓的 电脑可以是Windows或者Linux的

使用[Audio Share](https://github.com/mkckr0/audio-share) 实现

[ysc3839/mkckr0](https://github.com/ysc3839/mkckr0)

在[release](https://github.com/mkckr0/audio-share/releases) 页面下载

![image.png](https://tu.raynard.lol/file/blog/1780240101442.png)

电脑端在默认状态下把服务器地址主机旁边的那串**ip**复制 发到手机上 其他不用动 直接点**启动服务器**

来到手机端 下载安装完软件之后打开 把电脑上刚复制的ip填进去 点击开始就行 下面日志显示**已开始**就说明成功连接了 这时候就能听到电脑的声音从手机上传出 

不成功的话在电脑端的ip旁的小箭头可以选择ip 换下ip再重复一遍操作就行。
