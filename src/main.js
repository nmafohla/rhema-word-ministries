// Rhema Word Ministries Client Logic
import './style.css';

// ================= DATABASE INITIAL STATE =================
const DEFAULT_DATABASE = {
  announcement: {
    enabled: true,
    badge: "Live Notice",
    message: "Special Miracle & Prophetic Service this Sunday at 11:00 AM! Join us in Bulawayo or online.",
    btnText: "Service Times",
    btnLink: "#events"
  },
  serviceTimes: {
    sunday: "11:00 – 13:30",
    partners: "17:30 – 19:00",
    midweek: "17:30 – 19:00",
    morning: "06:45 – 07:45",
    lunch: "13:00 – 14:00",
    phone: "+263 775 662 844",
    address: "Luxor House Building (Basement), Cnr 9th Ave & Fife Street, Bulawayo, Zimbabwe"
  },
  scriptures: [
    { id: "s-1", date: "2026-07-11", verse: "Romans 10:17", text: "So then faith comes by hearing, and hearing by the word of God.", author: "Apostle Keith" },
    { id: "s-2", date: "2026-07-10", verse: "Philippians 4:19", text: "And my God shall supply all your need according to His riches in glory by Christ Jesus.", author: "Apostle Keith" },
    { id: "s-3", date: "2026-07-09", verse: "Hebrews 11:1", text: "Now faith is the substance of things hoped for, the evidence of things not seen.", author: "Apostle Keith" },
    { id: "s-4", date: "2026-07-08", verse: "Isaiah 53:5", text: "But He was wounded for our transgressions, He was bruised for our iniquities; The chastisement for our peace was upon Him, And by His stripes we are healed.", author: "Apostle Keith" }
  ],
  blogs: [
    {
      id: "b-1",
      title: "Understanding the Apostolic Mandate",
      category: "Weekly Word",
      summary: "Explore the blueprint of apostolic ministry and how Rhema Word Ministries is established to manifest kingdom dynamics.",
      content: "The apostolic mandate is not merely a title; it is a spiritual sending, a blueprint for establishing the order and power of God in the earth. In this era, God is moving the church into high-impact ministries. True apostolic ministry balances the weight of spiritual teaching with practical community interventions, demonstrating Christ's love through actions like food relief and educational support.",
      date: "2026-07-09",
      author: "Apostle Keith Bhehane"
    },
    {
      id: "b-2",
      title: "The Sound of Abundance",
      category: "Sermon Series",
      summary: "Hear what the Spirit is saying in this season. Transitioning from scarcity to divine surplus through active faith.",
      content: "When Elijah told Ahab that there is a sound of abundance of rain, there was no cloud in the sky. Faith operates in the frequency of hearing before seeing. If you can align your spirit to hear the Rhema word of God for this hour, you will begin to walk in abundance, even in dry seasons. Stand firm on the promises, declare the word, and prepare your storehouse.",
      date: "2026-07-02",
      author: "Apostle Keith Bhehane"
    }
  ],
  events: [
    { id: "e-1", title: "Sunday Celebration Service", date: "2026-08-16", time: "11:00 AM - 01:30 PM", location: "Luxor House Basement, Cnr 9th Ave & Fife St, Bulawayo", description: "Experience heartfelt worship, dynamic preaching of the Rhema Word, and supernatural demonstrations of the Holy Spirit with Apostle Keith & Pastor Talent." },
    { id: "e-2", title: "Midweek Service & Miracle Gathering", date: "2026-08-20", time: "05:30 PM - 07:00 PM", location: "Luxor House Basement, Cnr 9th Ave & Fife St, Bulawayo", description: "Deep dive into scripture, prayer, and prophetic ministry every Thursday evening." },
    { id: "e-3", title: "People's Foundation Community Food Drive", date: "2026-08-22", time: "10:00 AM", location: "Bulawayo Central & Surrounding Communities", description: "Volunteers gather to distribute basic needs and community aids." }
  ],
  charityLogs: [
    { id: "c-1", title: "Mealie Meal Community Relief Outreach", date: "2017 to Date", bags: 120, households: 95, cost: "$1,200", image: "/images/charity-dist-1.jpg", details: "Direct distribution of Refined Mealie Meal bags alongside sugar, cooking oil, and soap packages to vulnerable families." },
    { id: "c-2", title: "Elderly & Widows Food Support", date: "2017 to Date", bags: 90, households: 72, cost: "$900", image: "/images/charity-dist-2.jpg", details: "Direct food basket distributions providing essential mealie meal and groceries for senior citizens." },
    { id: "c-3", title: "Community Food Relief Initiative", date: "2017 to Date", bags: 110, households: 85, cost: "$1,100", image: "/images/charity-piles-3.jpg", details: "Acquired and distributed Roller Mealie Meal supplies to families and communities in need." }
  ],
  testimonies: [
    {
      id: "t-1",
      name: "Sister Brenda M.",
      location: "Bulawayo",
      title: "Supernatural Healing & Freedom",
      story: "I came to Rhema Word Ministries suffering from severe chronic pain. When Apostle Keith prayed and laid hands on me, the power of God moved powerfully and all pain left instantly! God is still doing miracles today!",
      date: "2026-07-28"
    },
    {
      id: "t-2",
      name: "Brother Tinashe N.",
      location: "Bulawayo",
      title: "Financial Breakthrough & Divine Open Doors",
      story: "After joining the Partners Service and committing to give faithfully toward the People's Foundation food drives, God opened an unexpected international contract for my company. Faith works!",
      date: "2026-08-02"
    },
    {
      id: "t-3",
      name: "Amai Chipo D.",
      location: "Bulawayo",
      title: "Restoration & Family Peace",
      story: "Our home was under spiritual confusion. The ministry of the uncompromised Word and prophetic declarations by Apostle Keith & Pastor Talent brought absolute peace, order, and salvation to my household.",
      date: "2026-08-06"
    }
  ],
  gallery: [
    { id: "g-1", title: "Direct Relief Distribution", category: "Mealie Meal Outreach", date: "Relief Mission", image: "/images/charity-dist-1.jpg", details: "Apostle Keith Bhehane personally handing out Refined Mealie Meal to local residents during our community hunger relief drive." },
    { id: "g-2", title: "Supporting the Elderly", category: "Food Security", date: "Relief Mission", image: "/images/charity-dist-2.jpg", details: "A personal encounter with an elderly community partner, receiving staple meals, cooking oil, and essential sanitation packages." },
    { id: "g-3", title: "Community Food Relief Campaign", category: "Family Support", date: "Relief Mission", image: "/images/charity-dist-3.jpg", details: "Apostle Keith handing essential food baskets and maize meal bags to households, ensuring child-headed and single-parent families are supported." },
    { id: "g-4", title: "Community Empowerment", category: "Aid Mission", date: "Relief Mission", image: "/images/charity-dist-4.jpg", details: "Empowering residents through direct support. Our team continues to expand outreaches to more families and districts." },
    { id: "g-5", title: "Staple Stock Supplies", category: "Warehouse Stockpile", date: "Relief Mission", image: "/images/charity-piles-1.jpg", details: "Piles of Refined Mealie Meal stockpiled at our community dispatch center, ready for distribution to vulnerable families." },
    { id: "g-6", title: "Relief Food Packaging", category: "Volunteer Sorting", date: "Relief Mission", image: "/images/charity-piles-2.jpg", details: "Cooking oil bottles, flour, and basic nutrition supplies lined up for fast packing and sorting by our volunteers." },
    { id: "g-7", title: "Roller Meal Stockpile", category: "Logistics", date: "Relief Mission", image: "/images/charity-piles-3.jpg", details: "Bulk shipments of premium roller meal bags stored safely inside our ministry warehouse, securing nutrition supply lines." },
    { id: "g-8", title: "Apostolic Service Leading", category: "Church Life & Worship", date: "Recent Service", image: "/images/gallery-life-1.jpg", details: "Leading the congregation with joy and divine authority during our weekly gatherings." },
    { id: "g-9", title: "Supernatural Atmosphere of Worship", category: "Worship Encounter", date: "Sunday Celebration", image: "/images/gallery-life-2.jpg", details: "A packed sanctuary raising their hands in absolute surrender to the presence of God." },
    { id: "g-10", title: "Pastoral Covenant & Study", category: "Leadership", date: "Special Event", image: "/images/gallery-life-3.jpg", details: "Apostle Keith & Pastor Talent in absolute alignment, studying the word and signing covenant records." },
    { id: "g-11", title: "Interceding from the Altar", category: "Ministry", date: "Prophetic Service", image: "/images/gallery-life-4.jpg", details: "Apostle Keith leading the church in intercession and deep prophetic prayer under the uncompromised Word." },
    { id: "g-12", title: "The Next Generation Worshipping", category: "Family & Youth", date: "Sunday School", image: "/images/gallery-life-5.jpg", details: "Our youth entering into deep fellowship and spiritual consciousness at a very young age." },
    { id: "g-13", title: "Divine Preaching of the Word", category: "Church Life & Worship", date: "Sunday Celebration", image: "/images/gallery-life-6.jpg", details: "Preaching the uncompromised Rhema Word under the heavy anointing of the Holy Spirit." },
    { id: "g-14", title: "Deep Intercession", category: "Worship Encounter", date: "Miracle Service", image: "/images/gallery-life-7.jpg", details: "Prophetic ministry and healing demonstrations taking place at the altar during weekly service." },
    { id: "g-15", title: "Worship Moments", category: "Worship Encounter", date: "Sunday Celebration", image: "/images/gallery-life-8.jpg", details: "The congregation lifted in heartfelt praise and worship, experiencing the glory of God." },
    { id: "g-16", title: "Children Worshipping", category: "Family & Youth", date: "Youth Service", image: "/images/gallery-life-9.jpg", details: "Young children manifesting faith and entering into the presence of God." }
  ],
  inquiries: [
    { id: "inq-1", name: "Tatenda Moyo", email: "tatenda@example.com", phone: "+263 77 123 4567", subject: "Prayer Request", message: "Please stand with my family in prayer for breakthrough and complete healing for my mother.", date: "2026-08-11", read: false },
    { id: "inq-2", name: "Memory Ndlovu", email: "memory@example.com", phone: "+263 71 987 6543", subject: "Charity Partnership", message: "I would like to contribute 20 bags of mealie meal to the upcoming People's Foundation distribution.", date: "2026-08-12", read: true }
  ],
  donations: [
    { id: "d-1", donor: "Apostle Partner", email: "partner@test.com", amount: 150, target: "People's Foundation", date: "2026-07-11T12:00:00.000Z" },
    { id: "d-2", donor: "Sister Faith", email: "faith@zmail.co.zw", amount: 50, target: "Tithe", date: "2026-07-10T15:30:00.000Z" }
  ],
  settings: {
    totalRaised: 14500,
    totalBags: 1250,
    familiesReached: 850
  }
};

