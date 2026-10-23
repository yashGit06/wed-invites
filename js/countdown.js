/**
 * Indian Wedding Invitation - Muhurat Countdown Timer
 */

window.WeddingApp = window.WeddingApp || {};

(function (App) {
  "use strict";

  function setupCountdown() {
    const daysEl = document.getElementById("count-days");
    const hoursEl = document.getElementById("count-hours");
    const minutesEl = document.getElementById("count-minutes");
    const secondsEl = document.getElementById("count-seconds");
    const countdownGrid = document.getElementById("countdown-grid");
    const pastMsgEl = document.getElementById("countdown-past-msg");

    const weddingData = App.state.weddingData || App.DEFAULT_DATA;

    // Target the Wedding Ceremony event specifically (or fallback to dummy ceremony)
    const dummyCeremony =
      (App.DUMMY_DATA &&
        App.DUMMY_DATA.events &&
        App.DUMMY_DATA.events.find((e) =>
          (e.name || "").toUpperCase().includes("WEDDING CEREMONY"),
        )) ||
      (App.DUMMY_DATA && App.DUMMY_DATA.events ? App.DUMMY_DATA.events[0] : null);

    const ceremonyEvent =
      (weddingData.events || []).find((e) =>
        (e.name || "").toUpperCase().includes("WEDDING CEREMONY"),
      ) || dummyCeremony;

    const eventDate = (ceremonyEvent && ceremonyEvent.date) || (dummyCeremony && dummyCeremony.date) || "2026-11-30";
    const eventTimeStr = (ceremonyEvent && ceremonyEvent.time) || (dummyCeremony && dummyCeremony.time) || "10:00 PM";

    let hour = 22;
    let min = 0;
    if (eventTimeStr) {
      const timeMatch = eventTimeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
      if (timeMatch) {
        let h = parseInt(timeMatch[1], 10);
        const m = parseInt(timeMatch[2], 10);
        const ampm = (timeMatch[3] || "").toUpperCase();
        if (ampm === "PM" && h < 12) h += 12;
        if (ampm === "AM" && h === 12) h = 0;
        hour = h;
        min = m;
      }
    }

    let targetTime = Date.parse(
      `${eventDate}T${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}:00+05:30`,
    );

    function updateTimer() {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        if (countdownGrid) countdownGrid.style.display = "none";
        if (pastMsgEl) {
          pastMsgEl.style.display = "block";
          pastMsgEl.textContent =
            "The celebrations have begun · With love, from our wedding day";
        }
        if (App.state.countdownTimerId) {
          clearInterval(App.state.countdownTimerId);
        }
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
    }

    updateTimer();
    if (App.state.countdownTimerId) {
      clearInterval(App.state.countdownTimerId);
    }
    App.state.countdownTimerId = setInterval(updateTimer, 1000);
  }

  App.setupCountdown = setupCountdown;
})(window.WeddingApp);
