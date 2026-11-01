/**
 * C4CRICKET - APPLICATION CORE ENGINE
 * Vanilla JavaScript Architecture
 * Modules: Real-time Telemetry, Booking engine, Business Registration, Local storage DB sync with REST API ready layer
 */

// Initial Seed Data for Pan-India Cricket Ecosystem
const C4_INITIAL_STATE = {
  academies: [
    {
      id: 'acad-1',
      name: 'Mumbai Cricket Club of Excellence',
      coach: 'Pravin Amre (BCCI Level 3)',
      city: 'Mumbai',
      locality: 'Bandra Kurla Complex, Mumbai',
      level: 'Elite',
      rating: 4.9,
      reviews: 142,
      priceMonthly: 3500,
      facilities: ['Floodlit Turf Nets', 'Bowling Machines', 'Video Analytics Hub', 'Physio Room'],
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop&q=80',
      description: 'Premier cricket training institute specializing in Ranji trophy preparation, junior age-group scouting, and red-soil turf wicket drills.',
      phone: '+91 98201 12345',
      verified: true
    },
    {
      id: 'acad-2',
      name: 'National Spin & Pace Foundation',
      coach: 'Venkatesh Prasad Academy Wing',
      city: 'Bengaluru',
      locality: 'Koramangala, Bengaluru',
      level: 'Pro Youth',
      rating: 4.8,
      reviews: 98,
      priceMonthly: 4200,
      facilities: ['Astro & Clay Pitches', 'Speed Radar Guns', 'Gym & Conditioning', 'Hostel Facility'],
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80',
      description: 'Dedicated bowling craft facility with biomechanics tracking and structured summer camp leagues for U-14 to U-19 prospects.',
      phone: '+91 99801 88765',
      verified: true
    },
    {
      id: 'acad-3',
      name: 'Sehwag International Cricket Academy',
      coach: 'AN Sharma & Senior BCCI Panel',
      city: 'Delhi NCR',
      locality: 'Gurugram & Najafgarh',
      level: 'Grassroots',
      rating: 4.7,
      reviews: 210,
      priceMonthly: 2800,
      facilities: ['8 Practice Turf Wickets', 'Match Turf Stadium', 'Swimming Pool', 'Digital Scoreboard'],
      image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=600&auto=format&fit=crop&q=80',
      description: 'Instilling attacking cricket fundamentals for youngsters. Focuses on hand-eye coordination, aggressive batting, and athletic fielding.',
      phone: '+91 98110 54321',
      verified: true
    }
  ],
  turfs: [
    {
      id: 'turf-1',
      name: 'The Pavilion Box & Astro Turf Arena',
      sports: ['Cricket', 'Football'],
      city: 'Mumbai',
      locality: 'Andheri West, Mumbai',
      hourlyRate: 1400,
      rating: 4.9,
      reviews: 320,
      facilities: ['50mm FIFA Turf', '600W Night Floodlights', 'Free Bats & Stumps', 'Chilled Cafeteria', 'Changing Rooms'],
      image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&auto=format&fit=crop&q=80',
      description: 'All-weather box cricket turf with high overhead netting suitable for 7-a-side and 8-a-side leather or hard tennis ball matches.',
      phone: '+91 98205 99887',
      verified: true
    },
    {
      id: 'turf-2',
      name: 'Smash & Strike Multisport Ground',
      sports: ['Cricket', 'Badminton', 'Tennis'],
      city: 'Bengaluru',
      locality: 'Whitefield, Bengaluru',
      hourlyRate: 1200,
      rating: 4.7,
      reviews: 185,
      facilities: ['Floodlights', 'Side Netting', 'Synthetic Badminton Courts', 'Scoreboard Screen', 'Free Parking'],
      image: 'https://images.unsplash.com/photo-1512719355462-e75c613a0c5c?w=600&auto=format&fit=crop&q=80',
      description: 'Family & corporate sports arena equipped with professional grade cricket nets and multipurpose outdoor courts.',
      phone: '+91 80412 34567',
      verified: true
    },
    {
      id: 'turf-3',
      name: 'Capital Floodlit Cricket Complex',
      sports: ['Cricket', 'Football'],
      city: 'Delhi NCR',
      locality: 'Noida Sector 62',
      hourlyRate: 1600,
      rating: 4.8,
      reviews: 240,
      facilities: ['Full 60m Boundary', 'Natural Turf Pitch', 'LED Broadcast Lights', 'Live YouTube Stream Setup'],
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80',
      description: 'Hosts weekend corporate cups and leather ball 20-over matches with full broadcast camera stands.',
      phone: '+91 98100 22334',
      verified: true
    }
  ],
  shops: [
    {
      id: 'shop-1',
      name: 'Master Blaster Cricket Emporium',
      category: 'Bats',
      city: 'Mumbai',
      locality: 'Marine Lines / Dhobi Talao, Mumbai',
      rating: 4.9,
      reviews: 410,
      specialty: 'Grade 1+ English Willow, Hand-selected SS, SG, MRF, Kookaburra',
      discount: 'Up to 25% Off on Season Bats',
      image: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&auto=format&fit=crop&q=80',
      phone: '+91 22 2200 4455',
      verified: true
    },
    {
      id: 'shop-2',
      name: 'Willow & Stumps Sports Stockist',
      category: 'Protective',
      city: 'Bengaluru',
      locality: 'Brigade Road, Bengaluru',
      rating: 4.8,
      reviews: 290,
      specialty: 'Titanium Helmets, Lightweight Leg Guards, Bat Knocking & Extratec',
      discount: 'Free Machine Knocking on Bat Purchase',
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop&q=80',
      phone: '+91 80 2558 7766',
      verified: true
    },
    {
      id: 'shop-3',
      name: 'Delhi Willow Crafts & Custom Jerseys',
      category: 'Apparel',
      city: 'Delhi NCR',
      locality: 'Karol Bagh, New Delhi',
      rating: 4.7,
      reviews: 175,
      specialty: 'Sublimation Team Jerseys, Spikes Shoes, Leather Match Balls',
      discount: 'Corporate Team Bundles 30% Off',
      image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=600&auto=format&fit=crop&q=80',
      phone: '+91 11 2875 9900',
      verified: true
    }
  ],
  tournaments: [
    {
      id: 'tourn-1',
      name: 'Pan-India Corporate Champions Trophy 2026',
      format: 'Corporate',
      city: 'Mumbai',
      dates: 'Nov 15 - Dec 05, 2026',
      prize: '₹2,50,000 Cash + Trophy',
      entryFee: 15000,
      status: 'Open',
      teamsLimit: 16,
      registeredTeams: 11,
      image: 'https://images.unsplash.com/photo-1512719355462-e75c613a0c5c?w=600&auto=format&fit=crop&q=80',
      venue: 'Police Gymkhana & Marine Drive Grounds',
      description: 'Official leather ball 20-over weekend corporate championship. Full video streaming on YouTube, official BCCI umpires and color clothing provided.'
    },
    {
      id: 'tourn-2',
      name: 'Super 8s Tape Ball Floodlit Night Cup',
      format: 'Box Cricket',
      city: 'Bengaluru',
      dates: 'Every Sat & Sun Night',
      prize: '₹75,000 Cash Prize',
      entryFee: 4000,
      status: 'Ongoing',
      teamsLimit: 24,
      registeredTeams: 22,
      image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&auto=format&fit=crop&q=80',
      venue: 'Smash & Strike Turf Arena, Whitefield',
      description: 'High intensity 6-over tape ball tournament with cash prizes per match, super sixes awards, and live telemetry commentary.'
    },
    {
      id: 'tourn-3',
      name: 'Delhi Premier Grassroots T20 Open',
      format: 'T20',
      city: 'Delhi NCR',
      dates: 'Dec 10 - Dec 28, 2026',
      prize: '₹5,00,000 Cash Purse',
      entryFee: 20000,
      status: 'Open',
      teamsLimit: 32,
      registeredTeams: 18,
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80',
      venue: 'Capital Floodlit Stadium, Greater Noida',
      description: 'Scouted by IPL franchise talent scouts. Live Hawkeye ball tracking and verified telemetrics for top performers.'
    }
  ],
  news: [
    {
      id: 'news-1',
      title: 'India Win Another Thrilling Match: Last-Over Telemetrics Breakdown',
      category: 'International',
      time: '12 mins ago',
      readTime: '3 min read',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80',
      summary: 'Hardik Pandya delivers with ice-cool nerve in the final over as India successfully chased down the 245-run target with 4 balls to spare.',
      content: 'In a gripping finish at the Wankhede Stadium, the Indian middle order showcased sublime composure against Australia’s death-over specialists. With 14 required off the final 10 deliveries, Hardik Pandya clobbered a 96-metre six over long-on, followed by Tilak Varma’s delicate glide past backward point. Hawk-Eye pitch analytics revealed 82% of the deliveries bowled on good length were punished at a boundary strike rate of 210.'
    },
    {
      id: 'news-2',
      title: 'Rohit Sharma’s Masterclass: Analyzing His Flawless Pull Shot Biomechanics',
      category: 'Tactical',
      time: '45 mins ago',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop&q=80',
      summary: 'Biomechanics tracking reveals why the Indian skipper maintains the highest control percentage against high pace short deliveries.',
      content: 'Telemetry data collected from recent bilateral fixtures exhibits Rohit Sharma’s front-shoulder rotation taking only 0.22 seconds to swivel into pulling positions against balls pitched short of length exceeding 142 km/h. His blade contacts the ball at an optimum 38-degree downward angle, minimizing top-edge risks while producing optimum ball velocity.'
    },
    {
      id: 'news-3',
      title: 'IPL 2027 Mega Retention Guidelines & Turf Wicket Preparations',
      category: 'IPL',
      time: '2 hours ago',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=600&auto=format&fit=crop&q=80',
      summary: 'Franchises submit priority list as grass density and hybrid pitch standards are mandated across all 10 home grounds.',
      content: 'The BCCI technical committee has formally issued specifications requiring all staging grounds to integrate high-drainage hybrid turf root zones. The new criteria ensure that games can resume within 15 minutes of heavy downpours, utilizing vacuum sub-surface suction technology.'
    },
    {
      id: 'news-4',
      title: 'Grassroots Talent Revolution: How Verified Academies Are Changing Scouting',
      category: 'Domestic',
      time: '3 hours ago',
      readTime: '3 min read',
      image: 'https://images.unsplash.com/photo-1512719355462-e75c613a0c5c?w=600&auto=format&fit=crop&q=80',
      summary: 'Local coaching hubs powered by C4CRICKET telemetry are giving raw prodigies direct visibility to national selection panels.',
      content: 'Through standardized video telemetry and speed tracking verified by C4CRICKET merchants, district youngsters from tier-2 and tier-3 cities can now upload certified bowling speeds and wagon-wheel profiles directly to BCCI certified talent scouts.'
    }
  ],
  registrations: [
    {
      id: 'reg-101',
      businessName: 'Royal Tigers Cricket Academy',
      businessType: 'academy',
      contactPerson: 'Karan Mehra',
      phone: '+91 98330 11223',
      email: 'royaltigers@gmail.com',
      city: 'Mumbai',
      address: 'Shivaji Park Gymkhana, Dadar, Mumbai',
      plan: 'Pro Listing',
      status: 'Pending',
      submittedAt: '2026-10-31 16:30'
    },
    {
      id: 'reg-102',
      businessName: 'Skyline Astro Arena',
      businessType: 'turf',
      contactPerson: 'Sandeep Varma',
      phone: '+91 97412 88990',
      email: 'skylinearena@yahoo.com',
      city: 'Bengaluru',
      address: 'HSR Layout Sector 2, Bengaluru',
      plan: 'Featured Spotlight',
      status: 'Approved',
      submittedAt: '2026-10-30 11:20'
    }
  ],
  bookings: [],
  favourites: []
};

