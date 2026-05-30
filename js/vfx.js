/* ==========================================================================
   AMBIENT DRIFT WEATHER CANVAS SYSTEM ENGINE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("bg-weather-canvas");
  if (!canvas) return;
  
  const ctx = canvas.getContext("2d");
  let particleArray = [];
  const maxParticles = 65; // Balanced particle threshold count for high refresh rates

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Blueprint Class Object logic structure for individual particles
  class WeatherParticle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * -canvas.height; // Instantiates cleanly off-screen top boundary
      this.radius = Math.random() * 1.8 + 0.5;
      this.speedY = Math.random() * 0.7 + 0.3; // Gentle downward fall vector velocity velocity multiplier
      this.speedX = Math.random() * 0.4 - 0.2; // Gentle side-to-side air drift current alignment
      this.opacity = Math.random() * 0.4 + 0.15;
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      
      // Reset particle to top if it goes off bottom or sides
      if (this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
        this.reset();
        this.y = 0;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  function initVfxEngine() {
    particleArray = [];
    for (let i = 0; i < maxParticles; i++) {
      particleArray.push(new WeatherParticle());
    }
  }

  function animateVfxEngine() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particleArray.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(animateVfxEngine);
  }

  initVfxEngine();
  animateVfxEngine();
});
