import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, HardDrive, Network, Users, Terminal } from 'lucide-react';
import { INITIAL_LOGS, MOCK_BANDWIDTH_DATA } from '../constants';
import { LogEntry } from '../types';

export const Dashboard: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const logsEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate live logs coming from backend
    const interval = setInterval(() => {
      const messages = [
        { msg: 'SSDP M-SEARCH received from 192.168.1.112', source: 'DLNA' as const },
        { msg: 'Streaming chunk 1048576 bytes to client', source: 'HTTP' as const },
        { msg: 'Metadata updated for ID: 49201', source: 'SCANNER' as const },
        { msg: 'Keep-Alive check passed', source: 'SYSTEM' as const },
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      
      const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString(),
        level: 'INFO',
        message: randomMsg.msg,
        source: randomMsg.source,
      };

      setLogs(prev => [...prev.slice(-19), newLog]); // Keep last 20 logs
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="space-y-6 animate-fade-in">
      <header>
        <h2 className="text-3xl font-bold text-white">Server Dashboard</h2>
        <p className="text-slate-400">System status and network activity</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-sm font-medium">CPU Usage</h3>
            <Activity className="text-cyan-500 w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-white">4.2%</div>
          <div className="text-xs text-green-400 mt-1">Optimal range</div>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-sm font-medium">Active Streams</h3>
            <Users className="text-purple-500 w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-white">2</div>
          <div className="text-xs text-slate-400 mt-1">Direct Play (No Transcode)</div>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-sm font-medium">Storage</h3>
            <HardDrive className="text-orange-500 w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-white">1.4 TB</div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full mt-3">
            <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-sm font-medium">DLNA Status</h3>
            <Network className="text-green-500 w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-white">Running</div>
          <div className="text-xs text-slate-400 mt-1">Port 1900 (UPnP)</div>
        </div>
      </div>

      {/* Charts & Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Chart */}
        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-6">Network Traffic (Mbps)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_BANDWIDTH_DATA}>
                <defs>
                  <linearGradient id="colorBw" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="mbps" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorBw)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Console Log */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 shadow-lg flex flex-col h-[400px] font-mono text-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
            <Terminal className="w-4 h-4 text-slate-400" />
            <h3 className="text-slate-300 font-medium">Server Log</h3>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin">
            {logs.map((log) => (
              <div key={log.id} className="flex gap-3">
                <span className="text-slate-500 text-xs whitespace-nowrap">{log.timestamp}</span>
                <div>
                  <span className={`text-xs font-bold mr-2 px-1.5 py-0.5 rounded ${
                    log.source === 'DLNA' ? 'bg-indigo-900 text-indigo-300' :
                    log.source === 'SCANNER' ? 'bg-emerald-900 text-emerald-300' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {log.source}
                  </span>
                  <span className="text-slate-300">{log.message}</span>
                </div>
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
};