import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [currentStory, setCurrentStory] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [volume, setVolume] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("Executive Broadcast");
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  const synthRef = useRef(window.speechSynthesis || null);
  const timerRef = useRef(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (synthRef.current) synthRef.current.cancel();
    };
  }, []);

  // Playback timer & transcript sync loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            if (synthRef.current) synthRef.current.cancel();
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, duration, playbackSpeed]);

  // Sync transcript line based on currentTime
  useEffect(() => {
    if (!currentStory || !currentStory.transcript) return;
    const idx = currentStory.transcript.findIndex(
      (item) => currentTime >= item.start && currentTime <= item.end
    );
    if (idx !== -1) {
      setCurrentSentenceIndex(idx);
    }
  }, [currentTime, currentStory]);

  const speakText = (text) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = playbackSpeed;
    utterance.volume = isMuted ? 0 : volume;

    // Try finding matching system voice
    const voices = synthRef.current.getVoices();
    if (voices.length > 0) {
      if (selectedVoice.includes("Calm") || selectedVoice.includes("Female")) {
        const femaleVoice = voices.find(v => v.name.includes("Female") || v.name.includes("Samantha") || v.name.includes("Zira"));
        if (femaleVoice) utterance.voice = femaleVoice;
      } else {
        const maleVoice = voices.find(v => v.name.includes("Male") || v.name.includes("David") || v.name.includes("Daniel"));
        if (maleVoice) utterance.voice = maleVoice;
      }
    }

    synthRef.current.speak(utterance);
  };

  const playStory = (story) => {
    setCurrentStory(story);
    setCurrentTime(0);
    setDuration(story.durationSec || 180);
    setIsPlaying(true);
    setCurrentSentenceIndex(0);

    const fullText = story.transcript ? story.transcript.map(t => t.text).join(". ") : story.summary;
    speakText(fullText);
  };

  const playBriefing = (briefing) => {
    if (!briefing || !briefing.stories || briefing.stories.length === 0) return;
    const mergedStory = {
      id: "merged-briefing",
      title: briefing.briefingTitle,
      category: "Daily AI Digest",
      source: "Nuzio Personalized Engine",
      publishedAt: briefing.date,
      durationSec: briefing.totalDurationSec,
      formattedDuration: briefing.formattedTotalDuration,
      summary: `Your custom briefing containing ${briefing.stories.length} stories tailored for your profile.`,
      transcript: briefing.combinedTranscript,
      narrator: briefing.voiceNarrator || selectedVoice
    };
    playStory(mergedStory);
  };

  const togglePlayPause = () => {
    if (!currentStory) return;
    if (isPlaying) {
      setIsPlaying(false);
      if (synthRef.current) synthRef.current.pause();
    } else {
      setIsPlaying(true);
      if (synthRef.current) {
        if (synthRef.current.paused) {
          synthRef.current.resume();
        } else {
          const remainingText = currentStory.transcript
            ? currentStory.transcript.slice(currentSentenceIndex).map(t => t.text).join(". ")
            : currentStory.summary;
          speakText(remainingText);
        }
      }
    }
  };

  const seekTo = (seconds) => {
    setCurrentTime(seconds);
    if (synthRef.current) synthRef.current.cancel();
    if (isPlaying && currentStory) {
      const idx = currentStory.transcript
        ? currentStory.transcript.findIndex(t => seconds >= t.start && seconds <= t.end)
        : 0;
      const targetIdx = idx >= 0 ? idx : 0;
      setCurrentSentenceIndex(targetIdx);

      const textToSpeak = currentStory.transcript
        ? currentStory.transcript.slice(targetIdx).map(t => t.text).join(". ")
        : currentStory.summary;
      speakText(textToSpeak);
    }
  };

  const skipSeconds = (secs) => {
    const nextTime = Math.min(Math.max(0, currentTime + secs), duration);
    seekTo(nextTime);
  };

  const changeSpeed = (speed) => {
    setPlaybackSpeed(speed);
    if (isPlaying && currentStory) {
      seekTo(currentTime); // re-trigger speak with new rate
    }
  };

  const changeVoice = (voiceName) => {
    setSelectedVoice(voiceName);
    if (isPlaying && currentStory) {
      seekTo(currentTime);
    }
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currentStory,
        isPlaying,
        currentTime,
        duration,
        playbackSpeed,
        volume,
        isMuted,
        selectedVoice,
        currentSentenceIndex,
        playStory,
        playBriefing,
        togglePlayPause,
        seekTo,
        skipSeconds,
        changeSpeed,
        changeVoice,
        setVolume,
        setIsMuted
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayerContext);
