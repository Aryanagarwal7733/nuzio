import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { useAudioPlayer } from "../context/AudioPlayerContext";
import { useAuth } from "../context/AuthContext";
import { Play, Bookmark, ThumbsUp, ThumbsDown, Clock, Search, Sparkles } from "lucide-react";

export const NewsFeed = () => {
  const [stories, setStories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [feedbackState, setFeedbackState] = useState({});
  const [loading, setLoading] = useState(true);

  const { playStory, currentStory, isPlaying } = useAudioPlayer();
  const { user } = useAuth();

  const categories = ["All", "Tech & AI", "Markets & Finance", "AI & Future", "World News", "Healthcare"];

  const fetchFeed = async () => {
    setLoading(true);
    try {
      const data = await api.getFeed({
        category: activeCategory,
        search,
        profession: user?.profession
      });
      setStories(data.stories || []);
    } catch (err) {
      console.error("Failed to load news feed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [activeCategory, search, user?.profession]);

  const handleBookmark = async (storyId, e) => {
    e.stopPropagation();
    try {
      const res = await api.toggleBookmark(storyId);
      setBookmarks(res.bookmarks || []);
    } catch (err) {
      console.error("Bookmark failed:", err);
    }
  };

  const handleFeedback = async (storyId, type, e) => {
    e.stopPropagation();
    try {
      await api.sendFeedback(storyId, type);
      setFeedbackState(prev => ({ ...prev, [storyId]: type }));
    } catch (err) {
      console.error("Feedback failed:", err);
    }
  };

  return (
    <div style={{ marginTop: '36px' }}>
      {/* Header & Filter Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'white' }}>
            Personalized Audio Feed
          </h2>
          <p style={{ fontSize: '0.86rem', color: '#94a3b8' }}>
            Curated stories based on your profession ({user?.profession || "Software Engineer"})
          </p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input 
            type="text" 
            placeholder="Search audio news..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '36px', height: '40px', fontSize: '0.88rem' }}
          />
        </div>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '20px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="btn"
            style={{
              padding: '6px 14px',
              fontSize: '0.84rem',
              borderRadius: '9999px',
              background: activeCategory === cat ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255, 255, 255, 0.05)',
              color: activeCategory === cat ? 'white' : '#94a3b8',
              border: activeCategory === cat ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: activeCategory === cat ? '0 0 15px rgba(99, 102, 241, 0.4)' : 'none'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Cards */}
      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Synthesizing personalized stories...</div>
      ) : stories.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
          No stories found matching your filter criteria.
        </div>
      ) : (
        <div className="feed-grid">
          {stories.map((story) => {
            const isCurrent = currentStory?.id === story.id;
            const isBookmarked = bookmarks.includes(story.id) || story.id === "news-101";

            return (
              <div 
                key={story.id} 
                className="glass-panel news-card"
                style={{
                  borderColor: isCurrent ? 'rgba(99, 102, 241, 0.5)' : 'rgba(255, 255, 255, 0.08)',
                  background: isCurrent ? 'rgba(99, 102, 241, 0.08)' : 'rgba(15, 21, 37, 0.75)'
                }}
              >
                <div>
                  <div className="card-header">
                    <span className="category-tag">{story.category}</span>
                    <div className="duration-badge">
                      <Clock size={14} />
                      <span>{story.formattedDuration}</span>
                    </div>
                  </div>

                  <h3 className="card-title">{story.title}</h3>
                  <p className="card-summary">{story.summary}</p>
                </div>

                <div className="card-footer">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button 
                      className="btn btn-primary"
                      onClick={() => playStory(story)}
                      style={{ padding: '6px 14px', fontSize: '0.84rem' }}
                    >
                      <Play size={14} fill="white" />
                      <span>{isCurrent && isPlaying ? "Playing" : "Listen"}</span>
                    </button>

                    <button 
                      className="btn btn-ghost btn-icon"
                      onClick={(e) => handleBookmark(story.id, e)}
                      title="Bookmark Story"
                    >
                      <Bookmark size={16} color={isBookmarked ? "#6366f1" : "#64748b"} fill={isBookmarked ? "#6366f1" : "none"} />
                    </button>
                  </div>

                  {/* AI Feedback */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <button 
                      className="btn btn-ghost btn-icon"
                      onClick={(e) => handleFeedback(story.id, "like", e)}
                      title="More like this"
                    >
                      <ThumbsUp size={14} color={feedbackState[story.id] === "like" ? "#10b981" : "#64748b"} />
                    </button>
                    <button 
                      className="btn btn-ghost btn-icon"
                      onClick={(e) => handleFeedback(story.id, "dislike", e)}
                      title="Fewer like this"
                    >
                      <ThumbsDown size={14} color={feedbackState[story.id] === "dislike" ? "#f43f5e" : "#64748b"} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
