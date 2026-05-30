/* ==========================================================================
   CORE WORKSPACE ROUTER ENGINE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-pill");
  const viewPanels = document.querySelectorAll(".view-panel");
  
  const appsGrid = document.getElementById("main-apps-grid");
  const browserFrame = document.getElementById("app-browser-frame");
  const appIframe = document.getElementById("app-iframe");
  const browserUrlText = document.getElementById("browser-url-text");
  
  const closeBrowserBtn = document.getElementById("browser-close");
  const refreshBrowserBtn = document.getElementById("browser-refresh");

  // 1. View Switching Router Handler
  navButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetViewId = button.getAttribute("data-target");

      navButtons.forEach(btn => btn.classList.remove("active"));
      viewPanels.forEach(panel => panel.classList.remove("active"));

      button.classList.add("active");
      const activePanel = document.getElementById(targetViewId);
      if (activePanel) {
        activePanel.classList.add("active");
      }
    });
  });

  // 2. Generate Application Selection Cards Dynamically (With Image Overlays)
  if (appsGrid && typeof appsRegistry !== 'undefined') {
    appsGrid.innerHTML = ""; // Clear out old placeholders
    
    appsRegistry.forEach(app => {
      const card = document.createElement("div");
      card.className = "game-card-placeholder";
      
      // If an image link is found in games.js, apply it with a dark lens filter gradient
      if (app.image && app.image.trim() !== "") {
        card.style.backgroundImage = `linear-gradient(to bottom, rgba(20, 20, 20, 0.4), rgba(10, 10, 10, 0.85)), url('${app.image}')`;
        card.style.backgroundSize = "cover";
        card.style.backgroundPosition = "center";
      }
      
      card.innerHTML = `
        <div class="card-icon">${app.icon}</div>
        <h3>${app.name}</h3>
        <p>Launch official mirror workspace.</p>
      `;
      
      // Wire up launch routing action
      card.addEventListener("click", () => {
        browserUrlText.textContent = `secure://hub-internal-sandbox/${app.id}`;
        appIframe.src = app.url;
        appsGrid.style.display = "none";
        browserFrame.style.display = "flex";
      });

      appsGrid.appendChild(card);
    });
  }

  // 3. Browser Utility Header Tool Hooks
  if (closeBrowserBtn) {
    closeBrowserBtn.addEventListener("click", () => {
      appIframe.src = "about:blank"; // Force clean page uncache wipe
      browserFrame.style.display = "none";
      if (appsGrid) appsGrid.style.display = "grid";
    });
  }

  if (refreshBrowserBtn) {
    refreshBrowserBtn.addEventListener("click", () => {
      if (appIframe.src !== "about:blank") {
        appIframe.contentWindow.location.reload();
      }
    });
  }

  /* ==========================================================================
     LIGHTWEIGHT MOUSE TRACKER FOR GHOST CURSOR AURA
     ========================================================================== */
  const aura = document.getElementById("cursor-aura");
  if (aura) {
    document.addEventListener("mousemove", (e) => {
      aura.style.left = e.clientX + "px";
      aura.style.top = e.clientY + "px";
    });
  }
});
