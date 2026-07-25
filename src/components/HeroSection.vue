<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
const loaded = ref(false)
const imgLoaded = ref(false)

onMounted(() => setTimeout(() => { loaded.value = true }, 60))
</script>

<template>
  <section id="hero" class="relative w-full overflow-hidden bg-[#08050f]" style="min-height: 100svh;">

    <!-- Photo — bleeds full, anchored right-center -->
    <div class="absolute inset-0">
      <img
        :src="`${BASE}/assets/kafka/kafka-1.jpg`"
        alt="Kafka"
        @load="imgLoaded = true"
        class="absolute inset-0 w-full h-full object-cover object-[70%_center] transition-opacity duration-1000"
        :class="imgLoaded ? 'opacity-100' : 'opacity-0'"
      />
      <!-- Gradient — strong left fade so text is legible -->
      <div class="absolute inset-0" style="background: linear-gradient(105deg, #08050f 38%, #08050f99 58%, transparent 80%);"></div>
      <!-- Subtle bottom vignette -->
      <div class="absolute inset-0" style="background: linear-gradient(to top, #08050f 0%, transparent 35%);"></div>
    </div>

    <!-- Content -->
    <div
      class="relative z-10 flex flex-col justify-end pb-16 pt-28 px-8 md:px-16 lg:px-24"
      style="min-height: 100svh;"
    >
      <div
        class="max-w-lg transition-all duration-1000"
        :style="loaded ? 'opacity:1; transform:translateY(0)' : 'opacity:0; transform:translateY(24px)'"
      >
        <!-- Small eyebrow — no emoji, no badge, just type -->
        <p class="text-[11px] tracking-[0.55em] uppercase text-[#a08ab8] font-mono mb-6 leading-none">
          Honkai&nbsp;:&nbsp;Star Rail&nbsp;&nbsp;—&nbsp;&nbsp;Stellaron Hunters
        </p>

        <!-- Name — the whole hero IS the name -->
        <h1
          class="font-black leading-[0.88] select-none mb-7"
          style="
            font-family: 'Georgia', 'Times New Roman', serif;
            font-size: clamp(5rem, 18vw, 13rem);
            letter-spacing: -0.04em;
            color: #f0e8ff;
            text-shadow: 0 0 120px rgba(140,80,220,0.25);
          "
        >
          Kafka
        </h1>

        <!-- Quote — not "tagline", actual in-game dialogue -->
        <p class="text-[#8b7aa0] text-sm leading-relaxed mb-10 max-w-xs" style="font-style: italic;">
          "You won't remember a thing except me."
        </p>

        <!-- Actions — minimal, not pill buttons -->
        <div class="flex items-center gap-8">
          <a
            href="#profile"
            class="flex items-center gap-3 group"
          >
            <span
              class="block h-px bg-[#7c3aed] transition-all duration-500 group-hover:w-10"
              style="width: 28px;"
            ></span>
            <span class="text-[11px] tracking-[0.35em] uppercase text-[#c4a8e0] group-hover:text-white transition-colors duration-300 font-mono">
              Character
            </span>
          </a>
          <a
            href="#skills"
            class="text-[11px] tracking-[0.35em] uppercase text-[#5c4a6e] hover:text-[#9b7fc4] transition-colors duration-300 font-mono"
          >
            Build Guide
          </a>
        </div>
      </div>

      <!-- Bottom-right: stats inline — not a grid -->
      <div
        class="absolute bottom-10 right-8 md:right-16 lg:right-24 flex items-center gap-6 transition-all duration-1200"
        :style="loaded ? 'opacity:1' : 'opacity:0'"
        style="transition-delay: 400ms;"
      >
        <div class="text-right">
          <p class="text-[10px] text-[#4a3a5c] tracking-widest uppercase font-mono">Element</p>
          <p class="text-[13px] text-[#c084fc] font-mono tracking-wider">Lightning</p>
        </div>
        <div class="w-px h-6 bg-[#2d1f4e]"></div>
        <div class="text-right">
          <p class="text-[10px] text-[#4a3a5c] tracking-widest uppercase font-mono">Path</p>
          <p class="text-[13px] text-[#a78bca] font-mono tracking-wider">Nihility</p>
        </div>
        <div class="w-px h-6 bg-[#2d1f4e]"></div>
        <div class="text-right">
          <p class="text-[10px] text-[#4a3a5c] tracking-widest uppercase font-mono">Rarity</p>
          <p class="text-[13px] text-[#f59e0b] font-mono tracking-wider">5★</p>
        </div>
      </div>
    </div>
  </section>
</template>
