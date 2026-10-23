/**
 * Indian Wedding Invitation - Interactive Confetti Celebration
 */

window.WeddingApp = window.WeddingApp || {};

(function (App) {
  "use strict";

  function setupConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    const confettiBtn = document.getElementById("confetti-btn");
    if (!canvas || !confettiBtn) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const CONFETTI_COLORS = [
      "#2273B3", // Royal Cobalt Blue
      "#658FCB", // Soft Periwinkle
      "#B5A88B", // Champagne Gold
      "#DFCFA8", // Light Gold
      "#F39E99", // Coral Rose
      "#D6B9D9", // Lavender Mist
      "#FBE5E0", // Peach Blush
      "#FFB300", // Auspicious Marigold Saffron
    ];

    let confettiParticles = [];
    let animFrameId = null;

    function launchCelebration() {
      const PARTICLE_COUNT = 140;
      const origins = [
        { x: width * 0.2, y: height + 10 },
        { x: width * 0.5, y: height + 10 },
        { x: width * 0.8, y: height + 10 },
      ];

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const origin = origins[i % origins.length];
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.4;
        const velocity = Math.random() * 18 + 14;

        confettiParticles.push({
          x: origin.x,
          y: origin.y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: Math.random() * 8 + 6,
          color:
            CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
          tilt: Math.random() * 10 - 5,
          tiltSpeed: Math.random() * 0.12 + 0.05,
          gravity: 0.42,
          drag: 0.982,
          opacity: 1,
          shape: Math.random() > 0.4 ? "rect" : "circle",
        });
      }

      if (!animFrameId) {
        animateConfetti();
      }
    }

    function animateConfetti() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < confettiParticles.length; i++) {
        const p = confettiParticles[i];
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.tilt += p.tiltSpeed;

        if (p.y > height * 0.7) {
          p.opacity -= 0.015;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.scale(Math.cos(p.tilt), 1);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
        }

        ctx.restore();
      }

      confettiParticles = confettiParticles.filter(
        (p) => p.y < height + 40 && p.opacity > 0,
      );

      if (confettiParticles.length > 0) {
        animFrameId = requestAnimationFrame(animateConfetti);
      } else {
        ctx.clearRect(0, 0, width, height);
        animFrameId = null;
      }
    }

    confettiBtn.addEventListener("click", () => {
      launchCelebration();
    });
  }

  App.setupConfetti = setupConfetti;
})(window.WeddingApp);
