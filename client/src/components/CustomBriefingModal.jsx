import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useAudioPlayer } from "../context/AudioPlayerContext";
import { api } from "../services/api";
import { X, Sparkles, Wand2, Mic } from "lucide-react";

export const CustomBriefingModal = () => {
  const { isCustomModalOpen, setIsCustomModalOpen } = useAuth();
  const { playStory, selectedVoice } = useAudioPlayer();

  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState(3);
  const [loading, setLoading] = useState(false);

  if (!isCustomModalOpen) return null;

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const res = await api.generateCustomBriefing(prompt, duration, selectedVoice);
      if (res.story) {
        playStory(res.story);
        setIsCustomModalOpen(false);
        setPrompt("");
      }
    } catch (err) {
      console.error("Custom briefing failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    "Latest OpenAI Model launch & developer pricing",
    "Global chip supply chain bottlenecks in 2026",
    "Fed interest rate decisions & tech stock implications",
    "CRISPR gene therapy breakthrough FDA status"
  ];

  return (
    <div className="modal-overlay" onClick={() => setIsCustomModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} color="#8b5cf6" />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white' }}>
              Instant Custom AI Audio Briefing
            </h2>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={() => setIsCustomModalOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '20px', lineHeight: 1.5 }}>
          Enter any specific news topic, company, or market sector. Nuzio AI will synthesize a dedicated audio briefing instantly.
        </p>

        <form onSubmit={handleGenerate}>
          <div className="form-group">
            <label className="form-label">Topic / Subject Matter</label>
            <textarea 
              rows={3}
              required
              placeholder="e.g. Summarize top developments in AI robotics and venture capital funding this week..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="form-input"
              style={{ resize: 'none' }}
            />
          </div>

          {/* Sample Prompts */}
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
              TRY A SAMPLE TOPIC:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {samplePrompts.map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPrompt(p)}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.76rem', padding: '4px 10px', borderRadius: '9999px' }}
                >
                  ⚡ {p}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Briefing Length</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[2, 3, 5].map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  className="btn btn-secondary"
                  style={{
                    flex: 1,
                    fontSize: '0.86rem',
                    background: duration === d ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    borderColor: duration === d ? '#8b5cf6' : 'rgba(255, 255, 255, 0.1)',
                    color: duration === d ? 'white' : '#94a3b8'
                  }}
                >
                  {d} Minutes
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}
            disabled={loading}
          >
            <Wand2 size={16} />
            <span>{loading ? "Synthesizing AI Audio..." : "Generate & Play Audio Brief"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
