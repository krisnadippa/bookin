# bookin - GLORIOUS Barbershop Booking & Admin Portal

Sistem reservasi online dan portal manajemen admin barbershop mewah terintegrasi (Next.js 16 + Tailwind CSS).

## Fitur Utama

- **Landing Page & Reservasi Online**:
  - Hero section mewah (Rosewood `#6B0B0C` & Lemon Chiffon `#FFF8CA`).
  - Booking form interaktif dengan pemilihan cabang, tanggal, jam, layanan, master barber, dan alokasi kursi real-time.
  - Galeri style haircut & katalog produk grooming.
  
- **Portal Admin Terintegrasi (`/admin`)**:
  - **Dashboard Keuangan**: Monitoring omzet (harian, mingguan, bulanan, tahunan), beban operasional, laba bersih, rincian omzet per cabang, kanal pembayaran (QRIS, EDC, Tunai), dan buku kas real-time.
  - **Kasir Barbershop (POS)**: Point of sale interaktif untuk layanan & penjualan produk, diskon, cetak struk invoice.
  - **Manajemen Cabang & Kursi**: Pengaturan jumlah kapasitas kursi per cabang pangkas yang otomatis tersinkronisasi dengan booking customer.
  - **Kasbon Karyawan**: Pencatatan pinjaman kasbon staf barber dan potongan otomatis pada slip gaji.
  - **Absensi & Mutasi Cabang**: Absensi harian dan mutasi staf antar cabang.
  - **Booking Manajemen**: Tracking antrean dan alokasi nomor kursi tamu.
  - **Manajemen Stok Produk**: Inventaris barang dengan status Aman, Menipis, dan Kritis.
  - **Slip Gaji (Payroll)**: Perhitungan gaji pokok, komisi pangkas (35%), komisi produk (10%), potongan kasbon, dan BPJS.

## Menjalankan Proyek

```bash
npm install
npm run dev
# atau production build
npm run build
npm start
```
