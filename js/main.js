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
