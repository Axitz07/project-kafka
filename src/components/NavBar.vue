<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Menu, X } from 'lucide-vue-next'

const scrolled = ref(false)
const isOpen   = ref(false)
const scrollY  = ref(0)

function onScroll() {
  scrollY.value  = window.scrollY
  scrolled.value = window.scrollY > 40
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const links = [
  { href: '#profile', label: 'Character' },
  { href: '#skills',  label: 'Build'     },
]

// Opacity scales in from 0 as user scrolls
const bgOpacity = computed(() => Math.min(scrollY.value / 120, 0.9))
</script>

<template>
  <header class="fixed top-0 inset-x-0 z-50 px-6 pt-4">
    <!-- Floating pill — NOT a full-width sticky bar -->
    <div
      class="max-w-5xl mx-auto flex items-center justify-between h-12 px-5 rounded-2xl
             border border-white/[0.07] transition-all duration-500"
      :style="{
        background: scrolled
          ? `rgba(5,3,10,${bgOpacity})`
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,.5)' : 'none',
        borderColor: scrolled ? 'rgba(124,58,237,.15)' : 'transparent',
      }"
    >
      <!-- Wordmark -->
      <a href="#hero" class="leading-none select-none">
        <span
          class="font-semibold text-[#f1e8ff]"
          style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.25rem;letter-spacing:-.01em;"
        >Kafka</span>
        <span class="text-[#4a3a5e] text-[11px] font-mono tracking-widest ml-2 align-middle">5★</span>
      </a>

      <!-- Desktop -->
      <nav class="hidden md:flex items-center gap-1">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="relative px-4 py-2 text-[12px] tracking-[.28em] uppercase
                 text-[#7a6090] hover:text-[#f1e8ff] transition-colors duration-200 group"
        >
          {{ l.label }}
          <span
            class="absolute bottom-1 left-4 right-4 h-px bg-[#7c3aed]
                   scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
          />
        </a>
      </nav>

      <!-- Faction tag -->
      <span class="hidden md:block text-[11px] tracking-[.35em] uppercase text-[#6b4f8a] font-mono">
        Stellaron Hunters
      </span>

      <!-- Mobile toggle -->
      <button
        class="md:hidden text-[#7a6090] hover:text-[#f1e8ff] transition-colors p-1"
        @click="isOpen = !isOpen"
        aria-label="Menu"
      >
        <X v-if="isOpen" class="w-4 h-4" />
        <Menu v-else class="w-4 h-4" />
      </button>
    </div>

    <!-- Mobile dropdown -->
    <div
      v-if="isOpen"
      class="mt-2 max-w-5xl mx-auto bg-[#06030f]/95 backdrop-blur-xl
             border border-[#2d1f4e]/40 rounded-2xl px-5 py-4 flex flex-col gap-1"
    >
      <a
        v-for="l in links"
        :key="l.href"
        :href="l.href"
        class="py-2.5 text-sm text-[#9080a8] hover:text-[#f1e8ff]
               border-b border-[#1a1030] last:border-0 transition-colors"
        @click="isOpen = false"
      >{{ l.label }}</a>
    </div>
  </header>
</template>
