# LifeJourney - Interactive Professional Portfolio

**Created by Gagandeep Dhaliwal**

A visual, interactive storytelling timeline that maps a professional journey, enhanced with AI-generated narratives and dynamic animations.

## 🌟 Features

*   **Interactive Timeline:** A scrolling SVG path visualizer that maps career chapters.
*   **AI-Powered Narratives:** Uses Google Gemini API to generate first-person storytelling content for each role.
*   **Dynamic Theming:** Color themes adapt automatically to the brand identity of the selected role.
*   **Animations:**
    *   Physics-based floating background elements.
    *   Falling nature effects (leaves, trees) for the intro.
    *   Animated character avatar that follows the journey.
*   **Dark/Light Mode:** Fully supported UI with distinct gradients and visual styles.

## 🛠️ Tech Stack

*   **Frontend:** React, TypeScript, Tailwind CSS
*   **Animations:** Framer Motion
*   **AI:** Google Gemini API (`@google/genai`)
*   **Icons:** Lucide React

## 🚀 How to Run

Since this project uses ES Modules directly in the browser (via `importmap` in `index.html`), you can run it using any static file server.

1.  **Clone the repository.**
2.  **Serve the files:**
    *   Using Python: `python3 -m http.server`
    *   Using VS Code: Install the "Live Server" extension and click "Go Live".
    *   Using Node: `npx serve`
3.  **Open in Browser:** Navigate to `http://localhost:8000` (or the port provided).

## 🔑 Environment Variables

This application requires a Google Gemini API Key to function fully (for generating new content).

If running in a local build environment (like Vite/CRA), ensure you have a `.env` file:

```
API_KEY=your_google_gemini_api_key_here
```

*Note: The current `index.html` setup assumes the key is injected via the environment or build process.*
