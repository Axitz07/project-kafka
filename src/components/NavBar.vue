<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import { animate, stagger } from 'animejs'

const scrolled = ref(false)
const isOpen   = ref(false)

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function onScroll() { scrolled.value = window.scrollY > 60 }

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

function openMenu() {
  isOpen.value = true
  if (!prefersReduced) {
    requestAnimationFrame(() => {
      animate('.mobile-link', {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 380,
        delay: stagger(60),
        ease: 'outQuart',
      })
    })
  }
}

function closeMenu() {
  isOpen.value = false
}

const links = [
  { href: '#profile', label: 'Character' },
  { href: '#skills',  label: 'Build Guide' },
]
</script>

<template>
  <header class="fixed top-0 inset-x-0 z-50 px-5 pt-5">
    <div
      class="max-w-6xl mx-auto flex items-center justify-between h-11 px-5 rounded-full
             transition-all duration-700"
      :class="scrolled
        ? 'border border-(--color-border)/50 backdrop-blur-2xl'
        : 'border border-transparent'"
      :style="scrolled
        ? 'background:rgba(5,3,10,0.88);box-shadow:0 4px 40px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.04);'
        : ''"
    >
      <!-- Wordmark -->
      <a href="#hero" class="flex items-baseline gap-2 select-none group">
        <span
          class="text-(--color-text-primary) font-semibold group-hover:text-white
                 transition-colors duration-300"
          style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.2rem;letter-spacing:-.01em;"
        >Kafka</span>
        <span class="text-(--color-purple) text-[10px] font-mono tracking-[.2em] opacity-70">5★</span>
      </a>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-7">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="nav-link text-[11px] tracking-[.28em] uppercase text-(--color-text-dim)
                 hover:text-(--color-purple-glow) transition-colors duration-300 font-mono pb-0.5"
        >{{ l.label }}</a>
      </nav>

      <!-- Element badge desktop -->
      <div class="hidden md:flex items-center gap-2 px-3 py-1 rounded-full"
           style="border:1px solid rgba(45,31,78,.35);background:rgba(19,13,34,.5);">
        <span
          class="text-[9px] tracking-[.35em] uppercase text-(--color-text-dim) font-mono"
        >Nihility</span>
      </div>

      <!-- Mobile toggle -->
      <button
        class="md:hidden text-(--color-text-muted) hover:text-(--color-text-primary) transition-colors p-1
               active:scale-95"
        style="transition:transform .15s cubic-bezier(.16,1,.3,1),color .2s;"
        @click="isOpen ? closeMenu() : openMenu()"
        aria-label="Menu"
        :aria-expanded="isOpen"
      >
        <!-- Morph X / hamburger via CSS transform -->
        <div class="relative w-4 h-4">
          <span
            class="absolute left-0 w-4 h-px rounded-full bg-current transition-all duration-300"
            :style="isOpen
              ? 'top:50%;transform:translateY(-50%) rotate(45deg)'
              : 'top:30%;transform:none'"
          />
          <span
            class="absolute left-0 w-4 h-px rounded-full bg-current transition-all duration-300"
            :style="isOpen
              ? 'top:50%;transform:translateY(-50%) rotate(-45deg)'
              : 'top:70%;transform:none'"
          />
        </div>
      </button>
    </div>

    <!-- Mobile dropdown -->
    <transition name="mobile-menu">
      <div
        v-if="isOpen"
        class="mt-2 max-w-6xl mx-auto rounded-2xl border border-(--color-border)/35
               px-6 py-5 flex flex-col gap-0 overflow-hidden"
        style="background:rgba(5,3,10,0.96);backdrop-filter:blur(24px);
               box-shadow:0 20px 60px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.04);"
      >
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="mobile-link py-3.5 text-[13px] text-(--color-text-muted) hover:text-(--color-text-primary)
                 border-b border-(--color-surface) last:border-0 transition-colors duration-200
                 font-mono tracking-wider flex items-center justify-between group"
          @click="closeMenu()"
        >
          <span>{{ l.label }}</span>
          <span class="text-(--color-border) group-hover:text-(--color-purple-glow)
                       transition-colors duration-200 text-[10px] font-mono">&rsaquo;</span>
        </a>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.mobile-menu-enter-active {
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.mobile-menu-leave-active {
  transition: opacity 0.18s ease, transform 0.2s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}
</style>