// Initialize Database in LocalStorage (with migration for latest updates)
function initDB() {
  const existing = localStorage.getItem('rwm_database');
  if (!existing) {
    localStorage.setItem('rwm_database', JSON.stringify(DEFAULT_DATABASE));
  } else {
    try {
      const parsed = JSON.parse(existing);
      // Migrate keys
      if (!parsed.announcement) parsed.announcement = DEFAULT_DATABASE.announcement;
      if (!parsed.serviceTimes) parsed.serviceTimes = DEFAULT_DATABASE.serviceTimes;
      if (!parsed.testimonies) parsed.testimonies = DEFAULT_DATABASE.testimonies;
      if (!parsed.gallery) {
        parsed.gallery = DEFAULT_DATABASE.gallery;
      } else {
        const hasG8 = parsed.gallery.some(p => p.id === 'g-8');
        if (!hasG8) {
          DEFAULT_DATABASE.gallery.forEach(p => {
            if (!parsed.gallery.some(x => x.id === p.id)) {
              parsed.gallery.push(p);
            }
          });
        }
      }
      if (!parsed.inquiries) parsed.inquiries = DEFAULT_DATABASE.inquiries;
      if (!parsed.events || parsed.events.some(e => e.location && e.location.includes('Harare'))) {
        parsed.events = DEFAULT_DATABASE.events;
        parsed.charityLogs = DEFAULT_DATABASE.charityLogs;
      }
      // Migration to fix 10th Ave -> 9th Ave
      if (parsed.serviceTimes && parsed.serviceTimes.address && parsed.serviceTimes.address.includes('10th Ave')) {
        parsed.serviceTimes.address = parsed.serviceTimes.address.replace('10th Ave', '9th Ave');
      }
      if (parsed.events) {
        parsed.events.forEach(ev => {
          if (ev.location && ev.location.includes('10th Ave')) {
            ev.location = ev.location.replace('10th Ave', '9th Ave');
          }
          if (ev.id === 'e-3') {
            ev.description = 'Volunteers gather to distribute basic needs and community aids.';
          }
        });
      }
      localStorage.setItem('rwm_database', JSON.stringify(parsed));
    } catch (e) {
      localStorage.setItem('rwm_database', JSON.stringify(DEFAULT_DATABASE));
    }
  }
}
initDB();

// Read DB
function getDB() {
  return JSON.parse(localStorage.getItem('rwm_database')) || DEFAULT_DATABASE;
}

// Write DB
function saveDB(db) {
  localStorage.setItem('rwm_database', JSON.stringify(db));
}

// ================= CLIENT ROUTER =================
function handleRouting() {
  const hash = window.location.hash || '#home';
  const tabName = hash.split('?')[0].replace('#', '');
  
  // Parse hash query parameters for payment redirects
  const queryStr = hash.split('?')[1];
  if (queryStr) {
    const params = new URLSearchParams(queryStr);
    const status = params.get('status');
    if (status === 'success') {
      const amt = parseFloat(params.get('amt'));
      const target = params.get('target');
      const email = params.get('email');
      const donor = params.get('donor') || 'Anonymous';
      const ref = params.get('ref') || `PESE-${Date.now()}`;
      
      const db = getDB();
      // Avoid duplicates
      const exists = db.donations.some(d => d.id === ref);
      if (!exists) {
        const tx = {
          id: ref,
          donor,
          email,
          amount: amt,
          target: target === 'tithe' ? 'Tithe' : (target === 'offering' ? 'Offering' : "People's Foundation"),
          date: new Date().toISOString()
        };
        db.donations.unshift(tx);
        
        db.settings.totalRaised += amt;
        const extraBags = Math.floor(amt / 15);
        if (extraBags > 0) {
          db.settings.totalBags += extraBags;
          db.settings.familiesReached += Math.floor(extraBags * 0.8);
        }
        
        saveDB(db);
        setTimeout(() => {
          renderAllFeeds();
          // Populate receipt
          document.getElementById('receipt-number').innerText = ref;
          document.getElementById('receipt-date').innerText = new Date().toLocaleDateString();
          document.getElementById('receipt-donor').innerText = email;
          document.getElementById('receipt-type').innerText = tx.target;
          document.getElementById('receipt-amount').innerText = `$${amt.toFixed(2)}`;
          document.getElementById('receipt-popover').classList.add('active');
        }, 100);
      }
      
      // Clear query params to keep clean URL
      window.location.hash = `#${tabName}`;
      return;
    }
  }

  // Update nav link active state
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('data-tab') === tabName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Toggle Tab content sections
  document.querySelectorAll('.tab-content').forEach(section => {
    if (section.id === `tab-${tabName}`) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });

  // Scroll to top
  window.scrollTo(0, 0);
  
  // Re-run icons render
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window.addEventListener('hashchange', handleRouting);
// Run initialization immediately on script load (instead of waiting for window.load)
handleRouting();
setupCarousels();
renderAllFeeds();
setupGalleryFilters();
setupSwipeToDismissNav();
initScrollNav();
initScrollReveal();
triggerHeroReveal();

// Setup click targets on logos / footers pointing to specific tabs
document.addEventListener('click', (e) => {
  const target = e.target.closest('[data-nav-target]');
  if (target) {
    e.preventDefault();
    const dest = target.getAttribute('data-nav-target');
    window.location.hash = `#${dest}`;
  }
});

// ================= SCROLL EFFECTS =================
function initScrollNav() {
  const header = document.querySelector('.main-header');
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  requestAnimationFrame(onScroll);
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));
}

function triggerHeroReveal() {
  setTimeout(() => {
    document.querySelectorAll('.hero-overlay-content .reveal').forEach(el => {
      el.classList.add('visible');
    });
  }, 200);
}

// ================= MOBILE NAVIGATION TOGGLE =================
const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
const navMenuContainer = document.getElementById('nav-menu-container');

if (mobileToggleBtn && navMenuContainer) {
  mobileToggleBtn.addEventListener('click', () => {
    navMenuContainer.classList.toggle('active');
  });

  navMenuContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
      navMenuContainer.classList.remove('active');
    }
  });
}

// ================= HERO CAROUSEL =================
function setupCarousels() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  let currentIdx = 0;
  let interval;

  const carousel = document.querySelector('.hero-carousel');
  if (carousel) {
    requestAnimationFrame(() => {
      carousel.classList.add('initialized');
    });
  }

  function showSlide(index) {
    if (slides.length === 0) return;
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    currentIdx = (index + slides.length) % slides.length;
    slides[currentIdx].classList.add('active');
    if (dots[currentIdx]) dots[currentIdx].classList.add('active');
  }

  function startAutoplay() {
    interval = setInterval(() => {
      showSlide(currentIdx + 1);
    }, 5000);
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      clearInterval(interval);
      showSlide(idx);
      startAutoplay();
    });
  });

  startAutoplay();
}

