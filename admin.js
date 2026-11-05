/**
 * C4ADMIN - JAVASCRIPT CONTROLLER
 * Full CRUD, business verification pipeline, statistics updates, and live sync.
 */

class AdminDatabase {
  constructor() {
    this.storageKey = 'c4cricket_database_v1';
    this.apiUrl = '/api';
    this.syncFromBackend();
  }

  async syncFromBackend() {
    try {
      const res = await fetch(`${this.apiUrl}/db`);
      if (res.ok) {
        const json = await res.json();
        if (json && json.data) {
          localStorage.setItem(this.storageKey, JSON.stringify(json.data));
          if (window.adminApp) {
            window.adminApp.updateStats();
            window.adminApp.renderActiveTab();
          }
        }
      }
    } catch (e) {
      // Local fallback
    }
  }

  get() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Admin DB error:', e);
      return null;
    }
  }

  save(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      window.dispatchEvent(new Event('c4_storage_updated'));

      // Real-time REST Backend Sync to database.json
      fetch(`${this.apiUrl}/db`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(err => console.warn('Backend REST sync note:', err.message));
    } catch (e) {
      console.error('Admin save error:', e);
    }
  }
}

class AdminApp {
  constructor() {
    this.db = new AdminDatabase();
    this.currentTab = 'overview';
  }

  init() {
    this.renderActiveTab();
    this.updateStats();
    this.setupListeners();
  }

  setupListeners() {
    window.addEventListener('c4_storage_updated', () => {
      this.updateStats();
      this.renderActiveTab();
    });
  }

  switchTab(tabId) {
    this.currentTab = tabId;
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.admin-tab-pane').forEach(el => el.classList.remove('active'));

    const btn = Array.from(document.querySelectorAll('.sidebar-nav .nav-item')).find(b => b.getAttribute('onclick') && b.getAttribute('onclick').includes(tabId));
    if (btn) btn.classList.add('active');

    const pane = document.getElementById(`pane-${tabId}`);
    if (pane) pane.classList.add('active');

    // Update Header
    const titles = {
      overview: { title: 'Dashboard Overview', sub: 'Real-time telemetry, bookings, active merchants and approvals.' },
      approvals: { title: 'Business Verification Pipeline', sub: 'Approve, reject or inspect pending merchant registrations.' },
      academies: { title: 'Manage Cricket Academies', sub: 'Directory of certified coaching academies and mentor profiles.' },
      turfs: { title: 'Manage Turfs & Grounds', sub: 'Floodlit turf slots, pitch properties, and multi-sport setups.' },
      shops: { title: 'Manage Sports Shops', sub: 'Cricket equipment retailers, bat repair hubs, and discount promos.' },
      tournaments: { title: 'Tournament Management', sub: 'Manage corporate cups, state tournaments, and team registrations.' },
      bookings: { title: 'Customer Slot & Batch Bookings', sub: 'Incoming slot reservations submitted by players.' },
      news: { title: 'Manage News & Match Reports', sub: 'Editorial publications and telemetry breakdown articles.' },
      users: { title: 'User Management', sub: 'Registered players, coaches, managers and merchant accounts.' },
      subscriptions: { title: 'Merchant Subscriptions', sub: 'Monthly listing tiers and monetization revenue status.' },
      reports: { title: 'Reports & Analytics', sub: 'Platform broadcast metrics and venue turnover figures.' },
      settings: { title: 'Platform Settings', sub: 'Global telemetry parameters and security keys.' }
    };

    if (titles[tabId]) {
      document.getElementById('adminPageTitle').innerText = titles[tabId].title;
      document.getElementById('adminPageSub').innerText = titles[tabId].sub;
    }

    this.renderActiveTab();
  }

  toggleSidebar() {
    const sidebar = document.getElementById('adminSidebar');
    sidebar.classList.toggle('open');
  }

