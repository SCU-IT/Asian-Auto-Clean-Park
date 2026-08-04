# Asian Auto Clean Park Backend

Express + MongoDB backend using an MVC folder structure.

## Run

```powershell
cd backend
npm install
npm run dev
```

API base URL:

```text
http://localhost:5000/api
```

## Main Endpoints

- `GET /api/health`
- `GET /api/services`
- `POST /api/services`
- `GET /api/products`
- `POST /api/products`
- `POST /api/bookings`
- `GET /api/bookings`
- `PATCH /api/bookings/:id/status`
- `POST /api/contacts`
- `GET /api/contacts`

Keep real credentials in `.env`. Do not commit `.env`.
