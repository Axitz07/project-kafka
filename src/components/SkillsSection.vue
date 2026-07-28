<script setup>
import { ref, onMounted } from 'vue'
import { kafka } from '../data/kafka.js'

const BASE   = import.meta.env.BASE_URL.replace(/\/$/, '')
const el     = ref(null)
const show   = ref(false)
const activeLc = ref(0)

const skillColor = {
  'Basic ATK': { text: '#7a6090', border: 'rgba(122,96,144,.3)',  bg: 'rgba(122,96,144,.06)'  },
  'Skill':     { text: '#c084fc', border: 'rgba(192,132,252,.3)', bg: 'rgba(192,132,252,.07)' },
  'Ultimate':  { text: '#f59e0b', border: 'rgba(245,158,11,.3)',  bg: 'rgba(245,158,11,.07)'  },
  'Talent':    { text: '#a78bca', border: 'rgba(167,139,202,.3)', bg: 'rgba(167,139,202,.07)' },
}

const loop = [
  'Apply DoT via partner or Ultimate',
  'Kafka Skill → detonate all active DoTs instantly',
  'Partner reapplies DoT',
  'Kafka Skill again when DoT value is high',
  'Use Ultimate when Energy is full',
  'Repeat — never use Skill on a target with zero DoT',
]

onMounted(() => {
  const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { show.value = true; io.disconnect() } }, { threshold: 0.08 })
  if (el.value) io.observe(el.value)
})
</script>

