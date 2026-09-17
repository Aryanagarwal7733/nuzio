const API_BASE = "/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("nuzio_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  // Auth
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");
    return data;
  },

  async demoLogin() {
    const res = await fetch(`${API_BASE}/auth/demo-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Demo login failed");
    return data;
  },

  async register(userData) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed");
    return data;
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { ...getAuthHeader() }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Auth check failed");
    return data;
  },

  async updatePreferences(prefs) {
    const res = await fetch(`${API_BASE}/auth/preferences`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader()
      },
      body: JSON.stringify(prefs)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to update preferences");
    return data;
  },

  // News & Briefings
  async getFeed(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/news/feed?${query}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to fetch feed");
    return data;
  },

  async getBriefing(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/news/briefing?${query}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to fetch briefing");
    return data;
  },

  async generateCustomBriefing(prompt, duration = 3, voice = "Energetic Tech") {
    const res = await fetch(`${API_BASE}/news/custom-briefing`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, duration, voice })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Custom briefing generation failed");
    return data;
  },

  async toggleBookmark(storyId) {
    const res = await fetch(`${API_BASE}/news/bookmark`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ storyId })
    });
    return res.json();
  },

  async sendFeedback(storyId, type) {
    const res = await fetch(`${API_BASE}/news/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ storyId, type })
    });
    return res.json();
  }
};
