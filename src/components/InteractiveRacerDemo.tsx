import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, Volume2, VolumeX, ShieldAlert, ExternalLink } from 'lucide-react';

export const InteractiveRacerDemo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(120);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const stateRef = useRef({
    playerX: 0,
    speed: 120,
    score: 0,
    distance: 0,
    keys: { left: false, right: false, boost: false },
    traffic: [] as { x: number; y: number; speed: number; color: string }[],
    lastSpawn: 0,
  });

  const startGame = () => {
    stateRef.current = {
      playerX: 0,
      speed: 140,
      score: 0,
      distance: 0,
      keys: { left: false, right: false, boost: false },
      traffic: [
        { x: -0.5, y: 300, speed: 60, color: '#38BDF8' },
        { x: 0.5, y: 600, speed: 70, color: '#F43F5E' },
      ],
      lastSpawn: Date.now(),
    };
    setScore(0);
    setSpeed(140);
    setGameOver(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        stateRef.current.keys.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        stateRef.current.keys.right = true;
      }
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') {
        stateRef.current.keys.boost = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        stateRef.current.keys.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        stateRef.current.keys.right = false;
      }
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') {
        stateRef.current.keys.boost = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    let animationId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let roadOffset = 0;

    const loop = () => {
      if (!isPlaying) {
        // Draw static intro road
        ctx.fillStyle = '#08090E';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid lines
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 30) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, canvas.height);
          ctx.stroke();
        }
        return;
      }

      const state = stateRef.current;

      // Update player position
      if (state.keys.left) state.playerX = Math.max(-0.85, state.playerX - 0.035);
      if (state.keys.right) state.playerX = Math.min(0.85, state.playerX + 0.035);

      // Boost mechanics
      if (state.keys.boost) {
        state.speed = Math.min(240, state.speed + 1.2);
      } else {
        state.speed = Math.max(130, state.speed - 0.8);
      }
      setSpeed(Math.round(state.speed));

      roadOffset = (roadOffset + state.speed * 0.08) % 40;
      state.score += Math.round(state.speed / 20);
      setScore(state.score);

      // Spawn traffic
      const now = Date.now();
      if (now - state.lastSpawn > Math.max(700, 2000 - state.score * 0.3)) {
        const laneX = (Math.floor(Math.random() * 3) - 1) * 0.6;
        const colors = ['#F43F5E', '#F59E0B', '#10B981', '#A855F7', '#38BDF8'];
        state.traffic.push({
          x: laneX,
          y: canvas.height + 60,
          speed: 40 + Math.random() * 40,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
        state.lastSpawn = now;
      }

      // Update traffic & collisions
      const playerPixelX = canvas.width / 2 + (state.playerX * canvas.width) / 2.5;
      const playerPixelY = 90;
      const playerWidth = 32;
      const playerHeight = 56;

      for (let i = state.traffic.length - 1; i >= 0; i--) {
        const car = state.traffic[i];
        car.y -= (state.speed - car.speed) * 0.08;

        const carPixelX = canvas.width / 2 + (car.x * canvas.width) / 2.5;
        const carPixelY = car.y;

        // Simple AABB Collision
        if (
          Math.abs(playerPixelX - carPixelX) < playerWidth * 0.8 &&
          Math.abs(playerPixelY - carPixelY) < playerHeight * 0.75
        ) {
          setIsPlaying(false);
          setGameOver(true);
          return;
        }

        if (car.y < -80 || car.y > canvas.height + 200) {
          state.traffic.splice(i, 1);
        }
      }

      // --- RENDERING ---
      ctx.fillStyle = '#06070B';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Road boundaries
      const roadLeft = canvas.width * 0.12;
      const roadRight = canvas.width * 0.88;
      const roadWidth = roadRight - roadLeft;

      // Road asphalt
      ctx.fillStyle = '#10121A';
      ctx.fillRect(roadLeft, 0, roadWidth, canvas.height);

      // Curbs
      ctx.fillStyle = '#F43F5E';
      ctx.fillRect(roadLeft - 6, 0, 6, canvas.height);
      ctx.fillStyle = '#38BDF8';
      ctx.fillRect(roadRight, 0, 6, canvas.height);

      // Lane dividers (moving)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 3;
      ctx.setLineDash([20, 20]);
      ctx.lineDashOffset = -roadOffset;

      // 2 lane divider lines
      ctx.beginPath();
      ctx.moveTo(roadLeft + roadWidth * 0.33, 0);
      ctx.lineTo(roadLeft + roadWidth * 0.33, canvas.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(roadLeft + roadWidth * 0.66, 0);
      ctx.lineTo(roadLeft + roadWidth * 0.66, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw traffic cars
      state.traffic.forEach((car) => {
        const cx = canvas.width / 2 + (car.x * canvas.width) / 2.5;
        const cy = car.y;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.roundRect(cx - 16, cy - 26, 32, 52, 6);
        ctx.fill();

        // Car Body
        ctx.fillStyle = car.color;
        ctx.beginPath();
        ctx.roundRect(cx - 14, cy - 24, 28, 48, 5);
        ctx.fill();

        // Windshield
        ctx.fillStyle = '#0A0B10';
        ctx.fillRect(cx - 10, cy - 8, 20, 10);

        // Tail lights
        ctx.fillStyle = '#EF4444';
        ctx.fillRect(cx - 11, cy - 22, 6, 3);
        ctx.fillRect(cx + 5, cy - 22, 6, 3);
      });

      // Draw Player Car
      // Nitro glow
      if (state.keys.boost) {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.5)';
        ctx.beginPath();
        ctx.arc(playerPixelX, playerPixelY + 28, 12, 0, Math.PI * 2);
        ctx.fill();
      }

      // Player shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.beginPath();
      ctx.roundRect(playerPixelX - 17, playerPixelY - 27, 34, 54, 7);
      ctx.fill();

      // Player chassis
      ctx.fillStyle = '#38BDF8';
      ctx.beginPath();
      ctx.roundRect(playerPixelX - 15, playerPixelY - 25, 30, 50, 6);
      ctx.fill();

      // Roof & cockpit
      ctx.fillStyle = '#090A0F';
      ctx.beginPath();
      ctx.roundRect(playerPixelX - 10, playerPixelY - 12, 20, 24, 4);
      ctx.fill();

      // Headlights glow
      ctx.fillStyle = '#FEF08A';
      ctx.fillRect(playerPixelX - 12, playerPixelY - 24, 6, 4);
      ctx.fillRect(playerPixelX + 6, playerPixelY - 24, 6, 4);

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-[#0A0B10] border border-white/10 shadow-2xl p-4 sm:p-6 text-white flex flex-col items-center select-none">
      {/* Top Telemetry HUD */}
      <div className="w-full flex items-center justify-between mb-3 px-2 font-mono text-xs sm:text-sm">
        <div className="flex items-center gap-3">
          <span className="text-slate-400">SPEED:</span>
          <span className="font-bold text-[#38BDF8] text-base sm:text-lg">{speed} KM/H</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">SCORE:</span>
            <span className="font-bold text-white text-base sm:text-lg">{score}</span>
          </div>
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1 rounded text-slate-400 hover:text-white"
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div className="relative w-full max-w-lg aspect-[4/3] rounded-xl overflow-hidden border border-white/15 bg-black">
        <canvas
          ref={canvasRef}
          width={400}
          height={320}
          className="w-full h-full object-cover"
        />

        {/* Start / Game Over Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            {gameOver ? (
              <>
                <ShieldAlert className="w-12 h-12 text-[#F43F5E] mb-2" />
                <h4 className="text-xl font-bold uppercase tracking-tight text-white mb-1">
                  Collision Detected
                </h4>
                <p className="text-xs text-slate-300 font-mono mb-4">
                  Final Run Score: <span className="text-[#38BDF8] font-bold">{score}</span>
                </p>
                <button
                  type="button"
                  onClick={startGame}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#38BDF8] text-slate-950 font-semibold text-xs uppercase tracking-wider hover:bg-[#7dd3fc] transition-all cursor-pointer shadow-lg"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restart Run</span>
                </button>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-3 text-[#38BDF8]">
                  <Play className="w-6 h-6 ml-0.5" />
                </div>
                <h4 className="text-xl font-bold uppercase tracking-tight text-white mb-1">
                  SL-TAXI-DRIVER Web Engine
                </h4>
                <p className="text-xs text-slate-400 max-w-xs mb-4 font-normal">
                  Interactive real-time 60 FPS physics demo. Dodge autonomous traffic on the neon highway.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    type="button"
                    onClick={startGame}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-slate-900 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all cursor-pointer shadow-xl"
                  >
                    <Play className="w-4 h-4 fill-slate-900" />
                    <span>Play Canvas Demo</span>
                  </button>
                  <a
                    href="https://sl-taxi-driver.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-wider transition-all"
                  >
                    <span>Full Game (Vercel)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* On-Screen Steering & Keyboard Hints */}
      <div className="w-full max-w-lg mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span className="hidden sm:inline">CONTROLS: ← / → TO STEER · ↑ / SPACE FOR NITRO</span>

        {/* Mobile touch controls */}
        <div className="flex sm:hidden items-center justify-between w-full pt-1">
          <button
            type="button"
            onPointerDown={() => (stateRef.current.keys.left = true)}
            onPointerUp={() => (stateRef.current.keys.left = false)}
            className="px-4 py-2 rounded-lg bg-white/10 active:bg-white/20 text-white font-bold"
          >
            ← LEFT
          </button>
          <button
            type="button"
            onPointerDown={() => (stateRef.current.keys.boost = true)}
            onPointerUp={() => (stateRef.current.keys.boost = false)}
            className="px-4 py-2 rounded-lg bg-[#38BDF8]/20 text-[#38BDF8] active:bg-[#38BDF8]/30 font-bold"
          >
            NITRO
          </button>
          <button
            type="button"
            onPointerDown={() => (stateRef.current.keys.right = true)}
            onPointerUp={() => (stateRef.current.keys.right = false)}
            className="px-4 py-2 rounded-lg bg-white/10 active:bg-white/20 text-white font-bold"
          >
            RIGHT →
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveRacerDemo;
