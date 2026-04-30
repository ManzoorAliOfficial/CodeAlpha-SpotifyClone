import React, { useState, useEffect } from "react";

export default function SpotifyNotFound() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden relative font-sans">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #1DB954 0%, transparent 70%)",
            filter: "blur(80px)",
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #1ed760 0%, transparent 70%)",
            filter: "blur(100px)",
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
      </div>

      {/* Main content with vinyl record */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 max-w-6xl w-full">
        {/* Vinyl Record Animation */}
        <div
          className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        >
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-[#1DB954] opacity-20 blur-3xl scale-110 animate-pulse"></div>

          {/* Vinyl record */}
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Record grooves */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black animate-spin-slow">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border border-gray-700/30"
                  style={{
                    margin: `${i * 8}px`,
                  }}
                />
              ))}
            </div>

            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-gray-900 to-black border-4 border-gray-800 flex items-center justify-center shadow-2xl">
                <div className="w-3 h-3 rounded-full bg-gray-700"></div>
              </div>
            </div>

            {/* Spotify logo on label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg
                className="w-12 h-12 text-[#1DB954] animate-pulse"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </div>

            {/* Reflection effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Text content */}
        <div
          className={`text-left transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
        >
          <div className="mb-8">
            <div className="flex items-baseline gap-4 mb-4">
              <h1 className="text-8xl md:text-9xl font-black text-white tracking-tighter leading-none">
                404
              </h1>
              <div className="flex gap-1 pb-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-[#1DB954] rounded-full animate-equalizer"
                    style={{
                      height: `${20 + Math.random() * 30}px`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="h-1 w-20 bg-[#1DB954] rounded-full mb-8"></div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Page not found
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-md leading-relaxed">
            We can't find that page. Don't worry though, there's plenty of other
            stuff to listen to.
          </p>

          <p className="mt-8 text-xs text-gray-600 font-mono">
            Error code: SPOTIFY_404
          </p>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#1DB954]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              opacity: Math.random() * 0.3,
              animation: `float-particle ${10 + Math.random() * 20}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Sound wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 opacity-10 overflow-hidden">
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1200 100"
        >
          <path
            d="M0,50 Q300,20 600,50 T1200,50"
            fill="none"
            stroke="#1DB954"
            strokeWidth="2"
            className="animate-wave"
          />
          <path
            d="M0,50 Q300,80 600,50 T1200,50"
            fill="none"
            stroke="#1DB954"
            strokeWidth="2"
            className="animate-wave"
            style={{ animationDelay: "0.5s" }}
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes equalizer {
          0%,
          100% {
            height: 20px;
          }
          50% {
            height: 50px;
          }
        }

        @keyframes float-particle {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          50% {
            transform: translate(
                ${Math.random() * 100 - 50}px,
                ${Math.random() * 100 - 50}px
              )
              scale(1.5);
            opacity: 0.6;
          }
          90% {
            opacity: 0.3;
          }
        }

        @keyframes wave {
          0%,
          100% {
            d: path("M0,50 Q300,20 600,50 T1200,50");
          }
          50% {
            d: path("M0,50 Q300,80 600,50 T1200,50");
          }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-equalizer {
          animation: equalizer 1s ease-in-out infinite;
        }

        .animate-wave {
          animation: wave 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
