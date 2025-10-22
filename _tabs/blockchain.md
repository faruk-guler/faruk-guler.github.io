---
layout: page
icon: fa-solid fa-diagram-project
order: 2
---

<div class="portal-wrapper">
  <h1 class="portal-title">🌌 Blockchain Evrenine Giriş</h1>
  <p class="portal-subtitle">Portalın içine tıklayarak zincirin ötesine geç!</p>

  <div class="portal" id="portal">
    <div class="rings"></div>
    <div class="core"></div>
  </div>
</div>

<script>
const portal = document.getElementById("portal");

portal.addEventListener("click", () => {
  document.body.classList.add("entering");
  portal.classList.add("active");

  setTimeout(() => {
    window.location.href = "https://farukguler.com/categories/blockchain/";
  }, 2600); // efekt tamamlanınca yönlendirme
});
</script>

<style>
body {
  margin: 0;
  background: radial-gradient(circle at center, #040810 10%, #0b1221 80%);
  color: #e0e6ed;
  overflow: hidden;
  height: 100vh;
}

.portal-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.portal-title {
  font-size: 2rem;
  color: #fff;
  margin-bottom: 0.5rem;
}

.portal-subtitle {
  font-size: 1rem;
  color: #9aa7b6;
  margin-bottom: 3rem;
}

.portal {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  background: radial-gradient(circle at center, #12203a 0%, #050a13 80%);
  box-shadow: 0 0 40px rgba(33, 150, 255, 0.3), inset 0 0 30px rgba(0,0,80,0.5);
  overflow: hidden;
  transition: all 0.4s ease;
}

.portal:hover {
  box-shadow: 0 0 60px rgba(33,150,255,0.5), inset 0 0 60px rgba(0,0,120,0.7);
  transform: scale(1.05);
}

.rings::before, .rings::after {
  content: "";
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  border-radius: 50%;
  border: 3px solid rgba(0, 200, 255, 0.2);
  animation: spin 4s linear infinite;
}

.rings::after {
  border-color: rgba(0, 255, 180, 0.15);
  animation-duration: 6s;
}

.core {
  position: absolute;
  width: 60px;
  height: 60px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle at center, #1affff 0%, #003366 80%);
  border-radius: 50%;
  box-shadow: 0 0 40px rgba(0, 255, 255, 0.6);
  animation: pulse 2s ease-in-out infinite;
}

.portal.active {
  animation: suckIn 2.6s ease-in forwards;
}

@keyframes spin {
  from { transform: rotate(0deg) scale(1); }
  to { transform: rotate(360deg) scale(1.05); }
}

@keyframes pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.3); }
}

@keyframes suckIn {
  0% { transform: scale(1); opacity: 1; }
  30% { transform: scale(1.5); }
  60% { transform: scale(2); opacity: 0.8; }
  100% { transform: scale(25); opacity: 0; }
}

body.entering {
  animation: darken 2s forwards;
}

@keyframes darken {
  0% { background-color: #0b1221; }
  100% { background-color: #000; }
}
</style>