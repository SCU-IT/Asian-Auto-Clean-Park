# DriveCare React UI

## Requirements
- Node.js 20, 22, or 24 LTS
- npm

## Windows PowerShell

```powershell
cd C:\path\to\drivecare-react-updated-clean
npm cache verify
npm install
npm run dev
```

Open the local URL printed by Vite, normally http://localhost:5173.

## If npm reports "Exit handler never called"

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm cache verify
npm install --no-audit --no-fund
npm run dev
```

The archive intentionally excludes `node_modules` and `dist`. Dependencies are installed locally for the user's operating system.


## Latest UI updates

- White responsive navigation bar
- No dropdown arrows beside Services or Shop
- “Book an Appointment” vehicle-service call-to-action in the navbar
- Mobile menu button appears only at 960px and below
- Hero text remains fixed while only the admin-controlled image changes
