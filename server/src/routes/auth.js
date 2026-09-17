import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = "nuzio-ai-super-secret-key-2026";

// In-memory user store for fast demo & state keeping
let users = [
  {
    id: "usr-demo-001",
    email: "alex.pro@nuzio.ai",
    name: "Alex Vance",
    profession: "Software Engineer",
    durationPref: 15, // minutes
    voicePref: "Executive Broadcast",
    languagePref: "English",
    topics: ["Tech & AI", "Markets & Finance", "AI & Future"],
    bookmarks: ["news-101"]
  }
];

// Register
router.post("/register", (req, res) => {
  const { email, password, name, profession, durationPref, voicePref, topics } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: "Email and name are required" });
  }

  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: "An account with this email already exists" });
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    email,
    name,
    profession: profession || "Software Engineer",
    durationPref: durationPref || 10,
    voicePref: voicePref || "Executive Broadcast",
    languagePref: "English",
    topics: topics || ["Tech & AI", "Markets & Finance"],
    bookmarks: []
  };

  users.push(newUser);
  const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: "7d" });
  return res.json({ token, user: newUser });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  // If user exists or user clicks express demo login
  if (!user) {
    return res.status(404).json({ error: "Invalid credentials. Try express demo login!" });
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
  return res.json({ token, user });
});

// 1-Click Express Demo Login
router.post("/demo-login", (req, res) => {
  const demoUser = users[0];
  const token = jwt.sign({ userId: demoUser.id, email: demoUser.email }, JWT_SECRET, { expiresIn: "7d" });
  return res.json({ token, user: demoUser });
});

// Get Current User Profile
router.get("/me", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json({ user });
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
});

// Update Onboarding / Preferences
router.put("/preferences", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userIndex = users.findIndex(u => u.id === decoded.userId);
    if (userIndex === -1) return res.status(404).json({ error: "User not found" });

    const { profession, durationPref, voicePref, languagePref, topics } = req.body;
    users[userIndex] = {
      ...users[userIndex],
      ...(profession && { profession }),
      ...(durationPref && { durationPref: Number(durationPref) }),
      ...(voicePref && { voicePref }),
      ...(languagePref && { languagePref }),
      ...(topics && { topics })
    };

    return res.json({ message: "Preferences updated successfully", user: users[userIndex] });
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
