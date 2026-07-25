<script setup>
import { ref } from 'vue'
import { kafka } from '../data/kafka.js'

const activeSkill = ref(null)
const activeLc = ref(0)

const skillTypes = {
  'Basic ATK': { color: '#6b4f8a', bg: 'rgba(107,79,138,0.1)', border: 'rgba(107,79,138,0.3)' },
  'Skill': { color: '#e879f9', bg: 'rgba(232,121,249,0.08)', border: 'rgba(232,121,249,0.3)' },
  'Ultimate': { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.3)' },
  'Talent': { color: '#c084fc', bg: 'rgba(192,132,252,0.08)', border: 'rgba(192,132,252,0.3)' },
}

// Extra data from deep research
const gameplay = {
  loop: [
    'Apply DoT via partner or Ultimate',
    'Kafka Skill → detonate all active DoTs',
    'Partner reapplies DoT',
    'Kafka Skill again at peak DoT value',
    'Ultimate when Energy reaches max',
    'Repeat — never waste Skill on zero DoT',
  ],
  statPriority: [
    { stat: 'SPD', note: 'Tertinggi — lebih banyak aksi = lebih banyak detonation' },
    { stat: 'ATK%', note: 'Main stat body & rope' },
    { stat: 'Lightning DMG%', note: 'Sphere main stat' },
    { stat: 'Effect Hit Rate', note: 'Min 30% untuk Shock konsisten' },
  ],
  mistakes: [
    'Build Crit Rate/DMG seperti DPS konvensional',
    'Gunakan Skill sebelum DoT aktif di musuh',
    'SPD terlalu rendah — sedikit aksi = sedikit detonation',
    'Main solo tanpa partner DoT',
  ],
}
</script>

