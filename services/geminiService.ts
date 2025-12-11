import { GoogleGenAI, Type } from "@google/genai";
import { JourneyNode, StoryResponse } from '../types';

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateStoryNode = async (
  role: string,
  company: string,
  location: string,
  prevNode: JourneyNode | null,
  userContext: string
): Promise<StoryResponse> => {
  const ai = getAI();
  if (!ai) throw new Error("API Key is missing");

  const prompt = `
    You are an expert Career Coach and Resume Writer helping a user map their professional journey.
    
    CRITICAL INSTRUCTION: Write in the FIRST PERSON ("I", "My").
    The user is narrating their story to a recruiter or hiring manager. 
    Tone: Professional, confident, yet conversational and storytelling-driven.

    Context:
    Role: "${role}" at "${company}" (${location}).
    ${prevNode ? `Previous role: ${prevNode.role} at ${prevNode.company}.` : "This was the beginning of my career."}
    User Notes: "${userContext}".

    Task:
    1. Write a First-Person Narrative Description (3-4 sentences). Start with a hook. Explain what I built, led, or learned.
    2. Extract 3-4 "Key Competencies" (Soft/Hard skills).
    3. Extract 3-4 "Tools & Technologies" used.
    4. Write 3 distinct "Key Duties/Achievements" as bullet points (Use active verbs: "I spearheaded...", "I developed...").
    5. Design a COLOR THEME (Hex codes) matching the brand/industry.

    Return JSON:
    - title: A catchy chapter title (e.g., "Scaling the Unicorn", "Foundations of Design").
    - description: The first-person narrative.
    - emoji: Representative emoji.
    - dateRange: Estimated year range.
    - tags: 3 industry keywords.
    - skills: 3-4 skills.
    - tools: 3-4 tools.
    - duties: 3 concise bullet points (first person).
    - theme: Object with 'primary', 'secondary', 'background', 'text'.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            emoji: { type: Type.STRING },
            dateRange: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            skills: { type: Type.ARRAY, items: { type: Type.STRING } },
            tools: { type: Type.ARRAY, items: { type: Type.STRING } },
            duties: { type: Type.ARRAY, items: { type: Type.STRING } },
            theme: {
              type: Type.OBJECT,
              properties: {
                primary: { type: Type.STRING },
                secondary: { type: Type.STRING },
                background: { type: Type.STRING },
                text: { type: Type.STRING },
              },
              required: ['primary', 'secondary', 'background', 'text']
            }
          },
          required: ['title', 'description', 'emoji', 'tags', 'skills', 'tools', 'duties', 'theme']
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating story:", error);
    // Fallback theme
    return {
      title: `My Role at ${company}`,
      description: "I took on a period of professional growth and new challenges, working with a dedicated team to solve complex problems.",
      emoji: "💼",
      dateRange: "2024",
      tags: ["Career", "Growth", "Work"],
      skills: ["Teamwork", "Problem Solving"],
      tools: ["Office Suite", "Communication Tools"],
      duties: ["I managed key projects", "I collaborated with cross-functional teams", "I improved operational efficiency"],
      theme: {
        primary: "#3b82f6",
        secondary: "#dbeafe",
        background: "#eff6ff",
        text: "#1e3a8a"
      }
    };
  }
};

export const regenerateChapterMetadata = async (
  role: string,
  company: string,
  title: string,
  description: string
): Promise<Omit<StoryResponse, 'title' | 'description' | 'dateRange'> | null> => {
  const ai = getAI();
  if (!ai) return null;

  const prompt = `
    Analyze this Career Chapter (written in first person):
    Role: "${role}" at "${company}"
    Title: "${title}"
    Description: "${description}"

    Based on this text:
    1. Select a representative Emoji.
    2. Extract 3 Industry Tags.
    3. Identify 3-4 Professional Skills.
    4. Identify 3-4 Tools/Technologies implied.
    5. Extract 3 Key Duties/Achievements (Convert to First Person if not already).
    6. Design a Color Theme.

    Return JSON only.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            emoji: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            skills: { type: Type.ARRAY, items: { type: Type.STRING } },
            tools: { type: Type.ARRAY, items: { type: Type.STRING } },
            duties: { type: Type.ARRAY, items: { type: Type.STRING } },
            theme: {
              type: Type.OBJECT,
              properties: {
                primary: { type: Type.STRING },
                secondary: { type: Type.STRING },
                background: { type: Type.STRING },
                text: { type: Type.STRING },
              },
              required: ['primary', 'secondary', 'background', 'text']
            }
          },
          required: ['emoji', 'tags', 'skills', 'tools', 'duties', 'theme']
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error("Error regenerating metadata:", error);
    return null;
  }
};

export const generateLocationImage = async (company: string, description: string): Promise<string | null> => {
  const ai = getAI();
  if (!ai) return null;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{
          text: `Create a cinematic, photorealistic image representing the professional environment of ${company}. 
                 Context: ${description}. 
                 Style: Architectural Digest, Modern Office, High Tech, or Minimalist Workspace depending on the industry.
                 Golden hour lighting, highly detailed, 4k. 
                 Do not include text in the image.`
        }]
      },
      config: {}
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null; 
  }
};