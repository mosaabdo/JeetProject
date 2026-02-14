document.addEventListener("DOMContentLoaded", () => {
  // console.log("Jeet Badki Portfolio Loaded | Antigravity Audit");

  // State Management
  const state = {
    isMenuOpen: false,
    currentSection: "",
  };

  // DOM Elements
  const navbar = document.getElementById("navbar");
  const backToTopBtn = document.getElementById("back-to-top");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("#navbar nav a, #mobile-menu a, #menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuBtn = document.getElementById("menu-btn");

  // --- Optimized Scroll Logic (Throttled via rAF) ---
  let isScrolling = false;

  const onScroll = () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        handleScroll();
        isScrolling = false;
      });
      isScrolling = true;
    }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Back to Top Button
    if (backToTopBtn) {
      if (scrollY > 300) {
        backToTopBtn.classList.remove("opacity-0", "translate-y-10", "pointer-events-none");
        backToTopBtn.classList.add("opacity-100", "translate-y-0", "pointer-events-auto");
      } else {
        backToTopBtn.classList.add("opacity-0", "translate-y-10", "pointer-events-none");
        backToTopBtn.classList.remove("opacity-100", "translate-y-0", "pointer-events-auto");
      }
    }


    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    }

    // Scrollspy
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    if (current !== state.currentSection) {
      state.currentSection = current;
      updateActiveLinks(current);
    }
  };

  // const updateActiveLinks = (currentId) => {
  //   document.querySelectorAll(".nav-link").forEach((link) => {
  //     // Reset all
  //     link.classList.remove("text-accent", "font-bold");
  //     link.classList.add("text-gray-600", "dark:text-gray-300");

  //     // Set active
  //     if (link.getAttribute("href") === `#${currentId}`) {
  //       link.classList.add("text-accent", "font-bold");
  //       link.classList.remove("text-gray-600", "dark:text-gray-300");
  //     }
  //   });
  // };

  window.addEventListener("scroll", onScroll);

  // --- Mobile Menu Interaction ---
  if (menuBtn && mobileMenu) {
    const toggleMenu = () => {
      state.isMenuOpen = !state.isMenuOpen;
      if (state.isMenuOpen) {
        mobileMenu.classList.remove("hidden");
        // Animate entrance
        mobileMenu.animate([
          { opacity: 0, transform: 'translateY(-10px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 200, easing: 'ease-out' });
      } else {
        mobileMenu.classList.add("hidden");
      }
    };

    menuBtn.addEventListener("click", toggleMenu);

    // Close on link click
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        state.isMenuOpen = false;
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // --- Smooth Scrolling ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.classList.add('nav-link'); // helper class for Scrollspy
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // --- Dark Mode ---
  const initTheme = () => {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const darkIcon = document.getElementById("theme-toggle-dark-icon");
    const lightIcon = document.getElementById("theme-toggle-light-icon");
    const themeToggleBtnMobile = document.getElementById("theme-toggle-mobile");

    // Local Storage / System Preference
    if (localStorage.getItem("color-theme") === "dark" || (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      lightIcon?.classList.remove("hidden");
    } else {
      document.documentElement.classList.remove("dark");
      darkIcon?.classList.remove("hidden");
    }

    const toggleTheme = () => {
      darkIcon?.classList.toggle("hidden");
      lightIcon?.classList.toggle("hidden");

      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      }
    };

    themeToggleBtn?.addEventListener("click", toggleTheme);
    themeToggleBtnMobile?.addEventListener("click", toggleTheme);
  };
  initTheme();


  // --- Intersection Observer for Animations ---
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100", "translate-y-0");
        entry.target.classList.remove("opacity-0", "translate-y-10");
        observer.unobserve(entry.target); // Run once
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach((el) => {
    el.classList.add("transition-all", "duration-1000", "ease-out", "opacity-0", "translate-y-10");
    observer.observe(el);
  });

  // --- Hero Background Slider (Ken Burns Effect) ---
  const heroSlider = document.getElementById("hero-slider");
  if (heroSlider) {
    const slides = heroSlider.querySelectorAll("div");
    if (slides.length > 0) {
      let currentSlide = 0;
      // Initialize first slide
      slides[0].classList.add('opacity-100', 'scale-110');

      setInterval(() => {
        const nextSlide = (currentSlide + 1) % slides.length;

        // Reset current
        slides[currentSlide].classList.remove("opacity-100", "scale-110");
        slides[currentSlide].classList.add("opacity-0", "scale-100");

        // Animate next
        slides[nextSlide].classList.remove("opacity-0", "scale-100");
        slides[nextSlide].classList.add("opacity-100", "scale-110");

        currentSlide = nextSlide;
      }, 5000);
    }
  }

  // --- Projects Data & Dynamic Rendering ---
  const projectsData = [
    {
      id: "bustamante",
      title: "Bustamante Headworks Improvement",
      impactMetric: "Wastewater Treatment Facility",
      regionCode: "ELP / USA",
      timeline: "2024-2026",
      role: "Project Engineer",
      category: "Industrial",
      cords: "31.76°N 106.45°W",
      complexity: 88,
      brief: "Supported PMC/TPMC (third‑party CM) services for the R.R. Bustamante WWTP Headworks Improvements program for El Paso Water, delivering a phased capacity increase from 39 MGD to 51 MGD.  Performed daily site rounds, coordinated field inspections and material testing, and verified construction compliance against IFC drawings, specifications, and contract documents; driving QA/QC closure similar to WIR/MIR closeouts used on Indian sites.  Managed RFI/Submittal control in Procore (akin to maintaining a TQ/Submittal Register), maintained stored material/equipment logs, and verified quantities supporting contractor pay applications (RA bill–type checks).  Supported VO/Change Order and contingency documentation by coordinating between the Client, Contractor, and EOR, and monitored baseline vs. actual progress through contractor schedule updates to track the critical path and flag slippages early in weekly PRMs with clear, data‑driven reporting.",
      techSpecs: [
        { label: "Capacity Upgrade", value: "39 MGD → 51 MGD" },
        { label: "System Type", value: "Activated Sludge" },
        { label: "Contract Type", value: "PMC / TPMC" },
      ]
    },
    {
      id: "pune-metro",
      title: "MAHA Metro Rail- Pune Metro",
      impactMetric: "Railway Infrastructure",
      regionCode: "PNQ / IND",
      timeline: "2021",
      role: "Site Engineer Intern",
      category: "Transportation",
      cords: "18.52°N 73.85°E",
      complexity: 92,
      brief: "Execution of elevated and underground corridors for the Pune Metro Rail project. Supervised viaduct precast segment erection and tunneling operations ensuring zero safety incidents.",
      techSpecs: [
        { label: "Network Length", value: "~33.2 km" },
        { label: "Methodology", value: "Precast Epoxied Segments" },
        { label: "Corridor Type", value: "Elevated & Underground" },
      ]
    },
    {
      id: "bits-goa",
      title: "BITS Goa Campus",
      impactMetric: "Student Housing",
      regionCode: "GOA / IND",
      timeline: "2021",
      role: "Proj. Eng. Intern",
      category: "Institutional",
      cords: "15.39°N 73.87°E",
      complexity: 78,
      brief: "Coordination of student housing expansion, focusing on MEP integration. Managed the installation log for 68 HVAC units and waterproofing systems for a 3-story institutional building.",
      techSpecs: [
        { label: "HVAC Units", value: "68 Systems Coordinated" },
        { label: "Structure", value: "3-Story RCC Frame" },
        { label: "Key Scope", value: "Waterproofing & SFRC" },
      ]
    },
    {
      id: "transmission-tower",
      title: "Transmission Tower Replacement",
      impactMetric: "Power Infra",
      regionCode: "PHX / USA",
      timeline: "2023",
      role: "Associate",
      category: "Industrial",
      cords: "33.44°N 112.07°W",
      complexity: 65,
      brief: "Geotechnical planning for tower replacement. Analyzed subsurface constraints to determine foundation suitability and shaft excavation parameters.",
      techSpecs: [
        { label: "Scope", value: "Foundation Parameters" },
        { label: "Excavation", value: "Shaft Drilling" },
        { label: "Analysis", value: "Subsurface Constraints" },
      ]
    },
    {
      id: "sepc-comms",
      title: "ASU SEPC Logistics",
      impactMetric: "Underground Utilities",
      regionCode: "PHX/USA",
      timeline: "2023",
      role: "Associate",
      category: "Communication Systems",
      cords: "33.42°N 111.93°W",
      complexity: 70,
      brief: "Structured cabling layout and site logistics for the ASU SEPC facility. Ensured reliability of communication lines through rigorous material staging and pathway coordination.",
      techSpecs: [
        { label: "System", value: "Structured Cabling" },
        { label: "Focus", value: "Site Logistics" },
        { label: "Reliability", value: "99.9% Up-time Target" },
      ]
    }
  ];

  const projectsContainer = document.getElementById("projects-container");

  if (projectsContainer) {
    let projectsHTML = '';
    projectsData.forEach((project, index) => {
      // Dynamic styling based on region/category
      const accentClass = project.regionCode.includes("USA") ? "text-sky-400 border-sky-400" : "text-emerald-400 border-emerald-400";

      const html = `
        <div class="project-row group relative bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 hover:border-accent/50 transition-all duration-300 reveal delay-${index * 100} overflow-hidden shadow-sm hover:shadow-2xl">
            <!-- Blueprint Grid Overlay (Subtle) -->
            <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMGgwdjFIMVptMCAyMGgwdjFIMVoiIGZpbGw9IiMzMzQxNTU1MCIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-20 pointer-events-none"></div>

            <button class="w-full text-left p-6 md:p-8 cursor-pointer project-expand-btn relative z-10 focus:outline-none" aria-expanded="false" aria-controls="details-${project.id}">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    
                    <!-- Left: ID & Title -->
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-2">
                             <span class="font-mono text-xs font-bold tracking-widest text-accent uppercase border border-accent/30 px-2 py-0.5 rounded-sm">
                                ${project.regionCode}
                             </span>
                             <span class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                                ${project.category}
                             </span>
                        </div>
                        <h3 class="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                            ${project.title}
                        </h3>
                    </div>

                    <!-- Right: Metrics -->
                    <div class="flex items-center gap-8">
                         <div class="hidden md:block text-right">
                            <div class="text-[10px] text-gray-400 uppercase tracking-widest">Impact Factor</div>
                            <div class="font-mono text-xl font-bold text-gray-800 dark:text-slate-200">${project.impactMetric}</div>
                         </div>
                         <div class="w-10 h-10 rounded-full border border-gray-300 dark:border-slate-600 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-black transition-all duration-300">
                            <i class="fas fa-plus transform transition-transform duration-300 icon-toggle"></i>
                         </div>
                    </div>
                </div>
            </button>

            <!-- Expanded Details -->
            <div id="details-${project.id}" class="hidden bg-gray-50 dark:bg-slate-950/50 border-t border-gray-200 dark:border-slate-800 relative z-10">
                <div class="p-6 md:p-8 grid md:grid-cols-3 gap-8">
                    
                    <!-- Col 1: Description -->
                    <div class="md:col-span-2 space-y-4">
                        <div class="flex items-center gap-2 text-xs font-mono text-gray-500">
                             <i class="fas fa-crosshairs text-accent"></i>
                             <span>${project.cords}</span>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                            ${project.brief}
                        </p>
                    </div>

                    <!-- Col 2: Tech Specs -->
                    <div class="bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-slate-800 shadow-inner">
                        <h4 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-200 dark:border-slate-700 pb-2">Technical Specs</h4>
                        <ul class="space-y-3">
                            ${project.techSpecs.map(spec => `
                                <li class="flex justify-between items-center text-sm">
                                    <span class="text-gray-500 dark:text-gray-400">${spec.label}</span>
                                    <span class="font-mono font-semibold text-gray-900 dark:text-white">${spec.value}</span>
                                </li>
                            `).join('')}
                        </ul>
                        
                        <!-- Complexity Bar -->
                        <div class="mt-6">
                             <div class="flex justify-between text-[10px] uppercase font-bold text-gray-500 mb-1">
                                <span>Complexity Score</span>
                                <span class="text-accent">${project.complexity}/100</span>
                             </div>
                             <div class="h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div class="h-full bg-accent" style="width: ${project.complexity}%"></div>
                             </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        `;
      projectsHTML += html;
    });

    // SECURITY NOTE: projectsData is hardcoded above, so this innerHTML assignment is safe.
    projectsContainer.innerHTML = projectsHTML;

    // Delegation for Accordion
    projectsContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".project-expand-btn");
      if (!btn) return;

      const targetId = btn.getAttribute("aria-controls");
      const content = document.getElementById(targetId);
      const icon = btn.querySelector(".icon-toggle");

      // Toggle logic
      const isHidden = content.classList.contains("hidden");

      // Close others (Optional - currently allowing multiple open)
      // document.querySelectorAll('[id^="details-"]').forEach(el => el.classList.add('hidden'));

      if (isHidden) {
        content.classList.remove("hidden");
        // Simple fade in
        content.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 });
        btn.setAttribute("aria-expanded", "true");
        icon.classList.add("rotate-45");
      } else {
        content.classList.add("hidden");
        btn.setAttribute("aria-expanded", "false");
        icon.classList.remove("rotate-45");
      }
    });
  }

  // --- Testimonial Swiper Initialization ---
  const testimonialSwiper = new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 800,
    effect: 'slide',
    navigation: {
      nextEl: '#slider-button-right',
      prevEl: '#slider-button-left',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    grabCursor: true,
    on: {
      init: function () {
        // console.log('Testimonial Swiper initialized');
      },
    },
  });

  // --- Countdown Timer ---
  const initCountdown = () => {
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    // Only run if elements exist
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    // Set launch date (e.g., 14 days from now)
    const launchDate = new Date("2026-06-01T00:00:00");
    launchDate.setDate(launchDate.getDate() + 14);

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance < 0) {
        // Launch!
        daysEl.innerText = "00";
        hoursEl.innerText = "00";
        minutesEl.innerText = "00";
        secondsEl.innerText = "00";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.innerText = days < 10 ? `0${days}` : days;
      hoursEl.innerText = hours < 10 ? `0${hours}` : hours;
      minutesEl.innerText = minutes < 10 ? `0${minutes}` : minutes;
      secondsEl.innerText = seconds < 10 ? `0${seconds}` : seconds;
    };

    setInterval(updateTimer, 1000);
    updateTimer(); // Initial call
  };
  initCountdown();

});