  updateStats() {
    const data = this.db.get();
    if (!data) return;

    const pendingCount = data.registrations.filter(r => r.status === 'Pending').length;
    document.getElementById('statTotalAcademies').innerText = data.academies.length;
    document.getElementById('statTotalTurfs').innerText = data.turfs.length;
    document.getElementById('statTotalShops').innerText = data.shops.length;
    document.getElementById('statTotalTournaments').innerText = data.tournaments.length;
    document.getElementById('statTotalBusinesses').innerText = data.academies.length + data.turfs.length + data.shops.length;
    document.getElementById('statPendingApprovals').innerText = pendingCount;
    document.getElementById('pendingApprovalsBadge').innerText = pendingCount;
  }

  renderActiveTab() {
    this.updateStats();
    if (this.currentTab === 'overview') {
      this.renderOverviewTab();
    } else if (this.currentTab === 'approvals') {
      this.renderApprovalsTab();
    } else if (this.currentTab === 'academies') {
      this.renderAcademiesTab();
    } else if (this.currentTab === 'turfs') {
      this.renderTurfsTab();
    } else if (this.currentTab === 'shops') {
      this.renderShopsTab();
    } else if (this.currentTab === 'tournaments') {
      this.renderTournamentsTab();
    } else if (this.currentTab === 'bookings') {
      this.renderBookingsTab();
    } else if (this.currentTab === 'news') {
      this.renderNewsTab();
    }
  }

  // ==================== TAB RENDERERS ====================
  renderOverviewTab() {
    const data = this.db.get();
    if (!data) return;

    // Overview pending list
    const tbodyPending = document.getElementById('overviewPendingTbody');
    const recentRegs = data.registrations.slice(0, 5);
    tbodyPending.innerHTML = recentRegs.map(reg => `
      <tr>
        <td><strong>${reg.businessName}</strong></td>
        <td><span class="badge-role">${reg.businessType.toUpperCase()}</span></td>
        <td>${reg.city}</td>
        <td>${reg.plan}</td>
        <td>
          <span class="badge-status-${reg.status.toLowerCase()}">${reg.status}</span>
        </td>
        <td>
          ${reg.status === 'Pending' ? `
            <button class="btn-table-action btn-approve" onclick="adminApp.approveRegistration('${reg.id}')">Approve</button>
            <button class="btn-table-action btn-reject" onclick="adminApp.rejectRegistration('${reg.id}')">Reject</button>
          ` : `<span style="font-size:0.75rem; color:var(--c4-text-muted);">Verified</span>`}
        </td>
      </tr>
    `).join('') || `<tr><td colspan="6" style="text-align:center; color:var(--c4-text-muted);">No registrations found</td></tr>`;

    // Overview bookings
    const tbodyBookings = document.getElementById('overviewBookingsTbody');
    const recentBooks = data.bookings.slice(0, 5);
    tbodyBookings.innerHTML = recentBooks.map(b => `
      <tr>
        <td><strong>${b.userName}</strong><br><span style="font-size:0.7rem; color:var(--c4-text-muted);">${b.userPhone}</span></td>
        <td><span class="badge-role">${b.itemType.toUpperCase()}</span></td>
        <td>${b.bookDate} (${b.bookSlot})</td>
        <td><span class="badge-status-approved">Confirmed</span></td>
      </tr>
    `).join('') || `<tr><td colspan="4" style="text-align:center; color:var(--c4-text-muted);">No recent player bookings</td></tr>`;
  }