<template>
  <!-- kafka-4: 1000×563 landscape — only landscape photo, used as background accent -->
  <section id="skills" ref="el" class="relative bg-[#06030f] overflow-hidden">

    <!-- Landscape photo as top banner, proper aspect ratio respected -->
    <div class="relative w-full overflow-hidden" style="max-height: 380px;">
      <img
        :src="`${BASE}/assets/kafka/kafka-4.jpg`"
        alt=""
        aria-hidden="true"
        class="w-full object-cover"
        style="height: 38vw; max-height: 380px; min-height: 200px; filter: brightness(.4) saturate(.6);"
      />
      <div class="absolute inset-0" style="background: linear-gradient(to bottom, #06030f 0%, transparent 20%, transparent 60%, #06030f 100%);"></div>
    </div>

    <div
      class="max-w-6xl mx-auto px-8 md:px-14 lg:px-20 py-20 transition-all duration-1000"
      :style="show ? 'opacity:1; transform:translateY(0)' : 'opacity:0; transform:translateY(20px)'"
    >

      <!-- Section header -->
      <div class="mb-16">
        <p class="text-[10px] tracking-[.55em] uppercase font-mono text-[#6b4f8a] mb-2 leading-none">Skills &amp; Build</p>
        <div class="w-6 h-px bg-[#7c3aed]/50 mt-3"></div>
      </div>

      <!-- Philosophy — short, not a huge blockquote -->
      <p class="text-[#9080a8] text-sm leading-relaxed max-w-2xl mb-16 italic">
        Kafka tidak sekadar menambah DoT — ia membuat DoT yang sudah ada meledak lebih cepat.
        Waktu itu sendiri adalah senjatanya.
      </p>

      <!-- Skills 2×2 grid -->
      <div class="mb-20">
        <p class="text-[10px] tracking-[.55em] uppercase font-mono text-[#6b4f8a] mb-8 leading-none">Active Skills</p>
        <div class="grid sm:grid-cols-2 gap-3">
          <div
            v-for="s in kafka.skills" :key="s.name"
            class="p-6 border transition-all duration-200 cursor-default group"
            :style="`border-color: ${skillColor[s.type]?.border ?? 'rgba(45,31,78,.5)'};
                     background: ${skillColor[s.type]?.bg ?? 'rgba(10,5,21,.8)'};`"
          >
            <span
              class="inline-block text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 mb-4 border"
              :style="`color:${skillColor[s.type]?.text}; border-color:${skillColor[s.type]?.border};`"
            >{{ s.type }}</span>
            <h4 class="text-sm font-semibold text-[#f0e8ff] mb-2 leading-snug">{{ s.name }}</h4>
            <p class="text-xs text-[#6b4f8a] leading-relaxed group-hover:text-[#a090b8] transition-colors duration-200">{{ s.description }}</p>
          </div>
        </div>
      </div>

      <!-- Two-column: loop + stat priority -->
      <div class="grid lg:grid-cols-2 gap-12 mb-20">

        <!-- Gameplay loop -->
        <div>
          <p class="text-[10px] tracking-[.55em] uppercase font-mono text-[#6b4f8a] mb-8 leading-none">Gameplay Loop</p>
          <div class="relative pl-6">
            <div class="absolute left-2 top-0 bottom-0 w-px bg-[#1e1535]"></div>
            <div class="space-y-5">
              <div v-for="(step, i) in loop" :key="i" class="relative group">
                <div class="absolute -left-[18px] top-[5px] w-2 h-2 rounded-full bg-[#2d1f4e] border border-[#4a2d7a] group-hover:bg-[#7c3aed] transition-colors duration-200"></div>
                <p class="text-[11px] text-[#6b4f8a] group-hover:text-[#a090b8] transition-colors leading-relaxed">
                  <span class="text-[#2d2040] font-mono mr-2">{{ String(i+1).padStart(2,'0') }}</span>{{ step }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Stat priority -->
        <div>
          <p class="text-[10px] tracking-[.55em] uppercase font-mono text-[#6b4f8a] mb-8 leading-none">Stat Priority</p>
          <div class="divide-y divide-[#1a1030]">
            <div
              v-for="(s, i) in [
                { stat:'SPD',             note:'Lebih banyak aksi = lebih banyak detonation' },
                { stat:'ATK%',            note:'Main stat body & rope' },
                { stat:'Lightning DMG%',  note:'Main stat sphere' },
                { stat:'Effect Hit Rate', note:'Min 30% untuk Shock konsisten' },
              ]"
              :key="s.stat"
              class="flex items-start gap-5 py-4"
            >
              <span class="text-[10px] text-[#3d2d50] font-mono w-4 flex-shrink-0 mt-0.5">{{ i+1 }}</span>
              <div>
                <p class="text-xs font-mono text-[#c084fc] mb-1">{{ s.stat }}</p>
                <p class="text-[10px] text-[#5a4870] leading-relaxed">{{ s.note }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Light Cones -->
      <div class="mb-16">
        <p class="text-[10px] tracking-[.55em] uppercase font-mono text-[#6b4f8a] mb-8 leading-none">Light Cones</p>
        <div class="divide-y divide-[#1a1030]">
          <div
            v-for="(lc, i) in kafka.lightCones" :key="lc.name"
            class="flex items-start gap-5 py-5 cursor-pointer group"
            :class="activeLc === i ? 'opacity-100' : 'opacity-60 hover:opacity-90'"
            @click="activeLc = i"
          >
            <span
              class="text-xs font-mono flex-shrink-0 mt-0.5 w-6"
              :class="lc.rarity === 5 ? 'text-[#f59e0b]' : 'text-[#a78bca]'"
            >{{ lc.rarity }}★</span>
            <div>
              <div class="flex items-center gap-3 mb-1">
                <h4 class="text-sm text-[#f0e8ff] group-hover:text-white transition-colors">{{ lc.name }}</h4>
                <span v-if="lc.recommended" class="text-[9px] px-1.5 py-0.5 border border-[#f59e0b]/40 text-[#f59e0b] font-mono tracking-widest uppercase">BIS</span>
              </div>
              <p class="text-[10px] text-[#5a4870]">{{ lc.note }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Common mistakes — compact -->
      <div>
        <p class="text-[10px] tracking-[.55em] uppercase font-mono text-[#6b4f8a] mb-6 leading-none">Hindari</p>
        <div class="grid sm:grid-cols-2 gap-3">
          <div
            v-for="m in [
              'Build Crit Rate/DMG seperti DPS biasa',
              'Gunakan Skill sebelum DoT aktif di musuh',
              'SPD terlalu rendah',
              'Main tanpa partner DoT',
            ]"
            :key="m"
            class="flex items-start gap-3 p-4 bg-[#0a0318] border border-[#1a1030]"
          >
            <span class="text-[#8060a0] text-xs flex-shrink-0 mt-0.5">✕</span>
            <p class="text-xs text-[#6b4f8a] leading-relaxed">{{ m }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
