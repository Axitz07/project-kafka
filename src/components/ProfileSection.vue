<script setup>
import { kafka } from '../data/kafka.js'
</script>

<template>
  <section id="profile" class="relative py-24 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-[#05030a] via-[#0d0818] to-[#05030a]"></div>
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_50%,rgba(124,58,237,0.08),transparent)]"></div>

    <div class="relative z-10 max-w-5xl mx-auto px-6">

      <!-- Section header -->
      <div class="flex items-center gap-4 mb-16">
        <div class="h-px flex-1 bg-gradient-to-r from-transparent to-[#2d1f4e]"></div>
        <span class="text-xs text-[#7c3aed] tracking-[0.4em] uppercase font-mono">— Profile —</span>
        <div class="h-px flex-1 bg-gradient-to-l from-transparent to-[#2d1f4e]"></div>
      </div>

      <div class="grid md:grid-cols-2 gap-12 items-start">

        <!-- Left: identity card -->
        <div class="border border-[#2d1f4e] bg-[#130d22] rounded-lg p-8 relative overflow-hidden"
             style="box-shadow: 0 0 40px rgba(124,58,237,0.1)">
          <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/60 to-transparent"></div>

          <!-- Name + rarity -->
          <div class="flex items-start justify-between mb-6">
            <div>
              <h2 class="text-3xl font-bold text-[#f1e8ff]" style="font-family:'Georgia',serif">
                {{ kafka.name }}
              </h2>
              <p class="text-[#a78bca] text-sm tracking-widest uppercase mt-1">{{ kafka.codename }}</p>
            </div>
            <div class="flex gap-0.5">
              <span v-for="i in kafka.rarity" :key="i" class="text-[#f59e0b] text-lg">★</span>
            </div>
          </div>

          <!-- Description -->
          <p class="text-[#a78bca] text-sm leading-relaxed mb-8">{{ kafka.description }}</p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 text-xs rounded border border-[#4a2d8a]/50 bg-[#4a2d8a]/20 text-[#c084fc] tracking-widest uppercase">
              ⚡ {{ kafka.element }}
            </span>
            <span class="px-3 py-1 text-xs rounded border border-[#2d1f4e] bg-[#1e1535] text-[#a78bca] tracking-widest uppercase">
              {{ kafka.path }}
            </span>
            <span class="px-3 py-1 text-xs rounded border border-[#2d1f4e] bg-[#1e1535] text-[#a78bca] tracking-widest uppercase">
              {{ kafka.faction }}
            </span>
          </div>
        </div>

        <!-- Right: base stats -->
        <div>
          <h3 class="text-xs text-[#6b4f8a] tracking-[0.4em] uppercase mb-6 font-mono">Base Stats</h3>
          <div class="flex flex-col gap-4">
            <div v-for="(value, key) in kafka.stats" :key="key">
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-xs text-[#a78bca] tracking-widest uppercase">{{ key }}</span>
                <span class="text-sm font-mono text-[#c084fc]">{{ value }}</span>
              </div>
              <div class="h-1 bg-[#1e1535] rounded-full overflow-hidden">
                <div class="h-full rounded-full bg-gradient-to-r from-[#7c3aed] to-[#e879f9] transition-all duration-700"
                     :style="{ width: `${Math.min((value / 1200) * 100, 100)}%` }">
                </div>
              </div>
            </div>
          </div>

          <!-- Quote card -->
          <div class="mt-8 p-4 border border-[#2d1f4e]/50 bg-[#0d0818] rounded">
            <p class="text-[#6b4f8a] text-xs tracking-widest uppercase mb-2 font-mono">— Quote —</p>
            <p class="text-[#a78bca] text-sm italic leading-relaxed">{{ kafka.quote }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
