<div align="center">

# 🎨 Gemini AI Starter Template

### A Clean, Production-Ready React Foundation for AI Image & Video Generation

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite)

*Powered by Google Gemini's cutting-edge generative AI models*

[Live Demo](https://gemini-ai-starter-template.vercel.app/) • [Installation](#-installation) • [Documentation](#-documentation)

</div>

---

## ✨ Features

🖼️ **Image Generation** - Create stunning images using Gemini's `gemini-2.5-flash-image` (Nano Banana) model  
🎬 **Video Generation** - Generate videos with `veo-3.1-fast-generate-preview` (Veo 3) in 720p or 1080p  
⚡ **Lightning Fast** - Built with Vite for instant hot module replacement  
🎯 **Type-Safe** - Full TypeScript support with comprehensive type definitions  
🛡️ **Error Handling** - Robust null safety checks and user-friendly error messages  
🎨 **Clean UI** - Minimal, responsive design with Tailwind CSS  
📦 **Ready to Fork** - Well-organized codebase perfect for learning and extending  

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Google Gemini API key ([Get one here](https://aistudio.google.com/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/therohitjagan/Gemini-AI-Starter-Template.git
   cd gemini-ai-starter-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser** to `http://localhost:3000` 🎉

---

## 🏗️ Project Structure

```
gemini-ai-starter-template/
├── services/
│   └── geminiService.ts    # Clean API abstraction for Gemini models
├── App.tsx                 # Main application logic and UI
├── types.ts                # TypeScript interfaces and enums
├── index.tsx               # React entry point
├── index.html              # HTML template
├── index.css               # Global styles
├── vite.config.ts          # Vite configuration
└── .env.example            # Environment template
```

---

## 💻 Usage

### Generating Images

1. Select **"Image (Nano Banana)"** mode
2. Enter a creative prompt (e.g., *"A futuristic cyberpunk cat with neon eyes"*)
3. Click **"Generate Now"**
4. Your image appears in seconds!

### Generating Videos

1. Select **"Video (Veo 3)"** mode
2. Choose resolution (720p or 1080p)
3. Enter your prompt (e.g., *"A neon hologram of a shark swimming in space"*)
4. Click **"Generate Now"**
5. Wait 1-3 minutes for your video to render

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | Modern UI framework with latest features |
| **TypeScript** | Type-safe development experience |
| **Vite** | Next-generation frontend tooling |
| **Tailwind CSS** | Utility-first CSS framework |
| **Google Gemini AI** | State-of-the-art generative AI models |

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | ✅ Yes |

### Supported Models

- **Image**: `gemini-2.5-flash-image` (Nano Banana)
- **Video**: `veo-3.1-fast-generate-preview` (Veo 3)

---

## 🚀 Building for Production

```bash
npm run build
```

The optimized production build will be generated in the `dist/` directory.

### Preview production build locally:
```bash
npm run preview
```

---

## 🔐 Security Best Practices

> ⚠️ **Important**: This starter template exposes the API key on the client-side for simplicity. For production applications, you **must** move API calls to a secure backend.

### Recommended Architecture for Production:

```
Client (React) → Backend API (Node.js/Express) → Gemini API
```

**Example backend endpoint:**

```javascript
import express from 'express';
import { GoogleGenAI } from '@google/genai';

const app = express();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/generate-image', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] }
    });
    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
```

---

## 💡 Extension Ideas

Ready to take this starter to the next level? Here are some ideas:

- **🔐 Authentication** - Add user accounts with Clerk or Firebase Auth
- **☁️ Cloud Storage** - Store generated content in AWS S3 or Google Cloud Storage
- **🗄️ Database** - Save prompt history and metadata with MongoDB or PostgreSQL
- **💳 Monetization** - Implement credit-based system with Stripe
- **🎛️ Advanced Controls** - Add aspect ratio, style presets, and quality settings
- **📊 Analytics** - Track usage patterns and popular prompts
- **🤝 Social Features** - Let users share and remix creations
- **🎨 Image-to-Video** - Upload starting frames for Veo video generation

---

## 🐛 Troubleshooting

### Build Errors

**Issue**: TypeScript cannot find `@google/genai`  
**Solution**: Run `npm install` to ensure all dependencies are installed

### API Errors

**Issue**: "No image generated. The API returned an empty response."  
**Solution**: Verify your `GEMINI_API_KEY` is valid and has proper permissions

**Issue**: "Video generation failed: No download URI returned"  
**Solution**: Your prompt may have triggered content policy restrictions. Try a different prompt.

### Environment Issues

**Issue**: Changes to `.env.local` not taking effect  
**Solution**: Restart the dev server (`npm run dev`)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Google Gemini AI](https://ai.google.dev/)
- Powered by [Vite](https://vitejs.dev/)
- UI powered by [Tailwind CSS](https://tailwindcss.com/)

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

Made with ❤️ by [Rohit Jagan](https://github.com/therohitjagan)

[Report Bug](https://github.com/therohitjagan/Gemini-AI-Starter-Template/issues) • [Request Feature](https://github.com/therohitjagan/Gemini-AI-Starter-Template/issues)

</div>
