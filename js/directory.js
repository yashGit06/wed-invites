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
