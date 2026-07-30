<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const BASE    = import.meta.env.BASE_URL.replace(/\/$/, '')
const show    = ref(false)
const imgOk   = ref(false)
const px      = ref(0)
const py      = ref(0)

// Letter-by-letter reveal
const letters  = ['K','a','f','k','a']
const revealed = ref([false,false,false,false,false])

function onMove(e) {
  px.value = (e.clientX / window.innerWidth  - 0.5)
  py.value = (e.clientY / window.innerHeight - 0.5)
}

onMounted(() => {
  window.addEventListener('mousemove', onMove, { passive: true })
  setTimeout(() => { show.value = true }, 80)
  letters.forEach((_, i) => setTimeout(() => { revealed.value[i] = true }, 420 + i * 110))
})
onUnmounted(() => window.removeEventListener('mousemove', onMove))

const photoStyle = computed(() => ({
  transform: `translate(${px.value * -18}px,${py.value * -10}px) scale(1.06)`,
  transition: 'transform .9s cubic-bezier(.25,.46,.45,.94)',
}))
const layerStyle = computed(() => ({
  transform: `translate(${px.value * 9}px,${py.value * 5}px)`,
  transition: 'transform 1.1s cubic-bezier(.25,.46,.45,.94)',
}))
</script>

<template>
  <section
    id="hero"
    class="relative w-full overflow-hidden bg-[#05030a]"
    style="min-height: 100dvh;"
  >
    <!-- Photo — portrait kafka-1 right-half bleed -->
    <div class="absolute inset-0 hidden lg:block" :style="photoStyle">
      <img
        :src="`${BASE}/assets/kafka/kafka-1.jpg`"
        alt="Kafka"
        @load="imgOk = true"
        class="absolute right-0 top-0 h-full w-[56%] object-cover object-[40%_top]
               transition-opacity duration-700"
        :class="imgOk ? 'opacity-100' : 'opacity-0'"
        style="filter:brightness(.44) saturate(.7);"
      />
      <div class="absolute right-0 top-0 h-full w-[56%]"
           style="background:linear-gradient(to right,#05030a 0%,#05030a10 18%,transparent 52%);" />
      <div class="absolute right-0 top-0 h-full w-[56%]"
           style="background:linear-gradient(to top,#05030a 0%,transparent 36%);" />
    </div>

    <!-- Mobile bg -->
    <div class="absolute inset-0 lg:hidden">
      <img :src="`${BASE}/assets/kafka/kafka-1.jpg`" alt=""
           class="w-full h-full object-cover object-[60%_top]"
           style="filter:brightness(.18) saturate(.5);" />
      <div class="absolute inset-0"
           style="background:linear-gradient(to top,#05030a 0%,transparent 52%);" />
    </div>

    <!-- Atmospheric glow -->
    <div class="absolute top-0 left-0 w-[45%] h-[55%] pointer-events-none"
         style="background:radial-gradient(circle,rgba(100,40,180,.055) 0%,transparent 65%);filter:blur(60px);" />

    <!-- Lightning bolts -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="lightning-bolt" style="left:63%;animation-delay:0s;animation-duration:11s;" />
      <div class="lightning-bolt" style="left:39%;animation-delay:4.7s;animation-duration:8.5s;" />
    </div>

    <!-- Content block — counter-parallax, bottom-anchored -->
    <div
      class="relative z-10 flex flex-col justify-end px-8 md:px-14 lg:px-20 pb-20 pt-28"
      style="min-height:100dvh;"
      :style="layerStyle"
    >
      <div
        class="max-w-lg transition-all duration-1000"
        :class="show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <!-- Eyebrow -->
        <div class="flex items-center gap-3 mb-9"
             :class="show ? 'opacity-100' : 'opacity-0'"
             style="transition:opacity .8s ease .15s;">
          <span class="w-5 h-px bg-[#7c3aed]/50" />
          <p class="text-[11px] tracking-[.45em] uppercase text-[#7a6090] font-light font-mono">
            Honkai: Star Rail
          </p>
          <span class="text-[#2d1f4e] text-[11px]">·</span>
          <p class="text-[11px] tracking-[.4em] uppercase text-[#4a3a5e] font-light font-mono">
            Stellaron Hunters
          </p>
        </div>

        <!-- Name — letter reveal -->
        <h1 class="leading-[.86] font-semibold select-none mb-7"
            style="font-family:'Cormorant Garamond',Georgia,serif;
                   font-size:clamp(5.5rem,18vw,13rem);
                   letter-spacing:-.05em;color:#f1e8ff;">
          <span
            v-for="(letter,i) in letters" :key="i"
            class="inline-block transition-all duration-500"
            :class="revealed[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            :style="`transition-delay:${i*80}ms`"
          >{{ letter }}</span>
        </h1>

        <!-- Quote -->
        <p class="mb-14 leading-relaxed text-[#9b7ab8] max-w-xs"
           style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.05rem;font-style:italic;">
          "You won't remember a thing except me."
        </p>

        <!-- CTAs -->
        <div class="flex items-center gap-9">
          <a href="#profile" class="group flex items-center gap-3">
            <span class="h-px bg-[#7c3aed]/50 group-hover:w-12 group-hover:bg-[#c084fc]
                         transition-all duration-500" style="width:22px;" />
            <span class="text-[12px] tracking-[.35em] uppercase text-[#a08ab8]
                         group-hover:text-[#f1e8ff] transition-colors duration-300 font-mono">
              Character
            </span>
          </a>
          <a href="#skills"
             class="text-[12px] tracking-[.35em] uppercase text-[#3d2d50]
                    hover:text-[#7a6090] transition-colors duration-300 font-mono">
            Build Guide
          </a>
        </div>
      </div>

      <!-- Bottom-right stats -->
      <div
        class="absolute bottom-8 right-8 md:right-14 lg:right-20
               hidden md:flex items-center gap-5 transition-all duration-1000"
        :class="show ? 'opacity-100' : 'opacity-0'"
        style="transition-delay:650ms;"
      >
        <div class="text-right">
          <p class="text-[9px] text-[#5a4870] tracking-widest uppercase font-mono mb-0.5">Element</p>
          <p class="text-[12px] text-[#c084fc] font-mono">Lightning</p>
        </div>
        <div class="w-px h-5 bg-[#1a1030]" />
        <div class="text-right">
          <p class="text-[9px] text-[#5a4870] tracking-widest uppercase font-mono mb-0.5">Path</p>
          <p class="text-[12px] text-[#9080a8] font-mono">Nihility</p>
        </div>
        <div class="w-px h-5 bg-[#1a1030]" />
        <div class="text-right">
          <p class="text-[9px] text-[#5a4870] tracking-widest uppercase font-mono mb-0.5">Rarity</p>
          <p class="text-[12px] text-[#f59e0b] font-mono">5 ★</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lightning-bolt {
  position:absolute;top:-5%;width:1px;height:32%;
  background:linear-gradient(to bottom,transparent,rgba(232,121,249,.45),transparent);
  opacity:0;animation:lightning linear infinite;
}
@keyframes lightning {
  0%,83%,100%{opacity:0;transform:scaleY(.4) translateY(-15%)}
  84%,86%{opacity:.9;transform:scaleY(1) translateY(0)}
  87%{opacity:.1;transform:scaleY(.85) translateY(5%)}
  88%,90%{opacity:.65;transform:scaleY(1.04) translateY(0)}
  91%,100%{opacity:0;transform:scaleY(.5) translateY(10%)}
}
</style>
