<script setup>
import { ref } from 'vue'
import { kafka } from '../data/kafka.js'
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

const activeTab = ref('lore')

const tabs = [
  { id: 'lore', label: 'Lore' },
  { id: 'stats', label: 'Stats' },
  { id: 'traits', label: 'Traits' },
]

const lore = {
  intro: 'Kafka adalah anggota Stellaron Hunters yang menjalankan misi berdasarkan "Script" milik Elio. Masa lalunya sengaja dibuat ambigu — yang diketahui hanya bahwa ia memiliki kemampuan Spirit Whisper untuk memanipulasi pikiran, dan hubungan khusus dengan Trailblazer yang tidak sepenuhnya terungkap.',
  spiritWhisper: 'Spirit Whisper memungkinkan Kafka memanipulasi pikiran seseorang melalui kata-kata. Bukan sekadar persuasi — ia bisa memengaruhi seseorang untuk mengikuti perintah tertentu. Kemampuan ini mempertanyakan konsep kehendak bebas.',
  quote2: '"Apakah tindakan tersebut membawa seseorang menuju masa depan yang sudah ditentukan?"',
}

const traits = [
  { label: 'Tenang', icon: '◈' },
  { label: 'Manipulatif', icon: '◈' },
  { label: 'Elegan', icon: '◈' },
  { label: 'Sulit Ditebak', icon: '◈' },
  { label: 'Cerdas', icon: '◈' },
  { label: 'Playful', icon: '◈' },
]
</script>