<template>
  <section id="skills" class="relative py-32 overflow-hidden bg-[#03010a]">
    <div class="absolute inset-0 bg-gradient-to-b from-[#03010a] via-[#07030f] to-[#03010a]"></div>
    <div class="absolute right-0 top-1/4 w-96 h-96 rounded-full pointer-events-none"
         style="background: radial-gradient(circle, rgba(232,121,249,0.04) 0%, transparent 70%); filter: blur(60px);"></div>

    <div class="relative z-10 max-w-6xl mx-auto px-8">

      <!-- Section label -->
      <div class="flex items-center gap-4 mb-20">
        <span class="text-[10px] text-[#6b4f8a] tracking-[0.6em] uppercase font-mono">02</span>
        <div class="h-px flex-1 max-w-16 bg-[#2d1f4e]"></div>
        <span class="text-xs text-[#7c3aed] tracking-[0.4em] uppercase font-mono">Skills & Build</span>
      </div>

      <!-- Philosophy block -->
      <div class="mb-20 max-w-3xl">
        <blockquote class="text-2xl md:text-3xl text-[#a78bca] leading-relaxed font-light"
                    style="font-style: italic;">
          "Kafka tidak membuat DoT menjadi lebih kuat hanya dengan memberikan DoT.
          <span class="text-[#c084fc]"> Ia membuat waktu itu sendiri menjadi senjata.</span>"
        </blockquote>
      </div>

      <!-- Skills grid -->
      <div class="mb-24">
        <h3 class="text-[10px] text-[#6b4f8a] tracking-[0.5em] uppercase font-mono mb-8">Active Skills</h3>
        <div class="grid sm:grid-cols-2 gap-3">
          <div v-for="skill in kafka.skills" :key="skill.name"
               class="group relative p-6 cursor-pointer transition-all duration-300"
               :class="activeSkill === skill.name ? 'border' : 'border'"
               :style="{
                 borderColor: activeSkill === skill.name
                   ? skillTypes[skill.type]?.border ?? 'rgba(124,58,237,0.4)'
                   : 'rgba(45,31,78,0.6)',
                 background: activeSkill === skill.name
                   ? skillTypes[skill.type]?.bg ?? 'rgba(124,58,237,0.05)'
                   : 'rgba(10,5,21,0.8)',
               }"
               @mouseenter="activeSkill = skill.name"
               @mouseleave="activeSkill = null">

            <!-- Type badge -->
            <div class="flex items-center justify-between mb-4">
              <span class="text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 border"
                    :style="{
                      color: skillTypes[skill.type]?.color ?? '#a78bca',
                      borderColor: skillTypes[skill.type]?.border ?? 'rgba(107,79,138,0.3)',
                      background: skillTypes[skill.type]?.bg ?? 'transparent',
                    }">
                {{ skill.type }}
              </span>
              <!-- Animated corner on hover -->
              <div class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                   :style="{ borderTop: `1px solid ${skillTypes[skill.type]?.color ?? '#c084fc'}`, borderRight: `1px solid ${skillTypes[skill.type]?.color ?? '#c084fc'}` }"></div>
            </div>

            <h4 class="text-sm font-semibold text-[#f1e8ff] mb-3 tracking-wide">{{ skill.name }}</h4>
            <p class="text-xs text-[#6b4f8a] leading-relaxed group-hover:text-[#a78bca] transition-colors duration-300">
              {{ skill.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Gameplay Loop -->
      <div class="mb-24 grid lg:grid-cols-2 gap-12">
        <div>
          <h3 class="text-[10px] text-[#6b4f8a] tracking-[0.5em] uppercase font-mono mb-8">Gameplay Loop</h3>
          <div class="relative">
            <!-- Vertical line -->
            <div class="absolute left-2 top-0 bottom-0 w-px bg-[#2d1f4e]"></div>
            <div class="space-y-4">
              <div v-for="(step, i) in gameplay.loop" :key="i"
                   class="flex items-start gap-4 pl-8 relative group">
                <div class="absolute left-0 top-1.5 w-4 h-4 flex items-center justify-center">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#7c3aed] group-hover:bg-[#e879f9] transition-colors duration-200"
                       style="box-shadow: 0 0 6px rgba(124,58,237,0.5)"></div>
                </div>
                <p class="text-xs text-[#6b4f8a] group-hover:text-[#a78bca] transition-colors duration-200 leading-relaxed pt-0.5">
                  <span class="text-[#3d3d5c] font-mono mr-2">{{ String(i + 1).padStart(2, '0') }}</span>
                  {{ step }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Stat Priority -->
        <div>
          <h3 class="text-[10px] text-[#6b4f8a] tracking-[0.5em] uppercase font-mono mb-8">Stat Priority</h3>
          <div class="space-y-3">
            <div v-for="(item, i) in gameplay.statPriority" :key="item.stat"
                 class="flex items-start gap-4 p-4 border border-[#1e1535] bg-[#07030f] hover:border-[#7c3aed]/30 transition-all duration-200 group">
              <span class="text-[10px] text-[#3d3d5c] font-mono w-4 flex-shrink-0 mt-0.5">{{ i + 1 }}</span>
              <div>
                <p class="text-xs font-mono text-[#c084fc] mb-1">{{ item.stat }}</p>
                <p class="text-[10px] text-[#6b4f8a] group-hover:text-[#a78bca] transition-colors">{{ item.note }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Light Cones -->
      <div class="mb-20">
        <h3 class="text-[10px] text-[#6b4f8a] tracking-[0.5em] uppercase font-mono mb-8">Light Cones</h3>
        <div class="flex flex-col gap-2">
          <div v-for="(lc, i) in kafka.lightCones" :key="lc.name"
               class="flex items-center gap-5 p-5 border cursor-pointer transition-all duration-200"
               :class="activeLc === i ? 'border-[#c084fc]/30 bg-[#130d22]' : 'border-[#1e1535] bg-[#07030f] hover:border-[#2d1f4e]'"
               @click="activeLc = i">
            <div class="text-center w-8 flex-shrink-0">
              <span class="text-xs font-mono"
                    :class="lc.rarity === 5 ? 'text-[#f59e0b]' : 'text-[#a78bca]'">
                {{ lc.rarity }}★
              </span>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="text-sm text-[#f1e8ff] font-medium">{{ lc.name }}</h4>
                <span v-if="lc.recommended"
                      class="text-[9px] px-2 py-0.5 border border-[#f59e0b]/40 text-[#f59e0b] bg-[#f59e0b]/5 tracking-widest uppercase font-mono">
                  BIS
                </span>
              </div>
              <p class="text-[10px] text-[#6b4f8a]">{{ lc.note }}</p>
            </div>
            <div class="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-200"
                 :class="activeLc === i ? 'bg-[#c084fc]' : 'bg-[#2d1f4e]'"></div>
          </div>
        </div>
      </div>

      <!-- Common Mistakes -->
      <div>
        <h3 class="text-[10px] text-[#6b4f8a] tracking-[0.5em] uppercase font-mono mb-8">Kesalahan Umum</h3>
        <div class="grid sm:grid-cols-2 gap-3">
          <div v-for="(mistake, i) in gameplay.mistakes" :key="i"
               class="flex items-start gap-4 p-4 border border-[#1e1535] bg-[#07030f]">
            <span class="text-[#e879f9]/40 text-xs font-mono flex-shrink-0 mt-0.5">✕</span>
            <p class="text-xs text-[#6b4f8a] leading-relaxed">{{ mistake }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
