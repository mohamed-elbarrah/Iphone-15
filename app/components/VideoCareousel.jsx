import { useState, useEffect } from "react";
import { hightlightsSlides } from "../constants";

const VideoCarousel = () => {
  // Simple state management
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Handle when a video ends
  const handleVideoEnd = (videoIndex) => {
    // If it's the last video, go back to first video
    if (videoIndex === hightlightsSlides.length - 1) {
      setCurrentVideo(0);
    } else {
      // Go to next video
      setCurrentVideo(videoIndex + 1);
    }
  };

  // Handle clicking on progress indicators
  const handleIndicatorClick = (index) => {
    setCurrentVideo(index);
  };

  // Update progress in real-time
  const updateProgress = () => {
    const videoElement = document.getElementById(`video-${currentVideo}`);
    if (videoElement && videoElement.duration) {
      const currentProgress =
        (videoElement.currentTime / videoElement.duration) * 100;
      setProgress(currentProgress);
    }
  };

  // Auto-play videos when currentVideo changes
  useEffect(() => {
    const videoElement = document.getElementById(`video-${currentVideo}`);

    if (videoElement) {
      // Reset progress when changing videos
      setProgress(0);

      // Pause all videos first
      hightlightsSlides.forEach((_, index) => {
        const video = document.getElementById(`video-${index}`);
        if (video && index !== currentVideo) {
          video.pause();
        }
      });

      // Play current video
      videoElement.currentTime = 0;
      videoElement
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.log("Video play error:", error));
    }
  }, [currentVideo]);

  // Track progress while video is playing
  useEffect(() => {
    let intervalId;

    if (isPlaying) {
      // Update progress every 100ms for smooth animation
      intervalId = setInterval(updateProgress, 100);
    }

    // Cleanup interval when component unmounts or video stops
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, currentVideo]);

  return (
    <div className="w-full">
      {/* Video Container */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentVideo * 100}%)` }}
        >
          {hightlightsSlides.map((slide, index) => (
            <div key={slide.id} className="w-full flex-shrink-0 px-4">
              <div className="relative w-full h-[70vh] bg-black rounded-3xl overflow-hidden">
                <video
                  id={`video-${index}`}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  onEnded={() => handleVideoEnd(index)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src={slide.video} type="video/mp4" />
                </video>

                {/* Video Text Overlay */}
                <div className="absolute top-12 left-8 z-10">
                  {slide.textLists.map((text, textIndex) => (
                    <p
                      key={textIndex}
                      className="text-white text-xl md:text-2xl font-bold mb-2"
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-3 bg-black/80 backdrop-blur-sm rounded-full py-4 px-6">
          {hightlightsSlides.map((_, index) => (
            <div
              key={index}
              className="relative cursor-pointer"
              onClick={() => handleIndicatorClick(index)}
            >
              {/* Background indicator */}
              <div
                className={`h-3 rounded-full transition-all duration-300 bg-gray-600 hover:bg-gray-500 ${
                  index === currentVideo ? "w-12" : "w-3"
                }`}
              >
                {/* Progress fill */}
                <div
                  className="h-full rounded-full transition-all duration-100"
                  style={{
                    width:
                      index < currentVideo
                        ? "100%"
                        : index === currentVideo
                        ? `${progress}%`
                        : "0%",
                    backgroundColor:
                      index < currentVideo || index === currentVideo
                        ? "white"
                        : "transparent",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoCarousel;