<template>
  <section id="profile" class="relative py-32 overflow-hidden bg-[#03010a]">

    <!-- Background texture -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#03010a] via-[#0a0515] to-[#03010a]"></div>
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(124,58,237,0.06),transparent_60%)]"></div>

    <!-- Vertical line decoration -->
    <div class="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#2d1f4e]/40 to-transparent pointer-events-none hidden lg:block"></div>

    <div class="relative z-10 max-w-6xl mx-auto px-8">

      <!-- Section label -->
      <div class="flex items-center gap-4 mb-20">
        <span class="text-[10px] text-[#6b4f8a] tracking-[0.6em] uppercase font-mono">01</span>
        <div class="h-px flex-1 max-w-16 bg-[#2d1f4e]"></div>
        <span class="text-xs text-[#7c3aed] tracking-[0.4em] uppercase font-mono">Character Profile</span>
      </div>

      <div class="grid lg:grid-cols-2 gap-16 items-start">

        <!-- Left: photo with overlay info -->
        <div class="relative">
          <!-- Main photo -->
          <div class="relative rounded-sm overflow-hidden"
               style="aspect-ratio: 3/4; max-height: 600px;">
            <img :src="`${BASE}/assets/kafka/kafka-3.jpg`"
                 alt="Kafka"
                 class="w-full h-full object-cover object-top"
                 style="filter: brightness(0.75) saturate(0.85);" />
            <!-- Bottom gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#03010a] via-transparent to-transparent"></div>
            <!-- Left edge glow -->
            <div class="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/10 to-transparent"></div>

            <!-- Overlay info bottom -->
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <div class="flex items-end justify-between">
                <div>
                  <p class="text-[10px] text-[#6b4f8a] tracking-widest uppercase font-mono mb-1">Character</p>
                  <h2 class="text-4xl font-bold text-[#f1e8ff]" style="font-family:'Georgia',serif; text-shadow: 0 0 30px rgba(192,132,252,0.4)">{{ kafka.name }}</h2>
                  <p class="text-[#a78bca] text-sm tracking-widest mt-1">{{ kafka.faction }}</p>
                </div>
                <div class="text-right">
                  <div class="flex gap-0.5 justify-end mb-1">
                    <span v-for="i in kafka.rarity" :key="i" class="text-[#f59e0b] text-sm">★</span>
                  </div>
                  <p class="text-xs text-[#6b4f8a] font-mono tracking-widest">{{ kafka.element }} · {{ kafka.path }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Second photo — offset card -->
          <div class="absolute -bottom-8 -right-4 w-32 h-40 rounded-sm overflow-hidden border border-[#2d1f4e]"
               style="box-shadow: 0 20px 60px rgba(0,0,0,0.6);">
            <img :src="`${BASE}/assets/kafka/kafka-4.jpg`"
                 alt="Kafka"
                 class="w-full h-full object-cover"
                 style="filter: brightness(0.7) saturate(0.8);" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#03010a]/60 to-transparent"></div>
          </div>
        </div>

        <!-- Right: tabbed info -->
        <div class="lg:pt-8">

          <!-- Identity tags -->
          <div class="flex flex-wrap gap-2 mb-8">
            <span v-for="tag in ['DoT DPS', 'DoT Enabler', 'Nihility', '5★']" :key="tag"
                  class="px-3 py-1 text-[10px] tracking-widest uppercase border border-[#2d1f4e] bg-[#130d22] text-[#a78bca] font-mono">
              {{ tag }}
            </span>
          </div>

          <!-- Tabs -->
          <div class="flex gap-0 mb-8 border-b border-[#2d1f4e]">
            <button v-for="tab in tabs" :key="tab.id"
                    class="px-6 py-3 text-xs tracking-widest uppercase font-mono transition-all duration-200 relative"
                    :class="activeTab === tab.id ? 'text-[#c084fc]' : 'text-[#6b4f8a] hover:text-[#a78bca]'"
                    @click="activeTab = tab.id">
              {{ tab.label }}
              <div v-if="activeTab === tab.id"
                   class="absolute bottom-0 left-0 right-0 h-px bg-[#7c3aed]"></div>
            </button>
          </div>

          <!-- Tab: Lore -->
          <div v-if="activeTab === 'lore'" class="space-y-6 animate-fade-in">
            <p class="text-[#a78bca] text-sm leading-relaxed">{{ lore.intro }}</p>
            <div class="border-l-2 border-[#7c3aed]/50 pl-4">
              <p class="text-[10px] text-[#6b4f8a] tracking-widest uppercase font-mono mb-2">Spirit Whisper</p>
              <p class="text-[#a78bca] text-sm leading-relaxed">{{ lore.spiritWhisper }}</p>
            </div>
            <blockquote class="text-[#c084fc] text-sm italic leading-relaxed"
                        style="text-shadow: 0 0 20px rgba(192,132,252,0.3)">
              {{ lore.quote2 }}
            </blockquote>
          </div>

          <!-- Tab: Stats -->
          <div v-if="activeTab === 'stats'" class="space-y-5 animate-fade-in">
            <div v-for="(value, key) in kafka.stats" :key="key" class="group">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs text-[#6b4f8a] tracking-widest uppercase font-mono">{{ key }}</span>
                <span class="text-sm font-mono text-[#c084fc]">{{ value }}</span>
              </div>
              <div class="h-0.5 bg-[#1e1535] overflow-hidden">
                <div class="h-full bg-gradient-to-r from-[#7c3aed] to-[#e879f9] transition-all duration-1000"
                     :style="{ width: `${Math.min((value / 1200) * 100, 100)}%` }">
                </div>
              </div>
            </div>
            <!-- Extra game info -->
            <div class="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-[#1e1535]">
              <div v-for="info in [
                { label: 'Voice (JP)', value: 'Shizuka Itou' },
                { label: 'Role', value: 'DoT DPS' },
                { label: 'Signature LC', value: 'Patience Is All You Need' },
                { label: 'Core Mechanic', value: 'DoT Detonation' },
              ]" :key="info.label">
                <p class="text-[10px] text-[#6b4f8a] tracking-widest uppercase font-mono mb-1">{{ info.label }}</p>
                <p class="text-xs text-[#a78bca]">{{ info.value }}</p>
              </div>
            </div>
          </div>

          <!-- Tab: Traits -->
          <div v-if="activeTab === 'traits'" class="animate-fade-in">
            <div class="grid grid-cols-2 gap-3 mb-8">
              <div v-for="trait in traits" :key="trait.label"
                   class="flex items-center gap-3 p-3 border border-[#1e1535] bg-[#0a0515] hover:border-[#7c3aed]/30 transition-colors duration-200">
                <span class="text-[#7c3aed] text-xs">{{ trait.icon }}</span>
                <span class="text-xs text-[#a78bca] tracking-widest uppercase font-mono">{{ trait.label }}</span>
              </div>
            </div>
            <div class="p-4 border border-[#2d1f4e]/50 bg-[#0a0515]">
              <p class="text-[10px] text-[#6b4f8a] tracking-widest uppercase font-mono mb-3">Symbolisme</p>
              <p class="text-xs text-[#a78bca] leading-relaxed">
                Kafka digambarkan dengan motif <span class="text-[#c084fc]">laba-laba</span> — menarik benang dari balik layar. Eidolonnya menggunakan istilah musik Italia (<span class="text-[#c084fc]">Da Capo, Fortississimo, Recitativo</span>), memperkuat kesan ia seperti konduktor yang mengatur ritme battle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
