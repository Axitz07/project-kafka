<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { animate, createTimeline, stagger } from 'animejs'

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
const el   = ref(null)
const activeIdx   = ref(0)
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const eidolons = [
  { id: 1, name: 'Caressing Moonlight',  desc: 'Basic ATK deals extra Lightning DMG equal to 40% ATK when hitting Shocked enemies.' },
  { id: 2, name: 'Twilight Trill',        desc: 'Shock DoT duration +1 turn. Enemies affected by Kafka\'s Shock take 15% more DoT damage.' },
  { id: 3, name: 'Shining Bright',        desc: 'Skill Lv.+2 (max 15). Basic ATK Lv.+1 (max 10).' },
  { id: 4, name: 'Slash of the Ten',      desc: 'If enemy has 3+ DoT debuffs, follow-up attack DMG +30%.' },
  { id: 5, name: 'Inevitable Outcome',    desc: 'Ultimate Lv.+2 (max 15). Talent Lv.+2 (max 15).' },
  { id: 6, name: 'Pantheon of Desire',    desc: 'After Ultimate, Kafka\'s next Skill ignores 20% DEF of target.' },
]

const N = eidolons.length
const BASE_DEG = 360 / N
const ORBIT_R  = 190   // px
const SPEED    = 16    // deg/sec

// Continuous orbit angle driven by rAF
const orbitDeg = ref(0)
let autoSpin = true
let rafId = null
let lastTs = null

function tick(ts) {
  if (!lastTs) lastTs = ts
  const dt = (ts - lastTs) / 1000
  lastTs = ts
  if (autoSpin && !prefersReduced) {
    orbitDeg.value = (orbitDeg.value + SPEED * dt) % 360
    // Sync active index to whichever item is closest to top (270deg on unit circle)
    let best = 0
    let bestDiff = Infinity
    for (let i = 0; i < N; i++) {
      const a = ((i * BASE_DEG + orbitDeg.value) % 360 + 360) % 360
      const diff = Math.abs(((a - 270) + 360) % 360)
      if (diff < bestDiff) { bestDiff = diff; best = i }
    }
    activeIdx.value = best
  }
  rafId = requestAnimationFrame(tick)
}

// Snap to item i using smooth easing via rAF
function snapTo(idx) {
  autoSpin = false
  activeIdx.value = idx

  if (prefersReduced) {
    // Instant: place item i at top (270deg)
    orbitDeg.value = (270 - idx * BASE_DEG + 720) % 360
    setTimeout(() => { autoSpin = true }, 2000)
    return
  }

  const target = (270 - idx * BASE_DEG + 720) % 360
  let current = ((orbitDeg.value % 360) + 360) % 360
  let delta = target - current
  if (delta > 180)  delta -= 360
  if (delta < -180) delta += 360

  const start = current
  const duration = 700
  let startTs = null

  function ease(t) {
    return 1 - Math.pow(1 - t, 3) // outCubic
  }

  function animFrame(ts) {
    if (!startTs) startTs = ts
    const p = Math.min((ts - startTs) / duration, 1)
    orbitDeg.value = ((start + delta * ease(p)) % 360 + 360) % 360
    if (p < 1) {
      requestAnimationFrame(animFrame)
    } else {
      setTimeout(() => { autoSpin = true }, 2000)
    }
  }
  requestAnimationFrame(animFrame)
}

