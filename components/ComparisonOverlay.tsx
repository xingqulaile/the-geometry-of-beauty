
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface ComparisonOverlayProps {
  onClose: () => void;
}

export const ComparisonOverlay: React.FC<ComparisonOverlayProps> = ({ onClose }) => {
  const h = 300;
  const wRoot2 = h * Math.sqrt(2);
  const wGolden = h * 1.61803398875;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-stone-50 rounded-lg shadow-2xl max-w-3xl w-full overflow-hidden relative"
      >
        <div className="p-6 border-b border-stone-200 flex justify-between items-center bg-white">
          <h3 className="text-xl font-serif font-bold text-stone-800">视觉对比</h3>
          <button onClick={() => { playClickSound(); onClose(); }} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <X size={24} className="text-stone-500" />
          </button>
        </div>
        
        <div className="p-8 flex flex-col items-center">
          <p className="text-stone-600 mb-8 text-center max-w-lg">
            将两个矩形保持同一高度 ({h}px) 对齐。<br/>
            请注意 <strong>黄金矩形</strong> 比 <strong>√2 (根号2) 矩形</strong> 更加修长。
          </p>

          <div className="relative flex items-end justify-center">
             {/* Wrapper SVG */}
             <svg width={wGolden + 40} height={h + 40} className="overflow-visible">
                 
                 {/* Golden Rectangle (Back) */}
                 <motion.g
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                 >
                    <rect 
                        x="0" y="0" 
                        width={wGolden} 
                        height={h} 
                        fill="#ebdab0" 
                        stroke="#8e6b29" 
                        strokeWidth="2"
                        className="opacity-80"
                    />
                    <text x={wGolden / 2} y={-10} textAnchor="middle" className="fill-greek-700 text-xs font-bold uppercase">
                        黄金比例 (1.618)
                    </text>
                 </motion.g>

                 {/* Root 2 Rectangle (Front) */}
                 <motion.g
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                 >
                    <rect 
                        x="0" y="0" 
                        width={wRoot2} 
                        height={h} 
                        fill="#aee0e2" 
                        stroke="#346f74" 
                        strokeWidth="2"
                        className="opacity-80 mix-blend-multiply" 
                    />
                     <text x={wRoot2 / 2} y={h + 20} textAnchor="middle" className="fill-song-700 text-xs font-bold uppercase">
                        根号 2 (1.414)
                    </text>
                 </motion.g>
                 
                 {/* Dashed line showing the difference */}
                 <motion.line
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    x1={wRoot2} y1="0" x2={wRoot2} y2={h}
                    stroke="black" strokeDasharray="4 4" strokeWidth={1}
                 />
                 
                 <motion.line
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 1 }}
                     x1={wRoot2} y1={h/2} x2={wGolden} y2={h/2}
                     stroke="black" markerEnd="url(#arrow)"
                 />
                 <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#000" />
                    </marker>
                 </defs>
             </svg>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-8 w-full max-w-lg">
             <div className="bg-song-50 p-4 rounded border border-song-200">
                 <h4 className="font-bold text-song-900 font-serif">√2 (宋式/工业)</h4>
                 <p className="text-sm text-song-700 mt-1">见于标准纸张 (A4) 与《营造法式》。实用、模块化、稳重。</p>
             </div>
             <div className="bg-greek-50 p-4 rounded border border-greek-200">
                 <h4 className="font-bold text-greek-900 font-serif">黄金比 (希腊/自然)</h4>
                 <p className="text-sm text-greek-700 mt-1">见于自然生长与古典神庙。动态、有机、浪漫。</p>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
