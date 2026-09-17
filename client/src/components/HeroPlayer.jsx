import React from "react";
import { useAudioPlayer } from "../context/AudioPlayerContext";
import { useAuth } from "../context/AuthContext";
import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, FastForward, Radio, Sparkles, Layers } from "lucide-react";

export const HeroPlayer = ({ briefingData, onTriggerDailyBriefing }) => {
  const {
    currentStory,
    isPlaying,
    currentTime,
    duration,
    playbackSpeed,
    volume,
    isMuted,
    selectedVoice,
    togglePlayPause,
    seekTo,
    skipSeconds,
    changeSpeed,
    setVolume,
    setIsMuted
  } = useAudioPlayer();

  const { user } = useAuth();

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    seekTo(Number(e.target.value));
  };

  const speeds = [0.8, 1.0, 1.25, 1.5, 2.0];

  return (
    <div className="glass-panel" style={{ padding: '28px', position: 'relative', overflow: 'hidden' }}>
      {/* Background Subtle Gradient Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Header Info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="category-tag">
            {currentStory ? currentStory.category : "Daily AI Digest"}
          </span>
          {currentStory && (
            <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
              • {currentStory.source}
            </span>
          )}
        </div>

        <button 
          className="btn btn-primary" 
          onClick={onTriggerDailyBriefing}
          style={{ padding: '8px 16px', fontSize: '0.84rem' }}
        >
          <Radio size={15} />
          <span>Play Today's {user?.durationPref || 15}-Min Briefing</span>
        </button>
      </div>

      {/* Title */}
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.3, color: 'white', marginBottom: '12px' }}>
        {currentStory ? currentStory.title : "Ready to start your personalized audio news briefing?"}
      </h1>

      <p style={{ fontSize: '0.94rem', color: '#94a3b8', marginBottom: '20px', lineHeight: 1.5 }}>
        {currentStory
          ? currentStory.summary
          : `Click play above to listen to your AI-synthesized news briefing tailored for ${user?.profession || "Software Engineering"} in ${selectedVoice} voice.`}
      </p>

      {/* Animated Waveform Visualizer */}
      <div className={`waveform-container ${isPlaying ? 'playing' : ''}`}>
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="waveform-bar" />
        ))}
      </div>

      {/* Scrubber Timeline */}
      <div style={{ margin: '16px 0 20px 0' }}>
        <input 
          type="range"
          min={0}
          max={duration || 180}
          value={currentTime}
          onChange={handleSeek}
          style={{
            width: '100%',
            height: '6px',
            accentColor: '#6366f1',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#64748b', marginTop: '6px' }}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Playback Controls & Speed */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        {/* Speed Selection */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>SPEED:</span>
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => changeSpeed(s)}
              className="btn btn-ghost"
              style={{
                padding: '4px 8px',
                fontSize: '0.78rem',
                borderRadius: '6px',
                background: playbackSpeed === s ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                color: playbackSpeed === s ? '#6366f1' : '#94a3b8',
                fontWeight: playbackSpeed === s ? 700 : 500
              }}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Main Transport Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button 
            className="btn btn-secondary btn-icon" 
            onClick={() => skipSeconds(-15)} 
            title="Rewind 15s"
          >
            <RotateCcw size={18} />
          </button>

          <button 
            className="btn btn-primary btn-icon" 
            onClick={togglePlayPause} 
            style={{ width: '56px', height: '56px', boxShadow: '0 0 25px rgba(99, 102, 241, 0.6)' }}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: '3px' }} />}
          </button>

          <button 
            className="btn btn-secondary btn-icon" 
            onClick={() => skipSeconds(15)} 
            title="Fast Forward 15s"
          >
            <RotateCw size={18} />
          </button>
        </div>

        {/* Volume Control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            className="btn btn-ghost btn-icon" 
            onClick={() => setIsMuted(!isMuted)} 
            style={{ width: '32px', height: '32px' }}
          >
            {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <input 
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            style={{ width: '70px', accentColor: '#6366f1', height: '4px' }}
          />
        </div>
      </div>
    </div>
  );
};
