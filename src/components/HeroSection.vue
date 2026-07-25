<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
const mouseX = ref(0)
const mouseY = ref(0)
const isLoaded = ref(false)

function handleMouseMove(e) {
  mouseX.value = (e.clientX / window.innerWidth - 0.5) * 20
  mouseY.value = (e.clientY / window.innerHeight - 0.5) * 10
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  setTimeout(() => { isLoaded.value = true }, 80)
})
onUnmounted(() => window.removeEventListener('mousemove', handleMouseMove))
</script>

<template>
  <section id="hero" class="relative min-h-screen overflow-hidden bg-[#03010a]">

    <!-- Primary photo — right side, bleeding edge -->
    <div class="absolute top-0 right-0 w-[55%] h-full hidden lg:block"
         :style="{ transform: `translate(${mouseX * -0.3}px, ${mouseY * -0.2}px) scale(1.04)` }"
         style="transition: transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)">
      <img :src="`${BASE}/assets/kafka/kafka-1.jpg`"
           alt="Kafka"
           class="w-full h-full object-cover object-top"
           style="filter: brightness(0.5) saturate(0.75);" />
      <!-- Fade left -->
      <div class="absolute inset-0"
           style="background: linear-gradient(to right, #03010a 0%, #03010a 5%, transparent 45%);"></div>
      <!-- Fade bottom -->
      <div class="absolute inset-0"
           style="background: linear-gradient(to top, #03010a 0%, transparent 40%);"></div>
    </div>

    <!-- Mobile background -->
    <div class="absolute inset-0 lg:hidden">
      <img :src="`${BASE}/assets/kafka/kafka-1.jpg`"
           alt=""
           class="w-full h-full object-cover object-top"
           style="filter: brightness(0.25) saturate(0.6);" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#03010a] via-[#03010a]/70 to-transparent"></div>
    </div>

    <!-- Lightning flicker — subtle, CSS only -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute w-px bg-gradient-to-b from-transparent via-[#e879f9]/50 to-transparent"
           style="left: 62%; top: 10%; height: 35%; animation: flicker 9s ease-in-out infinite;"></div>
    </div>

    <!-- Purple atmospheric -->
    <div class="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
         style="background: radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%); filter: blur(60px);"></div>

    <!-- Top line -->
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/25 to-transparent"></div>

    <!-- Content — bottom-left anchored -->
    <div class="relative z-10 min-h-screen flex items-end pb-20 pt-24">
      <div class="w-full max-w-6xl mx-auto px-8">

        <div class="max-w-xl"
             :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
             style="transition: all 1.1s cubic-bezier(0.16,1,0.3,1)">

          <!-- Eyebrow — teks kecil, bukan badge bulat -->
          <div class="flex items-center gap-3 mb-10">
            <div class="w-5 h-px bg-[#e879f9]/60"></div>
            <span class="text-[10px] text-[#6b4f8a] tracking-[0.5em] uppercase font-mono">Honkai: Star Rail</span>
            <span class="text-[#2d1f4e] text-[10px]">·</span>
            <span class="text-[10px] text-[#6b4f8a] tracking-[0.4em] uppercase font-mono">Stellaron Hunters</span>
          </div>

          <!-- Name — editorial, dominant -->
          <h1 class="leading-none select-none mb-8"
              style="font-family:'Georgia',serif;">
            <span class="block font-black text-[#f1e8ff]"
                  style="font-size: clamp(5.5rem, 20vw, 15rem); letter-spacing: -0.05em; text-shadow: 0 0 80px rgba(192,132,252,0.2);">
              Kafka
            </span>
          </h1>

          <!-- Description — bukan stats grid -->
          <p class="text-[#a78bca] text-sm leading-relaxed mb-12 max-w-sm"
             style="font-style: italic;">
            "You won't remember a thing except me."
          </p>

          <!-- Tags — horizontal list kecil, bukan pills -->
          <div class="flex items-center gap-5 mb-14">
            <span class="text-[10px] text-[#6b4f8a] tracking-[0.4em] uppercase font-mono">⚡ Lightning</span>
            <span class="text-[#2d1f4e]">·</span>
            <span class="text-[10px] text-[#6b4f8a] tracking-[0.4em] uppercase font-mono">Nihility</span>
            <span class="text-[#2d1f4e]">·</span>
            <span class="text-[10px] text-[#6b4f8a] tracking-[0.4em] uppercase font-mono">5★</span>
          </div>

          <!-- CTA — directional arrow bukan button kotak -->
          <div class="flex items-center gap-10">
            <a href="#profile"
               class="group flex items-center gap-4 transition-all duration-300">
              <span class="w-10 h-px bg-[#7c3aed]/60 group-hover:w-16 group-hover:bg-[#c084fc] transition-all duration-500"></span>
              <span class="text-xs text-[#a78bca] group-hover:text-[#f1e8ff] tracking-[0.3em] uppercase font-mono transition-colors duration-300">
                Profile
              </span>
            </a>
            <a href="#skills"
               class="text-[10px] text-[#6b4f8a] hover:text-[#a78bca] tracking-[0.3em] uppercase font-mono transition-colors duration-300">
              Build →
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom line -->
    <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2d1f4e]/60 to-transparent"></div>
  </section>
</template>

<style scoped>
@keyframes flicker {
  0%, 80%, 100% { opacity: 0; }
  81%, 83% { opacity: 0.8; }
  84% { opacity: 0.1; }
  85%, 87% { opacity: 0.6; }
  88%, 100% { opacity: 0; }
}
</style>