  renderApprovalsTab() {
    const data = this.db.get();
    if (!data) return;

    const tbody = document.getElementById('allApprovalsTbody');
    tbody.innerHTML = data.registrations.map(reg => `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:40px; height:40px; border-radius:6px; overflow:hidden; border:1px solid var(--adm-border); background:#0c131a; flex-shrink:0;">
              <img src="${reg.image || '/images/card_academies_hd.png'}" alt="${reg.businessName}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='/images/c4cricket-logo.png'">
            </div>
            <div>
              <strong>${reg.businessName}</strong>
              ${reg.description ? `<p style="font-size:0.7rem; color:var(--c4-text-muted); margin-top:2px;">${reg.description.substring(0, 45)}...</p>` : ''}
            </div>
          </div>
        </td>
        <td><span class="badge-role">${reg.businessType.toUpperCase()}</span></td>
        <td>${reg.contactPerson}<br><span style="font-size:0.7rem; color:var(--c4-text-muted);">${reg.phone}</span></td>
        <td>${reg.city}<br><span style="font-size:0.7rem; color:var(--c4-text-muted);">${reg.address || ''}</span></td>
        <td>${reg.plan}</td>
        <td>${reg.submittedAt || 'Today'}</td>
        <td><span class="badge-status-${reg.status.toLowerCase()}">${reg.status}</span></td>
        <td>
          ${reg.status === 'Pending' ? `
            <button class="btn-table-action btn-approve" onclick="adminApp.approveRegistration('${reg.id}')"><i class="fa-solid fa-check"></i> Approve & Publish</button>
            <button class="btn-table-action btn-reject" onclick="adminApp.rejectRegistration('${reg.id}')"><i class="fa-solid fa-xmark"></i> Reject</button>
          ` : `
            <button class="btn-table-action btn-delete" onclick="adminApp.deleteRegistration('${reg.id}')"><i class="fa-solid fa-trash"></i> Delete</button>
          `}
        </td>
      </tr>
    `).join('');
  }

  renderAcademiesTab() {
    const data = this.db.get();
    if (!data) return;

    const tbody = document.getElementById('academiesAdminTbody');
    tbody.innerHTML = data.academies.map(item => `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:48px; height:48px; border-radius:6px; overflow:hidden; border:1px solid var(--adm-border); background:#0c131a; flex-shrink:0;">
              <img src="${item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='/images/c4cricket-logo.png'">
            </div>
            <div>
              <strong>${item.name}</strong><br>
              <span style="font-size:0.7rem; color:var(--c4-text-muted);">${item.locality}</span>
            </div>
          </div>
        </td>
        <td>${item.coach}</td>
        <td>${item.city}</td>
        <td><span class="badge-role">${item.level}</span></td>
        <td><strong>₹${item.priceMonthly}</strong></td>
        <td>⭐ ${item.rating} (${item.reviews})</td>
        <td>
          <button class="btn-table-action" onclick="adminApp.openEditModal('academy', '${item.id}')"><i class="fa-solid fa-pen"></i> Edit</button>
          <button class="btn-table-action btn-delete" onclick="adminApp.deleteRecord('academies', '${item.id}')"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `).join('');
  }

  renderTurfsTab() {
    const data = this.db.get();
    if (!data) return;

    const tbody = document.getElementById('turfsAdminTbody');
    tbody.innerHTML = data.turfs.map(item => `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:48px; height:48px; border-radius:6px; overflow:hidden; border:1px solid var(--adm-border); background:#0c131a; flex-shrink:0;">
              <img src="${item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='/images/c4cricket-logo.png'">
            </div>
            <div>
              <strong>${item.name}</strong><br>
              <span style="font-size:0.7rem; color:var(--c4-text-muted);">${item.locality}</span>
            </div>
          </div>
        </td>
        <td>${item.sports.join(', ')}</td>
        <td>${item.city}</td>
        <td><strong>₹${item.hourlyRate}/hr</strong></td>
        <td>⭐ ${item.rating}</td>
        <td>
          <button class="btn-table-action" onclick="adminApp.openEditModal('turf', '${item.id}')"><i class="fa-solid fa-pen"></i> Edit</button>
          <button class="btn-table-action btn-delete" onclick="adminApp.deleteRecord('turfs', '${item.id}')"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `).join('');
  }

  renderShopsTab() {
    const data = this.db.get();
    if (!data) return;

    const tbody = document.getElementById('shopsAdminTbody');
    tbody.innerHTML = data.shops.map(item => `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:48px; height:48px; border-radius:6px; overflow:hidden; border:1px solid var(--adm-border); background:#0c131a; flex-shrink:0;">
              <img src="${item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='/images/c4cricket-logo.png'">
            </div>
            <div>
              <strong>${item.name}</strong><br>
              <span style="font-size:0.7rem; color:var(--c4-text-muted);">${item.locality}</span>
            </div>
          </div>
        </td>
        <td>${item.specialty}</td>
        <td>${item.city}</td>
        <td><span style="color:var(--c4-yellow); font-weight:700;">${item.discount}</span></td>
        <td>⭐ ${item.rating}</td>
        <td>
          <button class="btn-table-action" onclick="adminApp.openEditModal('shop', '${item.id}')"><i class="fa-solid fa-pen"></i> Edit</button>
          <button class="btn-table-action btn-delete" onclick="adminApp.deleteRecord('shops', '${item.id}')"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `).join('');
  }

