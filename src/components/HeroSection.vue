<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { createTimeline } from 'animejs'

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
  setTimeout(() => { if (!prefersReduced) animateHero() }, 120)
})
onUnmounted(() => window.removeEventListener('mousemove', onMove))

function animateHero() {
  createTimeline({ ease: 'outExpo' })
    .add('.hero-meta',  { translateY: [-8, 0],  opacity: [0, 1], duration: 500 })
    .add('.hero-name',  { translateY: [48, 0],  opacity: [0, 1], duration: 1100 }, '-=300')
    .add('.hero-rule',  { scaleX: [0, 1],       opacity: [0, 1], duration: 600  }, '-=800')
    .add('.hero-quote', { translateY: [12, 0],  opacity: [0, 1], duration: 700  }, '-=500')
    .add('.hero-cta',   { translateY: [8, 0],   opacity: [0, 1], duration: 500  }, '-=450')
    .add('.hero-coord', { opacity: [0, 1],       duration: 600  }, '-=200')
}

/* Artwork parallax — deeper layer moves more */
const photoStyle = computed(() => ({
  transform: `translate(${px.value * -18}px, ${py.value * -10}px) scale(1.05)`,
  transition: prefersReduced ? 'none' : 'transform 1.4s cubic-bezier(.25,.46,.45,.94)',
}))

/* Content counter-parallax — subtle */
const contentStyle = computed(() => ({
  transform: prefersReduced ? 'none' : `translate(${px.value * 5}px, ${py.value * 3}px)`,
  transition: prefersReduced ? 'none' : 'transform 1.6s cubic-bezier(.25,.46,.45,.94)',
}))
</script>

