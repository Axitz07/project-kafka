<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { animate, createTimeline, stagger } from 'animejs'

const BASE    = import.meta.env.BASE_URL.replace(/\/$/, '')
const imgOk   = ref(false)
const px      = ref(0)
const py      = ref(0)
const ready   = ref(false)

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function onMove(e) {
  px.value = (e.clientX / window.innerWidth  - 0.5)
  py.value = (e.clientY / window.innerHeight - 0.5)
}

onMounted(() => {
  window.addEventListener('mousemove', onMove, { passive: true })
  setTimeout(() => {
    ready.value = true
    if (!prefersReduced) animateHero()
  }, 120)
})
onUnmounted(() => window.removeEventListener('mousemove', onMove))

function animateHero() {
  createTimeline({ ease: 'outExpo' })
    .add('.hero-eyebrow', { translateY: [-16, 0], opacity: [0, 1], duration: 700 })
    .add('.hero-name',    { translateY: [44, 0],  opacity: [0, 1], duration: 950 }, '-=500')
    .add('.hero-quote',   { translateY: [16, 0],  opacity: [0, 1], duration: 720 }, '-=650')
    .add('.hero-ctas',    { translateY: [12, 0],  opacity: [0, 1], duration: 600 }, '-=450')
    .add('.hero-stat',    {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 500,
      delay: stagger(90),
    }, '-=300')
}

/* parallax photo: deeper movement for drama */
const photoStyle = computed(() => ({
  transform: `translate(${px.value * -26}px,${py.value * -14}px) scale(1.08)`,
  transition: prefersReduced ? 'none' : 'transform 1.1s cubic-bezier(.25,.46,.45,.94)',
}))

/* parallax content: subtle counter-move */
const layerStyle = computed(() => ({
  transform: prefersReduced ? 'none' : `translate(${px.value * 9}px,${py.value * 5}px)`,
  transition: prefersReduced ? 'none' : 'transform 1.3s cubic-bezier(.25,.46,.45,.94)',
}))
</script>

