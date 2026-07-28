<script setup>
import { kafka } from '../data/kafka.js'
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
</script>

<template>
  <footer class="relative bg-[#05030a] border-t border-[#1a1030]">
    <div class="max-w-6xl mx-auto px-8 md:px-14 lg:px-20">

      <!-- Main content -->
      <div class="grid md:grid-cols-[1fr_auto] gap-12 py-16 md:py-20">

        <!-- Left: identity -->
        <div class="max-w-sm">
          <h3 class="font-semibold text-[#f1e8ff] leading-none mb-2"
              style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.8rem;letter-spacing:-.02em;">
            {{ kafka.name }}
          </h3>
          <p class="text-[#4a3a5e] text-xs font-mono tracking-widest mb-6">
            {{ kafka.faction }} · {{ kafka.path }} · {{ kafka.element }}
          </p>
          <p class="text-[#4a3a5e] text-sm leading-relaxed">
            Halaman dedikasi untuk Kafka dari Honkai: Star Rail.
            Profil karakter, analisis kit, dan panduan build.
          </p>
        </div>

        <!-- Right: nav links -->
        <div class="flex flex-col gap-3 md:items-end">
          <p class="text-[10px] tracking-[.5em] uppercase font-mono text-[#3d2d50] mb-2">Navigate</p>
          <a href="#hero"    class="text-sm text-[#5a4870] hover:text-[#f1e8ff] transition-colors duration-200 font-mono tracking-wide">Home</a>
          <a href="#profile" class="text-sm text-[#5a4870] hover:text-[#f1e8ff] transition-colors duration-200 font-mono tracking-wide">Character</a>
          <a href="#skills"  class="text-sm text-[#5a4870] hover:text-[#f1e8ff] transition-colors duration-200 font-mono tracking-wide">Build</a>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-[#1a1030] py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <div class="flex gap-0.5">
            <span v-for="i in kafka.rarity" :key="i" class="text-[#f59e0b] text-sm leading-none">★</span>
          </div>
          <span class="text-[#2d1f4e] text-xs font-mono ml-1">{{ kafka.element }} · {{ kafka.path }}</span>
        </div>
        <p class="text-[#2d1f4e] text-xs font-mono">
          Honkai: Star Rail © HoYoverse. Fan-made, not affiliated.
        </p>
      </div>
    </div>
  </footer>
</template>
