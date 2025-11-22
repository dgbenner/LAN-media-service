import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Library } from './components/Library';
import { Settings } from './components/Settings';
import { VideoPlayer } from './components/VideoPlayer';
import { ViewState, MediaItem } from './types';
import { MOCK_MEDIA } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [filter, setFilter] = useState<'all' | 'movie' | 'tv'>('all');
  const [playingItem, setPlayingItem] = useState<MediaItem | null>(null);

  const handlePlay = (item: MediaItem) => {
    setPlayingItem(item);
  };

  const handleClosePlayer = () => {
    setPlayingItem(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-cyan-500/30">
      {/* Video Player Overlay */}
      {playingItem && (
        <VideoPlayer item={playingItem} onClose={handleClosePlayer} />
      )}

      {/* Mobile Header (visible only on small screens) */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-center sticky top-0 z-10">
        <h1 className="text-xl font-bold text-white">DIY Media</h1>
      </div>

      <div className="flex">
        {/* Sidebar (Desktop) */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <Sidebar 
            currentView={currentView} 
            onChangeView={setCurrentView}
            filter={filter}
            onFilterChange={setFilter}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full pb-24 md:pb-10">
          {currentView === ViewState.DASHBOARD && <Dashboard />}
          {currentView === ViewState.LIBRARY && (
            <Library 
              items={MOCK_MEDIA} 
              filter={filter}
              onPlay={handlePlay}
            />
          )}
          {currentView === ViewState.SETTINGS && <Settings />}
        </main>
      </div>

      {/* Mobile Bottom Navigation (Alternative to Sidebar) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-4 flex justify-around z-20">
         <button 
           onClick={() => setCurrentView(ViewState.DASHBOARD)}
           className={`flex flex-col items-center gap-1 ${currentView === ViewState.DASHBOARD ? 'text-cyan-400' : 'text-slate-400'}`}
         >
           <span className="text-xs">Home</span>
         </button>
         <button 
           onClick={() => setCurrentView(ViewState.LIBRARY)}
           className={`flex flex-col items-center gap-1 ${currentView === ViewState.LIBRARY ? 'text-cyan-400' : 'text-slate-400'}`}
         >
           <span className="text-xs">Library</span>
         </button>
         <button 
           onClick={() => setCurrentView(ViewState.SETTINGS)}
           className={`flex flex-col items-center gap-1 ${currentView === ViewState.SETTINGS ? 'text-cyan-400' : 'text-slate-400'}`}
         >
           <span className="text-xs">Settings</span>
         </button>
      </div>
    </div>
  );
};

export default App;