// Database Initialization & Persistence Helper with Live Node.js REST API Sync
class C4Database {
  constructor() {
    this.storageKey = 'c4cricket_database_v1';
    this.apiUrl = '/api';
    this.init();
    this.syncFromBackend();
  }

  async syncFromBackend() {
    try {
      const res = await fetch(`${this.apiUrl}/db`);
      if (res.ok) {
        const json = await res.json();
        if (json && json.data) {
          localStorage.setItem(this.storageKey, JSON.stringify(json.data));
          if (window.c4App) {
            window.c4App.renderAllViews();
          }
        }
      }
    } catch (e) {
      // Offline fallback to localStorage
    }
  }

  init() {
    const existing = localStorage.getItem(this.storageKey);
    if (!existing) {
      localStorage.setItem(this.storageKey, JSON.stringify(C4_INITIAL_STATE));
    }
  }

  get() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : C4_INITIAL_STATE;
    } catch (e) {
      console.error('Error reading C4CRICKET DB:', e);
      return C4_INITIAL_STATE;
    }
  }

  save(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      // Dispatch sync event so admin tab receives real-time updates
      window.dispatchEvent(new Event('c4_storage_updated'));

      // Real-time REST Backend Sync to database.json
      fetch(`${this.apiUrl}/db`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(err => console.warn('Backend REST sync note:', err.message));
    } catch (e) {
      console.error('Error saving C4CRICKET DB:', e);
    }
  }

  // REST API Client Layer
  async apiRequest(endpoint, method = 'GET', body = null) {
    // Attempt live server fetch first
    try {
      const apiPath = endpoint === 'businesses' ? '/businesses/register' : `/${endpoint}`;
      const res = await fetch(`${this.apiUrl}${apiPath}`, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : null
      });
      if (res.ok) {
        const json = await res.json();
        // Sync local DB copy
        const db = this.get();
        if (endpoint === 'businesses') {
          db.registrations.unshift(json.data);
          this.save(db);
        } else if (endpoint === 'bookings') {
          db.bookings.unshift(json.data);
          this.save(db);
        }
        return json;
      }
    } catch (err) {
      console.warn('REST API offline, executing local fallback:', err.message);
    }

    // Local fallback if server unreachable
    return new Promise((resolve) => {
      const db = this.get();
      if (endpoint === 'businesses' && method === 'POST') {
        body.id = 'reg-' + Date.now();
        body.status = 'Pending';
        body.submittedAt = new Date().toLocaleString();
        db.registrations.unshift(body);
        this.save(db);
        resolve({ success: true, data: body });
      } else if (endpoint === 'bookings' && method === 'POST') {
        body.id = 'book-' + Date.now();
        body.status = 'Confirmed';
        body.createdAt = new Date().toLocaleString();
        db.bookings.unshift(body);
        this.save(db);
        resolve({ success: true, data: body });
      } else {
        resolve({ success: true, data: db });
      }
    });
  }
}

// Application Core
class C4App {
  constructor() {
    this.db = new C4Database();
    this.currentUser = JSON.parse(localStorage.getItem('c4_current_user') || 'null');
    this.activeCity = 'All Cities';
    this.currentView = 'home';
    this.demoMatchSimCount = 0;
  }

  start() {
    this.renderAllViews();
    this.setupListeners();
    this.updateUserSessionUI();
    this.initRealtimeLiveScorePolling();
  }

  async initRealtimeLiveScorePolling() {
    await this.fetchAndRenderRealtimeScores();
    // Poll real-time cricket API feed every 8 seconds
    setInterval(() => this.fetchAndRenderRealtimeScores(), 8000);
  }

  async fetchAndRenderRealtimeScores() {
    try {
      const res = await fetch('/api/live-scores');
      if (!res.ok) return;
      const data = await res.json();
      if (!data || !data.liveMatches || !data.liveMatches.length) return;

      const m1 = data.liveMatches[0];
      const m2 = data.liveMatches[1];

      // 1. Update Mini Live Ticker Bar
      const tickerStream = document.getElementById('tickerScoresStream');
      if (tickerStream && m1) {
        tickerStream.innerHTML = `
          <div class="ticker-item"><span class="badge-red">LIVE</span> ${m1.team1.code} vs ${m1.team2.code}: ${m1.team1.score} (${m1.team1.overs} ov)</div>
          <div class="ticker-item divider">|</div>
          <div class="ticker-item"><span class="badge-blue">T20</span> ${m2 ? `${m2.team1.code} vs ${m2.team2.code}: ${m2.team1.score} (${m2.team1.overs} ov)` : 'SYD vs MEL: 174/6'}</div>
          <div class="ticker-item divider">|</div>
          <div class="ticker-item"><span class="badge-green">TELEMETRY</span> Broadcast Synced</div>
        `;
      }

      // 2. Update Desktop Preview Match Box
      const heroHeadline = document.getElementById('heroHeadlineText');
      if (heroHeadline) heroHeadline.textContent = `${m1.team1.name} Dominant in ${m1.series}!`;

      const versusH = document.querySelector('.match-versus-headline');
      if (versusH) versusH.textContent = `${m1.team1.name} vs ${m1.team2.name}`;

      const t1Row = document.querySelector('.team-score-row:nth-of-type(1)');
      if (t1Row) {
        t1Row.innerHTML = `
          <div class="team-label"><span class="flag-icon">${m1.team1.flag}</span> ${m1.team1.code}</div>
          <div class="score-bold">${m1.team1.score} <span class="overs-light">(${m1.team1.overs})</span></div>
        `;
      }

      const t2Row = document.querySelector('.team-score-row:nth-of-type(2)');
      if (t2Row) {
        t2Row.innerHTML = `
          <div class="team-label"><span class="flag-icon">${m1.team2.flag}</span> ${m1.team2.code}</div>
          <div class="score-muted">${m1.team2.score} <span class="overs-light">(${m1.team2.overs})</span></div>
        `;
      }

      const eqEl = document.querySelector('.equation-status');
      if (eqEl) eqEl.textContent = m1.equation;

      // 3. Update Mobile Phone Frame Mockup
      const mScore1 = document.querySelector('.mobile-live-box .m-score-row:nth-of-type(1)');
      if (mScore1) {
        mScore1.innerHTML = `
          <div class="m-team">${m1.team1.flag} ${m1.team1.code}</div>
          <div class="m-runs">${m1.team1.score} <span class="m-ov">(${m1.team1.overs})</span></div>
        `;
      }
      const mScore2 = document.querySelector('.mobile-live-box .m-score-row:nth-of-type(2)');
      if (mScore2) {
        mScore2.innerHTML = `
          <div class="m-team">${m1.team2.flag} ${m1.team2.code}</div>
          <div class="m-runs muted">${m1.team2.score} <span class="m-ov">(${m1.team2.overs})</span></div>
        `;
      }
      const mEq = document.querySelector('.mobile-live-box .m-eq');
      if (mEq) mEq.textContent = m1.equation;

    } catch (e) {
      console.warn('Realtime score polling error:', e);
    }
  }

