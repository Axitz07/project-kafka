<script setup>
import { ref, onMounted } from 'vue'
import { kafka } from '../data/kafka.js'
import { animate, stagger } from 'animejs'
import {
  Zap, Swords, Star, Sparkles,
  ChevronRight, Target, AlertTriangle,
  BookOpen,
} from 'lucide-vue-next'

const BASE           = import.meta.env.BASE_URL.replace(/\/$/, '')
const el             = ref(null)
const imgOk          = ref(false)
const activeLc       = ref(0)
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const skillIcon  = { 'Basic ATK': Swords, 'Skill': Zap, 'Ultimate': Star, 'Talent': Sparkles }
// text values mirror @theme tokens: purple-glow=#c084fc, gold=#f59e0b
const skillColor = {
  'Basic ATK': { text: 'var(--color-text-secondary)',  border: 'rgba(160,144,184,.22)', bg: 'rgba(160,144,184,.04)', glow: 'rgba(160,144,184,.10)' },
  'Skill':     { text: 'var(--color-purple-glow)',     border: 'rgba(192,132,252,.30)', bg: 'rgba(192,132,252,.06)', glow: 'rgba(192,132,252,.20)' },
  'Ultimate':  { text: 'var(--color-gold)',            border: 'rgba(245,158,11,.30)',  bg: 'rgba(245,158,11,.05)',  glow: 'rgba(245,158,11,.18)'  },
  'Talent':    { text: 'var(--color-text-primary)',    border: 'rgba(212,184,232,.22)', bg: 'rgba(212,184,232,.04)', glow: 'rgba(212,184,232,.10)' },
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
  { stat: 'SPD',             note: 'More actions = more detonations. Highest priority.' },
  { stat: 'ATK%',            note: 'Main stat Body & Rope.' },
  { stat: 'Lightning DMG%',  note: 'Main stat Sphere.' },
  { stat: 'Effect Hit Rate', note: 'Min 30% for consistent Shock.' },
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
        animate('.skill-intro', {
          opacity: [0, 1], translateY: [20, 0], duration: 700, ease: 'outExpo',
        })
        animate('.skill-card', {
          opacity: [0, 1], translateY: [28, 0], duration: 620,
          delay: stagger(75), ease: 'outQuart',
        })
        animate('.loop-item', {
          opacity: [0, 1], translateX: [-16, 0], duration: 500,
          delay: stagger(55, { start: 200 }), ease: 'outCubic',
        })
        animate('.stat-prio-row', {
          opacity: [0, 1], translateX: [12, 0], duration: 460,
          delay: stagger(52, { start: 200 }), ease: 'outCubic',
        })
        animate('.lc-row', {
          opacity: [0, 1], translateY: [10, 0], duration: 420,
          delay: stagger(65, { start: 300 }), ease: 'outCubic',
        })
        animate('.mistake-item', {
          opacity: [0, 1], translateY: [12, 0], duration: 420,
          delay: stagger(58, { start: 400 }), ease: 'outCubic',
        })
      })
    }
    io.disconnect()
  }, { threshold: 0.04 })
  if (el.value) io.observe(el.value)
})
</script>

