import React, { useState, useEffect, useRef } from "react";
import { useAudioPlayer } from "../context/AudioPlayerContext";
import { FileText, Search, PlayCircle } from "lucide-react";

export const TranscriptView = () => {
  const { currentStory, currentSentenceIndex, seekTo } = useAudioPlayer();
  const [searchQuery, setSearchQuery] = useState("");
  const activeLineRef = useRef(null);

  // Auto-scroll active transcript line into view
  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [currentSentenceIndex]);

  if (!currentStory || !currentStory.transcript || currentStory.transcript.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>
        <FileText size={32} style={{ margin: '0 auto 10px auto', display: 'block', opacity: 0.5 }} />
        <p style={{ fontSize: '0.9rem' }}>Play a story to view synchronized AI audio transcript.</p>
      </div>
    );
  }

  const filteredTranscript = currentStory.transcript.filter(line => 
    line.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="glass-panel" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={18} color="#6366f1" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'white' }}>Live Synced Transcript</h3>
        </div>
        <span style={{ fontSize: '0.78rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
          REAL-TIME JUMP
        </span>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '14px' }}>
        <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
        <input 
          type="text"
          placeholder="Filter transcript text..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-input"
          style={{ paddingLeft: '34px', padding: '8px 12px 8px 34px', fontSize: '0.84rem' }}
        />
      </div>

      {/* Lines Box */}
      <div className="transcript-box">
        {filteredTranscript.map((line, idx) => {
          const originalIdx = currentStory.transcript.indexOf(line);
          const isActive = originalIdx === currentSentenceIndex;

          return (
            <div
              key={idx}
              ref={isActive ? activeLineRef : null}
              className={`transcript-line ${isActive ? 'active' : ''}`}
              onClick={() => seekTo(line.start)}
              title="Click to jump audio here"
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <PlayCircle 
                  size={16} 
                  color={isActive ? "#6366f1" : "#64748b"} 
                  style={{ marginTop: '3px', flexShrink: 0, opacity: isActive ? 1 : 0.4 }} 
                />
                <div>
                  <span style={{ fontSize: '0.76rem', color: isActive ? '#818cf8' : '#64748b', marginRight: '8px', fontWeight: 600 }}>
                    [{Math.floor(line.start / 60)}:{(line.start % 60).toString().padStart(2, '0')}]
                  </span>
                  <span>{line.text}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
