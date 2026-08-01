# Asian Auto Clean Park Admin Dashboard

This version includes:

- Responsive administrator login
- Admin username: `admin`
- Admin password: `admin123`
- Session-based logout
- Redesigned blue statistics cards matching the customer website colours
- Existing sidebar/navigation design retained
- Responsive dashboard, tables, filters, calendar and modals

## Folder location

Keep every file inside the existing `admin_dashboard` folder.

```text
admin_dashboard/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── AdminDashboard.jsx
    ├── admin-dashboard.css
    └── main.jsx
```

## Run

```powershell
cd "C:\Users\Sathin\OneDrive\Documents\SLIIT\Agile Project Management\Asian Auto Clean Park - Code\Asian-Auto-Clean-Park\admin_dashboard"
npm install
npm run dev
```

Open:

```text
http://localhost:5174
```

The Vite configuration continues to use the parent project's existing `public` folder.

## Prototype security note

The requested username and password are currently stored in frontend JavaScript. This is suitable only for the current prototype. Move authentication to the Node.js backend and store a hashed password before production deployment.
