<script setup>
import { ref, onMounted } from 'vue'
import { kafka } from '../data/kafka.js'

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
const el   = ref(null)
const show = ref(false)
const imgOk = ref(false)

onMounted(() => {
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { show.value = true; io.disconnect() }
  }, { threshold: 0.06 })
  if (el.value) io.observe(el.value)
})
</script>

<template>
  <!-- kafka-6: 902×1260 portrait — identical ratio to kafka-1 -->
  <section id="profile" ref="el" class="relative bg-[#06030f] overflow-hidden">
    <div class="h-px bg-gradient-to-r from-transparent via-[#2d1f4e]/30 to-transparent"></div>

    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-[440px_1fr] xl:grid-cols-[500px_1fr]">

        <!-- Left: portrait photo — fills height naturally, no crop -->
        <div class="relative overflow-hidden transition-opacity duration-1000"
             :style="show?'opacity:1':'opacity:0'"
             style="min-height:600px;">
          <img
            :src="`${BASE}/assets/kafka/kafka-6.jpg`"
            alt="Kafka"
            @load="imgOk=true"
            class="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700"
            :class="imgOk?'opacity-100':'opacity-0'"
            style="filter:brightness(.55) saturate(.8);"
          />
          <div class="absolute inset-0"
               style="background:linear-gradient(to right,transparent 65%,#06030f 100%);"></div>
          <div class="absolute inset-0"
               style="background:linear-gradient(to top,#06030f 0%,transparent 28%);"></div>

          <!-- Name overlaid at bottom -->
          <div class="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
            <p class="text-[10px] tracking-[.5em] uppercase text-[#7a5098] font-mono mb-3">
              Character Profile
            </p>
            <h2 class="font-semibold leading-none text-[#f1e8ff] mb-2"
                style="font-family:'Cormorant Garamond',Georgia,serif;
                       font-size:clamp(2rem,4.5vw,3.2rem);
                       letter-spacing:-.02em;">
              {{ kafka.name }}
            </h2>
            <p class="text-[#5a4870] text-xs tracking-widest font-mono">
              {{ kafka.faction }} · {{ kafka.path }} · {{ kafka.element }}
            </p>
          </div>
        </div>

        <!-- Right: content -->
        <div class="px-8 py-16 lg:px-12 lg:py-20 xl:px-16 flex flex-col gap-12
                    transition-all duration-1000"
             :style="show?'opacity:1;transform:translateY(0)':'opacity:0;transform:translateY(20px)'"
             style="transition-delay:200ms;">

          <!-- Lore -->
          <div>
            <p class="text-[10px] tracking-[.5em] uppercase text-[#5a4870] font-mono mb-5">Lore</p>
            <p class="text-[#b89fd4] leading-[1.85] text-[15px] mb-5">
              Kafka adalah anggota Stellaron Hunters yang menjalankan misi berdasarkan
              "Script" milik Elio. Masa lalunya sengaja dibuat ambigu — yang diketahui
              hanya bahwa ia memiliki kemampuan
              <em class="text-[#c084fc] not-italic font-medium">Spirit Whisper</em>
              untuk memanipulasi pikiran, dan hubungan khusus dengan Trailblazer.
            </p>
            <p class="text-[#7a6090] leading-relaxed text-sm">
              Spirit Whisper bukan sekadar persuasi. Kafka bisa memengaruhi seseorang
              untuk mengikuti perintah tertentu — mempertanyakan kehendak bebas sebagai
              tema besar dalam narasi.
            </p>
          </div>

          <!-- Pull quote -->
          <blockquote class="border-l border-[#7c3aed]/40 pl-5">
            <p class="text-[#d8c8f0] leading-relaxed"
               style="font-family:'Cormorant Garamond',Georgia,serif;
                      font-size:1.2rem;font-style:italic;">
              "Apakah tindakan tersebut membawa seseorang menuju masa depan
              yang sudah ditentukan?"
            </p>
          </blockquote>

          <!-- Stats -->
          <div>
            <p class="text-[10px] tracking-[.5em] uppercase text-[#5a4870] font-mono mb-5">
              Base Stats
            </p>
            <div class="divide-y divide-[#1a1030]">
              <div v-for="(val, key) in kafka.stats" :key="key"
                   class="flex items-center justify-between py-3">
                <span class="text-xs text-[#5a4870] tracking-widest uppercase font-mono">{{ key }}</span>
                <span class="text-sm font-mono text-[#c084fc]">{{ val }}</span>
              </div>
            </div>
          </div>

          <!-- Info -->
          <div>
            <p class="text-[10px] tracking-[.5em] uppercase text-[#5a4870] font-mono mb-5">Info</p>
            <div class="divide-y divide-[#1a1030]">
              <div v-for="info in [
                     { label:'Voice (JP)',    value:'Shizuka Itou'              },
                     { label:'Role',          value:'DoT DPS / Enabler'         },
                     { label:'Signature LC',  value:'Patience Is All You Need'  },
                     { label:'Core Mechanic', value:'DoT Detonation'            },
                   ]"
                   :key="info.label"
                   class="flex items-start justify-between py-3 gap-6">
                <span class="text-[10px] text-[#4a3a5e] tracking-widest uppercase font-mono flex-shrink-0">
                  {{ info.label }}
                </span>
                <span class="text-xs text-[#9080a8] text-right">{{ info.value }}</span>
              </div>
            </div>
          </div>

          <!-- Personality -->
          <div>
            <p class="text-[10px] tracking-[.5em] uppercase text-[#5a4870] font-mono mb-4">
              Personality
            </p>
            <div class="flex flex-wrap gap-x-5 gap-y-1.5">
              <span v-for="t in ['Tenang','Manipulatif','Elegan','Sulit Ditebak','Cerdas','Playful']"
                    :key="t"
                    class="text-xs text-[#7a6090] font-mono tracking-wide">
                {{ t }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
