"use client"

import { useState } from 'react';
import { storyGraph } from '@/data/storyGraph';
import { VideoPlayer } from '@/components/VideoPlayer';
import { ChoiceOverlay } from '@/components/ChoiceOverlay';

export default function Home() {
  const [currentNodeKey, setCurrentNodeKey] = useState("test_intro");
  const [showChoices, setShowChoices] = useState(false);

  const node = storyGraph[currentNodeKey];

  return (
    <div className="relative w-full h-screen bg-black">
      <div className={`absolute inset-0 transition duration-300 ${showChoices ? 'blur-sm' : ''}`}>
        <VideoPlayer
          src={node.src}
          onEnd={() => setShowChoices(true)}
        />
      </div>

      {showChoices && (
        <ChoiceOverlay
          choices={node.choices}
          onSelect={(next) => {
            setShowChoices(false);
            setCurrentNodeKey(next);
          }}
        />
      )}
    </div>

  );
}
