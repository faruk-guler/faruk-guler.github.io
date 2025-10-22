---
layout: page
icon: fa-solid fa-diagram-project
order: 2
---

<div class="portal-container">
  <h1 class="portal-title">🚪 Blockchain Dünyasına Giriş</h1>
  <p class="portal-subtitle">Tıklayarak Blockchain makalelerinin bulunduğu kategoriye geçiş yapabilirsin.</p>

  <a href="https://farukguler.com/categories/blockchain/" class="portal-link">
    <div class="portal-door">
      <div class="portal-glow"></div>
      <div class="portal-text">GİRİŞ YAP</div>
    </div>
  </a>
</div>

<style>
.portal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 5rem 1rem;
  color: #e0e6ed;
  background: radial-gradient(circle at center, #0b1221 20%, #0d1727 80%);
  min-height: 80vh;
}

.portal-title {
  font-size: 2rem;
  color: #fff;
  margin-bottom: 0.5rem;
}

.portal-subtitle {
  color: #9aa7b6;
  font-size: 1rem;
  margin-bottom: 2.5rem;
}

.portal-link {
  text-decoration: none;
}

.portal-door {
  position: relative;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #1c4fff, #05193f 90%);
  box-shadow: 0 0 30px rgba(33, 100, 255, 0.5),
              0 0 80px rgba(33, 100, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.35s ease-in-out;
  overflow: hidden;
}

.portal-door:hover {
  transform: scale(1.08) rotate(2deg);
  box-shadow: 0 0 50px rgba(50, 150, 255, 0.8),
              0 0 120px rgba(33, 100, 255, 0.3);
}

.portal-glow {
  position: absolute;
  width: 200%;
  height: 200%;
  background: conic-gradient(from 0deg, rgba(33, 100, 255, 0.2), transparent, rgba(33, 100, 255, 0.4), transparent);
  animation: spin 3s linear infinite;
}

.portal-text {
  position: relative;
  font-size: 1.4rem;
  color: #fff;
  font-weight: bold;
  letter-spacing: 1px;
  z-index: 2;
  text-shadow: 0 0 10px rgba(255,255,255,0.5);
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
