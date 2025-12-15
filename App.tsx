
import React, { useState } from 'react';
import { RootTwoPanel } from './components/RootTwoPanel';
import { GoldenRatioPanel } from './components/GoldenRatioPanel';
import { ComparisonOverlay } from './components/ComparisonOverlay';
import { HistoryOverlay } from './components/HistoryOverlay';
import { ArchitectureOverlay } from './components/ArchitectureOverlay';
import { Maximize2, BookOpen, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { playClickSound } from './utils/audio';

export default function App() {
  const [showComparison, setShowComparison] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showArchitecture, setShowArchitecture] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-stone-50 overflow-hidden relative">
      {/* Header */}
      <header className="absolute top-0 w-full z-10 flex flex-col md:flex-row justify-between items-center p-4 md:p-6 pointer-events-none gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-800 tracking-wide text-center md:text-left">
            美的几何
          </h1>
          <p className="text-stone-500 text-sm mt-1 max-w-md hidden md:block">
            探索「宋代工程严谨之诗」与「古希腊艺术浪漫之梦」
          </p>
        </div>
        
        <div className="pointer-events-auto flex gap-3">
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => { playClickSound(); setShowHistory(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-white text-stone-700 rounded-full shadow hover:bg-stone-50 border border-stone-200 transition-colors"
                title="数学与历史渊源"
            >
                <BookOpen size={16} />
                <span className="font-medium text-xs md:text-sm">原理解析</span>
            </motion.button>
            
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => { playClickSound(); setShowArchitecture(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-white text-stone-700 rounded-full shadow hover:bg-stone-50 border border-stone-200 transition-colors"
                title="建筑实例"
            >
                <Landmark size={16} />
                <span className="font-medium text-xs md:text-sm">建筑实例</span>
            </motion.button>

            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => { playClickSound(); setShowComparison(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-stone-50 rounded-full shadow-lg hover:bg-stone-700 transition-colors"
            >
                <Maximize2 size={16} />
                <span className="font-medium text-xs md:text-sm">视觉对比</span>
            </motion.button>
        </div>
      </header>

      {/* Main Split Content */}
      <main className="flex-1 flex flex-col md:flex-row relative pt-20 md:pt-0">
        {/* Left: Root 2 */}
        <section className="flex-1 relative border-b md:border-b-0 md:border-r border-stone-200">
           <RootTwoPanel />
        </section>

        {/* Right: Golden Ratio */}
        <section className="flex-1 relative">
          <GoldenRatioPanel />
        </section>
      </main>

      {/* Modals */}
      {showComparison && (
        <ComparisonOverlay onClose={() => setShowComparison(false)} />
      )}
      {showHistory && (
        <HistoryOverlay onClose={() => setShowHistory(false)} />
      )}
      {showArchitecture && (
        <ArchitectureOverlay onClose={() => setShowArchitecture(false)} />
      )}
      
      {/* Mobile Footer Note */}
      <div className="md:hidden p-4 text-center text-xs text-stone-400">
        请使用大屏设备以获得最佳视觉体验
      </div>
    </div>
  );
}
