/* ============================================================
   SunriseTime.co — Main JavaScript
   Handles: Navigation, Search, Scroll animations, Demo data
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initCitySearch();
  initDemoChart();
  initCountUp();
});

/* ── Navbar scroll behavior ─────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });
}

/* ── Mobile menu toggle ─────────────────────────────────────── */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('active');
    }
  });
}

/* ── Scroll-triggered fade-in animations ────────────────────── */
function initScrollAnimations() {
  // Add fade-in class to animatable elements
  const animatableSelectors = [
    '.feature-card',
    '.city-group',
    '.faq-item',
    '.trust-badge',
    '.section-header',
    '.dashboard-demo',
    '.cta-card',
    '.hero-preview'
  ];

  animatableSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('fade-in');
    });
  });

  // Add stagger parent classes
  document.querySelectorAll('.features-grid, .pricing-grid, .trust-badges, .faq-list').forEach(el => {
    el.classList.add('stagger-children');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* ── City Search with demo data ─────────────────────────────── */
const CITIES = [
  { name: 'New York City', slug: 'new-york', timezone: 'EST (UTC-5)', sunrise: '6:42 AM', sunset: '7:18 PM', golden: '6:31 PM', moon: 'Waxing Gibbous', daylight: '12h 36m', prayer: 'Maghrib 7:21' },
  { name: 'London', slug: 'london', timezone: 'GMT (UTC+0)', sunrise: '5:58 AM', sunset: '6:15 PM', golden: '5:36 PM', moon: 'Waxing Gibbous', daylight: '12h 17m', prayer: 'Maghrib 6:18' },
  { name: 'Tokyo', slug: 'tokyo', timezone: 'JST (UTC+9)', sunrise: '5:42 AM', sunset: '5:52 PM', golden: '5:14 PM', moon: 'Waxing Gibbous', daylight: '12h 10m', prayer: 'Maghrib 5:55' },
  { name: 'Paris', slug: 'paris', timezone: 'CET (UTC+1)', sunrise: '7:08 AM', sunset: '7:29 PM', golden: '6:50 PM', moon: 'Waxing Gibbous', daylight: '12h 21m', prayer: 'Maghrib 7:32' },
  { name: 'Dubai', slug: 'dubai', timezone: 'GST (UTC+4)', sunrise: '6:12 AM', sunset: '6:24 PM', golden: '5:52 PM', moon: 'Waxing Gibbous', daylight: '12h 12m', prayer: 'Maghrib 6:27' },
  { name: 'Sydney', slug: 'sydney', timezone: 'AEDT (UTC+11)', sunrise: '6:56 AM', sunset: '7:08 PM', golden: '6:30 PM', moon: 'Waxing Gibbous', daylight: '12h 12m', prayer: 'Maghrib 7:11' },
  { name: 'Los Angeles', slug: 'los-angeles', timezone: 'PST (UTC-8)', sunrise: '6:48 AM', sunset: '7:05 PM', golden: '6:28 PM', moon: 'Waxing Gibbous', daylight: '12h 17m', prayer: 'Maghrib 7:08' },
  { name: 'Singapore', slug: 'singapore', timezone: 'SGT (UTC+8)', sunrise: '7:06 AM', sunset: '7:14 PM', golden: '6:42 PM', moon: 'Waxing Gibbous', daylight: '12h 08m', prayer: 'Maghrib 7:17' },
  { name: 'Cairo', slug: 'cairo', timezone: 'EET (UTC+2)', sunrise: '5:48 AM', sunset: '6:05 PM', golden: '5:33 PM', moon: 'Waxing Gibbous', daylight: '12h 17m', prayer: 'Maghrib 6:08' },
  { name: 'Istanbul', slug: 'istanbul', timezone: 'TRT (UTC+3)', sunrise: '6:25 AM', sunset: '6:43 PM', golden: '6:05 PM', moon: 'Waxing Gibbous', daylight: '12h 18m', prayer: 'Maghrib 6:46' },
  { name: 'Mumbai', slug: 'mumbai', timezone: 'IST (UTC+5:30)', sunrise: '6:28 AM', sunset: '6:39 PM', golden: '6:07 PM', moon: 'Waxing Gibbous', daylight: '12h 11m', prayer: 'Maghrib 6:42' },
  { name: 'São Paulo', slug: 'sao-paulo', timezone: 'BRT (UTC-3)', sunrise: '6:12 AM', sunset: '6:15 PM', golden: '5:43 PM', moon: 'Waxing Gibbous', daylight: '12h 03m', prayer: 'Maghrib 6:18' },
  { name: 'Toronto', slug: 'toronto', timezone: 'EST (UTC-5)', sunrise: '7:12 AM', sunset: '7:32 PM', golden: '6:54 PM', moon: 'Waxing Gibbous', daylight: '12h 20m', prayer: 'Maghrib 7:35' },
  { name: 'Berlin', slug: 'berlin', timezone: 'CET (UTC+1)', sunrise: '6:12 AM', sunset: '6:34 PM', golden: '5:56 PM', moon: 'Waxing Gibbous', daylight: '12h 22m', prayer: 'Maghrib 6:37' },
  { name: 'Mexico City', slug: 'mexico-city', timezone: 'CST (UTC-6)', sunrise: '6:55 AM', sunset: '7:05 PM', golden: '6:33 PM', moon: 'Waxing Gibbous', daylight: '12h 10m', prayer: 'Maghrib 7:08' },
];

// Daylight hours data per city (7-day mock data)
const DAYLIGHT_DATA = {
  'New York City': [11.8, 12.0, 12.1, 12.3, 12.4, 12.5, 12.6],
  'London':        [11.5, 11.7, 11.9, 12.1, 12.3, 12.5, 12.7],
  'Tokyo':         [11.8, 11.9, 12.0, 12.1, 12.2, 12.3, 12.4],
  'Paris':         [11.6, 11.8, 12.0, 12.2, 12.4, 12.6, 12.8],
  'Dubai':         [11.9, 12.0, 12.1, 12.1, 12.2, 12.2, 12.3],
  'Sydney':        [12.5, 12.4, 12.3, 12.2, 12.1, 12.0, 11.9],
  'Los Angeles':   [11.7, 11.9, 12.0, 12.2, 12.3, 12.5, 12.6],
  'Singapore':     [12.1, 12.1, 12.1, 12.1, 12.1, 12.1, 12.1],
  'Cairo':         [11.8, 11.9, 12.0, 12.2, 12.3, 12.4, 12.5],
  'Istanbul':      [11.6, 11.8, 12.0, 12.2, 12.4, 12.5, 12.7],
  'Mumbai':        [11.9, 12.0, 12.0, 12.1, 12.1, 12.2, 12.2],
  'São Paulo':     [12.3, 12.2, 12.1, 12.0, 12.0, 11.9, 11.8],
  'Toronto':       [11.5, 11.7, 11.9, 12.1, 12.3, 12.5, 12.8],
  'Berlin':        [11.3, 11.6, 11.9, 12.2, 12.5, 12.8, 13.1],
  'Mexico City':   [11.9, 12.0, 12.0, 12.1, 12.1, 12.2, 12.2],
};

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function initCitySearch() {
  const input = document.getElementById('citySearch');
  const results = document.getElementById('searchResults');
  if (!input || !results) return;

  input.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (query.length < 1) {
      results.classList.remove('active');
      return;
    }

    const matches = CITIES.filter(c => c.name.toLowerCase().includes(query));
    if (matches.length === 0) {
      results.classList.remove('active');
      return;
    }

    results.innerHTML = matches.map(c =>
      `<div class="search-result-item" data-city="${c.name}">${c.name} <span style="color:var(--text-tertiary);font-size:0.8rem;">${c.timezone}</span> <span style="color:var(--accent-end);font-size:0.75rem;margin-left:auto;">View →</span></div>`
    ).join('');

    results.classList.add('active');
    bindSearchResults(results, input);
  });

  // Close results on outside click
  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !results.contains(e.target)) {
      results.classList.remove('active');
    }
  });

  // Focus: show all cities if empty
  input.addEventListener('focus', () => {
    if (input.value.trim().length === 0) {
      results.innerHTML = CITIES.slice(0, 8).map(c =>
        `<div class="search-result-item" data-city="${c.name}">${c.name} <span style="color:var(--text-tertiary);font-size:0.8rem;">${c.timezone}</span> <span style="color:var(--accent-end);font-size:0.75rem;margin-left:auto;">View →</span></div>`
      ).join('');
      results.classList.add('active');
      bindSearchResults(results, input);
    }
  });
}