  toggleMobileMenu() {
    const drawer = document.getElementById('mobileNavDrawer');
    if (drawer) {
      drawer.classList.toggle('open');
    }
  }

  setupListeners() {
    window.addEventListener('hashchange', () => this.handleHashRoute());
    window.addEventListener('c4_storage_updated', () => this.renderAllViews());
    window.addEventListener('storage', (e) => {
      if (e.key === 'c4cricket_database_v1') {
        this.renderAllViews();
      }
    });

    // Also poll backend database every 3 seconds to catch any edits made in other tabs/windows
    setInterval(async () => {
      try {
        const res = await fetch('/api/db');
        if (res.ok) {
          const json = await res.json();
          if (json && json.data) {
            const currentStr = localStorage.getItem('c4cricket_database_v1');
            const newStr = JSON.stringify(json.data);
            if (currentStr !== newStr) {
              localStorage.setItem('c4cricket_database_v1', newStr);
              this.renderAllViews();
            }
          }
        }
      } catch (err) {
        // silent fail when offline
      }
    }, 3000);
  }

  handleHashRoute() {
    const hash = window.location.hash.replace('#', '') || 'home';
    this.navigate(hash, false);
  }

  navigate(sectionName, updateHash = true) {
    if (updateHash) {
      window.location.hash = sectionName;
    }
    this.currentView = sectionName;

    // Elements
    const heroSection = document.getElementById('heroSection');
    const liveCentre = document.getElementById('liveCentreSection');
    const exploreCards = document.getElementById('exploreSection');
    const quickAccess = document.querySelector('.section-quick-access');
    const businessOwners = document.querySelector('.section-business-owners');
    const pricingVal = document.getElementById('pricing');
    const communityBanner = document.querySelector('.section-community-banner');
    const matchCentre = document.getElementById('matchCentreSection');

    const academiesSec = document.getElementById('academiesSection');
    const turfsSec = document.getElementById('turfsSection');
    const shopsSec = document.getElementById('shopsSection');
    const tournamentsSec = document.getElementById('tournamentsSection');
    const newsSec = document.getElementById('newsSection');

    // Update yellow nav active state
    document.querySelectorAll('.y-nav-item').forEach(el => el.classList.remove('active'));
    const activeNavEl = document.querySelector(`.y-nav-item[href="#${sectionName}"]`);
    if (activeNavEl) activeNavEl.classList.add('active');

    // Section visibility logic
    if (sectionName === 'home') {
      heroSection.style.display = 'block';
      liveCentre.style.display = 'block';
      exploreCards.style.display = 'block';
      if (quickAccess) quickAccess.style.display = 'block';
      if (businessOwners) businessOwners.style.display = 'block';
      if (pricingVal) pricingVal.style.display = 'block';
      if (communityBanner) communityBanner.style.display = 'block';
      if (matchCentre) matchCentre.style.display = 'block';

      academiesSec.style.display = 'none';
      turfsSec.style.display = 'none';
      shopsSec.style.display = 'none';
      tournamentsSec.style.display = 'none';
      newsSec.style.display = 'none';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Hide home sections
      heroSection.style.display = 'none';
      liveCentre.style.display = 'none';
      exploreCards.style.display = 'none';
      if (quickAccess) quickAccess.style.display = 'none';
      if (businessOwners) businessOwners.style.display = 'none';
      if (pricingVal) pricingVal.style.display = 'none';
      if (communityBanner) communityBanner.style.display = 'none';
      if (matchCentre) matchCentre.style.display = 'none';

      // Show specific directory
      academiesSec.style.display = sectionName === 'academies' ? 'block' : 'none';
      turfsSec.style.display = sectionName === 'turfs' ? 'block' : 'none';
      shopsSec.style.display = sectionName === 'shops' ? 'block' : 'none';
      tournamentsSec.style.display = sectionName === 'tournaments' ? 'block' : 'none';
      newsSec.style.display = sectionName === 'news' ? 'block' : 'none';
      
      if (sectionName === 'live-scores' || sectionName === 'match-center') {
        heroSection.style.display = 'block';
        liveCentre.style.display = 'block';
        if (matchCentre) matchCentre.style.display = 'block';
        window.scrollTo({ top: liveCentre.offsetTop - 70, behavior: 'smooth' });
      } else if (sectionName === 'pricing') {
        heroSection.style.display = 'block';
        if (pricingVal) pricingVal.style.display = 'block';
        window.scrollTo({ top: pricingVal.offsetTop - 70, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToFilter(type) {
    if (type === 'location') {
      const citySel = document.getElementById('globalCitySelector');
      citySel.focus();
      this.showToast('Please select your target city from the header filter.', 'warning');
    }
  }

  handleCityChange(city) {
    this.activeCity = city;
    this.showToast(`Showing verified cricket venues & services in ${city}`, 'success');
    this.filterAcademies();
    this.filterTurfs();
    this.filterShops();
  }

  handleGlobalSearch() {
    const q = document.getElementById('globalSearchInput').value.trim().toLowerCase();
    if (!q) {
      this.showToast('Enter a keyword to search across turfs, academies, shops & tournaments', 'warning');
      return;
    }
    // Search in academies, turfs, shops
    const db = this.db.get();
    const hasAcad = db.academies.some(a => a.name.toLowerCase().includes(q) || a.city.toLowerCase().includes(q));
    const hasTurf = db.turfs.some(t => t.name.toLowerCase().includes(q) || t.sports.some(s => s.toLowerCase().includes(q)));
    const hasShop = db.shops.some(s => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));

    if (hasTurf) {
      this.navigate('turfs');
      document.getElementById('turfSearchInput').value = q;
      this.filterTurfs();
    } else if (hasAcad) {
      this.navigate('academies');
      document.getElementById('academySearchInput').value = q;
      this.filterAcademies();
    } else if (hasShop) {
      this.navigate('shops');
      document.getElementById('shopSearchInput').value = q;
      this.filterShops();
    } else {
      this.navigate('tournaments');
      document.getElementById('tournamentSearchInput').value = q;
      this.filterTournaments();
    }
  }

  // ==================== RENDERERS ====================
  renderAllViews() {
    this.renderHomepagePreviews();
    this.renderAcademies();
    this.renderTurfs();
    this.renderShops();
    this.renderTournaments();
    this.renderNews();
  }

  renderHomepagePreviews() {
    const db = this.db.get();
    if (!db) return;

    // Pick the most recently added or edited record (last in array or highest id)
    const latestAcademy = db.academies && db.academies.length > 0 ? db.academies[db.academies.length - 1] : null;
    const latestTurf = db.turfs && db.turfs.length > 0 ? db.turfs[db.turfs.length - 1] : null;
    const latestShop = db.shops && db.shops.length > 0 ? db.shops[db.shops.length - 1] : null;
    const latestTourn = db.tournaments && db.tournaments.length > 0 ? db.tournaments[db.tournaments.length - 1] : null;

    // 1. Update Homepage "Explore Everything" Quad Cards with latest edited image (only if not default logo)
    const quadAcademyImg = document.querySelector('#exploreSection .quad-card:nth-child(1) .quad-img-wrap img');
    if (quadAcademyImg && latestAcademy && latestAcademy.image && !latestAcademy.image.includes('c4cricket-logo')) {
      quadAcademyImg.src = latestAcademy.image;
    }

    const quadTurfImg = document.querySelector('#exploreSection .quad-card:nth-child(2) .quad-img-wrap img');
    if (quadTurfImg && latestTurf && latestTurf.image && !latestTurf.image.includes('c4cricket-logo')) {
      quadTurfImg.src = latestTurf.image;
    }

    const quadShopImg = document.querySelector('#exploreSection .quad-card:nth-child(3) .quad-img-wrap img');
    if (quadShopImg && latestShop && latestShop.image && !latestShop.image.includes('c4cricket-logo')) {
      quadShopImg.src = latestShop.image;
    }

    const quadTournImg = document.querySelector('#exploreSection .quad-card:nth-child(4) .quad-img-wrap img');
    if (quadTournImg && latestTourn && latestTourn.image && !latestTourn.image.includes('c4cricket-logo')) {
      quadTournImg.src = latestTourn.image;
    }

    // 2. Update Live Preview 4 News Micro-tiles inside Desktop Mockup with real photography
    const newsTile1 = document.querySelector('.browser-news-tiles .tile-col:nth-child(1) img');
    if (newsTile1) newsTile1.src = '/images/tile_stadium_hd.png';

    const newsTile2 = document.querySelector('.browser-news-tiles .tile-col:nth-child(2) img');
    if (newsTile2) newsTile2.src = '/images/tile_ball_hd.png';

    const newsTile3 = document.querySelector('.browser-news-tiles .tile-col:nth-child(3) img');
    if (newsTile3) newsTile3.src = '/images/tile_batsman_hd.png';

    const newsTile4 = document.querySelector('.browser-news-tiles .tile-col:nth-child(4) img');
    if (newsTile4) newsTile4.src = '/images/tile_ipl_trophy_hd.png';
  }

  renderAcademies() {
    const container = document.getElementById('academiesGrid');
    if (!container) return;
    const db = this.db.get();
    const city = document.getElementById('academyCityFilter') ? document.getElementById('academyCityFilter').value : 'All';
    const level = document.getElementById('academyLevelFilter') ? document.getElementById('academyLevelFilter').value : 'All';
    const q = (document.getElementById('academySearchInput') ? document.getElementById('academySearchInput').value : '').toLowerCase();

    const filtered = db.academies.filter(item => {
      const matchCity = city === 'All' || item.city === city;
      const matchLevel = level === 'All' || item.level === level;
      const matchQ = !q || item.name.toLowerCase().includes(q) || item.coach.toLowerCase().includes(q) || item.locality.toLowerCase().includes(q);
      return matchCity && matchLevel && matchQ;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--c4-text-muted);">No cricket academies matching current filter.</div>`;
      return;
    }

    container.innerHTML = filtered.map(item => `
      <div class="listing-card">
        <div class="card-top-media">
          <img src="${item.image}" alt="${item.name}">
          <span class="badge-card-corner badge-certified"><i class="fa-solid fa-certificate"></i> BCCI CERTIFIED</span>
          <button class="card-fav-btn ${this.isFav(item.id) ? 'active' : ''}" onclick="c4App.toggleFavourite('${item.id}')" title="Save to Favourites">
            <i class="fa-solid fa-heart"></i>
          </button>
        </div>
        <div class="card-main-body">
          <span class="card-locality-tag"><i class="fa-solid fa-location-dot"></i> ${item.locality}</span>
          <h3 class="card-name-title">${item.name}</h3>
          <p style="font-size: 0.8rem; color: var(--c4-text-sub); margin-bottom: 10px;">
            <i class="fa-solid fa-user-tie text-yellow"></i> <strong>Head Coach:</strong> ${item.coach}
          </p>
          <div class="card-features-pills">
            ${item.facilities.map(f => `<span class="feature-pill"><i class="fa-solid fa-check text-green"></i> ${f}</span>`).join('')}
          </div>
          <div class="card-price-row">
            <div>
              <div class="card-price-value">₹${item.priceMonthly}</div>
              <div class="card-price-sub">per month training batch</div>
            </div>
            <div class="card-action-btns">
              <button class="c4-btn c4-btn-dark-sm" onclick="c4App.openDetailModal('academy', '${item.id}')">View Details</button>
              <button class="c4-btn c4-btn-green" onclick="c4App.openBookingModal('academy', '${item.id}')">Enroll Now</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  filterAcademies() {
    this.renderAcademies();
  }

  renderTurfs() {
    const container = document.getElementById('turfsGrid');
    if (!container) return;
    const db = this.db.get();
    const sport = document.getElementById('turfSportFilter') ? document.getElementById('turfSportFilter').value : 'All';
    const city = document.getElementById('turfCityFilter') ? document.getElementById('turfCityFilter').value : 'All';
    const q = (document.getElementById('turfSearchInput') ? document.getElementById('turfSearchInput').value : '').toLowerCase();

    const filtered = db.turfs.filter(item => {
      const matchCity = city === 'All' || item.city === city;
      const matchSport = sport === 'All' || item.sports.includes(sport);
      const matchQ = !q || item.name.toLowerCase().includes(q) || item.locality.toLowerCase().includes(q);
      return matchCity && matchSport && matchQ;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--c4-text-muted);">No turfs found for this selection.</div>`;
      return;
    }

    container.innerHTML = filtered.map(item => `
      <div class="listing-card">
        <div class="card-top-media">
          <img src="${item.image}" alt="${item.name}">
          <span class="badge-card-corner badge-verified-merchant"><i class="fa-solid fa-shield-check"></i> VERIFIED TURF</span>
          <button class="card-fav-btn ${this.isFav(item.id) ? 'active' : ''}" onclick="c4App.toggleFavourite('${item.id}')" title="Save to Favourites">
            <i class="fa-solid fa-heart"></i>
          </button>
        </div>
        <div class="card-main-body">
          <span class="card-locality-tag"><i class="fa-solid fa-location-dot"></i> ${item.locality}</span>
          <h3 class="card-name-title">${item.name}</h3>
          <p style="font-size: 0.8rem; color: var(--c4-text-sub); margin-bottom: 10px;">
            <i class="fa-solid fa-trophy text-yellow"></i> <strong>Sports:</strong> ${item.sports.join(', ')}
          </p>
          <div class="card-features-pills">
            ${item.facilities.map(f => `<span class="feature-pill"><i class="fa-solid fa-circle-check text-teal"></i> ${f}</span>`).join('')}
          </div>
          <div class="card-price-row">
            <div>
              <div class="card-price-value">₹${item.hourlyRate}</div>
              <div class="card-price-sub">per hour slot (floodlit)</div>
            </div>
            <div class="card-action-btns">
              <button class="c4-btn c4-btn-dark-sm" onclick="c4App.openDetailModal('turf', '${item.id}')">View Details</button>
              <button class="c4-btn c4-btn-teal" onclick="c4App.openBookingModal('turf', '${item.id}')">Book Slot</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  filterTurfs() {
    this.renderTurfs();
  }

  renderShops() {
    const container = document.getElementById('shopsGrid');
    if (!container) return;
    const db = this.db.get();
    const cat = document.getElementById('shopCategoryFilter') ? document.getElementById('shopCategoryFilter').value : 'All';
    const city = document.getElementById('shopCityFilter') ? document.getElementById('shopCityFilter').value : 'All';
    const q = (document.getElementById('shopSearchInput') ? document.getElementById('shopSearchInput').value : '').toLowerCase();

    const filtered = db.shops.filter(item => {
      const matchCity = city === 'All' || item.city === city;
      const matchCat = cat === 'All' || item.category === cat;
      const matchQ = !q || item.name.toLowerCase().includes(q) || item.specialty.toLowerCase().includes(q);
      return matchCity && matchCat && matchQ;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--c4-text-muted);">No equipment shops found.</div>`;
      return;
    }

    container.innerHTML = filtered.map(item => `
      <div class="listing-card">
        <div class="card-top-media">
          <img src="${item.image}" alt="${item.name}">
          <span class="badge-card-corner badge-certified"><i class="fa-solid fa-award"></i> AUTHENTIC STOCKIST</span>
          <button class="card-fav-btn ${this.isFav(item.id) ? 'active' : ''}" onclick="c4App.toggleFavourite('${item.id}')">
            <i class="fa-solid fa-heart"></i>
          </button>
        </div>
        <div class="card-main-body">
          <span class="card-locality-tag"><i class="fa-solid fa-location-dot"></i> ${item.locality}</span>
          <h3 class="card-name-title">${item.name}</h3>
          <p style="font-size: 0.8rem; color: var(--c4-text-sub); margin-bottom: 8px;">
            <i class="fa-solid fa-tag text-yellow"></i> ${item.specialty}
          </p>
          <div style="background: rgba(255, 193, 7, 0.1); border: 1px dashed var(--c4-yellow); padding: 6px 10px; border-radius: 4px; font-size: 0.78rem; color: var(--c4-yellow); font-weight: 700; margin-bottom: 12px;">
            <i class="fa-solid fa-ticket"></i> ${item.discount}
          </div>
          <div class="card-price-row">
            <div>
              <div class="card-price-value" style="font-size: 0.95rem; color: #2ed573;">Official Partner</div>
              <div class="card-price-sub">Instant store discount voucher</div>
            </div>
            <div class="card-action-btns">
              <button class="c4-btn c4-btn-dark-sm" onclick="c4App.openDetailModal('shop', '${item.id}')">View Store</button>
              <button class="c4-btn c4-btn-yellow-outline" onclick="c4App.contactStore('${item.name}', '${item.phone}')">Contact Shop</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  filterShops() {
    this.renderShops();
  }

  renderTournaments() {
    const container = document.getElementById('tournamentsGrid');
    if (!container) return;
    const db = this.db.get();
    const format = document.getElementById('tournamentFormatFilter') ? document.getElementById('tournamentFormatFilter').value : 'All';
    const status = document.getElementById('tournamentStatusFilter') ? document.getElementById('tournamentStatusFilter').value : 'All';
    const q = (document.getElementById('tournamentSearchInput') ? document.getElementById('tournamentSearchInput').value : '').toLowerCase();

    const filtered = db.tournaments.filter(item => {
      const matchFormat = format === 'All' || item.format === format;
      const matchStatus = status === 'All' || item.status === status;
      const matchQ = !q || item.name.toLowerCase().includes(q) || item.venue.toLowerCase().includes(q);
      return matchFormat && matchStatus && matchQ;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--c4-text-muted);">No tournaments matching criteria.</div>`;
      return;
    }

    container.innerHTML = filtered.map(item => `
      <div class="listing-card">
        <div class="card-top-media">
          <img src="${item.image}" alt="${item.name}">
          <span class="badge-card-corner ${item.status === 'Open' ? 'badge-certified' : 'badge-verified-merchant'}">
            <i class="fa-solid fa-trophy"></i> ${item.status.toUpperCase()}
          </span>
          <button class="card-fav-btn ${this.isFav(item.id) ? 'active' : ''}" onclick="c4App.toggleFavourite('${item.id}')">
            <i class="fa-solid fa-heart"></i>
          </button>
        </div>
        <div class="card-main-body">
          <span class="card-locality-tag"><i class="fa-solid fa-calendar"></i> ${item.dates} • ${item.city}</span>
          <h3 class="card-name-title">${item.name}</h3>
          <p style="font-size: 0.8rem; color: var(--c4-text-sub); margin-bottom: 8px;">
            <i class="fa-solid fa-map-pin text-yellow"></i> <strong>Venue:</strong> ${item.venue}
          </p>
          <div style="background: rgba(46, 213, 115, 0.1); border: 1px solid rgba(46, 213, 115, 0.3); padding: 8px 12px; border-radius: 4px; font-size: 0.8rem; color: #2ed573; font-weight: 800; margin-bottom: 12px;">
            <i class="fa-solid fa-award"></i> Cash Purse: ${item.prize}
          </div>
          <div class="card-price-row">
            <div>
              <div class="card-price-value">₹${item.entryFee}</div>
              <div class="card-price-sub">Team Registration Fee</div>
            </div>
            <div class="card-action-btns">
              <button class="c4-btn c4-btn-dark-sm" onclick="c4App.openDetailModal('tournament', '${item.id}')">Rules & Info</button>
              <button class="c4-btn c4-btn-teal" onclick="c4App.openBookingModal('tournament', '${item.id}')">Register Team</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  filterTournaments() {
    this.renderTournaments();
  }

  renderNews() {
    const container = document.getElementById('newsGrid');
    if (!container) return;
    const db = this.db.get();
    const cat = document.getElementById('newsCategoryFilter') ? document.getElementById('newsCategoryFilter').value : 'All';
    const q = (document.getElementById('newsSearchInput') ? document.getElementById('newsSearchInput').value : '').toLowerCase();

    const filtered = db.news.filter(item => {
      const matchCat = cat === 'All' || item.category === cat;
      const matchQ = !q || item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q);
      return matchCat && matchQ;
    });

    container.innerHTML = filtered.map(item => `
      <div class="news-article-card" onclick="c4App.openNewsDetail('${item.id}')">
        <img src="${item.image}" alt="${item.title}">
        <div class="news-body">
          <div class="news-cat-pill">${item.category.toUpperCase()} • ${item.time}</div>
          <h4>${item.title}</h4>
          <p>${item.summary}</p>
          <div class="news-meta-row">
            <span><i class="fa-solid fa-clock"></i> ${item.readTime}</span>
            <span style="color: var(--c4-yellow); font-weight: 700;">Read Full Report <i class="fa-solid fa-arrow-right"></i></span>
          </div>
        </div>
      </div>
    `).join('');
  }

  filterNews() {
    this.renderNews();
  }

  // ==================== INTERACTIVE ACTIONS ====================
  isFav(id) {
    const db = this.db.get();
    return db.favourites.includes(id);
  }

  toggleFavourite(id) {
    const db = this.db.get();
    const idx = db.favourites.indexOf(id);
    if (idx > -1) {
      db.favourites.splice(idx, 1);
      this.showToast('Removed from favourites', 'warning');
    } else {
      db.favourites.push(id);
      this.showToast('Added to your favourites list!', 'success');
    }
    this.db.save(db);
    this.renderAllViews();
  }

  simulateNextBall() {
    this.demoMatchSimCount++;
    const outcomes = [
      { text: 'Pathirana to Hardik Pandya, 2 runs', desc: 'Driven hard past cover point, agile running turns 1 into 2.', tag: 'tag-boundary tag-four', tagText: '2 RUNS', ball: '18.3' },
      { text: 'Pathirana to Hardik Pandya, FOUR!', desc: 'Drilled with colossal bat speed straight past the umpire down the ground!', tag: 'tag-boundary tag-four', tagText: 'FOUR!', ball: '18.4' },
      { text: 'Pathirana to Tilak Varma, 1 run', desc: 'Yorker dug out off the toe-end to mid-wicket.', tag: '', tagText: '', ball: '18.5' },
      { text: 'Pathirana to Hardik Pandya, SIX! INDIA WIN!', desc: 'Pitched up in the slot and dispatched into the top tier of Wankhede! What a grand victory!', tag: 'tag-boundary tag-six', tagText: 'MATCH WINNER!', ball: '18.6' }
    ];

    const pick = outcomes[(this.demoMatchSimCount - 1) % outcomes.length];
    const feed = document.getElementById('ballByBallFeed');
    if (feed) {
      const entry = document.createElement('div');
      entry.className = 'commentary-entry';
      entry.innerHTML = `
        <div class="ov-num text-teal">${pick.ball}</div>
        <div class="ov-desc">
          <strong>${pick.text} ${pick.tag ? `<span class="${pick.tag}">${pick.tagText}</span>` : ''}</strong>
          <p>${pick.desc}</p>
        </div>
      `;
      feed.insertBefore(entry, feed.firstChild);
    }
    this.showToast(`Ball ${pick.ball} commentary generated!`, 'success');
  }

  contactStore(shopName, phone) {
    alert(`Connecting directly to ${shopName}\nCall/WhatsApp: ${phone}\nZero intermediary commission on C4CRICKET.`);
  }

  // ==================== MODALS ====================
  openModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.add('active');
  }

  closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.remove('active');
  }

  openBusinessRegModal(type = 'academy') {
    const typeSelect = document.getElementById('regBusinessType');
    if (typeSelect) typeSelect.value = type;
    this.openModal('businessRegModal');
  }

  async handleBusinessRegistration(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = document.getElementById('btnSubmitBusinessReg');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Submitting to C4Admin...`;

    const formData = new FormData(form);
    const payload = {
      businessName: formData.get('businessName'),
      businessType: formData.get('businessType'),
      contactPerson: formData.get('contactPerson'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      city: formData.get('city'),
      address: formData.get('address'),
      plan: formData.get('plan'),
      facilities: formData.get('facilities') ? formData.get('facilities').split(',').map(s => s.trim()) : [],
      description: formData.get('description')
    };

    try {
      const res = await this.db.apiRequest('businesses', 'POST', payload);
      this.closeModal('businessRegModal');
      form.reset();
      this.showToast('Registration submitted successfully! Our Admin panel will verify your merchant credentials within 2 hours.', 'success');
      // If admin tab open, it auto updates via storage event
    } catch (err) {
      this.showToast('Registration failed. Please try again.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Submit Registration`;
    }
  }

  openBookingModal(itemType, itemId) {
    const db = this.db.get();
    let item = null;
    let title = 'Book Slot';
    let subtitle = 'Select date and slot';

    if (itemType === 'turf') {
      item = db.turfs.find(t => t.id === itemId);
      title = `Book Slot - ${item ? item.name : 'Turf'}`;
      subtitle = `Floodlit turf booking at ₹${item ? item.hourlyRate : 0}/hr`;
    } else if (itemType === 'academy') {
      item = db.academies.find(a => a.id === itemId);
      title = `Enroll Batch - ${item ? item.name : 'Academy'}`;
      subtitle = `Coaching program under ${item ? item.coach : 'Head Coach'}`;
    } else if (itemType === 'tournament') {
      item = db.tournaments.find(t => t.id === itemId);
      title = `Register Team - ${item ? item.name : 'Tournament'}`;
      subtitle = `Entry Fee: ₹${item ? item.entryFee : 0} • Cash Prize: ${item ? item.prize : ''}`;
    }

    document.getElementById('bookingModalTitle').innerText = title;
    document.getElementById('bookingModalSubtitle').innerText = subtitle;
    document.getElementById('bookingItemId').value = itemId;
    document.getElementById('bookingItemType').value = itemType;

    const summaryBox = document.getElementById('bookingSummaryPill');
    if (summaryBox && item) {
      summaryBox.innerHTML = `
        <div style="background: #172430; padding: 12px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.08); margin-bottom: 14px;">
          <strong style="color: #fff; font-size: 0.95rem;">${item.name}</strong>
          <div style="font-size: 0.8rem; color: var(--c4-text-sub); margin-top: 4px;">
            <i class="fa-solid fa-location-dot text-teal"></i> ${item.locality || item.venue || item.city}
          </div>
        </div>
      `;
    }

    // Set today as default date
    const dateInput = document.getElementById('bookingDateInput');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.value = today;
      dateInput.min = today;
    }

    if (this.currentUser) {
      document.getElementById('bookingUserName').value = this.currentUser.name;
    }

    this.openModal('bookingModal');
  }

  async handleSlotBooking(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const bookingPayload = {
      itemId: formData.get('itemId'),
      itemType: formData.get('itemType'),
      userName: formData.get('userName'),
      userPhone: formData.get('userPhone'),
      bookDate: formData.get('bookDate'),
      bookSlot: formData.get('bookSlot'),
      notes: formData.get('notes')
    };

    const res = await this.db.apiRequest('bookings', 'POST', bookingPayload);
    this.closeModal('bookingModal');
    form.reset();
    this.showToast(`Reservation confirmed for ${bookingPayload.userName}! Confirmation SMS & WhatsApp receipt dispatched.`, 'success');
  }

  openDetailModal(type, id) {
    const db = this.db.get();
    let item = null;
    let headerHtml = '';
    let bodyHtml = '';
    let footerHtml = '';

    if (type === 'academy') {
      item = db.academies.find(a => a.id === id);
      if (!item) return;
      headerHtml = `
        <i class="fa-solid fa-graduation-cap text-yellow"></i>
        <div>
          <h3>${item.name}</h3>
          <span class="sub"><i class="fa-solid fa-location-dot"></i> ${item.locality}</span>
        </div>
      `;
      bodyHtml = `
        <div style="height: 220px; border-radius: 8px; overflow: hidden; margin-bottom: 16px;">
          <img src="${item.image}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <p style="font-size: 0.9rem; color: #fff; line-height: 1.6; margin-bottom: 16px;">${item.description}</p>
        <div style="background: #16222c; padding: 14px; border-radius: 6px; margin-bottom: 16px;">
          <h4 style="font-size: 0.85rem; color: var(--c4-yellow); margin-bottom: 8px;">COACHING CREDENTIALS</h4>
          <p style="font-size: 0.82rem; color: #fff;"><strong>Head Coach:</strong> ${item.coach}</p>
          <p style="font-size: 0.82rem; color: var(--c4-text-sub); margin-top: 4px;"><strong>Program Level:</strong> ${item.level} Program</p>
          <p style="font-size: 0.82rem; color: var(--c4-text-sub); margin-top: 4px;"><strong>Direct Academy Desk:</strong> ${item.phone}</p>
        </div>
        <h4 style="font-size: 0.85rem; color: #fff; margin-bottom: 8px;">FACILITIES INCLUDED</h4>
        <div class="card-features-pills" style="margin-bottom: 0;">
          ${item.facilities.map(f => `<span class="feature-pill"><i class="fa-solid fa-check text-green"></i> ${f}</span>`).join('')}
        </div>
      `;
      footerHtml = `
        <div style="margin-right: auto; font-weight: 800; font-size: 1.1rem; color: var(--c4-yellow);">₹${item.priceMonthly} / month</div>
        <button class="c4-btn c4-btn-dark" onclick="c4App.closeModal('detailModal')">Close</button>
        <button class="c4-btn c4-btn-green" onclick="c4App.closeModal('detailModal'); c4App.openBookingModal('academy', '${item.id}')">Enroll Student</button>
      `;
    } else if (type === 'turf') {
      item = db.turfs.find(t => t.id === id);
      if (!item) return;
      headerHtml = `
        <i class="fa-solid fa-table-tennis-paddle-ball text-teal"></i>
        <div>
          <h3>${item.name}</h3>
          <span class="sub"><i class="fa-solid fa-location-dot"></i> ${item.locality}</span>
        </div>
      `;
      bodyHtml = `
        <div style="height: 220px; border-radius: 8px; overflow: hidden; margin-bottom: 16px;">
          <img src="${item.image}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <p style="font-size: 0.9rem; color: #fff; line-height: 1.6; margin-bottom: 16px;">${item.description}</p>
        <div style="background: #16222c; padding: 14px; border-radius: 6px; margin-bottom: 16px;">
          <h4 style="font-size: 0.85rem; color: var(--c4-teal); margin-bottom: 8px;">GROUND SPECIFICATIONS</h4>
          <p style="font-size: 0.82rem; color: #fff;"><strong>Supported Sports:</strong> ${item.sports.join(', ')}</p>
          <p style="font-size: 0.82rem; color: var(--c4-text-sub); margin-top: 4px;"><strong>Manager Contact:</strong> ${item.phone}</p>
        </div>
        <h4 style="font-size: 0.85rem; color: #fff; margin-bottom: 8px;">ARENA AMENITIES</h4>
        <div class="card-features-pills">
          ${item.facilities.map(f => `<span class="feature-pill"><i class="fa-solid fa-circle-check text-teal"></i> ${f}</span>`).join('')}
        </div>
      `;
      footerHtml = `
        <div style="margin-right: auto; font-weight: 800; font-size: 1.1rem; color: var(--c4-yellow);">₹${item.hourlyRate} / hour</div>
        <button class="c4-btn c4-btn-dark" onclick="c4App.closeModal('detailModal')">Close</button>
        <button class="c4-btn c4-btn-teal" onclick="c4App.closeModal('detailModal'); c4App.openBookingModal('turf', '${item.id}')">Book Floodlit Slot</button>
      `;
    } else if (type === 'shop') {
      item = db.shops.find(s => s.id === id);
      if (!item) return;
      headerHtml = `
        <i class="fa-solid fa-store text-yellow"></i>
        <div>
          <h3>${item.name}</h3>
          <span class="sub"><i class="fa-solid fa-location-dot"></i> ${item.locality}</span>
        </div>
      `;
      bodyHtml = `
        <div style="height: 220px; border-radius: 8px; overflow: hidden; margin-bottom: 16px;">
          <img src="${item.image}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="background: #16222c; padding: 14px; border-radius: 6px; margin-bottom: 16px;">
          <h4 style="font-size: 0.85rem; color: var(--c4-yellow); margin-bottom: 8px;">MERCHANT HIGHLIGHTS</h4>
          <p style="font-size: 0.82rem; color: #fff;"><strong>Gear Specialty:</strong> ${item.specialty}</p>
          <p style="font-size: 0.82rem; color: var(--c4-text-sub); margin-top: 4px;"><strong>Verified Phone:</strong> ${item.phone}</p>
          <p style="font-size: 0.82rem; color: var(--c4-teal); margin-top: 4px;"><strong>Active Promotion:</strong> ${item.discount}</p>
        </div>
      `;
      footerHtml = `
        <button class="c4-btn c4-btn-dark" onclick="c4App.closeModal('detailModal')">Close</button>
        <button class="c4-btn c4-btn-yellow-outline" onclick="c4App.contactStore('${item.name}', '${item.phone}')">Direct Call</button>
      `;
    } else if (type === 'tournament') {
      item = db.tournaments.find(t => t.id === id);
      if (!item) return;
      headerHtml = `
        <i class="fa-solid fa-trophy text-yellow"></i>
        <div>
          <h3>${item.name}</h3>
          <span class="sub">${item.venue} • ${item.dates}</span>
        </div>
      `;
      bodyHtml = `
        <div style="height: 220px; border-radius: 8px; overflow: hidden; margin-bottom: 16px;">
          <img src="${item.image}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <p style="font-size: 0.9rem; color: #fff; line-height: 1.6; margin-bottom: 16px;">${item.description}</p>
        <div style="background: #16222c; padding: 14px; border-radius: 6px;">
          <h4 style="font-size: 0.85rem; color: #2ed573; margin-bottom: 8px;">TOURNAMENT REWARDS & SLOTS</h4>
          <p style="font-size: 0.82rem; color: #fff;"><strong>Prize Pool:</strong> ${item.prize}</p>
          <p style="font-size: 0.82rem; color: var(--c4-text-sub); margin-top: 4px;"><strong>Teams Limit:</strong> ${item.registeredTeams} / ${item.teamsLimit} Registered</p>
        </div>
      `;
      footerHtml = `
        <div style="margin-right: auto; font-weight: 800; font-size: 1.1rem; color: var(--c4-yellow);">₹${item.entryFee} Entry</div>
        <button class="c4-btn c4-btn-dark" onclick="c4App.closeModal('detailModal')">Close</button>
        <button class="c4-btn c4-btn-teal" onclick="c4App.closeModal('detailModal'); c4App.openBookingModal('tournament', '${item.id}')">Register Team Now</button>
      `;
    }

    document.getElementById('detailModalHeader').innerHTML = headerHtml;
    document.getElementById('detailModalBody').innerHTML = bodyHtml;
    document.getElementById('detailModalFooter').innerHTML = footerHtml;
    this.openModal('detailModal');
  }

  openNewsDetail(id) {
    const db = this.db.get();
    const item = db.news.find(n => n.id === id);
    if (!item) return;

    document.getElementById('detailModalHeader').innerHTML = `
      <i class="fa-solid fa-newspaper text-yellow"></i>
      <div>
        <h3>${item.title}</h3>
        <span class="sub">${item.category} • ${item.time} • ${item.readTime}</span>
      </div>
    `;
    document.getElementById('detailModalBody').innerHTML = `
      <div style="height: 250px; border-radius: 8px; overflow: hidden; margin-bottom: 16px;">
        <img src="${item.image}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <p style="font-size: 1rem; color: #fff; line-height: 1.7; margin-bottom: 16px;">${item.content}</p>
      <div style="background: rgba(255, 193, 7, 0.08); border-left: 3px solid var(--c4-yellow); padding: 12px; border-radius: 4px; font-size: 0.82rem; color: #e1ebf2;">
        <strong>C4CRICKET Match Telemetry:</strong> All ball speeds and pitch impact heatmaps verified via official ICC compliant telemetry engine.
      </div>
    `;
    document.getElementById('detailModalFooter').innerHTML = `
      <button class="c4-btn c4-btn-green" onclick="c4App.closeModal('detailModal')">Back to News</button>
    `;
    this.openModal('detailModal');
  }

  openScorecardModal(matchId) {
    this.openDetailModalRaw(
      'India vs Australia – ICC ODI Match Scorecard',
      `
      <div style="background: #16222c; padding: 14px; border-radius: 8px; margin-bottom: 14px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <strong>Australia: 244 (49.4 ov)</strong>
          <span style="color:var(--c4-text-sub);">Run Rate: 4.91</span>
        </div>
        <p style="font-size: 0.8rem; color: var(--c4-text-sub);">Top Scorers: Steve Smith 73 (82), Marnus Labuschagne 54 (68) | Bowling: Bumrah 3/38, Shami 3/42</p>
      </div>
      <div style="background: #16222c; padding: 14px; border-radius: 8px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <strong style="color:var(--c4-yellow);">India: 245/3 (38.2 ov) - INDIA WON BY 7 WICKETS</strong>
          <span style="color:#2ed573; font-weight:700;">Target Achieved</span>
        </div>
        <p style="font-size: 0.8rem; color: var(--c4-text-sub);">Top Scorers: Rohit Sharma 88 (64), Shubman Gill 62 (52), Virat Kohli 51* (44) | Bowling: Starc 2/51, Zampa 1/48</p>
      </div>
      `
    );
  }

  openBallByBallModal(matchId) {
    this.scrollToSection('matchCentreSection');
    this.showToast('Scrolled directly to live ball telemetry feed', 'success');
  }

  openAllMatchesModal() {
    this.openDetailModalRaw(
      'All Upcoming & Completed Telemetry Fixtures',
      `
      <div style="display:flex; flex-direction:column; gap:12px;">
        <div style="background:#16222c; padding:12px; border-radius:6px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <span style="font-size:0.7rem; color:#ff4757; font-weight:800;">LIVE</span>
            <div style="font-weight:700;">India vs Australia (2nd ODI)</div>
            <span style="font-size:0.75rem; color:var(--c4-text-muted);">IND 245/3 (38.2 ov) vs AUS 244</span>
          </div>
          <button class="c4-btn c4-btn-yellow-sm" onclick="c4App.closeModal('detailModal'); c4App.scrollToSection('heroLiveMatchCard')">Track Live</button>
        </div>
        <div style="background:#16222c; padding:12px; border-radius:6px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <span style="font-size:0.7rem; color:var(--c4-teal); font-weight:800;">UPCOMING • TOMORROW 14:00</span>
            <div style="font-weight:700;">England vs South Africa (1st Test)</div>
            <span style="font-size:0.75rem; color:var(--c4-text-muted);">Lord's Cricket Ground, London</span>
          </div>
          <button class="c4-btn c4-btn-dark-sm" onclick="c4App.showToast('Alert set for England vs SA!', 'success')">Set Alert</button>
        </div>
        <div style="background:#16222c; padding:12px; border-radius:6px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <span style="font-size:0.7rem; color:#2ed573; font-weight:800;">COMPLETED</span>
            <div style="font-weight:700;">Mumbai Indians vs Chennai Super Kings</div>
            <span style="font-size:0.75rem; color:var(--c4-text-muted);">MI 182/4 (19.4) won by 6 wickets</span>
          </div>
          <button class="c4-btn c4-btn-dark-sm" onclick="c4App.openScorecardModal('match-1')">Scorecard</button>
        </div>
      </div>
      `
    );
  }

  filterLiveMatches(type) {
    document.querySelectorAll('.mc-tab-btn').forEach(btn => btn.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');

    if (type === 'live') {
      document.querySelector('.t-match-title strong').innerText = 'Mumbai Indians vs Chennai Super Kings (Live Inning 2)';
    } else if (type === 'upcoming') {
      document.querySelector('.t-match-title strong').innerText = 'Kolkata Knight Riders vs Royal Challengers Bengaluru (Starts in 4h)';
    } else {
      document.querySelector('.t-match-title strong').innerText = 'Gujarat Titans vs Delhi Capitals (GT won by 14 runs)';
    }
    this.showToast(`Switched Live Centre to ${type.toUpperCase()} matches`, 'success');
  }

  openPricingDetailsModal() {
    this.openDetailModalRaw(
      'C4CRICKET Monetization & Merchant Packages',
      `
      <div style="display:flex; flex-direction:column; gap:14px; font-size:0.85rem;">
        <div style="background:#16222c; padding:14px; border-radius:6px; border-left:4px solid var(--c4-green);">
          <strong style="font-size:1rem; color:#fff;">Standard Academy & Turf Tier (₹499 - ₹999/mo)</strong>
          <p style="color:var(--c4-text-sub); margin-top:4px;">Includes venue profile, contact details, slot reservation engine, student lead forms, and Google Map integration.</p>
        </div>
        <div style="background:#16222c; padding:14px; border-radius:6px; border-left:4px solid var(--c4-yellow);">
          <strong style="font-size:1rem; color:#fff;">Featured Spotlight Tier (₹1,999/mo)</strong>
          <p style="color:var(--c4-text-sub); margin-top:4px;">Top-3 search placement in city directory, gold verified merchant badge, and direct booking WhatsApp notifications.</p>
        </div>
        <div style="background:#16222c; padding:14px; border-radius:6px; border-left:4px solid var(--c4-teal);">
          <strong style="font-size:1rem; color:#fff;">Homepage Broadcast Promotion (₹4,999/campaign)</strong>
          <p style="color:var(--c4-text-sub); margin-top:4px;">Banner placement on the C4CRICKET national landing portal reaching 250,000+ monthly cricket enthusiasts.</p>
        </div>
      </div>
      `
    );
  }

  openPlayerCommunityModal() {
    this.openDetailModalRaw(
      'Players & Teams Network',
      `
      <p style="font-size:0.88rem; color:var(--c4-text-sub); margin-bottom:14px;">Connect with local captains looking for players or post your availability for weekend leather and tape ball leagues.</p>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div style="background:#16222c; padding:12px; border-radius:6px;">
          <h4 style="color:#fff; font-size:0.85rem;"><i class="fa-solid fa-user-plus text-teal"></i> Looking for Bowlers</h4>
          <span style="font-size:0.75rem; color:var(--c4-text-muted);">Mumbai Weekend Titans • Shivaji Park</span>
          <p style="font-size:0.78rem; color:var(--c4-text-sub); margin-top:6px;">Need 2 right-arm fast bowlers for corporate Sunday league.</p>
          <button class="c4-btn c4-btn-teal-xs" style="margin-top:8px;" onclick="c4App.showToast('Request sent to team captain!', 'success')">Apply to Join</button>
        </div>
        <div style="background:#16222c; padding:12px; border-radius:6px;">
          <h4 style="color:#fff; font-size:0.85rem;"><i class="fa-solid fa-baseball-bat-ball text-yellow"></i> Top-order Batter Available</h4>
          <span style="font-size:0.75rem; color:var(--c4-text-muted);">Rahul Sen (Avg 44.5) • Bengaluru</span>
          <p style="font-size:0.78rem; color:var(--c4-text-sub); margin-top:6px;">Available for 20-over Saturday tournaments around Whitefield.</p>
          <button class="c4-btn c4-btn-yellow-xs" style="margin-top:8px;" onclick="c4App.showToast('Direct invitation sent to player!', 'success')">Invite Player</button>
        </div>
      </div>
      `
    );
  }

  showLegalModal(title) {
    this.openDetailModalRaw(
      title,
      `
      <p style="font-size:0.85rem; color:var(--c4-text-sub); line-height:1.6;">
        Welcome to the C4CRICKET platform. All merchant listings, turf availability schedules, telemetry tracking algorithms and tournament registries are governed under our digital standard policies.
      </p>
      <div style="background:#16222c; padding:12px; border-radius:6px; margin-top:12px; font-size:0.8rem; color:var(--c4-text-muted);">
        - Certified data encryption across all transaction booking requests.<br>
        - Zero hidden markups on ground reservations.<br>
        - Real-time compliance with local sports authorities and verified identity verifications.
      </div>
      `
    );
  }

  openDetailModalRaw(title, bodyHtml) {
    document.getElementById('detailModalHeader').innerHTML = `
      <i class="fa-solid fa-circle-info text-yellow"></i>
      <div>
        <h3>${title}</h3>
      </div>
    `;
    document.getElementById('detailModalBody').innerHTML = bodyHtml;
    document.getElementById('detailModalFooter').innerHTML = `
      <button class="c4-btn c4-btn-green" onclick="c4App.closeModal('detailModal')">Done</button>
    `;
    this.openModal('detailModal');
  }

  // ==================== USER AUTH & PROFILE ====================
  openAuthOrUserModal() {
    if (this.currentUser) {
      this.openDetailModalRaw(
        `Welcome, ${this.currentUser.name}`,
        `
        <div style="background:#16222c; padding:16px; border-radius:8px; margin-bottom:14px;">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
            <div style="width:48px; height:48px; border-radius:50%; background:var(--c4-green); display:flex; align-items:center; justify-content:center; font-size:1.4rem; color:#fff;">
              <i class="fa-solid fa-user"></i>
            </div>
            <div>
              <strong style="font-size:1.1rem; color:#fff;">${this.currentUser.name}</strong>
              <div style="font-size:0.8rem; color:var(--c4-teal);">${this.currentUser.role || 'Cricket Player'}</div>
            </div>
          </div>
          <p style="font-size:0.82rem; color:var(--c4-text-sub);">Email: ${this.currentUser.email}</p>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <a href="admin.html" class="c4-btn c4-btn-outline-gold" style="width:100%;"><i class="fa-solid fa-shield-halved"></i> Open C4Admin Dashboard</a>
          <button class="c4-btn c4-btn-dark" style="width:100%;" onclick="c4App.handleUserLogout()"><i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out</button>
        </div>
        `
      );
    } else {
      this.openModal('authModal');
    }
  }

  toggleAuthTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabLogin = document.getElementById('tabLoginBtn');
    const tabReg = document.getElementById('tabRegisterBtn');

    if (tab === 'login') {
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
      tabLogin.classList.add('active');
      tabReg.classList.remove('active');
    } else {
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
      tabLogin.classList.remove('active');
      tabReg.classList.add('active');
    }
  }

  handleUserLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const user = {
      name: email.split('@')[0].toUpperCase(),
      email: email,
      role: 'Registered Player & Merchant'
    };
    this.currentUser = user;
    localStorage.setItem('c4_current_user', JSON.stringify(user));
    this.updateUserSessionUI();
    this.closeModal('authModal');
    this.showToast(`Signed in as ${user.name}!`, 'success');
  }

  handleUserRegister(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const user = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      role: formData.get('role')
    };
    this.currentUser = user;
    localStorage.setItem('c4_current_user', JSON.stringify(user));
    this.updateUserSessionUI();
    this.closeModal('authModal');
    this.showToast(`Welcome to C4CRICKET, ${user.name}!`, 'success');
  }

  handleUserLogout() {
    this.currentUser = null;
    localStorage.removeItem('c4_current_user');
    this.updateUserSessionUI();
    this.closeModal('detailModal');
    this.showToast('Successfully signed out.', 'warning');
  }

  updateUserSessionUI() {
    const btn = document.getElementById('userAccountBtn');
    if (btn) {
      if (this.currentUser) {
        btn.innerHTML = `<span style="font-size:0.75rem; font-weight:800;">${this.currentUser.name.substring(0, 2).toUpperCase()}</span>`;
        btn.style.background = '#ffc107';
        btn.style.color = '#000';
      } else {
        btn.innerHTML = `<i class="fa-solid fa-user"></i>`;
        btn.style.background = '#00b060';
        btn.style.color = '#fff';
      }
    }
  }

  // ==================== LIVE TICKER SIMULATOR ====================
  startLiveTickerSimulator() {
    const scores = [
      'IND vs ENG: 246/4 (41.2 ov)',
      'IND vs ENG: 250/4 (41.5 ov)',
      'SYD vs MEL: 171/6 (20.0 ov)',
      'CSK beat MI by 4 wkts',
      'PAK vs NZ: 189/8 (20.0 ov)',
      'SA vs WI: 312/5 (50.0 ov)'
    ];
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % scores.length;
      const stream = document.getElementById('tickerScoresStream');
      if (stream) {
        stream.innerHTML = `
          <div class="ticker-item"><span class="badge-red">LIVE</span> ${scores[idx]}</div>
          <div class="ticker-item divider">|</div>
          <div class="ticker-item"><span class="badge-blue">T20</span> SYD vs MEL: 171/6 (20.0 ov)</div>
          <div class="ticker-item divider">|</div>
          <div class="ticker-item"><span class="badge-green">RESULT</span> CSK beat MI by 4 wkts</div>
        `;
      }
    }, 15000);
  }

  // ==================== TOAST MESSAGES ====================
  showToast(message, type = 'success') {
    const container = document.getElementById('c4ToastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `c4-toast ${type === 'error' ? 'toast-error' : type === 'warning' ? 'toast-warning' : ''}`;
    
    let icon = 'fa-circle-check';
    if (type === 'error') icon = 'fa-circle-exclamation';
    if (type === 'warning') icon = 'fa-triangle-exclamation';

    toast.innerHTML = `
      <i class="fa-solid ${icon}"></i>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }
}

// Global Instantiate
const c4App = new C4App();
document.addEventListener('DOMContentLoaded', () => {
  c4App.start();
});
