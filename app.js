/**
 * Indian Wedding Invitation - Bundled Application Logic
 * Generated automatically by build.js
 * All wedding data fetched dynamically at runtime
 */

// --- Module: js/utils.js ---
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

// --- Module: js/dataProcess.js ---
/**
 * Indian Wedding Invitation - In-Memory Data Processor
 * Automatically normalizes Data.json into the processedData variable in memory.
 * Preserves the exact structure of Data.json.
 * Uses dummyData.json dynamically for any missing fields or fallbacks.
 * Zero hardcoded values in code.
 */

window.WeddingApp = window.WeddingApp || {};

(function (App) {
  "use strict";

  // DUMMY_DATA reference populated dynamically from dummyData.json at runtime
  let DUMMY_DATA = null;

  function isNonEmptyString(val) {
    return typeof val === "string" && val.trim().length > 0;
  }

  /**
   * Processes wedding data in memory and creates processedData variable
   * with exact Data.json structure.
   * Dynamically uses loaded dummyData from dummyData.json as fallback source.
   */
  function processWeddingData(inputData, customFallbacks) {
    const fallbacks =
      (customFallbacks && typeof customFallbacks === "object" ? customFallbacks : null) ||
      App.DUMMY_DATA ||
      DUMMY_DATA ||
      {};

    const raw =
      inputData && typeof inputData === "object" && !Array.isArray(inputData)
        ? inputData
        : {};

    // 1. Groom
    const rawGroom =
      raw.groom && typeof raw.groom === "object" ? raw.groom : {};
    const rawGroomParents =
      rawGroom.parents && typeof rawGroom.parents === "object"
        ? rawGroom.parents
        : {};
    const dummyGroom =
      fallbacks.groom && typeof fallbacks.groom === "object"
        ? fallbacks.groom
        : {};
    const dummyGroomParents =
      dummyGroom.parents && typeof dummyGroom.parents === "object"
        ? dummyGroom.parents
        : {};

    const groom = {
      name: isNonEmptyString(rawGroom.name)
        ? rawGroom.name.trim()
        : dummyGroom.name || "",
      relation: isNonEmptyString(rawGroom.relation)
        ? rawGroom.relation.trim()
        : dummyGroom.relation || "",
      parents: {
        father: isNonEmptyString(rawGroomParents.father)
          ? rawGroomParents.father.trim()
          : dummyGroomParents.father || "",
        mother: isNonEmptyString(rawGroomParents.mother)
          ? rawGroomParents.mother.trim()
          : dummyGroomParents.mother || "",
      },
    };

    // 2. Bride
    const rawBride =
      raw.bride && typeof raw.bride === "object" ? raw.bride : {};
    const rawBrideParents =
      rawBride.parents && typeof rawBride.parents === "object"
        ? rawBride.parents
        : {};
    const dummyBride =
      fallbacks.bride && typeof fallbacks.bride === "object"
        ? fallbacks.bride
        : {};
    const dummyBrideParents =
      dummyBride.parents && typeof dummyBride.parents === "object"
        ? dummyBride.parents
        : {};

    const bride = {
      name: isNonEmptyString(rawBride.name)
        ? rawBride.name.trim()
        : dummyBride.name || "",
      relation: isNonEmptyString(rawBride.relation)
        ? rawBride.relation.trim()
        : dummyBride.relation || "",
      parents: {
        father: isNonEmptyString(rawBrideParents.father)
          ? rawBrideParents.father.trim()
          : dummyBrideParents.father || "",
        mother: isNonEmptyString(rawBrideParents.mother)
          ? rawBrideParents.mother.trim()
          : dummyBrideParents.mother || "",
      },
    };

    // 3. Events
    const fallbackEvents = Array.isArray(fallbacks.events)
      ? fallbacks.events
      : [];
    let events = [];
    if (Array.isArray(raw.events) && raw.events.length > 0) {
      events = raw.events.map((ev, idx) => {
        const dummyEv = fallbackEvents[idx] || fallbackEvents[0] || {};
        if (!ev || typeof ev !== "object") {
          return {
            name: dummyEv.name || `Ceremony ${idx + 1}`,
            date: dummyEv.date || "",
            day: dummyEv.day || "",
            time: dummyEv.time !== undefined ? dummyEv.time : null,
            venue: dummyEv.venue || "",
          };
        }
        return {
          name: isNonEmptyString(ev.name)
            ? ev.name.trim()
            : dummyEv.name || `Ceremony ${idx + 1}`,
          date: isNonEmptyString(ev.date)
            ? ev.date.trim()
            : dummyEv.date || "",
          day: isNonEmptyString(ev.day)
            ? ev.day.trim()
            : dummyEv.day || "",
          time: isNonEmptyString(ev.time)
            ? ev.time.trim()
            : dummyEv.time !== undefined
              ? dummyEv.time
              : null,
          venue: isNonEmptyString(ev.venue)
            ? ev.venue.trim()
            : dummyEv.venue || "",
        };
      });
    } else if (fallbackEvents.length > 0) {
      events = JSON.parse(JSON.stringify(fallbackEvents));
    }

    // 4. Locations
    const fallbackLocations = Array.isArray(fallbacks.locations)
      ? fallbacks.locations
      : [];
    let locations = [];
    if (Array.isArray(raw.locations) && raw.locations.length > 0) {
      locations = raw.locations.map((loc, idx) => {
        const dummyLoc = fallbackLocations[idx] || fallbackLocations[0] || {};
        const dummyCoords = dummyLoc.coordinates || {};
        if (!loc || typeof loc !== "object") {
          return {
            name: dummyLoc.name || `Location ${idx + 1}`,
            category: dummyLoc.category || "Stay",
            coordinates: {
              latitude:
                typeof dummyCoords.latitude === "number"
                  ? dummyCoords.latitude
                  : 0,
              longitude:
                typeof dummyCoords.longitude === "number"
                  ? dummyCoords.longitude
                  : 0,
            },
          };
        }
        const coords =
          loc.coordinates && typeof loc.coordinates === "object"
            ? loc.coordinates
            : {};
        const lat =
          typeof coords.latitude === "number"
            ? coords.latitude
            : parseFloat(coords.latitude) ||
              (typeof dummyCoords.latitude === "number"
                ? dummyCoords.latitude
                : 0);
        const lng =
          typeof coords.longitude === "number"
            ? coords.longitude
            : parseFloat(coords.longitude) ||
              (typeof dummyCoords.longitude === "number"
                ? dummyCoords.longitude
                : 0);

        return {
          name: isNonEmptyString(loc.name)
            ? loc.name.trim()
            : dummyLoc.name || `Location ${idx + 1}`,
          category: isNonEmptyString(loc.category)
            ? loc.category.trim()
            : dummyLoc.category || "Stay",
          coordinates: {
            latitude: lat,
            longitude: lng,
          },
        };
      });
    } else if (fallbackLocations.length > 0) {
      locations = JSON.parse(JSON.stringify(fallbackLocations));
    }

    // In-memory processedData variable
    const processedData = {
      events,
      locations,
      groom,
      bride,
    };

    // Expose processedData variable
    App.processedData = processedData;
    if (typeof window !== "undefined") {
      window.processedData = processedData;
    }

    return processedData;
  }

  function setDummyData(data) {
    DUMMY_DATA = data;
    App.DUMMY_DATA = data;
  }

  App.setDummyData = setDummyData;
  App.processWeddingData = processWeddingData;
})(window.WeddingApp);

