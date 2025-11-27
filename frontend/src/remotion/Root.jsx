import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

// --- SCENE 1: BUBBLE SORT VISUALIZATION ---
const SortingScene = ({ params }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const data = params?.data || [5, 2, 8, 1, 9];
  
  // Simple entry animation (Fade in)
  const opacity = interpolate(frame, [0, 20], [0, 1]);
  
  return (
    <AbsoluteFill className="bg-white flex flex-col items-center justify-center gap-10">
      <h1 style={{ opacity }} className="text-6xl font-bold text-black mb-10">
        Bubble Sort Algorithm
      </h1>
      
      <div className="flex items-end gap-4 h-[400px]">
        {data.map((val, index) => {
          // Spring animation for bars popping up staggered
          const height = spring({
            frame: frame - (index * 5),
            fps,
            config: { damping: 100 }
          });
          
          return (
            <div
              key={index}
              style={{
                height: val * 40, // Scale height multiplier
                width: 60,
                backgroundColor: '#3b82f6', // Tailwind blue-500
                transform: `scaleY(${height})`,
                transformOrigin: 'bottom',
                borderRadius: '8px 8px 0 0'
              }}
              className="flex items-end justify-center pb-2 text-white font-bold text-xl shadow-xl"
            >
              {val}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// --- SCENE 2: GEOMETRY VISUALIZATION ---
const GeometryScene = ({ params }) => {
  const frame = useCurrentFrame();
  const rotation = frame * 2; // Rotate 2 degrees per frame

  const shapeStyle = {
    width: 300, 
    height: 300, 
    backgroundColor: params?.color || 'red',
    borderRadius: params?.shape === 'circle' ? '50%' : '20px',
    transform: `rotate(${rotation}deg)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    border: '10px solid rgba(255,255,255,0.2)'
  };

  return (
    <AbsoluteFill className="bg-gray-900 flex items-center justify-center">
       {/* Background Grid inside video */}
       <div className="absolute inset-0 opacity-10" 
            style={{ 
                backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)',
                backgroundSize: '50px 50px'
            }} 
       />
       <div style={shapeStyle}>
          <span className="text-white font-bold text-3xl mix-blend-difference">
            {params?.shape?.toUpperCase()}
          </span>
       </div>
    </AbsoluteFill>
  );
};

const DefaultScene = () => (
  <AbsoluteFill className="bg-black flex items-center justify-center">
    <h1 className="text-white text-5xl font-bold">Ready to Animate</h1>
  </AbsoluteFill>
);

// --- MAIN SWITCH COMPONENT ---
export const RemotionRoot = ({ config }) => {
  // If no config exists, show the default screen
  if (!config) return <DefaultScene />;

  // Render the correct scene based on the "type"
  if (config.type === "SORTING") return <SortingScene params={config.params} />;
  if (config.type === "GEOMETRY") return <GeometryScene params={config.params} />;

  // Fallback
  return <DefaultScene />;
};