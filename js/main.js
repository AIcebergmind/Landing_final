<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>

  
  
  <script>
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// === VARIABILI DI CONTROLLO GLOBALI ===
let projectAnimationsActive = true; // Controllo animazioni progetti (SYNAPSE)
let colorCycleActive = true; // Controllo del ciclo colori
let channelsAnimationsActive = true; // Controllo animazioni channels (SYNAPSE)
let colorChangeInterval; // Riferimento all'intervallo

// Horizontal scroll per la sezione ABOUT
gsap.to("#about .horizontal-scroll-content", {
  x: () => -(document.querySelector("#about .horizontal-scroll-content").scrollWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: "#about .horizontal-scroll-wrapper",
    start: "top top",
    end: () => "+=" + (document.querySelector("#about .horizontal-scroll-content").scrollWidth - window.innerWidth),
    scrub: true,
    pin: true,
    anticipatePin: 1
  }
});

// === NAVIGAZIONE PROGETTI CON FRECCE ===
// Sistema di navigazione manuale per le project cards
let currentProjectIndex = 0;
const totalProjects = 6;

// Funzione per navigare tra i progetti
function navigateToProject(index) {
  if (index < 0 || index >= totalProjects) return;
  
  currentProjectIndex = index;
  const scrollContent = document.querySelector("#projects .horizontal-scroll-content");
  const cardWidth = 382; // 350px + 32px gap
  const targetX = -(cardWidth * index);
  
  // Anima verso la card target - rispetta stato SYNAPSE
  if (projectAnimationsActive) {
    gsap.to(scrollContent, {
      x: targetX,
      duration: 0.8,
      ease: "power2.inOut"
    });
  } else {
    // Movimento istantaneo quando SYNAPSE è OFF
    gsap.set(scrollContent, { x: targetX });
  }
  
  updateProjectIndicator(index);
}

// Funzioni di navigazione
function nextProject() {
  if (currentProjectIndex < totalProjects - 1) {
    navigateToProject(currentProjectIndex + 1);
  }
}

function prevProject() {
  if (currentProjectIndex > 0) {
    navigateToProject(currentProjectIndex - 1);
  }
}

// Inizializzazione al caricamento
document.addEventListener('DOMContentLoaded', function() {
  // Posiziona inizialmente sulla prima card
  navigateToProject(0);
  
  // Event listeners per le frecce (da aggiungere al DOM)
  const prevArrow = document.querySelector('.project-nav-prev');
  const nextArrow = document.querySelector('.project-nav-next');
  
  if (prevArrow) {
    prevArrow.addEventListener('click', prevProject);
  }
  
  if (nextArrow) {
    nextArrow.addEventListener('click', nextProject);
  }
  
  // Event listeners per i dot dell'indicatore
  document.querySelectorAll('.indicator-dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
      navigateToProject(index);
    });
  });
  
  // Controllo tastiera (opzionale)
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      prevProject();
    } else if (e.key === 'ArrowRight') {
      nextProject();
    }
  });
});