// --- Module: js/data.js ---
/**
 * Indian Wedding Invitation - Data & State Management
 * Single Source of Truth: All events, locations, groom, and bride are fetched from Data.json
 */

window.WeddingApp = window.WeddingApp || {};

(function (App) {
  "use strict";

  // Schema baseline contract
  const EMPTY_WEDDING_DATA = {
    events: [],
    locations: [],
    groom: {
      name: "",
      relation: "",
      parents: {
        father: "",
        mother: "",
      },
    },
    bride: {
      name: "",
      relation: "",
      parents: {
        father: "",
        mother: "",
      },
    },
  };

  // Shared Application State
  const state = {
    weddingData: EMPTY_WEDDING_DATA,
    activeCategory: "All",
    searchQuery: "",
    radiusFilterMode: "all", // "all" (shows all with radius status) or "within" (strictly <= 15 km)
    selectedCenterKey: "groom", // Default center is Groom's address
    RADIUS_KM: 15,
    RADIUS_METERS: 15000,
    leafletMap: null,
    radiusCircle: null,
    markerInstances: [],
    countdownTimerId: null,
  };

  /**
   * Resolve GPS center point based on selected key ("groom" vs "bride")
   */
  function getCenterCoordinates(centerKey) {
    const locations = (state.weddingData && state.weddingData.locations) || [];
    const groomName = (state.weddingData && state.weddingData.groom && state.weddingData.groom.name) || "";
    const brideName = (state.weddingData && state.weddingData.bride && state.weddingData.bride.name) || "";
    const groomFirst = (App.extractFirstName ? App.extractFirstName(groomName) : "").toLowerCase();
    const brideFirst = (App.extractFirstName ? App.extractFirstName(brideName) : "").toLowerCase();

    const houseLocations = locations.filter(
      (l) => (l.category || "").toLowerCase() === "house",
    );

    const groomLoc =
      locations.find((l) => {
        const n = (l.name || "").toLowerCase();
        return (
          n === "groom" ||
          n.includes("groom") ||
          (groomFirst && n.includes(groomFirst))
        );
      }) ||
      houseLocations[0] ||
      locations[0];

    const brideLoc =
      locations.find((l) => {
        const n = (l.name || "").toLowerCase();
        return (
          n === "bride" ||
          n.includes("bride") ||
          (brideFirst && n.includes(brideFirst))
        );
      }) ||
      houseLocations[1] ||
      houseLocations[0] ||
      locations[0];

    if (centerKey === "groom" && groomLoc && groomLoc.coordinates) {
      return {
        name: groomLoc.name || "Groom's Location",
        lat: groomLoc.coordinates.latitude,
        lng: groomLoc.coordinates.longitude,
      };
    }

    if (brideLoc && brideLoc.coordinates) {
      return {
        name: brideLoc.name || "Bride's Location",
        lat: brideLoc.coordinates.latitude,
        lng: brideLoc.coordinates.longitude,
      };
    }

    if (groomLoc && groomLoc.coordinates) {
      return {
        name: groomLoc.name || "Groom's Location",
        lat: groomLoc.coordinates.latitude,
        lng: groomLoc.coordinates.longitude,
      };
    }

    if (locations.length > 0 && locations[0].coordinates) {
      return {
        name: locations[0].name || "Venue Location",
        lat: locations[0].coordinates.latitude,
        lng: locations[0].coordinates.longitude,
      };
    }

    return null;
  }

  /**
   * Automatically fetch dummyData.json and Data.json, processing into in-memory processedData variable
   */
  async function loadData() {
    let dummyData = null;
    try {
      const dummyRes = await fetch(`./dummyData.json?t=${Date.now()}`);
      if (dummyRes.ok) {
        dummyData = await dummyRes.json();
        App.DUMMY_DATA = dummyData;
        if (typeof App.setDummyData === "function") {
          App.setDummyData(dummyData);
        }
      }
    } catch (e) {
      console.warn("Using baseline dummy fallbacks", e);
    }

    try {
      const response = await fetch(`./Data.json?t=${Date.now()}`);
      if (!response.ok) {
        throw new Error(
          `Failed to load Data.json: HTTP ${response.status} ${response.statusText}`,
        );
      }
      const rawJson = await response.json();
      if (!rawJson || typeof rawJson !== "object" || Array.isArray(rawJson)) {
        throw new Error(
          "Invalid Data.json structure: expected a JSON object",
        );
      }

      // Automatically process into processedData variable with dummy fallbacks
      const processedData = App.processWeddingData
        ? App.processWeddingData(rawJson, dummyData)
        : rawJson;

      state.weddingData = processedData;
      App.processedData = processedData;
      if (typeof window !== "undefined") {
        window.processedData = processedData;
      }
    } catch (err) {
      console.warn("Unable to fetch Data.json, falling back to dummyData.json.", err);
      const fallback = dummyData || App.DUMMY_DATA;
      const processedData = App.processWeddingData
        ? App.processWeddingData(null, fallback)
        : fallback;

      state.weddingData = processedData;
      App.processedData = processedData;
      if (typeof window !== "undefined") {
        window.processedData = processedData;
      }
    }
  }

  // Export to namespace
  App.DEFAULT_DATA = EMPTY_WEDDING_DATA;
  App.state = state;
  App.getCenterCoordinates = getCenterCoordinates;
  App.loadData = loadData;
})(window.WeddingApp);

