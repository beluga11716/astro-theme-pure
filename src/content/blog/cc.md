---
title: 'claude code'
publishDate: 2026-06-18
updatedDate: 2026-06-18
description: 'claudecode安装教程'
tags:
  - 'APP'
  - 'utility_tools'
  - 'just_for_fun'
draft: false
---
本篇将介绍如何安装claudecode的CLI版本（即命令行版本）

![cc可爱捏](https://tu.raynard.lol/file/blog/1781752829648.png)
# 1. 安装 Node.js（前提条件）

Claude Code 官方推荐通过 npm 安装，需要 Node.js（18+，推荐 LTS 版本）。

- **官方来源**：Node.js 官网：https://nodejs.org/zh-tw/download
- **介绍**：Node.js 是一个开源、跨平台的 JavaScript 运行时环境，用于服务器端和命令行工具。

**安装步骤**（图形界面）：
1. 下载 .msi 安装程序并运行。
2. 一直点击“Next”，**记得要勾选“Add to PATH”**。
3. 安装完成后，打开 **PowerShell 或 CMD**（以管理员身份），验证安装：

```powershell
node --version
npm --version
```

# 2. 通过 Node.js 安装 Claude Code

claudecode官方 GitHub：
[anthropics/claude-code](https://github.com/anthropics/claude-code)
（不推荐 直接用下面的指令安装）

**安装命令**（在 PowerShell/CMD 中执行）：

```powershell
npm install -g @anthropic-ai/claude-code
```
需要等一会 如果网不好可能得等十几分钟都有可能

安装好后验证：

```powershell
claude --version
```
出现版本号即为安装成功

# 3. 使用 CC Switch 绕过配置环节
> [!TIP] TIP
> cc第一次运行会连接anthropic服务器并让你登录anthropic账号 但是国内环境问题我们肯定登不进去 所以需要这个软件来跳过这一步 直接让我们用上国产模型

Claude Code 首次运行需要权限配置、API 认证等，**CC Switch** 是专为 Claude Code 等 AI 编码 CLI 设计的跨平台桌面配置管理工具，能一键切换 provider、绕过部分权限提示、管理 settings.json 等配置，非常适合国内网络环境。

- **GitHub**：
[farion1231/cc-switch](https://github.com/farion1231/cc-switch)
- **官方/下载地址**：https://ccswitch.io/ 或 [GitHub Releases](https://github.com/farion1231/cc-switch/releases)下载最新 Windows 版本（.exe）。
- **介绍**：All-in-One 桌面助手，支持 Claude Code、Codex 等，支持一键切换模型 provider、MCP/Skills 管理、Deep Link 等。

**使用 CC Switch 绕过配置**：
1. 下载并安装 CC Switch
2. 打开 CC Switch
3. 直接点左上角设置 翻到下面的窗口行为 把全部都打开就行 最重要是要开那个**跳过claudecode初次安装确认**
![image.png](https://tu.raynard.lol/file/blog/1781753565665.png)
4. 一键应用配置（它会处理 settings.json、auth 等文件）。

**注意**：CC Switch 能帮助快速切换，但仍需合法 API Key。Claude Code 本身有 `--dangerously-skip-permissions` 或 `bypassPermissions` 模式（在 CC Switch 或 settings 中设置），使用时注意安全风险，仅用于可信环境。

# 4. 配置国内大模型 API（以 DeepSeek为例）

DeepSeek 提供 Anthropic 兼容 API，可无缝接入 Claude Code。
> [!NOTE] NOTE
> 非常推荐使用DeepSeek，deepseekv4的极高的缓存命中让它的使用成本大幅下降 如图300万的token有270万是命中缓存了的 实际只需要付费未命中的部分。
![image.png](https://tu.raynard.lol/file/blog/1781754944037.png)

- **DeepSeek 平台**：https://platform.deepseek.com/ （注册/登录后获取 API Key）
- **有不会的可看API 文档**：https://api-docs.deepseek.com/ （支持 Anthropic 格式）

**配置方式**（推荐通过 CC Switch 直接换）：
1. 直接在主界面点右上角加号 点击deepseek **往下滑**找到apikey的填写位置 把apikey填进去
![image.png](https://tu.raynard.lol/file/blog/1781753779241.png)
2. 直接点右下角添加
3. 回到主界面 直接点击刚配好的模型即可切换成功
![image.png](https://tu.raynard.lol/file/blog/1781753905055.png)
或者在 PowerShell 中设置环境变量（非常不建议用这一套 非常容易报错）：

```powershell
$env:ANTHROPIC_BASE_URL = "https://api.deepseek.com/anthropic"
$env:ANTHROPIC_AUTH_TOKEN = "your-deepseek-api-key"   # 替换为你的 Key
$env:ANTHROPIC_MODEL = "deepseek-v4-pro[1m]"          # 或其他模型
$env:ANTHROPIC_DEFAULT_OPUS_MODEL = "deepseek-v4-pro[1m]"
$env:ANTHROPIC_DEFAULT_SONNET_MODEL = "deepseek-v4-pro[1m]"
$env:ANTHROPIC_DEFAULT_HAIKU_MODEL = "deepseek-v4-flash"
$env:CLAUDE_CODE_SUBAGENT_MODEL = "deepseek-v4-flash"
```

**测试启动**：
直接win+r输入cmd回车调出命令行窗口 输入
```powershell
claude
```
能出现这个界面即为成功
![image.png](https://tu.raynard.lol/file/blog/1781754114124.png)
输入
```
/model
```
选择中出现DeepSeek的模型即为成功
![image.png](https://tu.raynard.lol/file/blog/1781754021174.png)
接下来就可以和cc对话了

# 5. 安装 VS Code + Claude Code 扩展（类似 Codex 体验）
![image.png](https://tu.raynard.lol/file/blog/1781755985392.png)
关于为什么要在vscode里使用：非常简单 因为命令行界面不能实时看到cc的代码输出

所以需要vscode来实时preview这样才能保证你清楚看明白它每一步干了啥 而不是像无能的丈夫一样只能一直点allow和yes
- **VS Code 官方来源**：https://code.visualstudio.com/ （Microsoft 官网）
- **下载地址**：https://code.visualstudio.com/Download （Windows 版）
- **介绍**：宇宙最强IDE，免费、开源代码编辑器，支持扩展生态。

**Claude Code VS Code 扩展**：
- **市场链接**：https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code
- **发布者**：Anthropic
- **介绍**：直接在 VS Code 中集成 Claude Code，提供侧边栏聊天、内联 diff、@ 提及文件、计划审查等，体验接近 Cursor/Codex。

**安装步骤**：
1. 下载安装 VS Code 并打开。
2. 按 `Ctrl+Shift+X` 打开扩展视图，搜索 “Claude Code”，点击 **Install**（要看清楚是不是 Anthropic 发布的）。
![image.png](https://tu.raynard.lol/file/blog/1781755296957.png)
3. 配置：扩展会复用上面我们已经配置的环境变量
4. 使用：在文件夹中打开后点击图示区域即可打开cc的对话侧边栏
![image.png](https://tu.raynard.lol/file/blog/1781755889497.png)

# 完整使用流程总结

1. 安装 Node.js → 安装 Claude Code。
2. 安装 CC Switch → 配置/切换到 DeepSeek 等国内 API。
3. 安装 VS Code + 扩展 → 在项目中 `claude` 或通过侧边栏使用。
4. 进入项目文件夹运行 `claude`，享受类似 Codex 的自然语言编码体验。

**注意事项**：
- 国内网络下可能需代理或可靠镜像（Node.js/npm 可使用淘宝镜像：`npm config set registry https://registry.npmmirror.com`）。
- API 使用产生费用，请在 DeepSeek 平台查看计费。
- 始终优先官方文档：https://code.claude.com/docs/
- 安全第一：bypass 权限模式有风险，仅在本地可信项目中使用。

此教程基于公开官方/可靠来源，如有更新请查阅链接。享受高效编码！
