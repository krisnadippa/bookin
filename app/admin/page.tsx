"use client";

import React, { useState } from "react";
import Link from "next/link";

// Types
type TabType =
  | "dashboard"
  | "pos"
  | "branches"
  | "bookings"
  | "attendance"
  | "kasbon"
  | "inventory"
  | "payroll";

interface BranchData {
  id: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  hours: string;
  totalChairs: number;
  occupiedChairs: number;
  status: "Buka" | "Tutup";
}

interface BookingItem {
  id: string;
  customer: string;
  phone: string;
  branch: string;
  service: string;
  barber: string;
  chairNo: number;
  date: string;
  time: string;
  status: "Menunggu" | "Sedang Dilayani" | "Selesai" | "Dibatalkan";
  price: number;
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  branch: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  status: "Hadir" | "Izin" | "Sakit" | "Alpa";
  shift: string;
  totalHadir: number;
  totalIzin: number;
  baseSalary: number;
  avatar: string;
}

interface KasbonRecord {
  id: string;
  staffId: string;
  staffName: string;
  branch: string;
  amount: number;
  monthlyDeduction: number;
  remainingAmount: number;
  date: string;
  purpose: string;
  status: "Disetujui" | "Menunggu" | "Lunas";
}

interface ProductStock {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  minStock: number;
  buyPrice: number;
  sellPrice: number;
  status: "Aman" | "Menipis" | "Kritis";
}

interface CartItem {
  id: string;
  name: string;
  type: "Layanan" | "Produk";
  price: number;
  qty: number;
}

interface FinancialTransaction {
  id: string;
  date: string;
  type: "inflow" | "outflow";
  category: "Pemasukan POS" | "Penjualan Produk" | "Komisi Barber" | "Restock Produk" | "Operasional & Utilitas" | "Cicilan Kasbon" | "Pemeliharaan & Alat";
  description: string;
  branch: string;
  paymentMethod: string;
  amount: number;
  status: "Lunas" | "Selesai";
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [selectedBranchFilter, setSelectedBranchFilter] = useState<string>("Semua Cabang");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // --- KEUANGAN & PEMASUKAN STATE ---
  const [financePeriod, setFinancePeriod] = useState<"Hari Ini" | "Minggu Ini" | "Bulan Ini" | "Tahun Ini">("Bulan Ini");
  const [financeTypeFilter, setFinanceTypeFilter] = useState<"Semua" | "inflow" | "outflow">("Semua");
  const [financeSearch, setFinanceSearch] = useState("");
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [newExpenseCat, setNewExpenseCat] = useState<FinancialTransaction["category"]>("Operasional & Utilitas");
  const [newExpenseDesc, setNewExpenseDesc] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState<number>(150000);
  const [newExpenseBranch, setNewExpenseBranch] = useState("Senopati Heritage");
  const [newExpenseMethod, setNewExpenseMethod] = useState("Kasir Tunai");

  const [financialTransactions, setFinancialTransactions] = useState<FinancialTransaction[]>([
    {
      id: "TRX-GLR-9942",
      date: "18 Nov 2025, 14:45 WIB",
      type: "inflow",
      category: "Pemasukan POS",
      description: "Signature Gentleman Cut + Pomade (Bpk. Denny)",
      branch: "Senopati Heritage",
      paymentMethod: "QRIS",
      amount: 315000,
      status: "Lunas",
    },
    {
      id: "TRX-GLR-9941",
      date: "18 Nov 2025, 13:20 WIB",
      type: "inflow",
      category: "Pemasukan POS",
      description: "The Royal Treatment (Bpk. Andi Nugraha)",
      branch: "SCBD Executive Lounge",
      paymentMethod: "Kartu Debit",
      amount: 275000,
      status: "Lunas",
    },
    {
      id: "TRX-GLR-9940",
      date: "18 Nov 2025, 12:00 WIB",
      type: "outflow",
      category: "Restock Produk",
      description: "Restock 2 Lusin Rosewood Pomade & Clay",
      branch: "Senopati Heritage",
      paymentMethod: "Transfer Bank",
      amount: 2160000,
      status: "Selesai",
    },
    {
      id: "TRX-GLR-9939",
      date: "18 Nov 2025, 11:30 WIB",
      type: "inflow",
      category: "Pemasukan POS",
      description: "Royal Hot Towel Shave (Bpk. Faisal)",
      branch: "Dharmawangsa Atelier",
      paymentMethod: "QRIS",
      amount: 120000,
      status: "Lunas",
    },
    {
      id: "TRX-GLR-9938",
      date: "18 Nov 2025, 10:15 WIB",
      type: "outflow",
      category: "Pemeliharaan & Alat",
      description: "Servis Asah Mata Pisau Straight Razor & Clipper",
      branch: "Senopati Heritage",
      paymentMethod: "Kasir Tunai",
      amount: 350000,
      status: "Selesai",
    },
    {
      id: "TRX-GLR-9937",
      date: "17 Nov 2025, 19:40 WIB",
      type: "inflow",
      category: "Penjualan Produk",
      description: "Pembelian 2x Gentleman's Beard Elixir",
      branch: "Pondok Indah Sanctuary",
      paymentMethod: "QRIS",
      amount: 290000,
      status: "Lunas",
    },
    {
      id: "TRX-GLR-9936",
      date: "17 Nov 2025, 17:00 WIB",
      type: "inflow",
      category: "Cicilan Kasbon",
      description: "Potongan Kasbon Alex 'The Blade' Tan (Otomatis Payroll)",
      branch: "Senopati Heritage",
      paymentMethod: "Potong Payroll",
      amount: 500000,
      status: "Lunas",
    },
    {
      id: "TRX-GLR-9935",
      date: "17 Nov 2025, 15:30 WIB",
      type: "outflow",
      category: "Operasional & Utilitas",
      description: "Laundry 120 Handuk Panas & Disinfektan Barber",
      branch: "SCBD Executive Lounge",
      paymentMethod: "Kasir Tunai",
      amount: 240000,
      status: "Selesai",
    },
    {
      id: "TRX-GLR-9934",
      date: "16 Nov 2025, 14:10 WIB",
      type: "outflow",
      category: "Operasional & Utilitas",
      description: "Tagihan Listrik & WiFi High-Speed Cabang",
      branch: "Senopati Heritage",
      paymentMethod: "Auto Debit",
      amount: 1450000,
      status: "Selesai",
    },
  ]);

  // --- 1. MANAJEMEN CABANG & KURSI ---
  const [branches, setBranches] = useState<BranchData[]>([
    {
      id: "senopati",
      name: "Senopati Heritage",
      area: "Jakarta Selatan",
      address: "Jl. Senopati No. 42, Kebayoran Baru",
      phone: "+62 811-9876-5431",
      hours: "09:00 - 21:00 WIB",
      totalChairs: 6,
      occupiedChairs: 4,
      status: "Buka",
    },
    {
      id: "scbd",
      name: "SCBD Executive Lounge",
      area: "Financial District",
      address: "Pacific Place Mall, Level 3, SCBD",
      phone: "+62 811-9876-5432",
      hours: "10:00 - 22:00 WIB",
      totalChairs: 8,
      occupiedChairs: 5,
      status: "Buka",
    },
    {
      id: "dharmawangsa",
      name: "Dharmawangsa Atelier",
      area: "Jakarta Selatan",
      address: "Jl. Dharmawangsa VI No. 18, Kebayoran Baru",
      phone: "+62 811-9876-5433",
      hours: "09:00 - 21:00 WIB",
      totalChairs: 4,
      occupiedChairs: 3,
      status: "Buka",
    },
    {
      id: "pondok-indah",
      name: "Pondok Indah Sanctuary",
      area: "Jakarta Selatan",
      address: "Plaza Pondok Indah 2, Blok B-12",
      phone: "+62 811-9876-5434",
      hours: "09:00 - 21:00 WIB",
      totalChairs: 5,
      occupiedChairs: 2,
      status: "Buka",
    },
  ]);

  const updateBranchChairs = (branchId: string, delta: number) => {
    setBranches((prev) =>
      prev.map((b) => {
        if (b.id === branchId) {
          const newTotal = Math.max(1, b.totalChairs + delta);
          return {
            ...b,
            totalChairs: newTotal,
            occupiedChairs: Math.min(b.occupiedChairs, newTotal),
          };
        }
        return b;
      })
    );
  };

  // --- 2. DATA STAF & PINDAH CABANG ---
  const [staffList, setStaffList] = useState<StaffMember[]>([
    {
      id: "STF-01",
      name: "Alex 'The Blade' Tan",
      role: "Master Barber",
      branch: "Senopati Heritage",
      phone: "0812-3456-7801",
      checkIn: "08:45 WIB",
      checkOut: "-",
      status: "Hadir",
      shift: "Pagi (09:00 - 17:00)",
      totalHadir: 24,
      totalIzin: 1,
      baseSalary: 4500000,
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: "STF-02",
      name: "Rian Kurniawan",
      role: "Senior Stylist",
      branch: "SCBD Executive Lounge",
      phone: "0812-3456-7802",
      checkIn: "09:50 WIB",
      checkOut: "-",
      status: "Hadir",
      shift: "Middle (10:00 - 18:00)",
      totalHadir: 25,
      totalIzin: 0,
      baseSalary: 4000000,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: "STF-03",
      name: "David Gunawan",
      role: "Shaving Artisan",
      branch: "Dharmawangsa Atelier",
      phone: "0812-3456-7803",
      checkIn: "08:55 WIB",
      checkOut: "-",
      status: "Hadir",
      shift: "Pagi (09:00 - 17:00)",
      totalHadir: 23,
      totalIzin: 2,
      baseSalary: 3800000,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: "STF-04",
      name: "Bagus Pratama",
      role: "Creative Barber",
      branch: "Pondok Indah Sanctuary",
      phone: "0812-3456-7804",
      checkIn: "-",
      checkOut: "-",
      status: "Izin",
      shift: "Sore (13:00 - 21:00)",
      totalHadir: 22,
      totalIzin: 3,
      baseSalary: 3800000,
      avatar:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: "STF-05",
      name: "Dimas Anggara",
      role: "Junior Barber & Washer",
      branch: "Senopati Heritage",
      phone: "0812-3456-7805",
      checkIn: "08:30 WIB",
      checkOut: "-",
      status: "Hadir",
      shift: "Pagi (09:00 - 17:00)",
      totalHadir: 26,
      totalIzin: 0,
      baseSalary: 3000000,
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
    },
  ]);

  // Modal Pindah Cabang Staf
  const [transferModalStaff, setTransferModalStaff] = useState<StaffMember | null>(null);
  const [targetBranchForTransfer, setTargetBranchForTransfer] = useState<string>("SCBD Executive Lounge");