// --- Module: js/navigation.js ---
/**
 * Indian Wedding Invitation - Navigation & Interactions
 */

window.WeddingApp = window.WeddingApp || {};

(function (App) {
  "use strict";

  function setupNavigation() {
    const header = document.querySelector(".site-header");
    const mobileToggle = document.querySelector(".mobile-nav-toggle");
    const mobileDrawer = document.querySelector(".mobile-menu-drawer");

    // Sticky shadow on scroll
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        if (header) header.classList.add("scrolled");
      } else {
        if (header) header.classList.remove("scrolled");
      }
    });

    // Mobile nav toggle
    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener("click", () => {
        mobileDrawer.classList.toggle("open");
        const isOpen = mobileDrawer.classList.contains("open");
        mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });

      // Close mobile nav on click
      mobileDrawer.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          mobileDrawer.classList.remove("open");
          mobileToggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    // Reset filters button in empty state
    const resetFiltersBtn = document.getElementById("reset-filters-btn");
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener("click", () => {
        App.state.activeCategory = "All";
        App.state.searchQuery = "";
        App.state.radiusFilterMode = "all";
        const searchInput = document.getElementById("places-search-input");
        if (searchInput) searchInput.value = "";
        const clearBtn = document.getElementById("search-clear-btn");
        if (clearBtn) clearBtn.style.display = "none";

        const chips = document.querySelectorAll(".category-chip");
        chips.forEach((c) => {
          if (c.getAttribute("data-category") === "All")
            c.classList.add("active");
          else c.classList.remove("active");
        });

        const btnModeAll = document.getElementById("btn-mode-all");
        const btnModeWithin = document.getElementById("btn-mode-within");
        if (btnModeAll) {
          btnModeAll.classList.add("active");
          btnModeAll.setAttribute("aria-pressed", "true");
        }
        if (btnModeWithin) {
          btnModeWithin.classList.remove("active");
          btnModeWithin.setAttribute("aria-pressed", "false");
        }

        if (typeof App.updateDirectoryAndMap === "function") {
          App.updateDirectoryAndMap();
        }
      });
    }
  }

  App.setupNavigation = setupNavigation;
})(window.WeddingApp);

// --- Module: js/couple.js ---
/**
 * Indian Wedding Invitation - Couple Profiles & Dynamic Data Rendering
 * Populates all couple, family, date, and branding elements dynamically from Data.json
 */

window.WeddingApp = window.WeddingApp || {};