function bindSearchResults(results, input) {
  results.querySelectorAll('.search-result-item').forEach(item => {
    item.addEventListener('click', () => {
      const cityName = item.dataset.city;
      selectCity(cityName);
      input.value = '';
      results.classList.remove('active');
    });
  });
}

function selectCity(cityName) {
  const city = CITIES.find(c => c.name === cityName);
  if (!city) return;

  // Navigate to real city page if slug exists
  if (city.slug) {
    window.location.href = `/sunrise/${city.slug}/`;
    return;
  }

  const nameEl = document.getElementById('demoCityName');
  const sunriseEl = document.getElementById('demoSunriseVal');
  const sunsetEl = document.getElementById('demoSunsetVal');
  const goldenEl = document.getElementById('demoGoldenVal');
  const moonEl = document.getElementById('demoMoonVal');
  const daylightEl = document.getElementById('demoDaylightVal');
  const prayerEl = document.getElementById('demoPrayerVal');

  // Animate card update
  const cards = document.querySelectorAll('.demo-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(10px)';
    setTimeout(() => {
      card.style.transition = 'all 0.4s cubic-bezier(0.4,0,0.2,1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 80 * i);
  });

  setTimeout(() => {
    if (nameEl) nameEl.innerHTML = `${city.name} <span class="demo-timezone">${city.timezone}</span>`;
    if (sunriseEl) sunriseEl.textContent = city.sunrise;
    if (sunsetEl) sunsetEl.textContent = city.sunset;
    if (goldenEl) goldenEl.textContent = city.golden;
    if (moonEl) moonEl.textContent = city.moon;
    if (daylightEl) daylightEl.textContent = city.daylight;
    if (prayerEl) prayerEl.textContent = city.prayer;
  }, 50);

  // Update chart
  updateDemoChart(city.name);
}

/* ── Demo Daylight Chart ────────────────────────────────────── */
function initDemoChart() {
  updateDemoChart('New York City');
}

function updateDemoChart(cityName) {
  const chart = document.getElementById('demoChart');
  if (!chart) return;

  const data = DAYLIGHT_DATA[cityName] || DAYLIGHT_DATA['New York City'];
  const maxVal = Math.max(...data);
  const todayIndex = 4; // Friday as "today"

  chart.innerHTML = data.map((val, i) => {
    const heightPct = (val / (maxVal + 1)) * 100;
    const isActive = i === todayIndex;
    return `
      <div class="demo-bar-container">
        <div class="demo-bar ${isActive ? 'active' : ''}" style="height:${heightPct}%">
          <span class="demo-bar-value">${val.toFixed(1)}h</span>
        </div>
        <span class="demo-bar-label">${DAYS[i]}</span>
      </div>
    `;
  }).join('');
}

/* ── Count-up animation for hero stats ──────────────────────── */
function initCountUp() {
  const statValues = document.querySelectorAll('.stat-value[data-count]');
  if (statValues.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        animateCount(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(el => observer.observe(el));
}

function animateCount(el, target) {
  const duration = 2000;
  const steps = 60;
  const stepDuration = duration / steps;
  let current = 0;
  const increment = target / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.round(current).toLocaleString();
  }, stepDuration);
}
