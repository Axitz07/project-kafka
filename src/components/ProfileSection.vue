<script setup>
import { ref, onMounted } from 'vue'
import { kafka } from '../data/kafka.js'

const BASE   = import.meta.env.BASE_URL.replace(/\/$/, '')
const el     = ref(null)
const show   = ref(false)
const imgOk  = ref(false)
const barsIn = ref(false)

// Max stat values for bar width calculation
const statMax = { hp: 1500, atk: 900, def: 600, spd: 130 }

onMounted(() => {
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      show.value = true
      setTimeout(() => { barsIn.value = true }, 400)
      io.disconnect()
    }
  }, { threshold: 0.06 })
  if (el.value) io.observe(el.value)
})

function barWidth(key, val) {
  const max = statMax[key.toLowerCase()] ?? 1000
  return Math.min((val / max) * 100, 100)
}
</script>

<template>
  <!-- kafka-6: 902×1260 portrait -->
  <section id="profile" ref="el" class="relative bg-[#06030f] overflow-hidden">
    <div class="h-px bg-gradient-to-r from-transparent via-[#2d1f4e]/25 to-transparent" />

    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-[440px_1fr] xl:grid-cols-[500px_1fr]">

        <!-- ── Left photo column ──────────────────────────── -->
        <div
          class="relative overflow-hidden transition-opacity duration-1000"
          :class="show ? 'opacity-100' : 'opacity-0'"
          style="min-height: 600px;"
        >
          <img
            :src="`${BASE}/assets/kafka/kafka-6.jpg`"
            alt="Kafka"
            @load="imgOk = true"
            class="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700"
            :class="imgOk ? 'opacity-100' : 'opacity-0'"
            style="filter: brightness(.55) saturate(.8);"
          />
          <!-- fade right -->
          <div class="absolute inset-0"
               style="background: linear-gradient(to right, transparent 65%, #06030f 100%);" />
          <!-- fade bottom -->
          <div class="absolute inset-0"
               style="background: linear-gradient(to top, #06030f 0%, transparent 30%);" />

          <!-- Overlay text -->
          <div class="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
            <p class="text-[10px] tracking-[.5em] uppercase text-[#7a5098] font-mono mb-3">
              Character Profile
            </p>
            <h2
              class="font-semibold leading-none text-[#f1e8ff] mb-2"
              style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(2rem, 4.5vw, 3.2rem); letter-spacing: -.02em;"
            >{{ kafka.name }}</h2>
            <p class="text-[#5a4870] text-xs tracking-widest font-mono">
              {{ kafka.faction }} · {{ kafka.path }} · {{ kafka.element }}
            </p>
          </div>
        </div>

        <!-- ── Right content column ───────────────────────── -->
        <div
          class="px-8 py-16 lg:px-12 lg:py-20 xl:px-16 flex flex-col gap-12 transition-all duration-1000"
          :class="show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          style="transition-delay: 200ms;"
        >

          <!-- Lore -->
          <div>
            <p class="text-[10px] tracking-[.5em] uppercase text-[#5a4870] font-mono mb-5">Lore</p>
            <p class="text-[#b89fd4] leading-[1.85] text-[15px] mb-4">
              {{ kafka.description }}
            </p>
          </div>

          <!-- Pull quote -->
          <blockquote class="border-l border-[#7c3aed]/35 pl-5">
            <p
              class="text-[#d8c8f0] leading-relaxed"
              style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.2rem; font-style: italic;"
            >
              "Apakah tindakan tersebut membawa seseorang menuju masa depan yang sudah ditentukan?"
            </p>
          </blockquote>

          <!-- Animated stat bars -->
          <div>
            <p class="text-[10px] tracking-[.5em] uppercase text-[#5a4870] font-mono mb-6">
              Base Stats
            </p>
            <div class="space-y-4">
              <div
                v-for="(val, key) in kafka.stats"
                :key="key"
                class="group"
              >
                <div class="flex items-center justify-between mb-1.5">
                  <span class="text-[10px] text-[#4a3a5e] tracking-widest uppercase font-mono">
                    {{ key }}
                  </span>
                  <span class="text-xs font-mono text-[#c084fc] transition-all duration-300"
                        :class="barsIn ? 'opacity-100' : 'opacity-0'">
                    {{ val }}
                  </span>
                </div>
                <!-- Bar track -->
                <div class="h-0.5 bg-[#1a1030] overflow-hidden rounded-full">
                  <!-- Bar fill — animates on scroll reveal -->
                  <div
                    class="h-full rounded-full transition-all duration-1000 ease-out"
                    :style="{
                      width: barsIn ? `${barWidth(key, val)}%` : '0%',
                      background: 'linear-gradient(to right, #7c3aed, #e879f9)',
                      transitionDelay: `${Object.keys(kafka.stats).indexOf(key) * 150}ms`,
                    }"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Info grid -->
          <div>
            <p class="text-[10px] tracking-[.5em] uppercase text-[#5a4870] font-mono mb-5">Info</p>
            <div class="divide-y divide-[#1a1030]">
              <div
                v-for="info in [
                  { label: 'Voice (JP)',    value: 'Shizuka Itou'             },
                  { label: 'Role',          value: 'DoT DPS / Enabler'        },
                  { label: 'Signature LC',  value: 'Patience Is All You Need' },
                  { label: 'Core Mechanic', value: 'DoT Detonation'           },
                ]"
                :key="info.label"
                class="flex items-start justify-between py-3 gap-6"
              >
                <span class="text-[10px] text-[#4a3a5e] tracking-widest uppercase font-mono flex-shrink-0">
                  {{ info.label }}
                </span>
                <span class="text-xs text-[#9080a8] text-right">{{ info.value }}</span>
              </div>
            </div>
          </div>

          <!-- Personality tags -->
          <div>
            <p class="text-[10px] tracking-[.5em] uppercase text-[#5a4870] font-mono mb-4">
              Personality
            </p>
            <div class="flex flex-wrap gap-x-5 gap-y-2">
              <span
                v-for="t in ['Tenang', 'Manipulatif', 'Elegan', 'Sulit Ditebak', 'Cerdas', 'Playful']"
                :key="t"
                class="text-xs text-[#7a6090] font-mono tracking-wide hover:text-[#c084fc] transition-colors duration-200 cursor-default"
              >{{ t }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
