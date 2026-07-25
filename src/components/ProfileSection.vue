<script setup>
import { ref, onMounted } from 'vue'
import { kafka } from '../data/kafka.js'

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
const el   = ref(null)
const show = ref(false)

onMounted(() => {
  const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { show.value = true; io.disconnect() } }, { threshold: 0.1 })
  if (el.value) io.observe(el.value)
})
</script>

<template>
  <!-- kafka-6: 902×1260 portrait — same aspect ratio as kafka-1, perfect side column -->
  <section id="profile" ref="el" class="relative bg-[#06030f] overflow-hidden">

    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-[480px_1fr] xl:grid-cols-[520px_1fr]">

        <!-- Left: tall portrait photo — fills column height naturally -->
        <div
          class="relative overflow-hidden transition-all duration-1000"
          :style="show ? 'opacity:1' : 'opacity:0'"
          style="min-height: 640px;"
        >
          <img
            :src="`${BASE}/assets/kafka/kafka-6.jpg`"
            alt="Kafka"
            class="absolute inset-0 w-full h-full object-cover object-top"
            style="filter: brightness(.6) saturate(.8);"
          />
          <!-- Right-edge fade into content area -->
          <div class="absolute inset-0" style="background: linear-gradient(to right, transparent 70%, #06030f 100%);"></div>
          <!-- Bottom fade -->
          <div class="absolute inset-0" style="background: linear-gradient(to top, #06030f 0%, transparent 30%);"></div>

          <!-- Name overlaid at bottom of photo -->
          <div class="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
            <p class="text-[10px] tracking-[.55em] uppercase font-mono text-[#7a5098] mb-3 leading-none">Character Profile</p>
            <h2
              class="font-black leading-none text-[#f0e8ff] mb-2"
              style="font-family:'Georgia',serif; font-size: clamp(2.2rem,5vw,3.5rem); letter-spacing:-.03em;"
            >{{ kafka.name }}</h2>
            <p class="text-[#6a5080] text-xs tracking-widest font-mono">
              {{ kafka.faction }}&ensp;·&ensp;{{ kafka.path }}&ensp;·&ensp;{{ kafka.element }}
            </p>
          </div>
        </div>

        <!-- Right: content — padded, no cramping -->
        <div
          class="px-8 py-16 lg:px-12 lg:py-20 xl:px-16 flex flex-col gap-14 transition-all duration-1000"
          :style="show ? 'opacity:1; transform:translateY(0)' : 'opacity:0; transform:translateY(24px)'"
          style="transition-delay:200ms;"
        >

          <!-- Lore block -->
          <div>
            <p class="text-[10px] tracking-[.55em] uppercase font-mono text-[#6b4f8a] mb-6 leading-none">Lore</p>
            <p class="text-[#b89fd4] leading-relaxed text-[15px] mb-5">
              Kafka adalah anggota Stellaron Hunters yang menjalankan misi berdasarkan "Script" milik Elio.
              Masa lalunya sengaja dibuat ambigu — yang diketahui hanya bahwa ia memiliki kemampuan
              <em class="text-[#c084fc] not-italic">Spirit Whisper</em> untuk memanipulasi pikiran,
              dan hubungan khusus dengan Trailblazer yang tidak sepenuhnya terungkap.
            </p>
            <p class="text-[#7a6090] leading-relaxed text-sm">
              Spirit Whisper bukan sekadar persuasi. Kafka bisa memengaruhi seseorang untuk mengikuti
              perintah tertentu — mempertanyakan konsep kehendak bebas yang menjadi tema besar dalam cerita.
            </p>
          </div>

          <!-- Pull quote -->
          <blockquote class="pl-5 border-l-2 border-[#3d1f5e]/60">
            <p class="text-[#e8d8ff] text-lg md:text-xl leading-relaxed" style="font-style:italic;">
              "Apakah tindakan tersebut membawa seseorang menuju masa depan yang sudah ditentukan?"
            </p>
          </blockquote>

          <!-- Stats — clean divide list -->
          <div>
            <p class="text-[10px] tracking-[.55em] uppercase font-mono text-[#6b4f8a] mb-6 leading-none">Base Stats</p>
            <div class="divide-y divide-[#1a1030]">
              <div
                v-for="(val, key) in kafka.stats" :key="key"
                class="flex items-center justify-between py-3"
              >
                <span class="text-xs text-[#6b4f8a] tracking-widest uppercase font-mono">{{ key }}</span>
                <span class="text-sm font-mono text-[#c084fc]">{{ val }}</span>
              </div>
            </div>
          </div>

          <!-- Quick facts -->
          <div>
            <p class="text-[10px] tracking-[.55em] uppercase font-mono text-[#6b4f8a] mb-6 leading-none">Info</p>
            <div class="divide-y divide-[#1a1030]">
              <div
                v-for="info in [
                  { label: 'Voice (JP)',    value: 'Shizuka Itou' },
                  { label: 'Role',          value: 'DoT DPS / Enabler' },
                  { label: 'Signature LC',  value: 'Patience Is All You Need' },
                  { label: 'Core Mechanic', value: 'DoT Detonation' },
                ]"
                :key="info.label"
                class="flex items-start justify-between py-3 gap-8"
              >
                <span class="text-[10px] text-[#5a4870] tracking-widest uppercase font-mono flex-shrink-0">{{ info.label }}</span>
                <span class="text-xs text-[#a090b8] text-right">{{ info.value }}</span>
              </div>
            </div>
          </div>

          <!-- Traits — horizontal small tags, not pills, not grid -->
          <div>
            <p class="text-[10px] tracking-[.55em] uppercase font-mono text-[#6b4f8a] mb-5 leading-none">Personality</p>
            <div class="flex flex-wrap gap-x-6 gap-y-2">
              <span
                v-for="t in ['Tenang','Manipulatif','Elegan','Sulit Ditebak','Cerdas','Playful']"
                :key="t"
                class="text-xs text-[#8070a0] font-mono tracking-wide"
              >{{ t }}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>
