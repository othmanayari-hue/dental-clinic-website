# Cabinet Dentaire Ayari — API Documentation

**Base URL:** `https://your-domain.com/api`  
**Authentication:** JWT Bearer token or HttpOnly cookie  
**Content-Type:** `application/json`

---

## Response Format

All responses follow a consistent envelope:

```json
// Success
{ "success": true, "data": { ... }, "message": "...", "meta": { "total": 42, "page": 1 } }

// Error
{ "success": false, "error": "Human-readable message", "details": { ... } }
```

---

## Authentication

### POST /api/auth/login

Authenticate an admin account. Returns access token + sets HttpOnly cookies.

**Request:**
```json
{ "email": "admin@ayari-dentiste.tn", "password": "Admin@2024!" }
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJ...",
    "admin": { "id": "clx...", "name": "Dr Mohamed Ayari", "email": "admin@...", "role": "SUPER_ADMIN" }
  },
  "message": "Connexion réussie"
}
```

**Cookies set:**
- `access_token` — HttpOnly, 15 minutes
- `refresh_token` — HttpOnly, path `/api/auth`, 7 days

---

### POST /api/auth/refresh

Rotate refresh token and issue new access token.

**Cookies required:** `refresh_token`

**Response 200:** Same shape as login

---

### POST /api/auth/logout

Invalidate session and clear cookies.

**Response 200:**
```json
{ "success": true, "data": null, "message": "Déconnexion réussie" }
```

---

### GET /api/auth/me

Return the authenticated admin's profile.

**Headers:** `Authorization: Bearer <accessToken>`

**Response 200:**
```json
{
  "success": true,
  "data": { "id": "...", "name": "...", "email": "...", "role": "SUPER_ADMIN", "createdAt": "..." }
}
```

---

## Appointments

### POST /api/appointments

Submit a new appointment request. **Public endpoint.**  
Rate limit: 5 requests/hour per IP.

**Request:**
```json
{
  "patientName": "Sarra Ben Amor",
  "email": "sarra@example.com",
  "phone": "+21612345678",
  "selectedService": "Orthodontie",
  "appointmentDate": "2026-06-15",
  "appointmentTime": "09:00",
  "message": "Je souhaite une consultation initiale"
}
```

**Valid services:** Orthodontie, Implantologie, Blanchiment dentaire, Soins dentaires, Détartrage et nettoyage, Prothèses dentaires, Chirurgie buccale, Consultation générale

**Valid times:** 08:00–11:30 and 14:00–17:30 (30-min slots)

**Response 201:**
```json
{
  "success": true,
  "data": {
    "id": "clx...",
    "status": "PENDING",
    "patientName": "Sarra Ben Amor",
    "selectedService": "Orthodontie",
    "appointmentDate": "2026-06-15T00:00:00.000Z",
    "appointmentTime": "09:00",
    "createdAt": "..."
  },
  "message": "Votre rendez-vous a été enregistré..."
}
```

**Triggers:** Confirmation email to patient + notification email to clinic.

---

### GET /api/appointments

List all appointments. **Admin only.**

**Query params:**
| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Per page (default: 20, max: 100) |
| `status` | string | Filter: PENDING / CONFIRMED / CANCELLED / COMPLETED |
| `search` | string | Search by name, email, or phone |
| `dateFrom` | ISO date | Filter from date |
| `dateTo` | ISO date | Filter to date |

**Response 200:**
```json
{
  "success": true,
  "data": [ { "id": "...", "patientName": "...", "status": "PENDING", ... } ],
  "meta": { "total": 45, "page": 1, "limit": 20, "totalPages": 3, "hasNext": true, "hasPrev": false }
}
```

---

### GET /api/appointments/:id

Get a single appointment. **Admin only.**

---

### PATCH /api/appointments/:id

Update appointment status. **Admin only.**

**Request:**
```json
{ "status": "CONFIRMED" }
```

**Valid statuses:** PENDING, CONFIRMED, CANCELLED, COMPLETED

---

### DELETE /api/appointments/:id

Delete an appointment. **Admin only.**

---

## Contact

### POST /api/contact

Submit a contact form message. **Public.**  
Rate limit: 3 requests/hour per IP.

**Request:**
```json
{
  "fullName": "Mohamed Trabelsi",
  "email": "m.trabelsi@example.com",
  "phone": "+21698765432",
  "subject": "Question sur les tarifs",
  "message": "Bonjour, je souhaite connaître les tarifs pour un traitement orthodontique."
}
```

**Response 201:**
```json
{
  "success": true,
  "data": { "id": "...", "createdAt": "..." },
  "message": "Votre message a été envoyé avec succès..."
}
```

**Triggers:** Notification to clinic + auto-reply to sender.

---

### GET /api/contact

List contact messages. **Admin only.**

**Query params:** `page`, `limit`, `search`, `unread` (boolean)

**Response meta includes:** `unreadCount`

---

### PATCH /api/contact?id=:id

Mark a message as read. **Admin only.**

---

## Analytics

### GET /api/analytics

Full analytics dashboard data. **Admin only.**

