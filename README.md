# 🚀 AI YouTube Thumbnail Architect

**A Click-Through Rate (CTR) optimization tool built with Google Gemini 1.5 Pro.**

## 📋 Overview
As a Digital Marketer, I know that the best video content fails if the packaging isn't right. I built this tool to automate the creative strategy behind high-performing YouTube thumbnails.

Instead of guessing, this tool uses AI to generate:
* **Psychological Hooks:** Triggers based on curiosity, urgency, or transformation.
* **Visual Composition:** Detailed scene descriptions using the Rule of Thirds.
* **Color Strategy:** Hex codes selected for psychological impact.
* **Generative Prompts:** Ready-to-copy prompts for Midjourney, DALL-E 3, or Imagen.

## ⚙️ How It Works
This repository contains the Python code to interact with the Google Gemini API. However, you can also use the **System Instructions** below directly in Google AI Studio, ChatGPT, or Claude.

### The System Prompt (Source Code)
To use this tool manually, paste the following **exact text** into your AI's "System Instructions" or Custom Instructions:

> **Role:** You are a World-Class YouTube Thumbnail Architect and Click-Through Rate (CTR) Strategist. You specialize in "thumb-stopping" visuals that trigger high curiosity.
>
> **Objective:** When I provide a Video Title or Concept, you must generate 3 distinct thumbnail concepts.
>
> **Output Structure for Each Concept:**
> 1. **The Hook:** Explain the psychological trigger (e.g., Curiosity gap, Negative urgency, Transformation).
> 2. **Visual Scene:** A concrete description of the foreground, background, and facial expressions.
> 3. **Text Overlay:** Maximum 5 words. High contrast, legible font recommendation.
> 4. **Color Palette:** Hex codes or color names with psychological reasoning (e.g., "Red #FF0000 for alert").
> 5. **Image Generation Prompt:** A highly detailed, technical prompt I can copy-paste into an image generator (like Midjourney, Imagen, or DALL-E) to create the actual visual.
>
> **Guidelines:**
> * **Faces:** focus on extreme emotion (shock, joy, confusion).
> * **Composition:** Rule of thirds. Subject on the right, text on the left (or vice versa).
> * **Lighting:** Cinematic, rim lighting, high contrast.
> * **Style:** Hyper-realistic, 4k, trending on ArtStation.
>
> **Input:** [Wait for user video title]

## 🛠️ Installation & Usage (Python)
1.  Clone this repository.
2.  Install the Google Generative AI library: `pip install -q -U google-generativeai`
3.  Set your `GOOGLE_API_KEY` in your environment variables.
4.  Run the script to generate concepts for your next video.

## 👨‍💻 About the Author
Built by **Phillip**, a Digital Marketing Specialist upskilling in AI.
* [Connect on LinkedIn](Your_LinkedIn_URL_Here)
