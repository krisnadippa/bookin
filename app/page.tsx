"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// Types
interface Branch {
  id: string;
  name: string;
  area: string;
  address: string;
  hours: string;
  phone: string;
  image: string;
  totalChairs: number;
  availableChairs: number;
}

interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
  formattedPrice: string;
  description: string;
  tag?: string;
}

interface Barber {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  notes: string;
  price: string;
  image: string;
}

const BRANCHES: Branch[] = [
  {
    id: "senopati",
    name: "Senopati Heritage",
    area: "Jakarta Selatan",
    address: "Jl. Senopati No. 42, Kebayoran Baru",
    hours: "Senin - Minggu: 09:00 - 21:00",
    phone: "+62 811-9876-5431",
    totalChairs: 6,
    availableChairs: 2,
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "scbd",
    name: "SCBD Executive Lounge",
    area: "Financial District",
    address: "Pacific Place Mall, Level 3, SCBD",
    hours: "Senin - Minggu: 10:00 - 22:00",
    phone: "+62 811-9876-5432",
    totalChairs: 8,
    availableChairs: 3,
    image:
      "https://images.unsplash.com/photo-1512690459411-b9245aed614b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "dharmawangsa",
    name: "Dharmawangsa Atelier",
    area: "Jakarta Selatan",
    address: "Jl. Dharmawangsa VI No. 18, Kebayoran Baru",
    hours: "Senin - Minggu: 09:00 - 21:00",
    phone: "+62 811-9876-5433",
    totalChairs: 4,
    availableChairs: 1,
    image:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "pondok-indah",
    name: "Pondok Indah Sanctuary",
    area: "Jakarta Selatan",
    address: "Plaza Pondok Indah 2, Blok B-12",
    hours: "Senin - Minggu: 09:00 - 21:00",
    phone: "+62 811-9876-5434",
    totalChairs: 5,
    availableChairs: 3,
    image:
      "https://images.unsplash.com/photo-1532710093739-9470acff878f?q=80&w=800&auto=format&fit=crop",
  },
];

const SERVICES: Service[] = [
  {
    id: "sig-cut",
    name: "Signature Gentleman Cut",
    duration: "45 Menit",
    price: 150000,
    formattedPrice: "Rp 150.000",
    description: "Konsultasi bentuk wajah, precision haircut, hot towel massage, wash & styling dengan pomade premium.",
    tag: "Terfavorit",
  },
  {
    id: "royal-shave",
    name: "Royal Hot Towel Shave",
    duration: "35 Menit",
    price: 120000,
    formattedPrice: "Rp 120.000",
    description: "Traditional straight razor shave, warm lather bergamot, essential pre-shave oil, dan cold towel finish.",
    tag: "Classic Ritual",
  },
  {
    id: "royal-treatment",
    name: "The Royal Treatment",
    duration: "75 Menit",
    price: 275000,
    formattedPrice: "Rp 275.000",
    description: "Signature haircut, beard grooming/shave, exfoliation facial scrub, head massage, dan tonic treatment.",
    tag: "All-in-One",
  },
  {
    id: "scalp-spa",
    name: "Scalp Detox & Hair Spa",
    duration: "50 Menit",
    price: 180000,
    formattedPrice: "Rp 180.000",
    description: "Deep cleansing scalp exfoliation, steam treatment, revitalizing scalp tonic, dan relaxing neck massage.",
  },
  {
    id: "father-son",
    name: "Father & Son Classic Combo",
    duration: "60 Menit",
    price: 255000,
    formattedPrice: "Rp 255.000",
    description: "Sesi potong rambut berdua untuk ayah & putra dengan styling eksklusif dan minuman pendamping.",
  },
  {
    id: "grey-blending",
    name: "Grey Blending & Camo Color",
    duration: "45 Menit",
    price: 195000,
    formattedPrice: "Rp 195.000",
    description: "Pewarnaan natural menyamarkan uban dengan hasil maskulin, sehat, dan tampak lebih segar.",
  },
];

const BARBERS: Barber[] = [
  {
    id: "alex",
    name: "Alex 'The Blade' Tan",
    role: "Master Barber",
    experience: "10+ Tahun",
    specialty: "Classic Pompadour, Skin Fade, Scissor Precision",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "rian",
    name: "Rian Kurniawan",
    role: "Senior Stylist",
    experience: "8 Tahun",
    specialty: "Textured Crop, Modern Quiff, Beard Sculpting",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "david",
    name: "David Gunawan",
    role: "Shaving Artisan",
    experience: "7 Tahun",
    specialty: "Straight Razor Mastery, Hot Towel Ritual, Side Part",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "bagus",
    name: "Bagus Pratama",
    role: "Creative Barber",
    experience: "6 Tahun",
    specialty: "Low Taper, Mullet Modern, Scalp Treatment",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "any",
    name: "Barber Tersedia Pertama",
    role: "Quick Service",
    experience: "Certified Team",
    specialty: "Sesuai antrean tercepat saat Anda tiba di lokasi",
    image:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=400&auto=format&fit=crop",
  },
];

