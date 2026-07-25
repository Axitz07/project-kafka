<script setup>
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import ProfileSection from './components/ProfileSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <div class="min-h-screen bg-[#05030a]">
    <NavBar />
    <main>
      <HeroSection />
      <ProfileSection />
      <SkillsSection />
    </main>
    <FooterSection />
  </div>
</template>
