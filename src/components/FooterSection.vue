<script setup>
import { kafka } from '../data/kafka.js'
</script>

<template>
  <footer class="relative border-t border-[#2d1f4e]/60 py-12 overflow-hidden">
    <div class="absolute inset-0 bg-[#05030a]"></div>
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(124,58,237,0.04),transparent)]"></div>

    <div class="relative z-10 max-w-5xl mx-auto px-6">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">

        <!-- Brand -->
        <div class="flex items-center gap-3">
          <span class="text-[#e879f9] text-lg" style="text-shadow: 0 0 15px rgba(232,121,249,0.5)">⚡</span>
          <div>
            <p class="text-sm font-bold text-[#f1e8ff] tracking-widest uppercase"
               style="font-family:'Georgia',serif">{{ kafka.name }}</p>
            <p class="text-[10px] text-[#6b4f8a] tracking-widest uppercase font-mono">{{ kafka.faction }}</p>
          </div>
        </div>

        <!-- Element + path -->
        <div class="flex items-center gap-4 text-xs text-[#6b4f8a] tracking-widest uppercase font-mono">
          <span class="text-[#e879f9]">⚡ {{ kafka.element }}</span>
          <span class="text-[#2d1f4e]">·</span>
          <span>☽ {{ kafka.path }}</span>
          <span class="text-[#2d1f4e]">·</span>
          <span>★ {{ kafka.rarity }}</span>
        </div>

        <!-- Rarity stars -->
        <div class="flex gap-0.5">
          <span v-for="i in kafka.rarity" :key="i" class="text-[#f59e0b] text-xs">★</span>
        </div>
      </div>

      <!-- Bottom -->
      <div class="mt-8 pt-8 border-t border-[#2d1f4e]/40 text-center">
        <p class="text-[10px] text-[#6b4f8a] tracking-widest uppercase font-mono">
          Made with 💜 — untuk waifu terbaik di Honkai: Star Rail.
        </p>
      </div>
    </div>
  </footer>
</template>
