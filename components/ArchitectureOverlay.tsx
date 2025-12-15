
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Landmark, ZoomIn } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface ArchitectureOverlayProps {
  onClose: () => void;
}

export const ArchitectureOverlay: React.FC<ArchitectureOverlayProps> = ({ onClose }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const images = {
    song: "https://pics2.baidu.com/feed/730e0cf3d7ca7bcba357c2a08c3d5c65f724a8cf.jpeg@f_auto?token=38474968735bec9b6c87caf1cc088f1a&s=5410753317467F4B1C7810C6010070B2",
    greek: "https://pics1.baidu.com/feed/7acb0a46f21fbe09757d4de05e543b358644add9.jpeg?token=4002b7d3a472bbad14aefac0d4346d41&s=4090E833BCD75BEB36B56DDA0100D0A2"
  };

  const handleImageClick = (src: string) => {
    playClickSound();
    setPreviewImage(src);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm" onClick={onClose}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-stone-50 rounded-lg shadow-2xl max-w-5xl w-full overflow-hidden relative max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6 border-b border-stone-200 flex justify-between items-center bg-white sticky top-0 z-10">
            <h3 className="text-2xl font-serif font-bold text-stone-800 flex items-center gap-2">
              <Landmark className="text-stone-600" />
              建筑美学实例
            </h3>
            <button onClick={() => { playClickSound(); onClose(); }} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
              <X size={24} className="text-stone-500" />
            </button>
          </div>
          
          <div className="p-8 grid md:grid-cols-2 gap-10">
            
            {/* Song Architecture */}
            <div className="flex flex-col gap-4">
               <div 
                 className="relative aspect-[4/3] bg-song-100 rounded overflow-hidden shadow-inner border border-song-200 group cursor-zoom-in"
                 onClick={() => handleImageClick(images.song)}
               >
                  <img 
                      src={images.song} 
                      alt="山西五台山佛光寺东大殿"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/800x600/d5eff0/346f74?text=佛光寺东大殿+Image+Missing';
                      }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white/90 p-2 rounded-full shadow-lg">
                        <ZoomIn size={24} className="text-song-700" />
                      </div>
                  </div>
                  <div className="absolute inset-0 border-[10px] border-song-500/10 pointer-events-none"></div>
               </div>
               <div className="border-l-4 border-song-500 pl-4">
                   <h4 className="text-xl font-bold text-song-900 font-serif">1:√2 建筑实例</h4>
                   <p className="text-lg text-song-700 mt-1">山西五台山佛光寺东大殿</p>
                   <p className="text-sm text-stone-500 mt-2 leading-relaxed">
                       作为唐代木构建筑的典范，其立面构图与梁架跨度严谨地遵循着方圆作图法。这种基于√2的比例系统赋予了建筑庄重、稳定且极具力度的视觉感受，展现了东方土木工程的理性之美。
                   </p>
               </div>
            </div>

            {/* Greek Architecture */}
            <div className="flex flex-col gap-4">
               <div 
                 className="relative aspect-[4/3] bg-greek-100 rounded overflow-hidden shadow-inner border border-greek-200 group cursor-zoom-in"
                 onClick={() => handleImageClick(images.greek)}
               >
                  <img 
                      src={images.greek} 
                      alt="帕特农神庙"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/800x600/f5edd6/8e6b29?text=帕特农神庙+Image+Missing';
                      }}
                  />
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white/90 p-2 rounded-full shadow-lg">
                        <ZoomIn size={24} className="text-greek-700" />
                      </div>
                  </div>
                  <div className="absolute inset-0 border-[10px] border-greek-500/10 pointer-events-none"></div>
               </div>
               <div className="border-l-4 border-greek-500 pl-4">
                   <h4 className="text-xl font-bold text-greek-900 font-serif">黄金分割比建筑实例</h4>
                   <p className="text-lg text-greek-700 mt-1">帕特农神庙</p>
                   <p className="text-sm text-stone-500 mt-2 leading-relaxed">
                       古希腊建筑的最高杰作，其正立面被广泛认为蕴含着黄金矩形的比例。从立柱的高度到山花（三角形屋顶）的顶点，整体呈现出一种动态的和谐，象征着西方古典美学中“神圣比例”的理想。
                   </p>
               </div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Lightbox / Preview Overlay */}
      <AnimatePresence>
        {previewImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setPreviewImage(null)}
          >
             <button 
                onClick={() => setPreviewImage(null)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full"
             >
               <X size={32} />
             </button>
             
             <motion.img
                layoutId={previewImage}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={previewImage}
                className="max-w-full max-h-full object-contain rounded shadow-2xl select-none"
                onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing, but surrounding area closes it
             />
             <div className="absolute bottom-6 left-0 w-full text-center text-white/60 text-sm pointer-events-none">
                点击任意处关闭预览
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
