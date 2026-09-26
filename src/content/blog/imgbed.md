---
title: 'imgbed'
publishDate: 2026-06-13
updatedDate: 2026-06-13
description: '如何拥有一个属于自己的私人图床'
tags:
  - 'APP'
  - 'utility_tools'
  - 'blog'
  - 'just_for_fun'
draft: false
---
# CloudFlare-ImgBed + Cloudflare R2 完整搭建指南（2025）

經過幾天折騰，我最終將自己的圖床從 Telegram 存儲遷移到了 Cloudflare R2。

本文會從零開始介紹：

* CloudFlare-ImgBed 部署
* Cloudflare R2 配置
* Telegram 配置
* 自定義域名
* 隨機圖 API
* Random API 522 錯誤修復
* Telegram → R2 遷移
* 成本分析

並記錄實際踩過的坑。

---

# 為什麼選 CloudFlare-ImgBed

官方倉庫：

https://github.com/MarSeventh/CloudFlare-ImgBed

CloudFlare-ImgBed 是一個基於 Cloudflare 生態的無服務器圖床系統。

支持：

* Cloudflare R2
* Telegram Bot
* GitHub
* S3
* OSS
* COS

同時提供：

* Web 管理後台
* 圖片分類
* API 上傳
* 隨機圖 API
* 圖片索引

最大的優勢是：

```text
不需要 VPS
不需要資料庫
不需要 Docker
不需要後端服務器
```

全部運行於：

```text
Cloudflare Pages
Cloudflare Workers
Cloudflare R2
```

之上。

---

# 第一步：部署 CloudFlare-ImgBed

## 官方文檔

官方部署文檔：

https://github.com/MarSeventh/CloudFlare-ImgBed/wiki

官方倉庫：

https://github.com/MarSeventh/CloudFlare-ImgBed

---

## Fork 倉庫

打開：

https://github.com/MarSeventh/CloudFlare-ImgBed

點擊：

```text
Fork
```

創建自己的副本。

---

## 創建 Cloudflare Pages

官方文檔：

https://developers.cloudflare.com/pages/

登入：

https://dash.cloudflare.com/

進入：

```text
Workers & Pages
```

選擇：

```text
Create Application
```

然後：

```text
Pages
```

---

## 從 GitHub 導入

選擇：

```text
Connect to Git
```

授權 GitHub。

選擇：

```text
CloudFlare-ImgBed
```

Fork 出來的倉庫。

---

## 構建配置

按照官方默認：

```text
Framework preset:
None

Build command:
留空

Build output directory:
dist
```

部署即可。

---

## 首次訪問

部署完成後會得到：

```text
https://xxxxx.pages.dev
```

訪問即可進入圖床後台。

---

# 第二步：配置 Cloudflare R2

## 官方文檔

R2 官方文檔：

https://developers.cloudflare.com/r2/

---

## 創建 Bucket

進入：

https://dash.cloudflare.com/

選擇：

```text
R2
```

點擊：

```text
Create Bucket
```

例如：

```text
imgbed
```

---

## 創建 API Token

進入：

```text
R2
↓
Manage R2 API Tokens
```

創建：

```text
API Token
```

記錄：

```text
Access Key ID
Secret Access Key
```

後面配置圖床時會用到。

---

## 在 ImgBed 中添加 R2

進入：

```text
系統設置
↓
存儲管理
↓
新增存儲
```

選擇：

```text
Cloudflare R2
```

填寫：

```text
Bucket Name
Access Key ID
Secret Access Key
```

保存。

---

# 第三步：配置 Public Development URL

這一步非常重要。

很多人漏掉這一步後：

```text
圖片無法訪問
隨機圖異常
返回 522
```

---

進入：

```text
Cloudflare Dashboard
↓
R2
↓
Bucket
↓
Settings
```

找到：

```text
Public Development URL
```

開啟。

---

Cloudflare 會生成：

```text
https://pub-xxxxxxxx.r2.dev
```

---

然後返回 ImgBed：

```text
存儲配置
↓
Public URL
```

填入：

```text
https://pub-xxxxxxxx.r2.dev
```

---

注意：

直接打開：

```text
https://pub-xxxxxxxx.r2.dev
```

看到：

```text
404
```

是正常現象。

