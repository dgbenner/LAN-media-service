import React from 'react';
import { MediaCard } from './MediaCard';
import { MediaItem } from '../types';

interface LibraryProps {
  items: MediaItem[];
  filter: 'all' | 'movie' | 'tv';
  onPlay: (item: MediaItem) => void;
}

export const Library: React.FC<LibraryProps> = ({ items, filter, onPlay }) => {
  const filteredItems = items.filter(
    (item) => filter === 'all' || item.type === filter
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">
            {filter === 'all' ? 'Media Library' : filter === 'movie' ? 'Movies' : 'TV Shows'}
          </h2>
          <p className="text-slate-400 mt-1">
            {filteredItems.length} titles available
          </p>
        </div>
        
        {/* Visual Sort Dropdown */}
        <div className="relative">
          <select className="appearance-none bg-slate-800 border border-slate-700 text-slate-200 py-2 pl-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
            <option>Date Added</option>
            <option>Year</option>
            <option>Alphabetical</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredItems.map((item) => (
          <MediaCard key={item.id} item={item} onPlay={onPlay} />
        ))}
      </div>
    </div>
  );
};