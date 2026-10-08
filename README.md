# REUNITE — Disaster-Affected Family Reunification Platform

A professional student & research humanitarian web application designed to help families locate and safely reunite with relatives separated during sudden emergencies and disasters such as floods, cyclones, earthquakes, and landslides.

The project features a decoupled full-stack architecture:
* **Frontend:** React + Vite, Single Page Application deployed to **Netlify**
* **Backend:** Node.js + Express REST API deployed to **Render**

---

## 🌟 Project Overview

In chaotic disaster scenarios, displaced civilians and lost family members—especially children and seniors—are scattered across relief camps, medical triage wards, and transit shelters.

**REUNITE** provides a centralized, privacy-conscious protocol:
* **Zero Aadhaar / National ID Requirement**: Eliminates identity theft and data exposure risks for displaced populations.
* **Standardized Person IDs**: Every individual is assigned an auto-incrementing identifier such as `PERSON-0001`.
* **Household Grouping**: Relatives are linked via a shared `Family ID` (e.g. `FAM1001`).
* **Multi-Agency Verification**: NDRF/SDRF rescue teams, hospital physicians, and camp magistrates certify status and location.
* **Safe Handover Tracking**: Handover checkpoints and chronological audit logs ensure safe physical reunification.
* **Resilient Offline Fallback**: Works with the live Node.js REST API with graceful browser caching fallback.

---

## 🔄 Core Workflow

```
REGISTER PERSON (Intake / Shelter)
       ↓
GENERATE PERSON ID (e.g. PERSON-0004)
       ↓
REPORT MISSING (Family Alert REPORT-0001)
       ↓
RESCUE TEAM FINDS PERSON (Field Evacuation)
       ↓
VERIFY PERSON (Identity Certified by Officer)
       ↓
UPDATE STATUS + LOCATION (Relief Camp / Hospital)
       ↓
FAMILY SEARCHES PERSON (Search by ID)
       ↓
SAFE REUNIFICATION (Handover Closed)
```

---

## 📁 Project Structure

```
disaster-reunification/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── personController.js   # Person CRUD, status updates & reunification
│   │   │   └── reportController.js   # Missing reports creation & retrieval
│   │   ├── data/
│   │   │   └── database.js           # In-memory data store with demo records
│   │   ├── routes/
│   │   │   ├── personRoutes.js       # /api/persons routes
│   │   │   └── reportRoutes.js       # /api/reports routes
│   │   └── server.js                 # Express server listening on 0.0.0.0
│   ├── .env                          # Local backend environment variables
│   ├── .env.example                  # Backend environment template
│   └── package.json                  # Backend dependencies (express, cors, dotenv)
│
├── frontend/
│   ├── src/
│   │   ├── assets/                   # Images and static assets
│   │   ├── components/               # Nav, Footer, StatusBadge, Modals
│   │   ├── context/
│   │   │   └── DisasterContext.jsx   # State management & REST sync
│   │   ├── pages/                    # Home, Search, Register, Report, Rescue, Details
│   │   ├── services/
│   │   │   ├── api.js                # Fetch-based REST API service client
│   │   │   └── storageService.js     # Cache / fallback persistence service
│   │   ├── utils/                    # Status formatting & color helpers
│   │   ├── App.jsx                   # Application router
│   │   ├── main.jsx                  # React entry point
│   │   └── index.css                 # Styling system
│   ├── .env                          # Local frontend environment variables
│   ├── .env.example                  # Frontend environment template
│   ├── index.html                    # HTML entry point
│   ├── vite.config.js                # Vite build configuration
│   └── package.json                  # Frontend dependencies
│
├── .gitignore                        # Global ignore rules (node_modules, .env, dist)
└── README.md                         # Project documentation
```

---

## 💻 Local Setup Instructions

### Prerequisites
* **Node.js**: v18.x or higher
* **npm**: v9.x or higher

---

### 1. Run the Backend (Render API)

```bash
cd backend
npm install
npm run dev
```

The backend server will start on:
* **Base URL:** `http://localhost:5000`
* **Health Check:** `http://localhost:5000/api/health`
* **Host Binding:** `0.0.0.0` (Render production compatible)

---

### 2. Run the Frontend (Netlify SPA)

In a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

The frontend application will start on:
* **URL:** `http://localhost:5173`
* Communicates directly with the backend at `http://localhost:5000/api` (configured in `frontend/.env`).

---

## 📡 REST API Endpoints Table

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check endpoint returning service status |
| `GET` | `/api/persons` | Retrieve all registered persons (supports query params: `status`, `familyId`, `search`) |
| `GET` | `/api/persons/:id` | Fetch a single person by unique Person ID (e.g., `PERSON-0001`) |
| `POST` | `/api/persons` | Register a new person and auto-generate unique ID |
| `PUT` | `/api/persons/:id` | Update general profile details for a person |
| `PUT` | `/api/persons/:id/status` | Update operational status, location, and field verification info |
| `PUT` | `/api/persons/:id/reunite` | Mark person as safely `REUNITED` and record reunion timestamp |
| `DELETE`| `/api/persons/:id` | Remove a person record |
| `GET` | `/api/reports` | Retrieve all missing person reports |
| `GET` | `/api/reports/:id` | Fetch a specific missing report by Report ID (e.g., `REPORT-0001`) |
| `POST` | `/api/reports` | Submit a missing person report; links with existing person or creates pending profile |

