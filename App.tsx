import React, { useState } from 'react';
import { generateConcepts } from './services/gemini';
import { ThumbnailConcept, LoadingState } from './types';
import ConceptCard from './components/ConceptCard';
import { FireIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

const App: React.FC = () => {
  const [videoTitle, setVideoTitle] = useState('');
  const [concepts, setConcepts] = useState<ThumbnailConcept[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle.trim()) return;

    setLoadingState(LoadingState.GENERATING_CONCEPTS);
    setError(null);
    setConcepts([]);

    try {
      const results = await generateConcepts(videoTitle);
      setConcepts(results);
      setLoadingState(LoadingState.IDLE);
    } catch (err) {
      setError("Failed to generate concepts. Please check your API key or try again.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-100 flex flex-col">
      {/* Navbar */}
      <header className="border-b border-gray-800 bg-[#161616] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 p-1.5 rounded-lg">
              <FireIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">ThumbStopper <span className="text-red-600">AI</span></h1>
          </div>
          <div className="text-xs text-gray-500 font-mono">Powered by Gemini 2.5 Flash</div>
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        {/* Hero / Input Section */}
        <section className={`transition-all duration-500 ease-in-out ${concepts.length > 0 ? 'py-8 border-b border-gray-800' : 'py-32 flex-grow flex items-center'}`}>
          <div className="max-w-3xl mx-auto px-4 w-full">
            <div className={`text-center mb-8 ${concepts.length > 0 ? 'hidden' : 'block'}`}>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                Stop the Scroll. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  Explode your CTR.
                </span>
              </h2>
              <p className="text-gray-400 text-lg">
                Generate 3 viral thumbnail concepts, psychological hooks, and visual prompts instantly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex bg-black rounded-xl p-1">
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="Enter your video title (e.g., 'I survived 50 hours in Antarctica')"
                  className="w-full bg-transparent text-white placeholder-gray-500 text-lg px-6 py-4 outline-none rounded-l-xl"
                  disabled={loadingState === LoadingState.GENERATING_CONCEPTS}
                />
                <button
                  type="submit"
                  disabled={loadingState === LoadingState.GENERATING_CONCEPTS || !videoTitle.trim()}
                  className="bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white px-8 py-2 rounded-r-lg font-bold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-l border-gray-800"
                >
                  {loadingState === LoadingState.GENERATING_CONCEPTS ? (
                    <span className="animate-pulse">Thinking...</span>
                  ) : (
                    <>
                      Generate <ArrowRightIcon className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
            
            {error && (
              <div className="mt-4 p-4 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400 text-sm text-center">
                {error}
              </div>
            )}
          </div>
        </section>

        {/* Results Section */}
        {concepts.length > 0 && (
          <section className="flex-grow bg-[#0a0a0a] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Generated Concepts</h3>
                <span className="text-sm text-gray-500">Based on: "{videoTitle}"</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {concepts.map((concept, index) => (
                  <ConceptCard key={index} concept={concept} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-gray-800 py-8 bg-[#161616] mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} ThumbStopper AI. Designed for Creators.
        </div>
      </footer>
    </div>
  );
};

export default App;