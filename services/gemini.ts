import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ThumbnailConcept } from "../types";

// Initialize Gemini Client
// @ts-ignore
const apiKey = process.env.API_KEY; 
const ai = new GoogleGenAI({ apiKey: apiKey });

const conceptsSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      hook: { type: Type.STRING, description: "The psychological trigger explained." },
      visualScene: { type: Type.STRING, description: "Concrete description of foreground, background, and expressions." },
      textOverlay: { type: Type.STRING, description: "Max 5 words text overlay." },
      colorPalette: { type: Type.STRING, description: "Hex codes and reasoning." },
      imagePrompt: { type: Type.STRING, description: "Detailed prompt for image generation." },
    },
    required: ["hook", "visualScene", "textOverlay", "colorPalette", "imagePrompt"],
  },
};

export const generateConcepts = async (videoTitle: string): Promise<ThumbnailConcept[]> => {
  try {
    const prompt = `
      Role: You are a World-Class YouTube Thumbnail Architect and Click-Through Rate (CTR) Strategist.
      Objective: Generate 3 distinct thumbnail concepts for the video title: "${videoTitle}".
      
      Guidelines:
      - Faces: focus on extreme emotion (shock, joy, confusion).
      - Composition: Rule of thirds. Subject on the right, text on the left (or vice versa).
      - Lighting: Cinematic, rim lighting, high contrast.
      - Style: Hyper-realistic, 4k, trending on ArtStation.
      
      For each concept provide:
      1. The Hook (Psychological trigger)
      2. Visual Scene (Description)
      3. Text Overlay (Max 5 words)
      4. Color Palette (Hex codes + reasoning)
      5. Image Generation Prompt (Technical prompt for Midjourney/DALL-E/Imagen)
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: conceptsSchema,
        systemInstruction: "You are an expert CTR strategist. You prioritize high contrast, curiosity gaps, and extreme emotions.",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as ThumbnailConcept[];
  } catch (error) {
    console.error("Error generating concepts:", error);
    throw error;
  }
};

export const generateThumbnailPreview = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: prompt + " --ar 16:9 --v 6.0 style raw, photorealistic, 8k, youtube thumbnail style" } // Adding some bias for better results
        ]
      },
      config: {
        // Nano banana models do not support responseMimeType or schemas
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};