<script setup>
import { ref, onMounted } from 'vue'
import { kafka } from '../data/kafka.js'

const BASE      = import.meta.env.BASE_URL.replace(/\/$/, '')
const el        = ref(null)
const show      = ref(false)
const activeLc  = ref(0)

const skillColor = {
  'Basic ATK': { text:'#7a6090', border:'rgba(122,96,144,.25)', bg:'rgba(122,96,144,.05)' },
  'Skill':     { text:'#c084fc', border:'rgba(192,132,252,.25)', bg:'rgba(192,132,252,.06)' },
  'Ultimate':  { text:'#f59e0b', border:'rgba(245,158,11,.25)',  bg:'rgba(245,158,11,.05)'  },
  'Talent':    { text:'#b89fd4', border:'rgba(184,159,212,.25)', bg:'rgba(184,159,212,.05)' },
}

const loop = [
  'Apply DoT via partner skill or Ultimate',
  'Kafka Skill → detonate all active DoTs immediately',
  'Partner reapplies DoT while Kafka recovers energy',
  'Kafka Skill again when DoT value is high',
  'Use Ultimate when Energy reaches maximum',
  'Never use Skill on a target with zero active DoT',
]

const statPriority = [
  { stat:'SPD',             note:'More actions = more detonations. Tertinggi.' },
  { stat:'ATK%',            note:'Main stat Body & Rope.' },
  { stat:'Lightning DMG%',  note:'Main stat Sphere.' },
  { stat:'Effect Hit Rate', note:'Min 30% untuk Shock konsisten.' },
]

const mistakes = [
  'Build Crit Rate/DMG seperti DPS konvensional',
  'Gunakan Skill sebelum DoT aktif di musuh',
  'SPD terlalu rendah',
  'Main tanpa partner DoT',
]

onMounted(() => {
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { show.value = true; io.disconnect() }
  }, { threshold: 0.06 })
  if (el.value) io.observe(el.value)
})
</script>

