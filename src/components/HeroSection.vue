<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { createTimeline, stagger } from 'animejs'

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
const imgOk = ref(false)
const px    = ref(0)
const py    = ref(0)

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function onMove(e) {
  px.value = (e.clientX / window.innerWidth  - 0.5)
  py.value = (e.clientY / window.innerHeight - 0.5)
}

onMounted(() => {
  window.addEventListener('mousemove', onMove, { passive: true })
  setTimeout(() => {
    if (!prefersReduced) animateHero()
  }, 80)
})
onUnmounted(() => window.removeEventListener('mousemove', onMove))

function animateHero() {
  createTimeline({ ease: 'outExpo' })
    .add('.hero-eyebrow', { translateY: [-12, 0], opacity: [0, 1], duration: 600 })
    .add('.hero-name',    { translateY: [60, 0],  opacity: [0, 1], duration: 1000 }, '-=400')
    .add('.hero-line',    { scaleX:  [0, 1],      opacity: [0, 1], duration: 700  }, '-=700')
    .add('.hero-quote',   { translateY: [14, 0],  opacity: [0, 1], duration: 650  }, '-=500')
    .add('.hero-ctas',    { translateY: [10, 0],  opacity: [0, 1], duration: 500  }, '-=400')
    .add('.ticker-wrap',  { opacity: [0, 1], duration: 800 }, '-=200')
}

const photoStyle = computed(() => ({
  transform: `translate(${px.value * -22}px, ${py.value * -12}px) scale(1.06)`,
  transition: prefersReduced ? 'none' : 'transform 1.2s cubic-bezier(.25,.46,.45,.94)',
}))

const contentStyle = computed(() => ({
  transform: prefersReduced ? 'none' : `translate(${px.value * 7}px, ${py.value * 4}px)`,
  transition: prefersReduced ? 'none' : 'transform 1.4s cubic-bezier(.25,.46,.45,.94)',
}))

const tickerItems = [
  { label: 'ELEMENT', value: 'Lightning' },
  { label: 'PATH',    value: 'The Nihility' },
  { label: 'RARITY',  value: '5★' },
  { label: 'FACTION', value: 'Stellaron Hunters' },
  { label: 'ROLE',    value: 'DoT Amplifier' },
  { label: 'ELEMENT', value: 'Lightning' },
  { label: 'PATH',    value: 'The Nihility' },
  { label: 'RARITY',  value: '5★' },
  { label: 'FACTION', value: 'Stellaron Hunters' },
  { label: 'ROLE',    value: 'DoT Amplifier' },
]
</script>

<template>
  <section
    id="hero"
    class="relative w-full overflow-hidden"
    style="min-height:100dvh;background:var(--color-void);"
  >

    <!-- Full-bleed photo -->
    <div class="absolute inset-0" :style="photoStyle">
      <img
        :src="`${BASE}/assets/kafka/kafka-1.jpg`"
        alt="Kafka — Stellaron Hunter"
        width="1920" height="1080"
        loading="eager"
        fetchpriority="high"
        class="w-full h-full object-cover object-center"
        :class="imgOk ? 'opacity-100' : 'opacity-0'"
        style="transition:opacity .6s ease;"
        @load="imgOk = true"
      />
      <!-- Gradient overlays -->
      <div class="absolute inset-0"
           style="background:linear-gradient(to right,rgba(5,3,10,.92) 0%,rgba(5,3,10,.55) 45%,rgba(5,3,10,.15) 100%);" />
      <div class="absolute inset-0"
           style="background:linear-gradient(to top,rgba(5,3,10,1) 0%,transparent 40%);" />
      <div class="absolute inset-0"
           style="background:linear-gradient(to bottom,rgba(5,3,10,.6) 0%,transparent 20%);" />
    </div>

    <!-- Content -->
    <div
      class="relative flex flex-col justify-end min-h-[100dvh] pb-0"
      :style="contentStyle"
    >
      <div class="px-8 md:px-16 lg:px-24 xl:px-32 pb-20 md:pb-28 max-w-2xl">

        <!-- Eyebrow -->
        <p
          class="hero-eyebrow anim-hidden text-[9px] font-mono tracking-[.5em] uppercase mb-8"
          style="color:var(--color-text-dim);"
        >Stellaron Hunter &nbsp;/&nbsp; 5★</p>

        <!-- Name -->
        <h1
          class="hero-name anim-hidden leading-none mb-4"
          style="font-family:var(--font-display);font-size:clamp(5rem,14vw,11rem);font-weight:300;letter-spacing:-0.03em;color:var(--color-text-primary);"
        >Kafka</h1>

        <!-- Thin rule -->
        <div
          class="hero-line anim-hidden mb-7 origin-left"
          style="height:1px;width:4rem;background:var(--color-purple);opacity:.7;"
        />

        <!-- Quote -->
        <p
          class="hero-quote anim-hidden text-[14px] md:text-[15px] leading-[1.7] mb-10 max-w-sm"
          style="color:var(--color-text-muted);font-style:italic;"
        >"The stars don't care about your feelings. Neither do I."</p>

        <!-- CTAs -->
        <div class="hero-ctas anim-hidden flex items-center gap-6">
          <a
            href="#profile"
            class="text-[10px] font-mono tracking-[.35em] uppercase px-6 py-3
                   transition-all duration-300 hover:opacity-80"
            style="background:var(--color-purple);color:var(--color-text-primary);"
          >Character</a>
          <a
            href="#skills"
            class="text-[10px] font-mono tracking-[.35em] uppercase px-6 py-3
                   border transition-all duration-300 hover:opacity-80"
            style="border-color:rgba(124,58,237,.4);color:var(--color-text-secondary);"
          >Build Guide</a>
        </div>
      </div>

      <!-- Ticker tape -->
      <div
        class="ticker-wrap anim-hidden relative border-t border-b py-3"
        style="border-color:rgba(34,23,64,.6);"
      >
        <div class="ticker-track">
          <span
            v-for="(item, i) in tickerItems"
            :key="i"
            class="inline-flex items-center gap-4 mr-12"
          >
            <span class="text-[8px] font-mono tracking-[.4em] uppercase"
                  style="color:var(--color-text-dim);">{{ item.label }}</span>
            <span class="text-[10px] font-mono tracking-widest"
                  style="color:var(--color-text-secondary);">{{ item.value }}</span>
            <span style="color:var(--color-text-dim);font-size:8px;">·</span>
          </span>
        </div>
      </div>
    </div>

  </section>
</template>
