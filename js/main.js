/**
 * ImageStore — Premium Pre-Wedding Photography
 * js/main.js — Complete JavaScript Implementation
 */

document.addEventListener('DOMContentLoaded', function () {

  /* ==========================================================
     1. NAVBAR SCROLL BEHAVIOUR
     ========================================================== */
  (function initNavbarScroll() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    function onScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();


  /* ==========================================================
     2. HAMBURGER / MOBILE MENU TOGGLE
     ========================================================== */
  (function initHamburger() {
    var hamburger = document.querySelector('.hamburger');
    var mobileNav = document.querySelector('.nav-mobile');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  })();


  /* ==========================================================
     3. INTERSECTION OBSERVER — REVEAL ANIMATIONS
     ========================================================== */
  (function initReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  })();


  /* ==========================================================
     4. PORTFOLIO TAB FILTER
     ========================================================== */
  (function initPortfolioTabs() {
    var tabBtns = document.querySelectorAll('.tab-btn');
    var cards   = document.querySelectorAll('.portfolio-card');
    if (!tabBtns.length || !cards.length) return;

    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        tabBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var filter = btn.dataset.filter;

        cards.forEach(function (card) {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  })();


  /* ==========================================================
     5. LIGHTBOX
     ========================================================== */
  (function initLightbox() {
    var lightbox     = document.getElementById('lightbox');
    var lbImg        = document.querySelector('.lightbox-img');
    var lbTitle      = document.querySelector('.lightbox-title');
    var lbMeta       = document.querySelector('.lightbox-meta');
    var lbClose      = document.querySelector('.lightbox-close');
    var lbPrev       = document.querySelector('.lightbox-prev');
    var lbNext       = document.querySelector('.lightbox-next');
    var lbCounter    = document.querySelector('.lightbox-counter');

    if (!lightbox) return;

    var cards        = Array.from(document.querySelectorAll('.portfolio-card'));
    var currentIndex = 0;

    function getCardData(card) {
      var bg    = card.querySelector('.card-bg');
      var title = card.querySelector('.card-title');
      var meta  = card.querySelector('.card-meta');
      return {
        gradient: bg ? bg.className.split(' ').find(function (c) { return c.startsWith('card-bg-'); }) || '' : '',
        bgClass:  bg ? bg.className : '',
        title:    title ? title.textContent : '',
        meta:     meta  ? meta.textContent  : ''
      };
    }

    function openLightbox(index) {
      currentIndex = index;
      var data = getCardData(cards[index]);

      if (lbImg) {
        lbImg.className = 'lightbox-img ' + data.bgClass;
        lbImg.style.background = '';
      }
      if (lbTitle)   lbTitle.textContent   = data.title;
      if (lbMeta)    lbMeta.textContent    = data.meta;
      if (lbCounter) lbCounter.textContent = (index + 1) + ' / ' + cards.length;

      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      openLightbox(currentIndex);
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % cards.length;
      openLightbox(currentIndex);
    }

    cards.forEach(function (card, index) {
      card.addEventListener('click', function () {
        openLightbox(index);
      });
    });

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev)  lbPrev.addEventListener('click', showPrev);
    if (lbNext)  lbNext.addEventListener('click', showNext);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowLeft')   showPrev();
      if (e.key === 'ArrowRight')  showNext();
    });
  })();


  /* ==========================================================
     6. TESTIMONIALS CAROUSEL
     ========================================================== */
  (function initTestimonials() {
    var inner    = document.querySelector('.testimonials-inner');
    var slides   = document.querySelectorAll('.testimonial-slide');
    var dots     = document.querySelectorAll('.t-dot');
    var prevBtn  = document.querySelector('.t-prev');
    var nextBtn  = document.querySelector('.t-next');
    if (!inner || !slides.length) return;

    var current   = 0;
    var total     = slides.length;
    var autoTimer = null;

    function goTo(index) {
      current = (index + total) % total;
      inner.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === current);
      });
    }

    function startAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(function () {
        goTo(current + 1);
      }, 4000);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        goTo(current - 1);
        startAuto();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        goTo(current + 1);
        startAuto();
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        goTo(i);
        startAuto();
      });
    });

    goTo(0);
    startAuto();
  })();


  /* ==========================================================
     7. BOOKING FORM VALIDATION + MOCK SUBMIT
     ========================================================== */
  (function initBookingForm() {
    var form    = document.getElementById('booking-form');
    var success = document.getElementById('form-success');
    if (!form) return;

    function showError(group, message) {
      var el = group.querySelector('.error-msg');
      group.classList.add('has-error');
      if (el) el.textContent = message;
    }

    function clearError(group) {
      group.classList.remove('has-error');
    }

    function validateField(group) {
      var input   = group.querySelector('input, select, textarea');
      var isValid = true;
      if (!input) return true;

      clearError(group);

      if (input.hasAttribute('required') && !input.value.trim()) {
        showError(group, 'This field is required.');
        isValid = false;
      } else if (input.type === 'email' && input.value.trim()) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
          showError(group, 'Please enter a valid email address.');
          isValid = false;
        }
      } else if (input.dataset.type === 'phone' && input.value.trim()) {
        if (!/^[6-9]\d{9}$/.test(input.value.replace(/\s/g, ''))) {
          showError(group, 'Please enter a valid 10-digit Indian mobile number.');
          isValid = false;
        }
      }

      return isValid;
    }

    form.querySelectorAll('.form-group').forEach(function (group) {
      var input = group.querySelector('input, select, textarea');
      if (input) {
        input.addEventListener('input', function () { validateField(group); });
        input.addEventListener('blur',  function () { validateField(group); });
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var groups  = form.querySelectorAll('.form-group');
      var allOk   = true;

      groups.forEach(function (group) {
        if (!validateField(group)) allOk = false;
      });

      if (!allOk) return;

      var submitBtn   = form.querySelector('[type="submit"]');
      var originalTxt = submitBtn ? submitBtn.textContent : '';

      if (submitBtn) {
        submitBtn.disabled    = true;
        submitBtn.textContent = 'Checking availability…';
      }

      setTimeout(function () {
        form.style.display = 'none';
        if (success) success.classList.add('show');
        if (submitBtn) {
          submitBtn.disabled    = false;
          submitBtn.textContent = originalTxt;
        }
      }, 1500);
    });
  })();


  /* ==========================================================
     8. AI PACKAGE SUGGESTER
     ========================================================== */
  (function initAISuggester() {
    var slider    = document.getElementById('budget-slider');
    var valueEl   = document.getElementById('budget-value');
    var resultEl  = document.getElementById('ai-result');
    if (!slider || !resultEl) return;

    var packages = {
      basic: {
        name: 'Basic Package',
        price: '₹25,000',
        desc: '4 hrs · 1 location · 100 edited photos · 1 reel — Perfect for intimate shoots.'
      },
      premium: {
        name: 'Premium Package',
        price: '₹45,000',
        desc: '8 hrs · 2 locations · 200 photos · 2 reels · 1 cinematic video — Our most popular choice!'
      },
      luxury: {
        name: 'Luxury Package',
        price: '₹75,000',
        desc: 'Full day · 3 locations · 400 photos · 3 reels · 2 cinematic videos · Album book — The complete experience.'
      }
    };

    function formatINR(val) {
      return '₹' + Number(val).toLocaleString('en-IN');
    }

    function suggest(budget) {
      if (budget < 25000) return packages.basic;
      if (budget <= 50000) return packages.premium;
      return packages.luxury;
    }

    function render(budget) {
      var pkg = suggest(budget);
      resultEl.innerHTML =
        '<div class="ai-recommendation">' +
          '<div class="rec-label">✨ Recommended for your budget of ' + formatINR(budget) + '</div>' +
          '<div class="rec-name">' + pkg.name + '</div>' +
          '<div class="rec-desc">' + pkg.desc + '</div>' +
        '</div>';
    }

    slider.addEventListener('input', function () {
      var val = parseInt(slider.value, 10);
      if (valueEl) valueEl.textContent = formatINR(val);
      render(val);
    });

    var initial = parseInt(slider.value, 10);
    if (valueEl) valueEl.textContent = formatINR(initial);
    render(initial);
  })();


  /* ==========================================================
     9. STATS COUNTER ANIMATION
     ========================================================== */
  (function initStatsCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var animated = false;

    function animateCounter(el) {
      var target   = parseInt(el.dataset.count, 10);
      var suffix   = el.dataset.suffix || '';
      var prefix   = el.dataset.prefix || '';
      var duration = 2000;
      var start    = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased    = 1 - Math.pow(1 - progress, 3);
        var value    = Math.floor(eased * target);
        el.textContent = prefix + value + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = prefix + target + suffix;
        }
      }

      requestAnimationFrame(step);
    }

    var observer = new IntersectionObserver(function (entries) {
      var anyVisible = entries.some(function (e) { return e.isIntersecting; });
      if (anyVisible && !animated) {
        animated = true;
        counters.forEach(function (el) { animateCounter(el); });
        observer.disconnect();
      }
    }, { threshold: 0.3 });

    counters.forEach(function (el) { observer.observe(el); });
  })();


  /* ==========================================================
     10. WHATSAPP + BACK-TO-TOP VISIBILITY
     ========================================================== */
  (function initScrollButtons() {
    var backBtn = document.getElementById('back-to-top');
    if (!backBtn) return;

    function onScroll() {
      if (window.scrollY > 300) {
        backBtn.classList.add('visible');
      } else {
        backBtn.classList.remove('visible');
      }
    }

    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();


  /* ==========================================================
     11. SMOOTH SCROLL FOR ANCHOR LINKS
     ========================================================== */
  (function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = anchor.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        var offset = 70;
        var top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  })();


  /* ==========================================================
     12. ALBUM PAGE — LOAD ALBUM DATA FROM URL
     ========================================================== */
  (function initAlbumPage() {
    if (!document.getElementById('album-page')) return;

    var albums = [
      {
        id: 1,
        couple: 'Priya & Arjun',
        location: 'Udaipur, Rajasthan',
        date: 'March 2024',
        heroBg: 'linear-gradient(135deg, #1a0533, #7c3aed, #c9a84c)',
        story: 'A tale of timeless romance set against the golden palaces of Udaipur. Priya and Arjun\'s chemistry was electric from the first frame — every stolen glance, every laugh, every tender moment felt like poetry in motion.'
      },
      {
        id: 2,
        couple: 'Meera & Rohan',
        location: 'Jaipur, Rajasthan',
        date: 'January 2024',
        heroBg: 'linear-gradient(135deg, #0d1f3c, #1d4ed8, #e8c97a)',
        story: 'The Pink City served as the perfect canvas for Meera and Rohan\'s love story. Amidst the vibrant hues of Jaipur\'s forts and havelis, their bond shone brighter than any jewel.'
      },
      {
        id: 3,
        couple: 'Sneha & Vikram',
        location: 'Goa, India',
        date: 'December 2023',
        heroBg: 'linear-gradient(135deg, #0a1a0a, #15803d, #c9a84c)',
        story: 'Sun, sand, and a love that knows no bounds. Sneha and Vikram chose Goa\'s pristine beaches as the backdrop for their dreamy pre-wedding shoot, and the results were nothing short of magical.'
      },
      {
        id: 4,
        couple: 'Ananya & Karan',
        location: 'Shimla, Himachal Pradesh',
        date: 'November 2023',
        heroBg: 'linear-gradient(135deg, #1a1a00, #a16207, #e8c97a)',
        story: 'Snow-capped peaks and misty valleys framed the breathtaking love story of Ananya and Karan. Every frame from Shimla felt like a painting come to life.'
      },
      {
        id: 5,
        couple: 'Riya & Aditya',
        location: 'Mysore, Karnataka',
        date: 'February 2024',
        heroBg: 'linear-gradient(135deg, #1a0010, #be185d, #c9a84c)',
        story: 'The regal splendor of Mysore Palace witnessed Riya and Aditya\'s enchanting pre-wedding celebration — a blend of tradition and modern romance that left everyone spellbound.'
      },
      {
        id: 6,
        couple: 'Pooja & Nikhil',
        location: 'Mumbai, Maharashtra',
        date: 'April 2024',
        heroBg: 'linear-gradient(135deg, #001020, #0369a1, #e8c97a)',
        story: 'The city of dreams was the perfect stage for Pooja and Nikhil\'s urban love story. From Marine Drive to heritage lanes, their love lit up Mumbai\'s iconic skyline.'
      }
    ];

    var params = new URLSearchParams(window.location.search);
    var id     = parseInt(params.get('id'), 10);
    var album  = albums.find(function (a) { return a.id === id; });

    var container = document.getElementById('album-page');

    if (!album) {
      container.innerHTML =
        '<div class="album-not-found">' +
          '<h2>Album Not Found</h2>' +
          '<p>We couldn\'t find the album you\'re looking for.</p>' +
          '<a href="index.html#albums" class="btn btn-gold">Back to Albums</a>' +
        '</div>';
      return;
    }

    var heroBgEl = document.getElementById('album-hero-bg');
    if (heroBgEl) heroBgEl.style.background = album.heroBg;

    var coupleNameEl = document.getElementById('album-couple-name');
    if (coupleNameEl) {
      var names = album.couple.split(' & ');
      coupleNameEl.innerHTML = names[0] + ' <span>&amp;</span> ' + names[1];
    }

    var locationEl = document.getElementById('album-location');
    if (locationEl) locationEl.textContent = album.location;

    var dateEl = document.getElementById('album-date');
    if (dateEl) dateEl.textContent = album.date;

    var storyEl = document.getElementById('album-story');
    if (storyEl) storyEl.textContent = album.story;

    var coupleCtaEl = document.getElementById('album-cta-couple');
    if (coupleCtaEl) coupleCtaEl.textContent = album.couple;

    document.title = album.couple + ' — ImageStore';
  })();

});
