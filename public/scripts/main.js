/* ============================================================
   SunriseTime.co — Main JavaScript
   Handles: Navigation, Search, Scroll animations, Hero preview
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  initNavbar();
  initLanguageSwitchers();
  initMobileMenu();
  initSearchCityTriggers();
  initScrollAnimations();
  initHeroSearch();
  initFooterSearch();
});

function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!hamburger.contains(target) && !mobileMenu.contains(target)) {
      mobileMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

function initLanguageSwitchers() {
  document.querySelectorAll('[data-lang-switcher]').forEach((switcher) => {
    const toggle = switcher.querySelector('[data-lang-switcher-toggle]');
    const menu = switcher.querySelector('[data-lang-switcher-menu]');
    if (!toggle || !menu) return;

    const closeMenu = () => {
      switcher.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
      switcher.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
    };

    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      if (switcher.classList.contains('active')) {
        closeMenu();
        return;
      }

      document.querySelectorAll('[data-lang-switcher].active').forEach((entry) => {
        if (entry !== switcher) {
          entry.classList.remove('active');
          entry.querySelector('[data-lang-switcher-toggle]')?.setAttribute('aria-expanded', 'false');
        }
      });
      openMenu();
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    switcher.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        toggle.focus();
      }
    });

    document.addEventListener('pointerdown', (event) => {
      if (!(event.target instanceof Node) || switcher.contains(event.target)) {
        return;
      }

      closeMenu();
    });
  });
}

function initSearchCityTriggers() {
  document.querySelectorAll('[data-search-city-trigger]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetUrl = new URL(link.href, window.location.href);
      const currentUrl = new URL(window.location.href);
      const isSamePageSearch = targetUrl.origin === currentUrl.origin
        && targetUrl.pathname === currentUrl.pathname
        && targetUrl.hash === '#search';

      if (!isSamePageSearch) return;

      event.preventDefault();
      document.dispatchEvent(new CustomEvent('sunrisetime:focus-hero-search'));
    });
  });
}

function initScrollAnimations() {
  const animatableSelectors = [
    '.planner-card',
    '.planner-rhythm',
    '.feature-card',
    '.city-group',
    '.faq-item',
    '.trust-badge',
    '.section-header',
    '.cta-card',
    '.hero-snapshot-panel',
    '.city-highlight-card',
  ];

  animatableSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      element.classList.add('fade-in');
    });
  });

  document.querySelectorAll('.features-grid, .trust-badges, .faq-list, .city-highlight-grid').forEach(element => {
    element.classList.add('stagger-children');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.fade-in').forEach(element => observer.observe(element));
}

function normalizeText(value) {
  return (value || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function getLanguagePrefix() {
  const prefix = document.body?.dataset?.langPrefix || '';
  return prefix === '/' ? '' : prefix.replace(/\/$/, '');
}

function buildSunrisePath(slug) {
  return `${getLanguagePrefix()}/sunrise/${slug}/`;
}

function goToCity(slug) {
  if (!slug) return;
  window.location.href = buildSunrisePath(slug);
}

function getSearchableFields(city) {
  return [
    city.name,
    city.displayName,
    city.country,
    city.countryLabel,
    city.admin1,
    ...(city.aliases || []),
  ].filter(Boolean);
}

function getCityMatchRank(normalizedQuery, city) {
  const normalizedName = normalizeText(city.name);
  const normalizedDisplayName = normalizeText(city.displayName || city.name);
  const normalizedFields = getSearchableFields(city).map((field) => normalizeText(field));

  if (normalizedDisplayName === normalizedQuery || normalizedName === normalizedQuery) {
    return 0;
  }

  if (normalizedDisplayName.startsWith(normalizedQuery)) {
    return 1;
  }

  if (normalizedName.startsWith(normalizedQuery)) {
    return 2;
  }

  if (normalizedFields.some((field) => field.startsWith(normalizedQuery))) {
    return 3;
  }

  if (normalizedDisplayName.includes(normalizedQuery)) {
    return 4;
  }

  if (normalizedFields.some((field) => field.includes(normalizedQuery))) {
    return 5;
  }

  return Number.POSITIVE_INFINITY;
}

function getRankedCityMatches(query, searchData, limit = 8) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return [];

  return searchData
    .filter((city) => getCityMatchRank(normalizedQuery, city) !== Number.POSITIVE_INFINITY)
    .sort((a, b) => {
      const aRank = getCityMatchRank(normalizedQuery, a);
      const bRank = getCityMatchRank(normalizedQuery, b);
      if (aRank !== bRank) return aRank - bRank;
      return b.population - a.population;
    })
    .slice(0, limit);
}

function initHeroSearch() {
  const searchRoot = document.querySelector('[data-hero-search]');
  if (!searchRoot) return;

  const input = searchRoot.querySelector('[data-city-search-input]');
  const results = searchRoot.querySelector('[data-search-results]');
  const searchShell = searchRoot.querySelector('.hero-search-shell');
  const locationButton = searchRoot.querySelector('[data-use-location]');
  const locationLabel = searchRoot.querySelector('[data-location-label]');
  const previewButtons = document.querySelectorAll('[data-hero-city]');
  const searchData = readJsonScript('heroSearchData');
  const previewData = readJsonScript('heroPreviewData');
  const config = {
    noMatchTitle: 'No matching city',
    noMatchSubtitle: 'Try another spelling',
    openCityPage: 'Open city page',
    useMyLocation: 'Use my location',
    locationUnavailable: 'Location unavailable',
    locating: 'Locating...',
    nearestUnavailable: 'Nearest city unavailable',
    locationBlocked: 'Location blocked',
    ...readJsonScript('heroSearchConfig'),
  };

  if (!input || !results || !Array.isArray(searchData) || !Array.isArray(previewData)) {
    return;
  }

  let matches = [];
  let activeIndex = -1;
  let guidanceTimer = null;

  function isInsideSearchRoot(target) {
    return target instanceof Node && searchRoot.contains(target);
  }

  function closeResults() {
    results.classList.remove('active');
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    activeIndex = -1;
  }

  function openResults() {
    if (results.children.length === 0) return;
    results.classList.add('active');
    input.setAttribute('aria-expanded', 'true');
  }

  function renderResults(items) {
    if (!items.length) {
      results.innerHTML = `<div class="hero-search-option empty"><span>${config.noMatchTitle}</span><span>${config.noMatchSubtitle}</span></div>`;
      openResults();
      return;
    }

    results.innerHTML = items.map((city, index) => `
      <button
        type="button"
        class="hero-search-option"
        role="option"
        id="hero-search-option-${city.slug}"
        data-index="${index}"
        data-slug="${city.slug}"
        aria-selected="false"
      >
        <span>${city.displayName || city.name}</span>
        <span>${config.openCityPage}</span>
      </button>
    `).join('');

    activeIndex = -1;
    openResults();
  }

  function setActive(index) {
    const options = [...results.querySelectorAll('[data-slug]')];
    if (!options.length) return;

    activeIndex = (index + options.length) % options.length;

    options.forEach((option, optionIndex) => {
      const isActive = optionIndex === activeIndex;
      option.classList.toggle('active', isActive);
      option.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    const activeOption = options[activeIndex];
    input.setAttribute('aria-activedescendant', activeOption.id);
  }

  function updateHeroPreview(slug) {
    const snapshot = previewData.find(city => city.slug === slug);
    if (!snapshot) return;

    const fieldMap = {
      '[data-hero-city-name]': snapshot.displayName || snapshot.name,
      '[data-hero-country]': snapshot.countryLabel || snapshot.country,
      '[data-hero-caption]': snapshot.caption,
      '[data-hero-next-label]': snapshot.nextEventLabel,
      '[data-hero-next-time]': snapshot.nextEventTime,
      '[data-hero-next-support]': snapshot.nextEventSupport,
      '[data-hero-sunrise]': snapshot.sunrise,
      '[data-hero-sunset]': snapshot.sunset,
      '[data-hero-daylight]': snapshot.daylight,
      '[data-hero-golden]': snapshot.golden,
      '[data-hero-moon]': snapshot.moon,
      '[data-hero-prayer]': snapshot.prayer,
    };

    Object.entries(fieldMap).forEach(([selector, value]) => {
      const element = document.querySelector(selector);
      if (element) {
        element.textContent = value;
      }
    });

    const openLink = document.querySelector('[data-hero-open]');
    if (openLink) {
      openLink.setAttribute('href', buildSunrisePath(snapshot.slug));
    }

    previewButtons.forEach(button => {
      button.classList.toggle('active', button.dataset.heroCity === slug);
    });
  }

  function clearGuidedState() {
    searchRoot.classList.remove('is-guided');
    searchShell?.classList.remove('is-guided');

    if (guidanceTimer) {
      window.clearTimeout(guidanceTimer);
      guidanceTimer = null;
    }
  }

  function spotlightSearch() {
    clearGuidedState();
    searchRoot.classList.add('is-guided');
    searchShell?.classList.add('is-guided');
    guidanceTimer = window.setTimeout(() => {
      searchRoot.classList.remove('is-guided');
      searchShell?.classList.remove('is-guided');
      guidanceTimer = null;
    }, 2200);

    input.focus({ preventScroll: true });

    if (!input.value.trim()) {
      matches = searchData.slice(0, 6);
      renderResults(matches);
      return;
    }

    matches = getRankedCityMatches(input.value, searchData, 8);
    renderResults(matches);
  }

  if (searchShell) {
    searchShell.addEventListener('click', (event) => {
      if (event.target.closest('[data-use-location]')) return;
      input.focus();
    });
  }

  input.addEventListener('focus', () => {
    if (input.value.trim()) return;
    matches = searchData.slice(0, 6);
    renderResults(matches);
  });

  input.addEventListener('input', (event) => {
    const query = event.target.value;
    if (!query.trim()) {
      closeResults();
      return;
    }

    matches = getRankedCityMatches(query, searchData, 8);
    renderResults(matches);
  });

  input.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowDown':
        if (!matches.length) return;
        event.preventDefault();
        setActive(activeIndex + 1);
        break;
      case 'ArrowUp':
        if (!matches.length) return;
        event.preventDefault();
        setActive(activeIndex - 1);
        break;
      case 'Enter':
        if (!matches.length) return;
        event.preventDefault();
        if (activeIndex >= 0) {
          goToCity(matches[activeIndex].slug);
          return;
        }
        goToCity(matches[0].slug);
        break;
      case 'Escape':
        closeResults();
        break;
      default:
        break;
    }
  });

  results.addEventListener('click', (event) => {
    const option = event.target.closest('[data-slug]');
    if (!option) return;
    goToCity(option.dataset.slug);
  });

  document.addEventListener('pointerdown', (event) => {
    if (!isInsideSearchRoot(event.target)) {
      closeResults();
    }
  });

  document.addEventListener('focusin', (event) => {
    if (!isInsideSearchRoot(event.target)) {
      closeResults();
    }
  });

  document.addEventListener('sunrisetime:focus-hero-search', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targetTop = Math.max(searchRoot.getBoundingClientRect().top + window.scrollY - 112, 0);

    window.scrollTo({
      top: targetTop,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });

    window.setTimeout(() => {
      spotlightSearch();
    }, prefersReducedMotion ? 0 : 260);
  });

  previewButtons.forEach(button => {
    button.addEventListener('click', () => {
      updateHeroPreview(button.dataset.heroCity);
    });
  });

  if (locationButton && locationLabel) {
    let locationResetTimer = null;

    function setLocationState(label, { disabled = false, feedback = false } = {}) {
      locationButton.disabled = disabled;
      locationLabel.textContent = label;

      if (feedback) {
        locationButton.setAttribute('data-feedback', 'true');
        return;
      }

      locationButton.removeAttribute('data-feedback');
    }

    function resetLocationState() {
      setLocationState(config.useMyLocation);
      if (locationResetTimer) {
        window.clearTimeout(locationResetTimer);
        locationResetTimer = null;
      }
    }

    function queueLocationReset() {
      if (locationResetTimer) {
        window.clearTimeout(locationResetTimer);
      }

      locationResetTimer = window.setTimeout(() => {
        resetLocationState();
      }, 1600);
    }

    locationButton.addEventListener('click', () => {
      if (!navigator.geolocation) {
        setLocationState(config.locationUnavailable, { feedback: true });
        queueLocationReset();
        return;
      }

      if (locationResetTimer) {
        window.clearTimeout(locationResetTimer);
        locationResetTimer = null;
      }

      setLocationState(config.locating, { disabled: true, feedback: true });

      navigator.geolocation.getCurrentPosition((position) => {
        const nearestCity = findNearestCity(position.coords.latitude, position.coords.longitude, searchData);
        if (nearestCity) {
          goToCity(nearestCity.slug);
          return;
        }

        setLocationState(config.nearestUnavailable, { feedback: true });
        queueLocationReset();
      }, () => {
        setLocationState(config.locationBlocked, { feedback: true });
        queueLocationReset();
      }, {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 600000,
      });
    });
  }
}

function initFooterSearch() {
  const searchRoot = document.querySelector('[data-footer-search]');
  if (!searchRoot) return;

  const input = searchRoot.querySelector('[data-footer-city-input]');
  const status = searchRoot.querySelector('[data-footer-search-status]');
  const locationButton = searchRoot.querySelector('[data-footer-use-location]');
  const locationLabel = searchRoot.querySelector('[data-footer-location-label]');
  const searchData = readJsonScript('footerSearchData');
  const config = {
    useMyLocation: 'Use my location',
    typeCity: 'Type a city name to continue.',
    noMatch: 'No matching city yet. Try another spelling.',
    browserUnavailable: 'Browser location is not available here.',
    locating: 'Locating...',
    unavailable: 'Unavailable',
    noMatchState: 'No match',
    noLocationMatch: 'We could not map that location to an indexed city yet.',
    blocked: 'Blocked',
    permissionDenied: 'Location permission was denied or timed out.',
    ...readJsonScript('footerSearchConfig'),
  };

  if (!input || !status || !Array.isArray(searchData)) {
    return;
  }

  let locationResetTimer = null;

  function setStatus(message = '') {
    status.textContent = message;
  }

  function setLocationState(label, { disabled = false, feedback = false } = {}) {
    if (!locationButton || !locationLabel) return;

    locationButton.disabled = disabled;
    locationLabel.textContent = label;

    if (feedback) {
      locationButton.setAttribute('data-feedback', 'true');
      return;
    }

    locationButton.removeAttribute('data-feedback');
  }

  function resetLocationState() {
    setLocationState(config.useMyLocation);
    if (locationResetTimer) {
      window.clearTimeout(locationResetTimer);
      locationResetTimer = null;
    }
  }

  function queueLocationReset() {
    if (locationResetTimer) {
      window.clearTimeout(locationResetTimer);
    }

    locationResetTimer = window.setTimeout(() => {
      resetLocationState();
    }, 1800);
  }

  input.addEventListener('input', () => {
    if (status.textContent) {
      setStatus('');
    }
  });

  searchRoot.addEventListener('submit', (event) => {
    event.preventDefault();

    const query = input.value.trim();
    if (!query) {
      setStatus(config.typeCity);
      input.focus();
      return;
    }

    const matches = getRankedCityMatches(query, searchData, 1);
    if (!matches.length) {
      setStatus(config.noMatch);
      return;
    }

    setStatus('');
    goToCity(matches[0].slug);
  });

  if (locationButton && locationLabel) {
    locationButton.addEventListener('click', () => {
      if (!navigator.geolocation) {
        setLocationState(config.unavailable, { feedback: true });
        setStatus(config.browserUnavailable);
        queueLocationReset();
        return;
      }

      if (locationResetTimer) {
        window.clearTimeout(locationResetTimer);
        locationResetTimer = null;
      }

      setLocationState(config.locating, { disabled: true, feedback: true });
      setStatus('');

      navigator.geolocation.getCurrentPosition((position) => {
        const nearestCity = findNearestCity(position.coords.latitude, position.coords.longitude, searchData);
        if (nearestCity) {
          goToCity(nearestCity.slug);
          return;
        }

        setLocationState(config.noMatchState, { feedback: true });
        setStatus(config.noLocationMatch);
        queueLocationReset();
      }, () => {
        setLocationState(config.blocked, { feedback: true });
        setStatus(config.permissionDenied);
        queueLocationReset();
      }, {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 600000,
      });
    });
  }
}

function readJsonScript(id) {
  const script = document.getElementById(id);
  if (!script) return null;

  try {
    return JSON.parse(script.textContent || 'null');
  } catch {
    return null;
  }
}

function findNearestCity(lat, lng, cities) {
  let closest = null;
  let closestDistance = Number.POSITIVE_INFINITY;

  cities.forEach((city) => {
    const distance = haversineDistance(lat, lng, city.lat, city.lng);
    if (distance < closestDistance) {
      closest = city;
      closestDistance = distance;
    }
  });

  return closest;
}

function haversineDistance(lat1, lng1, lat2, lng2) {
  const toRadians = (value) => value * (Math.PI / 180);
  const earthRadiusKm = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}
