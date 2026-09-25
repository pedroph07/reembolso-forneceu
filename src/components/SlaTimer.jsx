import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function SlaTimer({ startTime }) {
  const TOTAL_SECONDS = 72 * 3600; // 72 hours SLA
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);

  useEffect(() => {
    if (!startTime) return;

    const updateTimer = () => {
      const elapsedSeconds = Math.floor((Date.now() - new Date(startTime).getTime()) / 1000);
      const remaining = Math.max(0, TOTAL_SECONDS - elapsedSeconds);
      setTimeLeft(remaining);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 bg-white/95 backdrop-blur-md border-2 border-amber-300 hover:border-amber-400 rounded-2xl p-4 shadow-2xl flex items-center gap-4 group transition-all duration-300">
      <div className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold shadow-glow-yellow group-hover:scale-110 transition-transform">
        <Clock className="w-5 h-5 stroke-[2.5]" />
      </div>
      <div>
        <div className="text-[10px] font-extrabold tracking-widest text-amber-900 uppercase">
          TEMPO RESTANTE (72H)
        </div>
        <div className="text-xl font-black tracking-tight text-gray-900 font-mono">
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
}
