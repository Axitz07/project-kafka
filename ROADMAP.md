# 🗺️ ROADMAP — My Bini Kafka Fan Page

> Rencana pengembangan web dedicated untuk Kafka (Honkai: Star Rail).
> Fokus utama: UI premium yang mencerminkan estetika Kafka + konten karakter yang lengkap.

---

## ✅ Sudah Selesai

- [x] Setup proyek (Vue 3 + Vite)
- [x] Struktur folder dasar
- [x] Setup Tailwind CSS v4 dengan `@tailwindcss/vite`
- [x] Design system — token warna dark luxury (void black, deep purple, lightning pink)
- [x] Global styles dengan glow utilities (`glow-purple`, `glow-text`, `glow-lightning`)
- [x] `NavBar` — scroll-aware, clean wordmark tanpa emoji, mobile hamburger menu
- [x] `HeroSection` — foto portrait kafka-1 (902×1260) bleed kanan sesuai aspect ratio, parallax mouse, stats inline bottom-right, Intersection Observer fade-in
- [x] `ProfileSection` — 2-col layout: foto portrait kafka-6 full-height kiri, prose+stats kanan, tidak ada tab UI, scroll reveal
- [x] `SkillsSection` — foto landscape kafka-4 (1000×563) sebagai banner accent sesuai aspect ratio, gameplay loop timeline, stat priority
- [x] Cleanup: hapus `HelloWorld.vue`, hapus emoji dari UI, update page title
- [x] Fix image paths dengan `import.meta.env.BASE_URL` untuk dev + production
- [x] `FooterSection` — brand footer dengan element, path, dan rarity info
- [x] `src/data/kafka.js` — data lengkap: stats, skills, light cones, relics, lore facts
- [x] Assets foto Kafka (`kafka-1` s/d `kafka-9`) diintegrasikan ke UI
- [x] Deploy ke GitHub Pages (`https://axitz07.github.io/project-kafka/`)

---

## 🔄 Sedang Dikerjakan

- [ ] Polish responsivitas mobile semua section
- [ ] Pengisian konten lore & trivia di `kafka.js`

---

## 📌 Backlog — Prioritas Tinggi

### 🎨 UI/UX Lanjutan
- [ ] **Efek visual** — partikel petir, animasi lightning saat hover elemen tertentu
- [ ] **Cursor custom** — bergaya Kafka (petir / ungu)
- [ ] **Animasi masuk** — section reveal saat scroll (intersection observer)
- [ ] **Responsif mobile** — polish layout semua section di layar kecil

### 📋 Konten Karakter (Lanjutan)
- [ ] **Eidolon section** — deskripsi dan efek tiap eidolon (E1–E6)
- [ ] **LoreSection** — background story, role di Stellaron Hunters, hubungan dengan karakter lain
- [ ] **GallerySection** — splash art, character art, in-game screenshots (lightbox)
- [ ] **Trivia** — fakta dan detail unik tentang Kafka (data sudah ada di `kafka.js`)

---

## 🧩 Ide & Eksplorasi

- [ ] Animasi petir yang muncul saat hover elemen tertentu
- [ ] Cursor custom bergaya Kafka
- [ ] Mode "sinematik" — musik latar dari game (jika aset tersedia)
- [ ] Timeline story Kafka berdasarkan urutan main story
- [ ] Quote favorit dari dialog in-game
- [ ] Easter egg tersembunyi buat fans yang teliti

---

## 🚀 Rilis

| Versi | Target | Deskripsi |
|-------|--------|-----------|
| v0.1 | ✅ Done | Setup proyek |
| v0.2 | ✅ Done | Tailwind CSS, design system, NavBar, HeroSection, ProfileSection, SkillsSection |
| v0.3 | Sekarang | Eidolon, LoreSection, polish mobile, animasi scroll |
| v0.4 | TBD | GallerySection, efek visual premium (partikel, cursor custom) |
| v1.0 | TBD | Full launch, mobile-ready, deploy |

---

> *"She always has that smile on her face. But what's she really thinking?"*
