/* ==========================================================================
   SYSTEM TIMER DISPLAY LOOP MODULE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const clockElement = document.getElementById("system-time-display");

  function updateSystemClock() {
    if (!clockElement) return;
    
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // Formats midnight hour safely
    const formattedHours = String(hours).padStart(2, '0');

    clockElement.textContent = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
  }

  // Fire up the interval sequence tracking engine immediately
  updateSystemClock();
  setInterval(updateSystemClock, 1000);
});
