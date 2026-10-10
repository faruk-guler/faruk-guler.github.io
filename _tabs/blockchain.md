---
title: Blockchain
layout: page
icon: fa-solid fa-diagram-project
order: 2
---

<style>
  .portal-container {
    text-align: center;
    padding: clamp(40px, 8vw, 80px) 20px;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .portal-image-link {
    display: inline-block;
    border-radius: 50%;
    margin-bottom: 35px;
    text-decoration: none;
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .portal-image-link:hover {
    transform: scale(1.035);
  }

  .portal-image {
    width: clamp(220px, 45vw, 280px);
    height: clamp(220px, 45vw, 280px);
    border-radius: 50%;
    object-fit: cover;
    display: block;
    box-shadow: 0 12px 36px rgba(0, 136, 255, 0.25), 0 0 0 1px rgba(0, 136, 255, 0.12);
    transition: box-shadow 0.35s ease;
  }

  .portal-image-link:hover .portal-image {
    box-shadow: 0 18px 48px rgba(0, 136, 255, 0.45), 0 0 0 2px rgba(0, 170, 255, 0.35);
  }

  .portal-description {
    color: var(--text-muted-color, #7a8a9e);
    font-size: 1.05rem;
    line-height: 1.6;
    margin-bottom: 32px;
  }

  .portal-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 13px 34px;
    background: linear-gradient(135deg, #0088ff 0%, #0066cc 100%);
    color: #ffffff !important;
    text-decoration: none !important;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 500;
    box-shadow: 0 6px 20px rgba(0, 136, 255, 0.32);
    transition: all 0.25s ease;
  }

  .portal-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(0, 136, 255, 0.48);
    background: linear-gradient(135deg, #0da1ff 0%, #0073e6 100%);
  }

  .portal-btn:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(0, 136, 255, 0.3);
  }

  .portal-btn .portal-arrow {
    transition: transform 0.25s ease;
  }

  .portal-btn:hover .portal-arrow {
    transform: translateX(4px);
  }
</style>

<div class="portal-container">
  <a href="/categories/blockchain/" class="portal-image-link" title="Blockchain Kategorisine Git">
    <img src="https://farukguler.com/assets/img/chain-page.jpg"
         alt="Blockchain Portal"
         class="portal-image"
         loading="lazy">
  </a>

  <p class="portal-description">
    Portal'a tıklayarak zincirin ötesine geç!
  </p>

  <a href="/categories/blockchain/" class="portal-btn">
    <span>Go to Blockchain</span>
    <span class="portal-arrow">→</span>
  </a>
</div>
