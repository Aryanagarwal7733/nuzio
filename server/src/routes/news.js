import express from "express";
import { INITIAL_NEWS_STORIES, AI_VOICES, PROFESSIONS, TOPICS } from "../data/newsData.js";

const router = express.Router();
let newsStories = [...INITIAL_NEWS_STORIES];
let userBookmarksMap = {};
let userFeedbackMap = {};

// GET /api/news/feed
router.get("/feed", (req, res) => {
  const { category, search, profession } = req.query;

  let filtered = [...newsStories];

  if (category && category !== "All") {
    filtered = filtered.filter(item => item.category.toLowerCase() === category.toLowerCase());
  }

  if (profession) {
    filtered = filtered.filter(item => 
      item.targetProfessions.includes(profession) || item.targetProfessions.includes("General")
    );
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.summary.toLowerCase().includes(q) ||
      item.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  return res.json({
    stories: filtered,
    total: filtered.length,
    availableVoices: AI_VOICES,
    professions: PROFESSIONS,
    topics: TOPICS
  });
});

// GET /api/news/briefing - Daily Personalized Briefing
router.get("/briefing", (req, res) => {
  const { profession = "Software Engineer", voice = "Executive Broadcast", duration = 15 } = req.query;

  // Filter stories matching profession or high priority tech/finance stories
  const relevantStories = newsStories.filter(s => 
    s.targetProfessions.includes(profession) || s.targetProfessions.includes("General")
  );

  // Combine top 3 relevant stories into a single seamless audio briefing
  const totalDuration = relevantStories.reduce((acc, curr) => acc + curr.durationSec, 0);

  const mergedTranscript = relevantStories.flatMap((story, index) => {
    const timeOffset = index * 50; // offset timing markers for continuous flow
    return story.transcript.map(t => ({
      ...t,
      storyId: story.id,
      storyTitle: story.title,
      start: t.start + timeOffset,
      end: t.end + timeOffset
    }));
  });

  return res.json({
    briefingTitle: `Today's ${duration}-Min ${profession} AI Audio Briefing`,
    date: new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" }),
    voiceNarrator: voice,
    totalDurationSec: totalDuration,
    formattedTotalDuration: `${Math.floor(totalDuration / 60)}:${(totalDuration % 60).toString().padStart(2, '0')}`,
    stories: relevantStories,
    combinedTranscript: mergedTranscript
  });
});

// POST /api/news/custom-briefing - AI Custom Audio Generation
router.post("/custom-briefing", (req, res) => {
  const { prompt, duration = 3, voice = "Energetic Tech" } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt topic is required" });
  }

  const customId = `custom-${Date.now()}`;
  const generatedStory = {
    id: customId,
    title: `AI Deep Dive: ${prompt}`,
    category: "Custom AI Brief",
    source: "Nuzio Instant AI Generator",
    publishedAt: "Just now",
    durationSec: duration * 60,
    formattedDuration: `${duration}:00`,
    summary: `Personalized AI audio briefing synthesized specifically for topic: "${prompt}". Generated in real-time.`,
    targetProfessions: ["General"],
    tags: ["Instant AI", "Custom Topic", "On-Demand"],
    narrator: voice,
    isTrending: false,
    transcript: [
      { text: `Welcome to your custom Nuzio AI briefing on ${prompt}.`, start: 0, end: 5 },
      { text: `We scanned over 45 live financial and technology feeds to synthesize this breakdown.`, start: 5, end: 12 },
      { text: `Key insight 1: Market demand for ${prompt} solution architectures has doubled this quarter.`, start: 12, end: 22 },
      { text: `Key insight 2: Top industry players are investing aggressively into scalable operational frameworks.`, start: 22, end: 32 },
      { text: `Thank you for using Nuzio AI Instant Briefings. Your personalized feed is now updated.`, start: 32, end: 42 }
    ]
  };

  // Add to active stories list
  newsStories.unshift(generatedStory);

  return res.json({
    message: "Custom AI Audio Briefing generated successfully!",
    story: generatedStory
  });
});

// POST /api/news/bookmark
router.post("/bookmark", (req, res) => {
  const { storyId, userId = "usr-demo-001" } = req.body;
  if (!userBookmarksMap[userId]) userBookmarksMap[userId] = [];

  const index = userBookmarksMap[userId].indexOf(storyId);
  let isBookmarked = false;

  if (index > -1) {
    userBookmarksMap[userId].splice(index, 1);
  } else {
    userBookmarksMap[userId].push(storyId);
    isBookmarked = true;
  }

  return res.json({ storyId, isBookmarked, bookmarks: userBookmarksMap[userId] });
});

// POST /api/news/feedback (Like / Dislike)
router.post("/feedback", (req, res) => {
  const { storyId, type, userId = "usr-demo-001" } = req.body; // type: 'like' | 'dislike'
  if (!userFeedbackMap[userId]) userFeedbackMap[userId] = {};

  userFeedbackMap[userId][storyId] = type;
  return res.json({ storyId, feedback: type, message: "AI personalization model updated with your feedback!" });
});

export default router;