  renderTournamentsTab() {
    const data = this.db.get();
    if (!data) return;

    const tbody = document.getElementById('tournamentsAdminTbody');
    tbody.innerHTML = data.tournaments.map(item => `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:48px; height:48px; border-radius:6px; overflow:hidden; border:1px solid var(--adm-border); background:#0c131a; flex-shrink:0;">
              <img src="${item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='/images/c4cricket-logo.png'">
            </div>
            <div>
              <strong>${item.name}</strong><br>
              <span style="font-size:0.7rem; color:var(--c4-text-muted);">${item.venue}</span>
            </div>
          </div>
        </td>
        <td><span class="badge-role">${item.format}</span></td>
        <td>${item.dates} (${item.city})</td>
        <td><strong style="color:#2ed573;">${item.prize}</strong></td>
        <td>₹${item.entryFee}</td>
        <td>${item.registeredTeams} / ${item.teamsLimit}</td>
        <td><span class="badge-status-approved">${item.status}</span></td>
        <td>
          <button class="btn-table-action" onclick="adminApp.openEditModal('tournament', '${item.id}')"><i class="fa-solid fa-pen"></i> Edit</button>
          <button class="btn-table-action btn-delete" onclick="adminApp.deleteRecord('tournaments', '${item.id}')"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `).join('');
  }

  renderBookingsTab() {
    const data = this.db.get();
    if (!data) return;

    const tbody = document.getElementById('allBookingsTbody');
    tbody.innerHTML = data.bookings.map(b => `
      <tr>
        <td><code>${b.id}</code></td>
        <td><strong>${b.userName}</strong></td>
        <td>${b.userPhone}</td>
        <td><span class="badge-role">${b.itemType.toUpperCase()}</span> (${b.itemId})</td>
        <td>${b.bookDate}</td>
        <td>${b.bookSlot}</td>
        <td>${b.createdAt || 'Recent'}</td>
        <td><span class="badge-status-approved">Confirmed</span></td>
      </tr>
    `).join('') || `<tr><td colspan="8" style="text-align:center; padding:30px; color:var(--c4-text-muted);">No bookings recorded yet. Try booking a slot from the main site!</td></tr>`;
  }

  renderNewsTab() {
    const data = this.db.get();
    if (!data) return;

    const tbody = document.getElementById('newsAdminTbody');
    tbody.innerHTML = data.news.map(item => `
      <tr>
        <td><strong>${item.title}</strong></td>
        <td><span class="badge-role">${item.category}</span></td>
        <td>${item.time}</td>
        <td>${item.readTime}</td>
        <td>
          <button class="btn-table-action" onclick="adminApp.openEditModal('news', '${item.id}')"><i class="fa-solid fa-pen"></i> Edit</button>
          <button class="btn-table-action btn-delete" onclick="adminApp.deleteRecord('news', '${item.id}')"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `).join('');
  }