// Funzione per aggiornare l'indicatore
function updateProjectIndicator(cardIndex) {
  const dots = document.querySelectorAll('.indicator-dot');
  dots.forEach((dot, index) => {
    if (index === cardIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Animazioni per le project cards - controllate da SYNAPSE
function initProjectCardsAnimations() {
  if (projectAnimationsActive) {
    gsap.fromTo(".project-card", {
      y: 50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".projects-grid",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
  } else {
    // Quando SYNAPSE è OFF, mostra le cards direttamente
    gsap.set(".project-card", { y: 0, opacity: 1 });
  }
}

// Inizializza le animazioni
initProjectCardsAnimations();

// Animazione per il titolo della sezione
gsap.fromTo(".section-title", {
  y: 30,
  opacity: 0
}, {
  y: 0,
  opacity: 1,
  duration: 1,
  scrollTrigger: {
    trigger: ".section-header",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse"
  }
});

// Animazioni parallax per SUBHERO
gsap.fromTo(".subhero-title", {
  y: 50,
  opacity: 0
}, {
  y: 0,
  opacity: 1,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#subhero",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse"
  }
});

gsap.fromTo(".subhero-subtitle", {
  y: 40,
  opacity: 0
}, {
  y: 0,
  opacity: 1,
  duration: 1,
  delay: 0.3,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#subhero",
    start: "top 75%",
    end: "bottom 20%",
    toggleActions: "play none none reverse"
  }
});

gsap.fromTo(".subhero-cta", {
  y: 30,
  opacity: 0
}, {
  y: 0,
  opacity: 1,
  duration: 0.8,
  delay: 0.6,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#subhero",
    start: "top 70%",
    end: "bottom 20%",
    toggleActions: "play none none reverse"
  }
});

// Animazioni per la sezione CHANNELS
gsap.fromTo(".channels-title", {
  y: 30,
  opacity: 0
}, {
  y: 0,
  opacity: 1,
  duration: 0.8,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#projects .channels-section",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});

// Animazioni per i channel logos - controllate da SYNAPSE
function initChannelsAnimations() {
  if (channelsAnimationsActive) {
    gsap.fromTo(".channel-logo", {
      y: 20,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".channels-slider",
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  } else {
    // Quando SYNAPSE è OFF, mostra i logos direttamente
    gsap.set(".channel-logo", { y: 0, opacity: 1 });
  }
}

// Inizializza le animazioni
initChannelsAnimations();

// Animazioni per la sezione TEAM
gsap.fromTo(".team-intro", {
  y: 50,
  opacity: 0
}, {
  y: 0,
  opacity: 1,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#team",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});

gsap.fromTo(".team-origins p", {
  y: 30,
  opacity: 0
}, {
  y: 0,
  opacity: 1,
  duration: 0.8,
  stagger: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".team-origins",
    start: "top 85%",
    toggleActions: "play none none reverse"
  }
});

gsap.fromTo(".team-distinction", {
  y: 40,
  opacity: 0
}, {
  y: 0,
  opacity: 1,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".team-distinction",
    start: "top 85%",
    toggleActions: "play none none reverse"
  }
});

gsap.fromTo(".team-question", {
  x: -50,
  opacity: 0
}, {
  x: 0,
  opacity: 1,
  duration: 0.8,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".team-question",
    start: "top 85%",
    toggleActions: "play none none reverse"
  }
});

gsap.fromTo(".manifesto-item", {
  y: 50,
  opacity: 0
}, {
  y: 0,
  opacity: 1,
  duration: 0.8,
  stagger: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".manifesto-grid",
    start: "top 85%",
    toggleActions: "play none none reverse"
  }
});
</script>












// === CONTROLLO COLORI ===
<script>
  let scrollScale = 1;
  let bgTransitionProgress = 1;
  let numPoints = 15;
  let lineDistance = 500;
  let points = [];

  const canvas = document.getElementById("iceberg");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function generatePoints() {
    points = [];
    const radius = Math.min(canvas.width, canvas.height) / 4;
    for (let i = 0; i < numPoints; i++) {
      const angle = (Math.PI * 2 * i) / numPoints;
      const x = Math.cos(angle) * radius * (0.5 + Math.random());
      const y = Math.sin(angle) * radius * (0.5 + Math.random());
      points.push({ x, y });
    }
  }

  function initPage() {
    resizeCanvas();
    generatePoints();

    document.getElementById("nodesRange").addEventListener("input", (e) => {
      numPoints = parseInt(e.target.value);
      document.getElementById("nodesValue").textContent = numPoints;
      generatePoints();
    });

    document.getElementById("distanceRange").addEventListener("input", (e) => {
      lineDistance = parseInt(e.target.value);
      document.getElementById("distanceValue").textContent = lineDistance;
    });

    document.getElementById("startBtn").addEventListener("click", () => {
      const preloader = document.getElementById("preloader");
      preloader.classList.add("fade-out");
      setTimeout(() => preloader.remove(), 600);
      document.getElementById("penguin-canvas").style.display = "block";
      requestAnimationFrame(draw);
    });

    // === CONTROLLO CICLO COLORI ===
    const colorToggleBtn = document.getElementById("colorToggle");
    if (colorToggleBtn) {
      // Testi per gli stati del pulsante
      const texts = {
        active: "SYNAPSE",
        hover: "FOCUS", 
        frozen: "LET IT FLOW"
      };
      
      // Gestione tooltip su mobile con touch
      let tooltipTimeout;
      
      // Touch devices: mostra tooltip temporaneamente
      colorToggleBtn.addEventListener("touchstart", (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const tooltip = colorToggleBtn.querySelector('.tooltip');
          if (tooltip) {
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
            
            clearTimeout(tooltipTimeout);
            tooltipTimeout = setTimeout(() => {
              tooltip.style.opacity = '0';
              tooltip.style.visibility = 'hidden';
            }, 3000);
          }
        }
      });
      
      // Gestione hover desktop - cambia solo il testo, non il tooltip
      colorToggleBtn.addEventListener("mouseenter", () => {
        if (colorCycleActive && window.innerWidth > 768) {
          const currentTooltip = colorToggleBtn.querySelector('.tooltip');
          colorToggleBtn.innerHTML = `${texts.hover}${currentTooltip ? currentTooltip.outerHTML : ''}`;
        }
      });
      
      colorToggleBtn.addEventListener("mouseleave", () => {
        if (colorCycleActive && window.innerWidth > 768) {
          const currentTooltip = colorToggleBtn.querySelector('.tooltip');
          colorToggleBtn.innerHTML = `${texts.active}${currentTooltip ? currentTooltip.outerHTML : ''}`;
        } else if (!colorCycleActive) {
          const currentTooltip = colorToggleBtn.querySelector('.tooltip');
          colorToggleBtn.innerHTML = `${texts.frozen}${currentTooltip ? currentTooltip.outerHTML : ''}`;
        }
      });
      
      // Gestione click
      colorToggleBtn.addEventListener("click", () => {
        colorCycleActive = !colorCycleActive;
        
        if (colorCycleActive) {
          colorToggleBtn.innerHTML = `${texts.active}<div class="tooltip">Controls the iceberg's dynamic color palette.<br><strong>SYNAPSE</strong> → <strong>FOCUS</strong> → <strong>LET IT FLOW</strong></div>`;
          colorToggleBtn.classList.remove("frozen");
          startColorCycle();
          startProjectAnimations(); // Attiva anche le nuove animazioni
        } else {
          colorToggleBtn.innerHTML = `${texts.frozen}<div class="tooltip">Color cycle paused.<br>Click to resume the flow.</div>`;
          colorToggleBtn.classList.add("frozen");
          stopColorCycle();
          stopProjectAnimations(); // Disattiva anche le nuove animazioni
        }
      });
    }

    // === CONTROLLO MODALITÀ CLARITY ===
    const clarityToggleBtn = document.getElementById("clarityToggle");
    let clarityModeActive = false;
    
    if (clarityToggleBtn) {
      // Gestione tooltip su mobile con touch
      let clarityTooltipTimeout;
      
      // Touch devices: mostra tooltip temporaneamente
      clarityToggleBtn.addEventListener("touchstart", (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const tooltip = clarityToggleBtn.querySelector('.tooltip');
          if (tooltip) {
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
            
            clearTimeout(clarityTooltipTimeout);
            clarityTooltipTimeout = setTimeout(() => {
              tooltip.style.opacity = '0';
              tooltip.style.visibility = 'hidden';
            }, 3000);
          }
        }
      });
      
      // Gestione click per attivare/disattivare modalità high contrast
      clarityToggleBtn.addEventListener("click", () => {
        clarityModeActive = !clarityModeActive;
        
        if (clarityModeActive) {
          // Attiva modalità high contrast
          document.body.classList.add('high-contrast');
          clarityToggleBtn.classList.add('active');
          clarityToggleBtn.innerHTML = `CLARITY<div class="tooltip">High contrast mode active.<br>Click to return to normal view.</div>`;
          
          // Salva preferenza
          localStorage.setItem('clarityMode', 'true');
        } else {
          // Disattiva modalità high contrast
          document.body.classList.remove('high-contrast');
          clarityToggleBtn.classList.remove('active');
          clarityToggleBtn.innerHTML = `CLARITY<div class="tooltip">High contrast mode for better readability.<br>Black background with white text.</div>`;
          
          // Rimuovi preferenza
          localStorage.removeItem('clarityMode');
        }
      });
      
      // Carica preferenza salvata
      if (localStorage.getItem('clarityMode') === 'true') {
        clarityToggleBtn.click();
      }
    }

    // === CONTROLLO PANNELLO SYSTEM ===
    const systemToggleBtn = document.getElementById("systemToggle");
    const systemPanel = document.getElementById("systemPanel");
    const closePanelBtn = document.getElementById("closePanelBtn");
    let systemPanelOpen = false;

    if (systemToggleBtn && systemPanel) {
      // Gestione apertura/chiusura pannello
      systemToggleBtn.addEventListener("click", () => {
        systemPanelOpen = !systemPanelOpen;
        
        if (systemPanelOpen) {
          systemPanel.classList.add('open');
          systemToggleBtn.classList.add('active');
        } else {
          systemPanel.classList.remove('open');
          systemToggleBtn.classList.remove('active');
        }
      });

      // Bottone chiusura pannello
      if (closePanelBtn) {
        closePanelBtn.addEventListener("click", () => {
          systemPanel.classList.remove('open');
          systemToggleBtn.classList.remove('active');
          systemPanelOpen = false;
        });
      }

      // Chiudi pannello premendo ESC
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && systemPanelOpen) {
          systemPanel.classList.remove('open');
          systemToggleBtn.classList.remove('active');
          systemPanelOpen = false;
        }
      });

      // === CONTROLLI PANNELLO AVANZATO ===
      
      // Slider FLOW (velocità animazioni)
      const flowSlider = document.getElementById("flowSlider");
      const flowValue = document.getElementById("flowValue");
      if (flowSlider && flowValue) {
        flowSlider.addEventListener("input", (e) => {
          const value = parseInt(e.target.value);
          const speeds = ["Slow", "Normal", "Fast"];
          flowValue.textContent = speeds[value - 1];
          
          // Applica velocità alle animazioni
          const speedMultipliers = [0.5, 1, 2];
          document.documentElement.style.setProperty('--animation-speed', speedMultipliers[value - 1]);
        });
      }

      // Slider DEPTH (complessità iceberg)
      const depthSlider = document.getElementById("depthSlider");
      const depthValue = document.getElementById("depthValue");
      if (depthSlider && depthValue) {
        depthSlider.addEventListener("input", (e) => {
          const value = parseInt(e.target.value);
          depthValue.textContent = value;
          numPoints = value;
          generatePoints();
        });
      }

      // Slider NEURAL (background particles)
      const neuralSlider = document.getElementById("neuralSlider");
      const neuralValue = document.getElementById("neuralValue");
      if (neuralSlider && neuralValue) {
        neuralSlider.addEventListener("input", (e) => {
          const value = parseInt(e.target.value);
          neuralValue.textContent = value ? "On" : "Off";
          
          const particlesCanvas = document.getElementById("particles-background");
          if (particlesCanvas) {
            particlesCanvas.style.display = value ? "block" : "none";
          }
        });
      }

      // Pulsanti del pannello
      const buttons = {
        debug: document.getElementById("debugBtn"),
        grid: document.getElementById("gridBtn"),
        trace: document.getElementById("traceBtn"),
        edit: document.getElementById("editBtn"),
        preview: document.getElementById("previewBtn"),
        publish: document.getElementById("publishBtn"),
        profile: document.getElementById("profileBtn"),
        reset: document.getElementById("resetBtn")
      };

      // Gestione pulsanti toggle
      Object.entries(buttons).forEach(([key, btn]) => {
        if (btn) {
          btn.addEventListener("click", () => {
            btn.classList.toggle('active');
            
            // Logica specifica per ogni pulsante
            switch(key) {
              case 'debug':
                // Mostra/nascondi info debug
                console.log('Debug mode:', btn.classList.contains('active'));
                break;
              case 'grid':
                // Mostra/nascondi griglia
                document.body.classList.toggle('dev-grid', btn.classList.contains('active'));
                break;
              case 'trace':
                // Abilita/disabilita trace mouse
                console.log('Trace mode:', btn.classList.contains('active'));
                break;
              case 'reset':
                // Reset tutte le impostazioni
                if (confirm('Reset all settings to default?')) {
                  location.reload();
                }
                break;
              default:
                console.log(`${key} button clicked`);
            }
          });
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPage);
  } else {
    initPage();
  }
</script>

<script>
function updateSectionsColor(currentBg, currentTextColor, interpolatedColor) {
  // Non aggiornare colori se la modalità high contrast è attiva
  if (document.body.classList.contains('high-contrast')) {
    return;
  }
  
  // Aggiorna sfondi e colori delle sezioni
  document.querySelectorAll('.section, .parallax-section').forEach(section => {
    section.style.background = currentBg;
    section.style.color = currentTextColor;
  });
  
  const subhero = document.querySelector('.subhero');
  if (subhero) {
    subhero.style.background = currentBg;
    subhero.style.color = currentTextColor;
  }

  // Aggiorna colori dinamici per H1, H2, H3 globali
  document.querySelectorAll('h1, h2, h3').forEach(title => {
    title.style.color = currentTextColor;
  });
  
  // Aggiorna colori dinamici per tutte le tagline
  document.querySelectorAll('.tagline').forEach(tagline => {
    tagline.style.color = currentTextColor;
  });
  
  // Aggiorna colori dinamici del pulsante SYNAPSE
  const colorToggleBtn = document.getElementById("colorToggle");
  if (colorToggleBtn && !colorToggleBtn.classList.contains('frozen')) {
    // Usa il colore di sfondo dell'iceberg per il bordo e testo
    const icebergBgColor = interpolatedColor || currentBg;
    colorToggleBtn.style.borderColor = icebergBgColor;
    colorToggleBtn.style.color = icebergBgColor;
    
    // Salva i colori per gli eventi hover
    colorToggleBtn.dataset.icebergBg = icebergBgColor;
    colorToggleBtn.dataset.icebergText = currentTextColor;
  }

  // Aggiorna il bordo dinamico 
  const border = document.querySelector('.dynamic-border');
  if (border) {
    border.style.borderColor = interpolatedColor || currentBg;
  }

  // Aggiorna i colori del breadcrumb
  const breadcrumbDots = document.querySelectorAll('.breadcrumb-dot');
  const breadcrumbProgress = document.getElementById('breadcrumbProgress');
  if (breadcrumbDots.length && breadcrumbProgress) {
    breadcrumbDots.forEach(dot => {
      if (!dot.parentElement.classList.contains('active')) {
        dot.style.background = interpolatedColor || currentBg;
      }
    });
    breadcrumbProgress.style.background = interpolatedColor || currentBg;
  }
}
</script>

<!-- Breadcrumb Navigation Script -->
<script>
document.addEventListener('DOMContentLoaded', () => {
  const breadcrumbItems = document.querySelectorAll('.breadcrumb-item');
  const breadcrumbProgress = document.getElementById('breadcrumbProgress');
  
  const sections = [
    { id: 'hero', element: document.getElementById('hero') || document.querySelector('.hero') },
    { id: 'about', element: document.getElementById('about') },
    { id: 'projects', element: document.getElementById('projects') },
    { id: 'team', element: document.getElementById('team') },
    { id: 'ethics', element: document.getElementById('ethics') }
  ].filter(section => section.element);

  console.log('🔍 Breadcrumb: Sezioni trovate:', sections.map(s => s.id));
  console.log('🔍 Breadcrumb: Numero sezioni:', sections.length);

  // Funzione per aggiornare breadcrumb attivo
  function updateActiveBreadcrumb(activeIndex) {
    breadcrumbItems.forEach((item, index) => {
      item.classList.toggle('active', index === activeIndex);
    });
    
    // Aggiorna progress bar
    const progressPercent = breadcrumbItems.length > 1 ? (activeIndex / (breadcrumbItems.length - 1)) * 100 : 0;
    breadcrumbProgress.style.width = progressPercent + '%';
  }

  // Scroll listener per aggiornare la barra di progresso
  function updateProgressOnScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(scrollTop / documentHeight, 1); // Da 0 a 1
    
    // Aggiorna la barra di progresso in modo continuo (da 0% a 100%)
    const progressPercent = scrollProgress * 100;
    breadcrumbProgress.style.width = progressPercent + '%';
    
    // Determina quale sezione è realmente visibile
    let activeIndex = 0;
    const viewportTop = scrollTop;
    const viewportCenter = viewportTop + (window.innerHeight / 2);
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i].element;
      const sectionTop = section.offsetTop;
      
      if (viewportCenter >= sectionTop) {
        activeIndex = i;
        break;
      }
    }
    
    // Aggiorna i breadcrumb solo se l'indice è cambiato
    const currentActive = document.querySelector('.breadcrumb-item.active');
    const currentIndex = currentActive ? Array.from(breadcrumbItems).indexOf(currentActive) : -1;
    
    if (activeIndex !== currentIndex) {
      breadcrumbItems.forEach((item, index) => {
        item.classList.toggle('active', index === activeIndex);
      });
    }
  }

  // Aggiungi listener per lo scroll
  window.addEventListener('scroll', updateProgressOnScroll);

  // Click handler per navigazione diretta
  breadcrumbItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      console.log('🖱️ Breadcrumb click su:', item.querySelector('.breadcrumb-label').textContent, 'Index:', index);
      
      // Attiva sempre l'item cliccato
      updateActiveBreadcrumb(index);
      
      // Trova la sezione corrispondente tramite data-section
      const sectionName = item.getAttribute('data-section');
      const sectionElement = document.getElementById(sectionName) || document.querySelector(`.${sectionName}`);
      
      if (sectionElement) {
        sectionElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        console.log('📍 Scroll verso:', sectionName);
      } else {
        console.log('⚠️ Sezione non trovata:', sectionName);
      }
    });
  });

  // Inizializza con la prima sezione attiva
  updateActiveBreadcrumb(0);
});
</script>

