/* ==========================================================================
   MAIN PORTFOLIO APPLICATION SCRIPT
   Handles Projects Data, Category Filtering, Modal Viewer, Theme Toggle,
   Dynamic Typing, and Contact Form Interaction.
   ========================================================================== */

// 1. Projects Data (5 Portfolio Projects)
const PROJECTS_DATA = [
  {
    id: "pastar",
    title: "PASTAR - Sistem Pasar Tradisional",
    category: "webapp",
    categoryLabel: "Web App",
    summary:
      "Platform online marketplace untuk mendigitalisasi pasar tradisional yang menghubungkan pembeli, penjual, dan pengelola secara aman dan terstruktur.",
    description:
      "Mengembangkan platform online marketplace pasar tradisional yang menghubungkan pembeli, penjual, dan pengelola. Mengerjakan fitur penjelajahan produk, keranjang, manajemen penjual, dan sistem persetujuan untuk mendukung transaksi yang aman serta mendorong digitalisasi pasar tradisional.",
    image: "assets/images/pastar.png",
    tags: ["Laravel", "Bootstrap"],
    features: [
      "Marketplace online untuk pasar tradisional",
      "Terdapat fitur keranjang belanja (Shopping Cart) dan checkout",
      "Melakukan komunikasi antara pembeli dan penjual melalui chat",
    ],
  },
  {
    id: "shineyou",
    title: "Shine You",
    category: "mobile",
    categoryLabel: "Mobile & AI",
    summary:
      "Aplikasi mobile berbasis machine learning untuk mendeteksi kesehatan mental melalui pemrosesan data dan layanan backend yang andal.",
    description:
      "Mengembangkan aplikasi mobile berbasis machine learning untuk membantu deteksi kesehatan mental. Berfokus pada pembangunan serta pengoptimalan model machine learning, sekaligus mengimplementasikan sistem backend untuk mendukung fungsionalitas aplikasi dan pemrosesan data yang akurat.",
    image: "assets/images/shineyou.png",
    tags: ["Kotlin", "Firebase", "Python"],
    features: [
      "Melihat Berita & Artikel Kesehatan Mental Terkini",
      "Melakukan Tes Kesehatan Mental dengan hasil analisis berbasis ML",
      "Terdapat to do list & reminder untuk menjaga kesehatan mental",
    ],
  },
  {
    id: "skinlytic",
    title: "Skinlytic - Project Akhir",
    category: "ai",
    categoryLabel: "AI",
    summary:
      "Aplikasi Mobile AI yang mampu mendeteksi penyakit kulit dengan akurasi tinggi menggunakan model Vision Transformer (ViT) berbasis TensorFlow.",
    description:
      "Skinlytic adalah platform deteksi penyakit kulit berbasis AI. Didesain untuk membantu deteksi dini penyakit kulit dengan akurasi tinggi.",
    image: "assets/images/skinlytic.png",
    tags: ["Python", "ViT", "TensorFlow"],
    features: [
      "Melakukan Deteksi penyakit kulit dengan akurasi tinggi menggunakan model ViT",
      "Melakukan Deteksi penyakit kulit menggunakan camera dan upload gambar",
    ],
  },
  {
    id: "wellbore",
    title: "Wellbore Diagram - Project Magang PT. Pertamina Hulu Rokan",
    category: "webapp",
    categoryLabel: "Web App",
    summary:
      "Aplikasi web untuk visualisasi dan analisis diagram wellbore, memanfaatkan SVG dan JSON untuk representasi data yang interaktif.",
    description:
      "Wellbore Diagram adalah aplikasi untuk visualisasi dan analisis diagram wellbore dalam proyek magang di PT. Pertamina Hulu Rokan.",
    image: "assets/images/WellboreDiagram.png",
    tags: ["SVG", "JSON", "JavaScript"],
    features: [
      "Visualisasi diagram wellbore interaktif menggunakan SVG",
      "Mendukung analisis data wellbore melalui representasi JSON",
      "Menyediakan fitur zoom untuk eksplorasi diagram yang lebih baik",
    ],
  },
  {
    id: "dashboard",
    title: "Dashboard - Project Magang PT. PLN Unit Induk Riau & Kepulauan",
    category: "webapp",
    categoryLabel: "Web App",
    summary:
      "Aplikasi dashboard untuk monitoring dan analisis data operasional, menampilkan informasi penting secara real-time dengan antarmuka yang responsif.",
    description:
      "Dashboard untuk proyek magang di PT. PLN Unit Induk Riau & Kepulauan, memungkinkan monitoring dan analisis data operasional secara efektif.",
    image: "assets/images/dashboard.png",
    tags: ["React.js", "Laravel", "Google Sheet"],
    features: [
      "Monitoring data operasional secara real-time",
      "Menampilkan grafik dan statistik penting untuk analisis cepat",
      "Antarmuka responsif yang mendukung berbagai perangkat",
    ],
  },
];

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initTypingEffect();
  initProjects();
  initModal();
  initStatsCounter();
  initContactForm();
  initMobileNav();
});

