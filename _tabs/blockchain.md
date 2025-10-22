---
layout: page
icon: fa-solid fa-diagram-project
order: 2
---

<canvas id="starfield"></canvas>
<div class="portal-wrapper">
  <p class="portal-subtitle">Portalın içine tıklayarak zincirin ötesine geç!</p>
  <div class="portal" id="portal">
    <div class="rings"></div>
    <div class="core"></div>
  </div>
</div>

<script>
// Yıldız alanı
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
let speed = 0.5;
let warpSpeed = false;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars();
}

function initStars() {
  stars = [];
  const numStars = 300;
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width,
      o: Math.random() // opacity
    });
  }
}

function drawStars() {
  ctx.fillStyle = 'rgba(4, 8, 16, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  stars.forEach(star => {
    star.z -= speed;
    
    if (star.z <= 0) {
      star.z = canvas.width;
      star.x = Math.random() * canvas.width;
      star.y = Math.random() * canvas.height;
    }
    
    const k = 128 / star.z;
    const px = (star.x - centerX) * k + centerX;
    const py = (star.y - centerY) * k + centerY;
    
    if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
      const size = (1 - star.z / canvas.width) * 2;
      const opacity = (1 - star.z / canvas.width) * star.o;
      
      // Yıldız rengi - mavi tonları
      const brightness = Math.floor(150 + (1 - star.z / canvas.width) * 105);
      ctx.fillStyle = `rgba(${brightness * 0.5}, ${brightness * 0.8}, ${brightness}, ${opacity})`;
      
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Hız çizgisi (warp efekti)
      if (warpSpeed && opacity > 0.5) {
        const prevK = 128 / (star.z + speed * 2);
        const prevPx = (star.x - centerX) * prevK + centerX;
        const prevPy = (star.y - centerY) * prevK + centerY;
        
        ctx.strokeStyle = `rgba(${brightness * 0.5}, ${brightness * 0.8}, ${brightness}, ${opacity * 0.5})`;
        ctx.lineWidth = size * 0.5;
        ctx.beginPath();
        ctx.moveTo(prevPx, prevPy);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
    }
  });
  
  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', resize);
resize();
drawStars();

// Portal tıklama
const portal = document.getElementById("portal");
portal.addEventListener("click", () => {
  document.body.classList.add("entering");
  portal.classList.add("active");
  warpSpeed = true;
  
  // Hızı kademeli artır
  let acceleration = setInterval(() => {
    speed += 0.8;
    if (speed > 30) clearInterval(acceleration);
  }, 100);
  
  setTimeout(() => {
    window.location.href = "https://farukguler.com/categories/blockchain/";
  }, 2600);
});

// Hover efekti
portal.addEventListener("mouseenter", () => {
  if (!warpSpeed) speed = 1.5;
});

portal.addEventListener("mouseleave", () => {
  if (!warpSpeed) speed = 0.5;
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #040810;
  color: #e0e6ed;
  overflow: hidden;
  height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#starfield {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.portal-wrapper {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.portal-subtitle {
  font-size: 1.1rem;
  color: #9aa7b6;
  margin-bottom: 3rem;
  text-shadow: 0 0 10px rgba(154, 167, 182, 0.5);
  animation: subtitleFloat 3s ease-in-out infinite;
}

@keyframes subtitleFloat {
  0%, 100% { transform: translateY(0); opacity: 0.8; }
  50% { transform: translateY(-5px); opacity: 1; }
}

.portal {
  width: 240px;
  height: 240px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  background: radial-gradient(circle at center, #12203a 0%, #050a13 80%);
  box-shadow: 
    0 0 50px rgba(33, 150, 255, 0.4), 
    0 0 80px rgba(33, 150, 255, 0.2),
    inset 0 0 40px rgba(0, 0, 80, 0.5);
  overflow: hidden;
  transition: all 0.4s ease;
  animation: portalGlow 3s ease-in-out infinite;
}

@keyframes portalGlow {
  0%, 100% {
    box-shadow: 
      0 0 50px rgba(33, 150, 255, 0.4), 
      0 0 80px rgba(33, 150, 255, 0.2),
      inset 0 0 40px rgba(0, 0, 80, 0.5);
  }
  50% {
    box-shadow: 
      0 0 60px rgba(33, 150, 255, 0.6), 
      0 0 100px rgba(33, 150, 255, 0.3),
      inset 0 0 50px rgba(0, 0, 120, 0.7);
  }
}

.portal:hover {
  box-shadow: 
    0 0 70px rgba(33, 150, 255, 0.6), 
    0 0 120px rgba(33, 150, 255, 0.4),
    inset 0 0 60px rgba(0, 0, 150, 0.8);
  transform: scale(1.08);
}

.rings {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.rings::before,
.rings::after {
  content: "";
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  border-radius: 50%;
  border: 3px solid rgba(0, 200, 255, 0.25);
  animation: spin 5s linear infinite;
}

.rings::after {
  border-color: rgba(0, 255, 180, 0.2);
  animation-duration: 7s;
  animation-direction: reverse;
  border-width: 2px;
}

@keyframes spin {
  from { transform: rotate(0deg) scale(1); }
  to { transform: rotate(360deg) scale(1.05); }
}

.core {
  position: absolute;
  width: 70px;
  height: 70px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle at center, 
    rgba(255, 255, 255, 0.9) 0%, 
    rgba(26, 255, 255, 0.8) 20%,
    rgba(0, 150, 255, 0.5) 50%,
    rgba(0, 51, 102, 0.3) 80%);
  border-radius: 50%;
  box-shadow: 
    0 0 40px rgba(0, 255, 255, 0.8),
    0 0 60px rgba(0, 200, 255, 0.6),
    inset 0 0 20px rgba(255, 255, 255, 0.5);
  animation: corePulse 2s ease-in-out infinite;
}

@keyframes corePulse {
  0%, 100% { 
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 
      0 0 40px rgba(0, 255, 255, 0.8),
      0 0 60px rgba(0, 200, 255, 0.6);
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.25);
    box-shadow: 
      0 0 60px rgba(0, 255, 255, 1),
      0 0 90px rgba(0, 200, 255, 0.8),
      0 0 120px rgba(0, 150, 255, 0.5);
  }
}

/* Warp animasyonu */
.portal.active {
  animation: suckIn 2.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

@keyframes suckIn {
  0% { 
    transform: scale(1); 
    opacity: 1;
    filter: brightness(1);
  }
  30% { 
    transform: scale(1.6); 
    filter: brightness(1.5);
  }
  60% { 
    transform: scale(2.5); 
    opacity: 0.9;
    filter: brightness(2);
  }
  100% { 
    transform: scale(30); 
    opacity: 0;
    filter: brightness(3);
  }
}

.portal.active .core {
  animation: coreExplosion 2.6s ease-out forwards;
}

@keyframes coreExplosion {
  0% { 
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(2);
    box-shadow: 
      0 0 100px rgba(0, 255, 255, 1),
      0 0 150px rgba(0, 200, 255, 1);
  }
  100% { 
    transform: translate(-50%, -50%) scale(5);
    opacity: 0;
  }
}

body.entering {
  animation: darken 2s forwards;
}

@keyframes darken {
  0% { background-color: #040810; }
  100% { background-color: #000; }
}

/* Responsive */
@media (max-width: 768px) {
  .portal {
    width: 200px;
    height: 200px;
  }
  
  .portal-subtitle {
    font-size: 0.95rem;
    padding: 0 20px;
  }
  
  .core {
    width: 60px;
    height: 60px;
  }
}
</style>