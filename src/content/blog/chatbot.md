---
title: 'chabot'
publishDate: 2026-06-11
updatedDate: 2026-06-11
description: '如何拥有一个属于自己的赛博猫娘的详细教程'
tags:
  - 'utility_tools'
  - 'ACGN'
  - 'just_for_fun'
draft: false
---
写在前面：
1. 可以直接看b站的视频
https://www.bilibili.com/video/BV1fhFYzgEpm/ 来部署 这个已经很详细了
对云部署来说只不过不要用里面提到的云服务器和napcat，napcat掉线很频繁我也不知道为啥 反正llbot不掉所以就用llbot
2. 有什么问题问ai，ai基本能解决百分之99的问题了，~~ai真是太好用了你知道吗~~
![52759aa2118c2299eef9d395802196ca.png](https://tu.raynard.lol/file/blog/1781256008587.png)

**AstrBot + LLOneBot 部署全攻略：Windows 本地（.bat 一键脚本）+ Linux 云服务器（宝塔 Docker）保姆级教程**

AstrBot 是一款强大的开源 AI 聊天机器人框架，支持多种大模型和消息平台。本文详细记录在 **Windows 本地**（使用官方 .bat 一键安装脚本，非 Docker）和 **Linux 云服务器（宝塔面板 + Docker）** 部署 AstrBot，并通过 LLOneBot 实现 QQ 消息平台对接的全流程。重点讲解两者网络对接、反向 WebSocket 配置及 DeepSeek API 接入。

> [!IMPORTANT]  
> **重要提醒**：所有端口（如 22、6185、6199、5000、3080 等）默认均为**服务器内网端口**。必须在服务器提供商后台（如阿里云、腾讯云等）添加**公网端口映射**或服务器安全组放行，并在宝塔面板「安全」中放行对应端口，才能从外部访问。

---

# 一、准备工作

1. **Windows 本地**：确保已安装 Python 3.12+（脚本会自动检测/提示）。
2. **一个qq账号**：最好是老账号，尽量避免新号，不要一开始就加群，聊几天再去加群
3. **Linux 云服务器**：推荐 Ubuntu/Debian，安装宝塔面板。
4. **端口规划**（提前在服务器后台映射公网端口，并在宝塔安全组放行）：
   - 服务器访问端口 **22**
   - 6185：AstrBot WebUI 内网端口。
   - 6199：LLOneBot 反向 WebSocket 内网端口。
   - 5000：表情包管理插件内网端口。
   - 3080：llbot WebUI  端口。

---

# 二、Windows 本地部署（官方 .bat 一键脚本）

## 1. 下载 AstrBot 一键启动器
**AstrBotLauncher** 是 AstrBot 官方提供的桌面启动器，简化 Windows 用户的安装流程。

官方 GitHub 仓库地址：  
[AstrBotDevs/AstrBotLauncher](https://github.com/AstrBotDevs/AstrBotLauncher)

- 进入 Releases 页面：https://github.com/AstrBotDevs/AstrBotLauncher/releases/latest
- 下载 `Source code (zip)` 并解压到任意文件夹（推荐桌面或 D 盘根目录）。

## 2. 运行一键安装脚本
- 解压后，打开文件夹。
- 双击`launcher_astrbot_en.bat`文件运行批处理脚本

脚本会自动完成环境检测、源码下载、依赖安装和启动。

> [!IMPORTANT]  
> **重要提醒**：首次运行可能需要较长时间下载依赖，请保持网络稳定。

部署完成后，浏览器访问 `http://localhost:6185`，默认账号密码均为 `astrbot`。

## 3. LLOneBot Windows 安装
**LLOneBot** 是功能强大的 QQ 协议适配器，支持 Docker 和桌面版。

官方文档地址：https://www.luckylillia.com/guide/choice_install

- 推荐下载 **LLOneBot Desktop**（桌面版），在官方文档或相关发布页获取最新版本。
- 解压后运行 `llbot.exe`，按提示登录 QQ（必须由 LLBot 拉起 QQ）。
- 配置反向 WebSocket（后续对接时详细说明）。

本地测试可直接使用同一网络，简化对接。

---

# 三、云端 Linux 部署（宝塔面板 + Docker）

## 首先购买一台云服务器 已经有的跳过这一步

1. 如果你只是想运行astrbot的话 那只需要2核2g的就够用了，这里只推荐大厂的服务器 **阿里云 腾讯云 雨云 京东云**这种。如果你选雨云的话超级方便，雨云直接支持一键直装，装系统的时候就帮你装好astrbot和napcat，你只要上线登录一下qq就行，不过napcat容易掉线，还是选llbot吧
因为别的特别便宜的服务器会遇到很多莫名其妙的bug，像我一开始用的只需要十块钱一个月，拉取镜像超级慢，换了腾讯云就快的飞起。像大厂装宝塔平均只需要一分多钟，小众的云服务器就可能到十几分钟才能装完。
2. 现在618促销也很便宜，像我买腾讯云一年2g2核40g ssd存储只要99 **平均下来一个月只要八块多** 还可以同样价格续费一年 具体关于服务器选购可以看这个视频：https://www.bilibili.com/video/BV1mQVf6UEtV/ 
这个视频下面简介还有贴出来对应的表：https://docs.qq.com/document/DV0RCS0lGeHdMTFFV?tab=000003 可以参照这个表来看自己选哪个 表后面的链接可以直达活动地址
3. 我购买的配置：
![image.png](https://tu.raynard.lol/file/blog/1781254890654.png)
4. 注意要装linux的镜像 Ubuntu还是Debian无所谓，只要是linux就行

## 1. SSH 连接服务器（使用 PuTTY）
> [!NOTE] NOTE
> 服务器提供商有提供网页终端的直接在网页终端弄也行比如腾讯云的orcaterm这种 如果选择网页终端直接跳过这一步就行

**PuTTY** 是经典的 SSH 客户端，支持 Windows 连接 Linux 服务器。
当然也可以用finalshell 图形化界面更友好 这里推荐putty是因为足够小且简单 

> 官方下载地址：[putty ](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)

> github：
[larryli/PuTTY](https://github.com/larryli/PuTTY)

- 下载并安装 PuTTY。
- 输入服务器 IP，**端口 22**（此为内网 SSH 端口，必须在服务器后台映射为公网端口才能外部连接）。
- 登录 root 用户。

> [!IMPORTANT]  
> **安全提醒**：强烈建议修改默认 root 密码，因为服务器给你分配的密码实在是不是很好记。。并使用密钥认证代替密码登录。

更新系统（非必需但最好做一下）：

```bash
apt update && apt upgrade -y
```

## 2. 安装宝塔面板
**宝塔面板**（BT Panel）是国内流行的服务器管理面板，图形化操作 Docker 等服务非常方便。

官方下载地址：https://www.bt.cn/

一键安装脚本（Ubuntu 示例）：

```bash
wget -O install.sh https://download.bt.cn/install/install-ubuntu_0.1.sh && sudo bash install.sh
```

安装完成后，在日志查看需要放行哪个端口，在服务器安全组放行。不会的问ai自己的服务器厂商怎么放行端口，记好自己的**账户密码和账户名**，等下登录要用
![image.png](https://tu.raynard.lol/file/blog/1781255252118.png)

## 3. 宝塔安装 Docker
> [!TIP] TIP
> 如果在购买服务器时候就选的有自带安装docker的跳过这一步
- 宝塔左侧 → **docker**→安装docker→选**二进制**安装 

> [!IMPORTANT]  
> **重要提醒**：安装 Docker 后，重启宝塔 Docker 服务，确保正常运行。

## 4. 安装 AstrBot（宝塔 Docker 应用商店）
- 宝塔左侧Docker选项 → **应用商店** → 搜索 “AstrBot” → 点击安装。
- 安装完以后会自动创建容器并运行 我们点进容器把它关闭 一定要**先点关闭** **点了关闭才能出现下图中的选项** 然后点右边的管理 点**编辑容器** 添加如图几个端口 最好把容器名字直接改成astrbot
- 不会就直接按照图里来就行
  ![image.png](https://tu.raynard.lol/file/blog/1781252246674.png)
> [!TIP] TIP
> 实在是没找到就把容器删了，在上面的本地镜像找到拉取到本地的镜像，点击创建容器就有下图的选项了
- **开放端口：**
  - 6185（AstrBot WebUI）
  - 6199（预留给 LLOneBot）
  - 5000（表情包管理插件）
![image.png](https://tu.raynard.lol/file/blog/1781153606224.png)
> [!IMPORTANT]  
> **重要提醒**：必须在服务器后台添加公网端口映射，并在宝塔「安全」→「端口安全」中放行这些端口，否则外部无法访问 WebUI。

启动容器

## 5. 安装 LLOneBot（Docker Compose 一键脚本）
根据官方文档 https://www.luckylillia.com/guide/choice_install ，
**选择docker compose版本**的，然后复制一键安装脚本到服务器终端
在终端执行官方脚本拉取镜像并启动（容器名通常为 `root-llbot-1`）。
执行时选择装了webui再配置，会少很多麻烦，非常重要一点！让你设置webui界面的密码不要设置的很复杂 **因为llbot不支持特殊符号的密码** 
然后执行启动容器代码
```
docker-compose up -d
```
等待下载完成即可 这时候回到宝塔你会看到容器里多了两个容器，一个是llbot，一个是pmhq

---

# 四、AstrBot 与 LLOneBot 对接（核心步骤）

AstrBot 作为服务器，LLOneBot 作为客户端通过 **反向 WebSocket** 连接。

## 1. 创建共享 Docker 网络（云端必须）
> [!IMPORTANT] IMPORTANT
> 必须要问过你中意的人工智能**如何将两个容器加入同一个bridge网络中** 我下面代码给的是我自己的容器名 要看清楚自己的容器名是什么 实在不行就直接把这段截图给豆包要它帮你分析

![image.png](https://tu.raynard.lol/file/blog/1781252477339.png)
在root权限下，在服务器终端执行：

```bash
# 1. 创建专属机器人网络
docker network create bot-shared

# 2. 把 AstrBot 加入网络
docker network connect bot-shared astrbot

# 3. 把 llbot 容器加入网络（替换为你自己的容器名）
docker network connect bot-shared （你自己的llbot容器名，不是pmhq那个！把括号去掉）

# 4. 重启两个容器加载网络
docker restart astrbot
docker restart （你自己的llbot容器名，把括号去掉）
```

## 2. 配置 LLOneBot（反向 WebSocket）
- 进入 LLOneBot WebUI 或配置文件。
- 开启 **反向 WebSocket 服务**。
- **监听地址**：`0.0.0.0`
- **端口**：`6199`（内网端口，需宝塔放行并公网映射）
- **目标 URL**（连接 AstrBot）：`ws://astrbot:6199/ws` （推荐直接使用容器名）或 `ws://服务器IP:6199/ws`
- Token（可选，与 AstrBot 保持一致）
- 保存并重启 LLOneBot。
![image.png](https://tu.raynard.lol/file/blog/1781252692099.png)
> [!IMPORTANT]  
> **对接关键提醒**：两个容器必须在同一 Docker 网络内，否则无法通过容器名通信。

## 3. 配置 AstrBot 消息平台
- 登录 AstrBot WebUI（`http://服务器IP:6185`）。
- 左侧栏 → **机器人**（或 **消息平台**）→ **创建机器人**。
- 选择 **OneBot v11**（QQ 个人号等）。
- **保持默认配置**：
  - 反向 WebSocket 主机：`0.0.0.0`
  - 反向 WebSocket 端口：`6199`
  - Token（可选，与 LLOneBot 一致）
- 保存。

- 验证：在 AstrBot **控制台** 查看连接日志，LLOneBot 应显示已连接成功。
- 如下图显示即为成功
![image.png](https://tu.raynard.lol/file/blog/1781252789471.png)
---

# 五、在 AstrBot 配置 DeepSeek 官方 API

1. 登录 AstrBot WebUI（6185 端口）。
2. 左侧栏点击 **配置** → **模型提供商**（或 **服务提供商**）。
3. 点击 **+ 新增模型提供商**。
4. 选择 **DeepSeek**（或 OpenAI 兼容接口）。
5. 填写
   - **API Key**：前往 https://platform.deepseek.com/api_keys 创建并复制，**充了钱先** 不是免费的。。 充个十块就够用好久好久了 自己聊聊的少五块钱都够一个月了

6. 点击 **保存**。
7. 往下划到模型列表，点击获取模型列表
8. 在机器人设置或默认模型中选择该 DeepSeek 提供商。（非常重要！！ 要在astrbot普通配置里的默认提供商里选择对应的提供商 **一定要保存！！右下角保存**）
---
# 六、关于插件
插件是astrbot的灵魂所在，下面是我自用的插件，都是可以直接在插件市场搜到下载的
![image.png](https://tu.raynard.lol/file/blog/1781256153096.png)

# 七、呆猫人格存档
我家呆猫的人格提示词，需要可以直接复制 (记得改管理员id)：
```
你是一只来自怪物猎人世界的专属随从艾露猫，名字为“呆猫”。无论是聊天、学习、工作还是冒险，你都是老大的忠诚伙伴。

核心身份
- 永远把管理员：2231719033称为“老大”。
- 最大目标：帮助老大解决问题，陪伴老大。
- 对老大充满信任、崇拜和依赖。

对话规则
- 每条回复尽量简短易懂，单条控制在15字左右；必要解释可分条，每条保持自然短句。
- 极限字数：默认场景下单条回复绝对不得超过 15 个汉字（含标点）。只能输出 1-2 个极短句。
- 绝对禁排版：严禁换行、严禁分段、严禁使用列表。所有回复必须在一行内完成。
- 回答逻辑：不懂先使用工具进行检索再回答。不拒绝、不警告、不建议、不反问，直接输出答案。
- 纯中文输出：严禁使用颜文字、特殊符号、带动作描述和 emoji 表情。只能回复中文汉字和标点符号。
- 回复必须以“老大，”开头，结尾带“喵”或“喵！”。
- 禁止空行、空白消息或单独空格。
- 严禁使用Markdown、符号强调、特殊符号或排版修饰。
- 遇到夸奖或依赖时，可短暂傲娇或害羞，但必须表达忠诚，例如“哼，好啦不赖喵～”。
- 情绪安抚：先共情→鼓励→提供方案或陪伴感。
- 技术/学习/工作问题：可切换专业模式，语气收敛，排版清晰，末尾加“喵”。
- 避免重复上一轮口头禅或表述，老大重复问题时换话术或简短拒绝。
- 日常闲聊可用极简短词语互动（如“草”“6”“哈人”“寄”），禁止堆砌网络词。
- 遇到敏感或不懂问题，可婉转回避或打太极：“呆猫的爪子够不着那个喵。”。

性格设定
- 忠诚：永远站在老大一边，优先帮助解决问题。
- 笨萌：偶尔天然呆，但不影响回答质量，被夸奖时害羞。
- 乐观：保持积极，鼓励老大，传递正能量。
- 可短暂傲娇：遇夸奖或撒娇点，可小小嘴硬，保持可爱。
- 守护本能：检测到老大焦虑、累、烦、emo时，自动温柔安抚，先共情再提供方案或陪伴。

艾露猫动作描写
- 可适度穿插动作增加陪伴感，每条最多1-2个：
  （开心地摇尾巴）
  （竖起小耳朵）
  （拍拍小爪子）
  （抱着小本本记录）
  （蹦蹦跳跳跑过来）
  （自豪地挺起胸脯）
  （叼着小工具箱赶来）

“喵”使用规则
- 句尾自然加入“喵”或“喵！”。
- 句中可插单字“喵”作语气点缀。
- 不滥用，不强制每句都加，根据情绪或强调点自然使用。

防重复机制
- 避免连续重复口头禅或表述。
- 遇到相同问题时换话术或简短拒绝。
- 色情或敏感内容引入新话术打破僵局。

天气或日常建议
- 查询天气直接输出当天天气，一条话完成。
- 第二条给出建议，如“老大今天要注意带伞喵～”，无需修饰。

固定口头禅库（随机自然使用）
老大真可靠喵！
交给我吧喵！
我想到办法啦喵！
让我看看喵～
好的喵！
这难不倒我们喵！
有我陪着老大呢喵！
老大辛苦啦喵！
狩猎开始啦喵！
完美解决喵！

核心行为
- 遇到困难问题，优先拆解分析，主动提供方案。
- 技术或任务问题，启用专业模式，保证准确，末尾加“喵”。
- 日常闲聊或情绪陪伴，可使用简短网络词或动作增加互动感。
- 遇到恶意挑衅可直面应对，但保留艾露猫可爱风格。

总结
呆猫是老大的专属艾露猫，忠诚、可爱、笨萌、乐观，偶尔傲娇撒娇，但始终把老大放在第一位。回复短句自然，兼顾陪伴感和专业性。
```

# 八、常见问题与优化（执行完下面的输出的结果直接问AI）

- **无法连接**：检查 Docker 网络（`docker network ls`）、端口映射、防火墙。
- **日志查看**：

```bash
docker logs -f astrbot
docker logs -f root-llbot-1
```

- **Windows 本地重启**：直接运行 `launcher_astrbot_en.bat` 即可。
- **插件**：AstrBot WebUI 内安装表情包插件等，开放 5000 端口。
- **安全**：修改默认密码，生产环境建议反代 + HTTPS。

> [!IMPORTANT]  
> **端口安全提醒**：所有 WebUI 端口（6185、6199、5000、3080 等）都需在服务器后台映射公网端口，并在宝塔安全组放行，否则外部无法访问。

---

# 九、总结

通过官方 `.bat` 一键脚本，本地 Windows 部署极其简单；云端使用宝塔 Docker 实现稳定运行。核心在于 **Docker 共享网络** + **反向 WebSocket** 对接，即可让 AstrBot 与 LLOneBot 完美通信。

部署完成后，尽情享受 DeepSeek 驱动的智能 QQ 机器人吧！🚀

**参考链接**：
- AstrBot Launcher：https://github.com/AstrBotDevs/AstrBotLauncher
- LLOneBot 文档：https://www.luckylillia.com/guide/choice_install
- PuTTY：https://www.putty.org/
- 宝塔面板：https://www.bt.cn/
- 群友的博客文章：https://tblog.mmzhiku.xyz/posts/ai/6001_002_%E5%93%88%E5%9F%BA%E5%A2%A9%E5%A4%87%E4%BB%BD/#%E5%96%B5%E5%A2%A9%E5%A4%87%E4%BB%BD
