/* ==========================================================================
   CORE WORKSPACE ROUTER ENGINE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-pill");
  const viewPanels = document.querySelectorAll(".view-panel");

  navButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetViewId = button.getAttribute("data-target");

      // 1. Clear Active Pill Classes
      navButtons.forEach(btn => btn.classList.remove("active"));
      // 2. Hide All Views
      viewPanels.forEach(panel => panel.classList.remove("active"));

      // 3. Activate Current View Target Elements
      button.classList.add("active");
      const activePanel = document.getElementById(targetViewId);
      if (activePanel) {
        activePanel.classList.add("active");
      }
    });
  });

  /* ==========================================================================
     LIGHTWEIGHT MOUSE TRACKER FOR GHOST CURSOR AURA
     ========================================================================== */
  const aura = document.getElementById("cursor-aura");
  if (aura) {
    document.addEventListener("mousemove", (e) => {
      // Direct hardware rendering adjustments
      aura.style.left = e.clientX + "px";
      aura.style.top = e.clientY + "px";
    });
  }
});
