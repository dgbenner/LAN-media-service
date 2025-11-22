import React from 'react';
import { LayoutDashboard, Library, Settings, Server, Tv, Clapperboard } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  filter: 'all' | 'movie' | 'tv';
  onFilterChange: (filter: 'all' | 'movie' | 'tv') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, filter, onFilterChange }) => {
  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 h-screen flex flex-col fixed left-0 top-0 z-20">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
          <Server className="text-white w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">DIY Media</h1>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1">
        <button
          onClick={() => onChangeView(ViewState.DASHBOARD)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            currentView === ViewState.DASHBOARD ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </button>

        <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Library
        </div>

        <button
          onClick={() => {
            onChangeView(ViewState.LIBRARY);
            onFilterChange('all');
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            currentView === ViewState.LIBRARY && filter === 'all' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <Library className="w-5 h-5" />
          <span className="font-medium">All Media</span>
        </button>

        <button
          onClick={() => {
            onChangeView(ViewState.LIBRARY);
            onFilterChange('movie');
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            currentView === ViewState.LIBRARY && filter === 'movie' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <Clapperboard className="w-5 h-5" />
          <span className="font-medium">Movies</span>
        </button>

        <button
          onClick={() => {
            onChangeView(ViewState.LIBRARY);
            onFilterChange('tv');
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            currentView === ViewState.LIBRARY && filter === 'tv' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <Tv className="w-5 h-5" />
          <span className="font-medium">TV Shows</span>
        </button>

        <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          System
        </div>

        <button
          onClick={() => onChangeView(ViewState.SETTINGS)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            currentView === ViewState.SETTINGS ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-slate-400">Online: 192.168.1.105</span>
        </div>
      </div>
    </div>
  );
};