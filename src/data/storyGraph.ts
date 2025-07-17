type Choice = {
  label: string;
  next: string;
};

type StoryNode = {
  src: string;
  choices: Choice[];
};

export const storyGraph: Record<string, StoryNode> = {

  "00": {
    src: "/videos/final_clips/00.mov",
    choices: []
  },

  "10": {
    src: "/videos/final_clips/10 (test).mov",
    choices: [
      { label: "i think our date would be so short.", next: "11" },
      { label: "romance is dead. i don't believe in love.", next: "31" },
    ]
  },

  // ================================================ LINE 1 ==================================================== 

  "11": {
    src: "/videos/final_clips/11.mov",
    choices: [
      { label: "you are too fast!", next: "12A" },
      { label: "time is too fast!", next: "12B" },
    ]
  },

  "12A": {
    src: "/videos/final_clips/12A.mov",
    choices: [{ label: "", next: "unlocked_1" }]
  },

  "12B": {
    src: "/videos/final_clips/12B.mov",
    choices: [{ label: "", next: "unlocked_1" }]
  },

  "13": {
    src: "/videos/final_clips/13.mp4",
    choices: []
  },

  // ================================================ LINE 3 ====================================================

  "31": {
    src: "/videos/final_clips/31.mov",
    choices: [
      { label: "what else you are beside an artist?", next: "32" },
      { label: "tell me your secret.", next: "32" },
    ]
  },

  "32": {
  src: "/videos/final_clips/32.mov",
  choices: [
    { label: "yes. i'm here to get to know you no?", next: "33" },
    { label: "hmm... still not sure if i want this version of you.", next: "31" },
    ]
  },

  "33": {
  src: "/videos/final_clips/33.mov",
  choices: [
    { label: "yes, of course", next: "34" },
    { label: "hmm... no.", next: "10" },
    ]
  },

  "34": {
  src: "/videos/final_clips/34.mov",
  choices: [
    { label: "pose for me.", next: "35A" },
    { label: "turn around & bend over for me.", next: "35B" },
    ]
  },

  "35A": {
  src: "/videos/final_clips/35A.mov",
  choices: [
    { label: "stick your tongue out.", next: "36A" },
    { label: "slap yourself.", next: "36B" },
    ]
  },

  "35B": {
  src: "/videos/final_clips/35B.mov",
  choices: [
    { label: "stick your tongue out.", next: "36A" },
    { label: "slap yourself.", next: "36B" },
    ]
  },

  "36A": {
  src: "/videos/final_clips/36A.mov",
  choices: [
    { label: "take your clothes off for me.", next: "unlocked_3" },
    { label: "this is too much. how about ...tell you about your past loves.", next: "11" }
    ]
  },

  "36B": {
  src: "/videos/final_clips/36B.mov",
  choices: [
    { label: "take your clothes off for me.", next: "unlocked_3" },
    { label: "this is too much. how about... tell you about your past lovers.", next: "11" }
    ]
  },

  "37": {
  src: "/videos/final_clips/37.mov",
  choices: []
  },

  // ================================================ LINE 3 ====================================================
  "unlocked_1" : {
    src: "/videos/final_clips/unlocked.mov",
    choices: [
      {label: "", next: "13"}
    ]
  },

  "unlocked_3" : {
    src: "/videos/final_clips/unlocked.mov",
    choices: [
      {label: "", next: "37"}
    ]
  }
};

