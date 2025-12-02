import React, { useState } from 'react';
import { ThumbnailConcept } from '../types';
import { generateThumbnailPreview } from '../services/gemini';
import { 
  ClipboardDocumentIcon, 
  PhotoIcon, 
  SparklesIcon,
  PaintBrushIcon,
  EyeIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';

interface ConceptCardProps {
  concept: ThumbnailConcept;
  index: number;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ concept, index }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerateImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = await generateThumbnailPreview(concept.imagePrompt);
      setImageUrl(url);
    } catch (e) {
      setError("Failed to generate preview. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(concept.imagePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to extract hex codes for display
  const extractColors = (text: string) => {
    const hexRegex = /#[0-9A-Fa-f]{6}/g;
    const matches = text.match(hexRegex);
    return matches || [];
  };

  const colors = extractColors(concept.colorPalette);

  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden shadow-2xl flex flex-col h-full hover:border-gray-600 transition-colors duration-300">
      {/* Header */}
      <div className="bg-[#252525] p-4 border-b border-gray-800 flex justify-between items-center">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">#{index + 1}</span>
          Concept
        </h3>
        <div className="flex gap-1">
           {colors.map((color, i) => (
             <div key={i} className="w-6 h-6 rounded-full border border-gray-600" style={{ backgroundColor: color }} title={color} />
           ))}
        </div>
      </div>

      <div className="p-6 flex-grow space-y-6">
        
        {/* Hook */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-red-400 font-semibold">
            <SparklesIcon className="w-5 h-5" />
            <h4>The Hook</h4>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{concept.hook}</p>
        </div>

        {/* Visual Scene */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-400 font-semibold">
            <EyeIcon className="w-5 h-5" />
            <h4>Visual Scene</h4>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{concept.visualScene}</p>
        </div>

        {/* Text Overlay */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-yellow-400 font-semibold">
            <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
            <h4>Text Overlay</h4>
          </div>
          <p className="text-white text-lg font-black tracking-wide bg-black/30 p-2 rounded border border-gray-700 inline-block">
            {concept.textOverlay}
          </p>
        </div>

         {/* Palette Description */}
         <div className="space-y-2">
          <div className="flex items-center gap-2 text-purple-400 font-semibold">
            <PaintBrushIcon className="w-5 h-5" />
            <h4>Color Strategy</h4>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{concept.colorPalette}</p>
        </div>
      </div>

      {/* Image Preview Section */}
      <div className="border-t border-gray-800 bg-[#151515] p-4">
        {imageUrl ? (
          <div className="relative group rounded-lg overflow-hidden aspect-video border border-gray-700">
            <img src={imageUrl} alt="Generated Thumbnail" className="w-full h-full object-cover" />
            <a 
              href={imageUrl} 
              download={`thumbnail-concept-${index+1}.png`}
              className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M7.5 12 12 16.5m0 0 4.5-4.5M12 16.5v-9" />
              </svg>
            </a>
          </div>
        ) : (
          <div className="bg-[#0a0a0a] rounded-lg border-2 border-dashed border-gray-800 aspect-video flex flex-col items-center justify-center p-6 text-center">
            {loading ? (
              <div className="flex flex-col items-center gap-3 animate-pulse">
                <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-400 text-sm">Generating AI Preview...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                 <PhotoIcon className="w-10 h-10 text-gray-600" />
                 <p className="text-gray-500 text-xs">Visualize this concept with Gemini 2.5 Flash Image</p>
                 {error && <p className="text-red-400 text-xs">{error}</p>}
                 <button 
                  onClick={handleGenerateImage}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors border border-gray-700"
                 >
                   Generate Preview
                 </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Prompt Code Block */}
      <div className="bg-black p-4 border-t border-gray-800">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Image Prompt</span>
          <button 
            onClick={handleCopyPrompt}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
          >
            {copied ? (
              <span className="text-green-500 font-bold">Copied!</span>
            ) : (
              <>
                <ClipboardDocumentIcon className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>
        <div className="relative">
          <pre className="text-xs text-green-400 font-mono overflow-x-auto p-2 bg-[#111] rounded border border-gray-800 whitespace-pre-wrap break-words max-h-32 overflow-y-auto">
            {concept.imagePrompt}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ConceptCard;