// ================= FEEDS RENDERING LOGIC =================
function renderAllFeeds() {
  const db = getDB();
  
  // 1. Live Announcement Banner
  renderAnnouncement(db.announcement);

  // 2. Home Page scripture & stats
  if (db.scriptures && db.scriptures.length > 0) {
    const newest = db.scriptures[0];
    const textEl = document.getElementById('home-scripture-text');
    const verseEl = document.getElementById('home-scripture-verse');
    if (textEl && verseEl) {
      textEl.textContent = `"${newest.text}"`;
      verseEl.textContent = `— ${newest.verse}`;
    }
  }

  // Load numbers stats
  const totalBags = db.settings.totalBags.toLocaleString();
  const familiesReached = db.settings.familiesReached.toLocaleString();
  const totalRaised = db.settings.totalRaised.toLocaleString();

  const statBagsHome = document.getElementById('stat-bags-home');
  const statFamiliesHome = document.getElementById('stat-families-home');
  if (statBagsHome) statBagsHome.textContent = totalBags + "+";
  if (statFamiliesHome) statFamiliesHome.textContent = familiesReached + "+";

  // Foundation Page Counters
  const statBagsCounter = document.getElementById('stat-bags-counter');
  const statFamiliesCounter = document.getElementById('stat-families-counter');
  const statRaisedCounter = document.getElementById('stat-raised-counter');

  if (statBagsCounter) statBagsCounter.textContent = totalBags;
  if (statFamiliesCounter) statFamiliesCounter.textContent = familiesReached;
  if (statRaisedCounter) statRaisedCounter.textContent = `$${totalRaised}`;

  // 3. Render Testimonies
  renderTestimonies(db.testimonies || []);

  // 4. Render Gallery
  renderGallery(db.gallery || []);

  // 5. Render Charity Encounters ledger
  renderCharityLedger(db.charityLogs);

  // 6. Render Blog Updates & sidebar scriptures
  renderBlogsFeed(db.blogs);
  renderScriptureArchive(db.scriptures);

  // 7. Render Events and Side Calendar
  renderEventsFeed(db.events);
  renderSideCalendar(db.events);

  // 8. Update Inbox Unread Badge Counter
  updateInboxBadge(db.inquiries || []);
  setupFluidInteractiveStates();
}

// Render Announcement Banner
function renderAnnouncement(ann) {
  const bar = document.getElementById('live-announcement-bar');
  if (!bar) return;
  if (!ann || !ann.enabled) {
    if (bar.classList.contains('active')) {
      bar.classList.remove('active');
    }
    return;
  }
  if (!bar.classList.contains('active')) {
    bar.classList.add('active');
  }
  const badgeEl = document.getElementById('announcement-badge-text');
  const textEl = document.getElementById('announcement-main-text');
  const btnEl = document.getElementById('announcement-action-btn');
  
  const targetBadge = ann.badge || 'Notice';
  const targetText = ann.message || '';
  const targetBtnText = ann.btnText || 'Details';
  const targetBtnLink = ann.btnLink || '#events';
  const targetNavTarget = targetBtnLink.replace('#', '');
  
  if (badgeEl && badgeEl.textContent !== targetBadge) badgeEl.textContent = targetBadge;
  if (textEl && textEl.textContent !== targetText) textEl.textContent = targetText;
  if (btnEl) {
    if (btnEl.textContent !== targetBtnText) btnEl.textContent = targetBtnText;
    if (btnEl.getAttribute('href') !== targetBtnLink) btnEl.setAttribute('href', targetBtnLink);
    if (btnEl.getAttribute('data-nav-target') !== targetNavTarget) {
      btnEl.setAttribute('data-nav-target', targetNavTarget);
    }
  }
}

// Dismiss Announcement banner button
const btnCloseAnnouncement = document.getElementById('btn-close-announcement');
if (btnCloseAnnouncement) {
  btnCloseAnnouncement.addEventListener('click', () => {
    const bar = document.getElementById('live-announcement-bar');
    if (bar) bar.classList.remove('active');
  });
}

// Render Testimonies on Home Page
function renderTestimonies(testimonies) {
  const container = document.getElementById('home-testimonies-container');
  if (!container) return;
  container.innerHTML = '';
  if (!testimonies.length) {
    container.innerHTML = `<p style="text-align:center; color:var(--txt-secondary); grid-column:1/-1;">Testimonies loaded soon!</p>`;
    return;
  }
  testimonies.forEach(item => {
    const card = document.createElement('div');
    card.className = 'glass-card testimony-card reveal';
    card.innerHTML = `
      <div>
        <i data-lucide="quote" class="testimony-quote-icon"></i>
        <h3 style="font-size:1.1rem; margin-bottom:10px; color:var(--accent); font-weight:700;">${item.title}</h3>
        <p class="testimony-text">"${item.story}"</p>
      </div>
      <div class="testimony-author-row">
        <div class="testimony-avatar"><i data-lucide="user" style="width:16px; height:16px;"></i></div>
        <div class="testimony-meta">
          <span style="font-size:0.84rem; color:var(--txt-secondary);">${item.location || 'Bulawayo'} • ${item.date || 'Recent Miracle'}</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Render Foundation Acts Photo Gallery
function renderGallery(photos) {
  const grid = document.getElementById('foundation-acts-grid');
  if (!grid) return;
  if (!photos || photos.length === 0) return;
  grid.innerHTML = '';
  photos.forEach(photo => {
    const card = document.createElement('div');
    card.className = 'outreach-card glass-card';
    card.innerHTML = `
      <div class="outreach-img-wrapper">
        <img src="${photo.image || '/images/charity-dist-1.jpg'}" alt="${photo.title}" loading="lazy">
        <div class="outreach-overlay">
          <span class="outreach-date">${photo.date || 'Relief Mission'}</span>
        </div>
      </div>
      <div class="outreach-info">
        <span style="font-size:0.72rem; color:var(--accent); font-weight:700; text-transform:uppercase; letter-spacing:0.08em; display:block; margin-bottom:4px;">${photo.category || 'Outreach'}</span>
        <h3>${photo.title}</h3>
        <p>${photo.details || ''}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Setup Gallery filters (All / Church Life & Worship / People's Foundation)
function setupGalleryFilters() {
  const filterBtns = document.querySelectorAll('.btn-filter');
  if (!filterBtns.length) return;
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const activeFilter = btn.getAttribute('data-filter');
      const db = getDB();
      const photos = db.gallery || [];
      const filtered = activeFilter === 'all' 
        ? photos 
        : photos.filter(p => {
            const cat = (p.category || '').toLowerCase();
            if (activeFilter === 'church-life') {
              return cat.includes('church') || cat.includes('worship') || cat.includes('leadership') || cat.includes('family') || cat.includes('youth') || cat.includes('life') || cat.includes('ministry') || cat.includes('encounter');
            } else if (activeFilter === 'outreach') {
              return cat.includes('outreach') || cat.includes('food') || cat.includes('security') || cat.includes('support') || cat.includes('aid') || cat.includes('logistics') || cat.includes('mission');
            }
            return true;
          });
      renderGallery(filtered);
    });
  });
}

// Render Charity Encounters Table
function renderCharityLedger(logs) {
  const tbody = document.getElementById('charity-ledger-body');
  if (!tbody) return;

  tbody.innerHTML = '';
  
  if (logs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color: var(--txt-secondary);">No charity encounters logged.</td></tr>`;
    return;
  }

  logs.forEach(log => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <span class="encounter-title">${log.title}</span>
        <span class="encounter-date" style="color:var(--txt-muted); font-size:0.8rem;">${log.date}</span>
      </td>
      <td>Community Relief</td>
      <td><span class="txt-accent" style="font-weight:600;">${log.bags} Bags</span> of Mealie Meal</td>
      <td>
        <div class="encounter-story">
          <strong>${log.households} Households Reached</strong>. ${log.details}
        </div>
      </td>
      <td>
        <img src="${log.image || '/images/charity-dist-1.jpg'}" alt="Charity Visuals" class="table-pic-thumbnail">
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Render Blog/Updates
function renderBlogsFeed(posts) {
  const container = document.getElementById('blog-posts-container');
  if (!container) return;

  container.innerHTML = '';
  
  if (posts.length === 0) {
    container.innerHTML = `<div class="glass-card blog-card" style="text-align:center;"><p>No teachings posted yet. Check back soon!</p></div>`;
    return;
  }

  posts.forEach(post => {
    const card = document.createElement('article');
    card.className = 'glass-card blog-card';
    card.innerHTML = `
      <div class="blog-meta">
        <span><i data-lucide="calendar" style="width:14px;height:14px;"></i> ${post.date}</span>
        <span><i data-lucide="user" style="width:14px;height:14px;"></i> ${post.author}</span>
        <span class="txt-accent" style="font-weight:600;"><i data-lucide="tag" style="width:14px;height:14px;"></i> ${post.category}</span>
      </div>
      <h3>${post.title}</h3>
      <p>${post.summary}</p>
      <div class="blog-full-content" id="blog-content-${post.id}" style="display:none; border-top:1px solid var(--border-color); padding-top:16px; margin-top:12px; font-size:0.95rem; color:var(--txt-secondary);">
        ${post.content.replace(/\n/g, '<br>')}
      </div>
      <button class="btn-read-more" data-blog-btn="${post.id}">Read Sermon Details <i data-lucide="chevron-down" style="width:14px;height:14px;vertical-align:middle;"></i></button>
    `;
    container.appendChild(card);
  });

  // Add click toggle for read more
  container.querySelectorAll('[data-blog-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const blogId = btn.getAttribute('data-blog-btn');
      const contentEl = document.getElementById(`blog-content-${blogId}`);
      if (contentEl.style.display === 'none') {
        contentEl.style.display = 'block';
        btn.innerHTML = `Hide Sermon Details <i data-lucide="chevron-up" style="width:14px;height:14px;vertical-align:middle;"></i>`;
      } else {
        contentEl.style.display = 'none';
        btn.innerHTML = `Read Sermon Details <i data-lucide="chevron-down" style="width:14px;height:14px;vertical-align:middle;"></i>`;
      }
      if (window.lucide) window.lucide.createIcons();
    });
  });
}