因為根目錄沒有文件。

---

# 第四步：配置 Telegram（可選）

官方 Bot：

https://t.me/BotFather

---

## 創建 Bot

向：

```text
@BotFather
```

發送：

```text
/newbot
```

獲取：

```text
Bot Token
```

---

## 創建頻道

建立：

```text
私有頻道
```

---

## 添加 Bot

將 Bot 拉入頻道。

授予：

```text
管理員權限
```

---

## 獲取 Chat ID

可使用：

https://api.telegram.org/bot<TOKEN>/getUpdates

取得：

```text
Chat ID
```

---

## 填入 ImgBed

新增存儲：

```text
Telegram
```

填入：

```text
Bot Token
Chat ID
```

即可。

---

# 第五步：配置自定義域名

官方文檔：

https://developers.cloudflare.com/r2/data-access/public-buckets/

---

推薦：

```text
cdn.example.com
```

而不是：

```text
pub-xxxx.r2.dev
```

---

綁定完成後：

圖片地址：

```text
https://cdn.example.com/wallpaper/test.png
```

更加美觀。

---

# 第六步：配置隨機圖 API (需要的才弄这个 比如让博客背景随着每一次刷新都改变这样)

可以先看官方文档：https://cfbed.sanyue.de/api/random.html

後台：

```text
系統設置
↓
Random API
```

開啟：

```text
Enable Random API
```

---

允許目錄：

例如：

```text
/Wallpaper
```

或者：

```text
/
```

---

使用方式：

![image.png](https://tu.raynard.lol/file/blog/1781341219958.png)

比如说我配置的背景随机api就是

![image.png](https://tu.raynard.lol/file/blog/1781341342940.png)

测试api是否工作

打开`https://your.domain/random?dir=wallpaper`

返回：

{
"url": "/file/wallpaper/test.png"
}

---

直接返回圖片就把type=img就行：

`https://your.domain/random?type=img`

返回就直接是图片

---

# 我踩過最大的坑：Random API 返回 522
这个真的要把我搞疯了 两个晚上才弄好

最開始：

```text
/random?dir=wallpaper
```

正常。

---

但：

```text
/random?type=img&dir=wallpaper
```

返回：

```text
errors 522
```
也就是没有直接图片返回 `type=img`不生效

---

Cloudflare Logs：

```text
status=200
outcome=ok
```

沒有任何報錯。

---

Network：

```text
Status Code: 200
Content-Type: text/plain
```

內容就是：

```text
errors 522
```

---

這說明：

不是 Cloudflare 的 522。

而是程序自己返回的錯誤。

---

# 最終定位

文件：

```text
/functions/random/index.js
```

存在：

```javascript
if (randomType == 'img') {
    randomUrl = requestUrl.origin + randomPath;

    return new Response(
        await fetch(randomUrl)
    );
}
```

---

這裡會：

```text
Worker
↓
再次 fetch 自己
↓
循環請求
```

導致：

```text
errors 522
```

---

# 修復方案

替換為：

```javascript
if (randomType == 'img') {
    return Response.redirect(
        requestUrl.origin + randomPath,
        302
    );
}
```

重新部署即可。

---

# Telegram 遷移到 R2

我當時只有121 張圖片：

因此直接：

```text
文件管理
↓
批量下載
↓
批量上傳到 R2
```

即可。

---

如果圖片很多：

推薦：

```text
Telegram API
+
腳本批量下載
+
R2 批量上傳
```

完成遷移。

---

# R2 收費模式

官方價格：

https://developers.cloudflare.com/r2/pricing/

---

R2 不是訂閱制。

而是：

```text
按實際使用量計費
```

例如：

```text
存 10GB
付 10GB 的費用
```

增加容量：

```text
直接繼續上傳
```

即可。

不需要升級套餐。

---

# 最終方案

我目前使用：

CloudFlare-ImgBed

*

Cloudflare Pages

*

Cloudflare R2+telegram channel

*

自定義域名

---

優點：

* 無服務器
* 國內速度不錯
* API 完整
* 成本極低
* 支持隨機圖
* 支持分類管理
* 可擴展 Telegram

對於個人博客、Hexo、Hugo、Next.js 圖床來說，這應該是目前最值得推薦的一套 Cloudflare 生態方案。
