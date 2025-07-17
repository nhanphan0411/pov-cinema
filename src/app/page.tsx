"use client";

import { useEffect, useState } from "react";
import { storyGraph } from "@/data/storyGraph";
import { VideoPlayer } from "@/components/VideoPlayer";
import { ChoiceOverlay } from "@/components/ChoiceOverlay";

const WAIT_FOR_DOOR_ANSWER = 7000;

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasRung, setHasRung] = useState(false);
  const [showWaiting, setShowWaiting] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [currentNodeKey, setCurrentNodeKey] = useState("10");
  const [showChoices, setShowChoices] = useState(false);
  const [dotCount, setDotCount] = useState(1);
  const resetExperience = () => {
  setHasStarted(false);
  setHasRung(false);
  setShowWaiting(false);
  setShowStory(false);
  setShowChoices(false);
  setCurrentNodeKey("10");
};

  const node = storyGraph[currentNodeKey];

  // Handle doorbell delay
  useEffect(() => {
    if (hasRung) {
      setShowWaiting(true);
      const timer = setTimeout(() => {
        setShowWaiting(false);
        setShowStory(true);
      }, WAIT_FOR_DOOR_ANSWER);
      return () => clearTimeout(timer);
    }
  }, [hasRung]);

  // Animate dot count
  useEffect(() => {
    if (!showWaiting) return;
    const interval = setInterval(() => {
      setDotCount((prev) => (prev % 3) + 1);
    }, 400);
    return () => clearInterval(interval);
  }, [showWaiting]);

  const handleChoiceSelect = (next: string) => {
    setShowChoices(false);
    setCurrentNodeKey(next);
  };

  const handleVideoEnd = () => {
    const next = node.choices?.[0]?.next;

    // If there is only one choice and its label is empty (e.g., auto-proceed nodes)
    if (node.choices.length === 1 && node.choices[0].label === "" && next) {
      setCurrentNodeKey(next); // auto advance
      return;
    }

    if (node.choices.length > 0) {
      setShowChoices(true);
    }

    if (["13", "37"].includes(currentNodeKey)) {
    setTimeout(() => {
      resetExperience();
    }, 3000); // optional delay to give viewer a moment before restarting
  }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Click to Start */}
      {!hasStarted && (
        <div
          className="absolute inset-0 z-30 bg-black text-white flex items-center justify-center text-xl cursor-pointer"
          onClick={() => setHasStarted(true)}
        >
          Click to Start
        </div>
      )}

      {/* Looping idle video */}
      {hasStarted && !hasRung && (
        <VideoPlayer
          src="/videos/final_clips/00.MOV"
          onEnd={() => { }}
          loop
          muted
          freezeOnEnd={false}
        />
      )}

      {/* Ring Doorbell overlay */}
      {hasStarted && !hasRung && (
        <div className="absolute inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-10">
          <div className="relative flex items-center justify-center">
            <img
              src="/tagline.svg"
              alt="Tagline"
              className="w-auto h-auto rotate-slow"
            />
            <button
              onClick={() => setHasRung(true)}
              className="absolute px-6 py-3 rounded-full hover:bg-gray-200 transition"
            >
              <h1 className="text-white m-0 bellBtn">🔔</h1>
            </button>
          </div>
        </div>
      )}

      {/* Waiting screen */}
      {showWaiting && (
        <div className="absolute inset-0 flex items-center justify-center text-center bg-black text-white text-2xl z-20 font-mono">
          <span>
            coming
            <br />
            {".".repeat(dotCount)}
          </span>
        </div>
      )}

      {/* Story video */}
      {showStory && (
        <div className="absolute inset-0 z-0">
          <VideoPlayer
            key={currentNodeKey}
            src={node.src}
            onEnd={handleVideoEnd}
            muted={false}
            loop={false}
            freezeOnEnd={true}
          />
        </div>
      )}

      {/* Choices */}
      {showStory && showChoices && (
        <div className="flex flex-col backdrop-blur-md items-center z-20 absolute inset-0">
          <ChoiceOverlay choices={node.choices} onSelect={handleChoiceSelect} />
        </div>
      )}
    </div>
  );
}