// Render Scriptures in Sidebar
function renderScriptureArchive(scriptures) {
  const container = document.getElementById('scripture-archive-list');
  if (!container) return;

  container.innerHTML = '';
  
  if (scriptures.length === 0) {
    container.innerHTML = `<p style="color:var(--txt-secondary);">No archive loaded.</p>`;
    return;
  }

  scriptures.forEach(sc => {
    const div = document.createElement('div');
    div.className = 'sidebar-scripture-item';
    div.innerHTML = `
      <span class="date-lbl">${sc.date}</span>
      <blockquote>"${sc.text}"</blockquote>
      <cite>— ${sc.verse}</cite>
    `;
    container.appendChild(div);
  });
}

// Render Upcoming Events Feed
function renderEventsFeed(events) {
  const container = document.getElementById('events-feed-container');
  if (!container) return;

  container.innerHTML = '';
  
  if (events.length === 0) {
    container.innerHTML = `<div class="glass-card event-card" style="grid-template-columns:1fr; text-align:center;"><p>No events scheduled. Join us for weekly services!</p></div>`;
    return;
  }

  const sorted = [...events].sort((a,b) => new Date(a.date) - new Date(b.date));

  sorted.forEach(ev => {
    const dateObj = new Date(ev.date);
    const day = dateObj.getDate() || ev.date.split('-')[2] || '18';
    const monthStr = isNaN(dateObj.getTime()) ? 'AUG' : dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
    
    const card = document.createElement('div');
    card.className = 'glass-card event-card';
    card.innerHTML = `
      <div class="event-date-badge">
        <span class="date-badge-day">${day}</span>
        <span class="date-badge-month">${monthStr}</span>
      </div>
      <div class="event-info">
        <h3>${ev.title}</h3>
        <div class="event-details-row">
          <span><i data-lucide="clock" style="width:14px;height:14px;"></i> ${ev.time}</span>
          <span><i data-lucide="map-pin" style="width:14px;height:14px;"></i> ${ev.location}</span>
        </div>
        <p>${ev.description}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

// Side Calendar Days Generator
function renderSideCalendar(events) {
  const grid = document.getElementById('calendar-days-grid');
  if (!grid) return;

  grid.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const empty = document.createElement('div');
    empty.className = 'empty-day';
    grid.appendChild(empty);
  }

  const currentMonthDaysWithEvents = events
    .map(ev => parseInt(ev.date.split('-')[2]))
    .filter(d => !isNaN(d));

  for (let day = 1; day <= 31; day++) {
    const dayEl = document.createElement('div');
    dayEl.innerText = day;
    if (currentMonthDaysWithEvents.includes(day)) {
      dayEl.className = 'has-event';
      dayEl.setAttribute('title', 'Ministry service / outreach scheduled!');
    }
    grid.appendChild(dayEl);
  }
}

// ================= SEARCH FILTERS =================
const charitySearch = document.getElementById('charity-search');
if (charitySearch) {
  charitySearch.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const db = getDB();
    const filtered = db.charityLogs.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.details.toLowerCase().includes(query)
    );
    renderCharityLedger(filtered);
    if (window.lucide) window.lucide.createIcons();
  });
}

const blogSearch = document.getElementById('blog-search');
if (blogSearch) {
  blogSearch.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const db = getDB();
    const filtered = db.blogs.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.summary.toLowerCase().includes(query) || 
      item.content.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );
    renderBlogsFeed(filtered);
    if (window.lucide) window.lucide.createIcons();
  });
}

// Tab Switching inside About Values
document.querySelectorAll('.value-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.value-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.getAttribute('data-value-tab');
    document.querySelectorAll('.value-tab-pane').forEach(p => p.classList.remove('active'));
    const pane = document.getElementById(`pane-${target}`);
    if (pane) pane.classList.add('active');
  });
});

// ================= GIVING & BANKING PLACARD COPY LOGIC =================
document.addEventListener('click', (e) => {
  const btnCopy = e.target.closest('.btn-copy-channel');
  if (btnCopy) {
    const targetId = btnCopy.getAttribute('data-copy-target');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const textToCopy = targetEl.innerText.trim();
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalHTML = btnCopy.innerHTML;
        btnCopy.classList.add('copied');
        btnCopy.innerHTML = `<i data-lucide="check" style="width:16px;height:16px;"></i> <span>Copied to Clipboard!</span>`;
        if (window.lucide) window.lucide.createIcons();
        setTimeout(() => {
          btnCopy.classList.remove('copied');
          btnCopy.innerHTML = originalHTML;
          if (window.lucide) window.lucide.createIcons();
        }, 2200);
      }).catch(() => {
        prompt("Copy payment details:", textToCopy);
      });
    }
  }
});

// ================= CONNECT & WHATSAPP =================
const btnWaDispatch = document.getElementById('btn-wa-dispatch');
const waCustomMsgText = document.getElementById('wa-custom-msg');
const floatingWaLauncher = document.getElementById('wa-floating-launcher');

function openWhatsAppOffice(customMsg = '') {
  const waNum = '263775662844'; 
  const defaultTxt = 'Hello Apostle Keith & Pastor Talent. I am reaching out from the Rhema Word Ministries website...';
  const text = encodeURIComponent(customMsg.trim() || defaultTxt);
  window.open(`https://wa.me/${waNum}?text=${text}`, '_blank');
}

if (btnWaDispatch && waCustomMsgText) {
  btnWaDispatch.addEventListener('click', () => {
    openWhatsAppOffice(waCustomMsgText.value);
  });
}

if (floatingWaLauncher) {
  floatingWaLauncher.addEventListener('click', () => {
    openWhatsAppOffice();
  });
}

// Email & Prayer Request Form submission (Module 1 - saves to db.inquiries)
const contactEmailForm = document.getElementById('contact-email-form');
if (contactEmailForm) {
  contactEmailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject') ? document.getElementById('contact-subject').value : 'Prayer Request';
    const message = document.getElementById('contact-message').value;

    const db = getDB();
    const newInquiry = {
      id: `inq-${Date.now()}`,
      name,
      email,
      phone: '',
      subject,
      message,
      date: new Date().toISOString().split('T')[0],
      read: false
    };

    db.inquiries.unshift(newInquiry);
    saveDB(db);

    alert(`Thank you, ${name}! Your ${subject.toLowerCase()} has been received by Apostle Keith & Pastor Talent's counseling team.`);
    contactEmailForm.reset();
    updateInboxBadge(db.inquiries);
  });
}

// ================= LIGHT / DARK THEME TOGGLE =================
const btnThemeToggle = document.getElementById('btn-theme-toggle');
const themeIconSun = document.getElementById('theme-icon-sun');
const themeIconMoon = document.getElementById('theme-icon-moon');

// Initial load check
const currentTheme = localStorage.getItem('rwm_theme') || 'dark';
if (currentTheme === 'light') {
  document.body.classList.add('light-theme');
  if (themeIconSun) themeIconSun.style.display = 'none';
  if (themeIconMoon) themeIconMoon.style.display = 'block';
}

if (btnThemeToggle) {
  btnThemeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('rwm_theme', isLight ? 'light' : 'dark');
    
    if (isLight) {
      if (themeIconSun) themeIconSun.style.display = 'none';
      if (themeIconMoon) themeIconMoon.style.display = 'block';
    } else {
      if (themeIconSun) themeIconSun.style.display = 'block';
      if (themeIconMoon) themeIconMoon.style.display = 'none';
    }
  });
}

// =========================================================
// ================= ADMIN DASHBOARD PORTAL =================
// =========================================================
const btnAdminGate = document.getElementById('btn-admin-gate');
const adminGateOverlay = document.getElementById('admin-gate-overlay');
const btnCloseAdminGate = document.getElementById('btn-close-admin-gate');
const adminLoginForm = document.getElementById('admin-login-form');
const adminLoginDialog = document.getElementById('admin-login-dialog');
const adminDashboardPanel = document.getElementById('admin-dashboard-panel');
const loginErrorMsg = document.getElementById('login-error-msg');
const btnAdminLogout = document.getElementById('btn-admin-logout');
const btnCloseAdminDashboard = document.getElementById('btn-close-admin-dashboard');

let isAuthorized = false;

if (btnAdminGate) {
  btnAdminGate.addEventListener('click', () => {
    adminGateOverlay.classList.add('active');
    if (isAuthorized) {
      adminLoginDialog.style.display = 'none';
      adminDashboardPanel.style.display = 'flex';
      renderAdminDashboard();
    } else {
      adminLoginDialog.style.display = 'block';
      adminDashboardPanel.style.display = 'none';
    }
  });
}

if (btnCloseAdminGate) btnCloseAdminGate.addEventListener('click', () => adminGateOverlay.classList.remove('active'));
if (btnCloseAdminDashboard) btnCloseAdminDashboard.addEventListener('click', () => adminGateOverlay.classList.remove('active'));