<!-- Console Toggle Script -->
<script>
document.addEventListener('DOMContentLoaded', () => {
  const consoleToggle = document.getElementById('consoleToggle');
  const consolePanel = document.getElementById('consolePanel');
  
  if (!consoleToggle || !consolePanel) return;

  // Toggle console panel
  consoleToggle.addEventListener('click', () => {
    const isOpen = consolePanel.classList.toggle('open');
    consoleToggle.classList.toggle('active', isOpen);
  });

  // Chiudi panel cliccando fuori
  document.addEventListener('click', (e) => {
    if (!consoleToggle.contains(e.target) && !consolePanel.contains(e.target)) {
      consolePanel.classList.remove('open');
      consoleToggle.classList.remove('active');
    }
  });

  // Replica la logica dei pulsanti console originali
  const breadcrumbColorToggle = document.getElementById('breadcrumbColorToggle');
  const breadcrumbClarityToggle = document.getElementById('breadcrumbClarityToggle');
  const breadcrumbSystemToggle = document.getElementById('breadcrumbSystemToggle');

  // SYNAPSE button logic
  if (breadcrumbColorToggle) {
    breadcrumbColorToggle.addEventListener('click', () => {
      // Replica la logica del pulsante colorToggle originale
      const originalBtn = document.getElementById('colorToggle');
      if (originalBtn) {
        originalBtn.click();
      }
    });
  }

  // CLARITY button logic  
  if (breadcrumbClarityToggle) {
    breadcrumbClarityToggle.addEventListener('click', () => {
      // Replica la logica del pulsante clarityToggle originale
      const originalBtn = document.getElementById('clarityToggle');
      if (originalBtn) {
        originalBtn.click();
      }
    });
  }

  // SYSTEM button logic
  if (breadcrumbSystemToggle) {
    breadcrumbSystemToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('🔧 Breadcrumb SYSTEM clicked');
      
      // Chiudi prima il console panel
      consolePanel.classList.remove('open');
      consoleToggle.classList.remove('active');
      
      // Apri direttamente il system panel
      const systemPanel = document.getElementById('systemPanel');
      if (systemPanel) {
        systemPanel.classList.toggle('open');
        breadcrumbSystemToggle.classList.toggle('active');
        console.log('🔧 System panel toggled');
      }
    });
  }
});
</script>

