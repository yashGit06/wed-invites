/**
 * Indian Wedding Invitation - Utility Functions
 * Math calculations, date formatting & category icons
 */

window.WeddingApp = window.WeddingApp || {};

(function (App) {
  "use strict";

  /**
   * Calculate Haversine distance in kilometers between two lat/lng coordinates
   */
  function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
    if (lat1 == null || lon1 == null || lat2 == null || lon2 == null)
      return null;
    const R = 6371; // Earth radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Format date into warm editorial style: "Monday · 30 November 2026"
   */
  function formatEditorialDate(dateStr, fallbackDay) {
    if (!dateStr)
      return { formatted: "", dayName: fallbackDay || "", full: "" };
    try {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const d = new Date(year, month, day);
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const dayName = fallbackDay || days[d.getDay()];
        return {
          dayNum: day,
          monthName: months[month],
          year: year,
          dayName: dayName,
          full: `${dayName} · ${day} ${months[month]} ${year}`,
        };
      }
    } catch (e) {
      console.warn("Error formatting date:", e);
    }
    return {
      dayNum: "",
      monthName: "",
      year: "",
      dayName: fallbackDay || "",
      full: dateStr,
    };
  }

  /**
   * Clean titles / formatting
   */
  function formatDisplayName(name) {
    if (!name) return "";
    return name
      .replace(/^MR\.\s+/i, "")
      .replace(/^MS\.\s+/i, "")
      .trim();
  }

  /**
   * Return category SVG icon markup
   */
  function getCategorySVGIcon(category) {
    switch ((category || "").toLowerCase()) {
      case "house":
        return `<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`;
      case "stay":
        return `<svg viewBox="0 0 24 24"><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/></svg>`;
      case "shopping":
        return `<svg viewBox="0 0 24 24"><path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"/></svg>`;
      case "food":
        return `<svg viewBox="0 0 24 24"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg>`;
      case "travel":
        return `<svg viewBox="0 0 24 24"><path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V7h12v4z"/></svg>`;
      case "tourist":
        return `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`;
      default:
        return `<svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
    }
  }

  /**
   * Convert a string to Title Case (e.g. "JOHN DOE" -> "John Doe")
   */
  function toTitleCase(str) {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : ""))
      .join(" ");
  }

  /**
   * Extract first name from full name by removing honorifics
   */
  function extractFirstName(name) {
    if (!name) return "";
    const clean = name
      .replace(/^(MR\.|MS\.|MRS\.|SHRI|SMT\.|DR\.|MR|MS|MRS|SMT|DR)\s+/i, "")
      .trim();
    const parts = clean.split(/\s+/);
    const first = parts[0] || "";
    return toTitleCase(first);
  }

  /**
   * Format formal name with clean Title Case
   */
  function formatFormalName(name) {
    if (!name) return "";
    return toTitleCase(name);
  }

  /**
   * Comprehensive couple details extractor from weddingData
   */
  function getCoupleDetails(weddingData) {
    const data =
      weddingData ||
      (App.state && App.state.weddingData) ||
      App.DEFAULT_DATA ||
      {};
    const groom = data.groom || {};
    const bride = data.bride || {};
    const groomParents = groom.parents || {};
    const brideParents = bride.parents || {};

    const dummyGroom = (App.DUMMY_DATA && App.DUMMY_DATA.groom) || {};
    const dummyBride = (App.DUMMY_DATA && App.DUMMY_DATA.bride) || {};

    const groomFirst = extractFirstName(groom.name) || extractFirstName(dummyGroom.name) || "Groom";
    const brideFirst = extractFirstName(bride.name) || extractFirstName(dummyBride.name) || "Bride";
    const groomFormal = formatFormalName(groom.name) || groom.name || dummyGroom.name || "Groom";
    const brideFormal = formatFormalName(bride.name) || bride.name || dummyBride.name || "Bride";

    const groomInitial = groomFirst.charAt(0).toUpperCase() || "G";
    const brideInitial = brideFirst.charAt(0).toUpperCase() || "B";
    const monogram = `${groomInitial}&${brideInitial}`;
    const coupleNames = `${groomFirst} & ${brideFirst}`;

    // Ceremony event
    const events = data.events || [];
    const ceremonyEvent =
      events.find((e) =>
        (e.name || "").toUpperCase().includes("WEDDING CEREMONY"),
      ) ||
      events[0] ||
      {};

    const dummyEvents = (App.DUMMY_DATA && App.DUMMY_DATA.events) || [];
    const dummyCeremony =
      dummyEvents.find((e) =>
        (e.name || "").toUpperCase().includes("WEDDING CEREMONY"),
      ) ||
      dummyEvents[0] ||
      {};

    const eventDate = ceremonyEvent.date || dummyCeremony.date || "";
    const eventDay = ceremonyEvent.day || dummyCeremony.day || "";
    const dateInfo = formatEditorialDate(eventDate, eventDay);
    const dateBanner =
      dateInfo && dateInfo.full
        ? dateInfo.full.toUpperCase()
        : "";
    const dateShort =
      dateInfo && dateInfo.dayNum && dateInfo.monthName && dateInfo.year
        ? `${dateInfo.dayNum} ${dateInfo.monthName} ${dateInfo.year}`
        : "";
    const dateFull =
      dateInfo &&
      dateInfo.dayName &&
      dateInfo.dayNum &&
      dateInfo.monthName &&
      dateInfo.year
        ? `${dateInfo.dayName}, ${dateInfo.dayNum} ${dateInfo.monthName} ${dateInfo.year}`
        : "";
    const timeDisplay = ceremonyEvent.time || dummyCeremony.time || "";
    const venueDisplay = ceremonyEvent.venue || dummyCeremony.venue || "";

    return {
      groomFirst,
      brideFirst,
      groomFormal,
      brideFormal,
      monogram,
      coupleNames,
      groomRelation: groom.relation || dummyGroom.relation || "Son of",
      brideRelation: bride.relation || dummyBride.relation || "Daughter of",
      groomParentsStr:
        groomParents.father && groomParents.mother
          ? `${groomParents.father} & ${groomParents.mother}`
          : groomParents.father || groomParents.mother || "",
      brideParentsStr:
        brideParents.father && brideParents.mother
          ? `${brideParents.father} & ${brideParents.mother}`
          : brideParents.father || brideParents.mother || "",
      groomFather: groomParents.father || "",
      groomMother: groomParents.mother || "",
      brideFather: brideParents.father || "",
      brideMother: brideParents.mother || "",
      ceremonyEvent,
      dateBanner,
      dateShort,
      dateFull,
      timeDisplay,
      venueDisplay,
    };
  }

  /**
   * Extension-agnostic image resolution in the browser.
   * If any image in assets/images/ fails to load, attempts alternative extensions automatically.
   */
  function enableExtensionAgnosticImageLoading() {
    const commonExts = [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".JPG",
      ".PNG",
      ".JPEG",
      ".avif",
    ];
    document.querySelectorAll("img").forEach((img) => {
      if (img.dataset.extAgnosticAttached) return;
      img.dataset.extAgnosticAttached = "true";

      img.addEventListener("error", function onImageError() {
        const currentSrc = this.getAttribute("src");
        if (!currentSrc || !currentSrc.includes("assets/images/")) return;

        let attempted = [];
        try {
          attempted = JSON.parse(this.dataset.attemptedExts || "[]");
        } catch (e) {
          attempted = [];
        }

        const url = new URL(currentSrc, window.location.href);
        const pathname = decodeURIComponent(url.pathname);
        const lastSlash = pathname.lastIndexOf("/");
        const filename = pathname.substring(lastSlash + 1);
        const lastDot = filename.lastIndexOf(".");
        if (lastDot === -1) return;

        const baseName = filename.substring(0, lastDot);
        const curExt = filename.substring(lastDot);

        if (!attempted.includes(curExt.toLowerCase())) {
          attempted.push(curExt.toLowerCase());
        }

        const nextExt = commonExts.find(
          (ext) => !attempted.includes(ext.toLowerCase()),
        );
        if (nextExt) {
          attempted.push(nextExt.toLowerCase());
          this.dataset.attemptedExts = JSON.stringify(attempted);
          const dir = currentSrc.substring(0, currentSrc.lastIndexOf("/") + 1);
          this.src = `${dir}${encodeURIComponent(baseName)}${nextExt}`;
        }
      });
    });
  }

  // Export to namespace
  App.calculateHaversineDistance = calculateHaversineDistance;
  App.formatEditorialDate = formatEditorialDate;
  App.formatDisplayName = formatDisplayName;
  App.getCategorySVGIcon = getCategorySVGIcon;
  App.toTitleCase = toTitleCase;
  App.extractFirstName = extractFirstName;
  App.formatFormalName = formatFormalName;
  App.getCoupleDetails = getCoupleDetails;
  App.enableExtensionAgnosticImageLoading = enableExtensionAgnosticImageLoading;
})(window.WeddingApp);
