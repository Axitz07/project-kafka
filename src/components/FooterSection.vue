<script setup>
import { ref, onMounted } from 'vue'
import { kafka } from '../data/kafka.js'
import { animate, stagger } from 'animejs'

const footerEl   = ref(null)
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return
    if (!prefersReduced) {
      requestAnimationFrame(() => {
        animate('.ft-id',   { opacity: [0,1], translateY: [16,0], duration: 600, ease: 'outQuart' })
        animate('.ft-link', { opacity: [0,1], translateY: [8,0],  duration: 440, delay: stagger(45), ease: 'outCubic' })
        animate('.ft-stat', { opacity: [0,1], translateY: [8,0],  duration: 440, delay: stagger(50, { start: 80 }), ease: 'outCubic' })
        animate('.ft-bar',  { opacity: [0,1], translateY: [6,0],  duration: 360, delay: 380, ease: 'outCubic' })
      })
    }
    io.disconnect()
  }, { threshold: 0.1 })
  if (footerEl.value) io.observe(footerEl.value)
})
</script>

<template>
  <footer ref="footerEl" class="relative overflow-hidden"
          style="background:var(--color-void);">

    <!-- Ambient glow -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40%] h-24 pointer-events-none"
         style="background:radial-gradient(ellipse at center,rgba(124,58,237,.04) 0%,transparent 70%);filter:blur(32px);" />

    <div class="relative max-w-7xl mx-auto px-8 md:px-12 xl:px-16">

      <!-- Main grid -->
      <div class="grid md:grid-cols-[1fr_auto_auto] gap-10 md:gap-20 py-16 md:py-20">

        <!-- Identity -->
        <div class="ft-id anim-hidden">
          <h3 class="leading-none mb-1"
              style="font-family:var(--font-display);font-size:2.4rem;font-weight:300;letter-spacing:-.025em;color:var(--color-text-primary);">
            {{ kafka.name }}
          </h3>
          <p class="text-[11px] font-mono tracking-[.45em] uppercase mb-4"
             style="color:var(--color-text-dim);">{{ kafka.faction }}</p>
          <p class="text-[13px] leading-[1.7] max-w-[240px]"
             style="color:var(--color-text-muted);">
            Halaman dedikasi untuk {{ kafka.name }} dari Honkai: Star Rail.
            Profil karakter, analisis kit, dan panduan build.
          </p>
        </div>

        <!-- Navigate -->
        <div>
          <p class="ft-link anim-hidden text-[11px] font-mono tracking-[.45em] uppercase mb-5"
             style="color:var(--color-text-dim);">Navigate</p>
          <nav class="flex flex-col gap-3">
            <a
              v-for="l in [{ href:'#hero', label:'Home' },{ href:'#profile', label:'Character' },{ href:'#skills', label:'Build' }]"
              :key="l.href"
              :href="l.href"
              class="ft-link anim-hidden text-[13px] font-mono tracking-wide transition-colors duration-200"
              style="color:var(--color-text-muted);"
              @mouseenter="(e) => (e.target.style.color = 'var(--color-text-secondary)')"
              @mouseleave="(e) => (e.target.style.color = 'var(--color-text-muted)')"
            >{{ l.label }}</a>
          </nav>
        </div>

        <!-- Quick ref -->
        <div>
          <p class="ft-stat anim-hidden text-[11px] font-mono tracking-[.45em] uppercase mb-5"
             style="color:var(--color-text-dim);">Quick Ref</p>
          <div class="flex flex-col gap-3">
            <div
              v-for="item in [
                { label:'Element', value: kafka.element },
                { label:'Path',    value: kafka.path },
                { label:'Rarity',  value: kafka.rarity + '★' },
              ]"
              :key="item.label"
              class="ft-stat anim-hidden"
            >
              <p class="text-[10px] font-mono tracking-[.3em] uppercase mb-0.5"
                 style="color:var(--color-text-dim);">{{ item.label }}</p>
              <p class="text-[13px] font-mono"
                 style="color:var(--color-text-secondary);">{{ item.value }}</p>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom bar -->
      <div
        class="ft-bar anim-hidden py-5 flex flex-col md:flex-row items-start md:items-center
               justify-between gap-3"
        style="border-top:1px solid rgba(34,23,64,.5);"
      >
        <span class="text-[11px] font-mono tracking-widest"
              style="color:var(--color-text-dim);">
          {{ kafka.element }} &middot; {{ kafka.path }}
        </span>
        <p class="text-[11px] font-mono" style="color:var(--color-text-dim);">
          Honkai: Star Rail &copy; HoYoverse &mdash; Fan-made, not affiliated.
        </p>
      </div>

    </div>
  </footer>
</template>
