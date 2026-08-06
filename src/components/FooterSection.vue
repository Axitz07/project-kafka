<script setup>
import { ref, onMounted } from 'vue'
import { kafka } from '../data/kafka.js'
import { animate, stagger } from 'animejs'

const footerEl = ref(null)
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return
    if (!prefersReduced) {
      requestAnimationFrame(() => {
        animate('.footer-identity', {
          opacity: [0, 1], translateY: [20, 0], duration: 700, ease: 'outQuart',
        })
        animate('.footer-nav-link', {
          opacity: [0, 1], translateY: [10, 0], duration: 500,
          delay: stagger(55), ease: 'outCubic',
        })
        animate('.footer-stat-item', {
          opacity: [0, 1], translateY: [10, 0], duration: 500,
          delay: stagger(60, { start: 100 }), ease: 'outCubic',
        })
        animate('.footer-bottom', {
          opacity: [0, 1], translateY: [6, 0], duration: 400, delay: 400, ease: 'outCubic',
        })
      })
    }
    io.disconnect()
  }, { threshold: 0.1 })
  if (footerEl.value) io.observe(footerEl.value)
})
</script>

<template>
  <footer ref="footerEl" class="relative overflow-hidden" style="background:var(--color-void);border-top:1px solid rgba(26,16,48,.7);">

    <!-- Subtle purple glow -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[55%] h-28 pointer-events-none"
         style="background:radial-gradient(ellipse at center,rgba(90,30,160,.05) 0%,transparent 70%);filter:blur(40px);" />

    <div class="relative max-w-6xl mx-auto px-8 md:px-14 lg:px-20">

      <!-- Main grid -->
      <div class="grid md:grid-cols-[1fr_auto_auto] gap-10 md:gap-16 py-16 md:py-20">

        <!-- Identity -->
        <div class="footer-identity anim-hidden max-w-xs">
          <h3
            class="font-semibold leading-none mb-2"
            style="font-family:'Cormorant Garamond',Georgia,serif;
                   font-size:1.75rem;letter-spacing:-.025em;
                   color:var(--color-text-primary);"
          >{{ kafka.name }}</h3>
          <p class="text-[10px] font-mono tracking-[.4em] uppercase mb-5"
             style="color:var(--color-text-dim);">
            {{ kafka.faction }}
          </p>
          <p class="text-[12px] leading-[1.75]" style="color:var(--color-text-dim);">
            Halaman dedikasi untuk Kafka dari Honkai: Star Rail.
            Profil karakter, analisis kit, dan panduan build.
          </p>
        </div>

        <!-- Nav -->
        <div class="flex flex-col gap-3">
          <p class="text-[9px] tracking-[.52em] uppercase font-mono mb-2"
             style="color:rgba(45,31,78,.8);">Navigate</p>
          <a
            v-for="l in [
              { href: '#hero',    label: 'Home'      },
              { href: '#profile', label: 'Character' },
              { href: '#skills',  label: 'Build'     },
            ]"
            :key="l.href"
            :href="l.href"
            class="footer-nav-link anim-hidden nav-link text-[12px] font-mono tracking-wide
                   transition-colors duration-200 pb-0.5"
            style="color:var(--color-text-dim);"
            onmouseover="this.style.color='var(--color-purple-glow)'"
            onmouseout="this.style.color='var(--color-text-dim)'"
          >{{ l.label }}</a>
        </div>

        <!-- Stats -->
        <div class="flex flex-col gap-3">
          <p class="text-[9px] tracking-[.52em] uppercase font-mono mb-2"
             style="color:rgba(45,31,78,.8);">Quick Ref</p>

          <div class="footer-stat-item anim-hidden">
            <p class="text-[9px] text-(--color-text-dim) tracking-[.35em] uppercase font-mono mb-1">
              Element
            </p>
            <p class="text-[12px] font-mono" style="color:var(--color-purple-glow);">
              {{ kafka.element }}
            </p>
          </div>

          <div class="footer-stat-item anim-hidden">
            <p class="text-[9px] text-(--color-text-dim) tracking-[.35em] uppercase font-mono mb-1">
              Path
            </p>
            <p class="text-[12px] font-mono" style="color:var(--color-text-secondary);">
              {{ kafka.path }}
            </p>
          </div>

          <div class="footer-stat-item anim-hidden">
            <p class="text-[9px] text-(--color-text-dim) tracking-[.35em] uppercase font-mono mb-0.5">
              Rarity
            </p>
            <div class="flex gap-0.5">
              <span
                v-for="i in kafka.rarity"
                :key="i"
                class="text-[11px]"
                style="color:var(--color-gold);"
              >&#9733;</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom bar -->
      <div
        class="footer-bottom anim-hidden py-6 flex flex-col md:flex-row items-start
               md:items-center justify-between gap-3"
        style="border-top:1px solid rgba(26,16,48,.7);"
      >
        <div class="flex items-center gap-2">
          <span
            class="text-[10px] font-mono tracking-widest"
            style="color:var(--color-text-dim);"
          >{{ kafka.element }} &middot; {{ kafka.path }}</span>
        </div>
        <p class="text-[10px] font-mono" style="color:var(--color-text-dim);">
          Honkai: Star Rail &copy; HoYoverse - Fan-made, not affiliated.
        </p>
      </div>

    </div>
  </footer>
</template>
