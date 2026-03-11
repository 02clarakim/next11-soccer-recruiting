export interface Player {
  id: string;
  name: string;
  position: string;
  jerseyNumber: number;
  headshot: string;
  recruitingStatus: "Available" | "Committed" | "Exploring";
  bio: string;
  age: number;
  year: string;
  hometown: string;
  school: string;
  height: string;
  weight: string;
  stats: {
    season: string;
    gamesPlayed: number;
    goals: number;
    assists: number;
  }[];
  videos: {
    id: string;
    title: string;
    url: string;
    views: number;
    isPinned: boolean;
  }[];
  achievements: string[];
  competitions: string[];
  coachReferences: { name: string; contact: string }[];
  profileViews: number;
  scoutViews: { scoutName: string; org: string; date: string }[];
}

export interface Scout {
  id: string;
  name: string;
  organization: string;
  avatar: string;
  location: string;
}

export interface JobPost {
  id: string;
  scoutName: string;
  org: string;
  title: string;
  description: string;
  position: string;
  year: string;
  location: string;
  date: string;
}

export interface Event {
  id: string;
  name: string;
  location: string;
  date: string;
  type: string;
  attending: boolean;
}

export const mockPlayer: Player = {
  id: "p1",
  name: "James Rodriguez",
  position: "CAM",
  jerseyNumber: 11,
  headshot: "",
  recruitingStatus: "Available",
  bio: "Creative attacking midfielder with exceptional vision and passing range. Two-time state champion and regional ODP selection. Looking to play at the highest collegiate level.",
  age: 17,
  year: "2026",
  hometown: "Austin, TX",
  school: "Westlake High School",
  height: "5'10\"",
  weight: "155 lbs",
  stats: [
    { season: "2025-26", gamesPlayed: 22, goals: 14, assists: 18 },
    { season: "2024-25", gamesPlayed: 20, goals: 11, assists: 15 },
    { season: "2023-24", gamesPlayed: 18, goals: 8, assists: 12 },
  ],
  videos: [
    { id: "v1", title: "Senior Year Highlights", url: "#", views: 1247, isPinned: true },
    { id: "v2", title: "State Championship Final", url: "#", views: 892, isPinned: false },
    { id: "v3", title: "ODP Showcase Goals", url: "#", views: 634, isPinned: false },
  ],
  achievements: [
    "2x All-State Selection",
    "Regional ODP Team 2024-25",
    "State Championship MVP 2025",
    "Conference Player of the Year",
  ],
  competitions: [
    "ECNL Southwest Conference",
    "US Youth Soccer National League",
    "Dallas Cup 2025",
    "Surf Cup 2024",
  ],
  coachReferences: [
    { name: "Coach David Miller", contact: "d.miller@westlakehs.edu" },
    { name: "Coach Sarah Chen", contact: "s.chen@lonestarfc.com" },
  ],
  profileViews: 3421,
  scoutViews: [
    { scoutName: "Mike Torres", org: "Stanford University", date: "2 hours ago" },
    { scoutName: "Lisa Park", org: "UCLA Athletics", date: "1 day ago" },
    { scoutName: "James Wright", org: "Duke University", date: "3 days ago" },
    { scoutName: "Ana Gomez", org: "UNC Chapel Hill", date: "1 week ago" },
  ],
};