  // ==================== APPROVAL WORKFLOW ====================
  approveRegistration(regId) {
    const data = this.db.get();
    const reg = data.registrations.find(r => r.id === regId);
    if (!reg) return;

    reg.status = 'Approved';

    // If it's an academy, turf, shop or tournament, automatically publish into public directory with uploaded image!
    const uploadedImg = reg.image && reg.image.trim() ? reg.image : '';

    if (reg.businessType === 'academy') {
      data.academies.push({
        id: 'acad-' + Date.now(),
        name: reg.businessName,
        coach: reg.contactPerson + ' (Certified Coach)',
        city: reg.city,
        locality: reg.address || `${reg.city} Sports Ground`,
        level: 'Pro Youth',
        rating: 5.0,
        reviews: 1,
        priceMonthly: 2999,
        facilities: reg.facilities && reg.facilities.length ? reg.facilities : ['Turf Pitch', 'Floodlights', 'Coaching Batches'],
        image: uploadedImg || '/images/card_academies_hd.png',
        description: reg.description || 'Newly registered cricket academy verified on C4CRICKET network.',
        phone: reg.phone,
        verified: true
      });
    } else if (reg.businessType === 'turf') {
      data.turfs.push({
        id: 'turf-' + Date.now(),
        name: reg.businessName,
        sports: ['Cricket'],
        city: reg.city,
        locality: reg.address || `${reg.city} Turf`,
        hourlyRate: 1500,
        rating: 5.0,
        reviews: 1,
        facilities: reg.facilities && reg.facilities.length ? reg.facilities : ['Astro Turf', 'Floodlights', 'Stumps & Bats'],
        image: uploadedImg || '/images/card_turfs_hd.png',
        description: reg.description || 'New astro cricket turf open for bookings.',
        phone: reg.phone,
        verified: true
      });
    } else if (reg.businessType === 'shop') {
      data.shops.push({
        id: 'shop-' + Date.now(),
        name: reg.businessName,
        category: 'Bats',
        city: reg.city,
        locality: reg.address || `${reg.city} Main Market`,
        rating: 5.0,
        reviews: 1,
        specialty: 'Season Bats, English Willow & Cricket Gear',
        discount: '15% C4CRICKET Welcome Discount',
        image: uploadedImg || '/images/card_shops_hd.png',
        phone: reg.phone,
        verified: true
      });
    } else if (reg.businessType === 'tournament') {
      data.tournaments.push({
        id: 'tourn-' + Date.now(),
        name: reg.businessName,
        format: 'T20',
        city: reg.city,
        prize: '₹1,00,000 Cash',
        entryFee: 4999,
        dates: 'Upcoming Season',
        teams: 16,
        venue: reg.address || `${reg.city} Stadium`,
        image: uploadedImg || '/uploads/tournament_trophy.png',
        status: 'Open for Registration'
      });
    }

    this.db.save(data);
    this.showToast(`Business "${reg.businessName}" APPROVED and published to live directory!`, 'success');
    this.renderActiveTab();
  }

  rejectRegistration(regId) {
    const reason = prompt('Please enter rejection reason:', 'Incomplete documentation or unverified address');
    if (reason === null) return;

    const data = this.db.get();
    const reg = data.registrations.find(r => r.id === regId);
    if (!reg) return;

    reg.status = 'Rejected';
    reg.rejectionReason = reason;
    this.db.save(data);
    this.showToast(`Business "${reg.businessName}" has been rejected. Notification dispatched.`, 'warning');
    this.renderActiveTab();
  }

  deleteRegistration(regId) {
    if (!confirm('Are you sure you want to permanently delete this registration record?')) return;
    const data = this.db.get();
    data.registrations = data.registrations.filter(r => r.id !== regId);
    this.db.save(data);
    this.showToast('Registration removed.', 'warning');
    this.renderActiveTab();
  }

  // ==================== CRUD OPERATIONS ====================
  deleteRecord(collection, id) {
    if (!confirm('Are you sure you want to delete this record?')) return;
    const data = this.db.get();
    if (data[collection]) {
      data[collection] = data[collection].filter(item => item.id !== id);
      this.db.save(data);
      this.showToast('Record deleted successfully.', 'warning');
      this.renderActiveTab();
    }
  }

  openAddModal(type) {
    document.getElementById('crudItemType').value = type;
    document.getElementById('crudItemId').value = '';
    document.getElementById('adminModalTitle').innerText = `Add New ${type.toUpperCase()}`;
    document.getElementById('adminModalSub').innerText = `Create and publish directly to C4CRICKET directory.`;
    this.renderCrudFields(type, null);
    document.getElementById('adminCrudModal').classList.add('active');
  }

