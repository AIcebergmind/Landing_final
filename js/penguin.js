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