export const mockPlayers: Player[] = [
  mockPlayer,
  {
    id: "p2",
    name: "Marcus Williams",
    position: "LB",
    jerseyNumber: 3,
    headshot: "",
    recruitingStatus: "Exploring",
    bio: "Quick and technical left-back with strong overlapping runs.",
    age: 16,
    year: "2027",
    hometown: "Miami, FL",
    school: "Coral Gables High",
    height: "5'8\"",
    weight: "148 lbs",
    stats: [
      { season: "2025-26", gamesPlayed: 19, goals: 2, assists: 9 },
    ],
    videos: [
      { id: "v4", title: "Defensive Highlights", url: "#", views: 567, isPinned: true },
    ],
    achievements: ["All-County First Team", "ECNL Best XI"],
    competitions: ["ECNL Southeast", "Disney Showcase"],
    coachReferences: [{ name: "Coach Rivera", contact: "rivera@cghs.edu" }],
    profileViews: 1890,
    scoutViews: [],
  },
  {
    id: "p3",
    name: "Kai Nakamura",
    position: "ST",
    jerseyNumber: 9,
    headshot: "",
    recruitingStatus: "Available",
    bio: "Clinical finisher with pace and aerial ability.",
    age: 17,
    year: "2026",
    hometown: "Seattle, WA",
    school: "Lakeside Academy",
    height: "6'1\"",
    weight: "170 lbs",
    stats: [
      { season: "2025-26", gamesPlayed: 21, goals: 22, assists: 6 },
    ],
    videos: [
      { id: "v5", title: "22 Goals in 21 Games", url: "#", views: 2103, isPinned: true },
    ],
    achievements: ["Golden Boot - State League", "National Team Camp Invitee"],
    competitions: ["MLS NEXT", "Generation adidas Cup"],
    coachReferences: [{ name: "Coach Tanaka", contact: "tanaka@lakeside.edu" }],
    profileViews: 4521,
    scoutViews: [],
  },
  {
    id: "p4",
    name: "Diego Santos",
    position: "CDM",
    jerseyNumber: 6,
    headshot: "",
    recruitingStatus: "Available",
    bio: "Commanding defensive midfielder with elite passing range and tactical intelligence.",
    age: 16,
    year: "2027",
    hometown: "Houston, TX",
    school: "Memorial High School",
    height: "5'11\"",
    weight: "162 lbs",
    stats: [
      { season: "2025-26", gamesPlayed: 20, goals: 3, assists: 11 },
    ],
    videos: [
      { id: "v6", title: "Midfield Masterclass", url: "#", views: 891, isPinned: true },
    ],
    achievements: ["All-District MVP", "ECNL National Selection"],
    competitions: ["ECNL Texas", "Lonestar Cup"],
    coachReferences: [{ name: "Coach Hernandez", contact: "hernandez@mhs.edu" }],
    profileViews: 2134,
    scoutViews: [],
  },
  {
    id: "p5",
    name: "Ethan Brooks",
    position: "GK",
    jerseyNumber: 1,
    headshot: "",
    recruitingStatus: "Committed",
    bio: "Shot-stopper with commanding presence and excellent distribution.",
    age: 18,
    year: "2025",
    hometown: "Denver, CO",
    school: "Cherry Creek HS",
    height: "6'3\"",
    weight: "185 lbs",
    stats: [
      { season: "2025-26", gamesPlayed: 22, goals: 0, assists: 1 },
    ],
    videos: [
      { id: "v7", title: "Save Compilation", url: "#", views: 1567, isPinned: true },
    ],
    achievements: ["All-State GK of the Year", "Committed to Wake Forest"],
    competitions: ["ECNL National Playoffs", "US Soccer Development Academy"],
    coachReferences: [{ name: "Coach Barrett", contact: "barrett@cchs.edu" }],
    profileViews: 3012,
    scoutViews: [],
  },
];

export const mockJobPosts: JobPost[] = [
  {
    id: "j1",
    scoutName: "Mike Torres",
    org: "Stanford University",
    title: "Looking for 2026 CAM/Winger",
    description: "Need a creative, two-footed attacking player who can play centrally or out wide. Must have strong academics.",
    position: "CAM",
    year: "2026",
    location: "Palo Alto, CA",
    date: "2 days ago",
  },
  {
    id: "j2",
    scoutName: "Sarah Kim",
    org: "UCLA Athletics",
    title: "2027 Left-Back Needed",
    description: "Seeking an athletic, technical left-back with strong defensive awareness and ability to get forward.",
    position: "LB",
    year: "2027",
    location: "Los Angeles, CA",
    date: "5 days ago",
  },
  {
    id: "j3",
    scoutName: "David Chen",
    org: "University of Virginia",
    title: "Striker / Forward - Class of 2026",
    description: "High-pressing striker with pace and finishing ability. Must be comfortable leading the line alone.",
    position: "ST",
    year: "2026",
    location: "Charlottesville, VA",
    date: "1 week ago",
  },
];

export const mockEvents: Event[] = [
  { id: "e1", name: "Dallas Cup 2026", location: "Dallas, TX", date: "Mar 22-29, 2026", type: "Tournament", attending: false },
  { id: "e2", name: "ECNL National Showcase", location: "Phoenix, AZ", date: "Apr 10-13, 2026", type: "Showcase", attending: true },
  { id: "e3", name: "Surf Cup Summer", location: "San Diego, CA", date: "Jul 31 - Aug 3, 2026", type: "Tournament", attending: false },
  { id: "e4", name: "Jefferson Cup", location: "Richmond, VA", date: "Mar 14-16, 2026", type: "Tournament", attending: false },
];
