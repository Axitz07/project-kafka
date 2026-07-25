# 💜 My Bini Kafka — Kafka Fan Page

Website dedicated untuk **Kafka** dari Honkai: Star Rail. Dirancang dengan UI premium yang mencerminkan estetika karakter — gelap, elegan, misterius, dan berkelas. Berisi informasi lengkap seputar karakter Kafka.

## ✨ Konsep

> *"Hanya ada satu Kafka. Dan dia adalah milik kita."*

Website ini bukan sekadar wiki — ini adalah pengalaman visual yang didesain khusus untuk menghargai karakter Kafka. Setiap elemen UI, warna, dan animasi dipilih untuk cocok dengan vibes karakter: ungu gelap, kilat petir, dan pesona yang tidak bisa diabaikan.

## 📋 Konten yang Akan Ada

- **Profil Karakter** — lore, kepribadian, afiliasi (Stellaron Hunters)
- **Stats & Build** — Light Cone terbaik, Relics, stat priority
- **Skill & Eidolon** — penjelasan semua skill + eidolon
- **Lore & Story** — rangkuman cerita dan dialogue memorable
- **Galeri** — art, splash art, in-game screenshots
- **Trivia** — fakta menarik seputar Kafka

## 🎨 Desain & Vibes

- Palet warna: ungu tua (`#1a0a2e`), lavender (`#b39ddb`), petir kuning (`#ffd700`), hitam dalam
- Font: serif elegan untuk heading, sans-serif clean untuk body
- Efek: partikel petir, glow ungu, parallax scroll
- Nuansa: sinematik, dark fantasy, high-end

## 🛠️ Tech Stack

| Tool | Kegunaan |
|------|----------|
| [Vue 3](https://vuejs.org/) | Framework utama (Composition API) |
| [Vite 8](https://vite.dev/) | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| GSAP / CSS Animations | Animasi premium |

## 🚀 Cara Menjalankan

```bash
# Install dependencies
npm install

# Jalankan dev server (http://localhost:5173)
npm run dev

# Build untuk production
npm run build

# Preview hasil build
npm run preview
```

## 📁 Struktur Proyek (Target)

```
my-bini-kafka/
├── src/
│   ├── components/
│   │   ├── HeroSection.vue       # Landing hero dengan splash art Kafka
│   │   ├── ProfileCard.vue       # Kartu profil karakter
│   │   ├── SkillsSection.vue     # Detail skill & eidolon
│   │   ├── BuildGuide.vue        # Rekomendasi build
│   │   ├── LoreSection.vue       # Story & lore
│   │   ├── GallerySection.vue    # Galeri gambar
│   │   └── NavBar.vue            # Navigasi
│   ├── data/
│   │   └── kafka.js              # Semua data karakter Kafka
│   ├── App.vue
│   └── main.js
├── public/
│   └── assets/                   # Gambar Kafka
└── index.html
```

## 🌐 Live Demo

> _(Tambahkan link setelah deploy)_

---

Made with 💜 — untuk waifu terbaik di Honkai: Star Rail.