if (adminLoginForm) {
  adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('admin-username').value;
    const pass = document.getElementById('admin-password').value;

    if (user === 'admin' && pass === 'RhemaAdmin2026') {
      isAuthorized = true;
      loginErrorMsg.innerText = '';
      adminLoginForm.reset();
      adminLoginDialog.style.display = 'none';
      adminDashboardPanel.style.display = 'flex';
      renderAdminDashboard();
    } else {
      loginErrorMsg.innerText = 'Invalid username or password. Authorized personnel only.';
    }
  });
}

if (btnAdminLogout) {
  btnAdminLogout.addEventListener('click', () => {
    isAuthorized = false;
    adminDashboardPanel.style.display = 'none';
    adminLoginDialog.style.display = 'block';
  });
}

// Manage Admin Sidebar Tabs switching
document.querySelectorAll('.dash-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.dash-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const targetTab = btn.getAttribute('data-dash-tab');
    document.querySelectorAll('.dash-tab-pane').forEach(pane => pane.classList.remove('active'));
    
    const targetPane = document.getElementById(`dash-pane-${targetTab}`);
    if (targetPane) targetPane.classList.add('active');
  });
});

function updateInboxBadge(inquiries) {
  const badge = document.getElementById('inbox-unread-badge');
  if (!badge) return;
  const unreadCount = inquiries.filter(x => !x.read).length;
  badge.innerText = unreadCount;
  badge.style.display = unreadCount > 0 ? 'inline-block' : 'none';
}

