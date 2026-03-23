(function () {
  const heroEl = document.querySelector(".hero");
  const titleEl = document.getElementById("hero-title");
  const descEl = document.getElementById("hero-description");
  const ctaEl = document.getElementById("hero-cta");
  const dotsEl = document.getElementById("hero-dots");

  // Vérification que les éléments existent
  if (!heroEl || !titleEl || !descEl || !ctaEl || !dotsEl) {
    console.error("Éléments du carrousel manquants");
    return;
  }

  const slides = [
    {
      title: "Cuisine & saveurs de Kpalimé et d'ailleurs",
      description:
        "Techniques culinaires, hygiène et recettes locales pour créer des plats d'exception.",
      bg: "../img/cuisine.jpeg", // Chemin local sans url()
      grad1: "rgba(196, 87, 47, 0.85)",
      grad2: "rgba(125, 60, 31, 0.75)",
      ctaLink: "pages/formations.html",
    },
    {
      title: "Batik : motifs & teinture à la main",
      description:
        "Création et teinture de tissus, entre motifs traditionnels et inspirations contemporaines.",
      bg: "../img/batik.jpg", // Chemin local sans url()
      grad1: "rgba(87, 98, 196, 0.85)",
      grad2: "rgba(61, 44, 125, 0.75)",
      ctaLink: "pages/formations.html",
    },
    {
      title: "Couture : design et mode éthique",
      description:
        "Patronage, confection et stylisme pour des créations solides et respectueuses des savoir-faire.",
      bg: "../img/couture.jpg", // Chemin local sans url()
      grad1: "rgba(92, 158, 122, 0.85)",
      grad2: "rgba(35, 92, 62, 0.75)",
      ctaLink: "pages/formations.html",
    },
    {
      title: "Sculpture : bois, pierre et métal",
      description:
        "Modelage et gravure pour créer des œuvres durables et expressives.",
      bg: "../img/sculpture.jpg", // Chemin local sans url()
      grad1: "rgba(168, 122, 60, 0.85)",
      grad2: "rgba(95, 60, 25, 0.75)",
      ctaLink: "pages/formations.html",
    },
    {
      title: "Tissage : textiles et créations innovantes",
      description:
        "Techniques de tissage traditionnelles et motifs modernes pour produire des pièces uniques.",
      bg: "../img/pagne-tisse.jpg", // Chemin local sans url()
      grad1: "rgba(180, 104, 150, 0.85)",
      grad2: "rgba(115, 50, 87, 0.75)",
      ctaLink: "pages/formations.html",
    },
    {
      title: "Peinture : couleurs & inspiration locale",
      description:
        "Atelier de peinture et peinture décorative inspirée de l'art et de la culture de la région.",
      bg: "../img/peinture.png", // Chemin local sans url()
      grad1: "rgba(62, 114, 154, 0.85)",
      grad2: "rgba(35, 70, 104, 0.75)",
      ctaLink: "pages/formations.html",
    },
    {
      title: "Poterie : modelage & cuisson",
      description:
        "Modélisation de l'argile, cuisson en four et création d'objets en céramique.",
      bg: "../img/poterie.jpg", // Chemin local sans url()
      grad1: "rgba(214, 134, 82, 0.85)",
      grad2: "rgba(125, 75, 35, 0.75)",
      ctaLink: "pages/formations.html",
    },
    {
      title: "Musique : rythmes & culture",
      description:
        "Atelier chant, percussions et rythmes locaux pour une expérience culturelle vivante.",
      bg: "../img/musique.jpg", // Chemin local sans url()
      grad1: "rgba(120, 170, 210, 0.85)",
      grad2: "rgba(45, 95, 140, 0.75)",
      ctaLink: "pages/formations.html",
    },
  ];

  let currentIndex = 0;
  let timer = null;
  let isTransitioning = false;

  // Fonction pour changer le dégradé
  function setGrad(grad1, grad2) {
    heroEl.style.setProperty("--hero-grad-1", grad1);
    heroEl.style.setProperty("--hero-grad-2", grad2);
  }

  // Fonction pour changer l'image de fond (CORRIGÉE)
  function setHeroBg(imagePath) {
    if (!imagePath) {
      heroEl.style.setProperty("--hero-bg-image", "none");
      return;
    }

    // Construire l'URL complète avec url()
    const bgUrl = `url('${imagePath}')`;

    // Préchargement de l'image
    const reqId = (setHeroBg._reqId = (setHeroBg._reqId || 0) + 1);
    const testImg = new Image();
    testImg.onload = function () {
      if (reqId !== setHeroBg._reqId) return;
      heroEl.style.setProperty("--hero-bg-image", bgUrl);
      console.log(`Image chargée avec succès: ${imagePath}`);
    };
    testImg.onerror = function () {
      if (reqId !== setHeroBg._reqId) return;
      heroEl.style.setProperty("--hero-bg-image", "none");
      console.error(`Erreur de chargement de l'image: ${imagePath}`);
    };
    testImg.src = imagePath;
  }

  // Créer les points de navigation
  function createDots() {
    dotsEl.innerHTML = "";
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = `hero-dot ${index === 0 ? "is-active" : ""}`;
      dot.setAttribute("aria-label", `Aller au slide ${index + 1}`);
      dot.addEventListener("click", () => goToSlide(index));
      dotsEl.appendChild(dot);
    });
  }

  // Mettre à jour les points actifs
  function updateDots() {
    const dots = Array.from(dotsEl.children);
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === currentIndex);
      dot.setAttribute("aria-current", i === currentIndex ? "true" : "false");
    });
  }

  // Mettre à jour le contenu
  function updateContent() {
    const slide = slides[currentIndex];
    titleEl.textContent = slide.title;
    descEl.textContent = slide.description;
    ctaEl.setAttribute("href", slide.ctaLink);
  }

  // Aller à un slide spécifique
  function goToSlide(index) {
    if (isTransitioning) return;

    const next = ((index % slides.length) + slides.length) % slides.length;

    if (next === currentIndex) return;

    isTransitioning = true;

    // Animation de fondu pour le contenu
    const heroContent = document.getElementById("hero-content");
    heroContent.classList.add("is-fading");

    setTimeout(() => {
      currentIndex = next;
      const s = slides[currentIndex];

      // Mise à jour du contenu
      titleEl.textContent = s.title;
      descEl.textContent = s.description;
      ctaEl.setAttribute("href", s.ctaLink);

      // Mise à jour de l'image de fond
      setHeroBg(s.bg);

      // Mise à jour du dégradé
      setGrad(s.grad1, s.grad2);

      // Mise à jour des points
      updateDots();

      heroContent.classList.remove("is-fading");

      setTimeout(() => {
        isTransitioning = false;
      }, 50);
    }, 200);
  }

  // Slide suivant
  function nextSlide() {
    if (!isTransitioning) {
      goToSlide(currentIndex + 1);
    }
  }

  // Slide précédent
  function prevSlide() {
    if (!isTransitioning) {
      goToSlide(currentIndex - 1);
    }
  }

  // Démarrage automatique
  function startAutoPlay() {
    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    stopAutoPlay();
    timer = window.setInterval(nextSlide, 6000);
  }

  // Arrêt automatique
  function stopAutoPlay() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  // Initialisation
  createDots();
  setHeroBg(slides[0].bg);
  setGrad(slides[0].grad1, slides[0].grad2);
  updateContent();
  updateDots();
  startAutoPlay();
})();


