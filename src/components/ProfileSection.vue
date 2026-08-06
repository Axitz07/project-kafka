<script setup>
import { ref, onMounted } from 'vue'
import { kafka } from '../data/kafka.js'
import { animate, stagger } from 'animejs'

const BASE        = import.meta.env.BASE_URL.replace(/\/$/, '')
const el          = ref(null)
const imgOk       = ref(false)
const barsIn      = ref(false)
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const statMax     = { hp: 1500, atk: 900, def: 600, spd: 130 }

function barWidth(key, val) {
  return Math.min((val / (statMax[key.toLowerCase()] ?? 1000)) * 100, 100)
}

onMounted(() => {
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return
    barsIn.value = true
    if (!prefersReduced) {
      requestAnimationFrame(() => {
        animate('.profile-photo-col', {
          opacity: [0, 1], translateX: [-36, 0], duration: 950, ease: 'outExpo',
        })
        animate('.profile-lore', {
          opacity: [0, 1], translateY: [24, 0], duration: 750, ease: 'outQuart', delay: 120,
        })
        animate('.profile-quote', {
          opacity: [0, 1], translateY: [16, 0], duration: 650, ease: 'outQuart', delay: 300,
        })
        animate('.profile-stat-row', {
          opacity: [0, 1], translateX: [14, 0], duration: 520,
          delay: stagger(65, { start: 380 }), ease: 'outCubic',
        })
        animate('.profile-info-row', {
          opacity: [0, 1], translateX: [10, 0], duration: 460,
          delay: stagger(55, { start: 660 }), ease: 'outCubic',
        })
        animate('.profile-tag', {
          opacity: [0, 1], translateY: [10, 0], duration: 370,
          delay: stagger(38, { start: 860 }), ease: 'outCubic',
        })
      })
    }
    io.disconnect()
  }, { threshold: 0.02 })
  if (el.value) io.observe(el.value)
})
</script>

<template>
  <section id="profile" ref="el" class="relative overflow-hidden" style="background:var(--color-deep);">
    <!-- Top divider -->
    <div class="h-px" style="background:linear-gradient(to right,transparent,rgba(124,58,237,.14),transparent);" />

    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-[420px_1fr] xl:grid-cols-[480px_1fr]">

        <!-- Photo column -->
        <div
          class="profile-photo-col relative overflow-hidden anim-hidden-x"
          style="aspect-ratio:902/1260;min-height:420px;max-height:88vh;"
        >
          <img
            :src="`${BASE}/assets/kafka/kafka-6.jpg`"
            alt="Kafka character art"
            width="480"
            height="672"
            loading="lazy"
            @load="imgOk = true"
            class="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700"
            :class="imgOk ? 'opacity-100' : 'opacity-0'"
            style="filter:brightness(.62) saturate(.88);"
          />
          <!-- right fade -->
          <div class="absolute inset-0"
               style="background:linear-gradient(to right,transparent 52%,#06030f 100%);" />
          <!-- bottom fade -->
          <div class="absolute inset-0"
               style="background:linear-gradient(to top,#06030f 0%,transparent 30%);" />

          <!-- Overlay identity -->
          <div class="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
            <h2
              class="font-semibold leading-none mb-2"
              style="font-family:'Cormorant Garamond',Georgia,serif;
                     font-size:clamp(2rem,3.8vw,3rem);
                     letter-spacing:-.03em;
                     color:var(--color-text-primary);"
            >{{ kafka.name }}</h2>
            <p class="text-[10px] tracking-[.4em] uppercase font-mono"
               style="color:var(--color-text-dim);">
              {{ kafka.faction }} &middot; {{ kafka.path }}
            </p>
          </div>
        </div>

        <!-- Right content -->
        <div class="px-8 py-16 lg:px-14 lg:py-20 xl:px-16 flex flex-col gap-14">

          <!-- Lore -->
          <div class="profile-lore anim-hidden">
            <p class="text-[9px] tracking-[.52em] uppercase font-mono mb-5"
               style="color:var(--color-text-dim);">Background</p>
            <p class="leading-[1.8] text-[14px]" style="color:var(--color-text-secondary);max-width:54ch;">
              {{ kafka.description }}
            </p>
          </div>

          <!-- Quote -->
          <div class="profile-quote anim-hidden">
            <blockquote
              class="border-l-2 pl-5 leading-relaxed"
              style="border-color:var(--color-purple);
                     font-family:'Cormorant Garamond',Georgia,serif;
                     font-style:italic;
                     font-size:clamp(1rem,1.6vw,1.15rem);
                     color:var(--color-text-secondary);"
            >{{ kafka.quote }}</blockquote>
          </div>

          <!-- Base stats -->
          <div>
            <p class="text-[9px] tracking-[.52em] uppercase font-mono mb-6"
               style="color:var(--color-text-dim);">Base Stats</p>
            <div class="flex flex-col gap-5">
              <div
                v-for="(val, key) in kafka.stats"
                :key="key"
                class="profile-stat-row anim-hidden-x"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="text-[10px] tracking-[.32em] uppercase font-mono"
                        style="color:var(--color-text-dim);">{{ key.toUpperCase() }}</span>
                  <span class="text-[13px] font-mono font-medium"
                        style="color:var(--color-text-secondary);">{{ val }}</span>
                </div>
                <div class="stat-bar-track">
                  <div
                    class="stat-bar-fill"
                    :style="{
                      width: barsIn ? `${barWidth(key, val)}%` : '0%',
                      transitionDelay: barsIn
                        ? `${Object.keys(kafka.stats).indexOf(key) * 120 + 400}ms`
                        : '0ms',
                    }"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Info rows -->
          <div>
            <p class="text-[9px] tracking-[.52em] uppercase font-mono mb-5"
               style="color:var(--color-text-dim);">Info</p>
            <div>
              <div
                v-for="info in [
                  { label: 'Voice (JP)',    value: 'Shizuka Itou'             },
                  { label: 'Role',          value: 'DoT DPS / Enabler'        },
                  { label: 'Signature LC',  value: 'Patience Is All You Need' },
                  { label: 'Core Mechanic', value: 'DoT Detonation'           },
                ]"
                :key="info.label"
                class="profile-info-row anim-hidden-x flex items-start justify-between
                       py-4 gap-6 border-b last:border-0"
                style="border-color:rgba(26,16,48,.8);"
              >
                <span class="text-[9px] text-(--color-text-dim) tracking-[.4em] uppercase font-mono flex-shrink-0">
                  {{ info.label }}
                </span>
                <span class="text-[12px] text-(--color-text-secondary) text-right font-mono">
                  {{ info.value }}
                </span>
              </div>
            </div>
          </div>

          <!-- Personality tags -->
          <div>
            <p class="text-[9px] tracking-[.52em] uppercase font-mono mb-5"
               style="color:var(--color-text-dim);">Personality</p>
            <div class="flex flex-wrap gap-x-5 gap-y-3">
              <span
                v-for="t in ['Tenang','Manipulatif','Elegan','Sulit Ditebak','Cerdas','Playful']"
                :key="t"
                class="profile-tag anim-hidden text-[12px] font-mono tracking-wide
                       hover:text-(--color-purple-glow) transition-colors duration-250 cursor-default
                       border-b border-transparent hover:border-(--color-border) pb-px"
                style="color:var(--color-text-muted);"
              >{{ t }}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>
