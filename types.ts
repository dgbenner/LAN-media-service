export type MediaType = 'movie' | 'tv';

export interface MediaItem {
  id: string;
  title: string;
  originalTitle?: string;
  year: number;
  type: MediaType;
  posterUrl: string;
  backdropUrl: string;
  plot: string;
  duration: string; // e.g., "1h 45m" or "45m"
  rating: string; // e.g., "PG-13"
  quality: string; // e.g., "1080p", "4K"
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  message: string;
  source: 'DLNA' | 'SCANNER' | 'HTTP' | 'SYSTEM';
}

export interface ServerStats {
  cpuUsage: number;
  memoryUsage: number;
  uptime: string;
  activeStreams: number;
  bandwidth: { time: string; mbps: number }[];
}

export enum ViewState {
  DASHBOARD = 'dashboard',
  LIBRARY = 'library',
  SETTINGS = 'settings',
  PLAYER = 'player',
}