// ********* Menu responsive avec animation
(function () {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (!menuToggle || !navMenu) return;

  // Fonction pour ouvrir/fermer le menu
  function toggleMenu() {
    const isOpen = navMenu.classList.contains("active");

    if (isOpen) {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = ""; // Réactiver le scroll
    } else {
      navMenu.classList.add("active");
      menuToggle.classList.add("active");
      menuToggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden"; // Désactiver le scroll
    }
  }

  // Événement click sur le bouton hamburger
  menuToggle.addEventListener("click", toggleMenu);

  // Fermer le menu quand on clique sur un lien
  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // Fermer le menu quand on redimensionne au-delà de 768px
  function handleResize() {
    if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  }

  window.addEventListener("resize", handleResize);

  // Fermer le menu avec la touche Echap
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      toggleMenu();
    }
  });
})();


(function() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;
    
    const slides = Array.from(track.children);
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = 30; // Gap entre les slides en pixels
    
    let currentIndex = 0;
    let autoPlayTimer = null;
    let isTransitioning = false;
    let slidesPerView = getSlidesPerView();
    
    // Calculer le nombre de slides visibles selon la largeur d'écran
    function getSlidesPerView() {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    
    // Mettre à jour la largeur des slides
    function updateSlideWidth() {
      slidesPerView = getSlidesPerView();
      const containerWidth = track.parentElement.clientWidth;
      const newSlideWidth = (containerWidth - (gap * (slidesPerView - 1))) / slidesPerView;
      
      slides.forEach(slide => {
        slide.style.flex = `0 0 ${newSlideWidth}px`;
      });
      
      return newSlideWidth;
    }
    
    // Positionner les slides
    function setSlidePosition() {
      const slideWidthValue = slides[0].getBoundingClientRect().width;
      slides.forEach((slide, index) => {
        slide.style.left = (slideWidthValue + gap) * index + 'px';
      });
    }
    
    // Déplacer le carrousel
    function moveToSlide(index) {
      if (isTransitioning) return;
      if (index < 0) index = 0;
      if (index > slides.length - slidesPerView) index = slides.length - slidesPerView;
      
      isTransitioning = true;
      currentIndex = index;
      
      const slideWidthValue = slides[0].getBoundingClientRect().width;
      const amountToMove = -(slideWidthValue + gap) * currentIndex;
      
      track.style.transform = `translateX(${amountToMove}px)`;
      updateDots();
      
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }
    
    // Slide suivant
    function nextSlide() {
      if (currentIndex < slides.length - slidesPerView) {
        moveToSlide(currentIndex + 1);
      } else {
        moveToSlide(0); // Retour au début
      }
    }
    
    // Slide précédent
    function prevSlide() {
      if (currentIndex > 0) {
        moveToSlide(currentIndex - 1);
      } else {
        moveToSlide(slides.length - slidesPerView); // Aller à la fin
      }
    }
    
    // Créer les points de navigation
    function createDots() {
      dotsContainer.innerHTML = '';
      const numberOfDots = Math.ceil(slides.length / slidesPerView);
      
      for (let i = 0; i < numberOfDots; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        dot.setAttribute('aria-label', `Aller au slide ${i + 1}`);
        dot.addEventListener('click', () => moveToSlide(i));
        dotsContainer.appendChild(dot);
      }
      updateDots();
    }
    
    // Mettre à jour les points actifs
    function updateDots() {
      const dots = Array.from(dotsContainer.children);
      const activeDotIndex = Math.floor(currentIndex / slidesPerView);
      
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeDotIndex);
      });
    }
    
    // Démarrage automatique
    function startAutoPlay() {
      const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      
      stopAutoPlay();
      autoPlayTimer = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }
    
    // Événements
    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoPlay();
      startAutoPlay();
    });
    
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoPlay();
      startAutoPlay();
    });
    
    // Pause au survol (optionnel)
    const carousel = document.querySelector('.products-carousel');
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Redimensionnement
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateSlideWidth();
        moveToSlide(currentIndex);
        createDots();
      }, 250);
    });
    
    // Initialisation
    updateSlideWidth();
    createDots();
    moveToSlide(0);
    startAutoPlay();
  })();