// Render Admin Lists
function renderAdminDashboard() {
  const db = getDB();

  // 1. Prayer Inbox (Module 1)
  const inboxList = document.getElementById('admin-inbox-list');
  if (inboxList) {
    inboxList.innerHTML = '';
    if (!db.inquiries || db.inquiries.length === 0) {
      inboxList.innerHTML = `<div class="glass-card" style="padding:28px; text-align:center; color:var(--txt-secondary);">No incoming messages or prayer requests yet.</div>`;
    } else {
      db.inquiries.forEach(item => {
        const div = document.createElement('div');
        div.className = `inbox-card-item ${item.read ? '' : 'unread'}`;
        div.innerHTML = `
          <div class="inbox-header">
            <div>
              <span class="inbox-name">${item.name}</span> • <span style="font-size:0.82rem; color:var(--accent); font-weight:600;">${item.subject || 'General'}</span>
              <div style="font-size:0.78rem; color:var(--txt-muted);">${item.email || ''} ${item.phone ? '• ' + item.phone : ''}</div>
            </div>
            <span class="inbox-time">${item.date || 'Recent'}</span>
          </div>
          <p class="inbox-msg">${item.message}</p>
          <div class="inbox-actions">
            <button class="btn btn-outline btn-sm btn-toggle-read" data-inq-id="${item.id}" style="padding:4px 10px; font-size:0.72rem;">
              ${item.read ? 'Mark Unread' : 'Mark as Reviewed'}
            </button>
            <button class="btn btn-danger btn-sm btn-delete-inquiry" data-inq-id="${item.id}" style="padding:4px 10px; font-size:0.72rem;">
              Delete
            </button>
          </div>
        `;
        inboxList.appendChild(div);
      });
    }
  }

  // 2. Announcement Settings (Module 3)
  if (db.announcement) {
    const chk = document.getElementById('admin-announcement-enabled');
    const badgeInput = document.getElementById('admin-announcement-badge');
    const textInput = document.getElementById('admin-announcement-text');
    const btnTextInput = document.getElementById('admin-announcement-btn-text');
    const btnLinkInput = document.getElementById('admin-announcement-btn-link');
    if (chk) chk.checked = !!db.announcement.enabled;
    if (badgeInput) badgeInput.value = db.announcement.badge || 'Notice';
    if (textInput) textInput.value = db.announcement.message || '';
    if (btnTextInput) btnTextInput.value = db.announcement.btnText || 'Details';
    if (btnLinkInput) btnLinkInput.value = db.announcement.btnLink || '#events';
  }

  // 3. Service Times Settings (Module 4)
  if (db.serviceTimes) {
    const sun = document.getElementById('admin-time-sunday');
    const part = document.getElementById('admin-time-partners');
    const mid = document.getElementById('admin-time-midweek');
    const morn = document.getElementById('admin-time-morning');
    const lun = document.getElementById('admin-time-lunch');
    const ph = document.getElementById('admin-phone-primary');
    const addr = document.getElementById('admin-church-address');
    if (sun) sun.value = db.serviceTimes.sunday || '11:00 – 13:30';
    if (part) part.value = db.serviceTimes.partners || '17:30 – 19:00';
    if (mid) mid.value = db.serviceTimes.midweek || '17:30 – 19:00';
    if (morn) morn.value = db.serviceTimes.morning || '06:45 – 07:45';
    if (lun) lun.value = db.serviceTimes.lunch || '13:00 – 14:00';
    if (ph) ph.value = db.serviceTimes.phone || '+263 775 662 844';
    if (addr) addr.value = db.serviceTimes.address || 'Luxor House Building (Basement), Cnr 9th Ave & Fife Street, Bulawayo, Zimbabwe';
  }

  // 4. Testimonies Table (Module 5)
  const tabTestimonies = document.getElementById('admin-table-testimonies');
  if (tabTestimonies) {
    tabTestimonies.innerHTML = '';
    (db.testimonies || []).forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${item.name}</strong></td>
        <td>${item.location || 'Bulawayo'}</td>
        <td><strong style="color:var(--accent);">${item.title}</strong><br><small style="color:var(--txt-secondary);">${item.story.substring(0, 75)}...</small></td>
        <td>${item.date || ''}</td>
        <td class="actions-td">
          <button class="btn-action btn-edit-action" data-edit-type="testimony" data-edit-id="${item.id}"><i data-lucide="edit"></i></button>
          <button class="btn-action btn-delete-action" data-delete-type="testimony" data-delete-id="${item.id}"><i data-lucide="trash-2"></i></button>
        </td>
      `;
      tabTestimonies.appendChild(tr);
    });
  }

  // 5. Gallery Photos Table (Module 2)
  const tabGallery = document.getElementById('admin-table-gallery');
  if (tabGallery) {
    tabGallery.innerHTML = '';
    (db.gallery || []).forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><img src="${item.image}" style="width:48px; height:36px; object-fit:cover; border-radius:3px;"></td>
        <td><strong>${item.title}</strong><br><small style="color:var(--txt-muted);">${(item.details || '').substring(0, 50)}...</small></td>
        <td><span class="txt-accent">${item.category || 'Outreach'}</span></td>
        <td>${item.date || 'Relief'}</td>
        <td class="actions-td">
          <button class="btn-action btn-edit-action" data-edit-type="gallery" data-edit-id="${item.id}"><i data-lucide="edit"></i></button>
          <button class="btn-action btn-delete-action" data-delete-type="gallery" data-delete-id="${item.id}"><i data-lucide="trash-2"></i></button>
        </td>
      `;
      tabGallery.appendChild(tr);
    });
  }

  // 6. Scriptures Table
  const tabScriptures = document.getElementById('admin-table-scriptures');
  if (tabScriptures) {
    tabScriptures.innerHTML = '';
    db.scriptures.forEach(sc => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${sc.date}</td>
        <td><strong>${sc.verse}</strong></td>
        <td>"${sc.text}"</td>
        <td class="actions-td">
          <button class="btn-action btn-edit-action" data-edit-type="scripture" data-edit-id="${sc.id}"><i data-lucide="edit"></i></button>
          <button class="btn-action btn-delete-action" data-delete-type="scripture" data-delete-id="${sc.id}"><i data-lucide="trash-2"></i></button>
        </td>
      `;
      tabScriptures.appendChild(tr);
    });
  }

  // 7. Weekly Word Blogs Table
  const tabBlogs = document.getElementById('admin-table-blogs');
  if (tabBlogs) {
    tabBlogs.innerHTML = '';
    db.blogs.forEach(post => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${post.date}</td>
        <td><strong>${post.title}</strong></td>
        <td>${post.category}</td>
        <td>${post.author}</td>
        <td class="actions-td">
          <button class="btn-action btn-edit-action" data-edit-type="blog" data-edit-id="${post.id}"><i data-lucide="edit"></i></button>
          <button class="btn-action btn-delete-action" data-delete-type="blog" data-delete-id="${post.id}"><i data-lucide="trash-2"></i></button>
        </td>
      `;
      tabBlogs.appendChild(tr);
    });
  }

  // 8. Events Table
  const tabEvents = document.getElementById('admin-table-events');
  if (tabEvents) {
    tabEvents.innerHTML = '';
    db.events.forEach(ev => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${ev.title}</strong></td>
        <td>${ev.date}</td>
        <td>${ev.location}</td>
        <td>${ev.time}</td>
        <td class="actions-td">
          <button class="btn-action btn-edit-action" data-edit-type="event" data-edit-id="${ev.id}"><i data-lucide="edit"></i></button>
          <button class="btn-action btn-delete-action" data-delete-type="event" data-delete-id="${ev.id}"><i data-lucide="trash-2"></i></button>
        </td>
      `;
      tabEvents.appendChild(tr);
    });
  }

  // 9. Foundation Charity Table
  const tabFoundation = document.getElementById('admin-table-foundation');
  if (tabFoundation) {
    tabFoundation.innerHTML = '';
    db.charityLogs.forEach(log => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${log.title}</strong><br><small>${log.date}</small></td>
        <td>${log.households} Households</td>
        <td>${log.bags} Bags</td>
        <td>${log.cost}</td>
        <td class="actions-td">
          <button class="btn-action btn-edit-action" data-edit-type="charity" data-edit-id="${log.id}"><i data-lucide="edit"></i></button>
          <button class="btn-action btn-delete-action" data-delete-type="charity" data-delete-id="${log.id}"><i data-lucide="trash-2"></i></button>
        </td>
      `;
      tabFoundation.appendChild(tr);
    });
  }

  // 10. Donations Ledger
  const tabDonations = document.getElementById('admin-table-donations');
  const dashTotalRaised = document.getElementById('dash-total-raised');
  const dashTotalBags = document.getElementById('dash-total-bags');
  
  if (dashTotalRaised) dashTotalRaised.innerText = `$${db.settings.totalRaised.toLocaleString()}`;
  if (dashTotalBags) dashTotalBags.innerText = db.settings.totalBags.toLocaleString();
  
  if (tabDonations) {
    tabDonations.innerHTML = '';
    db.donations.forEach(dn => {
      const status = dn.status || 'PAID';
      const statusClass = status === 'PAID' ? 'txt-accent' : 'error-msg';
      const isRefunded = status === 'REFUNDED';
      
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${dn.donor}</td>
        <td>${dn.email}</td>
        <td><strong class="txt-accent">$${dn.amount.toFixed(2)}</strong></td>
        <td>${dn.target}</td>
        <td>${new Date(dn.date).toLocaleDateString()}</td>
        <td><span class="${statusClass}" style="font-weight:600; font-size:0.8rem;">${status}</span></td>
        <td>
          ${isRefunded ? '-' : `<button class="btn btn-outline btn-sm btn-refund-trigger" data-refund-id="${dn.id}" style="padding: 4px 8px; font-size:0.75rem;">Refund</button>`}
        </td>
      `;
      tabDonations.appendChild(tr);
    });
  }

  updateInboxBadge(db.inquiries || []);

  if (window.lucide) {
    window.lucide.createIcons();
  }
  setupFluidInteractiveStates();
}

// ================= CSV / EXCEL EXPORT (Module 7) =================
function exportToCSV(filename, rows) {
  if (!rows || !rows.length) {
    alert("No data available to export.");
    return;
  }
  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(','),
    ...rows.map(row => headers.map(h => {
      let cell = row[h] === null || row[h] === undefined ? '' : String(row[h]);
      cell = cell.replace(/"/g, '""');
      if (cell.search(/("|,|\n)/g) >= 0) {
        cell = `"${cell}"`;
      }
      return cell;
    }).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const btnExportDonations = document.getElementById('btn-export-donations');
if (btnExportDonations) {
  btnExportDonations.addEventListener('click', () => {
    const db = getDB();
    exportToCSV(`rhema-word-donations-${new Date().toISOString().split('T')[0]}.csv`, db.donations);
  });
}

const btnExportInquiries = document.getElementById('btn-export-inquiries');
if (btnExportInquiries) {
  btnExportInquiries.addEventListener('click', () => {
    const db = getDB();
    exportToCSV(`rhema-word-prayer-inquiries-${new Date().toISOString().split('T')[0]}.csv`, db.inquiries || []);
  });
}

const btnExportCharity = document.getElementById('btn-export-charity');
if (btnExportCharity) {
  btnExportCharity.addEventListener('click', () => {
    const db = getDB();
    exportToCSV(`rhema-word-charity-ledger-${new Date().toISOString().split('T')[0]}.csv`, db.charityLogs || []);
  });
}

const btnExportEvents = document.getElementById('btn-export-events');
if (btnExportEvents) {
  btnExportEvents.addEventListener('click', () => {
    const db = getDB();
    exportToCSV(`rhema-word-events-${new Date().toISOString().split('T')[0]}.csv`, db.events || []);
  });
}

// ================= SAVE ANNOUNCEMENT & SERVICE TIMES FORMS =================
const adminAnnouncementForm = document.getElementById('admin-announcement-form');
if (adminAnnouncementForm) {
  adminAnnouncementForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const db = getDB();
    db.announcement = {
      enabled: document.getElementById('admin-announcement-enabled').checked,
      badge: document.getElementById('admin-announcement-badge').value,
      message: document.getElementById('admin-announcement-text').value,
      btnText: document.getElementById('admin-announcement-btn-text').value,
      btnLink: document.getElementById('admin-announcement-btn-link').value
    };
    saveDB(db);
    renderAllFeeds();
    alert("Live Announcement Banner updated successfully!");
  });
}

const adminServiceTimesForm = document.getElementById('admin-servicetimes-form');
if (adminServiceTimesForm) {
  adminServiceTimesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const db = getDB();
    db.serviceTimes = {
      sunday: document.getElementById('admin-time-sunday').value,
      partners: document.getElementById('admin-time-partners').value,
      midweek: document.getElementById('admin-time-midweek').value,
      morning: document.getElementById('admin-time-morning').value,
      lunch: document.getElementById('admin-time-lunch').value,
      phone: document.getElementById('admin-phone-primary').value,
      address: document.getElementById('admin-church-address').value
    };
    saveDB(db);
    renderAllFeeds();
    alert("Service Times & Church Location updated successfully across the site!");
  });
}

// ================= INBOX ACTIONS (Mark Read / Delete) =================
document.addEventListener('click', (e) => {
  const btnToggle = e.target.closest('.btn-toggle-read');
  if (btnToggle) {
    const inqId = btnToggle.getAttribute('data-inq-id');
    const db = getDB();
    db.inquiries = db.inquiries.map(item => item.id === inqId ? { ...item, read: !item.read } : item);
    saveDB(db);
    renderAdminDashboard();
  }

  const btnDelInq = e.target.closest('.btn-delete-inquiry');
  if (btnDelInq) {
    const inqId = btnDelInq.getAttribute('data-inq-id');
    if (confirm("Delete this prayer request/inquiry?")) {
      const db = getDB();
      db.inquiries = db.inquiries.filter(item => item.id !== inqId);
      saveDB(db);
      renderAdminDashboard();
    }
  }
});

// Hook delete & edit actions on tables
document.addEventListener('click', (e) => {
  const btnDelete = e.target.closest('.btn-delete-action');
  if (btnDelete) {
    const type = btnDelete.getAttribute('data-delete-type');
    const id = btnDelete.getAttribute('data-delete-id');
    
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      const db = getDB();
      if (type === 'scripture') db.scriptures = db.scriptures.filter(x => x.id !== id);
      if (type === 'blog') db.blogs = db.blogs.filter(x => x.id !== id);
      if (type === 'event') db.events = db.events.filter(x => x.id !== id);
      if (type === 'charity') db.charityLogs = db.charityLogs.filter(x => x.id !== id);
      if (type === 'testimony') db.testimonies = (db.testimonies || []).filter(x => x.id !== id);
      if (type === 'gallery') db.gallery = (db.gallery || []).filter(x => x.id !== id);
      
      saveDB(db);
      renderAdminDashboard();
      renderAllFeeds();
    }
  }

  const btnEdit = e.target.closest('.btn-edit-action');
  if (btnEdit) {
    const type = btnEdit.getAttribute('data-edit-type');
    const id = btnEdit.getAttribute('data-edit-id');
    openFormModal(type, id);
  }
});

// Add Entity triggers
const btnAddScripture = document.getElementById('btn-add-scripture');
const btnAddBlog = document.getElementById('btn-add-blog');
const btnAddEvent = document.getElementById('btn-add-event');
const btnAddEncounter = document.getElementById('btn-add-encounter');
const btnAddTestimony = document.getElementById('btn-add-testimony');
const btnAddGalleryPhoto = document.getElementById('btn-add-gallery-photo');

if (btnAddScripture) btnAddScripture.addEventListener('click', () => openFormModal('scripture'));
if (btnAddBlog) btnAddBlog.addEventListener('click', () => openFormModal('blog'));
if (btnAddEvent) btnAddEvent.addEventListener('click', () => openFormModal('event'));
if (btnAddEncounter) btnAddEncounter.addEventListener('click', () => openFormModal('charity'));
if (btnAddTestimony) btnAddTestimony.addEventListener('click', () => openFormModal('testimony'));
if (btnAddGalleryPhoto) btnAddGalleryPhoto.addEventListener('click', () => openFormModal('gallery'));

// FORM MODAL LOGIC FOR CREATE/EDIT OPERATIONS
const entryFormModal = document.getElementById('admin-entry-form-modal');
const btnCloseEntryModal = document.getElementById('btn-close-entry-modal');
const adminEntryForm = document.getElementById('admin-entry-form');
const formFieldsContainer = document.getElementById('form-fields-container');
const formModalTitle = document.getElementById('form-modal-title');

let activeFormType = '';
let activeFormEditId = null;

function openFormModal(type, editId = null) {
  activeFormType = type;
  activeFormEditId = editId;
  formFieldsContainer.innerHTML = '';
  
  const db = getDB();
  let existing = null;
  
  if (editId) {
    formModalTitle.innerText = `Edit ${type.toUpperCase()}`;
    if (type === 'scripture') existing = db.scriptures.find(x => x.id === editId);
    if (type === 'blog') existing = db.blogs.find(x => x.id === editId);
    if (type === 'event') existing = db.events.find(x => x.id === editId);
    if (type === 'charity') existing = db.charityLogs.find(x => x.id === editId);
    if (type === 'testimony') existing = (db.testimonies || []).find(x => x.id === editId);
    if (type === 'gallery') existing = (db.gallery || []).find(x => x.id === editId);
  } else {
    formModalTitle.innerText = `Create New ${type.toUpperCase()}`;
  }

  if (type === 'testimony') {
    formFieldsContainer.innerHTML = `
      <div class="form-group">
        <label>Member Name</label>
        <input type="text" id="field-name" value="${existing ? existing.name : ''}" placeholder="Brother/Sister Name" required>
      </div>
      <div class="form-group">
        <label>Location</label>
        <input type="text" id="field-location" value="${existing ? existing.location : 'Bulawayo'}" placeholder="Bulawayo, Zimbabwe" required>
      </div>
      <div class="form-group">
        <label>Miracle / Title Headline</label>
        <input type="text" id="field-title" value="${existing ? existing.title : ''}" placeholder="Supernatural Healing & Freedom" required>
      </div>
      <div class="form-group">
        <label>Testimony Story</label>
        <textarea id="field-story" rows="5" placeholder="Share what God did through the ministry..." required>${existing ? existing.story : ''}</textarea>
      </div>
      <div class="form-group">
        <label>Date</label>
        <input type="text" id="field-date" value="${existing ? existing.date : new Date().toISOString().split('T')[0]}" required>
      </div>
    `;
  } else if (type === 'gallery') {
    formFieldsContainer.innerHTML = `
      <div class="form-group">
        <label>Photo Title / Caption</label>
        <input type="text" id="field-title" value="${existing ? existing.title : ''}" placeholder="Relief Outreach Mission" required>
      </div>
      <div class="form-group">
        <label>Image URL (e.g. /images/charity-dist-1.jpg or web URL)</label>
        <input type="text" id="field-image" value="${existing ? existing.image : '/images/charity-dist-1.jpg'}" required>
      </div>
      <div class="form-group">
        <label>Category</label>
        <input type="text" id="field-category" value="${existing ? existing.category : 'Mealie Meal Outreach'}" required>
      </div>
      <div class="form-group">
        <label>Date Tag</label>
        <input type="text" id="field-date" value="${existing ? existing.date : 'Relief Mission'}" required>
      </div>
      <div class="form-group">
        <label>Description Details</label>
        <textarea id="field-details" rows="3">${existing ? existing.details : ''}</textarea>
      </div>
    `;
  } else if (type === 'scripture') {
    formFieldsContainer.innerHTML = `
      <div class="form-group">
        <label>Date (YYYY-MM-DD)</label>
        <input type="text" id="field-date" value="${existing ? existing.date : new Date().toISOString().split('T')[0]}" required>
      </div>
      <div class="form-group">
        <label>Bible Reference</label>
        <input type="text" id="field-verse" value="${existing ? existing.verse : ''}" placeholder="Romans 8:28" required>
      </div>
      <div class="form-group">
        <label>Scripture text</label>
        <textarea id="field-text" rows="4" required>${existing ? existing.text : ''}</textarea>
      </div>
    `;
  } else if (type === 'blog') {
    formFieldsContainer.innerHTML = `
      <div class="form-group">
        <label>Title</label>
        <input type="text" id="field-title" value="${existing ? existing.title : ''}" required>
      </div>
      <div class="form-group">
        <label>Category</label>
        <input type="text" id="field-category" value="${existing ? existing.category : 'Weekly Word'}" required>
      </div>
      <div class="form-group">
        <label>Summary Hook</label>
        <input type="text" id="field-summary" value="${existing ? existing.summary : ''}" required>
      </div>
      <div class="form-group">
        <label>Sermon Body Content</label>
        <textarea id="field-content" rows="6" required>${existing ? existing.content : ''}</textarea>
      </div>
    `;
  } else if (type === 'event') {
    formFieldsContainer.innerHTML = `
      <div class="form-group">
        <label>Event Title</label>
        <input type="text" id="field-title" value="${existing ? existing.title : ''}" required>
      </div>
      <div class="form-group">
        <label>Date (YYYY-MM-DD)</label>
        <input type="text" id="field-date" value="${existing ? existing.date : '2026-08-20'}" required>
      </div>
      <div class="form-group">
        <label>Time Slot</label>
        <input type="text" id="field-time" value="${existing ? existing.time : '05:30 PM - 07:00 PM'}" required>
      </div>
      <div class="form-group">
        <label>Location</label>
        <input type="text" id="field-location" value="${existing ? existing.location : 'Luxor House Basement, Bulawayo'}" required>
      </div>
      <div class="form-group">
        <label>Short Description</label>
        <textarea id="field-description" rows="3" required>${existing ? existing.description : ''}</textarea>
      </div>
    `;
  } else if (type === 'charity') {
    formFieldsContainer.innerHTML = `
      <div class="form-group">
        <label>Outreach Title</label>
        <input type="text" id="field-title" value="${existing ? existing.title : ''}" required>
      </div>
      <div class="form-group">
        <label>Date</label>
        <input type="text" id="field-date" value="${existing ? existing.date : 'Ongoing Outreach'}" required>
      </div>
      <div class="form-group">
        <label>Bags of Mealie Meal Distributed</label>
        <input type="number" id="field-bags" value="${existing ? existing.bags : '50'}" required>
      </div>
      <div class="form-group">
        <label>Households Assisted</label>
        <input type="number" id="field-households" value="${existing ? existing.households : '40'}" required>
      </div>
      <div class="form-group">
        <label>Cost incurred (USD)</label>
        <input type="text" id="field-cost" value="${existing ? existing.cost : '$500'}" required>
      </div>
      <div class="form-group">
        <label>Encounter Details Story</label>
        <textarea id="field-details" rows="3" required>${existing ? existing.details : ''}</textarea>
      </div>
    `;
  }

  entryFormModal.classList.add('active');
}

if (btnCloseEntryModal) {
  btnCloseEntryModal.addEventListener('click', () => {
    entryFormModal.classList.remove('active');
  });
}

// Form Submission -> save / update
if (adminEntryForm) {
  adminEntryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const db = getDB();
    
    if (activeFormType === 'testimony') {
      const entry = {
        id: activeFormEditId || `t-${Date.now()}`,
        name: document.getElementById('field-name').value,
        location: document.getElementById('field-location').value,
        title: document.getElementById('field-title').value,
        story: document.getElementById('field-story').value,
        date: document.getElementById('field-date').value
      };
      if (activeFormEditId) {
        db.testimonies = (db.testimonies || []).map(x => x.id === activeFormEditId ? entry : x);
      } else {
        if (!db.testimonies) db.testimonies = [];
        db.testimonies.unshift(entry);
      }
    } else if (activeFormType === 'gallery') {
      const entry = {
        id: activeFormEditId || `g-${Date.now()}`,
        title: document.getElementById('field-title').value,
        image: document.getElementById('field-image').value,
        category: document.getElementById('field-category').value,
        date: document.getElementById('field-date').value,
        details: document.getElementById('field-details').value
      };
      if (activeFormEditId) {
        db.gallery = (db.gallery || []).map(x => x.id === activeFormEditId ? entry : x);
      } else {
        if (!db.gallery) db.gallery = [];
        db.gallery.unshift(entry);
      }
    } else if (activeFormType === 'scripture') {
      const entry = {
        id: activeFormEditId || `s-${Date.now()}`,
        date: document.getElementById('field-date').value,
        verse: document.getElementById('field-verse').value,
        text: document.getElementById('field-text').value,
        author: "Apostle Keith"
      };
      if (activeFormEditId) {
        db.scriptures = db.scriptures.map(x => x.id === activeFormEditId ? entry : x);
      } else {
        db.scriptures.unshift(entry);
      }
    } else if (activeFormType === 'blog') {
      const entry = {
        id: activeFormEditId || `b-${Date.now()}`,
        title: document.getElementById('field-title').value,
        category: document.getElementById('field-category').value,
        summary: document.getElementById('field-summary').value,
        content: document.getElementById('field-content').value,
        date: new Date().toISOString().split('T')[0],
        author: "Apostle Keith Bhehane"
      };
      if (activeFormEditId) {
        db.blogs = db.blogs.map(x => x.id === activeFormEditId ? entry : x);
      } else {
        db.blogs.unshift(entry);
      }
    } else if (activeFormType === 'event') {
      const entry = {
        id: activeFormEditId || `e-${Date.now()}`,
        title: document.getElementById('field-title').value,
        date: document.getElementById('field-date').value,
        time: document.getElementById('field-time').value,
        location: document.getElementById('field-location').value,
        description: document.getElementById('field-description').value
      };
      if (activeFormEditId) {
        db.events = db.events.map(x => x.id === activeFormEditId ? entry : x);
      } else {
        db.events.push(entry);
      }
    } else if (activeFormType === 'charity') {
      const entry = {
        id: activeFormEditId || `c-${Date.now()}`,
        title: document.getElementById('field-title').value,
        date: document.getElementById('field-date').value,
        bags: parseInt(document.getElementById('field-bags').value),
        households: parseInt(document.getElementById('field-households').value),
        cost: document.getElementById('field-cost').value,
        details: document.getElementById('field-details').value,
        image: activeFormEditId ? db.charityLogs.find(x => x.id === activeFormEditId).image : "/images/charity-dist-1.jpg"
      };
      if (activeFormEditId) {
        db.charityLogs = db.charityLogs.map(x => x.id === activeFormEditId ? entry : x);
      } else {
        db.charityLogs.unshift(entry);
        db.settings.totalBags += entry.bags;
        db.settings.familiesReached += entry.households;
      }
    } else if (activeFormType === 'gallery') {
      const entry = {
        id: activeFormEditId || `g-${Date.now()}`,
        title: document.getElementById('field-title').value,
        image: document.getElementById('field-image').value,
        category: document.getElementById('field-category').value,
        date: document.getElementById('field-date').value,
        details: document.getElementById('field-details').value
      };
      if (activeFormEditId) {
        db.gallery = (db.gallery || []).map(x => x.id === activeFormEditId ? entry : x);
      } else {
        db.gallery = db.gallery || [];
        db.gallery.unshift(entry);
      }
    }

    saveDB(db);
    entryFormModal.classList.remove('active');
    renderAdminDashboard();
    renderAllFeeds();
  });
}

// Refund Dialog Actions
const adminRefundModal = document.getElementById('admin-refund-modal');
const btnCloseRefundModal = document.getElementById('btn-close-refund-modal');
const adminRefundForm = document.getElementById('admin-refund-form');
let activeRefundId = null;

document.addEventListener('click', (e) => {
  const btnTrigger = e.target.closest('.btn-refund-trigger');
  if (btnTrigger) {
    const refundId = btnTrigger.getAttribute('data-refund-id');
    const db = getDB();
    const donation = db.donations.find(x => x.id === refundId);
    if (donation) {
      activeRefundId = refundId;
      document.getElementById('refund-donor-name').value = donation.donor;
      document.getElementById('refund-donor-email').value = donation.email;
      document.getElementById('refund-original-amount').value = `$${donation.amount.toFixed(2)}`;
      
      const refundAmtInput = document.getElementById('refund-amount');
      refundAmtInput.value = donation.amount.toFixed(2);
      refundAmtInput.max = donation.amount;
      refundAmtInput.min = 1;
      
      adminRefundModal.classList.add('active');
    }
  }
});

if (btnCloseRefundModal) {
  btnCloseRefundModal.addEventListener('click', () => {
    adminRefundModal.classList.remove('active');
    activeRefundId = null;
  });
}

if (adminRefundForm) {
  adminRefundForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!activeRefundId) return;

    const refundAmt = parseFloat(document.getElementById('refund-amount').value);
    const donorName = document.getElementById('refund-donor-name').value;
    const donorEmail = document.getElementById('refund-donor-email').value;

    if (isNaN(refundAmt) || refundAmt <= 0) {
      alert("Please enter a valid refund amount.");
      return;
    }

    const submitBtn = document.getElementById('btn-submit-refund');
    const originalText = submitBtn.innerText;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i data-lucide="loader" class="spin" style="width:16px;height:16px;vertical-align:middle;margin-right:8px;"></i> Executing Refund & Mailing...`;
    if (window.lucide) window.lucide.createIcons();

    try {
      const response = await fetch('/api/refund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId: activeRefundId,
          amount: refundAmt,
          email: donorEmail,
          donorName: donorName
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Refund successfully processed!");

        const db = getDB();
        db.donations = db.donations.map(dn => dn.id === activeRefundId ? { ...dn, status: 'REFUNDED' } : dn);
        db.settings.totalRaised = Math.max(0, db.settings.totalRaised - refundAmt);
        
        const lostBags = Math.floor(refundAmt / 15);
        if (lostBags > 0) {
          db.settings.totalBags = Math.max(0, db.settings.totalBags - lostBags);
          db.settings.familiesReached = Math.max(0, db.settings.familiesReached - Math.floor(lostBags * 0.8));
        }

        saveDB(db);
        adminRefundModal.classList.remove('active');
        activeRefundId = null;

        renderAdminDashboard();
        renderAllFeeds();
      } else {
        alert(`Refund failed: ${data.error || 'Unknown server error'}`);
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to refund API. Check network or server configuration.");
      submitBtn.disabled = false;
      submitBtn.innerText = originalText;
    }
  });
}

// ================= PRIVACY POLICY DIALOG =================
const btnPrivacyPolicy = document.getElementById('btn-privacy-policy');
const privacyPolicyOverlay = document.getElementById('privacy-policy-overlay');
const btnClosePrivacy = document.getElementById('btn-close-privacy');

if (btnPrivacyPolicy && privacyPolicyOverlay) {
  btnPrivacyPolicy.addEventListener('click', (e) => {
    e.preventDefault();
    privacyPolicyOverlay.classList.add('active');
  });
}

if (btnClosePrivacy && privacyPolicyOverlay) {
  btnClosePrivacy.addEventListener('click', () => {
    privacyPolicyOverlay.classList.remove('active');
  });
  
  // Close when clicking outside modal card
  privacyPolicyOverlay.addEventListener('click', (e) => {
    if (e.target === privacyPolicyOverlay) {
      privacyPolicyOverlay.classList.remove('active');
    }
  });
}

// ================= TERMS AND CONDITIONS DIALOG =================
const btnTermsConditions = document.getElementById('btn-terms-conditions');
const termsConditionsOverlay = document.getElementById('terms-conditions-overlay');
const btnCloseTerms = document.getElementById('btn-close-terms');

if (btnTermsConditions && termsConditionsOverlay) {
  btnTermsConditions.addEventListener('click', (e) => {
    e.preventDefault();
    termsConditionsOverlay.classList.add('active');
  });
}

if (btnCloseTerms && termsConditionsOverlay) {
  btnCloseTerms.addEventListener('click', () => {
    termsConditionsOverlay.classList.remove('active');
  });
  
  // Close when clicking outside modal card
  termsConditionsOverlay.addEventListener('click', (e) => {
    if (e.target === termsConditionsOverlay) {
      termsConditionsOverlay.classList.remove('active');
    }
  });
}

// Setup Fluid Interactive Button Animations (Apple Fluid Style)
function setupFluidInteractiveStates() {
  const targets = document.querySelectorAll('.btn, .nav-link, .dash-tab-btn, .btn-filter, .outreach-card, .testimony-card, .btn-action, .event-card, .blog-card');
  targets.forEach(el => {
    if (el.dataset.fluidBound) return;
    el.dataset.fluidBound = "true";

    const resetTransition = () => {
      el.style.transition = 'transform var(--spring-duration-fast) var(--spring-ease)';
    };

    el.addEventListener('pointerdown', () => {
      el.style.transition = 'transform 0.08s var(--spring-ease)';
      el.style.transform = 'scale(0.96)';
    });

    const releaseScale = () => {
      resetTransition();
      el.style.transform = '';
    };

    el.addEventListener('pointerup', releaseScale);
    el.addEventListener('pointerleave', releaseScale);
  });
}

// Add Swipe to Dismiss direct manipulation on navigation menu dropdown
function setupSwipeToDismissNav() {
  const menu = document.getElementById('nav-menu-container');
  if (!menu) return;

  let startY = 0;
  let currentY = 0;
  let isDragging = false;

  menu.addEventListener('pointerdown', (e) => {
    if (window.innerWidth > 768) return;
    startY = e.clientY;
    currentY = e.clientY;
    isDragging = true;
    menu.setPointerCapture(e.pointerId);
    menu.style.transition = 'none';
  });

  menu.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    currentY = e.clientY;
    const diffY = currentY - startY;
    
    // Only allow dragging upwards (negative translation)
    if (diffY < 0) {
      menu.style.transform = `translateY(${diffY}px)`;
      const pct = Math.max(0, 1 + diffY / 200);
      menu.style.opacity = pct;
    }
  });

  const endDrag = (e) => {
    if (!isDragging) return;
    isDragging = false;
    try {
      menu.releasePointerCapture(e.pointerId);
    } catch(err) {}

    menu.style.transition = 'opacity var(--spring-duration-normal) var(--spring-ease), transform var(--spring-duration-normal) var(--spring-bounce), visibility var(--spring-duration-normal) var(--spring-ease)';
    
    const diffY = currentY - startY;
    if (diffY < -60) {
      menu.classList.remove('active');
    }
    
    menu.style.transform = '';
    menu.style.opacity = '';
  };

  menu.addEventListener('pointerup', endDrag);
  menu.addEventListener('pointercancel', endDrag);
}
