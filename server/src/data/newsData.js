export const INITIAL_NEWS_STORIES = [
  {
    id: "news-101",
    title: "Breakthrough in Quantum Computing: 100-Qubit Logic Gates Benchmark Achieved",
    category: "Tech & AI",
    source: "TechCrunch AI Daily",
    publishedAt: "10 mins ago",
    durationSec: 180,
    formattedDuration: "3:00",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg", // fallback audio stream indicator
    summary: "Researchers have achieved fault-tolerant quantum logic operations with 99.9% fidelity. Implications for cryptography and drug discovery are immediate.",
    targetProfessions: ["Software Engineer", "Founder & Executive", "General"],
    tags: ["Quantum", "DeepTech", "Hardware", "Cybersecurity"],
    narrator: "Executive Broadcast",
    isTrending: true,
    transcript: [
      { text: "Good morning. This is your Nuzio AI Tech Briefing.", start: 0, end: 4 },
      { text: "In quantum computing, top research labs today reported a major milestone in fault-tolerant logic gates.", start: 4, end: 12 },
      { text: "The new 100-qubit system achieved 99.9% gate fidelity, surpassing the previous decoherence ceiling.", start: 12, end: 20 },
      { text: "For software engineers and security architects, this significantly accelerates post-quantum encryption deadlines.", start: 20, end: 30 },
      { text: "Venture capital investment into quantum software stacks jumped 40% in Q3 following this breakthrough.", start: 30, end: 40 },
      { text: "Key takeaway: Standard RSA-2048 transition plans should now be moved up by 18 months.", start: 40, end: 50 }
    ]
  },
  {
    id: "news-102",
    title: "Federal Reserve Signals Rate Cuts Amid Cooling Inflation Data",
    category: "Markets & Finance",
    source: "Bloomberg Financial Pulse",
    publishedAt: "25 mins ago",
    durationSec: 210,
    formattedDuration: "3:30",
    summary: "US CPI dropped to 2.1% year-over-year. Tech growth equities rally strongly as treasury yields drop across all maturities.",
    targetProfessions: ["Investor & Finance", "Founder & Executive", "General"],
    tags: ["Fed", "Macro", "Interest Rates", "Stocks"],
    narrator: "Calm & Focused",
    isTrending: true,
    transcript: [
      { text: "Welcome to your financial digest on Nuzio AI.", start: 0, end: 4 },
      { text: "The Federal Reserve chairman signaled potential rate cuts in the upcoming FOMC meeting.", start: 4, end: 12 },
      { text: "Consumer price index data released this morning registered at 2.1%, beating Wall Street consensus estimates.", start: 12, end: 22 },
      { text: "Equity futures surged with the Nasdaq 100 up 1.8% in pre-market trading.", start: 22, end: 30 },
      { text: "Yields on 10-year Treasury notes fell 12 basis points to 3.85%.", start: 30, end: 38 },
      { text: "Financial strategists recommend rebalancing into long-duration tech assets and renewable energy debt.", start: 38, end: 50 }
    ]
  },
  {
    id: "news-103",
    title: "Autonomous AI Agents Reshaping Enterprise Software Workflows",
    category: "AI & Future",
    source: "MIT Technology Review",
    publishedAt: "1 hour ago",
    durationSec: 240,
    formattedDuration: "4:00",
    summary: "Multi-agent orchestration systems are automating 60% of routine code reviews, DevOps deployments, and customer ops.",
    targetProfessions: ["Software Engineer", "Founder & Executive", "Marketer"],
    tags: ["Agents", "LLMs", "DevOps", "Automation"],
    narrator: "Energetic Tech",
    isTrending: true,
    transcript: [
      { text: "Hey there! Here is your Nuzio AI Agent Briefing.", start: 0, end: 4 },
      { text: "Enterprise adoption of autonomous AI agents reached a new high according to Gartner's latest study.", start: 4, end: 14 },
      { text: "Companies utilizing agentic workflows report a 3.5x boost in engineering velocity and reduced incident downtime.", start: 14, end: 24 },
      { text: "The shift is moving from simple copilot chatbots to multi-step reasoning systems executing complex git pull requests.", start: 24, end: 35 },
      { text: "Security concerns remain focused on prompt injection and granular tool permission boundaries.", start: 35, end: 45 },
      { text: "Stay tuned as we track open-source agent frameworks gaining momentum this week.", start: 45, end: 55 }
    ]
  },
  {
    id: "news-104",
    title: "Global Supply Chains Shift Toward Nearshoring in Southeast Asia",
    category: "World News",
    source: "Financial Times Briefing",
    publishedAt: "2 hours ago",
    durationSec: 195,
    formattedDuration: "3:15",
    summary: "Manufacturing hubs in Vietnam, Malaysia, and India see record FDI inflows as semiconductor chip packaging expands.",
    targetProfessions: ["Founder & Executive", "Investor & Finance", "General"],
    tags: ["Trade", "SupplyChain", "Semiconductors", "Asia"],
    narrator: "Executive Broadcast",
    isTrending: false,
    transcript: [
      { text: "Nuzio AI Global Radar bringing you key international business headlines.", start: 0, end: 5 },
      { text: "Global supply chain reallocation is accelerating toward Southeast Asia.", start: 5, end: 12 },
      { text: "Foreign Direct Investment into semiconductor testing and assembly facilities in Malaysia rose 35% year-on-year.", start: 12, end: 22 },
      { text: "Logistics infrastructure investments in Vietnam and India are mitigating shipping congestion bottleneck risks.", start: 22, end: 33 },
      { text: "Operations leaders are advised to review dual-sourcing strategies for critical electronic hardware components.", start: 33, end: 45 }
    ]
  },
  {
    id: "news-105",
    title: "CRISPR Gene Editing Receives Expanded Approval for Rare Genetic Disorders",
    category: "Healthcare",
    source: "Nature BioNews",
    publishedAt: "3 hours ago",
    durationSec: 220,
    formattedDuration: "3:40",
    summary: "FDA grants breakthrough designation for single-dose in vivo gene therapy targeting metabolic enzyme deficiencies.",
    targetProfessions: ["Healthcare", "Founder & Executive", "General"],
    tags: ["Biotech", "CRISPR", "FDA", "Medicine"],
    narrator: "Calm & Focused",
    isTrending: false,
    transcript: [
      { text: "Here is your Nuzio AI Biotech Update.", start: 0, end: 4 },
      { text: "The FDA has granted expanded approval for in-vivo CRISPR therapies targeting rare metabolic disorders.", start: 4, end: 14 },
      { text: "Clinical trials showed sustained enzyme restoration in 94% of patients over a 24-month monitoring window.", start: 14, end: 25 },
      { text: "Biotech sector stocks reacted positively, driving the NBI Index up by 2.4%.", start: 25, end: 33 },
      { text: "Healthcare providers are preparing specialized delivery protocols for regional medical centers.", start: 33, end: 45 }
    ]
  }
];

export const AI_VOICES = [
  { id: "voice-1", name: "Executive Broadcast", tone: "Authoritative & Crisp", accent: "Neutral American", gender: "Male" },
  { id: "voice-2", name: "Calm & Focused", tone: "Soothing & Measured", accent: "British Professional", gender: "Female" },
  { id: "voice-3", name: "Energetic Tech", tone: "Upbeat & Dynamic", accent: "Silicon Valley Modern", gender: "Male" },
  { id: "voice-4", name: "Conversational Duo", tone: "Engaging Dialogue", accent: "Global Standard", gender: "Multi" }
];

export const PROFESSIONS = [
  "Software Engineer",
  "Founder & Executive",
  "Investor & Finance",
  "Healthcare & Bio",
  "Marketer & Creative",
  "General Knowledge Enthusiast"
];

export const TOPICS = [
  "Tech & AI",
  "Markets & Finance",
  "AI & Future",
  "World News",
  "Healthcare",
  "Startups & VC",
  "Crypto & Web3",
  "Climate & CleanTech"
];
