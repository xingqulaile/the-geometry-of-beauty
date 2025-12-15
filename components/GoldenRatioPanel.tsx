
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, RefreshCcw } from 'lucide-react';
import { playSwooshSound, playClickSound, playPopSound } from '../utils/audio';

// Math: Golden Ratio (1 : 1.618033...)

const PHI = (1 + Math.sqrt(5)) / 2; // ~1.618
const BASE_H = 350;
const BASE_W = BASE_H * PHI; // ~566

interface SpiralStep {
  id: number;
  x: number;
  y: number;
  size: number;
  arcPath: string;
  orientation: 'left' | 'top' | 'right' | 'bottom';
  remainder: { x: number, y: number, w: number, h: number };
}

export const GoldenRatioPanel: React.FC = () => {
  const [step, setStep] = useState(0);

  // Real-time calculation for render
  const steps: SpiralStep[] = [];
  {
      let x=0, y=0, w=BASE_W, h=BASE_H;
      for(let i=0; i<=step && i<9; i++) {
          const orientation = ['left', 'top', 'right', 'bottom'][i % 4];
          let size = 0;
          let arc = '';
          let sqX=0, sqY=0;

          if (orientation === 'left') {
              size = h;
              sqX = x; sqY = y;
              arc = `M ${x},${y+size} A ${size},${size} 0 0 1 ${x+size},${y}`;
              x += size; w -= size;
          } else if (orientation === 'top') {
              size = w;
              sqX = x; sqY = y;
              arc = `M ${x},${y} A ${size},${size} 0 0 1 ${x+size},${y+size}`;
              y += size; h -= size;
          } else if (orientation === 'right') {
              size = h;
              sqX = x + w - size; sqY = y;
              arc = `M ${x+w},${y} A ${size},${size} 0 0 1 ${x+w-size},${y+size}`;
              w -= size;
          } else if (orientation === 'bottom') {
              size = w;
              sqX = x; sqY = y + h - size;
              arc = `M ${x+w},${y+h} A ${size},${size} 0 0 1 ${x},${y+h-size}`;
              h -= size;
          }

          steps.push({
              id: i,
              x: sqX,
              y: sqY,
              size,
              arcPath: arc,
              orientation: orientation as any,
              remainder: { x, y, w, h }
          });
      }
  }

  const activeStep = steps[steps.length - 1];
  const activeRect = activeStep ? activeStep.remainder : { x: 0, y: 0, w: BASE_W, h: BASE_H };

  const handleCut = () => {
    if (step < 8) {
        playSwooshSound();
        setStep(s => s + 1);
    }
  };

  const handleReset = () => {
    playPopSound();
    setStep(0);
  };

  return (
    <div className="h-full w-full bg-greek-50 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#8e6b29 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="z-10 text-center mb-8 mt-12 md:mt-0">
        <div className="inline-block px-3 py-1 bg-greek-100 text-greek-900 text-xs font-bold tracking-widest uppercase mb-2 rounded-sm">
          黄金螺旋
        </div>
        <h2 className="text-4xl font-serif text-greek-900 mb-1">1 : φ</h2>
        <p className="text-greek-700 italic opacity-80 font-serif">"艺术家的浪漫之梦"</p>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center w-full">
        <div className="relative">
          <svg 
            width={Math.min(600, window.innerWidth - 60)} 
            viewBox={`0 0 ${BASE_W} ${BASE_H}`}
            className="drop-shadow-2xl shadow-greek-900/20 bg-white"
          >
            <rect x="0" y="0" width={BASE_W} height={BASE_H} fill="white" />

            {/* Render Processed Squares */}
            <AnimatePresence>
                {steps.map((s, index) => (
                    <g key={s.id}>
                        {/* The Removed Square */}
                        <motion.rect
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            x={s.x}
                            y={s.y}
                            width={s.size}
                            height={s.size}
                            fill="#f5edd6"
                            stroke="#c59d45"
                            strokeWidth={1}
                        />
                        {/* The Spiral Segment */}
                        <motion.path
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            d={s.arcPath}
                            fill="none"
                            stroke="#8e6b29"
                            strokeWidth={3}
                            strokeLinecap="round"
                        />
                    </g>
                ))}
            </AnimatePresence>

            {/* Highlight Remainder */}
            <motion.rect
                layout
                animate={{
                    x: activeRect.x,
                    y: activeRect.y,
                    width: activeRect.w,
                    height: activeRect.h
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                fill="#ebdab0"
                fillOpacity={0.3}
                stroke="#8e6b29"
                strokeWidth={3}
            />

             {/* Text Label */}
             <motion.foreignObject
                animate={{
                    x: activeRect.x,
                    y: activeRect.y,
                    width: activeRect.w,
                    height: activeRect.h
                }}
                className="pointer-events-none"
            >
                <div className="w-full h-full flex items-center justify-center">
                    <div className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-greek-900 text-xs md:text-sm font-mono shadow-sm">
                        1:1.618
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
          disabled={step >= 8}
          className="flex items-center gap-2 px-6 py-3 bg-greek-700 hover:bg-greek-900 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded shadow-lg transition-colors"
        >
          <Layers size={20} />
          <span>移除正方形 {step > 0 && `(${step})`}</span>
        </motion.button>
         <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="p-3 bg-white text-greek-700 border border-greek-200 hover:bg-greek-50 rounded shadow-sm transition-colors"
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
                className="absolute bottom-4 right-4 text-xs text-greek-600 max-w-[200px] text-right hidden md:block"
            >
                自然的密码: 螺旋以正方形生长 <br/>
                见于贝壳、星系与神庙之中
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
