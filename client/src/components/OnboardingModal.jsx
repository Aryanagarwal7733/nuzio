import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useAudioPlayer } from "../context/AudioPlayerContext";
import { X, Check, Volume2, Briefcase, Clock, Sliders } from "lucide-react";

export const OnboardingModal = () => {
  const { isOnboardingModalOpen, setIsOnboardingModalOpen, user, updatePreferences } = useAuth();
  const { changeVoice } = useAudioPlayer();

  const [profession, setProfession] = useState(user?.profession || "Software Engineer");
  const [durationPref, setDurationPref] = useState(user?.durationPref || 15);
  const [voicePref, setVoicePref] = useState(user?.voicePref || "Executive Broadcast");
  const [selectedTopics, setSelectedTopics] = useState(user?.topics || ["Tech & AI", "Markets & Finance"]);
  const [loading, setLoading] = useState(false);

  if (!isOnboardingModalOpen) return null;

  const professions = [
    "Software Engineer",
    "Founder & Executive",
    "Investor & Finance",
    "Healthcare & Bio",
    "Marketer & Creative",
    "General Knowledge Enthusiast"
  ];

  const durations = [
    { label: "5 Min Quick Catchup", value: 5 },
    { label: "15 Min Deep Dive", value: 15 },
    { label: "30 Min Master Briefing", value: 30 }
  ];

  const voices = [
    { name: "Executive Broadcast", desc: "Authoritative & Crisp" },
    { name: "Calm & Focused", desc: "Soothing & Measured" },
    { name: "Energetic Tech", desc: "Upbeat & Dynamic" },
    { name: "Conversational Duo", desc: "Engaging Dialogue" }
  ];

  const topicsList = ["Tech & AI", "Markets & Finance", "AI & Future", "World News", "Healthcare", "Startups & VC", "Crypto & Web3"];

  const toggleTopic = (topic) => {
    setSelectedTopics(prev => 
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updatePreferences({
        profession,
        durationPref,
        voicePref,
        topics: selectedTopics
      });
      changeVoice(voicePref);
      setIsOnboardingModalOpen(false);
    } catch (err) {
      console.error("Failed to update preferences:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsOnboardingModalOpen(false)}>
      <div className="modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white' }}>
              Personalize Your Nuzio AI Experience
            </h2>
            <p style={{ fontSize: '0.86rem', color: '#94a3b8' }}>
              Configure your AI audio news algorithm for zero-screen time listening.
            </p>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={() => setIsOnboardingModalOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Profession Selection */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Briefcase size={16} color="#6366f1" />
            <span>Select Your Profession</span>
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {professions.map(p => (
              <button
                key={p}
                type="button"
                onClick={() => setProfession(p)}
                className="btn btn-secondary"
                style={{
                  justifyContent: 'flex-start',
                  fontSize: '0.86rem',
                  padding: '10px 14px',
                  background: profession === p ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  borderColor: profession === p ? '#6366f1' : 'rgba(255, 255, 255, 0.1)',
                  color: profession === p ? 'white' : '#94a3b8'
                }}
              >
                {profession === p && <Check size={14} color="#6366f1" />}
                <span>{p}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Briefing Duration */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={16} color="#06b6d4" />
            <span>Target Briefing Duration</span>
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            {durations.map(d => (
              <button
                key={d.value}
                type="button"
                onClick={() => setDurationPref(d.value)}
                className="btn btn-secondary"
                style={{
                  fontSize: '0.84rem',
                  padding: '10px 8px',
                  background: durationPref === d.value ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  borderColor: durationPref === d.value ? '#06b6d4' : 'rgba(255, 255, 255, 0.1)',
                  color: durationPref === d.value ? 'white' : '#94a3b8'
                }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* AI Voice Selection */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Volume2 size={16} color="#8b5cf6" />
            <span>Select AI Narrator Voice</span>
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {voices.map(v => (
              <button
                key={v.name}
                type="button"
                onClick={() => setVoicePref(v.name)}
                className="btn btn-secondary"
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  fontSize: '0.86rem',
                  padding: '10px 14px',
                  background: voicePref === v.name ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  borderColor: voicePref === v.name ? '#8b5cf6' : 'rgba(255, 255, 255, 0.1)',
                  color: voicePref === v.name ? 'white' : '#94a3b8'
                }}
              >
                <div style={{ fontWeight: 700, color: 'white' }}>{v.name}</div>
                <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{v.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Topics */}
        <div className="form-group">
          <label className="form-label">Topics of Interest</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {topicsList.map(t => {
              const active = selectedTopics.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTopic(t)}
                  className="btn"
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.8rem',
                    borderRadius: '9999px',
                    background: active ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    color: active ? '#6366f1' : '#94a3b8',
                    border: active ? '1px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {active ? `✓ ${t}` : `+ ${t}`}
                </button>
              );
            })}
          </div>
        </div>

        <button 
          onClick={handleSave} 
          className="btn btn-primary" 
          style={{ width: '100%', padding: '12px', marginTop: '10px' }}
          disabled={loading}
        >
          <span>{loading ? "Saving Preferences..." : "Save & Generate Briefing"}</span>
        </button>
      </div>
    </div>
  );
};