const PRODUCTS: Product[] = [
  {
    id: "pomade-classic",
    name: "Rosewood Classic Pomade",
    category: "Hair Styling",
    notes: "High Hold, Natural Shine, Sandalwood & Tobacco scent",
    price: "Rp 165.000",
    image:
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "clay-matte",
    name: "Matte Texture Clay",
    category: "Hair Styling",
    notes: "Strong Pliable Hold, Zero Shine, Bergamot Cedarwood",
    price: "Rp 175.000",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "beard-oil",
    name: "Gentleman's Beard Elixir",
    category: "Beard Care",
    notes: "Argan Oil, Jojoba, Vitamin E, Rosemary extract",
    price: "Rp 145.000",
    image:
      "https://images.unsplash.com/photo-1608248597359-25087661b34e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "sea-salt",
    name: "Sea Salt Volumizing Spray",
    category: "Pre-Styling",
    notes: "Natural Wave, Beach Texture, Heat Protection",
    price: "Rp 135.000",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "razor-set",
    name: "Artisan Straight Razor Kit",
    category: "Shaving Tools",
    notes: "Damascus Steel finish, Japanese badger hair brush",
    price: "Rp 385.000",
    image:
      "https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "scalp-tonic",
    name: "Cooling Scalp Tonic",
    category: "Scalp Health",
    notes: "Menthol invigorator, Tea Tree, Anti-dandruff complex",
    price: "Rp 125.000",
    image:
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=800&auto=format&fit=crop",
  },
];

const TIME_SLOTS = [
  "10:00",
  "11:15",
  "12:30",
  "13:45",
  "15:00",
  "16:15",
  "17:30",
  "18:45",
  "20:00",
];

const DATE_OPTIONS = [
  { label: "Hari Ini", value: "Hari Ini (18 Nov)" },
  { label: "Besok", value: "Besok (19 Nov)" },
  { label: "Lusa", value: "Lusa (20 Nov)" },
  { label: "Jumat", value: "Jumat (21 Nov)" },
  { label: "Sabtu", value: "Sabtu (22 Nov)" },
];