<!-- System Panel Script -->
<script>
document.addEventListener('DOMContentLoaded', () => {
  const systemPanel = document.getElementById('systemPanel');
  const systemCloseBtn = document.getElementById('systemCloseBtn');
  const systemToggle = document.getElementById('systemToggle');
  
  if (!systemPanel) return;

  // Gestione chiusura panel
  if (systemCloseBtn) {
    systemCloseBtn.addEventListener('click', () => {
      systemPanel.classList.remove('open');
      // Rimuovi anche active dai toggle buttons
      const activeButtons = document.querySelectorAll('.console-btn.active, .color-toggle-btn.active');
      activeButtons.forEach(btn => {
        if (btn.id.includes('System')) {
          btn.classList.remove('active');
        }
      });
    });
  }

  // Chiudi panel con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && systemPanel.classList.contains('open')) {
      systemPanel.classList.remove('open');
      const activeButtons = document.querySelectorAll('.console-btn.active, .color-toggle-btn.active');
      activeButtons.forEach(btn => {
        if (btn.id.includes('System')) {
          btn.classList.remove('active');
        }
      });
    }
  });

  // Gestione del pulsante system nel main menu
  if (systemToggle) {
    systemToggle.addEventListener('click', () => {
      systemPanel.classList.toggle('open');
      systemToggle.classList.toggle('active');
    });
  }

  // === CONTROLLI SYSTEM PANEL ===
  
  // Performance Controls
  const flowSlider = document.getElementById('flowSlider');
  const flowValue = document.getElementById('flowValue');
  if (flowSlider && flowValue) {
    flowSlider.addEventListener('input', (e) => {
      const value = parseInt(e.target.value);
      const speeds = ['Slow', 'Normal', 'Fast'];
      flowValue.textContent = speeds[value - 1];
      
      // Applica velocità alle animazioni
      const speedMultipliers = [0.5, 1, 2];
      document.documentElement.style.setProperty('--animation-speed', speedMultipliers[value - 1]);
      
      // Salva in localStorage
      localStorage.setItem('animationSpeed', value);
    });
    
    // Carica valore salvato
    const savedSpeed = localStorage.getItem('animationSpeed');
    if (savedSpeed) {
      flowSlider.value = savedSpeed;
      flowSlider.dispatchEvent(new Event('input'));
    }
  }

  const particleToggle = document.getElementById('particleToggle');
  if (particleToggle) {
    particleToggle.addEventListener('change', (e) => {
      const particlesCanvas = document.getElementById('particles-background');
      if (particlesCanvas) {
        particlesCanvas.style.display = e.target.checked ? 'block' : 'none';
      }
      localStorage.setItem('particlesEnabled', e.target.checked);
    });
    
    // Carica valore salvato
    const savedParticles = localStorage.getItem('particlesEnabled');
    if (savedParticles !== null) {
      particleToggle.checked = savedParticles === 'true';
      particleToggle.dispatchEvent(new Event('change'));
    }
  }

  const blurToggle = document.getElementById('blurToggle');
  if (blurToggle) {
    blurToggle.addEventListener('change', (e) => {
      document.body.style.setProperty('--blur-effects', e.target.checked ? 'blur(20px)' : 'none');
      localStorage.setItem('blurEffects', e.target.checked);
    });
    
    // Carica valore salvato
    const savedBlur = localStorage.getItem('blurEffects');
    if (savedBlur !== null) {
      blurToggle.checked = savedBlur === 'true';
      blurToggle.dispatchEvent(new Event('change'));
    }
  }

  // Visual Controls
  const opacitySlider = document.getElementById('opacitySlider');
  const opacityValue = document.getElementById('opacityValue');
  if (opacitySlider && opacityValue) {
    opacitySlider.addEventListener('input', (e) => {
      const value = e.target.value;
      opacityValue.textContent = value + '%';
      document.body.style.setProperty('--global-opacity', value / 100);
      localStorage.setItem('globalOpacity', value);
    });
    
    // Carica valore salvato
    const savedOpacity = localStorage.getItem('globalOpacity');
    if (savedOpacity) {
      opacitySlider.value = savedOpacity;
      opacitySlider.dispatchEvent(new Event('input'));
    }
  }

  const contrastSlider = document.getElementById('contrastSlider');
  const contrastValue = document.getElementById('contrastValue');
  if (contrastSlider && contrastValue) {
    contrastSlider.addEventListener('input', (e) => {
      const value = e.target.value;
      contrastValue.textContent = value + '%';
      document.body.style.filter = `contrast(${value}%)`;
      localStorage.setItem('globalContrast', value);
    });
    
    // Carica valore salvato
    const savedContrast = localStorage.getItem('globalContrast');
    if (savedContrast) {
      contrastSlider.value = savedContrast;
      contrastSlider.dispatchEvent(new Event('input'));
    }
  }

  const saturationSlider = document.getElementById('saturationSlider');
  const saturationValue = document.getElementById('saturationValue');
  if (saturationSlider && saturationValue) {
    saturationSlider.addEventListener('input', (e) => {
      const value = e.target.value;
      saturationValue.textContent = value + '%';
      document.body.style.filter = `saturate(${value}%)`;
      localStorage.setItem('globalSaturation', value);
    });
    
    // Carica valore salvato
    const savedSaturation = localStorage.getItem('globalSaturation');
    if (savedSaturation) {
      saturationSlider.value = savedSaturation;
      saturationSlider.dispatchEvent(new Event('input'));
    }
  }

  // Advanced Controls
  const debugToggle = document.getElementById('debugToggle');
  if (debugToggle) {
    debugToggle.addEventListener('change', (e) => {
      document.body.classList.toggle('debug-mode', e.target.checked);
      localStorage.setItem('debugMode', e.target.checked);
      
      if (e.target.checked) {
        console.log('🔧 Debug mode enabled');
      } else {
        console.log('🔧 Debug mode disabled');
      }
    });
    
    // Carica valore salvato
    const savedDebug = localStorage.getItem('debugMode');
    if (savedDebug !== null) {
      debugToggle.checked = savedDebug === 'true';
      debugToggle.dispatchEvent(new Event('change'));
    }
  }

  const autoSaveToggle = document.getElementById('autoSaveToggle');
  if (autoSaveToggle) {
    autoSaveToggle.addEventListener('change', (e) => {
      localStorage.setItem('autoSaveEnabled', e.target.checked);
      
      if (e.target.checked) {
        console.log('💾 Auto-save enabled');
      } else {
        console.log('💾 Auto-save disabled');
      }
    });
    
    // Carica valore salvato
    const savedAutoSave = localStorage.getItem('autoSaveEnabled');
    if (savedAutoSave !== null) {
      autoSaveToggle.checked = savedAutoSave === 'true';
    } else {
      autoSaveToggle.checked = true; // Default enabled
    }
  }

  // === PENGUIN CONTROLS ===
  
  const penguinVisibleToggle = document.getElementById('penguinVisibleToggle');
  if (penguinVisibleToggle) {
    penguinVisibleToggle.addEventListener('change', (e) => {
      const penguinCanvas = document.getElementById('penguin-canvas');
      if (penguinCanvas) {
        penguinCanvas.style.display = e.target.checked ? 'block' : 'none';
      }
      localStorage.setItem('penguinVisible', e.target.checked);
    });
    
    // Carica valore salvato
    const savedVisible = localStorage.getItem('penguinVisible');
    if (savedVisible !== null) {
      penguinVisibleToggle.checked = savedVisible === 'true';
      penguinVisibleToggle.dispatchEvent(new Event('change'));
    }
  }

  const penguinZoomToggle = document.getElementById('penguinZoomToggle');
  if (penguinZoomToggle) {
    penguinZoomToggle.addEventListener('change', (e) => {
      if (window.controlsPenguin) {
        window.controlsPenguin.enableZoom = e.target.checked;
      }
      localStorage.setItem('penguinZoomEnabled', e.target.checked);
    });
    
    // Carica valore salvato
    const savedZoom = localStorage.getItem('penguinZoomEnabled');
    if (savedZoom !== null) {
      penguinZoomToggle.checked = savedZoom === 'true';
      penguinZoomToggle.dispatchEvent(new Event('change'));
    }
  }

  const penguinPanToggle = document.getElementById('penguinPanToggle');
  if (penguinPanToggle) {
    penguinPanToggle.addEventListener('change', (e) => {
      if (window.controlsPenguin) {
        window.controlsPenguin.enablePan = e.target.checked;
      }
      localStorage.setItem('penguinPanEnabled', e.target.checked);
    });
    
    // Carica valore salvato
    const savedPan = localStorage.getItem('penguinPanEnabled');
    if (savedPan !== null) {
      penguinPanToggle.checked = savedPan === 'true';
      penguinPanToggle.dispatchEvent(new Event('change'));
    }
  }

  const penguinSizeSlider = document.getElementById('penguinSizeSlider');
  const penguinSizeValue = document.getElementById('penguinSizeValue');
  if (penguinSizeSlider && penguinSizeValue) {
    penguinSizeSlider.addEventListener('input', (e) => {
      const value = e.target.value;
      penguinSizeValue.textContent = value + '%';
      
      const penguinCanvas = document.getElementById('penguin-canvas');
      if (penguinCanvas) {
        penguinCanvas.style.transform = `scale(${value / 100})`;
        penguinCanvas.style.transformOrigin = 'center center';
      }
      localStorage.setItem('penguinSize', value);
    });
    
    // Carica valore salvato
    const savedSize = localStorage.getItem('penguinSize');
    if (savedSize) {
      penguinSizeSlider.value = savedSize;
      penguinSizeSlider.dispatchEvent(new Event('input'));
    }
  }

  const resetSettings = document.getElementById('resetSettings');
  if (resetSettings) {
    resetSettings.addEventListener('click', () => {
      if (confirm('Reset all settings to default? This will reload the page.')) {
        // Rimuovi tutte le impostazioni salvate
        const systemKeys = [
          'animationSpeed', 'particlesEnabled', 'blurEffects',
          'globalOpacity', 'globalContrast', 'globalSaturation',
          'debugMode', 'autoSaveEnabled',
          'penguinVisible', 'penguinZoomEnabled',
          'penguinPanEnabled', 'penguinSize'
        ];
        
        systemKeys.forEach(key => localStorage.removeItem(key));
        
        // Ricarica la pagina
        location.reload();
      }
    });
  }
});
</script>

<!-- Hero CTA Visibility Script -->
<script>
document.addEventListener('DOMContentLoaded', () => {
  const heroCta = document.getElementById('heroCta');
  if (!heroCta) return;

  let hasScrolled = false;

  function handleScroll() {
    if (!hasScrolled && window.scrollY > 50) {
      hasScrolled = true;
      heroCta.classList.add('visible');
      // Rimuovi il listener dopo il primo scroll
      window.removeEventListener('scroll', handleScroll);
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
});
</script>

<!-- Menu Visibility Control Script -->
<script>
document.addEventListener('DOMContentLoaded', () => {
  // Assicurati che GSAP sia caricato
  if (typeof gsap === 'undefined') return;

  const mainMenu = document.querySelector('.main-menu');
  if (!mainMenu) return;

  // Imposta il menu nascosto inizialmente con GSAP
  gsap.set(mainMenu, {
    y: -100,
    opacity: 0,
    visibility: 'hidden'
  });

  // Anima il menu quando si esce dal subhero
  ScrollTrigger.create({
    trigger: "#subhero",
    start: "bottom 80%", // Quando il fondo del subhero raggiunge l'80% della viewport
    end: "bottom top",
    onEnter: () => {
      gsap.to(mainMenu, {
        y: 0,
        opacity: 1,
        visibility: 'visible',
        duration: 0.8,
        ease: "power2.out"
      });
    },
    onLeaveBack: () => {
      gsap.to(mainMenu, {
        y: -100,
        opacity: 0,
        visibility: 'hidden',
        duration: 0.6,
        ease: "power2.in"
      });
    }
  });
});
</script>


<script>
// === Canvas Setup
window.addEventListener("resize", () => {
  resizeCanvas();
  generatePoints();
});

// === Mouse Tracking
let angleOffset = 0, mouseX = 0, mouseY = 0;
document.addEventListener("mousemove", e => {
  const rect = canvas.getBoundingClientRect();
  mouseX = ((e.clientX - rect.left) / canvas.width - 0.5) * 2;
  mouseY = ((e.clientY - rect.top) / canvas.height - 0.5) * 2;
});

// === Dynamic Color Palette
const dynamicPalette = [
  "#00f5d4", "#3a0ca3", "#4361ee", "#4cc9f0", "#5ee4c3",
  "#f72585", "#7209b7", "#2b2d42", "#edf2f4", "#b5179e"
];
let bgColor = dynamicPalette[0], contrastColor = dynamicPalette[1];
let bgColorOld = bgColor, bgColorNew = contrastColor;

function lerpColor(a, b, t) {
  const ah = [1, 3, 5].map(i => parseInt(a.slice(i, i + 2), 16));
  const bh = [1, 3, 5].map(i => parseInt(b.slice(i, i + 2), 16));
  const rh = ah.map((v, i) => Math.round(v + (bh[i] - v) * t).toString(16).padStart(2, '0'));
  return `#${rh.join('')}`;
}

function changeColors() {
  if (!colorCycleActive) return;
  
  const bgIndex = Math.floor(Math.random() * dynamicPalette.length);
  let contrastIndex;
  do { contrastIndex = Math.floor(Math.random() * dynamicPalette.length); }
  while (contrastIndex === bgIndex);

  bgColorOld = bgColor;
  bgColorNew = dynamicPalette[bgIndex];
  bgTransitionProgress = 0;
  bgColor = bgColorNew;
  contrastColor = dynamicPalette[contrastIndex];

  const heroText = document.querySelector(".hero-text");
  if (heroText) heroText.style.color = contrastColor;
}

// Avvia il ciclo colori
function startColorCycle() {
  colorChangeInterval = setInterval(changeColors, 2000);
}

// Ferma il ciclo colori
function stopColorCycle() {
  clearInterval(colorChangeInterval);
}

// === FUNZIONI CONTROLLO SYNAPSE PER NUOVI CONTENUTI ===

// Funzione per aggiornare tutti gli indicatori visivi
function updateSynapseIndicators() {
  const arrows = document.querySelectorAll('.project-nav-arrow');
  const indicators = document.querySelectorAll('.indicator-dot');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (projectAnimationsActive) {
    // SYNAPSE ON - Abilita tutte le animazioni
    arrows.forEach(arrow => {
      arrow.style.pointerEvents = 'auto';
      arrow.style.opacity = '1';
    });
    
    indicators.forEach(indicator => {
      indicator.style.pointerEvents = 'auto';
      indicator.style.opacity = '1';
    });
    
    projectCards.forEach(card => {
      card.style.pointerEvents = 'auto';
    });
  } else {
    // SYNAPSE OFF - Riduce l'interattività (opzionale)
    arrows.forEach(arrow => {
      arrow.style.opacity = '0.7';
    });
    
    indicators.forEach(indicator => {
      indicator.style.opacity = '0.7';
    });
  }
}

// Attiva tutte le animazioni SYNAPSE
function startProjectAnimations() {
  projectAnimationsActive = true;
  channelsAnimationsActive = true;
  
  // Rimuove la classe che disabilita le animazioni
  document.body.classList.remove('synapse-off');
  
  // Aggiorna indicatori visivi
  updateSynapseIndicators();
  
  // Reinizializza le animazioni
  initProjectCardsAnimations();
  initChannelsAnimations();
}

// Disattiva tutte le animazioni SYNAPSE  
function stopProjectAnimations() {
  projectAnimationsActive = false;
  channelsAnimationsActive = false;
  
  // Aggiunge la classe che disabilita le animazioni
  document.body.classList.add('synapse-off');
  
  // Aggiorna indicatori visivi
  updateSynapseIndicators();
  
  // Killa tutte le animazioni ScrollTrigger dei progetti
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.trigger && (
        trigger.trigger.classList.contains('projects-grid') ||
        trigger.trigger.classList.contains('channels-slider')
    )) {
      trigger.kill();
    }
  });
}

