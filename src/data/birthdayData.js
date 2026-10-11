const recipientName = "JANHABIIIIII";
const birthdayNickname = "JANVI";
const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;

export const birthdayData = {
  name: recipientName,
  openingName: recipientName,
  nicknames: {
    main: recipientName,
    cute: birthdayNickname,
  },
  birthdayAge: 18,
  previousAge: 17,
  cakeSwipeText: "swipe to cut the cake",
  cakeBirthdayGreeting: `Happy Birthday, ${recipientName}! 🎂✨`,
  lockPrompt: "What I call your coaching class!!??",
  lockCode: "DOKAN",
  lockError: "Not quite — try again",
  funnyEyebrow: "one more thing...",
  funnyHeading: "Allways my favourite photo! 🥹💛",
  funnyCaption: "Wish to have many more such trips!! 🧳💖",
  littleThings: [
    "When we met for the first time, I never thought this bonding will turn so pure and deep.",
    "When I am anxious and sad, I remember the 'Abhi!!!' you call me and it gives me strength to face the world.",
    "Can never thank you enough for existing in my life and being my friend. As I always say 2024 was the best year of my life.",
    "I am so glad that we met and became friends. I will always cherish our friendship and the memories we have created together.",
  ],
  envelopeLastEyebrow: "saved this for near the end...",
  finalTreeEyebrow: "and at the very end...",
  introWhisper: "pssst...",
  bedroomHint: "there's something here",
  envelopeText: "I have something for you...",
  birthdayHeading: `Happy Birthday, ${recipientName}! 🎂✨`,
  treeHeading: "a few things worth remembering",
  treeMessage: "Thanks for still tolerating my nonsense and being by my side, when the world is against me.",
  galleryHeading: "some favourite pictures",
  gallerySubheading: "tap on the photos for next",
  galleryCaptions: [
    "BEST TRIP EVER!! ✈️🌊",
    "HEROINEE ON THE ROLLL! 🎬✨",
    "THE RASTAA 🛣️🌿",
    "MO CHUTTII EMITI KAEN UDUCHI! 😡",
    "ALL TIRED AFTER THE PUJA PREP!! 😴🪔",
    "PURI!! 🌊🐚",
  ],
  memoriesHeading: "Special memories",
  memoriesSubheading: "use the dots below to navigate to next image",
  memoryCaptions: [
    "The One with the Ekamra Haat Market (Looking awesone!!)",
    "The One with the First Meet-Up (Ignore her in the middle!!)",
    "The One with the Biriyanii! (Really miss those days!!)",
  ],
  memoryDates: ["", "", ""],
  specialVideoEyebrow: "one memory deserves its own page...",
  specialVideoHeading: "a special memory",
  specialVideoCaption: "First Puri Trip with you and the gang 🌊🚗💛",
  oneMoreThingPrompt: "one more thing...",
  oneMoreThingMessage: "PLACE_YOUR_MESSAGE_HERE",
  letterHeading: `A letter for ${birthdayNickname}`,
  birthdayLetter: `I don't know how things went in the past, I know I have been a bit of a jerk sometimes, but I was and will always be your greatest cheerleader. Yeah! u heard it right. It's not you, it's me. I really want to make your birthday meorable, even tho things were not going in my favour. 
Hope this little story brings a smile to your face and makes you feel special. 
  
Your Crusher 😉, 
Abhi!`,
  finalHeading: `Happy Birthday, ${birthdayNickname}! 🎂✨`,
  finalMessage: "PLACE_YOUR_FINAL_MESSAGE_HERE",
  finalHiddenPrompt: "one last thing...",
  finalHiddenMessage: "PLACE_YOUR_HIDDEN_MESSAGE_HERE",
  buttons: {
    openEnvelope: "open this",
    seeWhatIFound: "continue",
    oneMoreThing: "one more thing",
    continue: "continue",
    unlockNext: "unlock the next part",
    next: "Next",
  },
};

export const photos = {
  funny: {
    src: assetUrl("assets/photos/funny-placeholder.jpeg"),
    alt: "Photo placeholder",
  },
  gallery: [
    { src: assetUrl("assets/photos/gallery-01.jpeg"), alt: "Photo placeholder 1" },
    { src: assetUrl("assets/photos/gallery-02.jpeg"), alt: "Photo placeholder 2" },
    { src: assetUrl("assets/photos/gallery-03.jpeg"), alt: "Photo placeholder 3" },
    { src: assetUrl("assets/photos/gallery-04.jpeg"), alt: "Photo placeholder 4" },
    { src: assetUrl("assets/photos/gallery-05.jpeg"), alt: "Photo placeholder 5" },
    { src: assetUrl("assets/photos/gallery-06.jpeg"), alt: "Photo placeholder 6" },
  ],
  final: {
    src: assetUrl("assets/photos/final-placeholder.jpeg"),
    alt: "Final photo placeholder",
  },
  memories: [
    { src: assetUrl("assets/photos/memory-01.jpeg"), alt: "Memory placeholder 1" },
    { src: assetUrl("assets/photos/memory-02.jpeg"), alt: "Memory placeholder 2" },
    { src: assetUrl("assets/photos/memory-03.jpeg"), alt: "Memory placeholder 3" },
  ],
};

export const specialMemoryVideoSrc = assetUrl("assets/videos/special-memory.mp4");
export const musicSrc = assetUrl("assets/music/music.mp3");