<template>
  <section
    id="hero"
    class="relative w-full overflow-hidden"
    style="min-height:100dvh;background:#09070b;"
  >

    <!-- ── Artwork layer ────────────────────────────────────────── -->
    <div class="absolute inset-0" :style="photoStyle">
      <img
        :src="`${BASE}/assets/kafka/kafka-1.jpg`"
        alt="Kafka — Stellaron Hunter"
        width="1920" height="1080"
        loading="eager"
        fetchpriority="high"
        class="w-full h-full object-cover object-center"
        :class="imgOk ? 'opacity-100' : 'opacity-0'"
        style="transition:opacity .8s ease;"
        @load="imgOk = true"
      />

      <!-- Layered overlay: left dark → center medium → right transparent -->
      <div
        class="absolute inset-0"
        style="background:linear-gradient(90deg,
          rgba(9,7,11,.95) 0%,
          rgba(9,7,11,.78) 30%,
          rgba(9,7,11,.38) 58%,
          rgba(9,7,11,.06) 100%);"
      />
      <!-- Bottom fade for ticker -->
      <div
        class="absolute inset-0"
        style="background:linear-gradient(to top,rgba(9,7,11,1) 0%,rgba(9,7,11,.3) 18%,transparent 38%);"
      />
      <!-- Top vignette subtle -->
      <div
        class="absolute inset-0"
        style="background:linear-gradient(to bottom,rgba(9,7,11,.55) 0%,transparent 16%);"
      />
    </div>

    <!-- ── Content ──────────────────────────────────────────────── -->
    <div
      class="relative flex flex-col min-h-[100dvh]"
      :style="contentStyle"
    >

      <!-- Main content — left-anchored, vertically centered-low -->
      <div class="flex-1 flex items-end pb-[8vh] md:pb-[12vh]">
        <div class="px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 w-full max-w-[520px]">

          <!-- Dossier metadata label -->
          <div class="hero-meta mb-8" style="opacity:0;">
            <p
              class="text-[8px] font-mono tracking-[.55em] uppercase mb-1.5"
              style="color:rgba(181,138,166,.55);"
            >Stellaron Hunter</p>
            <p
              class="text-[8px] font-mono tracking-[.4em] uppercase"
              style="color:rgba(255,255,255,.18);"
            >No. 05</p>
          </div>

          <!-- Name — dominant typographic element -->
          <h1
            class="hero-name leading-[0.88] mb-5"
            style="
              font-family:'Cormorant Garamond','Georgia',serif;
              font-size:clamp(4.5rem,12vw,9.5rem);
              font-weight:300;
              letter-spacing:-0.03em;
              color:#f1eaf0;
              opacity:0;
            "
          >Kafka</h1>

          <!-- Thin rule — visual pause between name and quote -->
          <div
            class="hero-rule mb-6 origin-left"
            style="height:1px;width:3rem;background:rgba(181,138,166,.5);opacity:0;"
          />

          <!-- Quote — muted, italic, supporting -->
          <p
            class="hero-quote text-[13px] md:text-[14px] leading-[1.75] mb-9 max-w-[380px]"
            style="
              color:rgba(141,129,139,.8);
              font-style:italic;
              font-family:'Cormorant Garamond','Georgia',serif;
              opacity:0;
            "
          >"The stars don't care about your feelings. Neither do I."</p>

          <!-- Primary CTA — minimal, single action -->
          <a
            href="#profile"
            class="hero-cta inline-flex items-center gap-3 group"
            style="opacity:0;"
          >
            <span
              class="text-[9px] font-mono tracking-[.4em] uppercase px-5 py-2.5
                     border transition-all duration-400"
              style="
                border-color:rgba(255,255,255,.14);
                color:rgba(241,234,240,.7);
                background:rgba(255,255,255,.03);
              "
              @mouseenter="(e) => {
                e.currentTarget.style.borderColor = 'rgba(181,138,166,.5)';
                e.currentTarget.style.color = '#f1eaf0';
                e.currentTarget.style.background = 'rgba(181,138,166,.06)';
              }"
              @mouseleave="(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.14)';
                e.currentTarget.style.color = 'rgba(241,234,240,.7)';
                e.currentTarget.style.background = 'rgba(255,255,255,.03)';
              }"
            >Explore Character</span>
            <span
              class="text-[11px] font-mono transition-transform duration-300
                     group-hover:translate-x-1"
              style="color:rgba(181,138,166,.6);"
            >→</span>
          </a>

        </div>
      </div>

      <!-- Coordinate detail — bottom left, editorial decoration -->
      <div
        class="hero-coord absolute bottom-[10vh] right-8 md:right-12 hidden lg:block"
        style="opacity:0;"
      >
        <p class="text-[7px] font-mono tracking-[.4em] uppercase text-right mb-1"
           style="color:rgba(255,255,255,.1);">Stellaron Archive</p>
        <p class="text-[7px] font-mono tracking-[.3em] text-right"
           style="color:rgba(255,255,255,.08);">HSR-K-001</p>
      </div>

      <!-- Ticker tape — character data strip -->
      <div
        class="ticker-wrap border-t py-2.5"
        style="border-color:rgba(255,255,255,.06);"
      >
        <div class="ticker-track">
          <template v-for="n in 2" :key="n">
            <span
              v-for="item in [
                { label: 'ELEMENT',  value: 'Lightning' },
                { label: 'PATH',     value: 'The Nihility' },
                { label: 'RARITY',   value: '5★' },
                { label: 'FACTION',  value: 'Stellaron Hunters' },
                { label: 'ROLE',     value: 'DoT Amplifier' },
                { label: 'LC PATH',  value: 'Nihility' },
              ]"
              :key="`${n}-${item.label}`"
              class="inline-flex items-center gap-3 mr-10"
            >
              <span class="text-[7px] font-mono tracking-[.45em] uppercase"
                    style="color:rgba(255,255,255,.2);">{{ item.label }}</span>
              <span class="text-[9px] font-mono tracking-[.15em]"
                    style="color:rgba(241,234,240,.45);">{{ item.value }}</span>
              <span style="color:rgba(255,255,255,.12);font-size:6px;margin-left:4px;">◆</span>
            </span>
          </template>
        </div>
      </div>

    </div>

  </section>
</template>
