// ================================================================
// script.js — SejarahMU Landing Page
// Berisi: smooth scroll, hamburger menu, scroll animation,
//         penanganan gambar gagal
// Catatan: Kode ini ditulis sederhana agar mudah dipahami pemula
// ================================================================


// ----------------------------------------------------------------
// 1. HAMBURGER MENU (menu mobile buka/tutup)
// ----------------------------------------------------------------

// Ambil elemen hamburger dan menu dari HTML
var hamburger = document.getElementById('hamburger');
var navMenu   = document.getElementById('navMenu');

// Saat tombol hamburger diklik
hamburger.addEventListener('click', function () {
  // Toggle class 'active' dan 'open' untuk animasi
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
});

// Tutup menu saat salah satu link diklik (nyaman di mobile)
var navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
  });
});


// ----------------------------------------------------------------
// 2. SMOOTH SCROLL saat klik link navbar
//    (CSS scroll-behavior: smooth sudah menangani ini,
//     tapi fungsi ini memastikan kompatibilitas luas)
// ----------------------------------------------------------------

navLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    var href = this.getAttribute('href'); // contoh: "#masalah"

    // Pastikan ini link anchor (#...), bukan link ke halaman lain
    if (href && href.startsWith('#')) {
      e.preventDefault();

      var target = document.querySelector(href);
      if (target) {
        // Hitung posisi target dikurangi tinggi navbar (68px)
        var offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }
  });
});


// ----------------------------------------------------------------
// 3. NAVBAR SCROLLED — tambah bayangan saat halaman discroll
// ----------------------------------------------------------------

var navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
  if (window.pageYOffset > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ----------------------------------------------------------------
// 4. ANIMASI SCROLL — elemen muncul (fade in) saat terlihat
//    Menggunakan IntersectionObserver agar efisien
// ----------------------------------------------------------------

// Pilih semua elemen yang memiliki class 'fade-in'
var fadeElements = document.querySelectorAll('.fade-in');

// Buat observer yang memantau apakah elemen masuk ke layar
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    // Jika elemen terlihat di layar, tambahkan class 'visible'
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Hentikan observasi setelah animasi jalan (agar tidak berulang)
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12   // elemen dianggap terlihat jika 12% sudah masuk layar
});

// Daftarkan setiap elemen ke observer
fadeElements.forEach(function (el) {
  observer.observe(el);
});


// ----------------------------------------------------------------
// 5. PENANGANAN GAMBAR GAGAL DIMUAT
//    Jika gambar tidak bisa ditampilkan, ganti dengan fallback
// ----------------------------------------------------------------

// Cek hero image secara khusus (karena src bisa kosong)
var heroImg     = document.getElementById('heroImg');
var heroFallback = document.getElementById('heroFallback');

if (heroImg) {
  // Jika src kosong, langsung tampilkan fallback
  if (!heroImg.src || heroImg.src === window.location.href) {
    heroImg.style.display = 'none';
    if (heroFallback) heroFallback.style.display = 'flex';
  }
}

// Penanganan umum untuk semua gambar tim (jika error)
// (onerror sudah ada di HTML, ini sebagai lapisan tambahan)
var allImages = document.querySelectorAll('img');
allImages.forEach(function (img) {
  img.addEventListener('error', function () {
    // Jika gambar tim gagal, tampilkan placeholder teks inisial
    if (this.classList.contains('tim-foto')) {
      // Ambil inisial dari alt text
      var alt = this.getAttribute('alt') || '?';
      var initials = alt.replace('foto ', '').substring(0, 2).toUpperCase();

      // Ganti img dengan div inisial
      var placeholder = document.createElement('div');
      placeholder.style.cssText = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.4rem;color:#1a7a3c;background:#c8e6c9;';
      placeholder.textContent = initials;

      this.parentNode.replaceChild(placeholder, this);
    }
  });
});


// ----------------------------------------------------------------
// 6. AKTIF LINK NAVBAR berdasarkan posisi scroll
//    Memberi warna berbeda pada link yang sedang aktif
// ----------------------------------------------------------------

var sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', function () {
  var scrollY = window.pageYOffset;

  sections.forEach(function (section) {
    var sectionTop    = section.offsetTop - 100;
    var sectionHeight = section.offsetHeight;
    var sectionId     = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      // Hapus 'active' dari semua link
      navLinks.forEach(function (link) {
        link.style.fontWeight = '500';
        link.style.color = '';
      });

      // Tambahkan highlight ke link yang sesuai
      var activeLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
      if (activeLink) {
        activeLink.style.fontWeight = '700';
        activeLink.style.color = '#1a7a3c';  /* warna primary */
      }
    }
  });
});
