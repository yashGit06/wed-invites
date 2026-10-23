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
