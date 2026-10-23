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
