<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
const scrolled = ref(false)
const isOpen = ref(false)

function onScroll() { scrolled.value = window.scrollY > 60 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const links = [
  { href: '#profile', label: 'Profile' },
  { href: '#skills',  label: 'Skills'  },
]
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-50 transition-all duration-500"
    :class="scrolled
      ? 'bg-[#06030f]/90 backdrop-blur-md border-b border-white/5'
      : 'bg-transparent'"
  >
    <div class="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">

      <!-- Wordmark -->
      <a href="#" class="flex items-center gap-3 group">
        <span
          class="text-[#f0e8ff] font-black tracking-tight text-xl select-none"
          style="font-family:'Georgia',serif; letter-spacing:-0.02em;"
        >Kafka</span>
        <span class="text-[#4a3a5e] text-sm font-mono tracking-widest select-none hidden md:block">5★</span>
      </a>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-1">
        <a
          v-for="l in links" :key="l.href"
          :href="l.href"
          class="px-4 py-2 text-xs tracking-[0.25em] uppercase font-mono text-[#7a6890] hover:text-[#f0e8ff] transition-colors duration-200"
        >{{ l.label }}</a>
      </nav>

      <!-- Faction tag — right side -->
      <span class="hidden md:block text-xs tracking-[0.35em] uppercase font-mono text-[#4a3a5e]">
        Stellaron Hunters
      </span>

      <!-- Mobile toggle -->
      <button
        class="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5"
        @click="isOpen = !isOpen"
        aria-label="Menu"
      >
        <span class="block h-px w-5 bg-[#7a6890] transition-all duration-200" :class="isOpen ? 'rotate-45 translate-y-1.5' : ''" />
        <span class="block h-px w-5 bg-[#7a6890] transition-all duration-200" :class="isOpen ? 'opacity-0' : ''" />
        <span class="block h-px w-5 bg-[#7a6890] transition-all duration-200" :class="isOpen ? '-rotate-45 -translate-y-1.5' : ''" />
      </button>
    </div>

    <!-- Mobile menu -->
    <div
      class="md:hidden overflow-hidden transition-all duration-300 bg-[#06030f]/95 backdrop-blur-md border-t border-white/5"
      :class="isOpen ? 'max-h-40' : 'max-h-0'"
    >
      <nav class="px-6 py-4 flex flex-col gap-3">
        <a
          v-for="l in links" :key="l.href"
          :href="l.href"
          class="text-[11px] tracking-[0.3em] uppercase font-mono text-[#7a6890] hover:text-[#f0e8ff] transition-colors"
          @click="isOpen = false"
        >{{ l.label }}</a>
      </nav>
    </div>
  </header>
</template>
