type Choice = {
  label: string;
  next: string;
};

type StoryNode = {
  src: string;
  choices: Choice[];
};

export const storyGraph: Record<string, StoryNode> = {
  "twin_intro": {
    src: "/videos/twin_intro.mp4",
    choices: [
      { label: "Believe him", next: "twin_choice1" },
      { label: "Doubt him", next: "twin_choice2" },
      { label: "Say nothing", next: "stripper_intro" }
    ]
  },
  "twin_choice1": {
    src: "/videos/twin_choice1.mp4",
    choices: []
  }
  // ... other story nodes
};