// Inizializza il ciclo
startColorCycle();

// Inizializza le nuove animazioni SYNAPSE
if (colorCycleActive) {
  startProjectAnimations();
} else {
  stopProjectAnimations();
}

// === Iceberg Drawing
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Modalità high contrast: sfondo nero, iceberg bianco
  if (document.body.classList.contains('high-contrast')) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const offsetX = Math.sin(angleOffset) * 20 + mouseX * 30;
    const offsetY = Math.cos(angleOffset) * 20 + mouseY * 30;
    const rotate = Math.sin(angleOffset) * 0.01;
    angleOffset += 0.005;
    
    // Iceberg bianco
    ctx.save();
    ctx.translate(canvas.width / 2 + offsetX, canvas.height / 2 + offsetY);
    ctx.rotate(rotate);
    ctx.scale(scrollScale, scrollScale);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const p1 = points[i], p2 = points[j];
        if (Math.hypot(p1.x - p2.x, p1.y - p2.y) < lineDistance) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    ctx.restore();
    
    // Riflesso iceberg
    ctx.save();
    ctx.translate(canvas.width / 2 + offsetX, canvas.height / 2 + offsetY);
    ctx.rotate(-rotate);
    ctx.scale(scrollScale, -scrollScale);
    ctx.globalAlpha = 0.3;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const p1 = points[i], p2 = points[j];
        if (Math.hypot(p1.x - p2.x, p1.y - p2.y) < lineDistance) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    ctx.restore();
    ctx.globalAlpha = 1;
  } else {
    // Modalità normale con colori dinamici
    bgTransitionProgress = Math.min(bgTransitionProgress + 0.01, 1);
    const interpolatedColor = lerpColor(bgColorOld, bgColorNew, bgTransitionProgress);
    ctx.fillStyle = interpolatedColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const offsetX = Math.sin(angleOffset) * 20 + mouseX * 30;
    const offsetY = Math.cos(angleOffset) * 20 + mouseY * 30;
    const rotate = Math.sin(angleOffset) * 0.01;
    angleOffset += 0.005;
    
    // Passa sia il background che il colore interpolato per il pulsante
    updateSectionsColor(`linear-gradient(to bottom, ${interpolatedColor}, ${interpolatedColor})`, contrastColor, interpolatedColor);

    // Iceberg top
    ctx.save();
    ctx.translate(canvas.width / 2 + offsetX, canvas.height / 2 + offsetY);
    ctx.rotate(rotate);
    ctx.scale(scrollScale, scrollScale);
    ctx.strokeStyle = contrastColor;
    ctx.lineWidth = 1;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const p1 = points[i], p2 = points[j];
        if (Math.hypot(p1.x - p2.x, p1.y - p2.y) < lineDistance) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    ctx.restore();

    // Iceberg reflection
    ctx.save();
    ctx.translate(canvas.width / 2 + offsetX, canvas.height / 2 + offsetY);
    ctx.rotate(-rotate);
    ctx.scale(scrollScale, -scrollScale);
    ctx.globalAlpha = 0.15;
    ctx.strokeStyle = contrastColor;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const p1 = points[i], p2 = points[j];
        if (Math.hypot(p1.x - p2.x, p1.y - p2.y) < lineDistance) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    ctx.restore();
    ctx.globalAlpha = 1;
  }
  
  requestAnimationFrame(draw);
}
</script>

<script>

// === Inizializzazione sistemi nativi ===
document.addEventListener('DOMContentLoaded', () => {
  initNativeHeroEffects();     // 🎯 Hero separato con scroll listener
  initNativeMenuEffects();     // 📱 Menu con Intersection Observer  
  initNativeParallaxEffects(); // 🌊 Sezioni parallax con Intersection Observer
});

// 🎯 HERO SYSTEM - Completamente separato dalla logica parallax
function initNativeHeroEffects() {
  console.log('🚀 Inizializzazione Hero System (separato)');
  
  const heroText = document.querySelector(".hero-text");
  const heroTitles = document.querySelector(".hero-titles-wrapper");
  const hero = document.querySelector(".hero");
  const isMobile = window.innerWidth <= 768;
  
  if (!hero) {
    console.error('❌ Elemento .hero non trovato!');
    return;
  }
  
  console.log(isMobile ? '📱 Hero Mobile mode' : '🖥️ Hero Desktop mode');
  
  let ticking = false;
  
  function handleHeroScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const heroHeight = hero.offsetHeight;
        const progress = Math.min(scrollTop / heroHeight, 1);
        
        // 🔍 Zoom iceberg (opzionale - connesso al canvas)
        if (window.scrollScale !== undefined) {
          window.scrollScale = 1 + progress * (isMobile ? 0.1 : 0.3);
        }
        
        // 📝 Animazioni testo hero principale
        if (heroText) {
          heroText.style.opacity = 1 - progress;
          if (!isMobile) {
            heroText.style.transform = `translate(-50%, calc(-50% - ${progress * 80}px))`;
          }
        }
        
        // 🎯 Hero Titles - appaiono quando scroll > 66% dell'hero
        if (heroTitles) {
          const threshold = isMobile ? 0.6 : 0.66;
          if (progress > threshold) {
            const titleOpacity = (progress - threshold) / (1 - threshold);
            heroTitles.style.opacity = titleOpacity;
            if (!isMobile) {
              heroTitles.style.transform = `translate(-50%, calc(-50% + ${(1 - progress) * 30}px))`;
            }
            
            // Debug solo al cambiamento
            if (titleOpacity > 0 && titleOpacity < 0.1) {
              console.log('🎯 Hero Titles SHOW - Progress:', Math.round(progress * 100) + '%');
            }
          } else {
            heroTitles.style.opacity = 0;
            if (progress > 0.5 && progress < 0.6) { // Debug una volta
              console.log('🎯 Hero Titles HIDE - Progress:', Math.round(progress * 100) + '%');
            }
          }
        }
        
        ticking = false;
      });
      ticking = true;
    }
  }
  
  // Listener scroll dedicato SOLO per l'hero
  window.addEventListener('scroll', handleHeroScroll, { passive: true });
  
  // Controllo iniziale
  handleHeroScroll();
  
  console.log('✅ Hero System attivo - Scroll listener dedicato');
}


