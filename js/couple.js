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
