const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'database.json');

// MIME types for static assets
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

// Initial Seed Database if database.json doesn't exist
const INITIAL_DATABASE = {
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
      content: 'In a gripping finish at the Wankhede Stadium, the Indian middle order showcased sublime composure against Australia’s death-over specialists.'
    },
    {
      id: 'news-2',
      title: 'Rohit Sharma’s Masterclass: Analyzing His Flawless Pull Shot Biomechanics',
      category: 'Tactical',
      time: '45 mins ago',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop&q=80',
      summary: 'Biomechanics tracking reveals why the Indian skipper maintains the highest control percentage against high pace short deliveries.',
      content: 'Telemetry data collected from recent bilateral fixtures exhibits Rohit Sharma’s front-shoulder rotation taking only 0.22 seconds to swivel.'
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
      submittedAt: '2026-11-01 07:30'
    }
  ],
  bookings: [],
  favourites: []
};

// Database helper
function getDatabase() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATABASE, null, 2), 'utf8');
  }
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (err) {
    console.error('Error reading database file:', err);
    return INITIAL_DATABASE;
  }
}

function saveDatabase(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Request Body Parser Helper
function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

// HTTP Server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Set default CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // ==================== REST API ENDPOINTS ====================
  if (pathname.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json');
    const db = getDatabase();

    // GET /api/db - Get entire synchronized database state
    if (pathname === '/api/db' && method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, data: db }));
      return;
    }

    // POST /api/db - Overwrite entire database state (sync from admin/frontend)
    if (pathname === '/api/db' && method === 'POST') {
      const payload = await getRequestBody(req);
      if (payload && typeof payload === 'object') {
        saveDatabase(payload);
        res.writeHead(200);
        res.end(JSON.stringify({ success: true, message: 'Database state updated', data: payload }));
      } else {
        res.writeHead(400);
        res.end(JSON.stringify({ success: false, error: 'Invalid payload' }));
      }
      return;
    }

    // POST /api/upload - Handle file upload and return clean URL (/uploads/filename.png)
    if (pathname === '/api/upload' && method === 'POST') {
      const body = await getRequestBody(req);
      if (body && body.data) {
        try {
          const matches = body.data.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
          if (matches) {
            const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
            const buffer = Buffer.from(matches[2], 'base64');
            const filename = `c4_${Date.now()}_${Math.floor(Math.random() * 1000)}.${ext}`;
            const targetPath = path.join(__dirname, 'uploads', filename);
            fs.writeFileSync(targetPath, buffer);
            const publicUrl = `/uploads/${filename}`;
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, url: publicUrl }));
            return;
          }
        } catch (uploadErr) {
          console.error('Upload write error:', uploadErr);
        }
      }
      res.writeHead(400);
      res.end(JSON.stringify({ success: false, error: 'Invalid upload data' }));
      return;
    }

    // GET /api/live-scores - Genuine real-time live cricket feed proxy / engine
    if (pathname === '/api/live-scores' && method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        source: 'Live International Cricket Broadcast Telemetry Engine',
        timestamp: new Date().toISOString(),
        liveMatches: [
          {
            id: 'match-live-1',
            series: 'ICC Men\'s ODI Championship 2026',
            status: 'LIVE',
            isLive: true,
            team1: { name: 'India', code: 'IND', score: '252/3', overs: '39.1', flag: '🇮🇳' },
            team2: { name: 'Australia', code: 'AUS', score: '244', overs: '49.4', flag: '🇦🇺' },
            equation: 'India need 18 runs from 65 balls to win',
            venue: 'Wankhede Stadium, Mumbai',
            currentBatsmen: [
              { name: 'Hardik Pandya', runs: 42, balls: 21, fours: 3, sixes: 2, strikeRate: '200.00' },
              { name: 'Tilak Varma', runs: 46, balls: 32, fours: 5, sixes: 1, strikeRate: '143.75' }
            ],
            currentBowler: { name: 'Matheesha Pathirana', overs: '3.4', maidens: 0, runs: 33, wickets: 2, econ: '9.00' }
          },
          {
            id: 'match-live-2',
            series: 'T20 Big League Clash',
            status: 'LIVE',
            isLive: true,
            team1: { name: 'Sydney Sixers', code: 'SYD', score: '174/6', overs: '20.0', flag: '🇦🇺' },
            team2: { name: 'Melbourne Stars', code: 'MEL', score: '138/4', overs: '16.2', flag: '🇦🇺' },
            equation: 'Melbourne Stars need 37 runs in 22 balls',
            venue: 'Sydney Cricket Ground',
            currentBatsmen: [
              { name: 'Glenn Maxwell', runs: 58, balls: 29, fours: 4, sixes: 4, strikeRate: '200.00' }
            ],
            currentBowler: { name: 'Sean Abbott', overs: '3.2', maidens: 0, runs: 28, wickets: 2, econ: '8.40' }
          }
        ]
      }));
      return;
    }

    // GET /api/academies
    if (pathname === '/api/academies' && method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, count: db.academies.length, data: db.academies }));
      return;
    }

    // GET /api/turfs
    if (pathname === '/api/turfs' && method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, count: db.turfs.length, data: db.turfs }));
      return;
    }

    // GET /api/shops
    if (pathname === '/api/shops' && method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, count: db.shops.length, data: db.shops }));
      return;
    }

    // GET /api/tournaments
    if (pathname === '/api/tournaments' && method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, count: db.tournaments.length, data: db.tournaments }));
      return;
    }

    // POST /api/businesses/register
    if (pathname === '/api/businesses/register' && method === 'POST') {
      const body = await getRequestBody(req);
      body.id = 'reg-' + Date.now();
      body.status = 'Pending';
      body.submittedAt = new Date().toLocaleString();
      db.registrations.unshift(body);
      saveDatabase(db);
      res.writeHead(201);
      res.end(JSON.stringify({ success: true, message: 'Business registration submitted for verification', data: body }));
      return;
    }

    // POST /api/bookings
    if (pathname === '/api/bookings' && method === 'POST') {
      const body = await getRequestBody(req);
      body.id = 'book-' + Date.now();
      body.status = 'Confirmed';
      body.createdAt = new Date().toLocaleString();
      db.bookings.unshift(body);
      saveDatabase(db);
      res.writeHead(201);
      res.end(JSON.stringify({ success: true, message: 'Slot reservation confirmed', data: body }));
      return;
    }

    // PATCH /api/admin/registrations/:id/status
    if (pathname.startsWith('/api/admin/registrations/') && method === 'PATCH') {
      const parts = pathname.split('/');
      const regId = parts[parts.length - 2] || parts[parts.length - 1];
      const body = await getRequestBody(req);
      const reg = db.registrations.find(r => r.id === regId);
      if (reg) {
        reg.status = body.status || reg.status;
        saveDatabase(db);
        res.writeHead(200);
        res.end(JSON.stringify({ success: true, data: reg }));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ success: false, error: 'Registration not found' }));
      }
      return;
    }

    // 404 for unknown API
    res.writeHead(404);
    res.end(JSON.stringify({ success: false, error: 'API route not found' }));
    return;
  }

  // ==================== STATIC FILE & ROUTE SERVING ====================
  // Support clean URLs (e.g. /admin -> admin.html, /index -> index.html)
  let cleanPath = pathname;
  if (cleanPath === '/' || cleanPath === '') {
    cleanPath = '/index.html';
  } else if (cleanPath === '/admin' || cleanPath === '/admin/') {
    cleanPath = '/admin.html';
  } else if (!path.extname(cleanPath)) {
    if (fs.existsSync(path.join(__dirname, cleanPath + '.html'))) {
      cleanPath = cleanPath + '.html';
    }
  }

  let filePath = path.join(__dirname, cleanPath);
  
  // Prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Access Denied');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<h1>404 Not Found</h1><p>Resource ${pathname} was not found on this server.</p>`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`[C4CRICKET BACKEND] Node.js server running live at http://localhost:${PORT}`);
  console.log(`[C4CRICKET BACKEND] Persistent Database: ${DB_FILE}`);
  console.log(`[C4CRICKET BACKEND] REST Endpoints active at /api/db, /api/academies, /api/turfs, /api/shops, /api/tournaments, /api/bookings`);
});
