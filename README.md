# Weather Forecast App

Aplikasi prakiraan cuaca yang dibangun dengan React + TypeScript + Vite. Aplikasi ini menampilkan data cuaca real-time untuk Jakarta menggunakan Open-Meteo API dengan visualisasi chart dan tabel yang interaktif.

## Fitur

- 🌡️ Tampilan suhu real-time
- 📊 Grafik suhu per jam menggunakan Chart.js
- 📋 Tabel data cuaca dengan pagination
- 🎨 UI modern dengan Tailwind CSS
- 📱 Responsive design
- ⚡ Fast refresh dengan Vite

## Teknologi yang Digunakan

- **React 19** - Library UI
- **TypeScript** - Type safety
- **Vite** - Build tool dan dev server
- **Tailwind CSS** - Styling
- **Chart.js** - Visualisasi data
- **React Icons** - Icon library
- **Open-Meteo API** - Data cuaca

## Prasyarat

Pastikan sudah terinstall:
- Node.js (versi 18 atau lebih baru)
- npm atau yarn

## Instalasi dan Menjalankan Proyek

### 1. Clone atau Download Proyek
```bash
# Jika menggunakan git
git clone <repository-url>
cd weather

# Atau extract file zip ke folder weather
```

### 2. Install Dependencies
```bash
# Menggunakan npm
npm install

# Atau menggunakan yarn
yarn install
```

### 3. Menjalankan Development Server
```bash
# Menggunakan npm
npm run dev

# Atau menggunakan yarn
yarn dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### 4. Build untuk Production
```bash
# Menggunakan npm
npm run build

# Atau menggunakan yarn
yarn build
```

### 5. Preview Build Production
```bash
# Menggunakan npm
npm run preview

# Atau menggunakan yarn
yarn preview
```

## Scripts yang Tersedia

- `npm run dev` - Menjalankan development server
- `npm run build` - Build aplikasi untuk production
- `npm run lint` - Menjalankan ESLint untuk code quality
- `npm run preview` - Preview build production

## Struktur Proyek

```
weather/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── App.tsx          # Komponen utama
│   ├── App.css          # Styling utama
│   ├── index.css        # Global styles
│   └── main.tsx         # Entry point
├── package.json
├── vite.config.ts       # Konfigurasi Vite
├── tsconfig.json        # Konfigurasi TypeScript
└── README.md
```

## API yang Digunakan

Aplikasi menggunakan [Open-Meteo API](https://open-meteo.com/) untuk mendapatkan data cuaca Jakarta:
- Endpoint: `https://api.open-meteo.com/v1/forecast`
- Parameter: `latitude=-6.2&longitude=106.8&hourly=temperature_2m`
- Data: Suhu per jam untuk koordinat Jakarta

## Troubleshooting

### Port sudah digunakan
Jika port 5173 sudah digunakan, Vite akan otomatis menggunakan port lain (5174, 5175, dst).

### Error saat install dependencies
```bash
# Hapus node_modules dan package-lock.json/yarn.lock
rm -rf node_modules package-lock.json
npm install

# Atau untuk yarn
rm -rf node_modules yarn.lock
yarn install
```

### Build error
Pastikan semua dependencies sudah terinstall dan tidak ada error TypeScript:
```bash
npm run lint
```

## Pengembangan Lebih Lanjut

Untuk menambah fitur atau memodifikasi aplikasi:

1. **Menambah lokasi lain**: Ubah parameter `latitude` dan `longitude` di `App.tsx`
2. **Menambah data cuaca**: Tambahkan parameter lain di API call (humidity, wind_speed, dll)
3. **Styling**: Modifikasi `App.css` atau gunakan Tailwind classes
4. **Chart**: Kustomisasi chart di konfigurasi Chart.js

## Lisensi

Proyek ini dibuat untuk keperluan pembelajaran dan pengembangan.