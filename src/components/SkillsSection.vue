<script setup>
import { ref, onMounted } from 'vue'
import { kafka } from '../data/kafka.js'
import {
  Zap, Swords, Star, Sparkles,
  ChevronRight, Gauge, Target, Shield, Activity,
  BookOpen, AlertCircle
} from 'lucide-vue-next'

const BASE     = import.meta.env.BASE_URL.replace(/\/$/, '')
const el       = ref(null)
const show     = ref(false)
const activeLc = ref(0)
const hovered  = ref(null)

// Icon per skill type
const skillIcon = {
  'Basic ATK': Swords,
  'Skill':     Zap,
  'Ultimate':  Star,
  'Talent':    Sparkles,
}

const skillColor = {
  'Basic ATK': { text: '#a090b8', border: 'rgba(160,144,184,.25)', bg: 'rgba(160,144,184,.05)', glow: 'rgba(160,144,184,.15)' },
  'Skill':     { text: '#c084fc', border: 'rgba(192,132,252,.3)',   bg: 'rgba(192,132,252,.07)', glow: 'rgba(192,132,252,.22)' },
  'Ultimate':  { text: '#f59e0b', border: 'rgba(245,158,11,.3)',    bg: 'rgba(245,158,11,.06)',  glow: 'rgba(245,158,11,.2)'   },
  'Talent':    { text: '#d4b8e8', border: 'rgba(212,184,232,.25)',  bg: 'rgba(212,184,232,.05)', glow: 'rgba(212,184,232,.15)' },
}

// Icon per stat
const statIcon = { 'SPD': Gauge, 'ATK%': Swords, 'Lightning DMG%': Zap, 'Effect Hit Rate': Target }

const loop = [
  'Apply DoT via partner skill or Ultimate',
  'Kafka Skill → detonate all active DoTs immediately',
  'Partner reapplies DoT while Kafka recovers energy',
  'Kafka Skill again when DoT value is high',
  'Use Ultimate when Energy reaches maximum',
  'Never Skill when enemy has zero active DoT',
]

