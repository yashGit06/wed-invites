/**
 * Indian Wedding Invitation - Ambient Falling Petals Canvas
 */

window.WeddingApp = window.WeddingApp || {};

(function (App) {
  "use strict";

  function setupFallingPetals() {
    const canvas = document.getElementById("petals-canvas");
    const toggleBtn = document.getElementById("petals-toggle-btn");
    if (!canvas) return;

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.style.display = "none";
      if (toggleBtn) toggleBtn.style.display = "none";
      return;
    }

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const petalColors = [
      "rgba(251, 229, 224, 0.75)", // Peach blush
      "rgba(243, 158, 153, 0.65)", // Coral rose
      "rgba(255, 252, 247, 0.85)", // Warm ivory
      "rgba(214, 185, 217, 0.60)", // Lavender mist
      "rgba(181, 168, 139, 0.40)", // Champagne gold highlight
    ];

    const PETAL_COUNT = 24; // Subtle, non-intrusive quantity
    const petals = [];

    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 8,
        speedY: Math.random() * 0.8 + 0.4,
        speedX: Math.random() * 0.5 - 0.25,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.015 + 0.005,
      });
    }

    let isPaused = false;
    let animId = null;

    function renderPetals() {
      if (isPaused) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.swayPhase += p.swaySpeed;
        p.x += Math.sin(p.swayPhase) * 0.6 + p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Draw graceful organic petal shape
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(
          p.size / 2,
          -p.size / 2,
          p.size,
          p.size / 3,
          0,
          p.size * 1.3,
        );
        ctx.bezierCurveTo(-p.size, p.size / 3, -p.size / 2, -p.size / 2, 0, 0);
        ctx.fill();

        ctx.restore();
      }

      animId = requestAnimationFrame(renderPetals);
    }

    renderPetals();

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        isPaused = !isPaused;
        toggleBtn.textContent = isPaused ? "🌸 Play Petals" : "🌸 Pause Petals";
        if (!isPaused) {
          renderPetals();
        }
      });
    }
  }

  App.setupFallingPetals = setupFallingPetals;
})(window.WeddingApp);
