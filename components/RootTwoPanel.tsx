
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, RefreshCcw } from 'lucide-react';
import { playSwooshSound, playClickSound, playPopSound } from '../utils/audio';

// Math Logic: A4 aspect ratio (1 : 1.414)
// W = 1, H = sqrt(2)

interface RectData {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  level: number;
}

const INITIAL_WIDTH = 400;
const INITIAL_HEIGHT = 400 * Math.sqrt(2); // ~565.68

export const RootTwoPanel: React.FC = () => {
  const [step, setStep] = useState(0);

  const getActiveRect = (currentStep: number) => {
    let x = 0;
    let y = 0;
    let w = INITIAL_WIDTH;
    let h = INITIAL_HEIGHT;

    for (let i = 0; i < currentStep; i++) {
      if (h > w) {
        h = h / 2;
      } else {
        w = w / 2;
      }
    }
    return { x, y, width: w, height: h };
  };

  const activeRect = getActiveRect(step);
  
  const gridRects: RectData[] = [];
  for(let i=0; i<=step; i++) {
      gridRects.push({...getActiveRect(i), id: i, level: i});
  }

  const handleCut = () => {
    if (step < 7) {
        playSwooshSound();
        setStep(s => s + 1);
    }
  };

  const handleReset = () => {
    playPopSound();
    setStep(0);
  };

  return (
    <div className="h-full w-full bg-song-50 flex flex-col items-center justify-center p-8 relative overflow-hidden group">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#346f74 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="z-10 text-center mb-8 mt-12 md:mt-0">
        <div className="inline-block px-3 py-1 bg-song-100 text-song-900 text-xs font-bold tracking-widest uppercase mb-2 rounded-sm">
          宋式营造
        </div>
        <h2 className="text-4xl font-serif text-song-900 mb-1">1 : √2</h2>
        <p className="text-song-700 italic opacity-80 font-serif">"工程师的严谨诗篇"</p>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center w-full">
        {/* Visualization Area */}
        <div className="relative">
          <svg 
            width="300" 
            height={300 * Math.sqrt(2)} 
            viewBox={`0 0 ${INITIAL_WIDTH} ${INITIAL_HEIGHT}`}
            className="drop-shadow-2xl shadow-song-900/20 bg-white"
          >
            {/* Base Paper */}
            <rect x="0" y="0" width={INITIAL_WIDTH} height={INITIAL_HEIGHT} fill="white" />

            {/* Grid Lines */}
            <AnimatePresence>
                {gridRects.map((rect) => (
                    <motion.rect
                        key={rect.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        x={rect.x}
                        y={rect.y}
                        width={rect.width}
                        height={rect.height}
                        fill="transparent"
                        stroke="#346f74"
                        strokeWidth={Math.max(1, 4 - rect.level * 0.5)}
                        className="opacity-20"
                    />
                ))}
            </AnimatePresence>

            {/* Active Rectangle Highlight */}
            <motion.rect
              layout
              initial={false}
              animate={{
                x: activeRect.x,
                y: activeRect.y,
                width: activeRect.width,
                height: activeRect.height
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              fill="#d5eff0"
              fillOpacity={0.6}
              stroke="#346f74"
              strokeWidth={4}
            />
            
            {/* Text Label */}
            <motion.foreignObject
                animate={{
                    x: activeRect.x,
                    y: activeRect.y,
                    width: activeRect.width,
                    height: activeRect.height
                }}
                className="pointer-events-none"
            >
                <div className="w-full h-full flex items-center justify-center">
                    <div className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-song-900 text-xs md:text-sm font-mono shadow-sm">
                        1:1.414
                    </div>
                </div>
            </motion.foreignObject>
          </svg>
        </div>
      </div>

      <div className="z-20 mt-8 flex gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleCut}
          disabled={step >= 7}
          className="flex items-center gap-2 px-6 py-3 bg-song-700 hover:bg-song-900 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded shadow-lg transition-colors"
        >
          <Scissors size={20} />
          <span>减半 (A{step} → A{step+1})</span>
        </motion.button>
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="p-3 bg-white text-song-700 border border-song-200 hover:bg-song-50 rounded shadow-sm transition-colors"
            title="重置"
        >
            <RefreshCcw size={20} />
        </motion.button>
      </div>

      <AnimatePresence>
        {step > 0 && (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-4 right-4 text-xs text-song-500 max-w-[200px] text-right hidden md:block"
            >
                无限自相似: 从 A4 到 A5, 再到 A6... <br/>
                比例永恒不变
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
