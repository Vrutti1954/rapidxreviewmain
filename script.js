// ----- MARQUEE CUSTOMERS DATA -----
const customers = [
  { initials: "RK", name: "Raj Kumar Sweets", bg: "#E0F5FF", fg: "#0369A1" },
  { initials: "SK", name: "Sharma Kirana Store", bg: "#DCFCE7", fg: "#166534" },
  { initials: "MT", name: "Metro Tech Solutions", bg: "#EDE9FE", fg: "#6D28D9" },
  { initials: "PH", name: "Prime Health Clinic", bg: "#FEF3C7", fg: "#92400E" },
  { initials: "ZF", name: "Zara Fashion Hub", bg: "#FCE7F3", fg: "#9D174D" },
  { initials: "SB", name: "Sunrise Builders", bg: "#E0F5FF", fg: "#0369A1" },
  { initials: "TG", name: "TechGuru Academy", bg: "#DCFCE7", fg: "#166534" },
  { initials: "AR", name: "Aroma Restaurant", bg: "#FEF3C7", fg: "#92400E" },
  { initials: "SAE", name: "Shree Ambica Enterprise", bg: "#EDE9FE", fg: "#6D28D9" },
  { initials: "GE", name: "Global Exports Co.", bg: "#FCE7F3", fg: "#9D174D" },
  { initials: "HD", name: "Happy Dog Grooming", bg: "#DCFCE7", fg: "#166534" },
  { initials: "NF", name: "NextGen Fintech", bg: "#E0F5FF", fg: "#0369A1" }
];

function buildMarquee() {
  const track = document.getElementById('marqueeTrack');
  if (!track) return;
  let html = '';
  const doubled = [...customers, ...customers];
  doubled.forEach(c => {
    html += `<div class="c-chip">
      <div class="c-av" style="background:${c.bg};color:${c.fg};">${c.initials}</div>
      ${c.name}
      <span class="c-stars">★★★★★</span>
    </div>`;
  });
  track.innerHTML = html;
}

// ----- MOBILE MENU TOGGLE -----
function initMobileMenu() {
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ----- SCROLL REVEAL OBSERVER -----
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in'), idx * 50);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
}

// ----- SHRINKING STICKY HEADER -----
// Logo starts large and floats below the nav bar on the hero.
// When the user scrolls past ~60px the nav gets the glass background
// and the logo smoothly shrinks to fit neatly inside the nav bar.
function initStickyNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  const SCROLL_THRESHOLD = 60;
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > SCROLL_THRESHOLD) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  // Run once on load in case page is refreshed mid-scroll
  onScroll();
}