  const handleExecuteBranchTransfer = () => {
    if (!transferModalStaff) return;
    setStaffList((prev) =>
      prev.map((s) =>
        s.id === transferModalStaff.id ? { ...s, branch: targetBranchForTransfer } : s
      )
    );
    alert(
      `Sukses memindahkan ${transferModalStaff.name} dari ${transferModalStaff.branch} ke ${targetBranchForTransfer}!`
    );
    setTransferModalStaff(null);
  };

  const toggleStaffAttendance = (id: string) => {
    setStaffList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === "Hadir" ? "Izin" : "Hadir";
          return {
            ...item,
            status: nextStatus,
            checkIn: nextStatus === "Hadir" ? "09:00 WIB" : "-",
          };
        }
        return item;
      })
    );
  };

  // --- 3. DATA KASBON KARYAWAN ---
  const [kasbonList, setKasbonList] = useState<KasbonRecord[]>([
    {
      id: "KSB-001",
      staffId: "STF-01",
      staffName: "Alex 'The Blade' Tan",
      branch: "Senopati Heritage",
      amount: 1500000,
      monthlyDeduction: 500000,
      remainingAmount: 500000,
      date: "02 Nov 2025",
      purpose: "Renovasi perlengkapan gunting pribadi & motor",
      status: "Disetujui",
    },
    {
      id: "KSB-002",
      staffId: "STF-03",
      staffName: "David Gunawan",
      branch: "Dharmawangsa Atelier",
      amount: 800000,
      monthlyDeduction: 400000,
      remainingAmount: 400000,
      date: "08 Nov 2025",
      purpose: "Biaya berobat keluarga",
      status: "Disetujui",
    },
    {
      id: "KSB-003",
      staffId: "STF-04",
      staffName: "Bagus Pratama",
      branch: "Pondok Indah Sanctuary",
      amount: 600000,
      monthlyDeduction: 300000,
      remainingAmount: 600000,
      date: "15 Nov 2025",
      purpose: "Keperluan mendadak awal bulan",
      status: "Menunggu",
    },
  ]);

  // Form Input Kasbon Baru
  const [newKasbonStaff, setNewKasbonStaff] = useState("Alex 'The Blade' Tan");
  const [newKasbonAmount, setNewKasbonAmount] = useState<number>(500000);
  const [newKasbonDeduction, setNewKasbonDeduction] = useState<number>(250000);
  const [newKasbonPurpose, setNewKasbonPurpose] = useState("");

  const handleAddKasbon = (e: React.FormEvent) => {
    e.preventDefault();
    const staff = staffList.find((s) => s.name === newKasbonStaff) || staffList[0];
    const newRecord: KasbonRecord = {
      id: `KSB-00${kasbonList.length + 1}`,
      staffId: staff.id,
      staffName: staff.name,
      branch: staff.branch,
      amount: Number(newKasbonAmount),
      monthlyDeduction: Number(newKasbonDeduction),
      remainingAmount: Number(newKasbonAmount),
      date: "18 Nov 2025",
      purpose: newKasbonPurpose || "Keperluan mendesak pribadi",
      status: "Disetujui",
    };
    setKasbonList([newRecord, ...kasbonList]);
    setNewKasbonPurpose("");
    alert(`Kasbon sebesar ${formatRupiah(newKasbonAmount)} untuk ${staff.name} berhasil dicatat.`);
  };

  const updateKasbonStatus = (id: string, newStatus: KasbonRecord["status"]) => {
    setKasbonList((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: newStatus } : k))
    );
  };

  // --- 4. DATA BOOKINGS DENGAN ALOKASI KURSI ---
  const [bookings, setBookings] = useState<BookingItem[]>([
    {
      id: "GLR-1021",
      customer: "Bima Widyadhana",
      phone: "0812-3321-8890",
      branch: "Senopati Heritage",
      service: "Signature Gentleman Cut",
      barber: "Alex 'The Blade' Tan",
      chairNo: 1,
      date: "18 Nov 2025",
      time: "10:00",
      status: "Selesai",
      price: 150000,
    },
    {
      id: "GLR-1022",
      customer: "Andi Nugraha",
      phone: "0811-9822-1209",
      branch: "SCBD Executive Lounge",
      service: "The Royal Treatment",
      barber: "Rian Kurniawan",
      chairNo: 2,
      date: "18 Nov 2025",
      time: "11:15",
      status: "Sedang Dilayani",
      price: 275000,
    },
    {
      id: "GLR-1023",
      customer: "Faisal Ashari",
      phone: "0813-8871-6652",
      branch: "Dharmawangsa Atelier",
      service: "Royal Hot Towel Shave",
      barber: "David Gunawan",
      chairNo: 1,
      date: "18 Nov 2025",
      time: "13:00",
      status: "Menunggu",
      price: 120000,
    },
    {
      id: "GLR-1024",
      customer: "Reza Rahardian",
      phone: "0817-4491-0021",
      branch: "Senopati Heritage",
      service: "Scalp Detox & Hair Spa",
      barber: "Dimas Anggara",
      chairNo: 3,
      date: "18 Nov 2025",
      time: "14:30",
      status: "Menunggu",
      price: 180000,
    },
    {
      id: "GLR-1025",
      customer: "Kevin Sanjaya",
      phone: "0819-0129-3847",
      branch: "Pondok Indah Sanctuary",
      service: "Father & Son Classic",
      barber: "Bagus Pratama",
      chairNo: 2,
      date: "18 Nov 2025",
      time: "16:00",
      status: "Menunggu",
      price: 255000,
    },
  ]);

  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingStatusFilter, setBookingStatusFilter] = useState("Semua");

  const updateBookingStatus = (id: string, newStatus: BookingItem["status"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  // --- 5. DATA INVENTARIS PRODUK ---
  const [inventory, setInventory] = useState<ProductStock[]>([
    {
      id: "PRD-01",
      name: "Rosewood Classic Pomade",
      sku: "RW-POM-01",
      category: "Styling",
      stock: 42,
      minStock: 15,
      buyPrice: 90000,
      sellPrice: 165000,
      status: "Aman",
    },
    {
      id: "PRD-02",
      name: "Matte Texture Clay",
      sku: "RW-CLY-02",
      category: "Styling",
      stock: 18,
      minStock: 20,
      buyPrice: 95000,
      sellPrice: 175000,
      status: "Menipis",
    },
    {
      id: "PRD-03",
      name: "Gentleman's Beard Elixir",
      sku: "RW-BRD-03",
      category: "Perawatan",
      stock: 25,
      minStock: 10,
      buyPrice: 75000,
      sellPrice: 145000,
      status: "Aman",
    },
    {
      id: "PRD-04",
      name: "Sea Salt Volumizing Spray",
      sku: "RW-SLT-04",
      category: "Styling",
      stock: 6,
      minStock: 12,
      buyPrice: 70000,
      sellPrice: 135000,
      status: "Kritis",
    },
    {
      id: "PRD-05",
      name: "Artisan Straight Razor Kit",
      sku: "RW-RZR-05",
      category: "Peralatan",
      stock: 12,
      minStock: 5,
      buyPrice: 220000,
      sellPrice: 385000,
      status: "Aman",
    },
    {
      id: "PRD-06",
      name: "Cooling Scalp Tonic",
      sku: "RW-TNC-06",
      category: "Perawatan",
      stock: 30,
      minStock: 15,
      buyPrice: 65000,
      sellPrice: 125000,
      status: "Aman",
    },
  ]);

  const addStock = (id: string, amount: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStock = item.stock + amount;
          const newStatus =
            newStock <= 8 ? "Kritis" : newStock <= item.minStock ? "Menipis" : "Aman";
          return { ...item, stock: newStock, status: newStatus };
        }
        return item;
      })
    );
  };

  // --- 6. POS / KASIR STATE ---
  const POS_ITEMS = [
    { id: "S-1", name: "Signature Gentleman Cut", type: "Layanan" as const, price: 150000 },
    { id: "S-2", name: "Royal Hot Towel Shave", type: "Layanan" as const, price: 120000 },
    { id: "S-3", name: "The Royal Treatment", type: "Layanan" as const, price: 275000 },
    { id: "S-4", name: "Scalp Detox & Hair Spa", type: "Layanan" as const, price: 180000 },
    { id: "S-5", name: "Father & Son Classic", type: "Layanan" as const, price: 255000 },
    { id: "S-6", name: "Grey Blending Color", type: "Layanan" as const, price: 195000 },
    { id: "P-1", name: "Rosewood Classic Pomade", type: "Produk" as const, price: 165000 },
    { id: "P-2", name: "Matte Texture Clay", type: "Produk" as const, price: 175000 },
    { id: "P-3", name: "Gentleman's Beard Elixir", type: "Produk" as const, price: 145000 },
    { id: "P-4", name: "Sea Salt Volumizing Spray", type: "Produk" as const, price: 135000 },
    { id: "P-5", name: "Artisan Straight Razor Kit", type: "Produk" as const, price: 385000 },
    { id: "P-6", name: "Cooling Scalp Tonic", type: "Produk" as const, price: 125000 },
  ];

  const [cart, setCart] = useState<CartItem[]>([
    { id: "S-1", name: "Signature Gentleman Cut", type: "Layanan", price: 150000, qty: 1 },
    { id: "P-1", name: "Rosewood Classic Pomade", type: "Produk", price: 165000, qty: 1 },
  ]);
  const [posBarber, setPosBarber] = useState("Alex 'The Blade' Tan");
  const [posCustomer, setPosCustomer] = useState("");
  const [posChairNo, setPosChairNo] = useState<number>(1);
  const [posPaymentMethod, setPosPaymentMethod] = useState<"QRIS" | "Tunai" | "Kartu Debit" | "Transfer">("QRIS");
  const [posFilterType, setPosFilterType] = useState<"Semua" | "Layanan" | "Produk">("Semua");
  const [posDiscount, setPosDiscount] = useState<number>(0);
  const [posReceipt, setPosReceipt] = useState<{
    invoiceNo: string;
    items: CartItem[];
    subtotal: number;
    discount: number;
    total: number;
    paymentMethod: string;
    customer: string;
    barber: string;
    chairNo: number;
    branch: string;
    date: string;
  } | null>(null);

  const addToCart = (item: { id: string; name: string; type: "Layanan" | "Produk"; price: number }) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.id === id) {
            const newQty = c.qty + delta;
            return newQty > 0 ? { ...c, qty: newQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const cartTotal = Math.max(0, cartSubtotal - posDiscount);

  const handleProcessCheckout = () => {
    if (cart.length === 0) {
      alert("Keranjang masih kosong!");
      return;
    }
    const inv = `INV-GLR-${Math.floor(10000 + Math.random() * 90000)}`;
    const branchName = selectedBranchFilter === "Semua Cabang" ? "Senopati Heritage" : selectedBranchFilter;
    setPosReceipt({
      invoiceNo: inv,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: posDiscount,
      total: cartTotal,
      paymentMethod: posPaymentMethod,
      customer: posCustomer || "Pelanggan Walk-In",
      barber: posBarber,
      chairNo: posChairNo,
      branch: branchName,
      date: "18 Nov 2025, 15:10 WIB",
    });

    // Otomatis masukkan ke catatan arus kas masuk (Inflow)
    const newTx: FinancialTransaction = {
      id: inv,
      date: "18 Nov 2025, 15:10 WIB",
      type: "inflow",
      category: "Pemasukan POS",
      description: `Transaksi ${posCustomer || "Walk-In"} (${cart.map((c) => `${c.qty}x ${c.name}`).join(", ")})`,
      branch: branchName,
      paymentMethod: posPaymentMethod,
      amount: cartTotal,
      status: "Lunas",
    };
    setFinancialTransactions((prev) => [newTx, ...prev]);

    setCart([]);
    setPosCustomer("");
    setPosDiscount(0);
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const newTx: FinancialTransaction = {
      id: `EXP-GLR-${Math.floor(1000 + Math.random() * 9000)}`,
      date: "18 Nov 2025, 15:20 WIB",
      type: "outflow",
      category: newExpenseCat,
      description: newExpenseDesc || "Pengeluaran Operasional",
      branch: newExpenseBranch,
      paymentMethod: newExpenseMethod,
      amount: Number(newExpenseAmount),
      status: "Selesai",
    };
    setFinancialTransactions((prev) => [newTx, ...prev]);
    setShowExpenseModal(false);
    setNewExpenseDesc("");
    alert(`Pengeluaran sebesar ${formatRupiah(newExpenseAmount)} berhasil dicatat di buku kas.`);
  };

  // Data ringkasan keuangan berdasarkan periode aktif
  const getFinanceData = () => {
    const totalKasbon = kasbonList
      .filter((k) => k.status === "Disetujui")
      .reduce((acc, k) => acc + k.remainingAmount, 0);

    switch (financePeriod) {
      case "Hari Ini":
        return {
          income: 4850000,
          growth: "+18.4% vs target harian",
          serviceIncome: 3680000,
          productIncome: 1170000,
          expense: 1540000,
          expenseRatio: "31.7% dari omzet",
          netProfit: 3310000,
          margin: "68.2%",
          activeKasbon: totalKasbon,
          scheduledDeduction: 1200000,
          haircutCount: 32,
          shaveCount: 14,
          productCount: 8,
        };
      case "Minggu Ini":
        return {
          income: 28450000,
          growth: "+12.1% vs minggu lalu",
          serviceIncome: 21620000,
          productIncome: 6830000,
          expense: 10850000,
          expenseRatio: "38.1% dari omzet",
          netProfit: 17600000,
          margin: "61.9%",
          activeKasbon: totalKasbon,
          scheduledDeduction: 1200000,
          haircutCount: 195,
          shaveCount: 78,
          productCount: 46,
        };
      case "Tahun Ini":
        return {
          income: 948000000,
          growth: "+22.5% YoY",
          serviceIncome: 720480000,
          productIncome: 227520000,
          expense: 365200000,
          expenseRatio: "38.5% dari omzet",
          netProfit: 582800000,
          margin: "61.5%",
          activeKasbon: totalKasbon,
          scheduledDeduction: 1200000,
          haircutCount: 7450,
          shaveCount: 2900,
          productCount: 1580,
        };
      case "Bulan Ini":
      default:
        return {
          income: 84500000,
          growth: "+14.8% vs bulan lalu",
          serviceIncome: 64220000,
          productIncome: 20280000,
          expense: 32150000,
          expenseRatio: "38.0% dari omzet",
          netProfit: 52350000,
          margin: "62.0%",
          activeKasbon: totalKasbon,
          scheduledDeduction: 1200000,
          haircutCount: 842,
          shaveCount: 297,
          productCount: 134,
        };
    }
  };

  const financeData = getFinanceData();

  const filteredFinancialTransactions = financialTransactions.filter((tx) => {
    const matchType =
      financeTypeFilter === "Semua" ? true : tx.type === financeTypeFilter;
    const matchSearch =
      tx.id.toLowerCase().includes(financeSearch.toLowerCase()) ||
      tx.description.toLowerCase().includes(financeSearch.toLowerCase()) ||
      tx.branch.toLowerCase().includes(financeSearch.toLowerCase()) ||
      tx.category.toLowerCase().includes(financeSearch.toLowerCase());
    const matchBranch =
      selectedBranchFilter === "Semua Cabang" ? true : tx.branch === selectedBranchFilter;
    return matchType && matchSearch && matchBranch;
  });

  // --- 7. SLIP GAJI & PEMOTONGAN KASBON OTOMATIS ---
  const [selectedPayslip, setSelectedPayslip] = useState<{
    staffName: string;
    role: string;
    branch: string;
    period: string;
    baseSalary: number;
    cutsCount: number;
    cutsCommission: number;
    productCommission: number;
    bonus: number;
    bpjsDeduction: number;
    kasbonDeduction: number;
    netSalary: number;
  } | null>(null);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Hitung ringkasan kasbon per staf
  const getStaffKasbonDeduction = (staffName: string) => {
    const activeKasbon = kasbonList.find(
      (k) => k.staffName === staffName && (k.status === "Disetujui" || k.status === "Menunggu")
    );
    return activeKasbon ? activeKasbon.monthlyDeduction : 0;
  };

  return (
    <div className="min-h-screen w-full bg-white text-slate-800 flex flex-col font-sans">
      {/* Top Navbar Clean White */}
      <header className="w-full bg-white text-slate-800 border-b border-slate-200 sticky top-0 z-40 px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
            aria-label="Toggle Navigation"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-[#6B0B0C] text-[#FFF8CA] flex items-center justify-center font-black text-sm shadow-sm">
              G
            </span>
            <div>
              <span className="font-extrabold tracking-wider text-base sm:text-lg text-slate-900 group-hover:text-[#6B0B0C] transition">
                GLORIOUS
              </span>
              <span className="hidden sm:inline-block text-[10px] tracking-widest text-[#6B0B0C] ml-2 font-bold uppercase bg-[#6B0B0C]/10 px-2 py-0.5 rounded">
                Admin Suite
              </span>
            </div>
          </Link>
        </div>

        {/* Global Branch Filter Selector */}
        <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 shadow-xs">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B0B0C" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span className="text-xs text-slate-500 font-medium">Cabang Terpilih:</span>
          <select
            value={selectedBranchFilter}
            onChange={(e) => setSelectedBranchFilter(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
          >
            <option value="Semua Cabang">Semua Cabang (4)</option>
            {branches.map((b) => (
              <option key={b.id} value={b.name}>
                {b.name} ({b.occupiedChairs}/{b.totalChairs} Kursi)
              </option>
            ))}
          </select>
        </div>

        {/* Right user & landing page link */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#6B0B0C] px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition border border-slate-200"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            <span>Landing Page</span>
          </Link>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-[#6B0B0C] text-[#FFF8CA] flex items-center justify-center font-bold text-xs shadow-xs">
              AD
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-slate-900 leading-tight">Admin Manager</div>
              <div className="text-[10px] text-slate-500">GLORIOUS Central</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 w-full relative overflow-hidden bg-[#fafbfc]">
        {/* Sidebar Clean White */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-30 w-64 shrink-0 bg-white text-slate-600 p-4 flex flex-col justify-between border-r border-slate-200 transition-transform duration-300 shadow-sm ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="space-y-6 pt-2">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 px-3 mb-2">
                Manajemen Operasional
              </p>
              <nav className="space-y-1">
                {/* 1. Dashboard Overview */}
                <button
                  onClick={() => {
                    setActiveTab("dashboard");
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                    activeTab === "dashboard"
                      ? "bg-[#6B0B0C] text-[#FFF8CA] font-bold shadow-sm"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="7" height="9" rx="1"></rect>
                    <rect x="14" y="3" width="7" height="5" rx="1"></rect>
                    <rect x="14" y="12" width="7" height="9" rx="1"></rect>
                    <rect x="3" y="16" width="7" height="5" rx="1"></rect>
                  </svg>
                  <span>Dashboard Overview</span>
                </button>

                {/* 2. Kasir POS */}
                <button
                  onClick={() => {
                    setActiveTab("pos");
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                    activeTab === "pos"
                      ? "bg-[#6B0B0C] text-[#FFF8CA] font-bold shadow-sm"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <line x1="6" y1="8" x2="6" y2="8"></line>
                    <line x1="10" y1="8" x2="18" y2="8"></line>
                    <line x1="6" y1="12" x2="6" y2="12"></line>
                    <line x1="10" y1="12" x2="18" y2="12"></line>
                    <line x1="6" y1="16" x2="18" y2="16"></line>
                  </svg>
                  <div className="flex-1 flex justify-between items-center">
                    <span>Kasir Barbershop</span>
                    <span className="text-[9px] bg-[#FFF8CA] text-[#6B0B0C] px-1.5 py-0.5 rounded font-black">
                      POS
                    </span>
                  </div>
                </button>

                {/* 3. Manajemen Cabang & Kursi (NEW) */}
                <button
                  onClick={() => {
                    setActiveTab("branches");
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                    activeTab === "branches"
                      ? "bg-[#6B0B0C] text-[#FFF8CA] font-bold shadow-sm"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <div className="flex-1 flex justify-between items-center">
                    <span>Manajemen Cabang</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full font-bold">
                      {branches.reduce((acc, b) => acc + b.totalChairs, 0)} Kursi
                    </span>
                  </div>
                </button>

                {/* 4. Booking Manajemen */}
                <button
                  onClick={() => {
                    setActiveTab("bookings");
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                    activeTab === "bookings"
                      ? "bg-[#6B0B0C] text-[#FFF8CA] font-bold shadow-sm"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <div className="flex-1 flex justify-between items-center">
                    <span>Booking Manajemen</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-bold">
                      {bookings.filter((b) => b.status === "Menunggu").length}
                    </span>
                  </div>
                </button>

                {/* 5. Absensi & Pindah Cabang Staf */}
                <button
                  onClick={() => {
                    setActiveTab("attendance");
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                    activeTab === "attendance"
                      ? "bg-[#6B0B0C] text-[#FFF8CA] font-bold shadow-sm"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>Absensi &amp; Pindah Cabang</span>
                </button>

                {/* 6. Kasbon Karyawan (NEW) */}
                <button
                  onClick={() => {
                    setActiveTab("kasbon");
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                    activeTab === "kasbon"
                      ? "bg-[#6B0B0C] text-[#FFF8CA] font-bold shadow-sm"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                    <circle cx="12" cy="12" r="2"></circle>
                    <path d="M6 12h.01M18 12h.01"></path>
                  </svg>
                  <div className="flex-1 flex justify-between items-center">
                    <span>Kasbon Karyawan</span>
                    <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded-full font-bold">
                      {kasbonList.length}
                    </span>
                  </div>
                </button>

                {/* 7. Stok Produk */}
                <button
                  onClick={() => {
                    setActiveTab("inventory");
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                    activeTab === "inventory"
                      ? "bg-[#6B0B0C] text-[#FFF8CA] font-bold shadow-sm"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  </svg>
                  <span>Manajemen Stok</span>
                </button>

                {/* 8. Slip Gaji */}
                <button
                  onClick={() => {
                    setActiveTab("payroll");
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                    activeTab === "payroll"
                      ? "bg-[#6B0B0C] text-[#FFF8CA] font-bold shadow-sm"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  <span>Slip Gaji (Payroll)</span>
                </button>
              </nav>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-400">
            <p className="font-bold text-slate-800">GLORIOUS Clean Admin</p>
            <p>Sistem Barbershop Terintegrasi</p>
          </div>
        </aside>

        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/30 z-20 lg:hidden"
          ></div>
        )}

        {/* Main Content Area Clean White */}
        <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-65px)]">
          {/* ========================================================= */}
          {/* TAB 1: DASHBOARD OVERVIEW & KEUANGAN BARBERSHOP */}
          {/* ========================================================= */}
          {activeTab === "dashboard" && (
            <div className="w-full space-y-6">
              {/* Header Dashboard & Filter Periode */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#6B0B0C]/10 text-[#6B0B0C]">
                      Finansial &amp; Operasional
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">• Update Real-time</span>
                  </div>
                  <h1 className="text-2xl font-black text-slate-900 mt-1">
                    Dashboard Keuangan &amp; Pendapatan
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Ringkasan pemasukan layanan pangkas, penjualan produk, beban operasional, serta laba bersih cabang.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Periode Pills */}
                  <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
                    {(["Hari Ini", "Minggu Ini", "Bulan Ini", "Tahun Ini"] as const).map((period) => (
                      <button
                        key={period}
                        onClick={() => setFinancePeriod(period)}
                        className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                          financePeriod === period
                            ? "bg-white text-slate-900 shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <button
                    onClick={() => setShowExpenseModal(true)}
                    className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-slate-200"
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Catat Pengeluaran</span>
                  </button>

                  <button
                    onClick={() => {
                      alert(
                        `Laporan Keuangan GLORIOUS (${financePeriod})\n\nTotal Pemasukan: ${formatRupiah(
                          financeData.income
                        )}\nTotal Pengeluaran: ${formatRupiah(financeData.expense)}\nLaba Bersih: ${formatRupiah(
                          financeData.netProfit
                        )}\n\nLaporan lengkap PDF/Excel berhasil disiapkan!`
                      );
                    }}
                    className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-slate-200"
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <span>Unduh Laporan</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("pos")}
                    className="bg-[#6B0B0C] text-[#FFF8CA] px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#520809] transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span>Buka Kasir POS</span>
                  </button>
                </div>
              </div>

              {/* 4 Kartu Metrik Keuangan Utama */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Total Pemasukan / Omzet */}
                <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200 relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Total Pemasukan ({financePeriod})
                      </span>
                      <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <line x1="12" y1="1" x2="12" y2="23"></line>
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                      </span>
                    </div>
                    <div className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                      {formatRupiah(financeData.income)}
                    </div>
                    <div className="text-[11px] text-emerald-700 font-bold mt-1.5 flex items-center gap-1">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">↑ {financeData.growth}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-slate-600">
                      <span>Layanan Pangkas:</span>
                      <strong className="text-slate-900">{formatRupiah(financeData.serviceIncome)}</strong>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Penjualan Produk:</span>
                      <strong className="text-slate-900">{formatRupiah(financeData.productIncome)}</strong>
                    </div>
                  </div>
                </div>

                {/* 2. Total Pengeluaran Operasional */}
                <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200 relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Beban Pengeluaran ({financePeriod})
                      </span>
                      <span className="p-2 rounded-xl bg-rose-50 text-rose-600">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </span>
                    </div>
                    <div className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                      {formatRupiah(financeData.expense)}
                    </div>
                    <div className="text-[11px] text-slate-500 font-semibold mt-1.5 flex items-center gap-1">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                        {financeData.expenseRatio}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-slate-600">
                      <span>Gaji &amp; Komisi Barber:</span>
                      <strong className="text-slate-900">Rp 21.800.000</strong>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Restock Pomade &amp; Bahan:</span>
                      <strong className="text-slate-900">Rp 5.600.000</strong>
                    </div>
                  </div>
                </div>

                {/* 3. Laba Bersih (Net Profit) */}
                <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200 relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Estimasi Laba Bersih
                      </span>
                      <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                          <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                      </span>
                    </div>
                    <div className="text-2xl lg:text-3xl font-black text-emerald-600 tracking-tight">
                      {formatRupiah(financeData.netProfit)}
                    </div>
                    <div className="text-[11px] text-slate-500 font-semibold mt-1.5 flex items-center gap-1">
                      <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 font-bold">
                        Profit Margin: {financeData.margin}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-slate-600">
                      <span>Kondisi Cashflow:</span>
                      <span className="font-bold text-emerald-600">Sangat Sehat &amp; Kuat</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Bagi Hasil Pemilik:</span>
                      <strong className="text-slate-900">{formatRupiah(financeData.netProfit * 0.7)}</strong>
                    </div>
                  </div>
                </div>

                {/* 4. Kasbon & Piutang Beredar */}
                <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200 relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Total Kasbon Karyawan
                      </span>
                      <span className="p-2 rounded-xl bg-amber-50 text-amber-700">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                          <circle cx="12" cy="12" r="2"></circle>
                          <path d="M6 12h.01M18 12h.01"></path>
                        </svg>
                      </span>
                    </div>
                    <div className="text-2xl lg:text-3xl font-black text-rose-700 tracking-tight">
                      {formatRupiah(financeData.activeKasbon)}
                    </div>
                    <div className="text-[11px] text-slate-500 font-semibold mt-1.5 flex items-center gap-1">
                      <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 font-bold">
                        {kasbonList.filter((k) => k.status === "Disetujui").length} Staf tercatat pinjaman
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-slate-600">
                      <span>Potongan Payroll:</span>
                      <strong className="text-rose-600">-{formatRupiah(financeData.scheduledDeduction)}/bln</strong>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Pelunasan:</span>
                      <button
                        onClick={() => setActiveTab("kasbon")}
                        className="font-bold text-[#6B0B0C] hover:underline cursor-pointer"
                      >
                        Kelola Kasbon →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rincian Komposisi Pemasukan & Kanal Pembayaran (2 Kolom) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Kolom 1: Sumber Pemasukan Layanan vs Produk (7 cols) */}
                <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <div>
                      <h3 className="font-black text-sm text-slate-900">Komposisi Pemasukan Barbershop</h3>
                      <p className="text-xs text-slate-500">
                        Kontribusi pendapatan per kategori layanan dan produk grooming retail ({financePeriod}).
                      </p>
                    </div>
                    <span className="text-xs font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {formatRupiah(financeData.income)}
                    </span>
                  </div>

                  <div className="space-y-3.5 pt-1">
                    {/* Item 1 */}
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-800 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#6B0B0C]"></span>
                          Signature Haircut &amp; Styling (842 Tamu)
                        </span>
                        <span className="text-slate-900">
                          {formatRupiah(financePeriod === "Hari Ini" ? 2200000 : 38450000)} (45.5%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-[#6B0B0C] rounded-full" style={{ width: "45.5%" }}></div>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-800 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                          The Royal Treatment &amp; Hair Spa (112 Sesi)
                        </span>
                        <span className="text-slate-900">
                          {formatRupiah(financePeriod === "Hari Ini" ? 950000 : 18250000)} (21.6%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-amber-600 rounded-full" style={{ width: "21.6%" }}></div>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-800 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                          Hot Towel Shave &amp; Perawatan Brewok (65 Sesi)
                        </span>
                        <span className="text-slate-900">
                          {formatRupiah(financePeriod === "Hari Ini" ? 530000 : 7500000)} (8.9%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: "8.9%" }}></div>
                      </div>
                    </div>

                    {/* Item 4 */}
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-800 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                          Penjualan Pomade, Matte Clay &amp; Styling Wax (128 Pcs)
                        </span>
                        <span className="text-slate-900">
                          {formatRupiah(financePeriod === "Hari Ini" ? 820000 : 14800000)} (17.5%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: "17.5%" }}></div>
                      </div>
                    </div>

                    {/* Item 5 */}
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-800 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                          Tonik Rambut, Beard Elixir &amp; Razor Kits (38 Pcs)
                        </span>
                        <span className="text-slate-900">
                          {formatRupiah(financePeriod === "Hari Ini" ? 350000 : 5500000)} (6.5%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-purple-600 rounded-full" style={{ width: "6.5%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Kolom 2: Arus Dana Metode Pembayaran (5 cols) */}
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100 mb-3">
                      <div>
                        <h3 className="font-black text-sm text-slate-900">Metode Pembayaran Masuk</h3>
                        <p className="text-xs text-slate-500">Penyebaran kanal pembayaran tamu di kasir.</p>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        100% Rekonsiliasi
                      </span>
                    </div>

                    <div className="space-y-3">
                      {/* QRIS */}
                      <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs">
                            QRIS
                          </div>
                          <div>
                            <p className="font-bold text-xs text-slate-900">QRIS &amp; E-Wallet</p>
                            <p className="text-[10px] text-slate-500">BCA QRIS, GoPay, OVO, ShopeePay</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-xs text-slate-900">
                            {formatRupiah(financeData.income * 0.58)}
                          </p>
                          <span className="text-[10px] font-bold text-emerald-600">58% (Mayoritas)</span>
                        </div>
                      </div>

                      {/* EDC / Debit */}
                      <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xs">
                            EDC
                          </div>
                          <div>
                            <p className="font-bold text-xs text-slate-900">Kartu Debit &amp; Kredit</p>
                            <p className="text-[10px] text-slate-500">BCA, Mandiri, BRI, Visa/Master</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-xs text-slate-900">
                            {formatRupiah(financeData.income * 0.27)}
                          </p>
                          <span className="text-[10px] font-bold text-blue-600">27%</span>
                        </div>
                      </div>

                      {/* Cash */}
                      <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-black text-xs">
                            CASH
                          </div>
                          <div>
                            <p className="font-bold text-xs text-slate-900">Tunai (Cash Register)</p>
                            <p className="text-[10px] text-slate-500">Uang fisik di laci kasir cabang</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-xs text-slate-900">
                            {formatRupiah(financeData.income * 0.15)}
                          </p>
                          <span className="text-[10px] font-bold text-amber-700">15%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between items-center">
                    <span>Semua dana non-tunai otomatis terhubung ke rekening GLORIOUS Holding.</span>
                  </div>
                </div>
              </div>

              {/* Tabel Kinerja Finansial per Cabang */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="font-black text-sm text-slate-900">Pemasukan Berdasarkan Cabang Barbershop</h3>
                    <p className="text-xs text-slate-500">
                      Rincian omzet, rata-rata tamu harian, dan okupansi kursi tiap cabang GLORIOUS.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("branches")}
                    className="text-xs font-bold text-[#6B0B0C] hover:underline cursor-pointer"
                  >
                    Kelola Kapasitas Kursi Cabang →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                        <th className="py-3 px-4">Nama Cabang &amp; Alamat</th>
                        <th className="py-3 px-4">Kapasitas Kursi</th>
                        <th className="py-3 px-4">Omzet Bulan Ini</th>
                        <th className="py-3 px-4">Pemasukan Hari Ini</th>
                        <th className="py-3 px-4">Kontribusi</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                      {branches.map((b) => {
                        const rev =
                          b.id === "senopati"
                            ? { monthly: 32400000, today: 1850000, pct: "38.3%" }
                            : b.id === "scbd"
                            ? { monthly: 26850000, today: 1550000, pct: "31.8%" }
                            : b.id === "dharmawangsa"
                            ? { monthly: 14250000, today: 850000, pct: "16.9%" }
                            : { monthly: 11000000, today: 600000, pct: "13.0%" };

                        return (
                          <tr key={b.id} className="hover:bg-slate-50/70 transition">
                            <td className="py-3.5 px-4 font-bold text-slate-900">
                              <div>{b.name}</div>
                              <div className="text-[10px] text-slate-400 font-normal">{b.address}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-bold text-slate-800">
                                {b.occupiedChairs} / {b.totalChairs} Kursi
                              </span>
                              <span className="text-[10px] text-emerald-600 font-semibold block">
                                ({Math.round((b.occupiedChairs / b.totalChairs) * 100)}% Okupansi)
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-extrabold text-slate-900">
                              {formatRupiah(rev.monthly)}
                            </td>
                            <td className="py-3.5 px-4 font-bold text-emerald-700">
                              {formatRupiah(rev.today)}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold text-[11px]">
                                {rev.pct}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                {b.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => {
                                  setSelectedBranchFilter(b.name);
                                  setActiveTab("pos");
                                }}
                                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#6B0B0C] hover:text-[#FFF8CA] text-slate-700 text-[11px] font-bold transition cursor-pointer"
                              >
                                Kasir Cabang
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Buku Kas & Riwayat Transaksi Finansial Terkini */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="font-black text-sm text-slate-900">
                      Buku Kas Transaksi Finansial Terkini (Arus Masuk &amp; Keluar)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Semua transaksi kasir POS, penjualan pomade, potongan kasbon, dan pengeluaran operasional.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Filter Jenis */}
                    <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
                      {(["Semua", "inflow", "outflow"] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setFinanceTypeFilter(t)}
                          className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                            financeTypeFilter === t
                              ? "bg-white text-slate-900 shadow-xs"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          {t === "Semua" ? "Semua" : t === "inflow" ? "Pemasukan (+)" : "Pengeluaran (-)"}
                        </button>
                      ))}
                    </div>

                    {/* Search */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Cari transaksi / cabang..."
                        value={financeSearch}
                        onChange={(e) => setFinanceSearch(e.target.value)}
                        className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-[#6B0B0C] bg-white text-slate-800 w-44 sm:w-56"
                      />
                      <svg
                        className="absolute left-2.5 top-2 text-slate-400"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Table Transactions */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                        <th className="py-3 px-4">No. Invoice &amp; Waktu</th>
                        <th className="py-3 px-4">Kategori</th>
                        <th className="py-3 px-4">Deskripsi Transaksi</th>
                        <th className="py-3 px-4">Cabang</th>
                        <th className="py-3 px-4">Metode</th>
                        <th className="py-3 px-4">Nominal</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                      {filteredFinancialTransactions.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                            Tidak ada data transaksi yang cocok dengan pencarian / filter.
                          </td>
                        </tr>
                      ) : (
                        filteredFinancialTransactions.map((tx) => (
                          <tr key={tx.id} className="hover:bg-slate-50/70 transition">
                            <td className="py-3 px-4 font-mono font-bold text-slate-900">
                              <div>{tx.id}</div>
                              <div className="text-[10px] text-slate-400 font-sans font-normal">{tx.date}</div>
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                                  tx.type === "inflow"
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-rose-50 text-rose-700 border border-rose-200"
                                }`}
                              >
                                {tx.category}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-bold text-slate-800">{tx.description}</td>
                            <td className="py-3 px-4 text-slate-600 font-medium">{tx.branch}</td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[11px]">
                                {tx.paymentMethod}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-black">
                              <span className={tx.type === "inflow" ? "text-emerald-600" : "text-rose-600"}>
                                {tx.type === "inflow" ? "+" : "-"}
                                {formatRupiah(tx.amount)}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                                {tx.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Kapasitas Kursi Cabang Real-time Monitor */}
              <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      Kapasitas &amp; Penggunaan Kursi per Cabang (Live)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Sinkron otomatis dengan pilihan jadwal dan alokasi kursi booking online.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("branches")}
                    className="text-xs font-bold text-[#6B0B0C] hover:underline cursor-pointer"
                  >
                    Atur Jumlah Kursi →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {branches.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-sm text-slate-900">{b.name}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                            {b.totalChairs} Kursi
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mb-3">{b.address}</p>

                        {/* Chair visual indicators */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {[...Array(b.totalChairs)].map((_, i) => {
                            const isOccupied = i < b.occupiedChairs;
                            return (
                              <div
                                key={i}
                                className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold transition ${
                                  isOccupied
                                    ? "bg-[#6B0B0C] text-[#FFF8CA]"
                                    : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                }`}
                                title={isOccupied ? `Kursi ${i + 1}: Terisi` : `Kursi ${i + 1}: Tersedia`}
                              >
                                {i + 1}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-xs">
                        <span className="text-slate-600">
                          Terisi: <strong className="text-slate-900">{b.occupiedChairs}</strong>
                        </span>
                        <span className="text-emerald-700 font-bold">
                          Kosong: {b.totalChairs - b.occupiedChairs}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MANAJEMEN CABANG & JUMLAH KURSI (NEW) */}
          {/* ========================================================= */}
          {activeTab === "branches" && (
            <div className="w-full space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Manajemen Cabang &amp; Kursi</h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Atur jumlah kursi pangkas per cabang. Kapasitas ini langsung tersinkronisasi saat customer melakukan booking online.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const name = prompt("Masukkan Nama Cabang Baru:");
                    if (name) {
                      const newB: BranchData = {
                        id: `branch-${Date.now()}`,
                        name,
                        area: "Jakarta",
                        address: "Lokasi Cabang Baru",
                        phone: "+62 811-0000-1111",
                        hours: "09:00 - 21:00 WIB",
                        totalChairs: 5,
                        occupiedChairs: 0,
                        status: "Buka",
                      };
                      setBranches([...branches, newB]);
                    }
                  }}
                  className="bg-[#6B0B0C] text-[#FFF8CA] px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#520809] transition flex items-center gap-1.5 shadow-xs"
                >
                  <span>+ Tambah Cabang Baru</span>
                </button>
              </div>

              {/* Branch Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {branches.map((b) => {
                  const staffInBranch = staffList.filter((s) => s.branch === b.name);
                  return (
                    <div
                      key={b.id}
                      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#6B0B0C]/10 text-[#6B0B0C]">
                              {b.area}
                            </span>
                            <h3 className="text-xl font-bold text-slate-900 mt-1">{b.name}</h3>
                          </div>
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                            {b.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed mb-4">{b.address}</p>

                        {/* Kursi Management Widget */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
                          <div className="flex justify-between items-center mb-3">
                            <div>
                              <span className="text-xs font-bold text-slate-800">
                                Kapasitas Kursi Barber
                              </span>
                              <p className="text-[11px] text-slate-500">
                                Batas maksimal tamu bersamaan pada setiap sesi booking.
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateBranchChairs(b.id, -1)}
                                className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-200 flex items-center justify-center transition"
                                title="Kurangi 1 Kursi"
                              >
                                -
                              </button>
                              <span className="w-10 text-center font-black text-lg text-slate-900">
                                {b.totalChairs}
                              </span>
                              <button
                                onClick={() => updateBranchChairs(b.id, 1)}
                                className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-200 flex items-center justify-center transition"
                                title="Tambah 1 Kursi"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Visual chair slots */}
                          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
                            {[...Array(b.totalChairs)].map((_, idx) => {
                              const isOccupied = idx < b.occupiedChairs;
                              return (
                                <div
                                  key={idx}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
                                    isOccupied
                                      ? "bg-[#6B0B0C] text-[#FFF8CA]"
                                      : "bg-white text-emerald-700 border border-emerald-300"
                                  }`}
                                >
                                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                  </svg>
                                  <span>Kursi #{idx + 1}</span>
                                  <span className="text-[10px] opacity-80">
                                    {isOccupied ? "Terisi" : "Kosong"}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Staf yang Bertugas di Cabang Ini */}
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-slate-700">
                              Barber Bertugas ({staffInBranch.length} Staf)
                            </span>
                            <button
                              onClick={() => setActiveTab("attendance")}
                              className="text-[11px] font-semibold text-[#6B0B0C] hover:underline"
                            >
                              Pindah Staf ke Cabang Lain →
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {staffInBranch.map((s) => (
                              <span
                                key={s.id}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-medium"
                              >
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                {s.name} ({s.role})
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
                        <span>Jam: {b.hours}</span>
                        <span>Hotline: {b.phone}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: KASBON KARYAWAN (NEW) */}
          {/* ========================================================= */}
          {activeTab === "kasbon" && (
            <div className="w-full space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Manajemen Kasbon Karyawan</h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Pencatatan pinjaman kasbon staf barber dan potongan otomatis pada slip gaji bulanan.
                  </p>
                </div>
                <div className="text-xs font-bold text-slate-700 bg-slate-100 px-4 py-2 rounded-xl">
                  Total Kasbon Beredar:{" "}
                  <span className="text-rose-600 font-black">
                    {formatRupiah(kasbonList.reduce((acc, k) => acc + k.remainingAmount, 0))}
                  </span>
                </div>
              </div>

              {/* Grid 2 Column: Form Kasbon & Table Kasbon */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Form Input Kasbon (4 cols) */}
                <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">
                    Catat Pengajuan Kasbon Baru
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Pilih nama staf, tentukan nominal kasbon, serta cicilan potongan per bulan.
                  </p>

                  <form onSubmit={handleAddKasbon} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Pilih Karyawan / Barber *
                      </label>
                      <select
                        value={newKasbonStaff}
                        onChange={(e) => setNewKasbonStaff(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-[#6B0B0C]"
                      >
                        {staffList.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name} - {s.branch}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nominal Kasbon (Rp) *
                      </label>
                      <input
                        type="number"
                        step="50000"
                        required
                        value={newKasbonAmount}
                        onChange={(e) => setNewKasbonAmount(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-[#6B0B0C] font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Potongan per Bulan pada Slip Gaji (Rp) *
                      </label>
                      <input
                        type="number"
                        step="50000"
                        required
                        value={newKasbonDeduction}
                        onChange={(e) => setNewKasbonDeduction(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-[#6B0B0C] font-bold text-rose-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Keperluan / Alasan Kasbon
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Contoh: Kebutuhan keluarga mendesak..."
                        value={newKasbonPurpose}
                        onChange={(e) => setNewKasbonPurpose(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-[#6B0B0C]"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#6B0B0C] text-[#FFF8CA] hover:bg-[#520809] py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
                    >
                      Simpan &amp; Setujui Kasbon
                    </button>
                  </form>
                </div>

                {/* Table Daftar Kasbon (8 cols) */}
                <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-900 text-sm">
                      Daftar Pinjaman &amp; Cicilan Kasbon Staf
                    </h3>
                    <span className="text-xs text-slate-500">
                      Otomatis memotong gaji saat tanggal gajian
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-3">No. Kasbon</th>
                          <th className="py-2.5 px-3">Nama Barber</th>
                          <th className="py-2.5 px-3">Cabang</th>
                          <th className="py-2.5 px-3">Total Pinjam</th>
                          <th className="py-2.5 px-3">Potong/Bln</th>
                          <th className="py-2.5 px-3">Sisa Kasbon</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {kasbonList.map((k) => (
                          <tr key={k.id} className="hover:bg-slate-50 transition">
                            <td className="py-3 px-3 font-mono font-bold text-[#6B0B0C]">{k.id}</td>
                            <td className="py-3 px-3 font-bold text-slate-900">{k.staffName}</td>
                            <td className="py-3 px-3 text-slate-600">{k.branch}</td>
                            <td className="py-3 px-3 font-semibold text-slate-800">
                              {formatRupiah(k.amount)}
                            </td>
                            <td className="py-3 px-3 font-bold text-rose-600">
                              -{formatRupiah(k.monthlyDeduction)}
                            </td>
                            <td className="py-3 px-3 font-black text-slate-900">
                              {formatRupiah(k.remainingAmount)}
                            </td>
                            <td className="py-3 px-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  k.status === "Disetujui"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : k.status === "Lunas"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {k.status}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right space-x-1">
                              {k.status === "Disetujui" && (
                                <button
                                  onClick={() => updateKasbonStatus(k.id, "Lunas")}
                                  className="text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-600 hover:text-white px-2 py-1 rounded transition"
                                >
                                  Tandai Lunas
                                </button>
                              )}
                              {k.status === "Menunggu" && (
                                <button
                                  onClick={() => updateKasbonStatus(k.id, "Disetujui")}
                                  className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-600 hover:text-white px-2 py-1 rounded transition"
                                >
                                  Setujui
                                </button>
                              )}
                              {k.status === "Lunas" && (
                                <span className="text-slate-400 text-[11px]">Selesai</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: ABSENSI & PINDAH CABANG STAF */}
          {/* ========================================================= */}
          {activeTab === "attendance" && (
            <div className="w-full space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">
                    Absensi &amp; Penugasan Cabang Staf
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Atur absensi harian dan mutasi / pindah cabang kerja barber secara dinamis.
                  </p>
                </div>
                <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Tanggal: 18 November 2025 (Shift Aktif)
                </div>
              </div>

              {/* Staff Table */}
              <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Nama Staf</th>
                        <th className="py-3 px-4">Posisi</th>
                        <th className="py-3 px-4">Cabang Tugas Saat Ini</th>
                        <th className="py-3 px-4">Shift</th>
                        <th className="py-3 px-4">Jam Masuk</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Kasbon Berjalan</th>
                        <th className="py-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {staffList
                        .filter((s) =>
                          selectedBranchFilter === "Semua Cabang"
                            ? true
                            : s.branch === selectedBranchFilter
                        )
                        .map((staff) => {
                          const kasbon = getStaffKasbonDeduction(staff.name);
                          return (
                            <tr key={staff.id} className="hover:bg-slate-50 transition">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={staff.avatar}
                                    alt={staff.name}
                                    className="w-9 h-9 rounded-full object-cover border border-slate-200"
                                  />
                                  <div>
                                    <p className="font-bold text-slate-900">{staff.name}</p>
                                    <p className="text-[10px] font-mono text-slate-400">{staff.id}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4 font-semibold text-slate-700">{staff.role}</td>
                              <td className="py-3 px-4">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#6B0B0C]/10 text-[#6B0B0C] font-bold text-xs">
                                  {staff.branch}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-slate-600">{staff.shift}</td>
                              <td className="py-3 px-4 font-bold text-emerald-700">{staff.checkIn}</td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                    staff.status === "Hadir"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : "bg-amber-100 text-amber-800"
                                  }`}
                                >
                                  {staff.status}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                {kasbon > 0 ? (
                                  <span className="font-bold text-rose-600">
                                    Potong {formatRupiah(kasbon)}
                                  </span>
                                ) : (
                                  <span className="text-slate-400 text-xs">Tidak Ada</span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-right space-x-1.5">
                                <button
                                  onClick={() => toggleStaffAttendance(staff.id)}
                                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                                >
                                  {staff.status === "Hadir" ? "Izin" : "Hadir"}
                                </button>
                                <button
                                  onClick={() => {
                                    setTransferModalStaff(staff);
                                    setTargetBranchForTransfer(
                                      staff.branch === "Senopati Heritage"
                                        ? "SCBD Executive Lounge"
                                        : "Senopati Heritage"
                                    );
                                  }}
                                  className="px-3 py-1 rounded-lg text-xs font-bold bg-[#6B0B0C] text-[#FFF8CA] hover:bg-[#520809] transition cursor-pointer"
                                >
                                  Pindah Cabang
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: POS / KASIR BARBERSHOP */}
          {/* ========================================================= */}
          {activeTab === "pos" && (
            <div className="w-full space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Kasir Barbershop (POS)</h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Catat transaksi pangkas rambut, pilih nomor kursi kasir, dan jual produk styling.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-500">Nomor Kursi:</span>
                    <select
                      value={posChairNo}
                      onChange={(e) => setPosChairNo(Number(e.target.value))}
                      className="bg-slate-100 border border-slate-300 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-800"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          Kursi #{num}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-500">Barber:</span>
                    <select
                      value={posBarber}
                      onChange={(e) => setPosBarber(e.target.value)}
                      className="bg-slate-100 border border-slate-300 rounded-xl px-3 py-1 text-xs font-bold text-slate-800"
                    >
                      {staffList.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name} ({s.branch})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Catalog (8 cols) */}
                <div className="lg:col-span-7 xl:col-span-8 space-y-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPosFilterType("Semua")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                        posFilterType === "Semua"
                          ? "bg-[#6B0B0C] text-[#FFF8CA]"
                          : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      Semua Katalog
                    </button>
                    <button
                      onClick={() => setPosFilterType("Layanan")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                        posFilterType === "Layanan"
                          ? "bg-[#6B0B0C] text-[#FFF8CA]"
                          : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      Layanan Pangkas &amp; Spa
                    </button>
                    <button
                      onClick={() => setPosFilterType("Produk")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                        posFilterType === "Produk"
                          ? "bg-[#6B0B0C] text-[#FFF8CA]"
                          : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      Produk Pomade &amp; Care
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    {POS_ITEMS.filter((item) =>
                      posFilterType === "Semua" ? true : item.type === posFilterType
                    ).map((item) => (
                      <div
                        key={item.id}
                        onClick={() => addToCart(item)}
                        className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-[#6B0B0C] hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
                      >
                        <div>
                          <span
                            className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              item.type === "Layanan"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-emerald-50 text-emerald-700"
                            }`}
                          >
                            {item.type}
                          </span>
                          <h4 className="font-bold text-sm text-slate-900 mt-2 group-hover:text-[#6B0B0C] transition">
                            {item.name}
                          </h4>
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100">
                          <span className="font-black text-sm text-[#6B0B0C]">
                            {formatRupiah(item.price)}
                          </span>
                          <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 group-hover:bg-[#6B0B0C] group-hover:text-[#FFF8CA] flex items-center justify-center font-bold text-xs transition">
                            +
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cart & Checkout (4 cols) */}
                <div className="lg:col-span-5 xl:col-span-4 bg-white p-6 rounded-2xl shadow-xs border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
                      <div>
                        <h3 className="font-black text-slate-900 text-base">Keranjang Kasir</h3>
                        <p className="text-[11px] text-slate-500">Kursi #{posChairNo} • {posBarber}</p>
                      </div>
                      <button
                        onClick={() => setCart([])}
                        className="text-xs font-semibold text-rose-600 hover:underline cursor-pointer"
                      >
                        Kosongkan
                      </button>
                    </div>

                    <div className="space-y-3 mb-4">
                      <input
                        type="text"
                        placeholder="Nama Tamu (e.g. Bpk. Hendra)"
                        value={posCustomer}
                        onChange={(e) => setPosCustomer(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-[#6B0B0C]"
                      />
                    </div>

                    <div className="max-h-60 overflow-y-auto space-y-2 mb-4 pr-1">
                      {cart.length === 0 ? (
                        <div className="text-center py-10 text-slate-400 text-xs">
                          Belum ada item dipilih.
                        </div>
                      ) : (
                        cart.map((c) => (
                          <div
                            key={c.id}
                            className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs"
                          >
                            <div className="flex-1 mr-2">
                              <p className="font-bold text-slate-900 truncate">{c.name}</p>
                              <p className="text-[11px] text-[#6B0B0C] font-semibold">
                                {formatRupiah(c.price)}
                              </p>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => updateCartQty(c.id, -1)}
                                className="w-5 h-5 rounded bg-white border border-slate-300 flex items-center justify-center font-bold text-slate-600"
                              >
                                -
                              </button>
                              <span className="font-bold text-xs px-1">{c.qty}</span>
                              <button
                                onClick={() => updateCartQty(c.id, 1)}
                                className="w-5 h-5 rounded bg-white border border-slate-300 flex items-center justify-center font-bold text-slate-600"
                              >
                                +
                              </button>
                              <button
                                onClick={() => removeFromCart(c.id)}
                                className="text-slate-400 hover:text-rose-600 ml-1"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-4 space-y-3">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Subtotal:</span>
                      <span className="font-bold text-slate-900">{formatRupiah(cartSubtotal)}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs text-slate-600">
                      <span>Diskon / Promo:</span>
                      <input
                        type="number"
                        placeholder="Rp 0"
                        value={posDiscount || ""}
                        onChange={(e) => setPosDiscount(Number(e.target.value))}
                        className="w-24 text-right px-2 py-1 border border-slate-300 rounded text-xs font-bold"
                      />
                    </div>

                    <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-100">
                      <span>Total:</span>
                      <span className="text-xl text-[#6B0B0C]">{formatRupiah(cartTotal)}</span>
                    </div>

                    <div className="grid grid-cols-4 gap-1.5">
                      {(["QRIS", "Tunai", "Kartu Debit", "Transfer"] as const).map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setPosPaymentMethod(method)}
                          className={`py-2 text-[10px] font-bold rounded-lg transition border text-center ${
                            posPaymentMethod === method
                              ? "bg-[#6B0B0C] text-[#FFF8CA] border-[#6B0B0C]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleProcessCheckout}
                      disabled={cart.length === 0}
                      className="w-full bg-[#6B0B0C] text-[#FFF8CA] hover:bg-[#520809] disabled:opacity-50 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Bayar &amp; Cetak Struk
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 6: BOOKING MANAJEMEN */}
          {/* ========================================================= */}
          {activeTab === "bookings" && (
            <div className="w-full space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Booking Manajemen</h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Daftar reservasi online, pemilihan alokasi kursi, dan status pangkas.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const id = `GLR-${Math.floor(2000 + Math.random() * 8000)}`;
                    const newB: BookingItem = {
                      id,
                      customer: "Pelanggan Walk-In",
                      phone: "0812-1111-2222",
                      branch: selectedBranchFilter === "Semua Cabang" ? "Senopati Heritage" : selectedBranchFilter,
                      service: "Signature Gentleman Cut",
                      barber: "Alex 'The Blade' Tan",
                      chairNo: 2,
                      date: "18 Nov 2025",
                      time: "17:00",
                      status: "Menunggu",
                      price: 150000,
                    };
                    setBookings([newB, ...bookings]);
                  }}
                  className="bg-[#6B0B0C] text-[#FFF8CA] px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#520809] transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>+ Tambah Booking Manual</span>
                </button>
              </div>

              {/* Filter and Table */}
              <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200 flex flex-col sm:flex-row gap-3 justify-between items-center">
                <input
                  type="text"
                  placeholder="Cari ID Booking / Nama Tamu..."
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  className="w-full sm:w-72 px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-[#6B0B0C]"
                />
                <div className="flex gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                  {["Semua", "Menunggu", "Sedang Dilayani", "Selesai", "Dibatalkan"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setBookingStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 ${
                        bookingStatusFilter === st
                          ? "bg-[#6B0B0C] text-[#FFF8CA]"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">ID Booking</th>
                        <th className="py-3 px-4">Pelanggan</th>
                        <th className="py-3 px-4">Cabang</th>
                        <th className="py-3 px-4">Kursi</th>
                        <th className="py-3 px-4">Layanan</th>
                        <th className="py-3 px-4">Barber</th>
                        <th className="py-3 px-4">Jadwal</th>
                        <th className="py-3 px-4">Biaya</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Aksi Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {bookings
                        .filter((b) => {
                          const matchBranch =
                            selectedBranchFilter === "Semua Cabang" ||
                            b.branch === selectedBranchFilter;
                          const matchSearch =
                            b.customer.toLowerCase().includes(bookingSearch.toLowerCase()) ||
                            b.id.toLowerCase().includes(bookingSearch.toLowerCase());
                          const matchStatus =
                            bookingStatusFilter === "Semua" || b.status === bookingStatusFilter;
                          return matchBranch && matchSearch && matchStatus;
                        })
                        .map((b) => (
                          <tr key={b.id} className="hover:bg-slate-50 transition">
                            <td className="py-3 px-4 font-mono font-bold text-[#6B0B0C]">{b.id}</td>
                            <td className="py-3 px-4">
                              <p className="font-bold text-slate-900">{b.customer}</p>
                              <p className="text-[10px] text-slate-500">{b.phone}</p>
                            </td>
                            <td className="py-3 px-4 text-slate-600 font-medium">{b.branch}</td>
                            <td className="py-3 px-4">
                              <span className="font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                                Kursi #{b.chairNo}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-800 font-semibold">{b.service}</td>
                            <td className="py-3 px-4 text-slate-600">{b.barber}</td>
                            <td className="py-3 px-4">
                              <p className="text-slate-800 font-semibold">{b.time} WIB</p>
                              <p className="text-[10px] text-slate-500">{b.date}</p>
                            </td>
                            <td className="py-3 px-4 font-bold text-[#6B0B0C]">
                              {formatRupiah(b.price)}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                  b.status === "Selesai"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : b.status === "Sedang Dilayani"
                                    ? "bg-blue-100 text-blue-800"
                                    : b.status === "Dibatalkan"
                                    ? "bg-rose-100 text-rose-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {b.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right space-x-1">
                              {b.status === "Menunggu" && (
                                <button
                                  onClick={() => updateBookingStatus(b.id, "Sedang Dilayani")}
                                  className="bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white px-2.5 py-1 rounded text-[11px] font-bold transition"
                                >
                                  Mulai Pangkas
                                </button>
                              )}
                              {b.status === "Sedang Dilayani" && (
                                <button
                                  onClick={() => updateBookingStatus(b.id, "Selesai")}
                                  className="bg-emerald-100 text-emerald-800 hover:bg-emerald-700 hover:text-white px-2.5 py-1 rounded text-[11px] font-bold transition"
                                >
                                  Selesai
                                </button>
                              )}
                              {b.status === "Selesai" && (
                                <span className="text-slate-400 text-[11px]">Selesai</span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 7: MANAJEMEN STOK PRODUK */}
          {/* ========================================================= */}
          {activeTab === "inventory" && (
            <div className="w-full space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Manajemen Stok &amp; Produk</h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Kontrol ketersediaan pomade, clay, beard oil, dan peralatan per cabang.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const name = prompt("Masukkan Nama Produk Baru:");
                    if (name) {
                      const newP: ProductStock = {
                        id: `PRD-0${inventory.length + 1}`,
                        name,
                        sku: `RW-NEW-0${inventory.length + 1}`,
                        category: "Styling",
                        stock: 20,
                        minStock: 10,
                        buyPrice: 80000,
                        sellPrice: 150000,
                        status: "Aman",
                      };
                      setInventory([...inventory, newP]);
                    }
                  }}
                  className="bg-[#6B0B0C] text-[#FFF8CA] px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#520809] transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>+ Tambah Produk Baru</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Nama Produk</th>
                        <th className="py-3 px-4">SKU</th>
                        <th className="py-3 px-4">Kategori</th>
                        <th className="py-3 px-4">Harga Beli</th>
                        <th className="py-3 px-4">Harga Jual</th>
                        <th className="py-3 px-4">Sisa Stok</th>
                        <th className="py-3 px-4">Min. Stok</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {inventory.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition">
                          <td className="py-3 px-4 font-bold text-slate-900">{item.name}</td>
                          <td className="py-3 px-4 font-mono text-slate-500">{item.sku}</td>
                          <td className="py-3 px-4 text-slate-600">{item.category}</td>
                          <td className="py-3 px-4 text-slate-500">{formatRupiah(item.buyPrice)}</td>
                          <td className="py-3 px-4 font-bold text-slate-900">{formatRupiah(item.sellPrice)}</td>
                          <td className="py-3 px-4 font-black text-sm text-slate-800">{item.stock} Pcs</td>
                          <td className="py-3 px-4 text-slate-500">{item.minStock} Pcs</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                item.status === "Aman"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : item.status === "Menipis"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-rose-100 text-rose-800"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right space-x-1.5">
                            <button
                              onClick={() => addStock(item.id, 10)}
                              className="bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white px-2.5 py-1 rounded font-bold text-xs transition"
                            >
                              +10 Masuk
                            </button>
                            <button
                              onClick={() => addStock(item.id, -1)}
                              disabled={item.stock <= 0}
                              className="bg-slate-100 text-slate-600 hover:bg-slate-200 px-2 py-1 rounded font-bold text-xs transition disabled:opacity-30"
                            >
                              -1 Keluar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 8: SLIP GAJI & PEMOTONGAN KASBON */}
          {/* ========================================================= */}
          {activeTab === "payroll" && (
            <div className="w-full space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Slip Gaji &amp; Komisi Barber</h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Gaji pokok + Komisi Pangkas (35%) + Komisi Produk (10%) dikurangi <strong>Potongan Kasbon</strong> &amp; BPJS.
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-900 font-bold text-xs">
                  Periode: November 2025
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Nama Barber</th>
                        <th className="py-3 px-4">Cabang</th>
                        <th className="py-3 px-4">Gaji Pokok</th>
                        <th className="py-3 px-4">Komisi Jasa (35%)</th>
                        <th className="py-3 px-4">Komisi Produk</th>
                        <th className="py-3 px-4">Potongan Kasbon</th>
                        <th className="py-3 px-4">Potongan BPJS</th>
                        <th className="py-3 px-4">Take Home Pay</th>
                        <th className="py-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {staffList.map((staff) => {
                        const cutsCommission = staff.role.includes("Master") ? 7455000 : 5850000;
                        const productCommission = staff.role.includes("Master") ? 462000 : 295000;
                        const bpjsDeduction = 250000;
                        const kasbonDeduction = getStaffKasbonDeduction(staff.name);
                        const bonus = 500000;
                        const netSalary =
                          staff.baseSalary +
                          cutsCommission +
                          productCommission +
                          bonus -
                          bpjsDeduction -
                          kasbonDeduction;

                        return (
                          <tr key={staff.id} className="hover:bg-slate-50 transition">
                            <td className="py-3 px-4">
                              <p className="font-bold text-slate-900">{staff.name}</p>
                              <p className="text-[10px] text-slate-500">{staff.role}</p>
                            </td>
                            <td className="py-3 px-4 font-semibold text-slate-700">{staff.branch}</td>
                            <td className="py-3 px-4 text-slate-600">{formatRupiah(staff.baseSalary)}</td>
                            <td className="py-3 px-4 font-bold text-emerald-700">
                              {formatRupiah(cutsCommission)}
                            </td>
                            <td className="py-3 px-4 text-emerald-700">
                              {formatRupiah(productCommission)}
                            </td>
                            <td className="py-3 px-4">
                              {kasbonDeduction > 0 ? (
                                <span className="font-bold text-rose-600">
                                  -{formatRupiah(kasbonDeduction)}
                                </span>
                              ) : (
                                <span className="text-slate-400">Rp 0</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-rose-600">-{formatRupiah(bpjsDeduction)}</td>
                            <td className="py-3 px-4 font-black text-sm text-[#6B0B0C]">
                              {formatRupiah(netSalary)}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() =>
                                  setSelectedPayslip({
                                    staffName: staff.name,
                                    role: staff.role,
                                    branch: staff.branch,
                                    period: "November 2025",
                                    baseSalary: staff.baseSalary,
                                    cutsCount: staff.role.includes("Master") ? 142 : 115,
                                    cutsCommission,
                                    productCommission,
                                    bonus,
                                    bpjsDeduction,
                                    kasbonDeduction,
                                    netSalary,
                                  })
                                }
                                className="bg-[#6B0B0C]/10 text-[#6B0B0C] hover:bg-[#6B0B0C] hover:text-[#FFF8CA] px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer"
                              >
                                Cetak Slip
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: PINDAH CABANG TUGAS STAF */}
      {/* ========================================================= */}
      {transferModalStaff && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-black text-slate-900">
              Pindahkan Cabang Tugas Staf
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Atur mutasi penugasan barber ke cabang yang membutuhkan tambahan tenaga.
            </p>

            <div className="my-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Nama Barber:</span>
                <span className="font-bold text-slate-900">{transferModalStaff.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cabang Asal:</span>
                <span className="font-bold text-rose-700">{transferModalStaff.branch}</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <label className="block text-xs font-bold text-slate-700">
                Pilih Cabang Penugasan Baru *
              </label>
              <select
                value={targetBranchForTransfer}
                onChange={(e) => setTargetBranchForTransfer(e.target.value)}
                className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-[#6B0B0C] font-bold"
              >
                {branches
                  .filter((b) => b.name !== transferModalStaff.branch)
                  .map((b) => (
                    <option key={b.id} value={b.name}>
                      {b.name} ({b.totalChairs} Kursi • {b.occupiedChairs} Terisi)
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleExecuteBranchTransfer}
                className="flex-1 bg-[#6B0B0C] text-[#FFF8CA] hover:bg-[#520809] py-3 rounded-xl font-bold text-xs uppercase transition cursor-pointer"
              >
                Konfirmasi Pindah Cabang
              </button>
              <button
                type="button"
                onClick={() => setTransferModalStaff(null)}
                className="px-4 py-3 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition cursor-pointer"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: STRUK KASIR THERMAL */}
      {/* ========================================================= */}
      {posReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 font-mono text-xs">
            <div className="text-center pb-4 border-b border-dashed border-slate-300">
              <h3 className="font-extrabold text-base tracking-widest text-[#6B0B0C]">GLORIOUS</h3>
              <p className="text-[10px] text-slate-500">GENTLEMEN&apos;S BARBERSHOP &amp; ATELIER</p>
              <p className="text-[9px] text-slate-400 mt-1">{posReceipt.branch}</p>
              <p className="text-[10px] text-slate-600 font-bold mt-2">
                No. Struk: {posReceipt.invoiceNo}
              </p>
            </div>

            <div className="py-3 border-b border-dashed border-slate-300 space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Waktu:</span>
                <span>{posReceipt.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pelanggan:</span>
                <span className="font-bold">{posReceipt.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Kursi:</span>
                <span className="font-bold">Kursi #{posReceipt.chairNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Barber:</span>
                <span>{posReceipt.barber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pembayaran:</span>
                <span className="font-bold text-[#6B0B0C]">{posReceipt.paymentMethod}</span>
              </div>
            </div>

            <div className="py-3 border-b border-dashed border-slate-300 space-y-2">
              {posReceipt.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-[11px]">
                  <div>
                    <div className="font-bold">{item.name}</div>
                    <div className="text-[10px] text-slate-500">
                      {item.qty} x {formatRupiah(item.price)}
                    </div>
                  </div>
                  <div className="font-semibold">{formatRupiah(item.price * item.qty)}</div>
                </div>
              ))}
            </div>

            <div className="py-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span>{formatRupiah(posReceipt.subtotal)}</span>
              </div>
              {posReceipt.discount > 0 && (
                <div className="flex justify-between text-rose-600">
                  <span>Diskon:</span>
                  <span>-{formatRupiah(posReceipt.discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-sm pt-2 border-t border-slate-200 text-[#6B0B0C]">
                <span>TOTAL:</span>
                <span>{formatRupiah(posReceipt.total)}</span>
              </div>
            </div>

            <div className="text-center pt-4 border-t border-dashed border-slate-300 text-[10px] text-slate-400">
              Terima kasih atas kunjungan Anda.
              <br />
              Stay sharp, gentlemen.
            </div>

            <div className="mt-5 space-y-2">
              <button
                onClick={() => {
                  alert("Mencetak struk kasir thermal...");
                  setPosReceipt(null);
                }}
                className="w-full bg-[#6B0B0C] text-[#FFF8CA] py-2.5 rounded-xl font-bold text-xs hover:bg-[#520809] transition cursor-pointer"
              >
                Cetak Struk Thermal
              </button>
              <button
                onClick={() => setPosReceipt(null)}
                className="w-full bg-slate-100 text-slate-600 py-2 rounded-xl text-xs font-semibold hover:bg-slate-200 transition cursor-pointer"
              >
                Tutup Struk
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: DETAIL SLIP GAJI DENGAN POTONGAN KASBON */}
      {/* ========================================================= */}
      {selectedPayslip && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border-2 border-[#6B0B0C] relative">
            <div className="flex justify-between items-start pb-4 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B0B0C] bg-[#6B0B0C]/10 px-2 py-0.5 rounded">
                  SLIP GAJI RESMI
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">GLORIOUS BARBERSHOP</h3>
                <p className="text-xs text-slate-500">Cabang: {selectedPayslip.branch}</p>
              </div>
              <div className="text-right text-xs">
                <span className="font-bold text-slate-700">Periode:</span>
                <p className="text-slate-500">{selectedPayslip.period}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-100 text-xs">
              <div>
                <span className="text-slate-400">Nama Barber:</span>
                <p className="font-bold text-sm text-slate-900">{selectedPayslip.staffName}</p>
              </div>
              <div>
                <span className="text-slate-400">Posisi:</span>
                <p className="font-semibold text-slate-800">{selectedPayslip.role}</p>
              </div>
              <div>
                <span className="text-slate-400">Total Tamu Dilayani:</span>
                <p className="font-bold text-emerald-700">{selectedPayslip.cutsCount} Tamu</p>
              </div>
              <div>
                <span className="text-slate-400">Status Kasbon:</span>
                <p className="font-bold text-rose-600">
                  {selectedPayslip.kasbonDeduction > 0 ? "Ada Cicilan Aktif" : "Bebas Kasbon"}
                </p>
              </div>
            </div>

            <div className="py-4 space-y-2 text-xs">
              <div className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                Pendapatan (Earnings)
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Gaji Pokok:</span>
                <span className="font-semibold">{formatRupiah(selectedPayslip.baseSalary)}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Komisi Pangkas (35%):</span>
                <span className="font-bold">+{formatRupiah(selectedPayslip.cutsCommission)}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Komisi Penjualan Produk (10%):</span>
                <span className="font-bold">+{formatRupiah(selectedPayslip.productCommission)}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Bonus &amp; Tips:</span>
                <span>+{formatRupiah(selectedPayslip.bonus)}</span>
              </div>

              <div className="font-bold text-slate-800 uppercase tracking-wider text-[10px] pt-3">
                Potongan (Deductions)
              </div>
              {selectedPayslip.kasbonDeduction > 0 && (
                <div className="flex justify-between text-rose-600 font-bold bg-rose-50 p-2 rounded-lg">
                  <span>Potongan Cicilan Kasbon Staf:</span>
                  <span>-{formatRupiah(selectedPayslip.kasbonDeduction)}</span>
                </div>
              )}
              <div className="flex justify-between text-rose-600">
                <span>Iuran BPJS Ketenagakerjaan:</span>
                <span>-{formatRupiah(selectedPayslip.bpjsDeduction)}</span>
              </div>

              <div className="pt-3 border-t-2 border-slate-200 flex justify-between items-center text-sm">
                <span className="font-black text-slate-900">GAJI BERSIH (TAKE HOME PAY):</span>
                <span className="text-xl font-black text-[#6B0B0C]">
                  {formatRupiah(selectedPayslip.netSalary)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="text-[10px] text-slate-400">
                Disahkan HRD &amp; Finance GLORIOUS Barbershop.
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    alert(`Mencetak Slip Gaji ${selectedPayslip.staffName}...`);
                    setSelectedPayslip(null);
                  }}
                  className="bg-[#6B0B0C] text-[#FFF8CA] px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#520809] transition cursor-pointer"
                >
                  Cetak / Simpan PDF
                </button>
                <button
                  onClick={() => setSelectedPayslip(null)}
                  className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-slate-200 transition cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Catat Pengeluaran Baru */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-black text-slate-900 text-base">Catat Pengeluaran Operasional</h3>
                <p className="text-xs text-slate-500">
                  Pencatatan kas keluar otomatis tercatat di buku kas dashboard.
                </p>
              </div>
              <button
                onClick={() => setShowExpenseModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kategori Pengeluaran *
                </label>
                <select
                  value={newExpenseCat}
                  onChange={(e) =>
                    setNewExpenseCat(
                      e.target.value as
                        | "Operasional & Utilitas"
                        | "Restock Produk"
                        | "Pemeliharaan & Alat"
                    )
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-[#6B0B0C]"
                >
                  <option value="Operasional & Utilitas">Operasional &amp; Utilitas (Listrik, Wifi, Air)</option>
                  <option value="Restock Produk">Restock Bahan &amp; Pomade</option>
                  <option value="Pemeliharaan & Alat">Pemeliharaan &amp; Servis Alat Barber</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Deskripsi / Keterangan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pembelian 50 handuk mikrofiber & disinfektan"
                  value={newExpenseDesc}
                  onChange={(e) => setNewExpenseDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-[#6B0B0C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nominal Biaya (Rp) *
                  </label>
                  <input
                    type="number"
                    step="10000"
                    required
                    value={newExpenseAmount}
                    onChange={(e) => setNewExpenseAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-[#6B0B0C] font-bold text-rose-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Cabang *
                  </label>
                  <select
                    value={newExpenseBranch}
                    onChange={(e) => setNewExpenseBranch(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-[#6B0B0C]"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Metode Pembayaran Kas *
                </label>
                <select
                  value={newExpenseMethod}
                  onChange={(e) => setNewExpenseMethod(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-[#6B0B0C]"
                >
                  <option value="Kasir Tunai">Kasir Tunai (Cash Register)</option>
                  <option value="Transfer Bank">Transfer Bank Rekening Operasional</option>
                  <option value="Kartu Debit">Kartu Debit Kas</option>
                  <option value="Auto Debit">Auto Debit Tagihan Rutin</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowExpenseModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#6B0B0C] text-[#FFF8CA] hover:bg-[#520809] transition shadow-xs cursor-pointer"
                >
                  Simpan Pengeluaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