(function (App) {
  "use strict";

  function renderAllDynamicData() {
    const weddingData = App.state.weddingData || App.DEFAULT_DATA;
    const couple = App.getCoupleDetails
      ? App.getCoupleDetails(weddingData)
      : {
          groomFirst: "",
          brideFirst: "",
          groomFormal: "",
          brideFormal: "",
          monogram: "",
          coupleNames: "",
          groomRelation: "",
          brideRelation: "",
          groomParentsStr: "",
          brideParentsStr: "",
          groomFather: "",
          groomMother: "",
          brideFather: "",
          brideMother: "",
          dateBanner: "",
          dateShort: "",
          dateFull: "",
          timeDisplay: "",
          venueDisplay: "",
          ceremonyEvent: {},
        };

    // 1. Page Title & Meta Description
    if (couple.coupleNames) {
      document.title = `${couple.coupleNames} — Wedding Invitation & Celebrations`;
    }
    const metaDesc =
      document.getElementById("meta-description") ||
      document.querySelector('meta[name="description"]');
    if (metaDesc && couple.coupleNames) {
      metaDesc.setAttribute(
        "content",
        `Joyfully celebrating the wedding of ${couple.groomFormal} and ${couple.brideFormal} on ${couple.dateFull}. Explore celebrations, timeline, places directory, and venue map.`,
      );
    }

    // 2. Navigation Monogram & Brand
    const navMonogram = document.getElementById("nav-monogram");
    if (navMonogram) navMonogram.textContent = couple.monogram;

    const navBrandText = document.getElementById("nav-brand-text");
    if (navBrandText) {
      navBrandText.innerHTML = `${couple.groomFirst} <span>&amp;</span> ${couple.brideFirst}`;
    }

    const navMonogramLink = document.getElementById("nav-monogram-link");
    if (navMonogramLink) {
      navMonogramLink.setAttribute(
        "aria-label",
        `${couple.coupleNames} Wedding Invitation Home`,
      );
    }

    // 3. Hero Section
    const heroCoupleNames =
      document.getElementById("hero-couple-names") ||
      document.getElementById("invitation-heading");
    if (heroCoupleNames) {
      heroCoupleNames.innerHTML = `${couple.groomFirst} <span class="ampersand">&amp;</span> ${couple.brideFirst}`;
    }

    const heroFormalNames = document.getElementById("hero-formal-names");
    if (heroFormalNames) {
      heroFormalNames.textContent = `${couple.groomFormal} & ${couple.brideFormal}`;
    }

    const heroFamilyStatement = document.getElementById(
      "hero-family-statement",
    );
    if (heroFamilyStatement) {
      heroFamilyStatement.innerHTML = `
        ${couple.groomRelation} <strong>${couple.groomFather}</strong> &amp; <strong>${couple.groomMother}</strong><br />
        and ${couple.brideRelation} <strong>${couple.brideFather}</strong> &amp; <strong>${couple.brideMother}</strong>
      `;
    }

    const heroDateText = document.getElementById("hero-date-text");
    if (heroDateText) {
      heroDateText.textContent = couple.dateBanner;
    }

    const heroLandscapeImg = document.getElementById("hero-landscape-img");
    if (heroLandscapeImg) {
      heroLandscapeImg.alt = `Couple portrait of ${couple.groomFormal} and ${couple.brideFormal}`;
    }

    // 4. Countdown Target & Calendar Action
    const countdownTargetLabel = document.getElementById(
      "countdown-target-label",
    );
    if (countdownTargetLabel) {
      countdownTargetLabel.innerHTML = `${couple.dateFull} &nbsp;•&nbsp; ${couple.timeDisplay} IST (${couple.venueDisplay})`;
    }

    const countdownCalLink = document.getElementById("countdown-calendar-link");
    if (countdownCalLink) {
      const calTitle = encodeURIComponent(
        `${couple.coupleNames} Wedding Ceremony`,
      );
      const calDetails = encodeURIComponent(
        `Wedding Ceremony of ${couple.groomFormal} and ${couple.brideFormal}\nVenue: ${couple.venueDisplay}\nTime: ${couple.timeDisplay}`,
      );
      const calLoc = encodeURIComponent(couple.venueDisplay);
      const evDate =
        couple.ceremonyEvent && couple.ceremonyEvent.date
          ? couple.ceremonyEvent.date.replace(/-/g, "")
          : "20261130";
      countdownCalLink.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&dates=${evDate}T163000Z/${evDate}T203000Z&details=${calDetails}&location=${calLoc}`;
    }

    // 5. Couple Cards
    const groom = weddingData.groom || App.DEFAULT_DATA.groom || {};
    const bride = weddingData.bride || App.DEFAULT_DATA.bride || {};

    const groomNameEl = document.getElementById("groom-name");
    const groomRelationEl = document.getElementById("groom-relation");
    const groomParentsEl = document.getElementById("groom-parents");

    if (groomNameEl) groomNameEl.textContent = groom.name || couple.groomFormal;
    if (groomRelationEl)
      groomRelationEl.textContent = groom.relation || couple.groomRelation;
    if (groomParentsEl) groomParentsEl.textContent = couple.groomParentsStr;

    const brideNameEl = document.getElementById("bride-name");
    const brideRelationEl = document.getElementById("bride-relation");
    const brideParentsEl = document.getElementById("bride-parents");

    if (brideNameEl) brideNameEl.textContent = bride.name || couple.brideFormal;
    if (brideRelationEl)
      brideRelationEl.textContent = bride.relation || couple.brideRelation;
    if (brideParentsEl) brideParentsEl.textContent = couple.brideParentsStr;

    // Alt text for portraits
    const groomImg = document.getElementById("groom-portrait-img");
    if (groomImg) groomImg.alt = `Portrait of Groom ${couple.groomFormal}`;

    const brideImg = document.getElementById("bride-portrait-img");
    if (brideImg) brideImg.alt = `Portrait of Bride ${couple.brideFormal}`;

    const couplePortraitImg = document.getElementById("couple-portrait-img");
    if (couplePortraitImg) {
      couplePortraitImg.alt = `Intimate portrait of ${couple.groomFirst} and ${couple.brideFirst}`;
    }

    // 6. Footer Section
    const footerCoupleName = document.getElementById("footer-couple-name");
    if (footerCoupleName) {
      footerCoupleName.innerHTML = `${couple.groomFirst} &amp; ${couple.brideFirst}`;
    }

    const footerDate = document.getElementById("footer-date");
    if (footerDate) {
      footerDate.innerHTML = `${couple.dateShort} &nbsp;•&nbsp; Shubh Vivah`;
    }

    const footerBlessing = document.getElementById("footer-blessing");
    if (footerBlessing) {
      footerBlessing.textContent = `Made with love for ${couple.coupleNames}'s Wedding Celebrations`;
    }

    // 7. RSVP Section
    const rsvpDateText = document.getElementById("rsvp-date-text");
    if (rsvpDateText) {
      rsvpDateText.innerHTML = `${couple.dateFull} &nbsp;•&nbsp; Shubh Vivah`;
    }
  }

  function renderCoupleProfiles() {
    renderAllDynamicData();
  }

  App.renderAllDynamicData = renderAllDynamicData;
  App.renderCoupleProfiles = renderCoupleProfiles;
})(window.WeddingApp);

// --- Module: js/timeline.js ---
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

// --- Module: js/countdown.js ---
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

// --- Module: js/map.js ---
/**
 * Indian Wedding Invitation - Interactive Leaflet Map & Markers
 */

window.WeddingApp = window.WeddingApp || {};

