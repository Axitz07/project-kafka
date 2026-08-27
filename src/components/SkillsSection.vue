<script setup>
import { ref, onMounted } from 'vue'
import { kafka } from '../data/kafka.js'
import { animate, stagger } from 'animejs'
import { Zap, Swords, Star, Sparkles, AlertTriangle } from 'lucide-vue-next'

const el           = ref(null)
const activeLc     = ref(0)
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const skillIcon = { 'Basic ATK': Swords, 'Skill': Zap, 'Ultimate': Star, 'Talent': Sparkles }
const skillColor = {
  'Basic ATK': { text: 'var(--color-text-secondary)', border: 'rgba(155,143,192,.2)',  bg: 'rgba(155,143,192,.03)' },
  'Skill':     { text: 'var(--color-purple-glow)',    border: 'rgba(192,132,252,.25)', bg: 'rgba(192,132,252,.04)' },
  'Ultimate':  { text: 'var(--color-gold)',           border: 'rgba(245,158,11,.25)',  bg: 'rgba(245,158,11,.04)'  },
  'Talent':    { text: 'var(--color-text-primary)',   border: 'rgba(212,184,232,.2)',  bg: 'rgba(212,184,232,.03)' },
}

const loop = [
  'Apply DoT via partner skill or Ultimate',
  'Kafka Skill - detonate all active DoTs immediately',
  'Partner reapplies DoT while Kafka recovers energy',
  'Kafka Skill again when DoT value is high',
  'Use Ultimate when Energy reaches maximum',
  'Never Skill when enemy has zero active DoT',
]

const statPriority = [
  { stat: 'SPD',            note: 'More actions = more detonations.' },
  { stat: 'ATK%',           note: 'Main stat Body & Rope.' },
  { stat: 'Lightning DMG%', note: 'Main stat Sphere.' },
  { stat: 'Effect Hit Rate',note: 'Min 30% for consistent Shock.' },
]

const mistakes = [
  'Build Crit Rate/DMG seperti DPS konvensional',
  'Gunakan Skill sebelum DoT aktif di musuh',
  'SPD terlalu rendah',
  'Main tanpa partner DoT',
]

onMounted(() => {
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return
    if (!prefersReduced) {
      requestAnimationFrame(() => {
        animate('.sk-header', { opacity: [0,1], translateY: [12,0], duration: 500, ease: 'outQuart' })
        animate('.sk-card',   { opacity: [0,1], translateY: [20,0], duration: 550, delay: stagger(80, { start: 120 }), ease: 'outQuart' })
        animate('.sk-step',   { opacity: [0,1], translateX: [-10,0], duration: 420, delay: stagger(55, { start: 500 }), ease: 'outCubic' })
        animate('.sk-stat',   { opacity: [0,1], translateY: [10,0], duration: 380, delay: stagger(50, { start: 700 }), ease: 'outCubic' })
        animate('.sk-lc',     { opacity: [0,1], translateX: [-8,0], duration: 380, delay: stagger(60, { start: 900 }), ease: 'outCubic' })
        animate('.sk-mistake',{ opacity: [0,1], translateX: [8,0],  duration: 360, delay: stagger(50, { start: 1000 }), ease: 'outCubic' })
        animate('.sk-relic',  { opacity: [0,1], translateY: [8,0],  duration: 360, delay: stagger(55, { start: 1100 }), ease: 'outCubic' })
      })
    }
    io.disconnect()
  }, { threshold: 0.02 })
  if (el.value) io.observe(el.value)
})
</script>

