import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Pause, Play, Volume2, VolumeX, Maximize, Settings as SettingsIcon, SkipForward, SkipBack } from 'lucide-react';
import { MediaItem } from '../types';

interface VideoPlayerProps {
  item: MediaItem;
  onClose: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ item, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const val = (video.currentTime / video.duration) * 100;
      setProgress(isNaN(val) ? 0 : val);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden group"
      onMouseMove={handleMouseMove}
    >
      {/* Mock Video Source - Using a standard BBB placeholder for demo purposes */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        onClick={togglePlay}
      />

      {/* Top Bar */}
      <div className={`absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <button 
          onClick={onClose}
          className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="font-medium text-lg">Back to Library</span>
        </button>
      </div>

      {/* Center Play Button (only when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-20 h-20 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/20">
             <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
           </div>
        </div>
      )}

      {/* Bottom Controls */}
      <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-gray-600 rounded-full mb-4 cursor-pointer group/progress relative">
          <div 
            className="h-full bg-cyan-500 rounded-full relative" 
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow scale-0 group-hover/progress:scale-100 transition-transform" />
          </div>
        </div>

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-6">
            <button onClick={togglePlay} className="hover:text-cyan-400 transition-colors">
              {isPlaying ? <Pause className="w-8 h-8" fill="currentColor" /> : <Play className="w-8 h-8" fill="currentColor" />}
            </button>
            
            <div className="flex items-center gap-4">
              <SkipBack className="w-6 h-6 hover:text-cyan-400 cursor-pointer" />
              <SkipForward className="w-6 h-6 hover:text-cyan-400 cursor-pointer" />
            </div>

            <div className="flex items-center gap-2 group/volume">
              <button onClick={toggleMute}>
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
              <div className="w-0 overflow-hidden group-hover/volume:w-24 transition-all duration-300">
                <div className="w-20 h-1 bg-gray-600 rounded-full ml-2">
                  <div className="w-2/3 h-full bg-white rounded-full" />
                </div>
              </div>
            </div>

            <div className="text-sm font-medium text-slate-300">
              <span className="text-white">{item.title}</span>
              <span className="mx-2">•</span>
              <span>{item.year}</span>
              <span className="mx-2">•</span>
              <span>{item.quality}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="hover:text-cyan-400 transition-colors">
              <SettingsIcon className="w-6 h-6" />
            </button>
            <button className="hover:text-cyan-400 transition-colors">
              <Maximize className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};