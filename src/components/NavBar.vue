<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#profile', label: 'Profile' },
  { href: '#skills', label: 'Skills & Build' },
]
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 border-b border-[#2d1f4e]/60 backdrop-blur-md bg-[#05030a]/80">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

      <!-- Logo -->
      <a href="#hero" class="flex items-center gap-2 group">
        <span class="text-[#e879f9] text-xl font-bold tracking-widest uppercase"
              style="font-family: 'Georgia', serif; text-shadow: 0 0 20px rgba(232,121,249,0.6)">
          ⚡ Kafka
        </span>
      </a>

      <!-- Desktop nav -->
      <ul class="hidden md:flex items-center gap-8">
        <li v-for="link in navLinks" :key="link.href">
          <a :href="link.href"
             class="text-sm text-[#a78bca] hover:text-[#c084fc] tracking-widest uppercase transition-colors duration-200">
            {{ link.label }}
          </a>
        </li>
      </ul>

      <!-- Badge -->
      <div class="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-[#2d1f4e] bg-[#130d22]">
        <span class="w-2 h-2 rounded-full bg-[#e879f9] animate-pulse"></span>
        <span class="text-xs text-[#a78bca] tracking-widest uppercase">Stellaron Hunters</span>
      </div>

      <!-- Mobile menu toggle -->
      <button class="md:hidden text-[#a78bca] hover:text-[#c084fc]"
              @click="isMenuOpen = !isMenuOpen"
              aria-label="Toggle menu">
        <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMenuOpen" class="md:hidden border-t border-[#2d1f4e]/60 bg-[#0d0818]">
      <ul class="px-6 py-4 flex flex-col gap-4">
        <li v-for="link in navLinks" :key="link.href">
          <a :href="link.href"
             class="text-sm text-[#a78bca] hover:text-[#c084fc] tracking-widest uppercase transition-colors"
             @click="isMenuOpen = false">
            {{ link.label }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