  openEditModal(type, id) {
    const data = this.db.get();
    let collectionKey = type === 'academy' ? 'academies' : type === 'turf' ? 'turfs' : type === 'shop' ? 'shops' : type === 'tournament' ? 'tournaments' : 'news';
    const item = data[collectionKey].find(i => i.id === id);
    if (!item) return;

    document.getElementById('crudItemType').value = type;
    document.getElementById('crudItemId').value = id;
    document.getElementById('adminModalTitle').innerText = `Edit ${item.name || item.title}`;
    document.getElementById('adminModalSub').innerText = `Modify parameters and sync changes.`;
    this.renderCrudFields(type, item);
    document.getElementById('adminCrudModal').classList.add('active');
  }

  renderCrudFields(type, item) {
    const container = document.getElementById('adminCrudFormFields');
    const imagePreview = (url) => `
      <div class="image-uploader-control" style="margin-top: 8px;">
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
          <label class="c4-btn c4-btn-outline-sm" style="cursor:pointer; margin-bottom:0;">
            <i class="fa-solid fa-cloud-arrow-up"></i> Upload From Device
            <input type="file" accept="image/*" style="display:none;" onchange="adminApp.handleImageFileUpload(event)">
          </label>
          <span style="font-size:0.75rem; color:var(--c4-text-muted);">or paste web image URL below</span>
        </div>
        <div style="display:flex; gap:12px; align-items:center;">
          <input type="text" name="image" id="crudImageInput" value="${url}" placeholder="Image URL or uploaded file data" style="flex:1;" oninput="adminApp.previewImage(this.value)">
          <div id="crudImageThumb" style="width:50px; height:50px; border-radius:6px; overflow:hidden; border:1px solid var(--adm-border); background:#090e13; flex-shrink:0;">
            <img src="${url}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80'">
          </div>
        </div>
      </div>
    `;

    if (type === 'academy') {
      container.innerHTML = `
        <div class="form-row-2">
          <div class="form-group">
            <label>Academy Name *</label>
            <input type="text" name="name" value="${item ? item.name : ''}" placeholder="e.g. Mumbai Elite Cricket Academy" required>
          </div>
          <div class="form-group">
            <label>Head Coach *</label>
            <input type="text" name="coach" value="${item ? item.coach : ''}" placeholder="e.g. Pravin Amre (BCCI Level 3)" required>
          </div>
        </div>
        <div class="form-row-2">
          <div class="form-group">
            <label>City *</label>
            <input type="text" name="city" value="${item ? item.city : 'Mumbai'}" required>
          </div>
          <div class="form-group">
            <label>Monthly Fee (₹) *</label>
            <input type="number" name="priceMonthly" value="${item ? item.priceMonthly : 3000}" required>
          </div>
        </div>
        <div class="form-group">
          <label>Full Locality Address</label>
          <input type="text" name="locality" value="${item ? item.locality : ''}" placeholder="Ground Name, Area, City" required>
        </div>
        <div class="form-group">
          <label>Facilities (Comma-separated)</label>
          <input type="text" name="facilities" value="${item ? (Array.isArray(item.facilities) ? item.facilities.join(', ') : item.facilities) : 'Floodlights, Turf Nets, Video Analysis'}">
        </div>
        <div class="form-group">
          <label>Academy Photo / Banner (Upload or URL)</label>
          ${imagePreview(item ? item.image : 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80')}
        </div>
      `;
    } else if (type === 'turf') {
      container.innerHTML = `
        <div class="form-row-2">
          <div class="form-group">
            <label>Turf / Ground Name *</label>
            <input type="text" name="name" value="${item ? item.name : ''}" required>
          </div>
          <div class="form-group">
            <label>Hourly Rate (₹) *</label>
            <input type="number" name="hourlyRate" value="${item ? item.hourlyRate : 1500}" required>
          </div>
        </div>
        <div class="form-row-2">
          <div class="form-group">
            <label>Sports (Comma-separated) *</label>
            <input type="text" name="sports" value="${item ? (Array.isArray(item.sports) ? item.sports.join(', ') : item.sports) : 'Cricket, Football'}" required>
          </div>
          <div class="form-group">
            <label>City *</label>
            <input type="text" name="city" value="${item ? item.city : 'Mumbai'}" required>
          </div>
        </div>
        <div class="form-group">
          <label>Full Address</label>
          <input type="text" name="locality" value="${item ? item.locality : ''}" required>
        </div>
        <div class="form-group">
          <label>Turf Photo (Upload or URL)</label>
          ${imagePreview(item ? item.image : 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&auto=format&fit=crop&q=80')}
        </div>
      `;
    } else if (type === 'shop') {
      container.innerHTML = `
        <div class="form-row-2">
          <div class="form-group">
            <label>Sports Shop Name *</label>
            <input type="text" name="name" value="${item ? item.name : ''}" required>
          </div>
          <div class="form-group">
            <label>Gear Specialty *</label>
            <input type="text" name="specialty" value="${item ? item.specialty : 'Grade 1 English Willow Bats'}" required>
          </div>
        </div>
        <div class="form-row-2">
          <div class="form-group">
            <label>City *</label>
            <input type="text" name="city" value="${item ? item.city : 'Mumbai'}" required>
          </div>
          <div class="form-group">
            <label>Discount Promo *</label>
            <input type="text" name="discount" value="${item ? item.discount : 'Up to 20% Off'}" required>
          </div>
        </div>
        <div class="form-group">
          <label>Locality</label>
          <input type="text" name="locality" value="${item ? item.locality : ''}" required>
        </div>
        <div class="form-group">
          <label>Store Photo (Upload or URL)</label>
          ${imagePreview(item ? item.image : 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&auto=format&fit=crop&q=80')}
        </div>
      `;
    } else if (type === 'tournament') {
      container.innerHTML = `
        <div class="form-group">
          <label>Tournament Name *</label>
          <input type="text" name="name" value="${item ? item.name : ''}" required>
        </div>
        <div class="form-row-2">
          <div class="form-group">
            <label>Format</label>
            <select name="format">
              <option value="T20" ${item && item.format === 'T20' ? 'selected' : ''}>T20 Leather Ball</option>
              <option value="Corporate" ${item && item.format === 'Corporate' ? 'selected' : ''}>Corporate Cup</option>
              <option value="Box Cricket" ${item && item.format === 'Box Cricket' ? 'selected' : ''}>Box Tape Ball</option>
            </select>
          </div>
          <div class="form-group">
            <label>City</label>
            <input type="text" name="city" value="${item ? item.city : 'Mumbai'}" required>
          </div>
        </div>
        <div class="form-row-2">
          <div class="form-group">
            <label>Prize Purse</label>
            <input type="text" name="prize" value="${item ? item.prize : '₹1,00,000 Cash'}" required>
          </div>
          <div class="form-group">
            <label>Entry Fee (₹)</label>
            <input type="number" name="entryFee" value="${item ? item.entryFee : 5000}" required>
          </div>
        </div>
        <div class="form-group">
          <label>Venue Grounds</label>
          <input type="text" name="venue" value="${item ? item.venue : ''}" required>
        </div>
        <div class="form-group">
          <label>Tournament Poster (Upload or URL)</label>
          ${imagePreview(item ? item.image : 'https://images.unsplash.com/photo-1512719355462-e75c613a0c5c?w=600&auto=format&fit=crop&q=80')}
        </div>
      `;
    } else if (type === 'news') {
      container.innerHTML = `
        <div class="form-group">
          <label>Article Title *</label>
          <input type="text" name="title" value="${item ? item.title : ''}" required>
        </div>
        <div class="form-row-2">
          <div class="form-group">
            <label>Category</label>
            <select name="category">
              <option value="International" ${item && item.category === 'International' ? 'selected' : ''}>International</option>
              <option value="IPL" ${item && item.category === 'IPL' ? 'selected' : ''}>IPL</option>
              <option value="Domestic" ${item && item.category === 'Domestic' ? 'selected' : ''}>Domestic</option>
              <option value="Tactical" ${item && item.category === 'Tactical' ? 'selected' : ''}>Tactical</option>
            </select>
          </div>
          <div class="form-group">
            <label>Read Time</label>
            <input type="text" name="readTime" value="${item ? item.readTime : '3 min read'}" required>
          </div>
        </div>
        <div class="form-group">
          <label>Summary</label>
          <textarea name="summary" rows="2" required>${item ? item.summary : ''}</textarea>
        </div>
        <div class="form-group">
          <label>Article Media (Upload or URL)</label>
          ${imagePreview(item ? item.image : 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80')}
        </div>
      `;
    }
  }

