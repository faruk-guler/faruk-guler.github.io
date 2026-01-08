// Particle Animation System
(function () {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const particlesContainer = document.getElementById('particles-js');

  if (!particlesContainer) return;

  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  particlesContainer.appendChild(canvas);

  let particles = [];
  let mouseX = null;
  let mouseY = null;

  const config = {
    particleCount: 100,
    particleColor: '#27a5cc',
    particleSize: 5,
    lineColor: '#ffffff',
    lineOpacity: 0.4,
    lineDistance: 150,
    particleSpeed: 0.5,
    repulseDistance: 100
  };

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height;
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * config.particleSpeed;
      this.vy = (Math.random() - 0.5) * config.particleSpeed;
      this.radius = Math.random() * config.particleSize;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      this.x = Math.max(0, Math.min(canvas.width, this.x));
      this.y = Math.max(0, Math.min(canvas.height, this.y));

      if (mouseX !== null && mouseY !== null) {
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.repulseDistance) {
          const force = (config.repulseDistance - distance) / config.repulseDistance;
          this.vx += (dx / distance) * force * 0.5;
          this.vy += (dy / distance) * force * 0.5;
        }
      }

      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > config.particleSpeed * 2) {
        this.vx = (this.vx / speed) * config.particleSpeed * 2;
        this.vy = (this.vy / speed) * config.particleSpeed * 2;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = config.particleColor;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.lineDistance) {
          const opacity = (1 - distance / config.lineDistance) * config.lineOpacity;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    drawConnections();

    requestAnimationFrame(animate);
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  document.addEventListener('mouseleave', () => {
    mouseX = null;
    mouseY = null;
  });

  canvas.addEventListener('click', (e) => {
    for (let i = 0; i < 4; i++) {
      const particle = new Particle();
      particle.x = e.clientX;
      particle.y = e.clientY;
      particles.push(particle);
    }
    if (particles.length > config.particleCount + 20) {
      particles = particles.slice(-config.particleCount);
    }
  });

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  resizeCanvas();
  initParticles();
  animate();
})();
