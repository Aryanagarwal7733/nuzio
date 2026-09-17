# 🎧 Nuzio AI — Zero Screen-Time Personalized Audio News Briefings

> **AI-Powered Multilingual Audio News Tailored to Your Profession & Interests.**  
> *Stay informed effortlessly while commuting, exercising, or focusing on high-value work.*

![Nuzio AI Banner](https://img.shields.io/badge/Nuzio%20AI-Audio%20First-6366f1?style=for-the-badge)
![React](https://img.shields.io/badge/Frontend-React%20%7C%20Vite-61DAFB?style=for-the-badge)
![Express](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-10b981?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)

---

## 🌟 Overview

**Nuzio AI** is a state-of-the-art full-stack audio-first news platform designed around a **"Zero Screen Time"** philosophy. Traditional news apps demand constant screen gaze and scrolling; Nuzio AI transforms raw text feeds into personalized, highly structured audio briefings narrated by customizable AI voice profiles.

Whether you are a **Software Engineer**, **Founder**, **Investor**, **Healthcare Professional**, or **Marketer**, Nuzio AI curates and synthesizes daily 5-minute, 15-minute, or 30-minute digests tailored specifically to your domain.

---

## ✨ Key Features & Screens

### 1. 🔑 Authentication & Express Demo Login
- **Dark Glassmorphism UI**: High-contrast, modern aesthetic with smooth micro-animations.
- **⚡ 1-Click Express Demo Login**: Instantly experience the app pre-authenticated as **Alex Vance (Software Engineer)** without manually typing credentials.
- **JWT Authentication**: Full registration and sign-in API integration.

### 2. 🎯 Personalized Onboarding Preferences
- **Profession Tuning**: Software Engineer, Founder & Executive, Investor & Finance, Healthcare & Bio, Marketer, General.
- **Target Briefing Length**: 5 Min Quick Catchup, 15 Min Deep Dive, 30 Min Master Briefing.
- **AI Voice Narrators**: Select from 4 voice profiles:
  - *Executive Broadcast* (Authoritative & Crisp)
  - *Calm & Focused* (Soothing & Measured)
  - *Energetic Tech* (Upbeat & Dynamic)
  - *Conversational Duo* (Engaging Dialogue)
- **Topic Selection**: Tech & AI, Markets & Finance, AI & Future, World News, Healthcare, VC, and Crypto.

### 3. 🎛️ Hero Audio Player & Visualizer
- **Dynamic 18-Bar Waveform Visualizer**: Animates in real-time synced to actual audio playback frequency and status.
- **Full Transport Controls**: Play, Pause, Rewind 15s, Fast-Forward 15s, Scrubber timeline, Volume, and Mute.
- **Speed Multipliers**: Seamlessly toggle between `0.8x`, `1.0x`, `1.25x`, `1.5x`, and `2.0x` speeds.
- **Master Briefing Trigger**: *"Play Today's 15-Min Briefing"* synthesizes a continuous stream of relevant news stories into one audio session.

### 4. 📝 Interactive Live Synced Transcript
- **Sentence-by-Sentence Highlight**: Automatically highlights the active line as the narrator speaks.
- **Click-to-Seek Jump**: Click any transcript line to jump audio playback directly to that exact moment.
- **Live Search Filter**: Search transcript lines in real-time.

### 5. 📰 Categorized News Feed & AI Algorithm Tuning
- Filter stories by category (*Tech & AI, Markets & Finance, AI & Future, World News, Healthcare*).
- Like/Dislike feedback buttons to tune the AI recommendation engine.
- Instant bookmarking and estimated listening duration badges.

### 6. 🪄 Custom AI Audio Briefing Generator
- Prompt-based on-demand audio briefing generator (e.g. *"Summarize latest semiconductor supply chain developments in 3 minutes"*).

---

## 🏗️ Tech Stack

### **Frontend (`/client`)**
- **Framework**: React 18 + Vite
- **Styling**: Vanilla CSS with custom HSL design tokens, glassmorphic backdrop filters, neon glowing borders, and keyframe animations.
- **Icons**: Lucide-React
- **Audio Engine**: Web Audio API & HTML5 Speech Synthesis Engine

### **Backend (`/server`)**
- **Runtime**: Node.js + Express
- **Auth**: JSON Web Tokens (`jsonwebtoken`)
- **API Architecture**: RESTful endpoints with CORS & JSON body parsing
- **Data Engine**: Curated mock dataset with sentence timestamp boundaries and narrator profiles

---

## 📁 Repository Structure

```
nuzio-ai/
├── README.md            # Project Documentation
├── client/              # React + Vite Frontend
│   ├── public/          # Static assets & favicons
│   ├── src/
│   │   ├── components/  # Navbar, HeroPlayer, TranscriptView, NewsFeed, Modals
│   │   ├── context/     # AuthContext, AudioPlayerContext
│   │   ├── services/    # api.js (Express API Client)
│   │   ├── styles/      # index.css (Dark Glassmorphism Design System)
│   │   ├── App.jsx      # Main Application Layout
│   │   └── main.jsx     # DOM Entry Point
│   ├── package.json
│   └── vite.config.js   # Vite configuration with /api proxy
└── server/              # Express Backend API
    ├── src/
    │   ├── data/        # newsData.js (Curated stories & transcripts)
    │   ├── routes/      # auth.js & news.js
    │   └── index.js     # Express server entry point (Port 5000)
    └── package.json
```

---

## ⚡ Quick Start & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Aryanagarwal7733/nuzio.git
cd nuzio
```

### 2. Start Backend Server
```bash
cd server
npm install
npm run dev
```
*The Express backend will start at `http://localhost:5000`.*

### 3. Start Frontend Client (in a separate terminal)
```bash
cd client
npm install
npm run dev
```
*The Vite frontend will open at `http://localhost:5173`.*

---

## 🔗 Backend API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status check |
| `POST` | `/api/auth/login` | Authenticate user credentials |
| `POST` | `/api/auth/demo-login` | 1-Click Express Demo Login |
| `POST` | `/api/auth/register` | Register new user account |
| `GET` | `/api/auth/me` | Fetch authenticated user profile |
| `PUT` | `/api/auth/preferences` | Update profession, duration & narrator voice |
| `GET` | `/api/news/briefing` | Fetch daily personalized AI audio briefing |
| `GET` | `/api/news/feed` | Query news feed with category & search filters |
| `POST` | `/api/news/custom-briefing` | Generate on-demand custom topic audio briefing |
| `POST` | `/api/news/bookmark` | Toggle story bookmarking |
| `POST` | `/api/news/feedback` | Submit Like / Dislike algorithm feedback |

---

## 👤 Author

**Aryan Agarwal**
- GitHub: [@Aryanagarwal7733](https://github.com/Aryanagarwal7733)
- Profile: [@aryanagarwal610](https://github.com/aryanagarwal610)

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