**Response 200:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalVisitorsAllTime": 1240,
      "todayVisits": 34,
      "monthlyVisits": 890,
      "visitGrowth": 12,
      "totalAppointments": 156,
      "pendingAppointments": 8,
      "confirmedAppointments": 12,
      "appointmentsThisMonth": 23,
      "bookingGrowth": 15,
      "totalMessages": 67,
      "unreadMessages": 3,
      "conversionRate": 2.58
    },
    "charts": {
      "dailyVisits": [{ "date": "2026-04-24", "totalVisits": 45, "uniqueVisitors": 32, "bookingCount": 2 }],
      "serviceDistribution": [{ "service": "Orthodontie", "count": 42 }],
      "devices": [{ "device": "desktop", "count": 654 }],
      "browsers": [{ "browser": "Chrome", "count": 520 }]
    },
    "recentAppointments": [ ... ]
  }
}
```

---

### GET /api/analytics/realtime

Live activity data. **Admin only.**

**Response 200:**
```json
{
  "success": true,
  "data": {
    "activeNow": 3,
    "lastHourVisits": 28,
    "todayAppointments": 2,
    "todayMessages": 1,
    "recentVisitors": [ { "deviceType": "desktop", "browser": "Chrome", "page": "/", "visitedAt": "..." } ],
    "hourlyActivity": [{ "hour": 9, "count": 12 }],
    "serverTime": "2026-05-24T14:32:00.000Z"
  }
}
```

---

## Admin Dashboard

### GET /api/admin/dashboard

Complete admin dashboard summary. **Admin only.**

**Response 200:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "appointments": { "total": 156, "pending": 8, "confirmed": 12, "cancelled": 4, "today": 2, "thisWeek": 11 },
      "messages": { "total": 67, "unread": 3 },
      "content": { "testimonials": 24, "pendingTestimonials": 2, "galleryImages": 18 }
    },
    "recentAppointments": [ ... ],
    "recentMessages": [ ... ],
    "upcomingAppointments": [ ... ]
  }
}
```

---

## Gallery

### GET /api/admin/gallery

List gallery images. **Public.**

**Query params:** `category`, `page`, `limit`

**Response meta includes:** `categories` array

---

### POST /api/admin/gallery

Add gallery image. **Admin only.**

**Request:**
```json
{
  "imageUrl": "https://res.cloudinary.com/your-cloud/image/upload/v1/...",
  "thumbnailUrl": "https://...",
  "category": "Orthodontie",
  "title": "Alignement orthodontique",
  "altText": "Résultat traitement orthodontique"
}
```

---

### PATCH /api/admin/gallery/:id

Update image metadata. **Admin only.**

---

### DELETE /api/admin/gallery/:id

Delete a gallery image. **Admin only.**

---

## Testimonials

### GET /api/admin/testimonials

List testimonials. **Public** (returns only approved). **Admin** sees all.

---

### POST /api/admin/testimonials

Submit a testimonial. **Public.** Requires admin approval before publishing.

**Request:**
```json
{
  "patientName": "Amira Mansour",
  "rating": 5,
  "review": "Excellent traitement, je recommande vivement!",
  "service": "Orthodontie"
}
```

---

### PATCH /api/admin/testimonials/:id

Moderate a testimonial (approve/update). **Admin only.**

**Request:**
```json
{ "approved": true }
```

---

### DELETE /api/admin/testimonials/:id

Delete a testimonial. **Admin only.**

---

## Visitor Tracking

### POST /api/visitors

Track a page visit (called client-side). **Public.**

**Request:**
```json
{ "page": "/services" }
```

---

## Error Codes

| Status | Meaning |
|--------|---------|
| 400 | Bad Request — validation failed |
| 401 | Unauthorized — missing/invalid token |
| 403 | Forbidden — insufficient permissions |
| 404 | Not Found |
| 409 | Conflict — duplicate booking |
| 429 | Too Many Requests — rate limited |
| 500 | Internal Server Error |

---

## Setup & Deployment

### Local Development

```bash
# 1. Copy env file
cp ../.env.example dental-clinic/.env.local
# Fill in your DATABASE_URL and other values

# 2. Install dependencies
cd dental-clinic && npm install

# 3. Generate Prisma client
npm run db:generate

# 4. Push schema to database
npm run db:push

# 5. Seed initial data (admin account + sample testimonials)
npx prisma db seed

# 6. Start development server
npm run dev
```

### Database Providers

**Supabase (recommended):**
1. Create project at supabase.com
2. Go to Settings > Database > Connection String
3. Copy the "URI" (use pooler URL for `DATABASE_URL`, direct for `DIRECT_URL`)

**NeonDB:**
1. Create project at neon.tech
2. Copy connection string from dashboard
3. Use the same URL for both `DATABASE_URL` and `DIRECT_URL`

### Production Deployment (Vercel)

```bash
# 1. Deploy to Vercel
vercel deploy

# 2. Set environment variables in Vercel dashboard
# (all variables from .env.example)

# 3. Run migrations
npx prisma migrate deploy

# 4. Seed production database
npx prisma db seed
```

### Default Admin Credentials

After seeding:
- **Email:** `admin@ayari-dentiste.tn`
- **Password:** `Admin@2024!`

**Change the password immediately after first login.**

---

## Architecture Notes

- **Rate limiting** is in-memory (per instance). For multi-instance deployments, use Redis via `@upstash/ratelimit`.
- **Refresh token rotation** — each use invalidates the old token and issues a new one.
- **Visitor tracking** never blocks the response — errors are silently swallowed.
- **Email sending** is async (fire-and-forget) — appointment creation succeeds even if email fails.
- **SQL injection prevention** — all queries go through Prisma ORM with parameterized queries.