// CSS position for each eidolon item on orbit ellipse
function itemStyle(i) {
  const angleDeg = ((i * BASE_DEG + orbitDeg.value) % 360 + 360) % 360
  const angleRad = (angleDeg - 90) * (Math.PI / 180)
  const x = Math.cos(angleRad) * ORBIT_R
  const y = Math.sin(angleRad) * ORBIT_R * 0.36  // flatten → 3D tilt feel
  // Items at top (angleRad≈0) = front = bigger + opaque
  const sinNorm = (Math.sin(angleRad) + 1) / 2   // 0=top,1=bottom
  const sc = 0.62 + (1 - sinNorm) * 0.48          // 0.62–1.1
  const op = 0.25 + (1 - sinNorm) * 0.75          // 0.25–1.0
  const zi = Math.round((1 - sinNorm) * 10)

  return {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${sc})`,
    opacity: op,
    zIndex: zi,
    cursor: 'pointer',
    willChange: 'transform, opacity',
  }
}

// Entrance animation on scroll into view
onMounted(() => {
  if (!prefersReduced) rafId = requestAnimationFrame(tick)

  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return
    if (!prefersReduced) {
      createTimeline({ ease: 'outExpo' })
        .add('.eid-header', { opacity: [0, 1], translateY: [16, 0], duration: 600 })
        .add('.eid-orbit',  { opacity: [0, 1], scale: [0.9, 1],     duration: 800 }, '-=300')
        .add('.eid-info',   { opacity: [0, 1], translateY: [12, 0], duration: 500 }, '-=400')
    }
    io.disconnect()
  }, { threshold: 0.1 })

  if (el.value) io.observe(el.value)
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <section id="eidolons" ref="el" class="relative overflow-hidden"
           style="background:var(--color-void);">

    <div class="hairline" />

    <div class="max-w-7xl mx-auto px-8 md:px-12 xl:px-16 py-20 md:py-28">

      <!-- Section header -->
      <div class="eid-header anim-hidden mb-16 md:mb-20">
        <p class="text-[11px] font-mono tracking-[.5em] uppercase mb-3"
           style="color:var(--color-text-dim);">03 &nbsp;/&nbsp; Eidolons</p>
        <div class="flex items-end justify-between">
          <h2 class="leading-none"
              style="font-family:var(--font-display);font-size:clamp(2.8rem,5vw,4rem);font-weight:300;letter-spacing:-0.025em;color:var(--color-text-primary);">
            Constellation
          </h2>
          <p class="hidden md:block text-[11px] font-mono max-w-[200px] text-right leading-[1.7]"
             style="color:var(--color-text-dim);">E6 unlocks full DoT amplifier potential.</p>
        </div>
      </div>

      <!-- Orbit + info -->
      <div class="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

        <!-- Orbit sphere -->
        <div class="eid-orbit anim-hidden relative flex-shrink-0"
             style="width:440px;height:320px;max-width:100%;">

          <!-- Ambient glow -->
          <div class="absolute inset-0 pointer-events-none"
               style="background:radial-gradient(ellipse 55% 38% at 50% 58%,rgba(124,58,237,.1) 0%,transparent 70%);" />

          <!-- Ellipse guide ring -->
          <div class="absolute pointer-events-none"
               style="left:50%;top:50%;width:390px;height:140px;transform:translate(-50%,-50%);border:1px solid rgba(124,58,237,.07);border-radius:50%;" />

          <!-- Eidolon nodes -->
          <div
            v-for="(e, i) in eidolons"
            :key="e.id"
            :style="itemStyle(i)"
            @click="snapTo(i)"
          >
            <!-- Circle frame -->
            <div
              class="relative overflow-hidden transition-shadow duration-300"
              :style="{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                border: activeIdx === i
                  ? '2px solid rgba(192,132,252,.65)'
                  : '1px solid rgba(124,58,237,.18)',
                background: 'rgba(15,10,30,.85)',
                boxShadow: activeIdx === i
                  ? '0 0 22px rgba(192,132,252,.3), inset 0 0 14px rgba(124,58,237,.12)'
                  : 'inset 0 0 8px rgba(0,0,0,.5)',
              }"
            >
              <img
                :src="`${BASE}/assets/kafka/eidolons/e${e.id}.jpg`"
                :alt="`E${e.id} — ${e.name}`"
                class="w-full h-full object-cover object-center"
                loading="lazy"
                style="opacity:.88;"
                @error="(ev) => { ev.target.style.display = 'none' }"
              />
              <!-- Fallback number shown when image absent -->
              <div class="absolute inset-0 flex items-center justify-center select-none"
                   style="font-family:var(--font-display);font-size:2.2rem;font-weight:300;color:rgba(192,132,252,.3);">
                E{{ e.id }}
              </div>
            </div>

            <!-- Small badge -->
            <div class="absolute -bottom-1 -right-1 w-5 h-5 flex items-center justify-center"
                 style="background:var(--color-void);border:1px solid rgba(124,58,237,.3);border-radius:50%;">
              <span class="text-[9px] font-mono" style="color:var(--color-purple-glow);">{{ e.id }}</span>
            </div>
          </div>

        </div>

        <!-- Info panel -->
        <div class="eid-info anim-hidden flex-1 min-w-0">
          <div class="mb-6">
            <p class="text-[11px] font-mono tracking-[.5em] uppercase mb-3"
               style="color:var(--color-text-dim);">
              Eidolon {{ activeIdx + 1 }} &nbsp;/&nbsp; E{{ eidolons[activeIdx].id }}
            </p>
            <h3 class="leading-none mb-4"
                style="font-family:var(--font-display);font-size:clamp(1.6rem,3vw,2.4rem);font-weight:300;letter-spacing:-0.02em;color:var(--color-text-primary);">
              {{ eidolons[activeIdx].name }}
            </h3>
            <div style="height:1px;width:2.5rem;background:rgba(192,132,252,.4);margin-bottom:1.25rem;" />
            <p class="text-[15px] leading-[1.8] max-w-md"
               style="color:var(--color-text-secondary);">
              {{ eidolons[activeIdx].desc }}
            </p>
          </div>

          <!-- Dot navigation -->
          <div class="flex items-center gap-3 mt-8">
            <button
              v-for="(e, i) in eidolons"
              :key="e.id"
              :aria-label="`Eidolon ${e.id}`"
              class="transition-all duration-300"
              :style="{
                width:  activeIdx === i ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: activeIdx === i ? 'var(--color-purple-glow)' : 'rgba(124,58,237,.25)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
              }"
              @click="snapTo(i)"
            />
          </div>
        </div>

      </div>
    </div>

    <div class="hairline" />
  </section>
</template>
