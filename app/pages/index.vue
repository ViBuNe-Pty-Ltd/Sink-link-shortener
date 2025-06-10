<template>
  <div class="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
    <!-- Header -->
    <header class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>
          <span class="text-xl font-bold">ihaz.link</span>
        </div>
        <nav>
          <a href="/dashboard" class="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors">
            Sign In
          </a>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <main class="container mx-auto px-6 py-16 md:py-24 text-center">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 leading-tight">
          Simple, Powerful, Reliable Link Shortening
        </h1>
        <p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Create clean, memorable short links for your brand. Built on a secure, blazingly-fast serverless platform. Your links, your domain, your control.
        </p>
        <a href="/dashboard" class="inline-block px-8 py-4 text-lg font-bold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform hover:-translate-y-1 transition-all duration-300">
          Get Started
        </a>
      </div>
    </main>

    <!-- Features Section -->
    <section class="bg-gray-50 dark:bg-gray-800/50 py-20">
      <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-3 gap-12 text-center">
          <div class="feature">
            <div class="flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 text-white mx-auto mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Secure & Private</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Built on Cloudflare's industry-leading secure network. Your data is yours alone.
            </p>
          </div>
          <div class="feature">
            <div class="flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 text-white mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Team Focused</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Easily manage and create links as a team. The perfect internal tool for your campaigns.
            </p>
          </div>
          <div class="feature">
            <div class="flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 text-white mx-auto mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Actionable Analytics</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Get insights into who is clicking your links with built-in, privacy-first analytics.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="container mx-auto px-6 py-8 text-center text-gray-500">
      <p>&copy; {{ new Date().getFullYear() }} ==//== </p>
    </footer>
  </div>
</template>

<script setup>
// This page is fully self-contained.
// We can add meta tags and other head information here if needed.
useHead({
  title: 'ihaz.link - Simple, Powerful Link Shortening',
  meta: [
    { name: 'description', content: 'Create clean, memorable short links for your brand on your own domain.' }
  ]
})
</script>

