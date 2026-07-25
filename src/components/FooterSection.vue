<script setup>
import { kafka } from '../data/kafka.js'
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
</script>

<template>
  <footer class="relative bg-[#06030f] border-t border-[#1a1030]">

    <!-- Main footer content -->
    <div class="max-w-6xl mx-auto px-8 md:px-14 lg:px-20">

      <!-- Top section: split layout -->
      <div class="grid md:grid-cols-[1fr_auto] gap-12 py-16 md:py-20">

        <!-- Left: character identity -->
        <div class="max-w-sm">
          <h3 class="font-black text-[#f0e8ff] mb-2 tracking-tight"
              style="font-family:'Georgia',serif; font-size:1.6rem; letter-spacing:-.02em;">
            {{ kafka.name }}
          </h3>
          <p class="text-[#6b4f8a] text-sm mb-8">{{ kafka.faction }} — {{ kafka.path }}</p>

          <p class="text-[#4a3a5e] text-xs leading-relaxed max-w-xs">
            Halaman dedikasi untuk Kafka dari Honkai: Star Rail.
            Berisi profil karakter, analisis kit, dan panduan build.
          </p>
        </div>

        <!-- Right: quick nav -->
        <div class="flex flex-col gap-3 md:items-end">
          <p class="text-[10px] tracking-[.55em] uppercase font-mono text-[#4a3a5e] mb-2">Navigate</p>
          <a href="#hero"    class="text-sm text-[#6b4f8a] hover:text-[#c084fc] transition-colors duration-200 font-mono tracking-wide">Home</a>
          <a href="#profile" class="text-sm text-[#6b4f8a] hover:text-[#c084fc] transition-colors duration-200 font-mono tracking-wide">Profile</a>
          <a href="#skills"  class="text-sm text-[#6b4f8a] hover:text-[#c084fc] transition-colors duration-200 font-mono tracking-wide">Skills</a>
          <a href="#build"   class="text-sm text-[#6b4f8a] hover:text-[#c084fc] transition-colors duration-200 font-mono tracking-wide">Build</a>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-[#1a1030] py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

        <!-- Left: rarity -->
        <div class="flex items-center gap-2">
          <div class="flex gap-0.5">
            <span v-for="i in kafka.rarity" :key="i" class="text-[#f59e0b] text-sm leading-none">★</span>
          </div>
          <span class="text-[#3d2d50] text-xs font-mono">{{ kafka.element }} · {{ kafka.path }}</span>
        </div>

        <!-- Right: credit -->
        <p class="text-[#3a2d4a] text-xs font-mono tracking-wide">
          Honkai: Star Rail © HoYoverse. Fan-made, not affiliated.
        </p>
      </div>
    </div>
  </footer>
</template>
