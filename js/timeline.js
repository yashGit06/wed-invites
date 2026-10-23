/**
 * Indian Wedding Invitation - Celebrations Timeline
 */

window.WeddingApp = window.WeddingApp || {};

(function (App) {
  "use strict";

  function renderCelebrationsTimeline() {
    const timelineContainer = document.getElementById(
      "timeline-items-container",
    );
    if (!timelineContainer) return;

    const weddingData = App.state.weddingData || App.DEFAULT_DATA;
    const events = (weddingData.events || []).slice();

    // Sort chronologically if dates exist
    events.sort((a, b) => {
      const dateA = a.date || "";
      const dateB = b.date || "";
      return dateA.localeCompare(dateB);
    });

    timelineContainer.innerHTML = "";

    events.forEach((ev, idx) => {
      const dateInfo = App.formatEditorialDate(ev.date, ev.day);
      const isWeddingCeremony = (ev.name || "")
        .toUpperCase()
        .includes("WEDDING CEREMONY");

      const itemEl = document.createElement("div");
      itemEl.className = `timeline-item ${isWeddingCeremony ? "principal-event" : ""}`;

      const timeDisplay = ev.time ? ev.time : "Auspicious Hours";
      const venueDisplay = ev.venue || "Wedding Venue";

      // Calendar URL generation for wedding celebrations
      const couple = App.getCoupleDetails
        ? App.getCoupleDetails(weddingData)
        : { coupleNames: "Wedding" };
      const calTitle = encodeURIComponent(
        `${ev.name} - ${couple.coupleNames} Celebrations`,
      );
      const calDetails = encodeURIComponent(
        `Wedding celebration event: ${ev.name}\nVenue: ${venueDisplay}\nTime: ${timeDisplay}`,
      );
      const calDates = ev.date
        ? `${ev.date.replace(/-/g, "")}T120000Z/${ev.date.replace(/-/g, "")}T150000Z`
        : "";
      const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&details=${calDetails}&dates=${calDates}`;

      // Google Maps Destination Coordinates dynamically looked up from Data.json locations
      const locations = weddingData.locations || [];
      const groomLoc = locations.find(
        (l) => (l.name || "").toLowerCase() === "groom",
      );
      const brideLoc = locations.find(
        (l) => (l.name || "").toLowerCase() === "bride",
      );

      let venueCoords = "";
      if (
        venueDisplay.toLowerCase().includes("bride") &&
        brideLoc &&
        brideLoc.coordinates
      ) {
        venueCoords = `${brideLoc.coordinates.latitude},${brideLoc.coordinates.longitude}`;
      } else if (groomLoc && groomLoc.coordinates) {
        venueCoords = `${groomLoc.coordinates.latitude},${groomLoc.coordinates.longitude}`;
      } else if (locations.length > 0 && locations[0].coordinates) {
        venueCoords = `${locations[0].coordinates.latitude},${locations[0].coordinates.longitude}`;
      }

      const gmapVenueUrl = venueCoords
        ? `https://www.google.com/maps/dir/?api=1&destination=${venueCoords}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueDisplay)}`;

      itemEl.innerHTML = `
        <div class="timeline-marker-node" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
        
        <div class="timeline-date-side">
          <div class="date-number">${dateInfo.dayNum || idx + 1}</div>
          <div class="date-month-year">${dateInfo.monthName || ""} ${dateInfo.year || ""}</div>
          <div class="date-day">${dateInfo.dayName || ""}</div>
        </div>

        <div class="timeline-card">
          <!-- Mobile Date Header Strip -->
          <div class="timeline-mobile-date-strip">
            <span>${dateInfo.dayName || "Celebration"}</span>
            <span>${dateInfo.dayNum || idx + 1} ${dateInfo.monthName || ""} ${dateInfo.year || ""}</span>
          </div>

          ${
            isWeddingCeremony
              ? `<div class="event-category-badge"><span class="gradient-badge">⭐ Main Auspicious Ceremony</span></div>`
              : `<div class="event-category-badge">${ev.day || "Celebration"}</div>`
          }
          <h3 class="event-title">${ev.name}</h3>
          
          <ul class="event-details-list">
            <li class="event-detail-row">
              <svg class="event-detail-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
              </svg>
              <span><strong>Time:</strong> ${timeDisplay}</span>
            </li>
            <li class="event-detail-row">
              <svg class="event-detail-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span><strong>Venue:</strong> ${venueDisplay}</span>
            </li>
          </ul>

          <div class="event-actions">
            <a href="${googleCalUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" title="Add ${ev.name} to Google Calendar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 4H7v-2h2v2zm4-4h-2v-2h2v2zm4 0h-2v-2h2v2z"/></svg>
              Save to Calendar
            </a>
            <a href="${gmapVenueUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-gold btn-sm timeline-map-btn" title="Open ${venueDisplay} in Google Maps">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              Open in Google Maps ↗
            </a>
          </div>
        </div>
      `;

      timelineContainer.appendChild(itemEl);
    });
  }

  App.renderCelebrationsTimeline = renderCelebrationsTimeline;
})(window.WeddingApp);