// === ScrollTrigger NATIVO con Intersection Observer ===
function initNativeMenuEffects() {
  console.log('🔧 Inizializzazione ScrollTrigger nativo...');
  const menu = document.querySelector(".main-menu");
  const subhero = document.querySelector(".subhero");
  
  if (!menu) {
    console.error('❌ Menu .main-menu non trovato!');
    return;
  }
  
  if (!subhero) {
    console.error('❌ Sezione .subhero non trovata!');
    return;
  }

  console.log('✅ Menu e Subhero trovati');
  
  // Stato iniziale: nascosto
  menu.style.opacity = '0';
  menu.style.visibility = 'hidden';
  menu.style.transform = 'translateY(-20px)';
  menu.style.transition = 'opacity 0.3s ease-out, visibility 0.3s ease-out, transform 0.3s ease-out';
  
  let menuVisible = false;
  
  function showMenu() {
    if (!menuVisible) {
      console.log('🔼 Menu SHOW');
      menuVisible = true;
      menu.style.opacity = '1';
      menu.style.visibility = 'visible';
      menu.style.transform = 'translateY(0)';
    }
  }
  
  function hideMenu() {
    if (menuVisible) {
      console.log('🔽 Menu HIDE');
      menuVisible = false;
      menu.style.opacity = '0';
      menu.style.visibility = 'hidden';
      menu.style.transform = 'translateY(-20px)';
    }
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      console.log(`📊 Subhero visibility: ${Math.round(entry.intersectionRatio * 100)}%`);

      // Se il subhero è ancora visibile per più del 33% -> nascondi menu
      if (entry.intersectionRatio > 0.33) {
        hideMenu();
      } 
      // Se il hero è quasi completamente fuori vista -> mostra menu
      else if (entry.intersectionRatio <= 0.33) {
        showMenu();
      }
    });
  }, {
    // Osserva quando l'hero entra/esce dal viewport
    threshold: [0, 0.1, 0.2, 0.33, 0.5, 0.66, 0.8, 1.0] // Controlli multipli
  });

  // Inizia a osservare il subhero
  observer.observe(subhero);
  console.log('✅ Intersection Observer attivo sul subhero');

  // FALLBACK: Controllo scroll tradizionale come backup
  let ticking = false;
  function handleScrollBackup() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const subheroHeight = subhero.offsetHeight;
        const threshold = subheroHeight * 0.66;

        // Log ogni 200px
        if (Math.floor(scrollTop / 200) !== Math.floor((scrollTop - 10) / 200)) {
          console.log(`� BACKUP - Scroll: ${Math.round(scrollTop)}px | Threshold: ${Math.round(threshold)}px`);
        }
        
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', handleScrollBackup, { passive: true });
}

