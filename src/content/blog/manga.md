---
title: '漫畫軟件'
publishDate: 2026-03-01
description: '漫畫軟件'
tags:
  - 'APP'
draft: false
---
一些漫畫軟件推薦

> [!note]
> 先把小結寫在前面 看自己需求在右邊目錄直接跳轉到對應的地方
> - Android 用戶：穩定選 Mihon，功能多選 Komikku，簡單內建來源選 Kotatsu，想自訂 JS 來源可試 Venera（但已歸檔）。
> - iOS 用戶：主要用 Tachimanga。

# **1.Venera**  

![image.png](https://tu.raynard.lol/file/blog/1780309166658.png)

A comic reader that support reading local and network comics.

特点：非常完美的阅读体验 界面干净整洁 就是源得调一下 以免内容里有水印广告影响观看 支持高度自定义 可以自己配置云空间以进行云同步

> [!important]
> （2026.5.18二編 venera已經停止更新了 有遇到嚴重bug的話就別用了）
> ![image.png](https://tu.raynard.lol/file/blog/1780309183733.png)

**原项目**:

[venera-app/venera](https://github.com/venera-app/venera)

**需要搭配rawrepo使用**:

> rawrepo链接：
```
https://git.nyne.dev/nyne/venera-configs/raw/branch/main/index.json
```
# **rawrepo使用教程**：
下载到软件之后在主页→漫画源 在有url字样的框框里粘贴上面的source链接 导入后等导入成功就可以用了 **後面的那些軟件有帶rawrepo的都是同理 沒有的有內置漫畫源**

和正常使用漫画软件那样就行 有些源是eh和紳士漫畫的 可以挂梯使用 以此规避掉广告

当漫画源失效时可在comic_source[原仓库](https://github.com/venera-app/venera/blob/master/doc/comic_source.md)这里找到最新的source链接

# 2.漫閱
刷b站看到這條評論 瞭解了一下發現這基本上就是venera的復刻 可以考慮看看用這個

![image.png](https://tu.raynard.lol/file/blog/1780309276149.png)

故來補充一個漫閱 對蘋果利好 可直接在[App Store下載](https://apps.apple.com/cn/app/%E6%BC%AB%E9%98%85-%E6%BC%AB%E7%94%BB%E4%BA%BA%E9%83%BD%E7%88%B1%E7%9A%84%E6%BC%AB%E7%94%BB%E9%98%85%E8%AF%BB%E7%A5%9E%E5%99%A8/id6753895889)

![image.png](https://tu.raynard.lol/file/blog/1780309209783.png)

附一個漫畫源項目地址：

[SoBison/ManYue](https://github.com/SoBison/ManYue)

也就是前面的rawrepo來源的倉庫 往下翻readme.md的文檔可以看到 直接複製這個鏈接導入就行

![image.png](https://tu.raynard.lol/file/blog/1780309359178.png)


<br>

# 3.Mihon（Android）

![image.png](https://tu.raynard.lol/file/blog/1780309370884.png)

**GitHub 描述**：  
Mihon 是免費且開源的 Android 漫畫閱讀器。「Full-featured reader. Discover and read manga, webtoons, comics, and more – easier than ever on your Android device.」

**優點**：  
- 功能完整又穩定，閱讀模式、追蹤器（MAL、AniList 等）和圖書館管理都很強。  
- 自訂選項多，介面好用，社區支援活躍。

**缺點**：  
- 需要自己加 extensions 儲存庫才能用很多來源，新手一開始可能要花點時間熟悉。  
- 某些來源會因為網站改版而暫時失效，要等更新。

**GitHub**： 

[mihonapp/mihon](https://github.com/mihonapp/mihon)  

**官網**： [https://mihon.app/](https://mihon.app/)

**官方 Extensions 儲存庫**：**_Keiyoushi_**

[keiyoushi/extensions](https://github.com/keiyoushi/extensions)

**Repo URL**：

```
https://raw.githubusercontent.com/keiyoushi/extensions/repo/index.min.json
```
<br>

# 4.Tachimanga（iOS）

![image.png](https://tu.raynard.lol/file/blog/1780309394228.png)

**GitHub 描述**：  
「Tachimanga is a full-featured manga reader for iOS. Supports manga in ZIP/CBZ and EPUB formats. Supports reading manga from Komga, which is a self-hosted manga server.」它是 Tachiyomi 的 iOS 非官方移植版。

**優點**：  
- 在 iOS 上提供比較完整的漫畫閱讀體驗，還能讀本地檔案和自託管伺服器。  
- 安裝方便，適合 Apple 用戶。

**缺點**：  
- iOS 系統限制比較多，部分功能可能沒 Android 版那麼順。  
- 更新速度比 Android 主線慢一些。

**GitHub**： 

[tachimanga/tachimanga](https://github.com/tachimanga/tachimanga) 

**官網**： [https://tachimanga.app/](https://tachimanga.app/)

**rawrepo**:
```
https://raw.githubusercontent.com/keiyoushi/extensions/repo/index.min.json  
```

<br>

# 5.Kotatsu（Android）

[grid]
![image.png](https://tu.raynard.lol/file/blog/1780310163995.png)
![image.png](https://tu.raynard.lol/file/blog/1780309574748.png)
![image.png](https://tu.raynard.lol/file/blog/1780309551116.png)
[/grid]

> [!tip]
> kotatsu的原項目已經停更 我把鏈接換成了kotatsu_redo 和原來一樣的 只不過redo還在更新內置漫畫源

**GitHub 描述**：  
「Kotatsu is a free and open-source manga reader for Android with built-in online content sources.」內建大量來源，強調即開即用。

**優點**：  
- 內建很多解析器，不用一直加 extensions，搜漫畫很方便。  
- 介面乾淨現代，下載和離線閱讀功能不錯，輕量好用。

**缺點**：  
- 專案目前處於歸檔狀態，維護可能不如以前活躍。  
- 來源管理彈性比 extensions 系統小一點，遇到問題時選擇較少。

**GitHub**： 
[Kotatsu-Redo/Kotatsu-Redo](https://github.com/Kotatsu-Redo/Kotatsu-Redo)  

<br>

# 6.Komikku（Android）

![image.png](https://tu.raynard.lol/file/blog/1780309453443.png)

**官網 / GitHub 描述**：  
「A free and open source manga reader which is based off TachiyomiSY & Mihon/Tachiyomi. This fork is meant to provide new & useful features while regularly take features/updates from Mihon or other forks.」**它是 Mihon 與其他 fork 的綜合版，致力加入實用新功能。**

**優點**：  
- 功能很豐富，結合多個版本的優點，持續在加新東西。  
- 圖書館管理和 extensions 支援都很到位，適合想要更多自訂的用戶。

**缺點**：  
- 作為 fork，更新有時會比主線 Mihon 慢一點。  
- 功能多可能讓新手覺得有點複雜，偶爾會遇到小 bug。

**GitHub**： 

[komikku-app/komikku](https://github.com/komikku-app/komikku)  

**rawrepo**： 
```
https://raw.githubusercontent.com/keiyoushi/extensions/repo/index.min.json  
```

# 小結

- Android 用戶：穩定選 Mihon，功能多選 Komikku，簡單內建來源選 Kotatsu，想自訂 JS 來源可試 Venera（但已歸檔）。
- iOS 用戶：主要用 Tachimanga。

**強烈建議直接在 App 內加入上方 Keiyoushi Extensions 儲存庫，就能獲得最多來源。這些都是開源免費軟體，使用時請注意內容來源的合法性，有問題可到 GitHub 或官網查看文件。**

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>



2026.1.4

# 搞了一下venera云同步的问题
但是说实话 不是很好用其实 同步很不及时 而且和网络环境很有关系 因此**最好还是在切换设备观看时记住页数来手动同步**

(2026.5.18 三編 **下面教程的圖片失效了所以不用看了** 可以去網上搜一下**webdav雲同步教程**這裡留一個堅果雲的 其實都大差不差 只要找個支持webdav的網盤就行)

**堅果雲雲同步教程：https://docs.reeden.app/sync_jianguoyun**

 :spoiler[我们首先需要一个支持webdav的网盘]


 :spoiler[这个是infiniclould 链接：https://infini-cloud.net/en/index.html 注册登录后会送20g的免费云盘空间]



:spoiler[然后我们在my page的页面往下翻 会看到一个关于 **_链接第三方app_** 的选项 把它勾选 等一会 就能看到类似这样的画面内容]


:spoiler[我们记住这三个内容接着打开venera 在右上角设置→应用→数据同步 然后就能看到]

:spoiler[把上面在mypage那里infiniclould分配的密码和网址填进去 （跳过设置项不填）接着点击继续就行]

:spoiler[然后在别的设备上也是同样的操作 就可以实现云同步功能]



