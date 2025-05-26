type Choice = {
  label: string;
  next: string;
};

type StoryNode = {
  src: string;
  choices: Choice[];
};

export const storyGraph: Record<string, StoryNode> = {
  "test_intro": {
    src: "/videos/english_cut.webm",
    choices: [
      { label: "spanish", next: "test_choice1" },
      { label: "hindi", next: "test_choice2" },
      { label: "german", next: "test_choice3" }
    ]
  },

  "test_choice1": {
    src: "/videos/spanish.webm",
    choices: []
  },

  "test_choice2": {
    src: "/videos/hindi_cut.webm",
    choices: []
  },

  "test_choice3": {
    src: "/videos/german.webm",
    choices: []
  },


  // TBC: other story nodes
};
