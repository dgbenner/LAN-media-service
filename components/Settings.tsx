import React, { useState } from 'react';
import { Save, RefreshCw, FolderOpen, Wifi, MonitorPlay } from 'lucide-react';

export const Settings: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <header className="border-b border-slate-800 pb-6">
        <h2 className="text-3xl font-bold text-white">Server Settings</h2>
        <p className="text-slate-400 mt-1">Configure media folders and streaming protocols</p>
      </header>

      {/* Media Sources */}
      <section className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700 flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 rounded-lg">
            <FolderOpen className="text-cyan-500 w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-white">Media Sources</h3>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Movies Directory</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                defaultValue="/mnt/storage/movies"
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors font-mono text-sm"
              />
              <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
                Browse
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">TV Shows Directory</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                defaultValue="/mnt/storage/tvshows"
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors font-mono text-sm"
              />
              <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
                Browse
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700">
            <button 
              onClick={handleScan}
              disabled={isScanning}
              className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              {isScanning ? 'Scanning Library...' : 'Scan Library Files'}
            </button>
            <p className="text-xs text-slate-500 mt-2">Recursively scans folders for new video content.</p>
          </div>
        </div>
      </section>

      {/* DLNA / UPnP */}
      <section className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700 flex items-center gap-3">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <Wifi className="text-green-500 w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-white">DLNA / UPnP</h3>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Enable DLNA Server</div>
              <div className="text-sm text-slate-400">Allow network devices (Apple TV, Smart TVs) to discover this server</div>
            </div>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-cyan-600 cursor-pointer">
              <span className="translate-x-6 inline-block w-6 h-6 bg-white rounded-full shadow transform transition duration-200 ease-in-out" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Server Friendly Name</div>
              <div className="text-sm text-slate-400">Name displayed on client devices</div>
            </div>
            <input 
              type="text" 
              defaultValue="DIY Media Server"
              className="w-48 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500 font-sm"
            />
          </div>

           <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">SSDP Announcement Interval</div>
              <div className="text-sm text-slate-400">How often to broadcast presence (seconds)</div>
            </div>
            <input 
              type="number" 
              defaultValue="1800"
              className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500 font-sm"
            />
          </div>
        </div>
      </section>

       {/* Transcoding */}
       <section className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700 flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <MonitorPlay className="text-purple-500 w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-white">Playback & Transcoding</h3>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Enable Hardware Acceleration</div>
              <div className="text-sm text-slate-400">Use GPU for video encoding (requires FFmpeg setup)</div>
            </div>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-slate-600 cursor-pointer">
              <span className="translate-x-0 inline-block w-6 h-6 bg-white rounded-full shadow transform transition duration-200 ease-in-out" />
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 p-4 border-t border-slate-700 flex justify-end">
             <button className="flex items-center gap-2 bg-slate-100 hover:bg-white text-slate-900 font-bold px-6 py-2 rounded-lg transition-all">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
        </div>
      </section>
    </div>
  );
};