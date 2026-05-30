document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-pill");
  const viewPanels = document.querySelectorAll(".view-panel");
  
  const gamesGrid = document.getElementById("main-games-grid");
  const appsGrid = document.getElementById("main-apps-grid");
  const appsPageHeader = document.getElementById("apps-page-header");
  const browserFrame = document.getElementById("app-browser-frame");
  const appIframe = document.getElementById("app-iframe");
  const browserUrlText = document.getElementById("browser-url-text");
  
  const closeBrowserBtn = document.getElementById("browser-close");
  const refreshBrowserBtn = document.getElementById("browser-refresh");

  // 1. Navigation Panel Routing Logic Engine
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

  // Helper function to build cards with premium dark gradient lenses
  function buildDynamicCards(registryArray, targetGridElement, isAppBrowser = false) {
    if (!targetGridElement || typeof registryArray === 'undefined') return;
    targetGridElement.innerHTML = "";
    
    registryArray.forEach(item => {
      const card = document.createElement("div");
      card.className = "game-card-placeholder";
      
      if (item.image && item.image.trim() !== "") {
        card.style.backgroundImage = `linear-gradient(to bottom, rgba(15, 15, 15, 0.15), rgba(10, 10, 10, 0.9)), url('${item.image}')`;
        card.style.backgroundSize = "cover";
        card.style.backgroundPosition = "center";
      }
      
      card.innerHTML = `
        <div class="card-icon">${item.icon}</div>
        <h3>${item.name}</h3>
        <p>${isAppBrowser ? 'Launch web workspace panel.' : 'Launch instant game frame.'}</p>
      `;
      
      card.addEventListener("click", () => {
        if (isAppBrowser) {
          browserUrlText.textContent = `secure://hub-internal-sandbox/${item.id}`;
          appIframe.src = item.url;
          appsGrid.style.display = "none";
          appsPageHeader.style.display = "none";
          browserFrame.style.display = "flex";
        } else {
          // Future Game activation loop hook logic area
          alert(`Loading ${item.name}...`);
        }
      });

      targetGridElement.appendChild(card);
    });
  }

  // 2. Initialize and Render Grid Elements
  buildDynamicCards(gamesRegistry, gamesGrid, false);
  buildDynamicCards(appsRegistry, appsGrid, true);

  // 3. Browser Iframe Container Operations Controller
  if (closeBrowserBtn) {
    closeBrowserBtn.addEventListener("click", () => {
      appIframe.src = "about:blank";
      browserFrame.style.display = "none";
      if (appsGrid) appsGrid.style.display = "grid";
      if (appsPageHeader) appsPageHeader.style.display = "block";
    });
  }

  if (refreshBrowserBtn) {
    refreshBrowserBtn.addEventListener("click", () => {
      if (appIframe.src !== "about:blank") {
        appIframe.contentWindow.location.reload();
      }
    });
  }

  // 4. Cursor Follow Aura Tracking Engine
  const aura = document.getElementById("cursor-aura");
  if (aura) {
    document.addEventListener("mousemove", (e) => {
      aura.style.left = e.clientX + "px";
      aura.style.top = e.clientY + "px";
    });
  }
});
