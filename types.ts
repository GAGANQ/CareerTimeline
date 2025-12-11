
export interface ThemeConfig {
  primary: string;      // Main brand color for this company/era
  secondary: string;    // Lighter accent
  background: string;   // Subtle background tint
  text: string;         // Primary text color
}

export interface JourneyNode {
  id: string;
  role: string;         // Job Title
  company: string;      // Company Name
  location: string;     // City/Remote
  title: string;        // Chapter Title (e.g. "The Startup Grind")
  description: string;  // Narrative summary
  dateRange: string;    // e.g. "2020 - 2022"
  emoji: string;
  aiGenerated?: boolean;
  imageUrl?: string;
  websiteUrl?: string;  // Official Company Website
  tags?: string[];      // Industry tags (e.g. Fintech, SaaS)
  skills?: string[];    // Hard/Soft skills
  tools?: string[];     // Tech stack, software, equipment
  duties?: string[];    // Key responsibilities/bullet points
  theme?: ThemeConfig;  // Dynamic color palette
}

export interface StoryParams {
  role: string;
  company: string;
  location: string;
  prevNode?: JourneyNode;
  context?: string;
}

export interface StoryResponse {
  title: string;
  description: string;
  emoji: string;
  dateRange: string;
  tags: string[];
  skills: string[];
  tools: string[];
  duties: string[];
  theme: ThemeConfig;
}
