<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

// ── Mouse parallax ────────────────────────────────────────────
const mx = ref(0)
const my = ref(0)
function onMove(e) {
  mx.value = (e.clientX / window.innerWidth  - 0.5)
  my.value = (e.clientY / window.innerHeight - 0.5)
}

// ── Load reveal ──────────────────────────────────────────────
const show      = ref(false)
const imgLoaded = ref(false)

// ── Letter by letter ─────────────────────────────────────────
const letters  = ['K','a','f','k','a']
const revealed = ref([false, false, false, false, false])

onMounted(() => {
  window.addEventListener('mousemove', onMove, { passive: true })
  setTimeout(() => { show.value = true }, 100)
  letters.forEach((_, i) => {
    setTimeout(() => { revealed.value[i] = true }, 400 + i * 120)
  })
})
onUnmounted(() => window.removeEventListener('mousemove', onMove))

// ── Parallax layers ───────────────────────────────────────────
const photoStyle = computed(() => ({
  transform: `translate(${mx.value * -18}px, ${my.value * -10}px) scale(1.06)`,
  transition: 'transform 0.9s cubic-bezier(.25,.46,.45,.94)',
}))
const contentStyle = computed(() => ({
  transform: `translate(${mx.value * 8}px, ${my.value * 5}px)`,
  transition: 'transform 1.2s cubic-bezier(.25,.46,.45,.94)',
}))
const glowStyle = computed(() => ({
  transform: `translate(${mx.value * 40}px, ${my.value * 25}px)`,
  transition: 'transform 0.6s cubic-bezier(.25,.46,.45,.94)',
}))
</script>