---

## 🌍 Environment Variables Table

### Backend (`backend/.env`)

| Variable | Default (Local) | Render Production | Description |
|---|---|---|---|
| `PORT` | `5000` | Injected by Render (e.g. `10000`) | Server listener port |
| `FRONTEND_URL` | `http://localhost:5173` | `https://your-site.netlify.app` | Allowed CORS origin |
| `NODE_ENV` | `development` | `production` | Environment mode |

### Frontend (`frontend/.env`)

| Variable | Default (Local) | Netlify Production | Description |
|---|---|---|---|
| `VITE_API_URL` | `http://localhost:5000/api` | `https://your-backend.onrender.com/api` | Base URL of backend REST API |

---

## 🚀 Deployment Guide

### A. Deploy Backend to Render

1. Push your repository to **GitHub** or **GitLab**.
2. Sign in to [Render Dashboard](https://dashboard.render.com/) and click **New +** → **Web Service**.
3. Connect your repository.
4. Configure the service settings:
   * **Name:** `reunite-backend`
   * **Root Directory:** `backend`
   * **Environment:** `Node`
   * **Build Command:** `npm install`
   * **Start Command:** `node src/server.js`
   * **Instance Type:** Free
5. In **Environment Variables**, add:
   * `FRONTEND_URL`: `https://your-site.netlify.app` (or add once Netlify is deployed)
   * `NODE_ENV`: `production`
6. Click **Create Web Service**.
7. Once deployed, copy your Render service URL:
   `https://reunite-backend-xxxx.onrender.com`
   Test the endpoint: `https://reunite-backend-xxxx.onrender.com/api/health`

> **Note on Render Host Binding:**
> The server in `backend/src/server.js` binds to `0.0.0.0:PORT` to allow Render's port forwarder to route incoming traffic correctly.

---

### B. Deploy Frontend to Netlify

1. Sign in to [Netlify](https://app.netlify.com/) and click **Add new site** → **Import an existing project**.
2. Link your Git repository.
3. Configure the build settings:
   * **Base directory:** `frontend`
   * **Build command:** `npm run build`
   * **Publish directory:** `frontend/dist`
4. Under **Environment variables**, click **Add a variable**:
   * **Key:** `VITE_API_URL`
   * **Value:** `https://reunite-backend-xxxx.onrender.com/api` (your Render service URL)
5. Click **Deploy Site**.
6. (Optional) In `backend/.env` on Render, ensure `FRONTEND_URL` matches your deployed Netlify domain (e.g., `https://reunite-platform.netlify.app`).

---

## 🏷️ Person Status System

| Status | Color | Description |
|---|---|---|
| **MISSING** | Red (`#dc2626`) | Active missing report logged; ground/boat search teams alerted. |
| **LOCATED** | Orange (`#ea580c`) | Located by search teams; in transit or undergoing triage. |
| **SAFE** | Green (`#16a34a`) | Verified uninjured and sheltered in an authorized relief facility. |
| **HOSPITALIZED** | Crimson (`#e11d48`) | Admitted to emergency ward for medical stabilization. |
| **AT_SHELTER** | Blue (`#2563eb`) | Accommodated at an official emergency relief camp with provisions. |
| **TRANSFERRED** | Purple (`#7c3aed`) | Transferred to secondary specialty hospital or regional safe zone. |
| **REUNITED** | Teal (`#0d9488`) | Physical handover confirmed with registered family liaison. |

---

## 🧪 Demo Test Data

Pre-loaded fictional records available out of the box:

* **Arun Kumar** (`PERSON-0001`, Family `FAM1001`) — Status: `SAFE` at *Relief Camp A* (Verified)
* **Priya Kumar** (`PERSON-0002`, Family `FAM1001`) — Status: `HOSPITALIZED` at *City Hospital* (Verified)
* **Kumar** (`PERSON-0003`, Family `FAM1001`) — Status: `MISSING` at *Main Road* (Pending Verification)
* **Ananya Sharma** (`PERSON-0004`, Family `FAM1002`) — Status: `LOCATED` at *Transit Rescue Post #4* (Verified)
* **Rajesh Sharma** (`PERSON-0005`, Family `FAM1002`) — Status: `AT_SHELTER` at *Relief Camp B* (Verified)
* **Meera Nair** (`PERSON-0006`, Family `FAM1003`) — Status: `REUNITED` with family (Verified)
* **Suresh Nair** (`PERSON-0007`, Family `FAM1003`) — Status: `TRANSFERRED` at *District General Hospital Ward 2* (Verified)

Pre-loaded missing reports:
* `REPORT-0001` (Kumar / `PERSON-0003`)
* `REPORT-0002` (Deepak Verma)

---

## 🔒 Safety & Privacy Principles

1. **No Aadhaar / Government ID Collection:** Strictly uses generated reference IDs (`PERSON-XXXX`).
2. **Authorized Verification Checkpoints:** Only accredited rescue dispatchers and medical staff certify status changes.
3. **Audited Timeline:** All state transitions preserve the actor's credential and timestamp.
4. **Controlled Contact Access:** Direct contact requests require verification through authorized camp desks.
