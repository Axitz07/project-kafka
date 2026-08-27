<script setup>
import { ref, onMounted } from 'vue'
import { kafka } from '../data/kafka.js'
import { animate, stagger } from 'animejs'

const BASE         = import.meta.env.BASE_URL.replace(/\/$/, '')
const el           = ref(null)
const imgOk        = ref(false)
const barsIn       = ref(false)
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const statMax      = { hp: 1500, atk: 900, def: 600, spd: 130 }

function barWidth(key, val) {
  return Math.min((val / (statMax[key.toLowerCase()] ?? 1000)) * 100, 100)
}

onMounted(() => {
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return
    barsIn.value = true
    if (!prefersReduced) {
      requestAnimationFrame(() => {
        animate('.prof-label', { opacity: [0, 1], translateY: [10, 0], duration: 500, ease: 'outQuart' })
        animate('.prof-photo', { opacity: [0, 1], translateX: [-28, 0], duration: 900, ease: 'outExpo', delay: 80 })
        animate('.prof-lore',  { opacity: [0, 1], translateY: [20, 0], duration: 700, ease: 'outQuart', delay: 200 })
        animate('.prof-quote', { opacity: [0, 1], translateY: [14, 0], duration: 600, ease: 'outQuart', delay: 380 })
        animate('.prof-stat',  { opacity: [0, 1], translateX: [12, 0], duration: 480, delay: stagger(60, { start: 500 }), ease: 'outCubic' })
        animate('.prof-info',  { opacity: [0, 1], translateX: [10, 0], duration: 420, delay: stagger(50, { start: 720 }), ease: 'outCubic' })
        animate('.prof-tag',   { opacity: [0, 1], translateY: [8, 0],  duration: 340, delay: stagger(35, { start: 920 }), ease: 'outCubic' })
      })
    }
    io.disconnect()
  }, { threshold: 0.03 })
  if (el.value) io.observe(el.value)
})
</script>

<template>
  <section id="profile" ref="el" class="relative overflow-hidden"
           style="background:var(--color-void);">

    <!-- Top hairline -->
    <div class="hairline" />

    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-[1fr_1.6fr]">

        <!-- ── Photo column ─────────────────────────────────────── -->
        <div class="prof-photo anim-hidden relative overflow-hidden"
             style="min-height:640px;background:var(--color-deep);">
          <img
            v-if="imgOk || true"
            :src="`${BASE}/assets/kafka/kafka-2.jpg`"
            alt="Kafka character portrait"
            width="640" height="900"
            loading="lazy"
            class="absolute inset-0 w-full h-full object-cover object-top"
            style="opacity:.85;"
            @load="imgOk = true"
          />
          <!-- Bottom gradient -->
          <div class="absolute bottom-0 inset-x-0 h-40 pointer-events-none"
               style="background:linear-gradient(to top,var(--color-void) 0%,transparent 100%);" />
          <!-- Section label overlaid -->
          <div class="absolute bottom-8 left-8">
            <p class="prof-label anim-hidden text-[8px] font-mono tracking-[.5em] uppercase"
               style="color:var(--color-text-dim);">01 &nbsp;/&nbsp; Character</p>
          </div>
        </div>

        <!-- ── Content column ────────────────────────────────────── -->
        <div class="px-8 md:px-12 xl:px-16 py-16 md:py-20 flex flex-col gap-10">

          <!-- Header -->
          <div class="prof-lore anim-hidden">
            <p class="text-[11px] font-mono tracking-[.5em] uppercase mb-4"
               style="color:var(--color-text-dim);">Background</p>
            <h2 class="mb-5 leading-none"
                style="font-family:var(--font-display);font-size:clamp(2.8rem,5vw,4rem);font-weight:300;letter-spacing:-0.025em;color:var(--color-text-primary);">
              Kafka
            </h2>
            <p class="text-[15px] leading-[1.75] max-w-lg"
               style="color:var(--color-text-secondary);">
              A member of the Stellaron Hunters known for her calm demeanor and
              mysterious past. Her very name sends shivers through the cosmos — a
              predator who moves in silence, strikes with precision, and disappears
              before her prey even knows she was there.
            </p>
          </div>

          <!-- Quote -->
          <blockquote class="prof-quote anim-hidden border-l-2 pl-5"
                      style="border-color:rgba(124,58,237,.4);">
            <p class="text-[15px] leading-[1.7] italic"
               style="color:var(--color-text-muted);">"The stars don't care about your feelings. Neither do I."</p>
          </blockquote>

          <!-- Base stats -->
          <div>
            <p class="text-[11px] font-mono tracking-[.5em] uppercase mb-5"
               style="color:var(--color-text-dim);">Base Stats</p>
            <div class="grid grid-cols-2 gap-x-8 gap-y-5">
              <div
                v-for="stat in kafka.baseStats"
                :key="stat.key"
                class="prof-stat anim-hidden"
              >
                <div class="flex justify-between items-baseline mb-2">
                  <span class="text-[11px] font-mono tracking-[.3em] uppercase"
                        style="color:var(--color-text-dim);">{{ stat.key }}</span>
                  <span class="text-[15px] font-mono"
                        style="color:var(--color-text-primary);">{{ stat.value }}</span>
                </div>
                <div class="stat-bar-track">
                  <div
                    class="stat-bar-fill"
                    :style="{ width: barsIn ? barWidth(stat.key, stat.value) + '%' : '0%' }"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Info rows -->
          <div class="hairline" />
          <div>
            <p class="text-[11px] font-mono tracking-[.5em] uppercase mb-5"
               style="color:var(--color-text-dim);">Info</p>
            <div class="flex flex-col">
              <div
                v-for="info in kafka.info"
                :key="info.label"
                class="prof-info anim-hidden hover-row flex justify-between items-center
                       py-3 px-0 transition-all duration-200 cursor-default"
                style="border-bottom:1px solid rgba(34,23,64,.45);"
              >
                <span class="text-[12px] font-mono tracking-[.25em] uppercase"
                      style="color:var(--color-text-dim);">{{ info.label }}</span>
                <span class="text-[14px] font-mono"
                      style="color:var(--color-text-secondary);">{{ info.value }}</span>
              </div>
            </div>
          </div>

          <!-- Personality tags -->
          <div>
            <p class="text-[11px] font-mono tracking-[.5em] uppercase mb-4"
               style="color:var(--color-text-dim);">Personality</p>
            <div class="flex flex-wrap gap-x-4 gap-y-2">
              <span
                v-for="t in ['Tenang','Manipulatif','Elegan','Sulit Ditebak','Cerdas','Playful']"
                :key="t"
                class="prof-tag anim-hidden text-[12px] font-mono tracking-[.2em] uppercase
                       cursor-default transition-colors duration-200
                       border-b border-transparent pb-px"
                style="color:var(--color-text-muted);"
                @mouseenter="(e) => { e.target.style.color = 'var(--color-text-primary)'; e.target.style.borderBottomColor = 'rgba(124,58,237,.4)'; }"
                @mouseleave="(e) => { e.target.style.color = 'var(--color-text-muted)'; e.target.style.borderBottomColor = 'transparent'; }"
              >{{ t }}</span>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Bottom hairline -->
    <div class="hairline" />
  </section>
</template>
