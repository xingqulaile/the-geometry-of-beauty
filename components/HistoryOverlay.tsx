
import React from 'react';
import { motion } from 'framer-motion';
import { X, BookOpen } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface HistoryOverlayProps {
  onClose: () => void;
}

export const HistoryOverlay: React.FC<HistoryOverlayProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-stone-50 rounded-lg shadow-2xl max-w-4xl w-full overflow-hidden relative max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-stone-200 flex justify-between items-center bg-white sticky top-0 z-10">
          <h3 className="text-2xl font-serif font-bold text-stone-800 flex items-center gap-2">
            <BookOpen className="text-stone-600" />
            数学与历史渊源
          </h3>
          <button onClick={() => { playClickSound(); onClose(); }} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <X size={24} className="text-stone-500" />
          </button>
        </div>
        
        <div className="p-8 grid md:grid-cols-2 gap-8">
          
          {/* Root 2 Section */}
          <section className="bg-song-50 p-6 rounded-lg border border-song-200">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-song-500 rounded-full flex items-center justify-center text-white font-bold font-serif">√2</div>
               <h4 className="text-xl font-serif font-bold text-song-900">1 : 1.414 (方圆图)</h4>
            </div>

            {/* Diagram for Root 2: Square -> Diagonal -> Arc -> Rectangle (Clean Version) */}
            <div className="mb-6 flex justify-center bg-white p-6 rounded border border-song-100 shadow-sm min-h-[200px] items-center">
                <svg width="240" height="160" viewBox="-10 -20 220 160" className="overflow-visible">
                  <defs>
                      <marker id="arrow-song" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                          <path d="M0,0 L0,6 L6,3 z" fill="#346f74" />
                      </marker>
                  </defs>

                  {/* 1. Base Square */}
                  <rect x="0" y="40" width="100" height="100" fill="#d5eff0" fillOpacity="0.3" stroke="#346f74" strokeWidth="2" />
                  <text x="50" y="90" className="text-xs fill-song-700 font-bold opacity-50" textAnchor="middle">1</text>
                  <text x="-15" y="90" className="text-xs fill-song-700 font-bold opacity-50">1</text>

                  {/* 2. Diagonal Line */}
                  <line x1="0" y1="140" x2="100" y2="40" stroke="#346f74" strokeWidth="2" strokeDasharray="4 4" />
                  <text x="55" y="80" transform="rotate(-45 55 80)" className="text-xs fill-song-900 font-bold bg-white px-1">√2</text>

                  {/* 3. Arc swinging down */}
                  <path d="M 100 40 A 141.4 141.4 0 0 1 141.4 140" fill="none" stroke="#c59d45" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow-song)" />

                  {/* 4. Resulting Rectangle Extension */}
                  <rect x="100" y="40" width="41.4" height="100" fill="none" stroke="#346f74" strokeWidth="1" strokeDasharray="2 2" />
                  
                  {/* 5. Full Root 2 Rectangle Outline */}
                  <rect x="0" y="40" width="141.4" height="100" fill="none" stroke="#346f74" strokeWidth="2" />
                </svg>
            </div>
            
            <div className="space-y-4 text-song-800 text-sm leading-relaxed">
               <p>
                 <strong>绘制逻辑：</strong> 从一个正方形开始（边长为1），连接对角线（长度为√2）。以对角线长度为半径旋转画弧，将其“放倒”成为新的底边长。这样生成的矩形，长宽比正是 √2:1。
               </p>
               <p>
                 <strong>特性：</strong> 图中虚线所示，这一延伸过程极为直接，体现了“方圆相生”的朴素几何观。
               </p>
            </div>
          </section>

          {/* Golden Ratio Section */}
          <section className="bg-greek-50 p-6 rounded-lg border border-greek-200">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-greek-500 rounded-full flex items-center justify-center text-white font-bold font-serif">φ</div>
               <h4 className="text-xl font-serif font-bold text-greek-900">1 : 1.618 (黄金分割)</h4>
            </div>

             {/* Diagram for Golden Ratio: Construction Method */}
             <div className="mb-6 flex justify-center bg-white p-6 rounded border border-greek-100 shadow-sm min-h-[200px] items-center">
                <svg width="240" height="160" viewBox="-10 -20 220 160" className="overflow-visible">
                    <defs>
                        <marker id="arrow-greek" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L0,6 L6,3 z" fill="#8e6b29" />
                        </marker>
                    </defs>

                    {/* 1. Base Square */}
                    <rect x="0" y="40" width="100" height="100" fill="#f5edd6" fillOpacity="0.5" stroke="#8e6b29" strokeWidth="2" />
                    
                    {/* 2. Midpoint Construction */}
                    <line x1="50" y1="140" x2="50" y2="40" stroke="#c59d45" strokeWidth="1" strokeDasharray="2 2" />
                    <circle cx="50" cy="140" r="3" fill="#8e6b29" />
                    <text x="50" y="155" className="text-[10px] fill-greek-700 font-bold" textAnchor="middle">中点 (0.5)</text>

                    {/* 3. Diagonal from Midpoint to Top Right */}
                    {/* Top Right is (100, 40). Midpoint is (50, 140). */}
                    <line x1="50" y1="140" x2="100" y2="40" stroke="#8e6b29" strokeWidth="2" strokeDasharray="4 4" />
                    
                    {/* 4. Arc swinging down */}
                    {/* Radius is dist((50,140), (100,40)) = sqrt(50^2 + 100^2) = sqrt(2500+10000)=sqrt(12500) ≈ 111.8 */}
                    {/* Center (50, 140). Start Angle: towards (100, 40). End Angle: towards (161.8, 140). */}
                    {/* Path: Move to (100, 40) then Arc to (161.8, 140) */}
                    <path d="M 100 40 A 111.8 111.8 0 0 1 161.8 140" fill="none" stroke="#c59d45" strokeWidth="2" markerEnd="url(#arrow-greek)" />

                    {/* 5. Extension */}
                    <line x1="100" y1="140" x2="161.8" y2="140" stroke="#8e6b29" strokeWidth="2" />
                    <rect x="100" y="40" width="61.8" height="100" fill="#ebdab0" fillOpacity="0.3" stroke="#8e6b29" strokeWidth="1" strokeDasharray="2 2" />

                    {/* 6. Total Width Dimension */}
                    <line x1="0" y1="20" x2="161.8" y2="20" stroke="#8e6b29" strokeWidth="1" markerStart="url(#arrow-greek)" markerEnd="url(#arrow-greek)" />
                    <line x1="0" y1="25" x2="0" y2="40" stroke="#8e6b29" strokeWidth="1" strokeOpacity="0.3" />
                    <line x1="161.8" y1="25" x2="161.8" y2="40" stroke="#8e6b29" strokeWidth="1" strokeOpacity="0.3" />
                    <text x="80" y="15" className="text-xs fill-greek-900 font-bold" textAnchor="middle">1.618...</text>

                </svg>
            </div>
            
            <div className="space-y-4 text-greek-800 text-sm leading-relaxed">
               <p>
                 <strong>计算原理：</strong> 这是一个经典的尺规作图法。
               </p>
               <ol className="list-decimal list-inside space-y-2 ml-1">
                   <li>画一个正方形（边长为1）。</li>
                   <li>取底边的<strong>中点</strong>。</li>
                   <li>连接中点与右上角顶点。</li>
                   <li>以中点为圆心，以这条连线为半径画弧，延伸到底边。</li>
               </ol>
               <p>
                 由此产生的总长度即为 <strong>(1 + √5) / 2</strong>，约等于 1.618。这展示了黄金比例是如何通过简单的几何分割与旋转“生长”出来的。
               </p>
            </div>
          </section>

        </div>
        <div className="bg-stone-100 p-4 text-center text-stone-500 text-xs">
            数学不仅仅是计算，它是人类理解宇宙秩序的两种不同语言。
        </div>
      </motion.div>
    </div>
  );
};
