<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const isOpen   = ref(false)

function onScroll() { scrolled.value = window.scrollY > 48 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const links = [
  { href: '#profile', label: 'Character' },
  { href: '#skills',  label: 'Build'      },
]
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-50 transition-all duration-500"
    :class="scrolled
      ? 'border-b border-[#2d1f4e]/40 backdrop-blur-md bg-[#05030a]/85'
      : 'bg-transparent'"
  >
    <div class="max-w-6xl mx-auto px-8 md:px-14 lg:px-20 h-16 flex items-center justify-between">

      <!-- Wordmark — Cormorant, distinctive -->
      <a href="#hero" class="group leading-none select-none">
        <span class="text-[#f1e8ff] font-semibold"
              style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.35rem;letter-spacing:-.01em;">
          Kafka
        </span>
        <span class="text-[#4a3a5e] text-xs font-mono tracking-widest ml-2 align-middle">5★</span>
      </a>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-1">
        <a v-for="l in links" :key="l.href" :href="l.href"
           class="px-4 py-2 text-xs tracking-[.3em] uppercase text-[#7a6090] hover:text-[#f1e8ff] transition-colors duration-200 relative group">
          {{ l.label }}
          <span class="absolute bottom-1.5 left-4 right-4 h-px bg-[#7c3aed] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </a>
      </nav>

      <!-- Faction tag -->
      <span class="hidden md:block text-[10px] tracking-[.4em] uppercase text-[#3d2d50] font-mono">
        Stellaron Hunters
      </span>

      <!-- Mobile toggle -->
      <button class="md:hidden text-[#7a6090] hover:text-[#f1e8ff] transition-colors p-1"
              @click="isOpen=!isOpen" aria-label="Menu">
        <div class="w-5 flex flex-col gap-1.5">
          <span class="h-px bg-current transition-all duration-300"
                :class="isOpen?'rotate-45 translate-y-2':''"></span>
          <span class="h-px bg-current transition-all duration-300"
                :class="isOpen?'opacity-0':''"></span>
          <span class="h-px bg-current transition-all duration-300"
                :class="isOpen?'-rotate-45 -translate-y-2':''"></span>
        </div>
      </button>
    </div>

    <!-- Mobile menu -->
    <div class="md:hidden overflow-hidden transition-all duration-300"
         :class="isOpen?'max-h-32 border-t border-[#2d1f4e]/40':'max-h-0'">
      <div class="bg-[#0d0818] px-8 py-4 flex flex-col gap-1">
        <a v-for="l in links" :key="l.href" :href="l.href"
           class="py-2 text-sm text-[#7a6090] hover:text-[#f1e8ff] tracking-[.3em] uppercase transition-colors"
           @click="isOpen=false">{{ l.label }}</a>
      </div>
    </div>
  </header>
</template>
