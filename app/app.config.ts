export default defineAppConfig({
  title: 'Ihaz.link',
  email: 'ihaz.link@vibune.com',
  github: 'https://github.com/ViBune-Pty-Ltd',
  twitter: 'https://vibune.com/twitter',
  telegram: 'https://vibune.com/telegram',
  mastodon: 'https://vibune.com/mastodon',
  blog: 'https://vibune.com/news',
  description: 'A Simple / Speedy / Secure Link Shortener with Analytics, 100% run on Cloudflare.',
  image: 'https://vibune.com/wp-content/uploads/2024/11/applogo.png',
  previewTTL: 300, // 5 minutes
  slugRegex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/i,
  reserveSlug: [
    'dashboard',
  ],
})
