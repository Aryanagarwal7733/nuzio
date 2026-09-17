import React from "react";
import { useAuth } from "../context/AuthContext";
import { useAudioPlayer } from "../context/AudioPlayerContext";
import { Play, Sparkles, User, Settings, LogIn, LogOut, Radio, Volume2 } from "lucide-react";

export const Navbar = () => {
  const { user, logout, setIsAuthModalOpen, setIsOnboardingModalOpen, setIsCustomModalOpen, demoLogin } = useAuth();
  const { selectedVoice, changeVoice } = useAudioPlayer();

  return (
    <header className="navbar">
      <div className="brand-logo">
        <div className="logo-badge">
          <Radio size={20} />
        </div>
        <span>Nuzio<span className="brand-text-ai">.AI</span></span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '12px' }}>
          <span className="radar-pulse"></span>
          <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>LIVE AUDIO</span>
        </div>
      </div>

      <div className="nav-actions">
        {/* Voice Narrator Indicator */}
        <div className="badge-pill" style={{ cursor: 'pointer' }} onClick={() => setIsOnboardingModalOpen(true)} title="Click to customize AI Voice">
          <Volume2 size={14} />
          <span>{selectedVoice}</span>
        </div>

        {/* Custom AI Briefing Generator Button */}
        <button 
          className="btn btn-secondary" 
          onClick={() => setIsCustomModalOpen(true)}
          style={{ gap: '6px', background: 'rgba(99, 102, 241, 0.15)', borderColor: 'rgba(99, 102, 241, 0.3)' }}
        >
          <Sparkles size={16} color="#8b5cf6" />
          <span>Generate Custom AI Brief</span>
        </button>

        {/* User Auth / Preferences */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              className="btn btn-secondary" 
              onClick={() => setIsOnboardingModalOpen(true)}
              style={{ gap: '6px', padding: '8px 14px' }}
            >
              <Settings size={16} />
              <span>{user.profession || "Preferences"}</span>
            </button>

            <button 
              className="btn btn-ghost btn-icon" 
              onClick={logout} 
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              className="btn btn-secondary" 
              onClick={demoLogin}
              style={{ background: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#10b981' }}
            >
              ⚡ Express Demo Login
            </button>

            <button 
              className="btn btn-primary" 
              onClick={() => setIsAuthModalOpen(true)}
            >
              <LogIn size={16} />
              <span>Sign In</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