<template>
  <section id="skills" ref="el" class="relative overflow-hidden" style="background:var(--color-deep);">
    <div class="h-px" style="background:linear-gradient(to right,transparent,rgba(124,58,237,.12),transparent);" />

    <!-- Banner image -->
    <div class="relative w-full overflow-hidden" style="max-height:260px;">
      <img
        :src="`${BASE}/assets/kafka/kafka-4.jpg`"
        alt=""
        aria-hidden="true"
        width="1200"
        height="260"
        loading="lazy"
        class="w-full object-cover transition-opacity duration-700"
        :class="imgOk ? 'opacity-100' : 'opacity-0'"
        @load="imgOk = true"
        style="height:clamp(140px,22vw,260px);filter:brightness(.2) saturate(.5);"
      />
      <div class="absolute inset-0"
           style="background:linear-gradient(to bottom,#06030f 0%,transparent 22%,transparent 60%,#06030f 100%);" />
      <div class="absolute inset-0"
           style="background:radial-gradient(ellipse at 50% 100%,rgba(90,30,160,.10) 0%,transparent 65%);" />
    </div>

    <div class="max-w-6xl mx-auto px-8 md:px-14 lg:px-20 py-20">

      <!-- Section intro -->
      <div class="skill-intro anim-hidden mb-16">
        <h2
          class="font-semibold leading-none mb-4 tracking-tight"
          style="font-family:'Cormorant Garamond',Georgia,serif;
                 font-size:clamp(2.2rem,5vw,3.8rem);
                 letter-spacing:-.03em;
                 color:var(--color-text-primary);"
        >Build Guide</h2>
        <p class="text-[13px] leading-relaxed" style="color:var(--color-text-muted);max-width:52ch;">
          Kafka excels at DoT detonation — the goal is maximizing the number of times
          Shock triggers, not raw ATK damage.
        </p>
      </div>

      <div class="space-y-20">

        <!-- Skills grid -->
        <div>
          <p class="text-[9px] tracking-[.52em] uppercase font-mono mb-8"
             style="color:var(--color-text-dim);">Kit Overview</p>
          <div class="grid sm:grid-cols-2 gap-4">
            <div
              v-for="skill in kafka.skills"
              :key="skill.type"
              class="skill-card anim-hidden group cursor-default"
              :style="{
                padding: '20px 22px',
                borderRadius: '12px',
                border: `1px solid ${skillColor[skill.type].border}`,
                background: skillColor[skill.type].bg,
              }"
              @mouseenter="(e) => {
                if (!prefersReduced) {
                  e.currentTarget.style.boxShadow = `0 8px 32px ${skillColor[skill.type].glow}, inset 0 1px 0 rgba(255,255,255,0.04)`
                  e.currentTarget.style.borderColor = skillColor[skill.type].text.replace(')', ', .38)')
                }
              }"
              @mouseleave="(e) => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = skillColor[skill.type].border
              }"
            >
              <!-- Header -->
              <div class="flex items-center gap-3 mb-4">
                <div
                  class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  :style="{
                    background: skillColor[skill.type].bg,
                    border: `1px solid ${skillColor[skill.type].border}`,
                  }"
                >
                  <component
                    :is="skillIcon[skill.type]"
                    class="w-4 h-4"
                    :style="{ color: skillColor[skill.type].text }"
                  />
                </div>
                <div>
                  <p class="text-[9px] tracking-[.38em] uppercase font-mono mb-0.5"
                     :style="{ color: skillColor[skill.type].text }">{{ skill.type }}</p>
                  <h3 class="text-[13px] font-medium" style="color:var(--color-text-primary);">
                    {{ skill.name }}
                  </h3>
                </div>
              </div>
              <p class="text-[12px] leading-[1.75]" style="color:var(--color-text-muted);">
                {{ skill.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Rotation loop -->
        <div>
          <div class="flex items-center gap-3 mb-8">
            <BookOpen class="w-3.5 h-3.5" style="color:var(--color-purple-glow);" />
            <p class="text-[9px] tracking-[.52em] uppercase font-mono"
               style="color:var(--color-text-dim);">Combat Rotation</p>
          </div>
          <div class="space-y-0">
            <div
              v-for="(step, i) in loop"
              :key="i"
              class="loop-item anim-hidden-x group flex items-start gap-4 py-4 cursor-default
                     border-b last:border-0 transition-colors duration-200"
              :style="{
                borderColor: 'rgba(26,16,48,.7)',
              }"
              @mouseenter="activeLc = i"
              @mouseleave="activeLc = -1"
            >
              <span
                class="text-[10px] font-mono flex-shrink-0 w-5 pt-0.5 transition-colors duration-200"
                :style="{ color: activeLc === i ? 'var(--color-purple-bright)' : 'var(--color-text-dim)' }"
              >{{ String(i + 1).padStart(2, '0') }}</span>
              <p
                class="text-[13px] leading-relaxed transition-colors duration-200"
                :style="{ color: activeLc === i ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }"
              >{{ step }}</p>
              <ChevronRight
                class="w-3.5 h-3.5 flex-shrink-0 ml-auto mt-0.5 transition-all duration-200"
                :style="{
                  color: activeLc === i ? 'var(--color-purple-glow)' : 'var(--color-text-dim)',
                  transform: activeLc === i ? 'translateX(2px)' : 'none',
                }"
              />
            </div>
          </div>
        </div>

        <!-- Two-col: stat priority + light cones -->
        <div class="grid lg:grid-cols-2 gap-12">

          <!-- Stat priority — display tiles -->
          <div>
            <div class="flex items-center gap-3 mb-8">
              <Target class="w-3.5 h-3.5" style="color:var(--color-purple-glow);" />
              <p class="text-[9px] tracking-[.52em] uppercase font-mono"
                 style="color:var(--color-text-dim);">Stat Priority</p>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div
                v-for="(row, i) in statPriority"
                :key="row.stat"
                class="stat-prio-row anim-hidden-x group p-4 rounded-xl cursor-default
                       transition-all duration-300 hover:-translate-y-0.5"
                style="background:rgba(19,13,34,.7);border:1px solid rgba(45,31,78,.35);"
                @mouseenter="(e) => { e.currentTarget.style.borderColor = 'rgba(124,58,237,.35)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(124,58,237,.08)'; }"
                @mouseleave="(e) => { e.currentTarget.style.borderColor = 'rgba(45,31,78,.35)'; e.currentTarget.style.boxShadow = 'none'; }"
              >
                <span
                  class="text-[10px] font-mono tracking-[.15em] uppercase mb-2 block"
                  :style="{ color: i === 0 ? 'var(--color-purple-glow)' : 'var(--color-text-secondary)' }"
                >{{ row.stat }}</span>
                <p class="text-[11px] leading-[1.65]" style="color:var(--color-text-dim);">{{ row.note }}</p>
              </div>
            </div>
          </div>

          <!-- Light cones -->
          <div>
            <div class="flex items-center gap-3 mb-8">
              <Star class="w-3.5 h-3.5" style="color:var(--color-gold);" />
              <p class="text-[9px] tracking-[.52em] uppercase font-mono"
                 style="color:var(--color-text-dim);">Light Cones</p>
            </div>
            <div class="space-y-2">
              <div
                v-for="(lc, i) in kafka.lightCones"
                :key="lc.name"
                class="lc-row anim-hidden lc-row-item group flex items-center gap-4 px-4 py-3.5 rounded-xl
                       cursor-default"
                :style="{
                  background: lc.recommended ? 'rgba(245,158,11,.04)' : 'rgba(19,13,34,.55)',
                  border: `1px solid ${lc.recommended ? 'rgba(245,158,11,.22)' : 'rgba(45,31,78,.3)'}`,
                }"
                @mouseenter="(e) => {
                  e.currentTarget.style.background = lc.recommended ? 'rgba(245,158,11,.07)' : 'rgba(45,31,78,.18)'
                  e.currentTarget.style.borderColor = lc.recommended ? 'rgba(245,158,11,.38)' : 'rgba(45,31,78,.55)'
                }"
                @mouseleave="(e) => {
                  e.currentTarget.style.background = lc.recommended ? 'rgba(245,158,11,.04)' : 'rgba(19,13,34,.55)'
                  e.currentTarget.style.borderColor = lc.recommended ? 'rgba(245,158,11,.22)' : 'rgba(45,31,78,.3)'
                }"
              >
                <!-- Rarity stars -->
                <div class="flex items-center gap-0.5 flex-shrink-0 flex-col">
                  <span
                    class="text-[12px] font-mono font-medium"
                    :class="lc.rarity === 5 ? 'text-(--color-gold)' : 'text-(--color-text-secondary)'"
                  >{{ lc.rarity }}</span>
                  <Star
                    class="w-3 h-3"
                    :class="lc.rarity === 5 ? 'text-(--color-gold)' : 'text-(--color-text-secondary)'"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2.5 mb-0.5">
                    <h4 class="text-[13px] group-hover:text-white transition-colors truncate"
                        style="color:var(--color-text-primary);">{{ lc.name }}</h4>
                    <span
                      v-if="lc.recommended"
                      class="flex-shrink-0 text-[9px] px-1.5 py-0.5 rounded font-mono tracking-[.28em] uppercase"
                      style="border:1px solid rgba(245,158,11,.38);color:var(--color-gold);background:rgba(245,158,11,.06);"
                    >BIS</span>
                  </div>
                  <p class="text-[11px] leading-relaxed" style="color:var(--color-text-dim);">{{ lc.note }}</p>
                </div>
                <ChevronRight
                  class="w-4 h-4 flex-shrink-0 transition-all duration-200"
                  :class="activeLc === i ? 'text-(--color-purple-glow)' : 'text-(--color-border)'"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Common mistakes — glass cards -->
        <div>
          <div class="flex items-center gap-3 mb-8">
            <AlertTriangle class="w-3.5 h-3.5" style="color:var(--color-lightning);" />
            <p class="text-[9px] tracking-[.52em] uppercase font-mono"
               style="color:var(--color-text-dim);">Hindari</p>
          </div>
          <div class="grid sm:grid-cols-2 gap-3">
            <div
              v-for="m in mistakes"
              :key="m"
              class="mistake-item anim-hidden flex items-start gap-3 p-5 rounded-xl
                     transition-all duration-250 hover:-translate-y-0.5"
              style="background:rgba(30,5,30,.5);
                     border:1px solid rgba(232,121,249,.08);
                     backdrop-filter:blur(8px);"
              @mouseenter="(e) => { e.currentTarget.style.borderColor = 'rgba(232,121,249,.18)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(232,121,249,.06)'; }"
              @mouseleave="(e) => { e.currentTarget.style.borderColor = 'rgba(232,121,249,.08)'; e.currentTarget.style.boxShadow = 'none'; }"
            >
              <div class="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                   style="background:rgba(232,121,249,.45);" aria-hidden="true" />
              <p class="text-[13px] leading-[1.7]" style="color:var(--color-text-secondary);">{{ m }}</p>
            </div>
          </div>
        </div>

        <!-- Relics -->
        <div>
          <p class="text-[9px] tracking-[.52em] uppercase font-mono mb-8"
             style="color:var(--color-text-dim);">Recommended Relics</p>
          <div class="space-y-3">
            <div
              v-for="relic in kafka.relics"
              :key="relic.set"
              class="lc-row anim-hidden flex items-start gap-5 p-5 rounded-xl
                     transition-all duration-250 hover:-translate-y-0.5"
              style="background:rgba(19,13,34,.7);border:1px solid rgba(45,31,78,.35);"
              @mouseenter="(e) => { e.currentTarget.style.borderColor = 'rgba(124,58,237,.35)'; }"
              @mouseleave="(e) => { e.currentTarget.style.borderColor = 'rgba(45,31,78,.35)'; }"
            >
              <span
                class="text-[10px] font-mono tracking-[.25em] flex-shrink-0 pt-0.5"
                style="color:var(--color-purple-bright);"
              >{{ relic.pieces }}pc</span>
              <div>
                <h4 class="text-[13px] mb-1.5" style="color:var(--color-text-primary);">{{ relic.set }}</h4>
                <p class="text-[12px] leading-relaxed" style="color:var(--color-text-muted);">{{ relic.reason }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
