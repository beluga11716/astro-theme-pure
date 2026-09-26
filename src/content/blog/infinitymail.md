---
title: '如何拥有属于自己的企业级邮箱'
publishDate: 2026-05-23
updatedDate: 2026-05-23
description: '用cloud-mail拥有属于自己的企业级邮箱 同时可使用无限个不同的邮箱 对其进行管理'
tags:
  - 'utility_tools'
  - 'just_for_fun'
draft: false
---
# Cloud Mail 完整部署教程（官方 Workers 方式 + GitHub Actions）

**项目地址**：
[maillab/cloud-mail](https://github.com/maillab/cloud-mail)
**官方部署文档**：https://doc.skymail.ink/guide/dashboard.html

---

> [!IMPORTANT] IMPORTANT
> 本教程按照官方文档使用 **Workers** 方式部署。Pages 方式可能导致 Email Routing 绑定异常。

---

# 一、Cloud Mail 是什么

Cloud Mail 是一个基于 Cloudflare Workers 的轻量级在线邮箱系统，支持自定义域名邮箱、Catch-all 临时邮箱、Web 收发邮件、附件管理、后台管理等功能。

**核心技术栈**：
- 后端：Cloudflare Workers + Hono
- 数据库：Cloudflare D1
- 缓存：Cloudflare KV
- 邮件接收：Cloudflare Email Routing
- 邮件发送：**Resend**
- 附件存储：Cloudflare R2（推荐）

> [!NOTE] NOTE
> Resend 是一款现代化的邮件发送服务（Transactional Email），类似 SendGrid，但更易用。免费版每月 3000 封邮件，适合个人和轻度使用项目。

---

# 二、准备工作

1. **Cloudflare 账号**：https://dash.cloudflare.com （必须）
2. **域名**：要已托管到 Cloudflare
3. **一个GitHub 账号**
4. **Resend 账号**：https://resend.com （可用google注册）
5. **信用卡**（可选但推荐 没有也可以 就是存储容量比较小）：用于开通 R2
6. **Telegram 账号**（可选推送）

> [!CAUTION] CAUTION
> 域名必须在 Cloudflare 管理 DNS，否则 MX 记录和 Email Routing 会无法正常工作。

---

## step1 Fork 项目

1. 打开此github项目：
[maillab/cloud-mail](https://github.com/maillab/cloud-mail)

2. 点击右上角 **Fork**，Fork 到你的 GitHub 账号。
![image.png](https://tu.raynard.lol/file/blog/1780238366903.png)

---

## step2 使用 Workers 方式部署

> [!IMPORTANT] IMPORTANT
> 官方文档推荐使用 Workers 而非 Pages，因为 Workers 对 Email Routing 支持更好。

**详细步骤**：

1. 登录 Cloudflare Dashboard → 左侧菜单 **Workers & Pages**
2. 点击 右上**Create application** → 选择 **Workers** → **Connect to Git**
3. 授权 GitHub 并选择你 Fork 的仓库
4. **Project name填**：
```
 cloud-mail(随意其实 看你)
```

5. **Production branch填**：
```
main
```
6. **Root directory填**：
```
/mail-worker
```
![image.png](https://tu.raynard.lol/file/blog/1780238393015.png)
> [!WARNING] WARNING
> Root directory 必须填写 `mail-worker`，这是最容易出错的地方！填错会导致部署失败或功能异常。

2. Build command 和 Build output directory 均**留空**
3. 点击 **Save and Deploy**

---

### GitHub Actions 自动部署方式（推荐进阶用户）
> [!TIP] TIP
>可以不用理会 worker部署已经挺方便的了

项目已内置 GitHub Actions 工作流。

1. 进入你的 Fork 仓库 → **Settings** → **Secrets and variables** → **Actions**
2. 添加以下 Secrets：
   - `CLOUDFLARE_API_TOKEN`（在 Cloudflare 创建 Worker Edit Token）
   - `CLOUDFLARE_ACCOUNT_ID`（在 Workers 仪表盘右下角可见）

> [!TIP] TIP
> 使用 GitHub Actions 后，以后修改代码直接 push 到 main 分支即可自动部署，非常方便。

---

# 三、创建并绑定 KV 与 D1

##  1.创建 KV Namespace（kv命名空间）
- **Storage & Databases** → **KV** → **Create namespace**
![image.png](https://tu.raynard.lol/file/blog/1780238426112.png)
- 名称建议：`cloud-mail-kv`（这个随意）

## 2.绑定 KV
进入 Worker → **Settings** → **Bindings** → **Add binding**
![image.png](https://tu.raynard.lol/file/blog/1780238450896.png)
![image.png](https://tu.raynard.lol/file/blog/1780238479523.png)
![image.png](https://tu.raynard.lol/file/blog/1780238496476.png)
- 类型：KV Namespace
- **Variable name**：`kv`（必须小写）

> [!CAUTION] CAUTION
> 变量名 `kv` 和 `db` 必须严格小写，否则会出现 500 错误。

## 3.创建并绑定 D1
- **Storage & Databases** → **D1 SQL Database** → 创建 `cloud-mail-db`
![image.png](https://tu.raynard.lol/file/blog/1780238535675.png)
- 绑定时 **Variable name**：`db`（必须小写）

---

## 4.配置环境变量

进入 Worker → **Settings** → **Variables and Secrets**


```json
// domain（必须 JSON 数组格式）
["你的主域名"]

// admin（管理员邮箱）
admin@你的主域名 如：admin@raynard.lol

// jwt_secret （随便填就行 只要没有特殊字符(英文减号-不算)就行 最好就直接一串纯英文比如“raynards_mail”）
your-random-jwt-secret-2026
```
![image.png](https://tu.raynard.lol/file/blog/1780238573165.png)

> [!TIP] TIP
> 可以额外添加 `RESEND_API_KEY` 和 `RESEND_FROM_EMAIL`，方便后续配置。

配置完成后**必须重新部署**。

---

## 5.绑定自定义域名

Worker → **Triggers** → **Custom domains** → 添加 `mail.example.com`

> [!IMPORTANT] IMPORTANT
> 建议使用子域名 `mail.example.com`，避免直接使用根域名导致冲突。

---

## 6.初始化数据库

浏览器访问：

```text
https://你的worker自定义域名/api/init/你的jwt-secret
```

> [!WARNING] WARNING
> 初始化前不要注册账号！否则可能导致权限问题。

最后成功会返回 `{"success":true}`。

---

## 7.注册管理员账号

访问 `https://你的worker自定义域名`

- 点击注册
- **用户名**：`admin`
- **邮箱**：`admin@你的主域名`（必须与环境变量即你填在前面的主域名完全一致）

> [!CAUTION] CAUTION
> 管理员邮箱必须和环境变量里的 `admin` 值完全一致，否则无法获得管理员权限。

---

# 四、配置邮件接收（Catch-all）

1. **Cloudflare** → **Email** → **Email Routing** → 开启
> [!IMPORTANT] IMPORTANT
> 在进入时的电子邮件入门指南在右下角跳过 要直接**跳过**

2. 开启路由时同意自动添加 DNS 记录

3. 配置路由规则： **Routing rules** → **Create address** → **Catch-all address**
4. Destination 选择你的 Worker

![image.png](https://tu.raynard.lol/file/blog/1780238616566.png)

> [!TIP] TIP
> Catch-all 功能非常强大，任意前缀的邮箱都能接收，无需提前创建账号。所以說前面直接跳過就行 不跳過反而受限

---

# 五、配置 Resend 发送邮件

**Resend 是什么？**  
Resend 是专业的邮件发送服务，支持使用自己的域名发信，提升送达率。

**收费标准**：免费每月 3000 封，超出后按量计费。个人使用基本不会超 所以不用担心

**配置步骤**：

1. 登录 [resend.com](https://resend.com)
2. **Domains** → **Add Domain**
![image.png](https://tu.raynard.lol/file/blog/1780238636192.png)
3. **推荐**：点击 **Sign in to Cloudflare** 自动添加 DNS 记录

> [!TIP] TIP
> 使用 Cloudflare Domain Connect 自动添加 DNS 是最简单的方法，能减少手动错误。
 
**强烈推荐添加以下防伪 DNS 记录**：

```
Type: TXT
Name: _dmarc
Content: v=DMARC1; p=none; 
TTL: auto（自动）
```
如图手动添加在cf的dns记录上
![image.png](https://tu.raynard.lol/file/blog/1780238657309.png)

> [!IMPORTANT] IMPORTANT
> 添加 DKIM、SPF、DMARC 后，邮件更不容易进垃圾箱。DNS 修改后等待 5-30 分钟生效，并将邮件相关记录设为 **DNS Only**（灰色云朵）。

4. 创建 Full Access API Key
![image.png](https://tu.raynard.lol/file/blog/1780238671613.png)
5. 在 Cloud Mail 后台 → **系统设置** → **邮件设置** 中配置 Resend 参数并测试。
测试成功后，你将拥有一个功能完整的 Serverless 邮箱系统。
---

# 六、配置 R2 附件存储(可以不做 但是比较推荐 要有信用卡才能做)

**绑定信用卡**：
1. Cloudflare → 头像 → **Billing** → **Add payment method**
2. 验证信用卡（一般不扣费）

**创建 R2**：
- 创建 Bucket `cloud-mail-attachments`
- 绑定时 Variable name 使用 `BUCKET`

> [!NOTE] NOTE
> R2 在免费额度内几乎不收费，非常适合存储邮件附件。

---

# 七、配置 Telegram 推送（也可以不弄）

配置这个主要是为了不用上网页端也能收到信息 如果你电脑端开了telegram的消息提示的话 这个的体验就很不错 你可以在接码的时候直接在右下角的消息提示那里复制验证码
![image.png](https://tu.raynard.lol/file/blog/1780238784805.png)

**官方原文档操作方法**：

1. 在 Telegram 搜索 @BotFather
2. 创建机器人并复制機器人的Token
3. 给机器人发消息 比如 `test` 之類的
4. 浏览器访问 `https://api.telegram.org/bot你的Token/getUpdates` 获取 chat_id 或者用 [VersaToolsBot](https://t.me/VersaToolsBot) 這個機器人可以查詢到你的chatid

在 Cloud Mail 后台 **系统设置** 中填写 Token 和 Chat ID 即可。

---

# 七、常见问题排查

> [!WARNING] WARNING
> **部署失败 / 500 错误**：优先检查 Root directory 是否为 `mail-worker`、KV/D1 变量名是否正确。

> [!CAUTION] CAUTION
> **发信进垃圾箱**：必须正确配置 SPF + DKIM + DMARC。

---

# 总结

部署完成后，你将拥有一个功能完整的 Serverless 邮箱系统。

api接口問題可以參考官方文檔：https://doc.skymail.ink/api/api-doc.html
