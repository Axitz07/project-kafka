<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

// ── Scroll reveal ──────────────────────────────────────────────────────
const heroRef  = ref(null)
const visible  = ref(false)
const imgLoaded = ref(false)

onMounted(() => {
  // Small delay so CSS transition fires after mount
  requestAnimationFrame(() => setTimeout(() => { visible.value = true }, 80))
})

// ── Subtle parallax on mouse ────────────────────────────────────────────
const px = ref(0)
const py = ref(0)
function onMove(e) {
  px.value = ((e.clientX / window.innerWidth)  - 0.5) * 18
  py.value = ((e.clientY / window.innerHeight) - 0.5) * 10
}
onMounted(() => window.addEventListener('mousemove', onMove, { passive: true }))
onUnmounted(() => window.removeEventListener('mousemove', onMove))
</script>

<template>
  <!-- kafka-1: 902×1260 — tall portrait, perfect for right-side bleed -->
  <section
    ref="heroRef"
    id="hero"
    class="relative w-full overflow-hidden bg-[#06030f]"
    style="min-height: 100svh;"
  >
    <!-- Photo — right half, full height -->
    <div
      class="absolute top-0 right-0 h-full w-[58%] hidden lg:block overflow-hidden"
      :style="`transform: translate(${px * -0.3}px, ${py * -0.2}px) scale(1.04);
               transition: transform 0.9s cubic-bezier(.25,.46,.45,.94);`"
    >
      <img
        :src="`${BASE}/assets/kafka/kafka-1.jpg`"
        alt="Kafka"
        @load="imgLoaded = true"
        class="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700"
        :class="imgLoaded ? 'opacity-100' : 'opacity-0'"
        style="filter: brightness(.52) saturate(.75);"
      />
      <!-- Fade out to the left -->
      <div class="absolute inset-0" style="background: linear-gradient(to right, #06030f 0%, #06030f20 22%, transparent 55%);"></div>
      <!-- Fade out at bottom -->
      <div class="absolute inset-0" style="background: linear-gradient(to top, #06030f 0%, transparent 40%);"></div>
    </div>

    <!-- Mobile bg -->
    <div class="absolute inset-0 lg:hidden">
      <img
        :src="`${BASE}/assets/kafka/kafka-1.jpg`"
        alt=""
        aria-hidden="true"
        class="w-full h-full object-cover object-[70%_top]"
        style="filter: brightness(.22) saturate(.6);"
      />
      <div class="absolute inset-0" style="background: linear-gradient(to top, #06030f 0%, transparent 50%);"></div>
    </div>

    <!-- Atmospheric purple glow top-left -->
    <div
      class="absolute top-0 left-0 w-[45%] h-[55%] pointer-events-none"
      style="background: radial-gradient(ellipse at 20% 30%, rgba(100,40,180,.07) 0%, transparent 65%);"
    ></div>

    <!-- Content — left-anchored, bottom of viewport -->
    <div
      class="relative z-10 flex flex-col justify-end px-8 md:px-14 lg:px-20 pb-16 md:pb-20 pt-28"
      style="min-height: 100svh;"
    >
      <div
        class="max-w-lg transition-all duration-1000"
        :style="visible
          ? 'opacity:1; transform:translateY(0)'
          : 'opacity:0; transform:translateY(28px)'"
      >
        <!-- Eyebrow -->
        <p class="text-xs tracking-[0.45em] uppercase font-mono text-[#7a5098] mb-8 leading-none">
          Honkai: Star Rail — Stellaron Hunters
        </p>

        <!-- Name — editorial, dominant -->
        <h1
          class="leading-[.88] font-black select-none mb-7"
          style="
            font-family: 'Georgia','Times New Roman',serif;
            font-size: clamp(5.5rem, 19vw, 14rem);
            letter-spacing: -.05em;
            color: #f0e8ff;
            text-shadow: 0 0 100px rgba(130,70,200,.2);
          "
        >Kafka</h1>

        <!-- Quote — bigger, more legible -->
        <p
          class="text-[#9b8cb4] text-base leading-relaxed mb-14 max-w-sm"
          style="font-style:italic;"
        >"You won't remember a thing except me."</p>

        <!-- Two actions -->
        <div class="flex items-center gap-10">
          <a href="#profile" class="group flex items-center gap-3">
            <span
              class="block h-px bg-[#7c3aed]/60 transition-all duration-500 group-hover:w-12 group-hover:bg-[#b07aee]"
              style="width:24px;"
            ></span>
            <span class="text-xs tracking-[.35em] uppercase font-mono text-[#c4a8e0] group-hover:text-white transition-colors duration-300">
              Character
            </span>
          </a>
          <a href="#skills" class="text-xs tracking-[.35em] uppercase font-mono text-[#5a4870] hover:text-[#9b7fc4] transition-colors duration-300">
            Build Guide
          </a>
        </div>
      </div>

      <!-- Bottom-right stats strip — inline, no grid -->
      <div
        class="absolute bottom-8 right-8 md:right-14 lg:right-20 flex items-center gap-5 transition-all duration-1000"
        :style="visible ? 'opacity:1' : 'opacity:0'"
        style="transition-delay:500ms;"
      >
        <div class="text-right">
          <p class="text-[9px] text-[#4a3a5c] tracking-widest uppercase font-mono leading-none mb-1">Element</p>
          <p class="text-[12px] text-[#c084fc] font-mono tracking-wider">Lightning</p>
        </div>
        <div class="w-px h-5 bg-[#2d1f4e]"></div>
        <div class="text-right">
          <p class="text-[9px] text-[#4a3a5c] tracking-widest uppercase font-mono leading-none mb-1">Path</p>
          <p class="text-[12px] text-[#a78bca] font-mono tracking-wider">Nihility</p>
        </div>
        <div class="w-px h-5 bg-[#2d1f4e]"></div>
        <div class="text-right">
          <p class="text-[9px] text-[#4a3a5c] tracking-widest uppercase font-mono leading-none mb-1">Rarity</p>
          <p class="text-[12px] text-[#f59e0b] font-mono tracking-wider">5★</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes flicker {
  0%,80%,100%{opacity:0}
  81%,83%{opacity:.7}
  84%{opacity:.1}
  85%,87%{opacity:.5}
  88%,100%{opacity:0}
}
</style>