// 2. Theme Toggle (Day / Night Sky)
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("sky-theme") || "day";

  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "night" ? "day" : "night";
      setTheme(newTheme);
    });
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("sky-theme", theme);

  const themeIcon = document.getElementById("theme-icon");
  if (themeIcon) {
    themeIcon.className = theme === "night" ? "fas fa-sun" : "fas fa-moon";
  }
}

// 3. Typing Effect in Hero Section
function initTypingEffect() {
  const typingElement = document.getElementById("typing-text");
  if (!typingElement) return;

  const roles = ["Software Engineer", "Web Developer", "AI Enggineer"];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2200; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// 4. Projects Grid & Filter
function initProjects() {
  const gridContainer = document.getElementById("projects-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");

  if (!gridContainer) return;

  renderProjects("all");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-filter");
      renderProjects(category);
    });
  });
}

function renderProjects(filterCategory) {
  const gridContainer = document.getElementById("projects-grid");
  gridContainer.innerHTML = "";

  const filtered =
    filterCategory === "all"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === filterCategory);

  filtered.forEach((project) => {
    const card = document.createElement("article");
    card.className = "glass-panel project-card";
    card.setAttribute("data-id", project.id);

    card.innerHTML = `
      <div class="project-thumbnail-wrapper">
        <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy" />
        <span class="project-category-tag">${project.categoryLabel}</span>
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-summary">${project.summary}</p>
        <div class="project-tech-stack">
          ${project.tags.map((tag) => `<span class="tech-mini-badge">${tag}</span>`).join("")}
        </div>
        <div class="project-card-footer">
          <button class="btn btn-sm btn-primary open-modal-btn" style="width: 100%;" data-id="${project.id}">
            <i class="fas fa-eye"></i> Detail Proyek
          </button>
        </div>
      </div>
    `;

    gridContainer.appendChild(card);
  });

  // Attach modal listener to new buttons
  document.querySelectorAll(".open-modal-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const projId = e.currentTarget.getAttribute("data-id");
      openProjectModal(projId);
    });
  });
}

// 5. Modal Viewer System
function initModal() {
  const modalOverlay = document.getElementById("project-modal");
  const modalCloseBtn = document.getElementById("modal-close");

  if (!modalOverlay) return;

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });
}

function openProjectModal(projectId) {
  const project = PROJECTS_DATA.find((p) => p.id === projectId);
  if (!project) return;

  const modalOverlay = document.getElementById("project-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalCategory = document.getElementById("modal-category");
  const modalDesc = document.getElementById("modal-desc");
  const modalTags = document.getElementById("modal-tags");
  const modalFeatures = document.getElementById("modal-features");

  modalImg.src = project.image;
  modalImg.alt = project.title;
  modalTitle.textContent = project.title;
  modalCategory.textContent = project.categoryLabel;
  modalDesc.textContent = project.description;

  modalTags.innerHTML = project.tags
    .map((tag) => `<span class="skill-badge">${tag}</span>`)
    .join("");

  modalFeatures.innerHTML = project.features
    .map(
      (feat) =>
        `<li><i class="fas fa-check-circle" style="color: var(--sky-primary); margin-right: 8px;"></i> ${feat}</li>`,
    )
    .join("");

  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modalOverlay = document.getElementById("project-modal");
  if (modalOverlay) {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// 6. Stats Counter Animation
function initStatsCounter() {
  const statNumbers = document.querySelectorAll(".stat-number");
  if (statNumbers.length === 0) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach((el) => {
          const target = parseInt(el.getAttribute("data-target") || "0", 10);
          let current = 0;
          const step = Math.ceil(target / 40);

          const counterInterval = setInterval(() => {
            current += step;
            if (current >= target) {
              el.textContent = target + "+";
              clearInterval(counterInterval);
            } else {
              el.textContent = current + "+";
            }
          }, 35);
        });
      }
    },
    { threshold: 0.3 },
  );

  const statsSection = document.getElementById("about");
  if (statsSection) {
    observer.observe(statsSection);
  }
}

// 7. Contact Form & Email Copying
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  const copyEmailBtn = document.getElementById("copy-email-btn");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast(
        "Pesan Anda berhasil terkirim! Terima kasih telah menghubungi.",
      );
      contactForm.reset();
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      const emailText = "developer@skyportfolio.dev";
      navigator.clipboard.writeText(emailText).then(() => {
        showToast(
          "Email (developer@skyportfolio.dev) berhasil disalin ke clipboard!",
        );
      });
    });
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.querySelector(".toast-text").textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// 8. Mobile Navigation Toggle
function initMobileNav() {
  const mobileBtn = document.getElementById("mobile-toggle");

  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Hapus active dari semua menu
      navLinks.forEach((nav) => nav.classList.remove("active"));

      // Tambahkan active ke menu yang diklik
      this.classList.add("active");
    });
  });

  if (!mobileBtn || !navLinks) return;

  mobileBtn.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-active");
    const icon = mobileBtn.querySelector("i");
    if (icon) {
      icon.className = navLinks.classList.contains("mobile-active")
        ? "fas fa-times"
        : "fas fa-bars";
    }
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("mobile-active");
      const icon = mobileBtn.querySelector("i");
      if (icon) icon.className = "fas fa-bars";
    });
  });
}