export default function Home() {
  const [activeNav, setActiveNav] = useState("Home");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  // Booking Form States
  const [selectedBranch, setSelectedBranch] = useState<string>("senopati");
  const [selectedService, setSelectedService] = useState<string>("sig-cut");
  const [selectedBarber, setSelectedBarber] = useState<string>("alex");
  const [selectedDate, setSelectedDate] = useState<string>("Hari Ini (18 Nov)");
  const [selectedTime, setSelectedTime] = useState<string>("15:00");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerNotes, setCustomerNotes] = useState<string>("");
  const [bookingConfirmation, setBookingConfirmation] = useState<{
    id: string;
    branchName: string;
    serviceName: string;
    barberName: string;
    date: string;
    time: string;
    price: string;
    customerName: string;
  } | null>(null);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const handleBranchSelectFromCard = (branchId: string) => {
    setSelectedBranch(branchId);
    const bookingSection = document.getElementById("booking-section");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert("Mohon lengkapi Nama dan Nomor WhatsApp Anda.");
      return;
    }

    const branch = BRANCHES.find((b) => b.id === selectedBranch) || BRANCHES[0];
    const service = SERVICES.find((s) => s.id === selectedService) || SERVICES[0];
    const barber = BARBERS.find((b) => b.id === selectedBarber) || BARBERS[0];
    const bookingId = `GLR-${Math.floor(1000 + Math.random() * 9000)}`;

    setBookingConfirmation({
      id: bookingId,
      branchName: branch.name,
      serviceName: service.name,
      barberName: barber.name,
      date: selectedDate,
      time: selectedTime,
      price: service.formattedPrice,
      customerName,
    });
  };

  const currentBranch = BRANCHES.find((b) => b.id === selectedBranch) || BRANCHES[0];
  const currentService = SERVICES.find((s) => s.id === selectedService) || SERVICES[0];
  const currentBarber = BARBERS.find((b) => b.id === selectedBarber) || BARBERS[0];

  return (
    <div
      className="main-container w-full"
      style={{
        maxWidth: "100%",
        width: "100%",
        borderWidth: "medium",
        borderStyle: "none",
        borderColor: "currentColor",
        borderImage: "none",
        borderRadius: "0px",
        margin: "0px",
        boxShadow: "none",
      }}
    >
      {/* BEGIN: Hero Section */}
      <section
        className="hero-section min-h-[620px] md:h-[650px] p-4 sm:p-6 md:p-8 flex flex-col justify-between text-white relative rounded-none overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(rgba(18, 16, 16, 0.65), rgba(18, 16, 16, 0.85)), url("https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1920&auto=format&fit=crop")',
          backgroundSize: "cover",
          backgroundPosition: "center center",
          borderWidth: "medium",
          borderStyle: "none",
          borderColor: "currentColor",
          borderImage: "none",
          outline: "none",
          borderRadius: "0px",
        }}
      >
        {/* BEGIN: Navigation */}
        <header className="flex flex-wrap sm:flex-nowrap justify-between items-center w-full gap-3 relative z-20">
          {/* Left Nav */}
          <nav className="flex gap-1 sm:gap-2 bg-[#121010]/80 rounded-full p-1 sm:p-1.5 backdrop-blur-md border border-[#FFF8CA]/20">
            <button
              onClick={() => setActiveNav("Home")}
              className={`nav-pill px-3.5 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer ${
                activeNav === "Home" ? "active" : ""
              }`}
            >
              Home
            </button>
            <a
              href="#services"
              onClick={() => setActiveNav("Services")}
              className={`nav-pill px-3.5 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer ${
                activeNav === "Services" ? "active" : ""
              }`}
            >
              Layanan
            </a>
            <a
              href="#locations"
              onClick={() => setActiveNav("Cabang")}
              className={`nav-pill px-3.5 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer ${
                activeNav === "Cabang" ? "active" : ""
              }`}
            >
              Cabang
            </a>
          </nav>

          {/* Right Nav */}
          <nav className="flex gap-1 sm:gap-2 items-center bg-[#121010]/80 rounded-full p-1 sm:p-1.5 px-3 sm:px-4 backdrop-blur-md border border-[#FFF8CA]/20">
            <a className="text-xs sm:text-sm font-medium hover:text-[#FFF8CA] transition px-2 sm:px-3" href="#locations">
              Cabang Kami
            </a>
            <a
              className="text-xs sm:text-sm font-medium hover:text-[#FFF8CA] transition px-2 sm:px-3 border-r border-white/20"
              href="#booking-section"
            >
              Booking Barber
            </a>
            <a
              href="#booking-section"
              className="pl-2 sm:pl-3 text-[#FFF8CA] hover:text-white transition cursor-pointer flex items-center gap-1.5"
              aria-label="Direct Booking"
            >
              <svg
                fill="none"
                height="16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </a>
            <Link
              href="/admin"
              className="text-[11px] font-bold text-[#FFF8CA] bg-[#6B0B0C] hover:bg-[#850e0f] px-2.5 py-1 rounded-full transition ml-1"
            >
              Admin
            </Link>
          </nav>
        </header>
        {/* END: Navigation */}

        {/* BEGIN: Hero Content */}
        <div className="text-center my-auto py-8 sm:py-12 flex-grow flex flex-col items-center justify-center relative z-10 px-4">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-4 text-[#FFF8CA]">
            GLORIOUS
          </h1>
          <p className="text-xs sm:text-sm md:text-base max-w-2xl text-gray-200 leading-relaxed font-light">
            Tempat para pria menyempurnakan karakter dan rasa percaya diri. Dipotong langsung oleh
            Master Barber berpengalaman dengan teknik gunting presisi, ritual hot towel shave, dan
            pomade artisan.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 w-full sm:w-auto items-center justify-center">
            <a
              href="#booking-section"
              className="w-full sm:w-auto text-center justify-center bg-[#6B0B0C] text-[#FFF8CA] border border-[#FFF8CA]/40 hover:bg-[#520809] hover:text-white px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-lg flex items-center gap-2"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 3v12"></path>
                <path d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                <path d="M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                <path d="M18 9l-6 6"></path>
              </svg>
              <span>Booking Barber Sekarang</span>
            </a>
            <a
              href="#locations"
              className="w-full sm:w-auto text-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all backdrop-blur-md"
            >
              Lihat 4 Cabang
            </a>
          </div>
        </div>
        {/* END: Hero Content */}

        {/* BEGIN: Bottom Hero Area */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end w-full relative z-10 gap-4 mb-20 sm:mb-0">
          {/* Stats Card */}
          <div className="glass-card rounded-2xl p-3 sm:p-4 flex gap-3 sm:gap-4 items-center max-w-[280px] sm:max-w-sm backdrop-blur-md border border-[#FFF8CA]/30">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded bg-[#6B0B0C] text-[#FFF8CA] font-semibold">
                  15+ Master Barbers
                </span>
                <span className="text-[10px] sm:text-xs text-[#FFF8CA] font-medium">Rating 4.9/5.0</span>
              </div>
              <p className="text-[11px] sm:text-xs text-gray-200 leading-tight">
                Standar pangkas rambut klasik &amp; modern dengan higienitas pisau cukur berstandar medis.
              </p>
            </div>
            {/* Stacked Barber Portraits */}
            <div className="flex -space-x-3 overflow-hidden shrink-0">
              <img
                alt="Barber 1"
                className="inline-block h-8 w-8 sm:h-10 sm:w-10 rounded-full ring-2 ring-[#6B0B0C] object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
              />
              <img
                alt="Barber 2"
                className="inline-block h-8 w-8 sm:h-10 sm:w-10 rounded-full ring-2 ring-[#6B0B0C] object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
              />
              <img
                alt="Barber 3"
                className="inline-block h-8 w-8 sm:h-10 sm:w-10 rounded-full ring-2 ring-[#6B0B0C] object-cover"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
              />
            </div>
          </div>
        </div>
        {/* END: Bottom Hero Area */}

        {/* Cutout for Explore Button */}
        <div className="absolute bottom-0 right-0 bg-[#fbf9f5] pl-4 sm:pl-7 pt-3.5 sm:pt-5 pb-3.5 sm:pb-6 pr-4 sm:pr-8 rounded-tl-2xl sm:rounded-tl-[2.5rem] z-30 flex items-center justify-center">
          <svg className="absolute -top-5 sm:-top-7 right-0 w-5 h-5 sm:w-7 sm:h-7 pointer-events-none" viewBox="0 0 28 28" fill="none">
            <path d="M28 28V0C28 15.464 15.464 28 0 28H28Z" fill="#fbf9f5"></path>
          </svg>
          <svg className="absolute bottom-0 -left-5 sm:-left-7 w-5 h-5 sm:w-7 sm:h-7 pointer-events-none" viewBox="0 0 28 28" fill="none">
            <path d="M28 28H0C15.464 28 28 15.464 28 0V28Z" fill="#fbf9f5"></path>
          </svg>
          <a
            href="#booking-section"
            className="explore-btn px-4 sm:px-7 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm tracking-wide shadow-md transition inline-flex items-center gap-1.5 sm:gap-2 cursor-pointer"
          >
            <span>Reservasi Barber</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </section>
      {/* END: Hero Section */}

      {/* BEGIN: Main Content */}
      <main id="main-content" className="bg-[#fbf9f5] p-4 sm:p-8 md:p-12">
        {/* BEGIN: Intro Story Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20 items-center">
          <div>
            <div className="inline-block text-xs font-bold tracking-widest text-[#6B0B0C] uppercase mb-2">
              Tradisi &amp; Keahlian
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-[#121010]">
              Sentuhan Gunting Klasik,
              <br />
              <span className="text-[#6B0B0C]">Presisi Modern.</span>
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-lg">
              Setiap helai rambut memiliki kepribadian. Di GLORIOUS, kami tidak sekadar memotong rambut;
              kami mendengarkan preferensi Anda, menyesuaikan dengan kontur wajah, serta memberikan
              perawatan maskulin yang menenangkan.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
            {/* Visual Thumbnail */}
            <div className="relative w-full sm:w-48 h-36 sm:h-32 rounded-2xl overflow-hidden shrink-0 shadow-md border border-gray-200">
              <img
                alt="Barber craftsmanship"
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=500&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-[#6B0B0C]/20 flex items-center justify-center">
                <div className="w-10 h-10 bg-[#FFF8CA] text-[#6B0B0C] rounded-full flex items-center justify-center shadow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-sm sm:text-lg md:text-xl font-medium leading-snug text-[#121010]">
              Bukan sekadar potongan biasa.{" "}
              <span className="inline-block px-3 py-0.5 rounded-full bg-[#6B0B0C] text-[#FFF8CA] font-bold text-xs sm:text-sm align-middle mx-1">
                GLORIOUS
              </span>{" "}
              menghadirkan standar grooming premium yang menjaga ketajaman penampilan Anda setiap saat.
            </p>
          </div>
        </section>
        {/* END: Intro Section */}

        {/* BEGIN: Locations Grid (Cabang Kami) */}
        <section id="locations" className="mb-20 md:mb-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <div className="inline-block text-xs font-bold tracking-widest text-[#6B0B0C] uppercase mb-2">
                Jaringan Barbershop
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#121010]">
                Cabang Kami di Jakarta
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mt-2">
                Kunjungi cabang terdekat atau reservasi jadwal untuk menikmati pengalaman grooming tanpa antre.
              </p>
            </div>
            <a
              href="#booking-section"
              className="inline-flex items-center gap-2 bg-[#6B0B0C] text-[#FFF8CA] px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#520809] transition self-start sm:self-auto"
            >
              <span>Booking di Cabang Terpilih</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRANCHES.map((branch) => {
              const isSelected = selectedBranch === branch.id;
              return (
                <article
                  key={branch.id}
                  className={`relative rounded-3xl overflow-hidden group cursor-pointer transition-all duration-300 border-2 ${
                    isSelected ? "border-[#6B0B0C] shadow-xl scale-[1.02]" : "border-transparent shadow-md hover:shadow-xl"
                  }`}
                  onClick={() => handleBranchSelectFromCard(branch.id)}
                >
                  <div className="h-96 relative">
                    <img
                      alt={branch.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={branch.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121010] via-[#121010]/60 to-transparent"></div>
                    <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FFF8CA] text-[#6B0B0C]">
                            {branch.area}
                          </span>
                          {isSelected && (
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#6B0B0C] text-[#FFF8CA] border border-[#FFF8CA]/30">
                              Terpilih
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold mb-1.5">{branch.name}</h3>
                        <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                          {branch.address}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/20">
                        <div className="flex justify-between items-center text-xs text-gray-300 mb-2">
                          <span className="flex items-center gap-1.5">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            {branch.hours}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] mb-3 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-xs border border-white/10">
                          <span className="text-[#FFF8CA]">Kapasitas: {branch.totalChairs} Kursi</span>
                          <span className="font-bold text-emerald-400">{branch.availableChairs} Tersedia</span>
                        </div>
                        <button
                          type="button"
                          className="w-full bg-[#FFF8CA] text-[#6B0B0C] hover:bg-white font-semibold py-2.5 rounded-full text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                        >
                          <span>Pilih &amp; Reservasi</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
        {/* END: Locations Grid */}

        {/* BEGIN: Services Section */}
        <section id="services" className="mb-20 md:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="inline-block text-xs font-bold tracking-widest text-[#6B0B0C] uppercase mb-2">
              Menu Layanan
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#121010]">
              Layanan Pangkas &amp; Grooming
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-3">
              Setiap paket dirancang dengan standar higienis tinggi, peralatan steril, dan produk perawatan kulit pria terkemuka.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {SERVICES.map((service) => {
              const isSelected = selectedService === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => {
                    setSelectedService(service.id);
                    const bookingSection = document.getElementById("booking-section");
                    if (bookingSection) {
                      bookingSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white transition-all cursor-pointer border-2 relative ${
                    isSelected
                      ? "border-[#6B0B0C] shadow-lg ring-2 ring-[#6B0B0C]/10"
                      : "border-gray-200 hover:border-[#6B0B0C]/40 hover:shadow-md"
                  }`}
                >
                  {service.tag && (
                    <span className="absolute top-4 sm:top-5 right-4 sm:right-5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FFF8CA] text-[#6B0B0C] border border-[#6B0B0C]/20">
                      {service.tag}
                    </span>
                  )}
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>{service.duration}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#121010] mb-2">{service.name}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-base sm:text-lg font-extrabold text-[#6B0B0C]">
                      {service.formattedPrice}
                    </span>
                    <button
                      type="button"
                      className={`text-xs font-semibold px-4 py-2 rounded-full transition ${
                        isSelected
                          ? "bg-[#6B0B0C] text-[#FFF8CA]"
                          : "bg-gray-100 text-gray-800 hover:bg-[#6B0B0C] hover:text-[#FFF8CA]"
                      }`}
                    >
                      {isSelected ? "Layanan Dipilih" : "Pilih Layanan"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        {/* END: Services Section */}

        {/* BEGIN: Goods / Products Section */}
        <section id="goods-section" className="mb-20 md:mb-24">
          <div className="flex flex-col sm:flex-row items-start sm:items-end mb-8 sm:mb-10 justify-between gap-4">
            <div>
              <div className="inline-block text-xs font-bold tracking-widest text-[#6B0B0C] uppercase mb-2">
                Apotek Perawatan Pria
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#121010]">
                Gentlemen&apos;s Essentials
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mt-2">
                Produk styling dan perawatan harian berformulasi organik untuk menjaga kesehatan rambut dan jenggot Anda.
              </p>
            </div>
            <a
              className="bg-[#121010] text-[#FFF8CA] px-5 sm:px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-[#6B0B0C] transition tracking-wide self-start sm:self-auto"
              href="#booking-section"
            >
              Konsultasi Produk dengan Barber
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PRODUCTS.map((prod) => (
              <div key={prod.id} className="group cursor-pointer">
                <div className="relative bg-gray-200 rounded-3xl overflow-hidden aspect-[4/3] mb-4 shadow-sm border border-gray-200">
                  <button
                    onClick={() => toggleFavorite(prod.id)}
                    className={`absolute top-4 left-4 w-9 h-9 backdrop-blur-md rounded-full flex items-center justify-center transition z-10 cursor-pointer ${
                      favorites[prod.id]
                        ? "bg-[#6B0B0C] text-[#FFF8CA]"
                        : "bg-black/30 text-white hover:bg-black/50"
                    }`}
                    aria-label={`Wishlist ${prod.name}`}
                  >
                    <svg
                      fill={favorites[prod.id] ? "currentColor" : "none"}
                      height="16"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>
                  <img
                    alt={prod.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={prod.image}
                  />
                  <div className="absolute top-4 right-4 bg-[#121010]/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-semibold text-[#FFF8CA]">
                    {prod.category}
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="text-lg font-bold text-[#121010] mb-1">{prod.name}</h4>
                    <p className="text-xs text-gray-500 mb-2 leading-relaxed">{prod.notes}</p>
                    <p className="font-extrabold text-sm text-[#6B0B0C]">{prod.price}</p>
                  </div>
                  <button
                    className="w-10 h-10 bg-[#121010] text-[#FFF8CA] hover:bg-[#6B0B0C] rounded-full flex items-center justify-center transition cursor-pointer shadow-sm shrink-0"
                    aria-label={`Pesan ${prod.name}`}
                    title="Tambah ke Reservasi"
                    onClick={() => {
                      alert(`Produk ${prod.name} telah ditambahkan ke preferensi kunjungan Anda.`);
                    }}
                  >
                    <svg
                      fill="none"
                      height="16"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 5v14M5 12h14"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* END: Goods Section */}

        {/* BEGIN: BOOKING FORM SECTION (Tepat di bawah produk, rapi dan presisi) */}
        <section
          id="booking-section"
          className="mb-20 md:mb-24 scroll-mt-12 bg-white rounded-3xl p-4 sm:p-8 md:p-12 border-2 border-gray-200 shadow-xl relative overflow-hidden"
        >
          {/* Accent Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#6B0B0C] via-[#FFF8CA] to-[#6B0B0C]"></div>

          <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-[#6B0B0C]/10 border border-[#6B0B0C]/30 px-4 py-1.5 rounded-full mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B0B0C" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span className="text-xs font-bold tracking-wider text-[#6B0B0C] uppercase">
                Reservasi Barber Online
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#121010]">
              Atur Janji Temu Grooming Anda
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-3 max-w-xl mx-auto">
              Pilih cabang terdekat, tentukan layanan pangkas atau perawatan, pilih barber favorit Anda, dan tentukan jam kedatangan yang paling nyaman.
            </p>
          </div>

          <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Left / Core Selectors (8 cols) */}
            <div className="lg:col-span-8 space-y-8 sm:space-y-10">
              {/* STEP 1: PILIH CABANG */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-7 h-7 rounded-full bg-[#6B0B0C] text-[#FFF8CA] flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <h3 className="text-lg font-bold text-[#121010]">Pilih Cabang Barbershop</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BRANCHES.map((b) => {
                    const isSelected = selectedBranch === b.id;
                    return (
                      <div
                        key={b.id}
                        onClick={() => setSelectedBranch(b.id)}
                        className={`p-4 rounded-2xl cursor-pointer transition border-2 text-left flex flex-col justify-between ${
                          isSelected
                            ? "border-[#6B0B0C] bg-[#6B0B0C]/5 shadow-sm"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-sm text-[#121010]">{b.name}</span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                              {b.area}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 leading-tight mb-2">{b.address}</p>
                        </div>
                        <div className="flex items-center justify-between text-[11px] pt-2 border-t border-gray-100">
                          <span className="text-[#6B0B0C] font-medium flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span>{b.hours}</span>
                          </span>
                          <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {b.totalChairs} Kursi ({b.availableChairs} Kosong)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: PILIH LAYANAN */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-7 h-7 rounded-full bg-[#6B0B0C] text-[#FFF8CA] flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <h3 className="text-lg font-bold text-[#121010]">Pilih Layanan Utama</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map((s) => {
                    const isSelected = selectedService === s.id;
                    return (
                      <div
                        key={s.id}
                        onClick={() => setSelectedService(s.id)}
                        className={`p-4 rounded-2xl cursor-pointer transition border-2 text-left flex flex-col justify-between ${
                          isSelected
                            ? "border-[#6B0B0C] bg-[#6B0B0C]/5 shadow-sm"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-bold text-sm text-[#121010]">{s.name}</span>
                            <span className="text-[11px] font-semibold text-gray-500">{s.duration}</span>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                            {s.description}
                          </p>
                        </div>
                        <div className="text-sm font-extrabold text-[#6B0B0C]">
                          {s.formattedPrice}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 3: PILIH MASTER BARBER */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-7 h-7 rounded-full bg-[#6B0B0C] text-[#FFF8CA] flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <h3 className="text-lg font-bold text-[#121010]">Pilih Master Barber</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {BARBERS.map((barber) => {
                    const isSelected = selectedBarber === barber.id;
                    return (
                      <div
                        key={barber.id}
                        onClick={() => setSelectedBarber(barber.id)}
                        className={`p-3 rounded-2xl cursor-pointer transition border-2 flex items-center gap-3 ${
                          isSelected
                            ? "border-[#6B0B0C] bg-[#6B0B0C]/5 shadow-sm"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <img
                          alt={barber.name}
                          className="w-12 h-12 rounded-full object-cover shrink-0 ring-1 ring-gray-200"
                          src={barber.image}
                        />
                        <div className="overflow-hidden">
                          <p className="font-bold text-xs text-[#121010] truncate">{barber.name}</p>
                          <p className="text-[11px] text-[#6B0B0C] font-semibold truncate">{barber.role}</p>
                          <p className="text-[10px] text-gray-500 truncate">{barber.experience}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 4: PILIH TANGGAL & JAM */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-7 h-7 rounded-full bg-[#6B0B0C] text-[#FFF8CA] flex items-center justify-center text-xs font-bold">
                    4
                  </div>
                  <h3 className="text-lg font-bold text-[#121010]">Pilih Tanggal &amp; Waktu</h3>
                </div>

                {/* Date options */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {DATE_OPTIONS.map((d) => (
                    <button
                      type="button"
                      key={d.value}
                      onClick={() => setSelectedDate(d.value)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
                        selectedDate === d.value
                          ? "bg-[#6B0B0C] text-[#FFF8CA] shadow-sm"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>

                {/* Time slot pills */}
                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                  {TIME_SLOTS.map((time) => (
                    <button
                      type="button"
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition cursor-pointer border ${
                        selectedTime === time
                          ? "bg-[#121010] text-[#FFF8CA] border-[#121010] shadow-sm"
                          : "bg-white text-gray-800 border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                {/* Chair capacity note */}
                <div className="flex items-center gap-2 mt-3.5 p-2.5 rounded-xl bg-gray-100 border border-gray-200 text-xs text-gray-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                  <span>
                    Kapasitas cabang <strong>{currentBranch.name}</strong>: <strong>{currentBranch.totalChairs} Kursi Barber</strong> ({currentBranch.availableChairs} kursi tersedia untuk sesi ini).
                  </span>
                </div>
              </div>

              {/* STEP 5: DATA DIRI */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-7 h-7 rounded-full bg-[#6B0B0C] text-[#FFF8CA] flex items-center justify-center text-xs font-bold">
                    5
                  </div>
                  <h3 className="text-lg font-bold text-[#121010]">Data Tamu</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Raditya Pramana"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#6B0B0C] focus:border-[#6B0B0C] outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Nomor WhatsApp / HP *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0812-3456-7890"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#6B0B0C] focus:border-[#6B0B0C] outline-none transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Catatan Tambahan / Preferensi Potongan (Opsional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Contoh: Model taper fade rendah, jangan terlalu tipis bagian atas..."
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#6B0B0C] focus:border-[#6B0B0C] outline-none transition"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Form Right / Live Sticky Summary (4 cols) */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 bg-[#121010] text-white p-6 md:p-8 rounded-3xl shadow-2xl border border-[#6B0B0C]/40">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#FFF8CA]">
                      Ringkasan Booking
                    </span>
                    <h4 className="text-xl font-extrabold text-white">GLORIOUS Atelier</h4>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#6B0B0C] text-[#FFF8CA] flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                </div>

                <div className="space-y-4 text-xs mb-8">
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400">Cabang:</span>
                    <span className="font-bold text-right text-[#FFF8CA]">{currentBranch.name}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400">Layanan:</span>
                    <div className="text-right">
                      <p className="font-bold text-white">{currentService.name}</p>
                      <p className="text-[11px] text-gray-400">Durasi: {currentService.duration}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400">Barber:</span>
                    <span className="font-bold text-right text-white">{currentBarber.name}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400">Jadwal:</span>
                    <div className="text-right font-bold text-[#FFF8CA]">
                      <p>{selectedDate}</p>
                      <p className="text-sm">Pukul {selectedTime} WIB</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex justify-between items-center text-sm">
                    <span className="font-medium text-gray-300">Total Biaya:</span>
                    <span className="text-2xl font-extrabold text-[#FFF8CA]">
                      {currentService.formattedPrice}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#6B0B0C] hover:bg-[#850e0f] text-[#FFF8CA] border border-[#FFF8CA]/40 font-bold py-3.5 px-6 rounded-2xl text-sm transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Konfirmasi Reservasi</span>
                </button>

                <p className="text-[11px] text-gray-400 text-center mt-4 leading-relaxed">
                  Konfirmasi instan via WhatsApp. Pembayaran dilakukan di tempat setelah sesi pangkas selesai.
                </p>
              </div>
            </div>
          </form>
        </section>
        {/* END: Booking Form Section */}

        {/* BEGIN: Testimonials / Gentlemen Speak */}
        <section className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-block text-xs font-bold tracking-widest text-[#6B0B0C] uppercase mb-2">
              Ulasan Pelanggan
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#121010]">
              Kata Para Gentleman
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm">
              <div className="flex gap-1 text-[#6B0B0C] mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-xs text-gray-700 leading-relaxed mb-4">
                &ldquo;Pelayanan di cabang Senopati luar biasa. Alex sangat detail dengan fade dan hot towel shave-nya bikin rileks setelah jam kantor.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#121010] text-[#FFF8CA] font-bold text-xs flex items-center justify-center">
                  AN
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#121010]">Andi Nugraha</h4>
                  <p className="text-[10px] text-gray-500">Corporate Lawyer</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm">
              <div className="flex gap-1 text-[#6B0B0C] mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-xs text-gray-700 leading-relaxed mb-4">
                &ldquo;Booking online di website ini sangat simpel dan tepat waktu. Cabang SCBD suasananya tenang dan pomade Rosewood-nya tahan seharian.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#121010] text-[#FFF8CA] font-bold text-xs flex items-center justify-center">
                  BW
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#121010]">Bima Widyadhana</h4>
                  <p className="text-[10px] text-gray-500">Founder &amp; Investor</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm">
              <div className="flex gap-1 text-[#6B0B0C] mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-xs text-gray-700 leading-relaxed mb-4">
                &ldquo;Cabang Dharmawangsa serasa private lounge. Father &amp; Son cut jadi tradisi bulanan saya bersama putra saya. Sangat recommended!&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#121010] text-[#FFF8CA] font-bold text-xs flex items-center justify-center">
                  FA
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#121010]">Faisal Ashari</h4>
                  <p className="text-[10px] text-gray-500">Architect</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* END: Testimonials */}
      </main>
      {/* END: Main Content */}

      {/* BEGIN: Booking Confirmation Modal */}
      {bookingConfirmation && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121010] text-white rounded-3xl max-w-md w-full p-6 md:p-8 border-2 border-[#6B0B0C] shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <div className="w-14 h-14 rounded-full bg-[#6B0B0C] text-[#FFF8CA] flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <div className="text-center mb-6">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#FFF8CA]">
                Booking Terkonfirmasi
              </span>
              <h3 className="text-2xl font-black text-white mt-1">Reservasi Berhasil!</h3>
              <p className="text-xs text-gray-300 mt-1">
                Kode Booking: <strong className="text-[#FFF8CA] font-mono text-sm">{bookingConfirmation.id}</strong>
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 text-xs space-y-2 mb-6 border border-white/10">
              <div className="flex justify-between">
                <span className="text-gray-400">Atas Nama:</span>
                <span className="font-semibold text-white">{bookingConfirmation.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cabang:</span>
                <span className="font-semibold text-[#FFF8CA]">{bookingConfirmation.branchName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Layanan:</span>
                <span className="font-semibold text-white">{bookingConfirmation.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Master Barber:</span>
                <span className="font-semibold text-white">{bookingConfirmation.barberName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Waktu Kedatangan:</span>
                <span className="font-semibold text-[#FFF8CA]">
                  {bookingConfirmation.date} • {bookingConfirmation.time} WIB
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="text-gray-400">Total Biaya:</span>
                <span className="font-extrabold text-sm text-[#FFF8CA]">
                  {bookingConfirmation.price}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <a
                href={`https://wa.me/6281198765431?text=${encodeURIComponent(
                  `Halo GLORIOUS Barbershop, saya ingin konfirmasi booking ID ${bookingConfirmation.id} atas nama ${bookingConfirmation.customerName} di cabang ${bookingConfirmation.branchName} pada ${bookingConfirmation.date} jam ${bookingConfirmation.time}.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#FFF8CA] text-[#6B0B0C] hover:bg-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition text-center"
              >
                <span>Buka Konfirmasi via WhatsApp</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>

              <button
                type="button"
                onClick={() => setBookingConfirmation(null)}
                className="w-full bg-white/10 hover:bg-white/20 text-gray-300 font-medium py-2.5 px-4 rounded-xl text-xs transition cursor-pointer"
              >
                Tutup &amp; Selesai
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Booking Confirmation Modal */}

      {/* BEGIN: Footer */}
      <footer id="footer" className="bg-[#121010] text-white p-6 sm:p-10 md:p-14 rounded-t-[2.5rem] sm:rounded-t-[3rem] mt-[-2rem] relative z-20 border-t border-[#6B0B0C]/40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 sm:mb-12">
          {/* Col 1 */}
          <div className="col-span-1">
            <h5 className="text-[#FFF8CA] font-bold mb-4 text-xs tracking-wider uppercase">
              Cabang Jakarta
            </h5>
            <ul className="space-y-2 text-xs text-gray-300">
              {BRANCHES.map((b) => (
                <li key={b.id}>
                  <button
                    onClick={() => handleBranchSelectFromCard(b.id)}
                    className="hover:text-[#FFF8CA] transition text-left cursor-pointer"
                  >
                    {b.name} - {b.area}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 */}
          <div className="col-span-1">
            <h5 className="text-[#FFF8CA] font-bold mb-4 text-xs tracking-wider uppercase">
              Layanan Pilihan
            </h5>
            <ul className="space-y-2 text-xs text-gray-300">
              {SERVICES.slice(0, 4).map((s) => (
                <li key={s.id}>
                  <a className="hover:text-[#FFF8CA] transition" href="#services">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div className="col-span-1">
            <h5 className="text-[#FFF8CA] font-bold mb-4 text-xs tracking-wider uppercase">
              Informasi &amp; Kontak
            </h5>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <span className="text-gray-400">Hotline:</span> +62 811-9876-5431
              </li>
              <li>
                <span className="text-gray-400">Email:</span> concierge@gloriousbarber.com
              </li>
              <li>
                <span className="text-gray-400">Jam Operasional:</span> 09:00 - 21:00 WIB
              </li>
              <li>
                <a className="hover:text-[#FFF8CA] transition" href="#booking-section">
                  Kebijakan Reservasi
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="col-span-1">
            <h5 className="text-[#FFF8CA] font-bold mb-4 text-xs tracking-wider uppercase">
              Gentleman&apos;s Club
            </h5>
            <p className="text-xs text-gray-400 mb-3">
              Dapatkan undangan perawatan eksklusif, private event, dan promo berkala.
            </p>
            {subscribed ? (
              <div className="p-3 bg-[#6B0B0C] border border-[#FFF8CA]/30 rounded-2xl text-xs text-[#FFF8CA]">
                Terima kasih telah bergabung dengan GLORIOUS Club.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  className="bg-white/10 border border-white/20 text-white text-xs rounded-l-full py-2.5 px-4 w-full focus:ring-1 focus:ring-[#FFF8CA] placeholder:text-gray-500 outline-none"
                  placeholder="Email Anda"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-[#6B0B0C] text-[#FFF8CA] px-5 py-2.5 rounded-r-full text-xs font-bold hover:bg-[#850e0f] transition cursor-pointer border border-[#6B0B0C]"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-t border-white/10 pt-8 gap-4">
          <div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-[#FFF8CA]">
              GLORIOUS
            </h2>
            <p className="text-[10px] sm:text-[11px] text-gray-400 tracking-widest uppercase">
              Gentlemen&apos;s Barbershop &amp; Atelier
            </p>
          </div>
          <div className="text-left sm:text-right text-xs text-gray-400 space-y-1">
            <p>&copy; 2025 GLORIOUS Barbershop. All rights reserved.</p>
            <p>Traditional Craftsmanship &amp; Modern Precision.</p>
          </div>
        </div>
      </footer>
      {/* END: Footer */}
    </div>
  );
}