// =====================================================
// CUSTOM FORM SUBMISSION HANDLER
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz__qSNCzFe8Ag45_xlrq-0apQdZJbJSV5B0rlNBFUKmVJrbd3N3ZKs41JoYJx6AqLk7Q/exec';

  // ----- INLINE FIELD VALIDATION -----
  function showFieldError(inputEl, msg) {
    clearFieldError(inputEl);
    inputEl.style.borderColor = '#EF4444';
    const err = document.createElement('span');
    err.className = 'field-error';
    err.style.cssText = 'display:block;color:#EF4444;font-size:0.78rem;margin-top:4px;';
    err.textContent = '⚠ ' + msg;
    inputEl.parentNode.appendChild(err);
  }

  function clearFieldError(inputEl) {
    inputEl.style.borderColor = '';
    const prev = inputEl.parentNode.querySelector('.field-error');
    if (prev) prev.remove();
  }

  // ----- PHONE LENGTH RULES PER COUNTRY CODE -----
  // Value = accepted national number length(s) (digits only, no country code).
  // Some countries allow more than one valid length (e.g. landline vs mobile).
  const PHONE_LENGTH_RULES = {
    '+91':  [10],         // India
    '+1':   [10],         // USA / Canada
    '+44':  [10, 11],     // UK
    '+61':  [9],          // Australia
    '+971': [9],          // UAE
    '+974': [8],          // Qatar
    '+966': [9],          // Saudi Arabia
    '+65':  [8],          // Singapore
    '+60':  [9, 10],      // Malaysia
    '+49':  [10, 11],     // Germany
    '+33':  [9],          // France
    '+39':  [9, 10],      // Italy
    '+81':  [10],         // Japan
    '+86':  [11],         // China
    '+7':   [10],         // Russia
    '+55':  [10, 11],     // Brazil
    '+27':  [9],          // South Africa
    '+234': [10],         // Nigeria
    '+254': [9],          // Kenya
    '+92':  [10],         // Pakistan
    '+880': [10],         // Bangladesh
    '+94':  [9],          // Sri Lanka
    '+977': [10],         // Nepal
    '+64':  [9, 10],      // New Zealand
    '+353': [9],          // Ireland
    '+31':  [9],          // Netherlands
    '+34':  [9],          // Spain
    '+46':  [9],          // Sweden
    '+47':  [8],          // Norway
    '+45':  [8],          // Denmark
  };

  const COUNTRY_NAMES = {
    '+91': 'India', '+1': 'USA/Canada', '+44': 'UK', '+61': 'Australia',
    '+971': 'UAE', '+974': 'Qatar', '+966': 'Saudi Arabia', '+65': 'Singapore',
    '+60': 'Malaysia', '+49': 'Germany', '+33': 'France', '+39': 'Italy',
    '+81': 'Japan', '+86': 'China', '+7': 'Russia', '+55': 'Brazil',
    '+27': 'South Africa', '+234': 'Nigeria', '+254': 'Kenya', '+92': 'Pakistan',
    '+880': 'Bangladesh', '+94': 'Sri Lanka', '+977': 'Nepal', '+64': 'New Zealand',
    '+353': 'Ireland', '+31': 'Netherlands', '+34': 'Spain', '+46': 'Sweden',
    '+47': 'Norway', '+45': 'Denmark'
  };

  function validateForm() {
    let valid = true;

    const name    = document.getElementById('Name');
    const email   = document.getElementById('Email');
    const phone   = document.getElementById('Phone');
    const service = document.getElementById('Service');
    const message = document.getElementById('Message');

    [name, email, phone, service, message].forEach(clearFieldError);

    if (!name.value.trim()) {
      showFieldError(name, 'Please enter your full name.');
      valid = false;
    }

    // ----- EMAIL VALIDATION -----
    const emailVal = email.value.trim();
    if (!emailVal) {
      showFieldError(email, 'Please enter your email address.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(emailVal)) {
      showFieldError(email, 'Please enter a valid email address (e.g. you@example.com).');
      valid = false;
    }

    // ----- PHONE VALIDATION (per selected country code) -----
    const phoneVal = phone.value.trim();
    const digitsOnly = phoneVal.replace(/\D/g, '');
    const countryCodeEl = document.getElementById('CountryCode');
    const selectedCode = countryCodeEl ? countryCodeEl.value : '+91';
    const allowedLengths = PHONE_LENGTH_RULES[selectedCode] || [9, 10]; // fallback if a new code is added later
    const countryLabel = COUNTRY_NAMES[selectedCode] || selectedCode;

    if (!phoneVal) {
      showFieldError(phone, 'Please enter your phone number.');
      valid = false;
    } else if (!/^[\d\s\-\(\)]+$/.test(phoneVal)) {
      showFieldError(phone, 'Phone number contains invalid characters.');
      valid = false;
    } else if (!allowedLengths.includes(digitsOnly.length)) {
      const expected = allowedLengths.join(' or ');
      showFieldError(
        phone,
        `Enter a valid ${countryLabel} (${selectedCode}) number — expected ${expected} digits, got ${digitsOnly.length}.`
      );
      valid = false;
    }

    if (!service.value) {
      showFieldError(service, 'Please select a package you are interested in.');
      valid = false;
    }

    if (!message.value.trim()) {
      showFieldError(message, 'Please enter a message so we can help you better.');
      valid = false;
    }

    return valid;
  }

  // Clear error on input
  ['Name', 'Email', 'Phone', 'Service', 'Message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => clearFieldError(el));
  });

  // Re-check phone length whenever the country code changes
  const countryCodeSelect = document.getElementById('CountryCode');
  if (countryCodeSelect) {
    countryCodeSelect.addEventListener('change', () => {
      const phoneInput = document.getElementById('Phone');
      if (phoneInput) clearFieldError(phoneInput);
    });
  }

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = form.querySelector('.field-error');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const submitBtn      = document.getElementById('submitBtn');
    const originalBtnText = submitBtn.innerHTML;
    const formStatus     = document.getElementById('formStatus');

    submitBtn.disabled   = true;
    submitBtn.innerHTML  = 'Sending...';
    formStatus.style.display = 'block';
    formStatus.style.color   = 'var(--sky)';
    formStatus.innerHTML     = '📤 Submitting your inquiry...';

    const countryCode = document.getElementById('CountryCode')
      ? document.getElementById('CountryCode').value : '+91';
    const phoneRaw  = document.getElementById('Phone').value.trim();
    const fullPhone = phoneRaw ? countryCode + ' ' + phoneRaw : '';

    const payload = new URLSearchParams({
      Name:    document.getElementById('Name').value.trim(),
      Email:   document.getElementById('Email').value.trim(),
      Phone:   fullPhone,
      Service: document.getElementById('Service').value,
      Message: document.getElementById('Message').value.trim(),
    }).toString();

    try {
      await fetch(SCRIPT_URL, {
        method:  'POST',
        mode:    'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body:    payload
      });

      formStatus.style.color = '#22C55E';
      formStatus.innerHTML   = '✅ Thank you! We\'ve received your inquiry. A confirmation email with your reference number is on its way — please check your inbox.';
      form.reset();

      setTimeout(() => { formStatus.style.display = 'none'; }, 36000);

    } catch (error) {
      console.error('Error:', error);
      formStatus.style.color = '#EF4444';
      formStatus.innerHTML   = '❌ Something went wrong. Please try again or contact us directly via WhatsApp.';
    } finally {
      submitBtn.disabled  = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
});

// ----- WHATSAPP GREETING BUBBLE -----
function initWhatsAppBubble() {
  const bubble   = document.getElementById('waBubble');
  const closeBtn = document.getElementById('waBubbleClose');
  if (!bubble) return;

  setTimeout(() => {
    bubble.classList.add('show');
  }, 1800);

  if (closeBtn) {
    closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      bubble.classList.remove('show');
    });
  }
}

// ----- INITIALIZE EVERYTHING -----
document.addEventListener('DOMContentLoaded', () => {
  buildMarquee();
  initMobileMenu();
  initScrollReveal();
  initWhatsAppBubble();
  initStickyNav();
});