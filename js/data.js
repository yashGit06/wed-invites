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