// === MENU HAMBURGER CON CSS SEMPLICE ===
document.addEventListener('DOMContentLoaded', function() {
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  
  if (hamburgerMenu && mobileMenuOverlay) {
    // Funzione per chiudere il menu
    function closeMenu() {
      hamburgerMenu.classList.remove('active');
      mobileMenuOverlay.classList.remove('open');
      // Riabilita scroll della pagina
      document.body.style.overflow = '';
    }
    
    // Funzione per aprire il menu
    function openMenu() {
      hamburgerMenu.classList.add('active');
      mobileMenuOverlay.classList.add('open');
      // Blocca scroll della pagina
      document.body.style.overflow = 'hidden';
    }
    
    // Click sul hamburger per aprire/chiudere menu
    hamburgerMenu.addEventListener('click', function() {
      if (mobileMenuOverlay.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Click sulla X per chiudere il menu
    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', closeMenu);
    }

    // Chiudi menu con tasto ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('open')) {
        closeMenu();
      }
    });

    // Previeni scroll della pagina quando si scrolla nel menu
    mobileMenuOverlay.addEventListener('wheel', function(e) {
      e.stopPropagation();
    });

    mobileMenuOverlay.addEventListener('touchmove', function(e) {
      e.stopPropagation();
    });

    // Sincronizza i pulsanti mobile con quelli desktop
    const mobileColorToggle = document.getElementById('mobileColorToggle');
    const mobileClarityToggle = document.getElementById('mobileClarityToggle');

    const desktopColorToggle = document.getElementById('colorToggle');
    const desktopClarityToggle = document.getElementById('clarityToggle');

    // Sincronizza CLARITY button
    if (mobileClarityToggle && desktopClarityToggle) {
      mobileClarityToggle.addEventListener('click', () => {
        desktopClarityToggle.click();
        closeMenu();
      });
    }

    // Sincronizza SYNAPSE button
    if (mobileColorToggle && desktopColorToggle) {
      mobileColorToggle.addEventListener('click', () => {
        desktopColorToggle.click();
        closeMenu();
      });
    }

    // Chiudi menu quando si clicca su un link di navigazione
    const mobileNavItems = document.querySelectorAll('.mobile-nav-items .word');
    mobileNavItems.forEach(item => {
      item.addEventListener('click', closeMenu);
    });

    // Gestione CTA JOIN US mobile
    const mobileJoinUsCta = document.getElementById('mobileJoinUsCta');
    if (mobileJoinUsCta) {
      mobileJoinUsCta.addEventListener('click', () => {
        // Qui puoi aggiungere l'azione per JOIN US (es. aprire form, redirect, etc.)
        console.log('JOIN US clicked from mobile');
        closeMenu();
      });
    }
    
    // Gestione CTA SUBHERO
    const subheroJoinBtn = document.querySelector('.subhero-join-btn');
    if (subheroJoinBtn) {
      subheroJoinBtn.addEventListener('click', () => {
        console.log('🚀 JOIN OUR JOURNEY clicked from SUBHERO');
        
        // Aggiungi effetto visivo
        subheroJoinBtn.style.transform = 'translateY(-3px) scale(0.95)';
        setTimeout(() => {
          subheroJoinBtn.style.transform = '';
        }, 150);
        
        // Qui puoi aggiungere l'azione (es. scroll to contact, open modal, etc.)
        // Per ora mostra un feedback
        showJoinFeedback();
      });
    }
  }
  
  // Funzione feedback per JOIN OUR JOURNEY
  function showJoinFeedback() {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.9);
      color: var(--ice-cyan);
      padding: 1rem 2rem;
      border-radius: 12px;
      border: 2px solid var(--glacier-blue);
      z-index: 1000;
      font-size: 1rem;
      font-weight: 600;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(20px);
      text-align: center;
      transition: all 0.3s ease;
    `;
    notification.textContent = '🌊 Welcome to the journey! Coming soon...';
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(-50%) translateY(-20px)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
});
</script>




<script>
// ⚡ SEZIONI PARALLAX SYSTEM - Separato dall'Hero
function initNativeParallaxEffects() {
  console.log('🌊 Inizializzazione Parallax System (solo sezioni, NO hero)');
  document.body.style.overflowY = 'auto';
  initParallaxImages();
  initParallaxText();
  initParallaxMovement();
  initParallaxBackgrounds();
}

// 🖼️ Parallax IMMAGINI
function initParallaxImages() {
  const parallaxImages = document.querySelectorAll('.parallax-image:not(.hero .parallax-image), .parallax-section .parallax-image, section:not(.hero) .parallax-image');
  console.log(`🖼️ Parallax: Trovate ${parallaxImages.length} immagini (hero escluso)`);

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target.closest('.hero')) return;

      const progress = entry.intersectionRatio;

      if (entry.isIntersecting) {
        entry.target.classList.add('parallax-active');

        const isMobile = window.innerWidth <= 768;
        const scaleRange = isMobile ? 0.1 : 0.3;
        const yRange = isMobile ? 60 : 100;

        const scale = (isMobile ? 0.6 : 0.5) + (scaleRange * progress);
        const y = (isMobile ? 30 : 50) - (yRange * progress);
        const opacity = 0.2 + (0.8 * progress);

        entry.target.style.transform = `scale(${scale}) translateY(${y}px)`;
        entry.target.style.opacity = opacity;
        entry.target.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';

        if (progress === 1) console.log(`🖼️ Immagine parallax completamente visibile`);
      }
    });
  }, {
    threshold: Array.from({ length: 6 }, (_, i) => i / 5),
    rootMargin: '50px 0px -50px 0px'
  });

  parallaxImages.forEach(image => imageObserver.observe(image));
}

// 📝 Parallax TESTO migliorato
function initParallaxText() {
  const parallaxTexts = document.querySelectorAll(
    '.parallax-text:not(.hero .parallax-text), .parallax-section .parallax-text, section:not(.hero) .parallax-text'
  );
  console.log(`📝 Parallax: Trovati ${parallaxTexts.length} testi (hero escluso)`);

  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target.closest('.hero')) return;

      if (entry.isIntersecting && entry.intersectionRatio > 0.15) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        textObserver.unobserve(entry.target); // ⬅️ migliora performance
        console.log('📝 Testo parallax attivato');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -20% 0px'
  });

  parallaxTexts.forEach(text => {
    // Imposta solo se non già presenti
    if (!text.style.opacity) text.style.opacity = '0';
    if (!text.style.transform) text.style.transform = 'translateY(40px)';
    if (!text.style.transition) text.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    textObserver.observe(text);
  });
}


// 🎭 Parallax MOVIMENTO
const activeParallaxImgs = new Set();

function handleGlobalParallaxScroll() {
  activeParallaxImgs.forEach(img => {
    const rect = img.getBoundingClientRect();
    const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    const yOffset = 100 - (200 * clampedProgress);
    img.style.transform = `translateY(${yOffset}px)`;
  });
}
window.addEventListener('scroll', handleGlobalParallaxScroll, { passive: true });

function initParallaxMovement() {
  const parallaxImgs = document.querySelectorAll('.parallax-img:not(.hero .parallax-img), .parallax-section .parallax-img, section:not(.hero) .parallax-img');
  console.log(`🎭 Parallax: Trovate ${parallaxImgs.length} immagini con movimento (hero escluso)`);

  parallaxImgs.forEach(img => {
    const movementObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target.closest('.hero')) return;

        if (entry.isIntersecting) {
          activeParallaxImgs.add(entry.target);
          handleGlobalParallaxScroll(); // aggiorna subito
          console.log('🎭 Movimento parallax attivato');
        } else {
          activeParallaxImgs.delete(entry.target);
        }
      });
    }, { threshold: 0.1 });

    movementObserver.observe(img);
  });
}

// 🌈 Parallax SFONDI
function initParallaxBackgrounds() {
  const bgLayers = document.querySelectorAll('.bg-layer:not(.hero .bg-layer), .parallax-section .bg-layer,.bg-layer');
  console.log(`🌈 Parallax: Trovati ${bgLayers.length} sfondi (hero escluso)`);

  const bgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target.closest('.hero')) return;

      if (entry.isIntersecting) {
        const progress = entry.intersectionRatio;
        entry.target.style.backgroundPosition = `0% ${progress * 100}%`;
        entry.target.style.transition = 'background-position 0.6s ease-out';

        if (progress === 1) {
          console.log(`🌈 Sfondo parallax completamente attivo`);
        }
      }
    });
  }, {
    threshold: Array.from({ length: 6 }, (_, i) => i / 5)
  });

  bgLayers.forEach(bg => bgObserver.observe(bg));
}
</script>















<!-- ✅ QUESTI SONO GLI UNICI SCRIPT CHE SERVONO -->
<script src="https://cdn.jsdelivr.net/npm/three@0.136.0/build/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.136.0/examples/js/controls/OrbitControls.js"></script>

<!-- ✅ TUTTO RACCHIUSO IN UNA FUNZIONE PER EVITARE CONFLITTI CON L'ICEBERG -->
<script>
  document.addEventListener("DOMContentLoaded", () => {
    initPenguinCanvas();
  });

  function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g).map(Number).slice(0, 3);
    return (
      '#' +
      result.map(x => x.toString(16).padStart(2, '0')).join('')
    );
  }

  function enableCanvasDrag(canvas, controlsPenguin) {
    let isDragging = false;
    let offsetX, offsetY;

    canvas.addEventListener("mousedown", (e) => {
      isDragging = true;
      canvas.classList.add("dragging");
      controlsPenguin.enabled = false; // 🔴 Disabilita Orbit durante il drag

      const rect = canvas.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;

      canvas.style.position = 'fixed';
      canvas.style.left = `${e.clientX - offsetX}px`;
      canvas.style.top = `${e.clientY - offsetY}px`;
      canvas.style.right = 'auto';
      canvas.style.bottom = 'auto';
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      canvas.classList.remove("dragging");
      controlsPenguin.enabled = true; // ✅ Riattiva Orbit alla fine del drag
    });
  }

  function initPenguinCanvas() {
    const canvas = document.getElementById("penguin-canvas");
    if (!canvas) {
      console.error("Canvas con id 'penguin-canvas' non trovato!");
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    canvas.width = 1000 * dpr;
    canvas.height = 1000 * dpr;

    const scenePenguin = new THREE.Scene();
    scenePenguin.background = null;

    const aspect = canvas.width / canvas.height;
    const cameraPenguin = new THREE.PerspectiveCamera(60, aspect, 1, 100000);
    cameraPenguin.position.set(500, -300, 1500);
    cameraPenguin.lookAt(500, -300, 0);

    const rendererPenguin = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    rendererPenguin.setClearColor(0x000000, 0);
    rendererPenguin.setSize(600, 500, false);
    rendererPenguin.setPixelRatio(dpr);

    const controlsPenguin = new THREE.OrbitControls(cameraPenguin, rendererPenguin.domElement);
    controlsPenguin.enableZoom = false;
    controlsPenguin.enablePan = true;
    controlsPenguin.autoRotate = false;
    controlsPenguin.minDistance = 800;
    controlsPenguin.maxDistance = 6000;
    controlsPenguin.maxPolarAngle = Math.PI;
    controlsPenguin.minPolarAngle = 0;
    controlsPenguin.target.set(500, -300, -250);
    controlsPenguin.update();

    // Esponi i controlli globalmente per il System Panel
    window.controlsPenguin = controlsPenguin;

    enableCanvasDrag(canvas, controlsPenguin);

    canvas.addEventListener("mouseenter", () => {
      if (!controlsPenguin.enabled) controlsPenguin.enabled = true;
    });
    canvas.addEventListener("mouseleave", () => {
      if (!canvas.classList.contains("dragging")) {
        controlsPenguin.enabled = false;
      }
    });

    let dynamicMaterial = null;

    fetch('prova.json')
      .then(res => res.json())
      .then(data => {
        const points = data.penguinpoints;
        const edges = data.penguinedges;

        const vertices = [];
        edges.forEach(([start, end]) => {
          const p1 = points[start];
          const p2 = points[end];
          vertices.push(new THREE.Vector3(p1.x, -p1.y, 0));
          vertices.push(new THREE.Vector3(p2.x, -p2.y, 0));
        });

        const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
        dynamicMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff });
        const lines = new THREE.LineSegments(geometry, dynamicMaterial);
        scenePenguin.add(lines);
      })
      .catch(err => console.error('Errore caricamento JSON:', err));

    function updateMaterialColorFromHero() {
      const heroText = document.querySelector('.hero-text');
      if (!heroText || !dynamicMaterial) return;

      const color = getComputedStyle(heroText).color;
      const hex = rgbToHex(color);
      if (dynamicMaterial.color.getStyle() !== hex) {
        dynamicMaterial.color.set(hex);
      }
    }

    function animatePenguin() {
      requestAnimationFrame(animatePenguin);
      updateMaterialColorFromHero();
      
      // Aggiorna i controlli per l'auto-rotazione
      if (controlsPenguin) {
        controlsPenguin.update();
      }
      
      rendererPenguin.render(scenePenguin, cameraPenguin);
    }

    animatePenguin();
  }
</script>

<!-- ✅ EFFETTO FADE-IN DELLE IMMAGINI PARALLAX CON SCROLL -->
<script>
document.addEventListener("DOMContentLoaded", () => {
  // Seleziona tutte le immagini parallax nei layout flex
  const parallaxImages = document.querySelectorAll('.flex-2col .parallax-image, .flex-full .parallax-image, .parallax-image, .parallax-image');
  
  // Crea l'Intersection Observer
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Aggiunge la classe in-view quando l'immagine entra in vista
        entry.target.classList.add('in-view');
      }
    });
  }, {
    threshold: 0.3, // Trigger quando il 30% dell'immagine è visibile
    rootMargin: '0px 0px -50px 0px' // Trigger un po' prima che sia completamente visibile
  });
  
  // Osserva tutte le immagini parallax
  parallaxImages.forEach(image => {
    imageObserver.observe(image);
  });
});
</script>

<!-- ✅ EFFETTO COMPOSIZIONE TESTO LETTERA PER LETTERA CON CLASSE CSS -->
<script>
document.addEventListener("DOMContentLoaded", () => {
  
  // Funzione per applicare l'effetto composizione testo
  function applyTextCompositionEffect(element) {
    // Salva il contenuto HTML originale per preservare <br> e altri tag
    const originalHTML = element.innerHTML;
    const originalStyle = window.getComputedStyle(element);
    
    // Evita overflow sui contenitori
    const parent = element.parentElement;
    if (parent) {
      parent.style.overflow = 'hidden';
    }
    
    // Funzione per processare nodi di testo preservando la struttura
    function processTextNode(textNode) {
      const text = textNode.textContent;
      const letters = [];
      
      // Crea span per ogni lettera
      text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // Preserva spazi
        span.style.display = 'inline-block';
        span.style.position = 'relative';
        span.style.opacity = '0';
        span.style.transform = 'translateX(20px) scale(0.8)'; // 🔥 Ridotto da 50px a 20px
        span.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        span.dataset.letterIndex = letters.length; // Indice globale
        letters.push(span);
      });
      
      // Sostituisce il nodo di testo con gli span
      const fragment = document.createDocumentFragment();
      letters.forEach(letter => fragment.appendChild(letter));
      textNode.parentNode.replaceChild(fragment, textNode);
      
      return letters;
    }
    
    // Trova tutti i nodi di testo nell'elemento
    function getTextNodes(node) {
      const textNodes = [];
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        textNodes.push(node);
      } else {
        for (let child of node.childNodes) {
          textNodes.push(...getTextNodes(child));
        }
      }
      return textNodes;
    }
    
    // Processa tutti i nodi di testo
    const textNodes = getTextNodes(element);
    const allLetters = [];
    
    textNodes.forEach(textNode => {
      const letters = processTextNode(textNode);
      allLetters.push(...letters);
    });
    
    // Aggiorna gli indici per l'animazione sequenziale
    allLetters.forEach((letter, globalIndex) => {
      letter.style.transitionDelay = `${globalIndex * 0.03}s`;
      letter.dataset.globalIndex = globalIndex;
    });
    
    // Marca come processato
    element.dataset.textComposition = 'processed';
    
    // Intersection Observer per attivare l'animazione
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Ritardo di attivazione per rendere l'effetto più elegante
          setTimeout(() => {
            // Attiva l'animazione delle lettere
            allLetters.forEach((letter, index) => {
              setTimeout(() => {
                letter.style.opacity = '1';
                letter.style.transform = 'translateX(0) scale(1)';
              }, index * 30); // 30ms tra ogni lettera
            });
          }, 300); // Ritardo iniziale di 300ms
          
          // Smette di osservare una volta attivato
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1, // Attiva quando anche solo il 10% dell'elemento è visibile
      rootMargin: '0px 0px 0px 0px' // Nessun margine - attiva appena è in vista
    });
    
    observer.observe(element);
    
    // CONTROLLO IMMEDIATO: Se l'elemento è già visibile al caricamento, attiva subito
    setTimeout(() => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible && allLetters.length > 0 && allLetters[0].style.opacity === '0') {
        // Ritardo di attivazione anche per elementi già visibili
        setTimeout(() => {
          // Attiva l'animazione immediatamente
          allLetters.forEach((letter, index) => {
            setTimeout(() => {
              letter.style.opacity = '1';
              letter.style.transform = 'translateX(0) scale(1)';
            }, index * 30);
          });
        }, 500); // Ritardo maggiore per elementi già visibili (hero section)
        observer.unobserve(element);
      }
    }, 200); // Piccolo delay per assicurarsi che il DOM sia pronto
  }
  
  // AUTO-RILEVAMENTO: Cerca automaticamente tutti gli elementi con la classe 'text-compose'
  // ESCLUSI: elementi che hanno 'no-text-compose' o 'mobile-no-text-compose' su mobile
  function initTextComposition() {
    const isMobile = window.innerWidth <= 768;
    let selector = '.text-compose:not(.no-text-compose):not([data-text-composition="processed"])';
    
    // Su mobile, escludi anche gli elementi con 'mobile-no-text-compose'
    if (isMobile) {
      selector = '.text-compose:not(.no-text-compose):not(.mobile-no-text-compose):not([data-text-composition="processed"])';
    }
    
    const textComposeElements = document.querySelectorAll(selector);
    
    textComposeElements.forEach(element => {
      applyTextCompositionEffect(element);
    });
  }
  
  // Avvia il rilevamento automatico
  setTimeout(initTextComposition, 100);
  
  // Espone la funzione globalmente per il riuso
  window.initTextComposition = initTextComposition;
  
  // Funzione globale per applicare manualmente l'effetto (opzionale)
  window.activateTextComposition = function(selectors) {
    if (typeof selectors === 'string') {
      selectors = [selectors];
    }
    
    selectors.forEach(selector => {
      const targetElements = document.querySelectorAll(`${selector}:not([data-text-composition="processed"])`);
      targetElements.forEach(element => {
        applyTextCompositionEffect(element);
      });
    });
  };
});
</script>

<!-- ✅ ACCORDION RIUTILIZZABILE -->
<script>
document.addEventListener("DOMContentLoaded", () => {
  // Gestione click Read More riutilizzabile
  const readMoreBtn = document.getElementById('readMoreBtn');
  const readMoreContent = document.getElementById('readMoreContent');
  const readMoreText = readMoreBtn?.querySelector('.read-more-text');
  const readLessText = readMoreBtn?.querySelector('.read-less-text');
  
  if (readMoreBtn && readMoreContent) {
    readMoreBtn.addEventListener('click', () => {
      const isOpen = readMoreContent.classList.contains('open');
      
      if (isOpen) {
        // Chiudi: contenuto completo -> solo preview
        readMoreContent.classList.remove('open');
        readMoreText.style.display = 'inline';
        readLessText.style.display = 'none';
      } else {
        // Apri: mostra contenuto completo
        readMoreContent.classList.add('open');
        readMoreText.style.display = 'none';
        readLessText.style.display = 'inline';
        
        // Attiva text-compose sul nuovo contenuto
        setTimeout(() => {
          if (window.initTextComposition) {
            window.initTextComposition();
          }
        }, 400); // Delay per sincronizzarsi con l'animazione
      }
    });
  }
});
</script>

<!-- Project Cards Interaction -->
<script>
document.addEventListener("DOMContentLoaded", () => {
  // Project cards click handlers
  const projectCards = document.querySelectorAll('.project-card');
  const projectBtns = document.querySelectorAll('.project-btn');
  
  // Add click handlers to project cards
  projectCards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      // Prevent button click from triggering card click
      if (e.target.classList.contains('project-btn')) {
        return;
      }
      
      const projectTitle = card.querySelector('.project-title').textContent;
      console.log(`🚀 Opening project: ${projectTitle}`);
      
      // Add visual feedback
      card.style.transform = 'scale(0.98)';
      setTimeout(() => {
        card.style.transform = '';
      }, 150);
      
      // Here you could navigate to project page or open modal
      // For now, just log the action
      showProjectInfo(projectTitle);
    });
  });
  
  // Add click handlers to project buttons
  projectBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent card click
      
      const card = btn.closest('.project-card');
      const projectTitle = card.querySelector('.project-title').textContent;
      
      console.log(`📋 View details for: ${projectTitle}`);
      
      // Add button animation
      btn.style.transform = 'translateX(10px) scale(1.05)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 200);
      
      showProjectDetails(projectTitle);
    });
  });
  
  // Project info function
  function showProjectInfo(projectName) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: rgba(0, 0, 0, 0.9);
      color: var(--ice-cyan);
      padding: 1rem 1.5rem;
      border-radius: 8px;
      border: 2px solid var(--glacier-blue);
      z-index: 1000;
      font-size: 0.9rem;
      font-weight: 600;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(20px);
      transition: all 0.3s ease;
    `;
    notification.textContent = `Project: ${projectName} - Coming Soon!`;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateY(0)';
      notification.style.opacity = '1';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateY(-20px)';
      notification.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
  
  // Project details function
  function showProjectDetails(projectName) {
    showProjectInfo(`${projectName} Details`);
  }
  
  // Add hover effects for project cards
  projectCards.forEach((card) => {
    const progressBar = card.querySelector('.progress-fill');
    const originalWidth = progressBar.style.width;
    
    card.addEventListener('mouseenter', () => {
      // Animate progress bar on hover
      progressBar.style.transition = 'width 0.5s ease';
      const currentWidth = parseInt(originalWidth);
      progressBar.style.width = Math.min(currentWidth + 10, 100) + '%';
    });
    
    card.addEventListener('mouseleave', () => {
      // Reset progress bar
      progressBar.style.width = originalWidth;
    });
  });
});