<template>
  <section
    id="hero"
    class="relative w-full overflow-hidden bg-[#05030a]"
    style="min-height: 100svh;"
  >
    <!-- ── Photo layer — portrait kafka-1 (902×1260) ─── -->
    <div class="absolute inset-0 hidden lg:block" :style="photoStyle">
      <img
        :src="`${BASE}/assets/kafka/kafka-1.jpg`"
        alt="Kafka"
        @load="imgLoaded = true"
        class="absolute right-0 top-0 h-full w-[58%] object-cover object-[40%_top] transition-opacity duration-700"
        :class="imgLoaded ? 'opacity-100' : 'opacity-0'"
        style="filter: brightness(.46) saturate(.72);"
      />
      <!-- fade left -->
      <div
        class="absolute right-0 top-0 h-full w-[58%]"
        style="background: linear-gradient(to right, #05030a 0%, #05030a15 20%, transparent 55%);"
      />
      <!-- fade bottom -->
      <div
        class="absolute right-0 top-0 h-full w-[58%]"
        style="background: linear-gradient(to top, #05030a 0%, transparent 38%);"
      />
    </div>

    <!-- ── Mobile bg ─────────────────────────────────────── -->
    <div class="absolute inset-0 lg:hidden">
      <img
        :src="`${BASE}/assets/kafka/kafka-1.jpg`"
        alt=""
        aria-hidden="true"
        class="w-full h-full object-cover object-[60%_top]"
        style="filter: brightness(.18) saturate(.5);"
      />
      <div
        class="absolute inset-0"
        style="background: linear-gradient(to top, #05030a 0%, transparent 55%);"
      />
    </div>

    <!-- ── Atmospheric glow — moves with mouse ────────── -->
    <div
      class="absolute top-0 left-0 w-[520px] h-[520px] pointer-events-none rounded-full"
      :style="{ ...glowStyle, background: 'radial-gradient(circle, rgba(124,58,237,.06) 0%, transparent 65%)', filter: 'blur(60px)' }"
    />

    <!-- ── Lightning streaks — pure CSS, no HTML string ─ -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="lightning-bolt" style="left:62%; animation-delay:0s; animation-duration:11s;" />
      <div class="lightning-bolt" style="left:38%; animation-delay:4.5s; animation-duration:8s;" />
      <div class="lightning-bolt" style="left:78%; animation-delay:7s; animation-duration:13s;" />
    </div>

    <!-- ── Content layer — counter-parallax ──────────── -->
    <div
      class="relative z-10 flex flex-col justify-end px-8 md:px-14 lg:px-20 pb-20 pt-28"
      style="min-height: 100svh;"
      :style="contentStyle"
    >
      <div
        class="max-w-lg transition-all duration-1000"
        :class="show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <!-- Eyebrow -->
        <div class="flex items-center gap-3 mb-8">
          <span class="w-4 h-px bg-[#7c3aed]/60" />
          <p class="text-[11px] tracking-[.5em] uppercase text-[#7a6090] font-light">
            Honkai: Star Rail
          </p>
          <span class="text-[#2d1f4e] text-xs">·</span>
          <p class="text-[11px] tracking-[.45em] uppercase text-[#4a3a5e] font-light">
            Stellaron Hunters
          </p>
        </div>

        <!-- Name — letter by letter reveal -->
        <h1
          class="leading-[.85] font-semibold select-none mb-6"
          style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(5.5rem, 19vw, 13.5rem); letter-spacing: -.05em; color: #f1e8ff;"
        >
          <span
            v-for="(letter, i) in letters"
            :key="i"
            class="inline-block transition-all duration-500"
            :class="revealed[i]
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'"
            :style="{ transitionDelay: `${i * 80}ms` }"
          >{{ letter }}</span>
        </h1>

        <!-- Quote -->
        <p
          class="mb-14 leading-relaxed text-[#9b7ab8] max-w-xs"
          style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.05rem; font-style: italic;"
        >
          "You won't remember a thing except me."
        </p>

        <!-- CTA -->
        <div class="flex items-center gap-8">
          <a href="#profile" class="group flex items-center gap-3">
            <span
              class="h-px bg-[#7c3aed]/50 group-hover:w-12 group-hover:bg-[#c084fc] transition-all duration-500"
              style="width: 22px;"
            />
            <span class="text-xs tracking-[.35em] uppercase text-[#a08ab8] group-hover:text-[#f1e8ff] transition-colors duration-300">
              Character
            </span>
          </a>
          <a
            href="#skills"
            class="text-xs tracking-[.35em] uppercase text-[#3d2d50] hover:text-[#7a6090] transition-colors duration-300"
          >
            Build Guide
          </a>
        </div>
      </div>

      <!-- Bottom-right inline stats -->
      <div
        class="absolute bottom-8 right-8 md:right-14 lg:right-20 hidden md:flex items-center gap-5 transition-all duration-1000"
        :class="show ? 'opacity-100' : 'opacity-0'"
        style="transition-delay: 700ms;"
      >
        <div class="text-right">
          <p class="text-[9px] text-[#5a4870] tracking-widest uppercase font-mono mb-0.5">Element</p>
          <p class="text-xs text-[#c084fc] font-mono">Lightning</p>
        </div>
        <div class="w-px h-5 bg-[#1a1030]" />
        <div class="text-right">
          <p class="text-[9px] text-[#5a4870] tracking-widest uppercase font-mono mb-0.5">Path</p>
          <p class="text-xs text-[#9080a8] font-mono">Nihility</p>
        </div>
        <div class="w-px h-5 bg-[#1a1030]" />
        <div class="text-right">
          <p class="text-[9px] text-[#5a4870] tracking-widest uppercase font-mono mb-0.5">Rarity</p>
          <p class="text-xs text-[#f59e0b] font-mono">5 ★</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lightning-bolt {
  position: absolute;
  top: -5%;
  width: 1px;
  height: 35%;
  background: linear-gradient(to bottom, transparent, rgba(232,121,249,.5), transparent);
  opacity: 0;
  animation: lightning linear infinite;
}

@keyframes lightning {
  0%, 84%, 100% { opacity: 0; transform: scaleY(.4) translateY(-15%); }
  85%, 87%      { opacity: .9; transform: scaleY(1) translateY(0); }
  88%           { opacity: .15; transform: scaleY(.85) translateY(5%); }
  89%, 91%      { opacity: .7; transform: scaleY(1.05) translateY(0); }
  92%, 100%     { opacity: 0; transform: scaleY(.5) translateY(10%); }
}
</style>
