<script setup>
import { kafka } from '../data/kafka.js'
</script>

<template>
  <section id="skills" class="relative py-24 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-[#0d0818] via-[#05030a] to-[#0d0818]"></div>
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(124,58,237,0.08),transparent)]"></div>

    <div class="relative z-10 max-w-5xl mx-auto px-6">

      <!-- Section header -->
      <div class="flex items-center gap-4 mb-16">
        <div class="h-px flex-1 bg-gradient-to-r from-transparent to-[#2d1f4e]"></div>
        <span class="text-xs text-[#7c3aed] tracking-[0.4em] uppercase font-mono">— Skills & Build —</span>
        <div class="h-px flex-1 bg-gradient-to-l from-transparent to-[#2d1f4e]"></div>
      </div>

      <!-- Skills grid -->
      <div class="mb-20">
        <h3 class="text-xs text-[#6b4f8a] tracking-[0.4em] uppercase font-mono mb-8">Skills</h3>
        <div class="grid sm:grid-cols-2 gap-4">
          <div v-for="skill in kafka.skills" :key="skill.name"
               class="border border-[#2d1f4e] bg-[#130d22] rounded-lg p-6 hover:border-[#7c3aed]/40 transition-all duration-200 relative overflow-hidden group"
               style="box-shadow: 0 0 20px rgba(124,58,237,0.05)">
            <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <!-- Type badge -->
            <span class="inline-block px-2 py-0.5 text-[10px] rounded border mb-3 tracking-widest uppercase font-mono"
                  :class="{
                    'border-[#f59e0b]/40 text-[#f59e0b] bg-[#f59e0b]/5': skill.type === 'Ultimate',
                    'border-[#e879f9]/40 text-[#e879f9] bg-[#e879f9]/5': skill.type === 'Skill',
                    'border-[#2d1f4e] text-[#6b4f8a] bg-transparent': skill.type === 'Basic ATK',
                    'border-[#7c3aed]/40 text-[#c084fc] bg-[#7c3aed]/5': skill.type === 'Talent',
                  }">
              {{ skill.type }}
            </span>

            <h4 class="text-sm font-semibold text-[#f1e8ff] mb-2 tracking-wide">{{ skill.name }}</h4>
            <p class="text-xs text-[#6b4f8a] leading-relaxed">{{ skill.description }}</p>
          </div>
        </div>
      </div>

      <!-- Light Cones -->
      <div class="mb-20">
        <h3 class="text-xs text-[#6b4f8a] tracking-[0.4em] uppercase font-mono mb-8">Recommended Light Cones</h3>
        <div class="flex flex-col gap-3">
          <div v-for="lc in kafka.lightCones" :key="lc.name"
               class="flex items-center gap-4 p-4 border rounded-lg transition-all duration-200"
               :class="lc.recommended
                 ? 'border-[#f59e0b]/40 bg-[#f59e0b]/5 hover:border-[#f59e0b]/60'
                 : 'border-[#2d1f4e] bg-[#130d22] hover:border-[#2d1f4e]/80'">
            <!-- Stars -->
            <div class="flex-shrink-0 w-10 text-center">
              <div class="text-xs font-mono" :class="lc.rarity === 5 ? 'text-[#f59e0b]' : 'text-[#a78bca]'">
                {{ lc.rarity }}★
              </div>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-0.5">
                <h4 class="text-sm font-semibold text-[#f1e8ff]">{{ lc.name }}</h4>
                <span v-if="lc.recommended"
                      class="text-[10px] px-2 py-0.5 rounded bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#f59e0b] tracking-widest uppercase font-mono">
                  BIS
                </span>
              </div>
              <p class="text-xs text-[#6b4f8a]">{{ lc.note }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Relics -->
      <div>
        <h3 class="text-xs text-[#6b4f8a] tracking-[0.4em] uppercase font-mono mb-8">Recommended Relics</h3>
        <div class="grid sm:grid-cols-2 gap-4">
          <div v-for="relic in kafka.relics" :key="relic.set"
               class="border border-[#2d1f4e] bg-[#130d22] rounded-lg p-5 hover:border-[#7c3aed]/30 transition-all duration-200">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xs font-mono text-[#7c3aed] border border-[#4a2d8a]/50 bg-[#4a2d8a]/20 px-2 py-0.5 rounded">
                {{ relic.pieces }}pc
              </span>
              <h4 class="text-sm font-semibold text-[#f1e8ff]">{{ relic.set }}</h4>
            </div>
            <p class="text-xs text-[#6b4f8a] leading-relaxed">{{ relic.reason }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
