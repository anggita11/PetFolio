/* ==========================================================================
   DYNAMIC SKY CANVAS ANIMATION
   Renders volumetric floating clouds (Day) and star mist (Night)
   ========================================================================== */

(function () {
  const canvas = document.getElementById('sky-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouseX = width / 2;
  let mouseY = height / 2;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Cloud Puff Class
  class Cloud {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * (width + 400) - 200;
      this.y = Math.random() * (height * 0.7);
      this.speed = 0.15 + Math.random() * 0.35;
      this.baseRadius = 50 + Math.random() * 90;
      this.circles = [];

      // Create a cloud shape out of overlapping circles
      const circleCount = 5 + Math.floor(Math.random() * 5);
      for (let i = 0; i < circleCount; i++) {
        this.circles.push({
          offsetX: (Math.random() - 0.5) * this.baseRadius * 1.6,
          offsetY: (Math.random() - 0.5) * this.baseRadius * 0.6,
          radius: this.baseRadius * (0.4 + Math.random() * 0.6),
          alpha: 0.08 + Math.random() * 0.14
        });
      }
    }

    update() {
      this.x += this.speed;

      // Subtle reaction to mouse
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 250) {
        this.x += (dx / dist) * -0.2;
      }

      if (this.x - this.baseRadius * 2 > width) {
        this.x = -this.baseRadius * 2;
        this.y = Math.random() * (height * 0.7);
      }
    }

    draw(isNight) {
      this.circles.forEach((c) => {
        ctx.beginPath();
        const cx = this.x + c.offsetX;
        const cy = this.y + c.offsetY;
        const rad = c.radius;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        if (isNight) {
          grad.addColorStop(0, `rgba(180, 215, 255, ${c.alpha * 0.4})`);
          grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
        } else {
          grad.addColorStop(0, `rgba(255, 255, 255, ${c.alpha * 1.5})`);
          grad.addColorStop(0.7, `rgba(224, 242, 254, ${c.alpha * 0.8})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }

        ctx.fillStyle = grad;
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  }

  // Star Class for Night Mode
  class Star {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = 0.5 + Math.random() * 1.5;
      this.alpha = Math.random();
      this.speed = 0.005 + Math.random() * 0.015;
    }

    update() {
      this.alpha += this.speed;
      if (this.alpha > 1 || this.alpha < 0) {
        this.speed = -this.speed;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(this.alpha) * 0.7})`;
      ctx.fill();
    }
  }

  // Initialize Objects
  const clouds = Array.from({ length: 14 }, () => new Cloud());
  const stars = Array.from({ length: 70 }, () => new Star());

  // Render Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);
    const isNight = document.documentElement.getAttribute('data-theme') === 'night';

    if (isNight) {
      stars.forEach((star) => {
        star.update();
        star.draw();
      });
    }

    clouds.forEach((cloud) => {
      cloud.update();
      cloud.draw(isNight);
    });

    requestAnimationFrame(animate);
  }

  animate();
})();
