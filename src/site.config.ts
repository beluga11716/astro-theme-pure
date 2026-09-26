import type { CardListData, Config, IntegrationUserConfig, ThemeUserConfig } from 'astro-pure/types'

export const theme: ThemeUserConfig = {
  // [Basic]
  /** Title for your website. Will be used in metadata and as browser tab title. */
  title: 'raynardの小窩',
  /** Will be used in index page & copyright declaration */
  author: 'RAYNARD',
  /** Description metadata for your website. Can be used in page metadata. */
  description: "raynard's blog, a static blog built with Astro, inspired by firefly.",
  /** The default favicon for your site which should be a path to an image in the `public/` directory. */
  favicon: '/favicon/favicon.ico',
  /** The default social card image for your site which should be a path to an image in the `public/` directory. */
  socialCard: '/images/social-card.png',
  /** Specify the default language for this site. */
  locale: {
    lang: 'zh-TW',
    attrs: 'zh_TW',
    // Date locale
    dateLocale: 'zh-TW',
    dateOptions: {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  },
  /** Set a logo image to show in the homepage. */
  logo: {
    src: '/src/assets/avatar.webp',
    alt: 'RAYNARD'
  },

  titleDelimiter: '•',
  prerender: true, // pagefind search is not supported with prerendering disabled
  // 第三方库改为自托管：medium-zoom 与 qrcodejs 已下载到 public/vendor/npm/，
  // 路径结构与 npm 包一致，所以主题里 `${npmCDN}/<包名>/<路径>` 的拼法照常可用。
  // 这样页面不用再去 cdn.jsdelivr.net 取文件 —— 那个域名在大陆时好时坏，
  // 一旦超时会拖住整个页面渲染。
  // 更新方式：重新下载对应版本的 dist 文件放进 public/vendor/npm/，路径保持不变。
  npmCDN: '/vendor/npm',

  // Still in test
  head: [
    /* Telegram channel */
    // {
    //   tag: 'meta',
    //   attrs: { name: 'telegram:channel', content: '@cworld0_cn' },
    //   content: ''
    // }
  ],
  customCss: [],

  /** Configure the header of your site. */
  header: {
    menu: [
      { title: 'blog', link: '/blog' },
      { title: '文檔', link: '/docs' },
      { title: '專案', link: '/projects' },
      { title: '關於', link: '/about' }
    ]
  },

  /** Configure the footer of your site. */
  footer: {
    // Year format
    year: `© ${new Date().getFullYear()}`,
    // year: `© 2019 - ${new Date().getFullYear()}`,
    links: [
      // Privacy Policy link
      {
        title: 'Site Policy',
        link: '/terms',
        pos: 2 // position set to 2 will be appended to copyright line
      }
    ],
    /** Enable displaying a “Astro & Pure theme powered” link in your site’s footer. */
    credits: true,
    /** Optional details about the social media accounts for this site. */
    social: [
      { icon: 'github', label: 'GitHub', href: 'https://github.com/beluga11716' },
      { icon: 'x', label: 'X', href: 'https://x.com/raynard11716' },
      { icon: 'telegram', label: 'Telegram', href: 'https://t.me/+jjPi8QtiO2ZhMzE9' },
      { icon: 'email', label: 'Email', href: 'https://mail.raynard.lol/' },
      { icon: 'rss', label: 'RSS', href: '/rss.xml' }
    ]
  },

  // [Content]
  content: {
    /** External links configuration */
    externalLinks: {
      content: ' ↗',
      /** Properties for the external links element */
      properties: { style: 'user-select:none' }
    },
    /** Blog page size for pagination (optional) */
    blogPageSize: 8,
    /** Share buttons to show */
    // Currently support weibo, x, bluesky
    share: ['weibo', 'x', 'bluesky']
    /** Enable image captions (default false) */
    // imageCaption: true
  }
}

export const integ: IntegrationUserConfig = {
  // [Links]
  // 友鏈功能已移除：選單項、/links 頁面、FriendList 元件、public/links.json
  // 與 preset/scripts/cacheAvatars.ts 都已刪除。`links` 在 schema 中帶預設值，故整段省略。

  // [Search]
  pagefind: true,
  // [Quote]
  // 首頁名言改由 src/components/home/Quote.astro 在構建期讀取本機 `public/quotes.json`
  // 直接烤進 HTML，執行時不請求任何外部介面。此欄位是 astro-pure schema 的必填項，
  // 指向本站靜態檔是為了讓主題內建的 <Quote> 若被用到時也只同源取一次，不外連。
  quote: {
    server: '/quotes.json',
    target: `(data) => data[Math.floor(Math.random() * data.length)].text`
  },
  // [Typography]
  // https://unocss.dev/presets/typography
  typography: {
    class: 'prose text-base',
    // The style of blockquote font `normal` / `italic` (default to italic in typography)
    blockquoteStyle: 'italic',
    // The style of inline code block `code` / `modern` (default to code in typography)
    inlineCodeBlockStyle: 'modern'
  },
  // [Lightbox]
  // A lightbox library that can add zoom effect
  // https://astro-pure.js.org/docs/integrations/others#medium-zoom
  mediumZoom: {
    enable: true, // disable it will not load the whole library
    selector: '.prose .zoomable',
    options: {
      className: 'zoomable'
    }
  },
  // Comment system
  waline: {
    enable: false,
    // Server service link
    server: 'https://astro-theme-pure-waline.arthals.ink/',
    // Show meta info for comments
    showMeta: false,
    // Refer https://waline.js.org/en/guide/features/emoji.html
    emoji: ['bmoji', 'weibo'],
    // Refer https://waline.js.org/en/reference/client/props.html
    additionalConfigs: {
      // search: false,
      locale: {
        nick: 'Name',
        mail: 'Email',
        login: 'Login (Optional)',
        placeholder: 'Comment here... (Email to receive replies)',
        reaction0: 'Like'
      }
    }
  }
}

export const terms: CardListData = {
  title: 'Terms content',
  list: [
    {
      title: 'Privacy Policy',
      link: '/terms/privacy-policy'
    },
    {
      title: 'Terms and Conditions',
      link: '/terms/terms-and-conditions'
    },
    {
      title: 'Copyright',
      link: '/terms/copyright'
    },
    {
      title: 'Disclaimer',
      link: '/terms/disclaimer'
    }
  ]
}

const config = { ...theme, integ } as Config
export default config