// === ETHICS SECTION FUNCTIONALITY ===
function toggleEthicsCard(card) {
  console.log('toggleEthicsCard called for card:', card.getAttribute('data-id'));
  console.log('Card classes before:', card.className);
  
  const isCurrentlyExpanded = card.classList.contains('expanded');
  
  // Close ALL cards first (including the clicked one)
  const allCards = document.querySelectorAll('.ethics-card');
  allCards.forEach(otherCard => {
    if (otherCard.classList.contains('expanded')) {
      otherCard.classList.remove('expanded');
      otherCard.classList.add('collapsed');
      otherCard.setAttribute('aria-pressed', 'false');
      console.log('Closed card:', otherCard.getAttribute('data-id'));
    }
  });
  
  // If the clicked card was NOT expanded, expand it
  if (!isCurrentlyExpanded) {
    card.classList.remove('collapsed');
    card.classList.add('expanded');
    card.setAttribute('aria-pressed', 'true');
    console.log('Card expanded:', card.getAttribute('data-id'));
  } else {
    console.log('Card was expanded, now closed:', card.getAttribute('data-id'));
  }
  
  console.log('Card classes after:', card.className);
}

// Keyboard accessibility for ethics cards
document.addEventListener('DOMContentLoaded', function() {
  const ethicsCards = document.querySelectorAll('.ethics-card');
  
  console.log('Ethics cards found:', ethicsCards.length);
  
  ethicsCards.forEach((card, index) => {
    console.log(`Card ${index + 1} (data-id=${card.getAttribute('data-id')}):`, card.className);
    
    // Ensure all cards start collapsed
    if (!card.classList.contains('collapsed') && !card.classList.contains('expanded')) {
      card.classList.add('collapsed');
    }
    
    // Add cursor pointer to show it's clickable
    card.style.cursor = 'pointer';
    
    // Add hover effect
    card.addEventListener('mouseenter', function() {
      if (!this.classList.contains('expanded')) {
        this.style.borderColor = 'rgba(94, 228, 195, 0.6)';
        this.style.transform = 'translateY(-5px)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      if (!this.classList.contains('expanded')) {
        this.style.borderColor = 'rgba(94, 228, 195, 0.3)';
        this.style.transform = 'translateY(0)';
      }
    });
    
    // Handle keyboard events
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleEthicsCard(this);
      }
    });
    
    // Handle click events - clickable anywhere on the card
    card.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent any default behavior
      console.log('Card clicked:', this.getAttribute('data-id'));
      toggleEthicsCard(this);
    });
  });
});

// Refresh ScrollTrigger dopo il caricamento per ricalcolare tutto
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});

// === FOOTER FUNCTIONALITY ===
document.addEventListener('DOMContentLoaded', function() {
  const footerLinks = document.querySelectorAll('.footer-link');
  const faqSection = document.getElementById('faqSection');
  const faqCloseBtn = document.getElementById('faqCloseBtn');
  
  footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const href = this.getAttribute('href');
      const linkText = this.textContent;
      
      // Feedback visivo
      this.style.transform = 'translateY(-3px) scale(1.1)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
      
      // Special handling for FAQ
      if (href === '#faq') {
        toggleFAQSection();
      } else {
        // Mostra notifica per altri link non ancora implementati
        showFooterNotification(linkText);
      }
    });
  });
  
  // FAQ accordion functionality
  function toggleFAQSection() {
    faqSection.classList.toggle('expanded');
    
    // Smooth scroll to FAQ section when opening
    if (faqSection.classList.contains('expanded')) {
      setTimeout(() => {
        faqSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 300);
    }
  }
  
  // Close FAQ section
  if (faqCloseBtn) {
    faqCloseBtn.addEventListener('click', function() {
      faqSection.classList.remove('expanded');
    });
  }
  
  // Individual FAQ items accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('expanded');
        }
      });
      
      // Toggle current item
      item.classList.toggle('expanded');
    });
  });
  
  function showFooterNotification(linkName) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 20px;
      background: rgba(0, 0, 0, 0.9);
      color: var(--ice-cyan);
      padding: 1rem 1.5rem;
      border-radius: 12px;
      border: 2px solid var(--glacier-blue);
      z-index: 1000;
      font-size: 0.9rem;
      font-weight: 600;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(20px);
      transition: all 0.3s ease;
    `;
    notification.textContent = `${linkName} - Coming Soon!`;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(20px)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
});

</script>