  async handleImageFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.showToast('Please select a valid image file (PNG, JPG, WebP)', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target.result;
      const input = document.getElementById('crudImageInput');
      
      // Attempt to save file to server /uploads folder for a permanent clean URL
      try {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: dataUrl })
        });
        if (uploadRes.ok) {
          const resJson = await uploadRes.json();
          if (resJson && resJson.url) {
            if (input) input.value = resJson.url;
            this.previewImage(resJson.url);
            this.showToast('Image uploaded and saved to server successfully!', 'success');
            return;
          }
        }
      } catch (uploadErr) {
        console.warn('Direct server upload fallback:', uploadErr);
      }

      // Fallback to dataUrl
      if (input) input.value = dataUrl;
      this.previewImage(dataUrl);
      this.showToast('Image selected and preview ready!', 'success');
    };
    reader.readAsDataURL(file);
  }

  previewImage(url) {
    const thumb = document.getElementById('crudImageThumb');
    if (thumb) {
      thumb.innerHTML = `<img src="${url}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80'">`;
    }
  }

  closeCrudModal() {
    document.getElementById('adminCrudModal').classList.remove('active');
  }

  handleCrudSubmit(e) {
    e.preventDefault();
    const type = document.getElementById('crudItemType').value;
    const id = document.getElementById('crudItemId').value;
    const form = e.target;
    const formData = new FormData(form);

    const data = this.db.get();
    let collKey = type === 'academy' ? 'academies' : type === 'turf' ? 'turfs' : type === 'shop' ? 'shops' : type === 'tournament' ? 'tournaments' : 'news';

    if (id) {
      // Edit existing
      const existing = data[collKey].find(i => i.id === id);
      if (existing) {
        for (let [k, v] of formData.entries()) {
          if (k === 'facilities') {
            existing[k] = v.split(',').map(s => s.trim());
          } else if (k === 'sports') {
            existing[k] = v.split(',').map(s => s.trim());
          } else if (k === 'priceMonthly' || k === 'hourlyRate' || k === 'entryFee') {
            existing[k] = Number(v);
          } else {
            existing[k] = v;
          }
        }
      }
      this.showToast('Record updated successfully!', 'success');
    } else {
      // Add new
      const newItem = { id: `${type}-${Date.now()}` };
      for (let [k, v] of formData.entries()) {
        if (k === 'facilities') {
          newItem[k] = v.split(',').map(s => s.trim());
        } else if (k === 'sports') {
          newItem[k] = v.split(',').map(s => s.trim());
        } else if (k === 'priceMonthly' || k === 'hourlyRate' || k === 'entryFee') {
          newItem[k] = Number(v);
        } else {
          newItem[k] = v;
        }
      }
      newItem.rating = 5.0;
      newItem.reviews = 1;
      newItem.verified = true;
      if (type === 'tournament') {
        newItem.teamsLimit = 16;
        newItem.registeredTeams = 0;
        newItem.status = 'Open';
        newItem.dates = 'Upcoming';
      }
      data[collKey].unshift(newItem);
      this.showToast(`New ${type} published!`, 'success');
    }

    this.db.save(data);
    this.closeCrudModal();
    this.renderActiveTab();
  }

  exportData() {
    const data = this.db.get();
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", jsonStr);
    dlAnchor.setAttribute("download", `c4cricket_database_backup_${Date.now()}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    this.showToast('C4CRICKET database exported successfully!', 'success');
  }

  showToast(message, type = 'success') {
    const container = document.getElementById('adminToastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'c4-toast';
    toast.style.borderLeftColor = type === 'warning' ? '#ff4757' : '#00b060';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }
}

const adminApp = new AdminApp();
document.addEventListener('DOMContentLoaded', () => {
  adminApp.init();
});
