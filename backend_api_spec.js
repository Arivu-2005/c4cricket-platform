/**
 * C4CRICKET - BACKEND API & DATABASE INTEGRATION ARCHITECTURE SPECIFICATION
 * REST API Endpoints, JSON Data Schema, Middleware, and Database Entities
 */

const BACKEND_SPECIFICATION = {
  version: "1.0.0",
  architecture: "RESTful JSON Microservices Architecture",
  databaseEngine: "PostgreSQL 16 + Redis (Caching & Live Telemetry pub/sub)",
  telemetryStream: "WebSocket / SSE (Server-Sent Events) for ball-by-ball updates",
  auth: "JWT with Refresh Tokens + Role-Based Access Control (RBAC)",

  entities: {
    User: {
      id: "UUID PRIMARY KEY",
      name: "VARCHAR(100)",
      email: "VARCHAR(150) UNIQUE",
      password_hash: "VARCHAR(255)",
      role: "ENUM('player', 'academy_owner', 'turf_owner', 'shop_owner', 'admin')",
      phone: "VARCHAR(20)",
      city: "VARCHAR(50)",
      created_at: "TIMESTAMPTZ"
    },
    BusinessRegistration: {
      id: "UUID PRIMARY KEY",
      user_id: "UUID REFERENCES User(id)",
      business_name: "VARCHAR(150)",
      business_type: "ENUM('academy', 'turf', 'shop', 'tournament')",
      contact_person: "VARCHAR(100)",
      phone: "VARCHAR(20)",
      email: "VARCHAR(150)",
      city: "VARCHAR(50)",
      address: "TEXT",
      plan: "VARCHAR(50)",
      facilities: "TEXT[]",
      status: "ENUM('Pending', 'Approved', 'Rejected')",
      rejection_reason: "TEXT",
      created_at: "TIMESTAMPTZ"
    },
    Academy: {
      id: "UUID PRIMARY KEY",
      business_id: "UUID REFERENCES BusinessRegistration(id)",
      name: "VARCHAR(150)",
      coach: "VARCHAR(100)",
      city: "VARCHAR(50)",
      locality: "TEXT",
      level: "ENUM('Grassroots', 'Pro Youth', 'Elite')",
      price_monthly: "DECIMAL(10,2)",
      rating: "DECIMAL(3,2)",
      facilities: "TEXT[]",
      phone: "VARCHAR(20)",
      is_verified: "BOOLEAN DEFAULT true"
    },
    Turf: {
      id: "UUID PRIMARY KEY",
      business_id: "UUID REFERENCES BusinessRegistration(id)",
      name: "VARCHAR(150)",
      sports: "VARCHAR(50)[]",
      city: "VARCHAR(50)",
      locality: "TEXT",
      hourly_rate: "DECIMAL(10,2)",
      facilities: "TEXT[]",
      rating: "DECIMAL(3,2)",
      phone: "VARCHAR(20)",
      is_verified: "BOOLEAN DEFAULT true"
    },
    Booking: {
      id: "UUID PRIMARY KEY",
      user_id: "UUID REFERENCES User(id)",
      item_type: "ENUM('turf', 'academy', 'tournament')",
      item_id: "UUID",
      user_name: "VARCHAR(100)",
      user_phone: "VARCHAR(20)",
      book_date: "DATE",
      book_slot: "VARCHAR(50)",
      notes: "TEXT",
      payment_status: "ENUM('Paid', 'Pending_At_Venue')",
      status: "ENUM('Confirmed', 'Cancelled', 'Completed')",
      created_at: "TIMESTAMPTZ"
    },
    MatchTelemetry: {
      id: "UUID PRIMARY KEY",
      series: "VARCHAR(100)",
      team_home: "VARCHAR(100)",
      team_away: "VARCHAR(100)",
      score_home: "VARCHAR(30)",
      score_away: "VARCHAR(30)",
      status: "ENUM('Live', 'Upcoming', 'Completed')",
      ball_by_ball: "JSONB",
      batter_stats: "JSONB",
      bowler_stats: "JSONB"
    }
  },

  apiEndpoints: [
    { method: "POST", path: "/api/v1/auth/register", description: "Register player or merchant" },
    { method: "POST", path: "/api/v1/auth/login", description: "Sign in and generate JWT tokens" },
    { method: "GET",  path: "/api/v1/academies", description: "Query academies with filters (city, level)" },
    { method: "GET",  path: "/api/v1/turfs", description: "Query turfs with filters (sport, city)" },
    { method: "GET",  path: "/api/v1/shops", description: "Query sports stores & verified discount vouchers" },
    { method: "GET",  path: "/api/v1/tournaments", description: "List tournaments and team slots" },
    { method: "POST", path: "/api/v1/businesses/register", description: "Submit business listing application" },
    { method: "GET",  path: "/api/v1/admin/businesses/pending", description: "Admin fetch pending approvals" },
    { method: "PATCH",path: "/api/v1/admin/businesses/:id/status", description: "Approve or reject listing" },
    { method: "POST", path: "/api/v1/bookings", description: "Reserve turf slot, academy seat or tournament entry" },
    { method: "GET",  path: "/api/v1/telemetry/live-scores", description: "Get active match scorecard and live ball telemetry" }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = BACKEND_SPECIFICATION;
}
