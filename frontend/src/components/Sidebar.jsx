import React from "react";
import { Video, Sparkles, Code2 } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export const Sidebar = ({ prompt, setPrompt, onGenerate, isLoading, jsonOutput }) => {
  return (
    <div className="w-[400px] h-full bg-black border-r border-gray-800 flex flex-col p-6 shadow-2xl z-20 relative flex-shrink-0">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/50">
          <Video className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold tracking-wide text-white">
          DevForge Animator
        </h1>
      </div>

      {/* Input Section */}
      <div className="space-y-4 mb-8">
        <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Describe your educational concept
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Show bubble sort with 5 bars..."
          className="w-full h-32 bg-gray-900 border border-gray-800 rounded-xl p-4 text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none text-sm font-mono"
        />
        
        <button
          onClick={onGenerate}
          disabled={isLoading || !prompt}
          className="w-full h-12 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Generate Animation
            </>
          )}
        </button>
      </div>

      {/* JSON Viewer Section (The "Underlying Logic") */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center gap-2 mb-3">
          <Code2 className="w-4 h-4 text-gray-500" />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Animation Instructions (JSON)
          </span>
        </div>
        
        <div className="flex-1 bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden relative group">
          {jsonOutput ? (
            <div className="absolute inset-0 overflow-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
               <SyntaxHighlighter
                language="json"
                style={vscDarkPlus}
                customStyle={{
                  background: 'transparent',
                  padding: '1.5rem',
                  fontSize: '0.85rem',
                  lineHeight: '1.5',
                  margin: 0,
                }}
                wrapLongLines={true}
              >
                {JSON.stringify(jsonOutput, null, 2)}
              </SyntaxHighlighter>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-600 text-sm italic p-6 text-center">
              Instructions will appear here after generation...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};