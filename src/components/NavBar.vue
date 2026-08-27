<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { animate, stagger } from 'animejs'

const scrolled = ref(false)
const isOpen   = ref(false)
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function onScroll() { scrolled.value = window.scrollY > 40 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

function openMenu() {
  isOpen.value = true
  if (!prefersReduced) {
    requestAnimationFrame(() => {
      animate('.mobile-link', {
        opacity: [0, 1], translateY: [8, 0],
        duration: 320, delay: stagger(50), ease: 'outQuart',
      })
    })
  }
}

function closeMenu() { isOpen.value = false }

const links = [
  { href: '#profile', label: 'Character' },
  { href: '#skills',  label: 'Build Guide' },
]
</script>

<template>
  <header class="fixed top-0 inset-x-0 z-50">
    <!-- Main bar -->
    <div
      class="flex items-center justify-between px-6 md:px-10 h-14
             transition-all duration-500"
      :style="scrolled
        ? 'background:rgba(5,3,10,0.92);border-bottom:1px solid rgba(34,23,64,0.7);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);'
        : 'background:transparent;border-bottom:1px solid transparent;'"
    >
      <!-- Wordmark -->
      <a href="#hero" class="select-none group flex items-baseline gap-2">
        <span
          class="text-(--color-text-primary) font-light tracking-widest uppercase
                 text-[13px] font-mono group-hover:text-(--color-purple-glow)
                 transition-colors duration-300"
        >KAFKA</span>
        <span
          class="text-[11px] font-mono tracking-[.15em] opacity-40"
          style="color:var(--color-purple-glow);"
        >5★</span>
      </a>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-8">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="nav-link text-[12px] tracking-[.3em] uppercase font-mono
                 transition-colors duration-300"
          style="color:var(--color-text-muted);"
          @mouseenter="(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')"
          @mouseleave="(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')"
        >{{ l.label }}</a>
      </nav>

      <!-- Mobile toggle -->
      <button
        class="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 group"
        :aria-label="isOpen ? 'Close menu' : 'Open menu'"
        @click="isOpen ? closeMenu() : openMenu()"
      >
        <span
          class="block h-px w-5 ml-auto transition-all duration-300"
          :style="isOpen
            ? 'background:var(--color-text-secondary);transform:translateY(7px) rotate(45deg);width:20px;'
            : 'background:var(--color-text-muted);'"
        />
        <span
          class="block h-px w-3 ml-auto transition-all duration-300"
          :style="isOpen
            ? 'opacity:0;'
            : 'background:var(--color-text-muted);'"
        />
        <span
          class="block h-px w-5 ml-auto transition-all duration-300"
          :style="isOpen
            ? 'background:var(--color-text-secondary);transform:translateY(-7px) rotate(-45deg);width:20px;'
            : 'background:var(--color-text-muted);'"
        />
      </button>
    </div>

    <!-- Mobile menu -->
    <transition name="mobile-menu">
      <div
        v-if="isOpen"
        class="md:hidden px-6 pb-8 pt-4"
        style="background:rgba(5,3,10,0.97);border-bottom:1px solid rgba(34,23,64,0.6);backdrop-filter:blur(20px);"
      >
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="mobile-link flex items-center justify-between py-4 text-[11px]
                 tracking-[.3em] uppercase font-mono border-b last:border-0
                 transition-colors duration-200"
          style="color:var(--color-text-muted);border-color:rgba(34,23,64,0.5);"
          @click="closeMenu()"
          @mouseenter="(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')"
          @mouseleave="(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')"
        >
          <span>{{ l.label }}</span>
          <span class="text-[8px] tracking-widest" style="color:var(--color-text-dim);">›</span>
        </a>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.mobile-menu-enter-active {
  transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.mobile-menu-leave-active {
  transition: opacity 0.15s ease, transform 0.18s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
