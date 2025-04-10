import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ src, poster, autoPlay = false }) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls = null;

    const setupHls = () => {
      if (hls) {
        hls.destroy();
      }

      if (Hls.isSupported()) {
        hls = new Hls({
          debug: true,
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 90,
        });

        hls.loadSource(src);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsLoading(false);
          if (autoPlay) {
            video.play().catch((error) => {
              console.warn("Autoplay prevented:", error);
            });
          }
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.error("Network error, trying to recover...");
                hls?.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.error("Media error, trying to recover...");
                hls?.recoverMediaError();
                break;
              default:
                console.error("Unrecoverable error");
                hls?.destroy();
                break;
            }
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        video.addEventListener("loadedmetadata", () => {
          setIsLoading(false);
          if (autoPlay) {
            video.play().catch((error) => {
              console.warn("Autoplay prevented:", error);
            });
          }
        });
      }
    };

    setupHls();

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src, autoPlay]);

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-xl shadow-2xl bg-white p-4">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="w-16 h-16 border-4 border-[#e93f6e] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <video
        ref={videoRef}
        className="w-full aspect-video bg-black rounded-lg shadow-lg"
        poster={poster}
        playsInline
        controls
        autoPlay={false}
      />
    </div>
  );
};

const PlayerPage = () => {
  const hlsServerUrl =
    import.meta.env.VITE_HLS_SERVER_URL || "http://localhost:3000";
  const streamUrl = `${hlsServerUrl}/live.m3u8`;

  useEffect(() => {
    fetch(streamUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Servidor HLS no disponible");
        }
        console.log("Servidor HLS conectado correctamente");
      })
      .catch((error) => {
        console.error("Error conectando al servidor HLS:", error);
      });
  }, [streamUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e93f6e] to-[#f4e387] flex items-center justify-center p-6">
      <div className="w-full max-w-7xl mx-auto space-y-8 mt-16">
        <h1 className="text-4xl font-bold text-center text-white mb-8 tracking-tight">
          Big buck bunny
        </h1>
        <div className="relative">
          <VideoPlayer src={streamUrl} autoPlay controls />
          <div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-white/10"></div>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
