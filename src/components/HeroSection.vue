<script setup>
import { kafka } from '../data/kafka.js'
</script>

<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">

    <!-- Background layers -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#0d0818] via-[#05030a] to-[#05030a]"></div>
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(124,58,237,0.15),transparent)]"></div>
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-px h-64 bg-gradient-to-b from-[#7c3aed]/60 to-transparent"></div>

    <!-- Floating orbs -->
    <div class="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#7c3aed]/5 blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#e879f9]/5 blur-3xl pointer-events-none"></div>

    <!-- Content -->
    <div class="relative z-10 max-w-4xl mx-auto px-6 text-center">

      <!-- Faction badge -->
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2d1f4e] bg-[#130d22] mb-8">
        <span class="w-1.5 h-1.5 rounded-full bg-[#e879f9] animate-pulse"></span>
        <span class="text-xs text-[#a78bca] tracking-[0.3em] uppercase">{{ kafka.faction }}</span>
        <span class="w-1.5 h-1.5 rounded-full bg-[#e879f9] animate-pulse"></span>
      </div>

      <!-- Name -->
      <h1 class="text-7xl md:text-9xl font-bold tracking-tight mb-4 select-none"
          style="font-family:'Georgia',serif; text-shadow: 0 0 40px rgba(192,132,252,0.5), 0 0 80px rgba(124,58,237,0.3)">
        <span class="text-transparent bg-clip-text bg-gradient-to-b from-[#f1e8ff] via-[#c084fc] to-[#7c3aed]">
          {{ kafka.name }}
        </span>
      </h1>

      <!-- Title -->
      <p class="text-[#a78bca] tracking-[0.4em] uppercase text-sm mb-2">{{ kafka.title }}</p>
      <div class="flex items-center justify-center gap-3 mb-10">
        <div class="h-px w-16 bg-gradient-to-r from-transparent to-[#7c3aed]/60"></div>
        <span class="text-[#e879f9] text-xs tracking-widest">⚡ {{ kafka.element }}</span>
        <span class="text-[#2d1f4e]">·</span>
        <span class="text-[#a78bca] text-xs tracking-widest">☽ {{ kafka.path }}</span>
        <div class="h-px w-16 bg-gradient-to-l from-transparent to-[#7c3aed]/60"></div>
      </div>

      <!-- Quote -->
      <blockquote class="max-w-xl mx-auto text-[#a78bca] italic text-lg leading-relaxed mb-12 px-4
                         border-l-2 border-[#7c3aed]/40 text-left">
        {{ kafka.quote }}
      </blockquote>

      <!-- CTA buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="#profile"
           class="px-8 py-3 rounded border border-[#7c3aed]/60 bg-[#7c3aed]/10 text-[#c084fc]
                  text-sm tracking-widest uppercase hover:bg-[#7c3aed]/20 hover:border-[#9d5cf6]
                  transition-all duration-300"
           style="box-shadow: 0 0 20px rgba(124,58,237,0.2)">
          Lihat Profil
        </a>
        <a href="#skills"
           class="px-8 py-3 rounded border border-[#2d1f4e] text-[#6b4f8a]
                  text-sm tracking-widest uppercase hover:border-[#7c3aed]/40 hover:text-[#a78bca]
                  transition-all duration-300">
          Build Guide
        </a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
      <span class="text-[10px] text-[#6b4f8a] tracking-widest uppercase">Scroll</span>
      <div class="w-px h-12 bg-gradient-to-b from-[#7c3aed]/60 to-transparent"></div>
    </div>
  </section>
</template>
