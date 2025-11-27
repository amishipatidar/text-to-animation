// import React from 'react';

// function App() {
//   return (
//     <div className="flex items-center justify-center h-screen bg-black text-white">
//       <h1 className="text-5xl font-bold text-blue-500">
//         Setup Complete! 
//       </h1>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { VideoStage } from './components/VideoStage';

function App() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [jsonConfig, setJsonConfig] = useState(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setJsonConfig(null); 

    try {
      // 1. SIMULATE API LATENCY (To show loading state)
      // In the future, this will be: await fetch('http://localhost:8080/generate', ...)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 2. MOCK PARSER LOGIC (Rule-Based for now)
      // This allows you to demo it without the backend connected yet
      const inputText = prompt.toLowerCase();
      let mockResponse;
      
      if (inputText.includes("sort")) {
        mockResponse = { 
          type: "SORTING", 
          params: { data: [5, 3, 8, 1, 9, 2], algorithm: "bubble" } 
        };
      } else {
        // Default to geometry
        mockResponse = { 
          type: "GEOMETRY", 
          params: { 
            shape: inputText.includes("circle") ? "circle" : "square", 
            color: inputText.includes("blue") ? "#3b82f6" : "#ef4444", 
            animation: "rotate" 
          } 
        };
      }

      setJsonConfig(mockResponse);

    } catch (error) {
      console.error("Failed to generate:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black font-sans selection:bg-blue-500/30">
      <Sidebar 
        prompt={prompt} 
        setPrompt={setPrompt} 
        onGenerate={handleGenerate}
        isLoading={isLoading}
        jsonOutput={jsonConfig}
      />
      <VideoStage 
        jsonConfig={jsonConfig}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
