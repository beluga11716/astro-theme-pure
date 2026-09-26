---
title: '网易云音乐下载本地部署教程'
publishDate: 2026-03-05
description: '网易云音乐下载本地部署教程'
tags:
  - 'APP'
  - 'utility_tools'
draft: false
---
> [!tip]
> 写在前面 如果你只想线上快速下载音乐 可以用音乐下载telegram机器人 （当然这需要你有tg账号并且能够正常登录）

> 描述:这是一个第三方音乐搜索bot，目前支持网易云/QQ音乐/酷我/酷狗音乐搜索/下载/分享等，有问题请使用 /report 或联系 @luotianyi_bot 反馈。 https://t.me/music_v1bot

![image.png](https://tu.raynard.lol/file/blog/1780308164374.png)
# 音乐下载本地部署教程

此方法最好要有网易云的会员账户 不然只能下载不需要vip的歌

来源是 [网易云音乐无损解析](https://github.com/Suxiaoqinx/Netease_url)

[Suxiaoqinx/Netease_url](https://github.com/Suxiaoqinx/Netease_url)

其仓库主页也有本地部署教程 并且有[在线的网页](https://wyapi.toubiec.cn/) 但是~~经常~~偶尔会失效 所以最好还是本地部署 以便随时可用

> [!IMPORTANT]
> 本地部署不可用的时候记得回到github的仓库页面查看最新修改发布的markdown文件

## step1 准备工作

1. 需要为你的电脑准备git环境以方便克隆项目 点此[下载](https://registry.npmmirror.com/-/binary/git-for-windows/v2.52.0.windows.1/Git-2.52.0-64-bit.exe) git

2. 为你的电脑安装python

安装python有两种方法  
**法一**：微软商店安装 点开你电脑的微软商店 直接搜索python下载即可

**法二**：官网安装 点此进入python[下载页](https://www.python.org/downloads/windows/) 

尽量选择最新的stable版（稳定版）下载 

安装完后 `win+r` 输入 `powershell` 回车进入命令行窗口，复制粘贴下面代码检查python和git是否安装成功

检查python：
```
python --version
```
检查git：
```
git --version
```

显示出版本号即为成功

![image.png](https://tu.raynard.lol/file/blog/1780308188601.png)

## step2 克隆项目

在你想部署的位置新建一个文件夹 比如桌面上 把文件夹名字改成英文 比如说 `Netease_music_download` 然后点进文件夹，点击顶部地址栏输入 `cmd` 后回车打开命令行窗口

![image.png](https://img.raynard.lol/file/blog/1779177489050_image.png)

進入到命令行窗口

![image.png](https://tu.raynard.lol/file/blog/1780308528127.png)

接着复制下面这串代码 
```
git clone https://github.com/Suxiaoqinx/Netease_url.git
cd Netease_url
```
直接粘贴进去回车即可克隆项目。



## step3 安装依赖 

克隆完成后继续在命令行输入：
```
pip install -r requirements.txt
```
等待依赖安装完成。

## step4 填写cookie

安装完成后退出命令行，可以看到文件夹里有个 `cookie.txt` 文件

![image.png](https://tu.raynard.lol/file/blog/1780308549829.png)

> [!IMPORTANT]
> 我们要在这个文件里填写我们的cookie

1. 打开[网易云音乐官网](https://music.163.com/) 并登录账号
2. 安装 [Cookie Editor](https://microsoftedge.microsoft.com/addons/detail/cookieeditor/neaplmfkghagebokkhpjpoebhdledlfi) 扩展
3. 回到网易云官网，打开扩展，复制 `music_u` 的 value 值

![image.png](https://tu.raynard.lol/file/blog/1780308583153.png)

复制以下格式：
```
MUSIC_U=你复制的cookie内容
```

打开 `cookie.txt` 把内容替换进去：

![image.png](https://tu.raynard.lol/file/blog/1780308611040.png)

保存后退出。

## step5 启动服务

在 `Netease_url` 文件夹内再次打开命令行窗口（地址栏输入 `cmd`），输入：
```
py main.py
```

出现下面界面即为启动成功：

![image.png](https://tu.raynard.lol/file/blog/1780308642861.png)

按住 `Ctrl` 左键点击 `http://127.0.0.1:5000/` 即可再默认浏览器打开网页：

![image.png](https://tu.raynard.lol/file/blog/1780308661340.png)

即可搜索并下载音乐。


## step6 关闭服务

在命令行窗口按 `Ctrl + C` 即可停止服务。