(function (App) {
  "use strict";

  function initializeMap() {
    const mapEl = document.getElementById("wedding-map");
    if (!mapEl || typeof L === "undefined") return;

    const centerInfo = App.getCenterCoordinates(App.state.selectedCenterKey);
    if (!centerInfo) return;

    if (App.state.leafletMap) {
      App.state.leafletMap.remove();
      App.state.leafletMap = null;
    }

    const map = L.map("wedding-map", {
      center: [centerInfo.lat, centerInfo.lng],
      zoom: 12,
      scrollWheelZoom: false,
    });
    App.state.leafletMap = map;

    // OpenStreetMap Warm Editorial Tile Layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // 15 km Radius Circle
    App.state.radiusCircle = L.circle([centerInfo.lat, centerInfo.lng], {
      color: "#2273B3",
      weight: 2,
      dashArray: "6, 8",
      fillColor: "#A9A4DB",
      fillOpacity: 0.12,
      radius: App.state.RADIUS_METERS, // 15 km in meters
    }).addTo(map);

    // Legend / Title for center
    const centerNameEl = document.getElementById("current-center-name");
    if (centerNameEl) {
      centerNameEl.textContent = centerInfo.name;
    }

    // Refresh layout on container resize or scroll into view
    setTimeout(() => {
      if (App.state.leafletMap) App.state.leafletMap.invalidateSize();
    }, 400);

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && App.state.leafletMap) {
              App.state.leafletMap.invalidateSize();
            }
          });
        },
        { threshold: 0.1 },
      );
      observer.observe(mapEl);
    }
  }

  function switchCenter(centerKey) {
    App.state.selectedCenterKey = centerKey;
    const centerSelect = document.getElementById("center-toggle-select");
    if (centerSelect) centerSelect.value = centerKey;

    const centerInfo = App.getCenterCoordinates(centerKey);
    const centerNameEl = document.getElementById("current-center-name");
    if (centerNameEl && centerInfo) {
      centerNameEl.textContent = centerInfo.name;
    }

    if (App.state.leafletMap && centerInfo) {
      if (App.state.radiusCircle) {
        App.state.radiusCircle.setLatLng([centerInfo.lat, centerInfo.lng]);
      }
      App.state.leafletMap.setView([centerInfo.lat, centerInfo.lng], 12);
    }

    if (typeof App.updateDirectoryAndMap === "function") {
      App.updateDirectoryAndMap();
    }
  }

  function updateMapMarkers() {
    const map = App.state.leafletMap;
    if (!map || typeof L === "undefined") return;

    // Invalidate size to ensure accurate container dimensions
    map.invalidateSize();

    // Clear existing marker instances
    App.state.markerInstances.forEach((m) => map.removeLayer(m));
    App.state.markerInstances = [];

    const center = App.getCenterCoordinates(App.state.selectedCenterKey);
    const filteredPlaces =
      typeof App.getFilteredPlaces === "function" ? App.getFilteredPlaces() : [];

    const boundsGroup = [];

    // Always include radius circle in bounds if within mode
    if (App.state.radiusCircle && center) {
      boundsGroup.push([center.lat, center.lng]);
    }

    // Group close places to apply gentle radial offsets so no pin is hidden behind another
    const closeThresholdKm = 0.5; // 500m proximity cluster detection
    const clusters = [];

    filteredPlaces.forEach((place) => {
      if (!place.coordinates) return;
      let targetCluster = clusters.find((cluster) =>
        cluster.some((p) => {
          const d = App.calculateHaversineDistance(
            p.coordinates.latitude,
            p.coordinates.longitude,
            place.coordinates.latitude,
            place.coordinates.longitude,
          );
          return d != null && d < closeThresholdKm;
        }),
      );

      if (!targetCluster) {
        targetCluster = [];
        clusters.push(targetCluster);
      }
      targetCluster.push(place);
    });

    const displayCoordinates = new Map();
    clusters.forEach((cluster) => {
      if (cluster.length === 1) {
        const p = cluster[0];
        displayCoordinates.set(p.name, [
          p.coordinates.latitude,
          p.coordinates.longitude,
        ]);
      } else {
        // Distribute cluster items in a small ring around the center
        cluster.forEach((p, index) => {
          if (p.isCenter) {
            displayCoordinates.set(p.name, [
              p.coordinates.latitude,
              p.coordinates.longitude,
            ]);
          } else {
            const angle = (2 * Math.PI * index) / cluster.length;
            const offsetDegree = 0.0035; // ~380m visual separation
            const dispLat =
              p.coordinates.latitude + offsetDegree * Math.sin(angle);
            const dispLng =
              p.coordinates.longitude +
              (offsetDegree * Math.cos(angle)) /
                Math.cos((p.coordinates.latitude * Math.PI) / 180);
            displayCoordinates.set(p.name, [dispLat, dispLng]);
          }
        });
      }
    });

    filteredPlaces.forEach((place) => {
      if (!place.coordinates) return;
      const trueLat = place.coordinates.latitude;
      const trueLng = place.coordinates.longitude;
      const [markerLat, markerLng] = displayCoordinates.get(place.name) || [
        trueLat,
        trueLng,
      ];

      const markerClass = place.isCenter
        ? "custom-map-marker is-center"
        : place.isWithinRadius
          ? "custom-map-marker in-radius"
          : "custom-map-marker outside-radius";

      const iconSvg = App.getCategorySVGIcon(place.category);

      const customIcon = L.divIcon({
        className: "",
        html: `<div class="${markerClass}" id="marker-${place.name.replace(/\s+/g, "-")}" title="${place.name} (${place.category})">${iconSvg}</div>`,
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -36],
      });

      const distText =
        place.distance != null
          ? place.distance === 0
            ? "Current Radius Center"
            : `${place.distance.toFixed(1)} km from ${center ? center.name : "Center"}`
          : "Distance unavailable";

      const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${trueLat},${trueLng}`;

      const popupContent = `
        <div class="custom-popup-box">
          <div class="popup-category-badge">${place.category || "Location"}</div>
          <h4 class="popup-title">${place.name}</h4>
          <div class="popup-distance">${distText}</div>
          <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" class="popup-directions-btn">
            Get Directions
          </a>
        </div>
      `;

      const marker = L.marker([markerLat, markerLng], {
        icon: customIcon,
      }).addTo(map);
      marker.bindPopup(popupContent);

      marker.weddingPlaceData = place;
      App.state.markerInstances.push(marker);
      boundsGroup.push([markerLat, markerLng]);
    });

    // Auto-fit bounds gently so all markers are visible
    if (boundsGroup.length > 0) {
      const bounds = L.latLngBounds(boundsGroup);
      if (App.state.radiusCircle && App.state.radiusFilterMode === "within") {
        map.fitBounds(App.state.radiusCircle.getBounds().pad(0.15));
      } else {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
      }
    }
  }

  function focusPlaceOnMap(placeName, lat, lng) {
    const map = App.state.leafletMap;
    if (!map || lat == null || lng == null) return;

    const mapSection = document.getElementById("wedding-map");
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    map.setView([lat, lng], 14, { animate: true });

    // Find and open popup
    const targetMarker = App.state.markerInstances.find(
      (m) =>
        m.weddingPlaceData &&
        m.weddingPlaceData.name.toLowerCase() === placeName.toLowerCase(),
    );

    if (targetMarker) {
      setTimeout(() => {
        targetMarker.openPopup();
      }, 350);
    }
  }

  App.initializeMap = initializeMap;
  App.switchCenter = switchCenter;
  App.updateMapMarkers = updateMapMarkers;
  App.focusPlaceOnMap = focusPlaceOnMap;
})(window.WeddingApp);

// --- Module: js/directory.js ---
/**
 * Indian Wedding Invitation - Places Directory, Filters & Search
 */

window.WeddingApp = window.WeddingApp || {};

(function (App) {
  "use strict";

  function setupPlacesSection() {
    renderCategoryFilterChips();
    setupSearchAndRadiusControls();
    if (typeof App.initializeMap === "function") {
      App.initializeMap();
    }
    updateDirectoryAndMap();
  }

  function renderCategoryFilterChips() {
    const container = document.getElementById("filter-chips-container");
    if (!container) return;

    const locations = (App.state.weddingData || App.DEFAULT_DATA).locations || [];
    const categoriesSet = new Set();
    locations.forEach((loc) => {
      if (loc.category) categoriesSet.add(loc.category);
    });

    const categories = ["All", ...Array.from(categoriesSet).sort()];

    container.innerHTML = "";
    categories.forEach((cat) => {
      const count =
        cat === "All"
          ? locations.length
          : locations.filter((l) => l.category === cat).length;

      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = `category-chip ${App.state.activeCategory === cat ? "active" : ""}`;
      chip.setAttribute("data-category", cat);
      chip.innerHTML = `
        <span>${cat}</span>
        <span class="category-count">${count}</span>
      `;

      chip.addEventListener("click", () => {
        App.state.activeCategory = cat;
        if (cat === "All") {
          App.state.radiusFilterMode = "all";
          const btnModeAll = document.getElementById("btn-mode-all");
          const btnModeWithin = document.getElementById("btn-mode-within");
          if (btnModeAll) {
            btnModeAll.classList.add("active");
            btnModeAll.setAttribute("aria-pressed", "true");
          }
          if (btnModeWithin) {
            btnModeWithin.classList.remove("active");
            btnModeWithin.setAttribute("aria-pressed", "false");
          }
        }
        container
          .querySelectorAll(".category-chip")
          .forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        updateDirectoryAndMap();
      });

      container.appendChild(chip);
    });
  }

  function setupSearchAndRadiusControls() {
    const searchInput = document.getElementById("places-search-input");
    const clearBtn = document.getElementById("search-clear-btn");
    const centerSelect = document.getElementById("center-toggle-select");
    const btnModeAll = document.getElementById("btn-mode-all");
    const btnModeWithin = document.getElementById("btn-mode-within");

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        App.state.searchQuery = (e.target.value || "").trim().toLowerCase();
        if (clearBtn) clearBtn.style.display = App.state.searchQuery ? "block" : "none";
        updateDirectoryAndMap();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        App.state.searchQuery = "";
        clearBtn.style.display = "none";
        updateDirectoryAndMap();
      });
    }

    if (centerSelect) {
      centerSelect.value = App.state.selectedCenterKey;
      centerSelect.addEventListener("change", (e) => {
        if (typeof App.switchCenter === "function") {
          App.switchCenter(e.target.value);
        }
      });
    }

    if (btnModeAll && btnModeWithin) {
      btnModeAll.addEventListener("click", () => {
        App.state.radiusFilterMode = "all";
        btnModeAll.classList.add("active");
        btnModeAll.setAttribute("aria-pressed", "true");
        btnModeWithin.classList.remove("active");
        btnModeWithin.setAttribute("aria-pressed", "false");
        updateDirectoryAndMap();
      });

      btnModeWithin.addEventListener("click", () => {
        App.state.radiusFilterMode = "within";
        btnModeWithin.classList.add("active");
        btnModeWithin.setAttribute("aria-pressed", "true");
        btnModeAll.classList.remove("active");
        btnModeAll.setAttribute("aria-pressed", "false");
        updateDirectoryAndMap();
      });
    }
  }

  function getFilteredPlaces() {
    const locations = (App.state.weddingData || App.DEFAULT_DATA).locations || [];
    const center = App.getCenterCoordinates(App.state.selectedCenterKey);

    return locations
      .map((loc) => {
        const hasCoords =
          loc.coordinates &&
          loc.coordinates.latitude &&
          loc.coordinates.longitude;
        const distance =
          hasCoords && center
            ? App.calculateHaversineDistance(
                center.lat,
                center.lng,
                loc.coordinates.latitude,
                loc.coordinates.longitude,
              )
            : null;

        const isCenter =
          hasCoords &&
          center &&
          Math.abs(loc.coordinates.latitude - center.lat) < 0.0001;

        const isWithinRadius = distance != null && distance <= App.state.RADIUS_KM;

        return Object.assign({}, loc, {
          distance: distance,
          isWithinRadius: isWithinRadius,
          isCenter: isCenter,
        });
      })
      .filter((loc) => {
        // Category filter
        if (App.state.activeCategory !== "All" && loc.category !== App.state.activeCategory) {
          return false;
        }

        // Search query filter
        if (App.state.searchQuery) {
          const nameMatch = (loc.name || "")
            .toLowerCase()
            .includes(App.state.searchQuery);
          const catMatch = (loc.category || "")
            .toLowerCase()
            .includes(App.state.searchQuery);
          if (!nameMatch && !catMatch) return false;
        }

        // Radius filter mode
        if (App.state.radiusFilterMode === "within") {
          return loc.isWithinRadius || loc.isCenter;
        }

        return true;
      })
      .sort((a, b) => {
        if (a.isCenter) return -1;
        if (b.isCenter) return 1;
        if (a.distance == null) return 1;
        if (b.distance == null) return -1;
        return a.distance - b.distance;
      });
  }

  function updateDirectoryAndMap() {
    renderPlacesDirectory();
    if (typeof App.updateMapMarkers === "function") {
      App.updateMapMarkers();
    }
  }

  function renderPlacesDirectory() {
    const tableBody = document.getElementById("places-table-body");
    const countBadge = document.getElementById("places-count-badge");
    const emptyState = document.getElementById("places-empty-state");
    const directoryWrapper = document.getElementById("directory-table-wrapper");

    if (!tableBody) return;

    const places = getFilteredPlaces();
    const center = App.getCenterCoordinates(App.state.selectedCenterKey);

    if (countBadge) {
      countBadge.textContent = `${places.length} place${places.length === 1 ? "" : "s"} shown`;
    }

    if (places.length === 0) {
      if (emptyState) emptyState.style.display = "block";
      if (directoryWrapper) directoryWrapper.style.display = "none";
      tableBody.innerHTML = "";
      return;
    }

    if (emptyState) emptyState.style.display = "none";
    if (directoryWrapper) directoryWrapper.style.display = "block";

    tableBody.innerHTML = "";

    places.forEach((place) => {
      const row = document.createElement("tr");

      const distDisplay =
        place.distance != null
          ? place.distance === 0
            ? "0 km (Center)"
            : `${place.distance.toFixed(1)} km`
          : "N/A";

      const hasCoords = place.coordinates && place.coordinates.latitude != null;
      const lat = hasCoords ? place.coordinates.latitude : null;
      const lng = hasCoords ? place.coordinates.longitude : null;
      const directionsUrl = hasCoords
        ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
        : "#";

      const nameMarkup = place.isCenter
        ? `<span class="gradient-badge place-center-badge" title="Focus Center">${place.name}</span>`
        : `<strong>${place.name}</strong>`;

      row.innerHTML = `
        <td data-label="Place Name" class="place-name-cell">
          ${nameMarkup}
        </td>
        <td data-label="Category">
          <span class="category-chip" style="min-height: auto; padding: 0.2rem 0.65rem; font-size: 0.75rem;">
            ${place.category}
          </span>
        </td>
        <td data-label="Distance">
          <span class="distance-badge ${place.isWithinRadius ? "in-radius" : "outside-radius"}">
            ${place.isWithinRadius ? "● Within 15 km · " : "○ "} ${distDisplay}
          </span>
        </td>
        <td data-label="Actions">
          <div class="directory-actions-cell">
            ${
              hasCoords
                ? `<button type="button" class="btn btn-secondary btn-sm view-on-map-btn" data-place="${place.name}" data-lat="${lat}" data-lng="${lng}">
                    View on Map
                  </button>
                  <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" title="Open ${place.name} in Google Maps">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style="margin-right:2px;"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    Google Maps ↗
                  </a>`
                : `<span style="font-size: 0.8rem; color: var(--color-text-light);">Location unavailable</span>`
            }
          </div>
        </td>
      `;

      // "View on Map" interaction
      const viewMapBtn = row.querySelector(".view-on-map-btn");
      if (viewMapBtn) {
        viewMapBtn.addEventListener("click", () => {
          if (typeof App.focusPlaceOnMap === "function") {
            App.focusPlaceOnMap(place.name, lat, lng);
          }
        });
      }

      tableBody.appendChild(row);
    });
  }

  App.setupPlacesSection = setupPlacesSection;
  App.renderCategoryFilterChips = renderCategoryFilterChips;
  App.setupSearchAndRadiusControls = setupSearchAndRadiusControls;
  App.getFilteredPlaces = getFilteredPlaces;
  App.updateDirectoryAndMap = updateDirectoryAndMap;
  App.renderPlacesDirectory = renderPlacesDirectory;
})(window.WeddingApp);

// --- Module: js/petals.js ---
/**
 * Indian Wedding Invitation - Ambient Falling Petals Canvas
 */

window.WeddingApp = window.WeddingApp || {};

(function (App) {
  "use strict";

  function setupFallingPetals() {
    const canvas = document.getElementById("petals-canvas");
    const toggleBtn = document.getElementById("petals-toggle-btn");
    if (!canvas) return;

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.style.display = "none";
      if (toggleBtn) toggleBtn.style.display = "none";
      return;
    }

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const petalColors = [
      "rgba(251, 229, 224, 0.75)", // Peach blush
      "rgba(243, 158, 153, 0.65)", // Coral rose
      "rgba(255, 252, 247, 0.85)", // Warm ivory
      "rgba(214, 185, 217, 0.60)", // Lavender mist
      "rgba(181, 168, 139, 0.40)", // Champagne gold highlight
    ];

    const PETAL_COUNT = 24; // Subtle, non-intrusive quantity
    const petals = [];

    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 8,
        speedY: Math.random() * 0.8 + 0.4,
        speedX: Math.random() * 0.5 - 0.25,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.015 + 0.005,
      });
    }

    let isPaused = false;
    let animId = null;

    function renderPetals() {
      if (isPaused) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.swayPhase += p.swaySpeed;
        p.x += Math.sin(p.swayPhase) * 0.6 + p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Draw graceful organic petal shape
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(
          p.size / 2,
          -p.size / 2,
          p.size,
          p.size / 3,
          0,
          p.size * 1.3,
        );
        ctx.bezierCurveTo(-p.size, p.size / 3, -p.size / 2, -p.size / 2, 0, 0);
        ctx.fill();

        ctx.restore();
      }

      animId = requestAnimationFrame(renderPetals);
    }

    renderPetals();

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        isPaused = !isPaused;
        toggleBtn.textContent = isPaused ? "🌸 Play Petals" : "🌸 Pause Petals";
        if (!isPaused) {
          renderPetals();
        }
      });
    }
  }

  App.setupFallingPetals = setupFallingPetals;
})(window.WeddingApp);

// --- Module: js/confetti.js ---
/**
 * Indian Wedding Invitation - Interactive Confetti Celebration
 */

window.WeddingApp = window.WeddingApp || {};

(function (App) {
  "use strict";

  function setupConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    const confettiBtn = document.getElementById("confetti-btn");
    if (!canvas || !confettiBtn) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const CONFETTI_COLORS = [
      "#2273B3", // Royal Cobalt Blue
      "#658FCB", // Soft Periwinkle
      "#B5A88B", // Champagne Gold
      "#DFCFA8", // Light Gold
      "#F39E99", // Coral Rose
      "#D6B9D9", // Lavender Mist
      "#FBE5E0", // Peach Blush
      "#FFB300", // Auspicious Marigold Saffron
    ];

    let confettiParticles = [];
    let animFrameId = null;

    function launchCelebration() {
      const PARTICLE_COUNT = 140;
      const origins = [
        { x: width * 0.2, y: height + 10 },
        { x: width * 0.5, y: height + 10 },
        { x: width * 0.8, y: height + 10 },
      ];

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const origin = origins[i % origins.length];
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.4;
        const velocity = Math.random() * 18 + 14;

        confettiParticles.push({
          x: origin.x,
          y: origin.y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: Math.random() * 8 + 6,
          color:
            CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
          tilt: Math.random() * 10 - 5,
          tiltSpeed: Math.random() * 0.12 + 0.05,
          gravity: 0.42,
          drag: 0.982,
          opacity: 1,
          shape: Math.random() > 0.4 ? "rect" : "circle",
        });
      }

      if (!animFrameId) {
        animateConfetti();
      }
    }

    function animateConfetti() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < confettiParticles.length; i++) {
        const p = confettiParticles[i];
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.tilt += p.tiltSpeed;

        if (p.y > height * 0.7) {
          p.opacity -= 0.015;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.scale(Math.cos(p.tilt), 1);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
        }

        ctx.restore();
      }

      confettiParticles = confettiParticles.filter(
        (p) => p.y < height + 40 && p.opacity > 0,
      );

      if (confettiParticles.length > 0) {
        animFrameId = requestAnimationFrame(animateConfetti);
      } else {
        ctx.clearRect(0, 0, width, height);
        animFrameId = null;
      }
    }

    confettiBtn.addEventListener("click", () => {
      launchCelebration();
    });
  }

  App.setupConfetti = setupConfetti;
})(window.WeddingApp);

// --- Module: js/main.js ---
/**
 * Indian Wedding Invitation - Main Application Orchestrator
 */

window.WeddingApp = window.WeddingApp || {};

(function (App) {
  "use strict";

  function initializeUI() {
    if (typeof App.enableExtensionAgnosticImageLoading === "function") {
      App.enableExtensionAgnosticImageLoading();
    }
    if (typeof App.renderAllDynamicData === "function") {
      App.renderAllDynamicData();
    }
    if (typeof App.renderCoupleProfiles === "function") {
      App.renderCoupleProfiles();
    }
    if (typeof App.renderCelebrationsTimeline === "function") {
      App.renderCelebrationsTimeline();
    }
    if (typeof App.setupCountdown === "function") {
      App.setupCountdown();
    }
    if (typeof App.setupPlacesSection === "function") {
      App.setupPlacesSection();
    }
    if (typeof App.setupFallingPetals === "function") {
      App.setupFallingPetals();
    }
    if (typeof App.setupConfetti === "function") {
      App.setupConfetti();
    }
    if (typeof App.setupNavigation === "function") {
      App.setupNavigation();
    }
  }

  async function start() {
    // Ensure URL shows /index.html if served at root /
    if (window.location.protocol.startsWith('http') && window.location.pathname.endsWith('/')) {
      const target = window.location.pathname + 'index.html' + window.location.search + window.location.hash;
      window.history.replaceState(null, '', target);
    }

    if (typeof App.loadData === "function") {
      await App.loadData();
    }
    initializeUI();
  }

  App.initializeUI = initializeUI;
  App.start = start;

  // Kickstart on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})(window.WeddingApp);

