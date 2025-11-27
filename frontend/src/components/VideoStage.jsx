import React from "react";
import { Player } from "@remotion/player";
import { RemotionRoot } from "../remotion/Root"; // Imports the animation logic
import { Play } from "lucide-react";

export const VideoStage = ({ jsonConfig, isLoading }) => {
  
  // 1. STATE: WAITING FOR INPUT (Default View)
  if (!jsonConfig && !isLoading) {
    return (
      <div className="flex-1 bg-black bg-grid-pattern flex items-center justify-center relative overflow-hidden h-full">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none" />
        
        <div className="w-[500px] h-[500px] border-2 border-dashed border-gray-800 rounded-3xl flex flex-col items-center justify-center text-center p-12 bg-black/40 backdrop-blur-sm">
          <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mb-6">
            <Play className="w-8 h-8 text-gray-700 ml-1" />
          </div>
          <h2 className="text-2xl font-bold text-gray-300 mb-3">
            Waiting for render...
          </h2>
          <p className="text-gray-500 text-base max-w-sm">
            Generate an animation to see the Remotion player active here.
          </p>
        </div>
      </div>
    );
  }

  // 2. STATE: LOADING / PARSING (When you click Generate)
  if (isLoading) {
     return (
      <div className="flex-1 bg-black bg-grid-pattern flex items-center justify-center h-full">
        <div className="flex flex-col items-center animate-pulse">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-blue-400 font-mono tracking-widest uppercase text-sm mt-4">Parsing Prompt...</p>
        </div>
      </div>
     )
  }

  // 3. STATE: SHOW PLAYER (Video is ready)
  return (
    <div className="flex-1 bg-black bg-grid-pattern flex items-center justify-center p-12 relative h-full">
      <div className="relative w-full max-w-[800px] aspect-square shadow-2xl shadow-black">
        {/* Blue Accent Glow around the player */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl opacity-75 blur-sm" />
        
        <div className="relative w-full h-full bg-black rounded-xl overflow-hidden border border-gray-800">
          <Player
            component={RemotionRoot}
            inputProps={{ config: jsonConfig }} // Pass the JSON config to the video
            durationInFrames={300} // 10 seconds @ 30fps
            fps={30}
            compositionWidth={1080}
            compositionHeight={1080}
            style={{ width: "100%", height: "100%" }}
            controls // Adds Play/Pause/Seekbar
            autoPlay
            loop
          />
        </div>
      </div>
    </div>
  );
};