export default defineAppConfig({
  title: 'Ihaz.Link',
  email: 'ihazlink@vibune.com',
  github: 'https://github.com/ViBuNe-Pty-Ltd',
  twitter: 'https://x.com/thevibune',
  telegram: 'https://telegram.org',
  mastodon: 'https://vibune.com/mastodon',
  blog: 'https://vibune.com/news,
  description: 'A Simple / Speedy / Secure Link Shortener with Analytics, 100% run on Cloudflare. Thanks to ccbikai for the original Sink project.',
  image: 'https://vibune.com/wp-content/uploads/2023/04/spinner-1-1-1.svg',
  previewTTL: 300, // 5 minutes
  slugRegex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/i,
  reserveSlug: [
    'dashboard',
  ],
})