<template>
  <section id="skills" ref="el" class="relative overflow-hidden"
           style="background:var(--color-void);">

    <div class="max-w-7xl mx-auto px-8 md:px-12 xl:px-16 py-20 md:py-28">

      <!-- ── Section header ──────────────────────────────────────── -->
      <div class="sk-header anim-hidden flex items-end justify-between mb-16 md:mb-20">
        <div>
          <p class="text-[11px] font-mono tracking-[.5em] uppercase mb-3"
             style="color:var(--color-text-dim);">02 &nbsp;/&nbsp; Build Guide</p>
          <h2 class="leading-none"
              style="font-family:var(--font-display);font-size:clamp(2.8rem,5vw,4rem);font-weight:300;letter-spacing:-0.025em;color:var(--color-text-primary);">
            Kit & Mechanics
          </h2>
        </div>
        <p class="hidden md:block text-[11px] font-mono max-w-[220px] text-right leading-[1.7]"
           style="color:var(--color-text-dim);">DoT amplifier. Every action is to maximize detonation.</p>
      </div>

      <!-- ── Skill cards ─────────────────────────────────────────── -->
      <div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-20">
        <div
          v-for="skill in kafka.skills"
          :key="skill.name"
          class="sk-card anim-hidden skill-card p-6 cursor-default"
          :style="{
            background: skillColor[skill.type]?.bg ?? 'rgba(15,10,30,.6)',
            border: `1px solid ${skillColor[skill.type]?.border ?? 'rgba(34,23,64,.5)'}`,
          }"
        >
          <div class="flex items-center gap-3 mb-4">
            <component
              :is="skillIcon[skill.type] ?? Zap"
              :size="14"
              :stroke-width="1.5"
              :style="{ color: skillColor[skill.type]?.text ?? 'var(--color-text-secondary)' }"
            />
            <span class="text-[10px] font-mono tracking-[.35em] uppercase"
                  :style="{ color: skillColor[skill.type]?.text ?? 'var(--color-text-secondary)' }">
              {{ skill.type }}
            </span>
          </div>
          <h3 class="text-[16px] mb-3 leading-snug"
              style="color:var(--color-text-primary);">{{ skill.name }}</h3>
          <p class="text-[14px] leading-[1.7]"
             style="color:var(--color-text-muted);">{{ skill.description }}</p>
        </div>
      </div>

      <!-- ── Two column: rotation + stats ───────────────────────── -->
      <div class="grid md:grid-cols-2 gap-12 mb-20">

        <!-- Combat rotation -->
        <div>
          <p class="text-[11px] font-mono tracking-[.5em] uppercase mb-7"
             style="color:var(--color-text-dim);">Combat Rotation</p>
          <div class="flex flex-col">
            <div
              v-for="(step, i) in loop"
              :key="i"
              class="sk-step anim-hidden flex items-start gap-5 py-4 border-b"
              style="border-color:rgba(34,23,64,.45);"
            >
              <span class="text-[11px] font-mono w-5 flex-shrink-0 pt-0.5"
                    style="color:var(--color-text-dim);">{{ String(i + 1).padStart(2, '0') }}</span>
              <p class="text-[14px] leading-[1.7]"
                 style="color:var(--color-text-secondary);">{{ step }}</p>
            </div>
          </div>
        </div>

        <!-- Stat priority -->
        <div>
          <p class="text-[11px] font-mono tracking-[.5em] uppercase mb-7"
             style="color:var(--color-text-dim);">Stat Priority</p>
          <div class="flex flex-col gap-3">
            <div
              v-for="(s, i) in statPriority"
              :key="s.stat"
              class="sk-stat anim-hidden flex items-start gap-5 p-4"
              style="border:1px solid rgba(34,23,64,.45);"
            >
              <span class="text-[11px] font-mono w-5 flex-shrink-0 pt-0.5"
                    style="color:var(--color-text-dim);">{{ String(i + 1).padStart(2, '0') }}</span>
              <div>
                <p class="text-[15px] font-mono mb-1"
                   style="color:var(--color-text-primary);">{{ s.stat }}</p>
                <p class="text-[13px]" style="color:var(--color-text-muted);">{{ s.note }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Light cones ─────────────────────────────────────────── -->
      <div class="mb-20">
        <p class="text-[11px] font-mono tracking-[.5em] uppercase mb-7"
           style="color:var(--color-text-dim);">Light Cones</p>

        <!-- LC tabs -->
        <div class="flex gap-1 mb-6">
          <button
            v-for="(lc, i) in kafka.lightCones"
            :key="lc.name"
            class="text-[11px] font-mono tracking-[.25em] uppercase px-4 py-2
                   transition-all duration-200"
            :style="activeLc === i
              ? 'background:rgba(124,58,237,.15);color:var(--color-purple-glow);border:1px solid rgba(124,58,237,.3);'
              : 'color:var(--color-text-dim);border:1px solid rgba(34,23,64,.4);background:transparent;'"
            @click="activeLc = i"
          >{{ String(i + 1).padStart(2, '0') }}</button>
        </div>

        <!-- Active LC detail -->
        <div
          v-if="kafka.lightCones[activeLc]"
          class="sk-lc p-6 md:p-8"
          style="background:rgba(15,10,30,.5);border:1px solid rgba(34,23,64,.5);"
        >
          <div class="flex items-start justify-between gap-6 mb-4">
            <div>
              <p class="text-[11px] font-mono tracking-[.4em] uppercase mb-2"
                 style="color:var(--color-text-dim);">
                {{ kafka.lightCones[activeLc].rarity }}★ Light Cone
              </p>
              <h3 class="text-[20px] md:text-[22px]"
                  style="font-family:var(--font-display);letter-spacing:-.01em;color:var(--color-text-primary);">
                {{ kafka.lightCones[activeLc].name }}
              </h3>
            </div>
            <span
              v-if="activeLc === 0"
              class="text-[10px] font-mono tracking-[.3em] uppercase px-3 py-1.5 flex-shrink-0"
              style="background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.2);color:var(--color-gold);"
            >Best in slot</span>
          </div>
          <p class="text-[14px] leading-[1.75]"
             style="color:var(--color-text-secondary);">
            {{ kafka.lightCones[activeLc].reason }}
          </p>
        </div>
      </div>

      <!-- ── Mistakes + Relics ───────────────────────────────────── -->
      <div class="grid md:grid-cols-2 gap-12">

        <!-- Common mistakes -->
        <div>
          <p class="text-[11px] font-mono tracking-[.5em] uppercase mb-7"
             style="color:var(--color-text-dim);">Common Mistakes</p>
          <div class="flex flex-col">
            <div
              v-for="(m, i) in mistakes"
              :key="i"
              class="sk-mistake anim-hidden flex items-start gap-4 py-4 border-b"
              style="border-color:rgba(34,23,64,.4);"
            >
              <AlertTriangle
                :size="14" :stroke-width="1.5"
                class="flex-shrink-0 mt-0.5"
                style="color:rgba(232,121,249,.4);"
                aria-hidden="true"
              />
              <p class="text-[14px] leading-[1.7]"
                 style="color:var(--color-text-muted);">{{ m }}</p>
            </div>
          </div>
        </div>

        <!-- Recommended relics -->
        <div>
          <p class="text-[11px] font-mono tracking-[.5em] uppercase mb-7"
             style="color:var(--color-text-dim);">Recommended Relics</p>
          <div class="flex flex-col gap-3">
            <div
              v-for="relic in kafka.relics"
              :key="relic.set"
              class="sk-relic anim-hidden flex items-start gap-5 p-4
                     transition-all duration-250"
              style="border:1px solid rgba(34,23,64,.45);"
              @mouseenter="(e) => (e.currentTarget.style.borderColor = 'rgba(124,58,237,.3)')"
              @mouseleave="(e) => (e.currentTarget.style.borderColor = 'rgba(34,23,64,.45)')"
            >
              <span class="text-[11px] font-mono tracking-[.2em] flex-shrink-0 pt-0.5"
                    style="color:var(--color-purple-bright);">{{ relic.pieces }}pc</span>
              <div>
                <h4 class="text-[14px] mb-1.5"
                    style="color:var(--color-text-primary);">{{ relic.set }}</h4>
                <p class="text-[13px] leading-[1.6]"
                   style="color:var(--color-text-muted);">{{ relic.reason }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Bottom hairline -->
    <div class="hairline" />
  </section>
</template>
