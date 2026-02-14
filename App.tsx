
import React, { useState } from 'react';
import { GenerationType, GenerationState } from './types';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState<GenerationType>(GenerationType.IMAGE);
  const [videoResolution, setVideoResolution] = useState<'720p' | '1080p'>('720p');
  const [state, setState] = useState<GenerationState>({
    isLoading: false,
    error: null,
    resultUrl: null,
    status: ''
  });


  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setState({
      isLoading: true,
      error: null,
      resultUrl: null,
      status: mode === GenerationType.IMAGE ? 'Generating image...' : `Starting ${videoResolution} video operation...`
    });

    try {
      let url = '';
      if (mode === GenerationType.IMAGE) {
        url = await geminiService.generateImage(prompt);
      } else {
        url = await geminiService.generateVideo(prompt, videoResolution, (msg) => {
          setState(prev => ({ ...prev, status: msg }));
        });
      }
      setState({ isLoading: false, error: null, resultUrl: url, status: 'Completed!' });
    } catch (err: any) {
      console.error(err);
      setState({
        isLoading: false,
        error: err.message || "An unexpected error occurred",
        resultUrl: null,
        status: 'Failed'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-100 py-6 px-4 mb-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Gemini AI Starter</h1>
            <p className="text-slate-500">Minimal Foundation for Image & Video Generation</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-20">
        {/* Mode Selector */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-8 w-fit mx-auto">
          <button
            onClick={() => setMode(GenerationType.IMAGE)}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${mode === GenerationType.IMAGE ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            Image (Nano Banana)
          </button>
          <button
            onClick={() => setMode(GenerationType.VIDEO)}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${mode === GenerationType.VIDEO ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            Video (Veo 3)
          </button>
        </div>

        {/* Input Section */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={mode === GenerationType.IMAGE ? "e.g., A futuristic cyberpunk cat..." : "e.g., A neon hologram of a shark swimming in space..."}
            className="w-full h-32 bg-white border border-slate-200 rounded-xl p-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
          />

          <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Resolution Selector for Video */}
            {mode === GenerationType.VIDEO && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-600">Resolution:</span>
                <select
                  value={videoResolution}
                  onChange={(e) => setVideoResolution(e.target.value as '720p' | '1080p')}
                  className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="720p">720p</option>
                  <option value="1080p">1080p</option>
                </select>
              </div>
            )}
            <div className="flex-1" />
            <button
              onClick={handleGenerate}
              disabled={state.isLoading || !prompt.trim()}
              className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              {state.isLoading ? 'Generating...' : 'Generate Now'}
            </button>
          </div>
        </div>

        {/* Status Area */}
        {state.isLoading && (
          <div className="flex flex-col items-center justify-center p-12 text-center animate-pulse">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-600 font-medium">{state.status}</p>
          </div>
        )}

        {/* Error State */}
        {state.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-8 text-center">
            {state.error}
          </div>
        )}

        {/* Result Area */}
        {state.resultUrl && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 overflow-hidden shadow-inner">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 px-2">Generated {mode}</h3>
            {mode === GenerationType.IMAGE ? (
              <img
                src={state.resultUrl}
                alt="Generated result"
                className="w-full h-auto rounded-lg shadow-xl max-h-[600px] object-contain bg-black"
              />
            ) : (
              <video
                src={state.resultUrl}
                controls
                autoPlay
                loop
                className="w-full h-auto rounded-lg shadow-xl aspect-video bg-black"
              />
            )}
          </div>
        )}

        {!state.isLoading && !state.resultUrl && !state.error && (
          <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400">
            <svg className="w-12 h-12 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>Your creation will appear here</p>
          </div>
        )}
      </main>

      {/* Extension Ideas Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 border-t border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 mb-8 text-center">Starter Template Extension Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-50 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-2">Auth & User Profiles</h3>
            <p className="text-sm text-slate-600">Add Clerk or Firebase Auth to allow users to save their creations and manage their account settings.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-2">Cloud Storage</h3>
            <p className="text-sm text-slate-600">Instead of blobs, upload generated results to AWS S3 or Google Cloud Storage for permanent hosting.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-2">Database Layer</h3>
            <p className="text-sm text-slate-600">Use MongoDB or PostgreSQL to store prompt history and metadata for a searchable gallery.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-2">Monetization</h3>
            <p className="text-sm text-slate-600">Integrate Stripe or Lemon Squeezy for a credit-based system (e.g., $10 for 50 images).</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-2">Style Controls</h3>
            <p className="text-sm text-slate-600">Add UI dropdowns for Aspect Ratio, Resolution, and predefined style keywords (Cinematic, 3D, etc.).</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-2">Advanced Editing</h3>
            <p className="text-sm text-slate-600">Implement 'Image-to-Video' where users can upload a starting frame for Veo video generation.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
