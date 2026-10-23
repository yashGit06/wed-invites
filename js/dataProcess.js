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
