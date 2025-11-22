import React from 'react';
import { Play } from 'lucide-react';
import { MediaItem } from '../types';

interface MediaCardProps {
  item: MediaItem;
  onPlay: (item: MediaItem) => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({ item, onPlay }) => {
  return (
    <div className="group relative bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-900/20 transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={item.posterUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={() => onPlay(item)}
            className="w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center hover:bg-cyan-400 hover:scale-110 transition-all shadow-lg"
          >
            <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
          </button>
        </div>
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white">
          {item.quality}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-slate-100 truncate text-lg" title={item.title}>{item.title}</h3>
        <div className="flex items-center justify-between mt-2 text-xs text-slate-400 font-medium">
          <span>{item.year}</span>
          <span className="border border-slate-600 px-1.5 py-0.5 rounded">{item.rating}</span>
          <span>{item.duration}</span>
        </div>
      </div>
    </div>
  );
};