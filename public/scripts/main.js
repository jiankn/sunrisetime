/* ============================================================
   SunriseTime.co — Main JavaScript
   Handles: Navigation, Search, Scroll animations, Hero preview
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initHeroSearch();
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

  if (!input || !results || !Array.isArray(searchData) || !Array.isArray(previewData)) {
    return;
  }

  let matches = [];
  let activeIndex = -1;

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
      results.innerHTML = '<div class="hero-search-option empty"><span>No matching city</span><span>Try another spelling</span></div>';
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
        <span>${city.name}, ${city.country}</span>
        <span>Open city page</span>
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

  function goToCity(slug) {
    if (!slug) return;
    window.location.href = `/sunrise/${slug}/`;
  }

  function getRankedMatches(query) {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) return [];

    return searchData
      .filter(city => city.name.toLowerCase().includes(normalizedQuery))
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(normalizedQuery) ? 0 : 1;
        const bStarts = b.name.toLowerCase().startsWith(normalizedQuery) ? 0 : 1;
        if (aStarts !== bStarts) return aStarts - bStarts;
        return b.population - a.population;
      })
      .slice(0, 8);
  }

  function updateHeroPreview(slug) {
    const snapshot = previewData.find(city => city.slug === slug);
    if (!snapshot) return;

    const fieldMap = {
      '[data-hero-city-name]': snapshot.name,
      '[data-hero-country]': snapshot.country,
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
      openLink.setAttribute('href', `/sunrise/${snapshot.slug}/`);
    }

    previewButtons.forEach(button => {
      button.classList.toggle('active', button.dataset.heroCity === slug);
    });
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

    matches = getRankedMatches(query);
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

  document.addEventListener('click', (event) => {
    if (!searchRoot.contains(event.target)) {
      closeResults();
    }
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
      setLocationState('Use my location');
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
        setLocationState('Location unavailable', { feedback: true });
        queueLocationReset();
        return;
      }

      if (locationResetTimer) {
        window.clearTimeout(locationResetTimer);
        locationResetTimer = null;
      }

      setLocationState('Locating...', { disabled: true, feedback: true });

      navigator.geolocation.getCurrentPosition((position) => {
        const nearestCity = findNearestCity(position.coords.latitude, position.coords.longitude, searchData);
        if (nearestCity) {
          goToCity(nearestCity.slug);
          return;
        }

        setLocationState('Nearest city unavailable', { feedback: true });
        queueLocationReset();
      }, () => {
        setLocationState('Location blocked', { feedback: true });
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
