import React, { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AudioPlayerProvider, useAudioPlayer } from "./context/AudioPlayerContext";
import { Navbar } from "./components/Navbar";
import { HeroPlayer } from "./components/HeroPlayer";
import { TranscriptView } from "./components/TranscriptView";
import { NewsFeed } from "./components/NewsFeed";
import { LoginModal } from "./components/LoginModal";
import { OnboardingModal } from "./components/OnboardingModal";
import { CustomBriefingModal } from "./components/CustomBriefingModal";
import { api } from "./services/api";
import { Headphones, Sparkles, ShieldCheck, Zap } from "lucide-react";

const MainLayout = () => {
  const { user } = useAuth();
  const { playBriefing } = useAudioPlayer();
  const [briefingData, setBriefingData] = useState(null);

  const fetchDailyBriefing = async () => {
    try {
      const data = await api.getBriefing({
        profession: user?.profession || "Software Engineer",
        voice: user?.voicePref || "Executive Broadcast",
        duration: user?.durationPref || 15
      });
      setBriefingData(data);
      if (data && data.stories && data.stories.length > 0) {
        // Auto load initial briefing story into audio player
        playBriefing(data);
      }
    } catch (err) {
      console.error("Failed to load daily briefing:", err);
    }
  };

  useEffect(() => {
    fetchDailyBriefing();
  }, [user?.profession, user?.voicePref, user?.durationPref]);

  return (
    <div className="app-container">
      <Navbar />

      {/* Zero Screen Time Value Proposition Bar */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          padding: '12px 20px',
          background: 'rgba(99, 102, 241, 0.08)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: '12px',
          marginBottom: '24px',
          fontSize: '0.86rem',
          color: '#cbd5e1'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Headphones size={18} color="#6366f1" />
          <span style={{ fontWeight: 700, color: 'white' }}>Zero Screen-Time AI Briefings</span>
          <span style={{ color: '#64748b' }}>— Hands-free personalized news for commuting, exercise, and focus work.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontWeight: 600 }}>
            <Zap size={14} />
            <span>AI Synthesized</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#06b6d4', fontWeight: 600 }}>
            <ShieldCheck size={14} />
            <span>Curated Feeds</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Player + Transcript */}
      <div className="main-grid">
        <HeroPlayer briefingData={briefingData} onTriggerDailyBriefing={fetchDailyBriefing} />
        <TranscriptView />
      </div>

      {/* Feed Section */}
      <NewsFeed />

      {/* Modals */}
      <LoginModal />
      <OnboardingModal />
      <CustomBriefingModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AudioPlayerProvider>
        <MainLayout />
      </AudioPlayerProvider>
    </AuthProvider>
  );
}
