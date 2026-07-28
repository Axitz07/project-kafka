<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const BASE    = import.meta.env.BASE_URL.replace(/\/$/, '')
const show    = ref(false)
const imgOk   = ref(false)
const px      = ref(0)
const py      = ref(0)

function onMove(e) {
  px.value = (e.clientX / window.innerWidth  - 0.5) * 16
  py.value = (e.clientY / window.innerHeight - 0.5) * 8
}

onMounted(() => {
  window.addEventListener('mousemove', onMove, { passive: true })
  requestAnimationFrame(() => setTimeout(() => { show.value = true }, 80))
})
onUnmounted(() => window.removeEventListener('mousemove', onMove))
</script>

<template>
  <section id="hero" class="relative w-full overflow-hidden bg-[#05030a]" style="min-height:100svh;">

    <!-- Photo — portrait kafka-1 (902×1260) right-half bleed -->
    <div
      class="absolute top-0 right-0 h-full w-[52%] hidden lg:block overflow-hidden"
      :style="`transform:translate(${px*-0.25}px,${py*-0.18}px) scale(1.04);
               transition:transform 1s cubic-bezier(.25,.46,.45,.94);`"
    >
      <img
        :src="`${BASE}/assets/kafka/kafka-1.jpg`"
        alt="Kafka"
        @load="imgOk=true"
        class="absolute inset-0 w-full h-full object-cover object-[40%_top] transition-opacity duration-700"
        :class="imgOk?'opacity-100':'opacity-0'"
        style="filter:brightness(.45) saturate(.7);"
      />
      <div class="absolute inset-0" style="background:linear-gradient(to right,#05030a 0%,#05030a10 18%,transparent 50%);"></div>
      <div class="absolute inset-0" style="background:linear-gradient(to top,#05030a 0%,transparent 35%);"></div>
    </div>

    <!-- Mobile bg -->
    <div class="absolute inset-0 lg:hidden">
      <img :src="`${BASE}/assets/kafka/kafka-1.jpg`" alt="" aria-hidden="true"
           class="w-full h-full object-cover object-[60%_top]"
           style="filter:brightness(.2) saturate(.5);"/>
      <div class="absolute inset-0" style="background:linear-gradient(to top,#05030a 0%,transparent 50%);"></div>
    </div>

    <!-- Atmospheric purple -->
    <div class="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
         style="background:radial-gradient(circle,rgba(100,40,180,.06) 0%,transparent 65%);filter:blur(60px);"></div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col justify-end px-8 md:px-14 lg:px-20 pb-20 pt-28"
         style="min-height:100svh;">
      <div class="max-w-lg transition-all duration-1000"
           :style="show?'opacity:1;transform:translateY(0)':'opacity:0;transform:translateY(24px)'">

        <!-- Eyebrow -->
        <p class="text-xs tracking-[.45em] uppercase text-[#7a6090] mb-8 font-light">
          Honkai: Star Rail &ensp;/&ensp; Stellaron Hunters
        </p>

        <!-- Name — Cormorant Garamond, dominant -->
        <h1 class="leading-[.85] font-bold select-none mb-6"
            style="font-family:'Cormorant Garamond',Georgia,serif;
                   font-size:clamp(5rem,18vw,13rem);
                   letter-spacing:-.04em;
                   color:#f1e8ff;">
          Kafka
        </h1>

        <!-- Quote — italic, secondary color -->
        <p class="mb-12 max-w-xs leading-relaxed text-[#7a6090]"
           style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.05rem;font-style:italic;">
          "You won't remember a thing except me."
        </p>

        <!-- Actions -->
        <div class="flex items-center gap-8">
          <a href="#profile" class="group flex items-center gap-3">
            <span class="h-px bg-[#7c3aed]/50 group-hover:w-10 group-hover:bg-[#c084fc] transition-all duration-500"
                  style="width:20px;"></span>
            <span class="text-xs tracking-[.35em] uppercase text-[#a08ab8] group-hover:text-[#f1e8ff] transition-colors duration-300">
              Character
            </span>
          </a>
          <a href="#skills"
             class="text-xs tracking-[.35em] uppercase text-[#4a3a5e] hover:text-[#7a6090] transition-colors duration-300">
            Build Guide
          </a>
        </div>
      </div>

      <!-- Bottom-right stats — inline, minimal -->
      <div class="absolute bottom-8 right-8 md:right-14 lg:right-20 hidden md:flex items-center gap-5"
           :style="show?'opacity:1':'opacity:0'"
           style="transition:opacity 1s ease .6s;">
        <div class="text-right">
          <p class="text-[9px] text-[#3d2d50] tracking-widest uppercase font-mono mb-0.5">Element</p>
          <p class="text-xs text-[#c084fc] font-mono">Lightning</p>
        </div>
        <div class="w-px h-5 bg-[#2d1f4e]"></div>
        <div class="text-right">
          <p class="text-[9px] text-[#3d2d50] tracking-widest uppercase font-mono mb-0.5">Path</p>
          <p class="text-xs text-[#a08ab8] font-mono">Nihility</p>
        </div>
        <div class="w-px h-5 bg-[#2d1f4e]"></div>
        <div class="text-right">
          <p class="text-[9px] text-[#3d2d50] tracking-widest uppercase font-mono mb-0.5">Rarity</p>
          <p class="text-xs text-[#f59e0b] font-mono">5 ★</p>
        </div>
      </div>
    </div>
  </section>
</template>