<template>
  <section id="hero" class="relative w-full overflow-hidden" style="min-height:100dvh;background:var(--color-void);">

    <!-- Photo layer — right bleed, desktop only -->
    <div class="absolute inset-0 hidden lg:block" :style="photoStyle">
      <img
        :src="`${BASE}/assets/kafka/kafka-1.jpg`"
        alt="Kafka — Stellaron Hunter"
        width="1400"
        height="900"
        fetchpriority="high"
        loading="eager"
        @load="imgOk = true"
        class="absolute right-0 top-0 h-full w-[58%] object-cover object-[35%_top]
               transition-opacity duration-1000"
        :class="imgOk ? 'opacity-100' : 'opacity-0'"
        style="filter:brightness(.48) saturate(.72) contrast(1.08);"
      />
      <!-- left fade -->
      <div class="absolute right-0 top-0 h-full w-[58%]"
           style="background:linear-gradient(to right,var(--color-void) 0%,var(--color-void) 6%,rgba(5,3,10,.45) 30%,transparent 58%);" />
      <!-- bottom fade -->
      <div class="absolute right-0 top-0 h-full w-[58%]"
           style="background:linear-gradient(to top,var(--color-void) 0%,transparent 38%);" />
    </div>

    <!-- Mobile bg -->
    <div class="absolute inset-0 lg:hidden">
      <img
        :src="`${BASE}/assets/kafka/kafka-1.jpg`"
        alt=""
        aria-hidden="true"
        width="800"
        height="1000"
        fetchpriority="high"
        loading="eager"
        class="w-full h-full object-cover object-[60%_top]"
        style="filter:brightness(.13) saturate(.38);"
      />
      <div class="absolute inset-0"
           style="background:linear-gradient(to top,var(--color-void) 0%,rgba(5,3,10,.68) 52%,transparent 100%);" />
    </div>

    <!-- Atmospheric glows -->
    <div class="absolute top-0 left-0 w-[50%] h-[65%] pointer-events-none"
         style="background:radial-gradient(ellipse at 18% 18%,rgba(90,30,170,.09) 0%,transparent 62%);filter:blur(90px);" />
    <div class="absolute bottom-0 left-[10%] w-[45%] h-[40%] pointer-events-none"
         style="background:radial-gradient(ellipse at center,rgba(124,58,237,.06) 0%,transparent 68%);filter:blur(70px);" />

    <!-- Lightning bolts -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div class="lightning-bolt" style="left:61%;animation-delay:0s;animation-duration:12s;" />
      <div class="lightning-bolt" style="left:72%;animation-delay:5.3s;animation-duration:9s;" />
      <div class="lightning-bolt" style="left:41%;animation-delay:8.1s;animation-duration:14s;" />
    </div>

    <!-- Content — bottom anchored, left aligned -->
    <div
      class="relative z-10 flex flex-col justify-end
             px-8 md:px-14 lg:px-24 pb-16 md:pb-20 pt-28"
      style="min-height:100dvh;"
      :style="layerStyle"
    >
      <div class="max-w-lg" :class="ready ? '' : 'opacity-0'">

        <!-- Eyebrow -->
        <div class="hero-eyebrow flex items-center gap-3 mb-6">
          <div class="w-6 h-px" style="background:linear-gradient(to right,var(--color-purple),transparent);" />
          <span class="text-[10px] tracking-[.38em] uppercase font-mono"
                style="color:var(--color-purple-bright);">Stellaron Hunter</span>
        </div>

        <!-- Name -->
        <h1
          class="hero-name leading-none tracking-tight mb-5"
          style="font-family:'Cormorant Garamond',Georgia,serif;
                 font-size:clamp(4.5rem,10vw,8.5rem);
                 letter-spacing:-.03em;
                 color:var(--color-text-primary);
                 text-shadow:0 0 80px rgba(124,58,237,.18);"
        >Kafka</h1>

        <!-- Quote -->
        <p
          class="hero-quote mb-10 leading-relaxed"
          style="font-family:'Cormorant Garamond',Georgia,serif;
                 font-style:italic;
                 font-size:clamp(.95rem,1.8vw,1.1rem);
                 color:var(--color-text-secondary);
                 max-width:36ch;"
        >"The stars don't care about your feelings. Neither do I."</p>

        <!-- CTAs -->
        <div class="hero-ctas flex items-center gap-6">
          <a
            href="#profile"
            class="group flex items-center gap-3 px-6 py-3 rounded-full text-[12px] font-mono
                   tracking-[.2em] uppercase transition-all duration-500
                   hover:shadow-[0_0_32px_rgba(124,58,237,.35)] active:scale-[.98]"
            style="background:var(--color-purple);color:var(--color-text-primary);
                   box-shadow:0 0 20px rgba(124,58,237,.2);"
          >
            <span>Character</span>
            <span class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0
                         transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px"
                  style="background:rgba(255,255,255,.15);">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                <path d="M1.5 6.5L6.5 1.5M6.5 1.5H2.5M6.5 1.5V5.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </a>
          <a
            href="#skills"
            class="text-[11px] tracking-[.28em] uppercase font-mono
                   transition-colors duration-300 nav-link pb-0.5"
            style="color:var(--color-text-dim);"
            onmouseover="this.style.color='var(--color-text-muted)'"
            onmouseout="this.style.color='var(--color-text-dim)'"
          >Build Guide</a>
        </div>

      </div>

      <!-- Bottom-right stats card — double-bezel -->
      <div
        class="absolute bottom-8 right-8 md:right-14 lg:right-24 hidden md:block"
        style="padding:3px;border-radius:14px;
               background:rgba(45,31,78,.18);
               border:1px solid rgba(45,31,78,.35);"
      >
        <div
          class="flex items-stretch gap-0 overflow-hidden"
          style="border-radius:11px;
                 background:rgba(5,3,10,.75);
                 backdrop-filter:blur(20px);
                 box-shadow:inset 0 1px 0 rgba(255,255,255,.05);"
        >
          <div
            v-for="(item, idx) in [
              { label: 'Element',  value: 'Lightning', color: 'var(--color-purple-glow)' },
              { label: 'Path',     value: 'Nihility',  color: 'var(--color-text-secondary)' },
              { label: 'Rarity',   value: '5 ★',       color: 'var(--color-gold)' },
            ]"
            :key="idx"
            class="hero-stat px-5 py-3.5 flex flex-col gap-1"
            :style="idx < 2 ? 'border-right:1px solid rgba(26,16,48,.8);' : ''"
          >
            <span class="text-[9px] tracking-[.35em] uppercase font-mono"
                  style="color:var(--color-text-dim);">{{ item.label }}</span>
            <span class="text-[12px] font-mono font-medium" :style="{ color: item.color }">
              {{ item.value }}
            </span>
          </div>
        </div>
      </div>

    </div>

    <!-- Bottom fade -->
    <div class="absolute bottom-0 inset-x-0 h-28 pointer-events-none"
         style="background:linear-gradient(to top,var(--color-void) 0%,transparent 100%);" />

  </section>
</template>

<style scoped>
.lightning-bolt {
  position: absolute;
  top: -5%;
  width: 1px;
  height: 30%;
  background: linear-gradient(to bottom, transparent, rgba(196,90,252,.5), transparent);
  opacity: 0;
  animation: lightning linear infinite;
}

@keyframes lightning {
  0%,82%,100% { opacity:0; transform:scaleY(.4) translateY(-15%); }
  83%,85%     { opacity:.9; transform:scaleY(1) translateY(0); }
  86%         { opacity:.08; transform:scaleY(.9) translateY(4%); }
  87%,89%     { opacity:.7; transform:scaleY(1.03) translateY(0); }
  90%,100%    { opacity:0; transform:scaleY(.5) translateY(8%); }
}
</style>