const statPriority = [
  { stat: 'SPD',            note: 'More actions = more detonations. Highest priority.' },
  { stat: 'ATK%',           note: 'Main stat Body & Rope.' },
  { stat: 'Lightning DMG%', note: 'Main stat Sphere.' },
  { stat: 'Effect Hit Rate', note: 'Min 30% untuk Shock konsisten.' },
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
  <section id="skills" ref="el" class="relative bg-[#06030f] overflow-hidden">
    <div class="h-px bg-gradient-to-r from-transparent via-[#2d1f4e]/25 to-transparent" />

    <!-- Landscape photo banner — kafka-4 (1000×563) -->
    <div class="relative w-full overflow-hidden" style="max-height: 300px;">
      <img
        :src="`${BASE}/assets/kafka/kafka-4.jpg`"
        alt=""
        aria-hidden="true"
        class="w-full object-cover"
        style="height: clamp(160px, 28vw, 300px); filter: brightness(.28) saturate(.6);"
      />
      <div class="absolute inset-0"
           style="background: linear-gradient(to bottom, #06030f 0%, transparent 25%, transparent 65%, #06030f 100%);" />
    </div>

    <div
      class="max-w-6xl mx-auto px-8 md:px-14 lg:px-20 py-20 transition-all duration-1000"
      :class="show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
    >
      <!-- Section header -->
      <div class="mb-16">
        <div class="flex items-center gap-2 mb-3">
          <BookOpen class="w-3.5 h-3.5 text-[#7c3aed]" />
          <p class="text-[11px] tracking-[.45em] uppercase text-[#7a6090] font-mono">Skills &amp; Build</p>
        </div>
        <p
          class="text-[#9b87b4] max-w-xl leading-relaxed"
          style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.15rem; font-style: italic; line-height: 1.7;"
        >
          Kafka tidak menambah DoT — ia membuat DoT yang sudah ada meledak lebih cepat.
          Waktu itu sendiri adalah senjatanya.
        </p>
      </div>

      <!-- Skill cards — hover lift + glow + icon -->
      <div class="mb-20">
        <p class="text-[11px] tracking-[.45em] uppercase text-[#7a6090] font-mono mb-8">Active Skills</p>
        <div class="grid sm:grid-cols-2 gap-3">
          <div
            v-for="s in kafka.skills"
            :key="s.name"
            class="p-5 border cursor-default transition-all duration-300 group"
            :style="{
              borderColor: hovered === s.name
                ? skillColor[s.type]?.border ?? 'rgba(45,31,78,.4)'
                : 'rgba(30,21,53,.8)',
              background: hovered === s.name
                ? skillColor[s.type]?.bg ?? 'rgba(10,5,21,.8)'
                : 'rgba(8,3,18,.95)',
              transform: hovered === s.name ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow: hovered === s.name
                ? `0 8px 32px ${skillColor[s.type]?.glow ?? 'rgba(124,58,237,.1)'}`
                : '0 1px 0 rgba(255,255,255,.03)',
            }"
            @mouseenter="hovered = s.name"
            @mouseleave="hovered = null"
          >
            <!-- Type badge with icon -->
            <div class="flex items-center gap-1.5 mb-4">
              <component
                :is="skillIcon[s.type] ?? Zap"
                class="w-3 h-3 flex-shrink-0"
                :style="{ color: skillColor[s.type]?.text }"
              />
              <span
                class="text-[10px] tracking-widest uppercase font-mono"
                :style="{ color: skillColor[s.type]?.text }"
              >{{ s.type }}</span>
            </div>
            <h4 class="text-sm font-medium text-[#e8d8ff] mb-2 leading-snug">{{ s.name }}</h4>
            <p class="text-[13px] leading-relaxed transition-colors duration-200"
               :style="{ color: hovered === s.name ? '#a090b8' : '#6b5880' }">
              {{ s.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Two-col: loop + stat priority -->
      <div class="grid lg:grid-cols-2 gap-14 mb-20">

        <!-- Gameplay loop -->
        <div>
          <div class="flex items-center gap-2 mb-8">
            <Activity class="w-3.5 h-3.5 text-[#7c3aed]" />
            <p class="text-[11px] tracking-[.45em] uppercase text-[#7a6090] font-mono">Gameplay Loop</p>
          </div>
          <div class="relative pl-6">
            <div class="absolute left-2 top-0 bottom-0 w-px bg-[#1a1030]" />
            <div class="space-y-5">
              <div
                v-for="(step, i) in loop"
                :key="i"
                class="relative group cursor-default"
                @mouseenter="hovered = `step-${i}`"
                @mouseleave="hovered = null"
              >
                <div
                  class="absolute -left-[18px] top-[5px] w-2 h-2 rounded-full border transition-all duration-300"
                  :class="hovered === `step-${i}`
                    ? 'bg-[#7c3aed] border-[#7c3aed] scale-125'
                    : 'bg-[#1e1535] border-[#3d2d60]'"
                />
                <p class="text-[13px] leading-relaxed transition-colors duration-200"
                   :style="{ color: hovered === `step-${i}` ? '#b0a0c8' : '#7a6090' }">
                  <span class="text-[#3d2d60] font-mono mr-2">{{ String(i+1).padStart(2,'0') }}</span>
                  {{ step }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Stat priority with icons -->
        <div>
          <div class="flex items-center gap-2 mb-8">
            <Shield class="w-3.5 h-3.5 text-[#7c3aed]" />
            <p class="text-[11px] tracking-[.45em] uppercase text-[#7a6090] font-mono">Stat Priority</p>
          </div>
          <div class="divide-y divide-[#160f28]">
            <div
              v-for="(s, i) in statPriority"
              :key="s.stat"
              class="flex items-start gap-4 py-4 group cursor-default"
            >
              <div class="flex items-center justify-center w-6 h-6 rounded bg-[#1a1030] flex-shrink-0 mt-0.5">
                <component :is="statIcon[s.stat] ?? Gauge" class="w-3 h-3 text-[#7c3aed]" />
              </div>
              <div>
                <p class="text-sm font-mono text-[#c084fc] mb-1">{{ s.stat }}</p>
                <p class="text-[13px] text-[#7a6090] group-hover:text-[#9080a8] transition-colors leading-relaxed">
                  {{ s.note }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Light Cones -->
      <div class="mb-16">
        <div class="flex items-center gap-2 mb-8">
          <Star class="w-3.5 h-3.5 text-[#f59e0b]" />
          <p class="text-[11px] tracking-[.45em] uppercase text-[#7a6090] font-mono">Light Cones</p>
        </div>
        <div class="divide-y divide-[#160f28]">
          <div
            v-for="(lc, i) in kafka.lightCones"
            :key="lc.name"
            class="flex items-start gap-5 py-5 cursor-pointer group transition-all duration-200"
            :class="activeLc === i ? 'opacity-100' : 'opacity-50 hover:opacity-80'"
            @click="activeLc = i"
          >
            <div class="flex items-center gap-1 flex-shrink-0 mt-0.5">
              <span class="text-xs font-mono w-4"
                    :class="lc.rarity === 5 ? 'text-[#f59e0b]' : 'text-[#9080a8]'">
                {{ lc.rarity }}
              </span>
              <Star class="w-3 h-3" :class="lc.rarity === 5 ? 'text-[#f59e0b]' : 'text-[#9080a8]'" />
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-1">
                <h4 class="text-sm text-[#e8d8ff] group-hover:text-white transition-colors">{{ lc.name }}</h4>
                <span v-if="lc.recommended"
                      class="text-[9px] px-1.5 py-0.5 border border-[#f59e0b]/40 text-[#f59e0b] font-mono tracking-widest uppercase">
                  BIS
                </span>
              </div>
              <p class="text-[13px] text-[#6b5880]">{{ lc.note }}</p>
            </div>
            <ChevronRight
              class="w-4 h-4 flex-shrink-0 mt-1 transition-all duration-200"
              :class="activeLc === i ? 'text-[#c084fc] translate-x-0.5' : 'text-[#2d1f4e]'"
            />
          </div>
        </div>
      </div>

      <!-- Common mistakes -->
      <div>
        <div class="flex items-center gap-2 mb-6">
          <AlertCircle class="w-3.5 h-3.5 text-[#e879f9]" />
          <p class="text-[11px] tracking-[.45em] uppercase text-[#7a6090] font-mono">Hindari</p>
        </div>
        <div class="grid sm:grid-cols-2 gap-2">
          <div
            v-for="m in mistakes"
            :key="m"
            class="flex items-start gap-3 p-4 bg-[#0a0318] border border-[#160f28] hover:border-[#2d1f4e] transition-colors duration-200"
          >
            <AlertCircle class="w-3.5 h-3.5 text-[#8060a0] flex-shrink-0 mt-0.5" />
            <p class="text-[13px] text-[#7a6090] leading-relaxed">{{ m }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
