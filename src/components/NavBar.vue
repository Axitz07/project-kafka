<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)
const scrolled = ref(false)

function handleScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#profile', label: 'Profile' },
  { href: '#skills', label: 'Skills' },
]
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
       :class="scrolled
         ? 'border-b border-[#2d1f4e]/50 backdrop-blur-xl bg-[#03010a]/85'
         : 'bg-transparent'">
    <div class="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">

      <!-- Logo -->
      <a href="#hero" class="flex items-center gap-3 group">
        <span class="text-[#e879f9] text-xl leading-none"
              style="text-shadow: 0 0 20px rgba(232,121,249,0.7); font-family:'Georgia',serif">⚡</span>
        <div>
          <span class="text-[#f1e8ff] text-sm font-bold tracking-[0.15em] uppercase"
                style="font-family:'Georgia',serif">Kafka</span>
          <span class="text-[#2d1f4e] mx-2 text-xs">·</span>
          <span class="text-[#6b4f8a] text-[10px] tracking-[0.3em] uppercase font-mono">Fan Page</span>
        </div>
      </a>

      <!-- Desktop nav -->
      <ul class="hidden md:flex items-center gap-1">
        <li v-for="link in navLinks" :key="link.href">
          <a :href="link.href"
             class="px-4 py-2 text-xs text-[#6b4f8a] hover:text-[#c084fc] tracking-widest uppercase transition-colors duration-200 relative group font-mono">
            {{ link.label }}
            <span class="absolute bottom-1 left-4 right-4 h-px bg-[#7c3aed] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>
        </li>
      </ul>

      <!-- Element badge -->
      <div class="hidden md:flex items-center gap-2 px-3 py-1.5 border border-[#2d1f4e]/60 bg-[#130d22]/60 backdrop-blur-sm">
        <span class="text-[#e879f9] text-xs">⚡</span>
        <span class="text-[10px] text-[#a78bca] tracking-[0.3em] uppercase font-mono">Lightning</span>
        <span class="text-[#2d1f4e] text-xs mx-1">·</span>
        <span class="text-[10px] text-[#6b4f8a] tracking-[0.3em] uppercase font-mono">Nihility</span>
      </div>

      <!-- Mobile toggle -->
      <button class="md:hidden text-[#a78bca] hover:text-[#c084fc] p-1"
              @click="isMenuOpen = !isMenuOpen"
              aria-label="Toggle menu">
        <div class="w-5 flex flex-col gap-1.5">
          <span class="h-px bg-current transition-all duration-300"
                :class="isMenuOpen ? 'rotate-45 translate-y-2' : ''"></span>
          <span class="h-px bg-current transition-all duration-300"
                :class="isMenuOpen ? 'opacity-0' : ''"></span>
          <span class="h-px bg-current transition-all duration-300"
                :class="isMenuOpen ? '-rotate-45 -translate-y-2' : ''"></span>
        </div>
      </button>
    </div>

    <!-- Mobile menu -->
    <div class="md:hidden overflow-hidden transition-all duration-300"
         :class="isMenuOpen ? 'max-h-48 border-t border-[#2d1f4e]/50' : 'max-h-0'">
      <div class="bg-[#0d0818] px-8 py-4 flex flex-col gap-1">
        <a v-for="link in navLinks" :key="link.href"
           :href="link.href"
           class="py-2 text-sm text-[#6b4f8a] hover:text-[#c084fc] tracking-widest uppercase transition-colors font-mono"
           @click="isMenuOpen = false">
          {{ link.label }}
        </a>
      </div>
    </div>
  </nav>
</template>
