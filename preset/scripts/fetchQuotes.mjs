#!/usr/bin/env node
/**
 * 从 hitokoto 抓一批句子，写进 public/quotes.json。
 *
 * 只有手动跑 `npm run quotes` 时才会联网。构建过程本身完全离线：
 * 首页名言是读取这个 JSON 在构建期烤进 HTML 的（见 src/components/home/Quote.astro），
 * 浏览器不会再向 dummyjson / hitokoto 之类的境外接口发请求。
 *
 * 想换风格就改 CATEGORY，分类见 https://developer.hitokoto.cn/sentence/
 */
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/** 目标句数（去重后不足会少于这个数） */
const WANT = 60
/** hitokoto 分类：i=诗词 a=动画 b=漫画 c=游戏 d=文学 e=原创 f=来自网络 g=其他 h=影视 i=诗词 j=网易云 k=哲学 l=抖机灵 */
const CATEGORY = 'i'
/** 并发数，别把接口打疼 */
const CONCURRENCY = 8
/** 最多发多少次请求，防止接口一直返回重复句子时死循环 */
const MAX_REQUESTS = WANT * 6

const outputPath = path.join(fileURLToPath(new URL('.', import.meta.url)), '../../public/quotes.json')

const found = new Map()
let requests = 0

async function fetchOne() {
  if (requests >= MAX_REQUESTS) return
  requests += 1

  // hitokoto 前面有缓存，加个随机参数才拿得到不同句子
  const url = `https://v1.hitokoto.cn/?c=${CATEGORY}&encode=json&_=${Math.random().toString(36).slice(2)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`hitokoto 返回 ${res.status}`)

  const data = await res.json()
  // 按正文去重：同一句可能挂着不同 uuid
  if (!data?.hitokoto || found.has(data.hitokoto)) return

  found.set(data.hitokoto, {
    text: data.hitokoto,
    from: data.from || '',
    who: data.from_who || ''
  })
}

while (found.size < WANT && requests < MAX_REQUESTS) {
  // 一批一批发，单条失败不影响整批
  const batch = Array.from({ length: CONCURRENCY }, () => fetchOne().catch(() => {}))
  await Promise.all(batch)
  process.stdout.write(`\r已收集 ${found.size}/${WANT} 句（请求 ${requests} 次）`)
}

const quotes = [...found.values()]
if (quotes.length === 0) {
  console.error('\n一句都没抓到，检查一下网络或 hitokoto 是否可用。现有 quotes.json 未改动。')
  process.exit(1)
}

await writeFile(outputPath, `${JSON.stringify(quotes, null, 2)}\n`, 'utf8')
console.log(`\n写入 ${quotes.length} 句到 public/quotes.json`)