<template>
  <!-- kafka-4: 1000×563 landscape — used as wide accent banner -->
  <section id="skills" ref="el" class="relative bg-[#06030f] overflow-hidden">
    <div class="h-px bg-gradient-to-r from-transparent via-[#2d1f4e]/30 to-transparent"></div>

    <!-- Landscape photo banner — aspect ratio respected, no crop -->
    <div class="relative w-full overflow-hidden" style="max-height:320px;">
      <img
        :src="`${BASE}/assets/kafka/kafka-4.jpg`"
        alt=""
        aria-hidden="true"
        class="w-full object-cover"
        style="height:clamp(160px,30vw,320px);filter:brightness(.3) saturate(.6);"
      />
      <div class="absolute inset-0"
           style="background:linear-gradient(to bottom,#06030f 0%,transparent 25%,transparent 65%,#06030f 100%);"></div>
    </div>

    <div class="max-w-6xl mx-auto px-8 md:px-14 lg:px-20 py-20
                transition-all duration-1000"
         :style="show?'opacity:1;transform:translateY(0)':'opacity:0;transform:translateY(20px)'">

      <!-- Section header -->
      <div class="mb-16">
        <p class="text-[10px] tracking-[.5em] uppercase text-[#5a4870] font-mono mb-3">
          Skills & Build
        </p>
        <p class="text-[#7a6090] max-w-xl leading-relaxed"
           style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.1rem;font-style:italic;">
          Kafka tidak menambah DoT — ia membuat DoT yang sudah ada meledak lebih cepat.
          Waktu itu sendiri adalah senjatanya.
        </p>
      </div>

      <!-- Skills grid -->
      <div class="mb-20">
        <p class="text-[10px] tracking-[.5em] uppercase text-[#5a4870] font-mono mb-8">Active Skills</p>
        <div class="grid sm:grid-cols-2 gap-3">
          <div v-for="s in kafka.skills" :key="s.name"
               class="group p-6 border transition-all duration-200 cursor-default"
               :style="`border-color:${skillColor[s.type]?.border??'rgba(45,31,78,.4)'};
                        background:${skillColor[s.type]?.bg??'rgba(10,5,21,.8)'};`">
            <span class="inline-block text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 mb-4 border"
                  :style="`color:${skillColor[s.type]?.text};border-color:${skillColor[s.type]?.border};`">
              {{ s.type }}
            </span>
            <h4 class="text-sm font-medium text-[#f1e8ff] mb-2 leading-snug">{{ s.name }}</h4>
            <p class="text-xs text-[#5a4870] leading-relaxed group-hover:text-[#9080a8] transition-colors duration-200">
              {{ s.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Two-column: loop + stat priority -->
      <div class="grid lg:grid-cols-2 gap-14 mb-20">

        <!-- Gameplay loop -->
        <div>
          <p class="text-[10px] tracking-[.5em] uppercase text-[#5a4870] font-mono mb-8">Gameplay Loop</p>
          <div class="relative pl-6">
            <div class="absolute left-2 top-0 bottom-0 w-px bg-[#1a1030]"></div>
            <div class="space-y-5">
              <div v-for="(step, i) in loop" :key="i"
                   class="relative group">
                <div class="absolute -left-[18px] top-[5px] w-2 h-2 rounded-full bg-[#1e1535] border border-[#3d2d60] group-hover:bg-[#7c3aed] transition-colors duration-200"></div>
                <p class="text-xs text-[#5a4870] group-hover:text-[#9080a8] transition-colors leading-relaxed">
                  <span class="text-[#2d2040] font-mono mr-2">{{ String(i+1).padStart(2,'0') }}</span>
                  {{ step }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Stat priority -->
        <div>
          <p class="text-[10px] tracking-[.5em] uppercase text-[#5a4870] font-mono mb-8">Stat Priority</p>
          <div class="divide-y divide-[#1a1030]">
            <div v-for="(s, i) in statPriority" :key="s.stat"
                 class="flex items-start gap-4 py-4 group">
              <span class="text-[10px] text-[#2d2040] font-mono w-5 flex-shrink-0 mt-0.5">{{ i+1 }}</span>
              <div>
                <p class="text-xs font-mono text-[#c084fc] mb-1">{{ s.stat }}</p>
                <p class="text-[10px] text-[#5a4870] group-hover:text-[#9080a8] transition-colors leading-relaxed">
                  {{ s.note }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Light Cones -->
      <div class="mb-16">
        <p class="text-[10px] tracking-[.5em] uppercase text-[#5a4870] font-mono mb-8">Light Cones</p>
        <div class="divide-y divide-[#1a1030]">
          <div v-for="(lc, i) in kafka.lightCones" :key="lc.name"
               class="flex items-start gap-5 py-5 cursor-pointer group transition-opacity duration-200"
               :class="activeLc===i?'opacity-100':'opacity-50 hover:opacity-80'"
               @click="activeLc=i">
            <span class="text-xs font-mono flex-shrink-0 mt-0.5 w-6"
                  :class="lc.rarity===5?'text-[#f59e0b]':'text-[#a08ab8]'">
              {{ lc.rarity }}★
            </span>
            <div>
              <div class="flex items-center gap-3 mb-1">
                <h4 class="text-sm text-[#f1e8ff] group-hover:text-white transition-colors">{{ lc.name }}</h4>
                <span v-if="lc.recommended"
                      class="text-[9px] px-1.5 py-0.5 border border-[#f59e0b]/40 text-[#f59e0b] font-mono tracking-widest uppercase">
                  BIS
                </span>
              </div>
              <p class="text-[10px] text-[#4a3a5e]">{{ lc.note }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Common mistakes -->
      <div>
        <p class="text-[10px] tracking-[.5em] uppercase text-[#5a4870] font-mono mb-6">Hindari</p>
        <div class="grid sm:grid-cols-2 gap-3">
          <div v-for="m in mistakes" :key="m"
               class="flex items-start gap-3 p-4 bg-[#0a0318] border border-[#1a1030]">
            <span class="text-[#8060a0] text-xs flex-shrink-0 mt-0.5">✕</span>
            <p class="text-xs text-[#5a4870] leading-relaxed">{{ m }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
