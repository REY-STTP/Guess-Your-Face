import type { Dictionary } from "../types";

export const enDictionary: Dictionary = {
  common: {
    loading: "Loading...",
    analyzing: "Analyzing...",
    comparing: "Comparing...",
    changeImage: "Change image",
    copyFaceToken: "Copy face token",
    copiedFaceToken: "Face token copied",
    manualCopyToast: "Token can be copied manually via the button on the card.",
    cropTitle: "Crop to 1:1",
    cropZoom: "Zoom",
    cropCancel: "Cancel",
    cropApply: "Apply",
    cropLoading: "Loading image...",
    dropzoneLabel: "Drag & drop facial photo here",
    dropzoneHint: "or click to browse - JPG / PNG, cropped to 1:1",
    close: "Close",
    backToHome: "Back to Home",
    yearsOld: "years",
    facePreviewAlt: "Face photo preview",
    languageSelectorLabel: "Language selector",
  },
  nav: {
    detect: "Detect",
    compare: "Compare",
    analyze: "Analyze",
    detectHint: "Face detection + attributes",
    compareHint: "Compare two faces (1:1)",
    analyzeHint: "Analyze face tokens",
  },
  home: {
    heroTitlePart1: "Read",
    heroTitleAccent: "your face",
    heroTitlePart2: "with real-time AI.",
    heroDesc:
      "Three AI-powered facial tools backed by Face++. Upload an image, inspect deep facial attributes, verify two portraits, and batch analyze face tokens in real time.",
    builtWith: "Built on Face++ (Detect, Compare, Face Analyze API).",
  },
  tools: {
    detect: {
      title: "Detect",
      badge: "Multi-Face & Attributes",
      desc: "Upload a photo to simultaneously detect all faces and read emotional spectra, age estimation, gender, and beauty scores.",
      action: "Start Face Detection",
      pageDesc:
        "Upload a photo to detect all faces and read emotions, age, gender, smile intensity, and key facial attributes with interactive bounding boxes.",
    },
    compare: {
      title: "Compare",
      badge: "1:1 Verification",
      desc: "Accurately compare two facial photos with confidence score visualization and official Face++ thresholds.",
      action: "Compare 2 Photos",
      pageDesc:
        "Upload two portrait photos to determine whether they belong to the same person (1:1 matching) with confidence score and threshold verdicts.",
    },
    analyze: {
      title: "Analyze",
      badge: "Deep Batch",
      desc: "Deeply inspect detailed facial attributes from a batch of registered face tokens without re-uploading.",
      action: "Inspect Face Tokens",
      pageDesc:
        "Enter face tokens (from Detect results) to analyze deep attributes without re-uploading images. Up to 5 tokens per request.",
    },
  },
  tldr: {
    label: "TL;DR",
    howItWorks: "How it works",
    items: {
      detect: {
        tldr:
          "Upload a photo to detect every face at once and read seven emotions (Anger, Disgust, Fear, Happiness, Neutral, Sadness, Surprise), age, gender, smile intensity, beauty score, 3D headpose, and face quality. Results render in real time with interactive bounding boxes drawn on each detected face.",
        steps: [
          "Drop a JPG or PNG photo (max 2 MB) into the dropzone.",
          "Crop to 1:1 with the interactive canvas if needed.",
          "Read the per-face metric cards: emotion bars, age, gender, smile, beauty, headpose, face quality.",
          "Copy each face_token to inspect deeper attributes in Analyze.",
        ],
      },
      compare: {
        tldr:
          "Upload two portrait photos and decide whether they show the same person (1:1 face matching). Guess Your Face returns a confidence score and applies Face++ false-positive thresholds (1e-3, 1e-4, 1e-5) so you can pick how strict the verdict should be.",
        steps: [
          "Drop the first photo (Photo 1) into the left dropzone.",
          "Drop the second photo (Photo 2) into the right dropzone.",
          "Crop each independently to 1:1 if needed.",
          "Read the confidence score and the threshold verdict (Same / Different).",
        ],
      },
      analyze: {
        tldr:
          "Paste up to 5 face_tokens from a previous Detect run to inspect deep attributes without re-uploading the photo: gender, age, emotion, smiling, face quality, beauty, mouth status (surgical / medical mask), and eye status (glasses / sunglasses / occlusion).",
        steps: [
          "Copy one or more face_tokens from the Detect result cards.",
          "Paste them into the textarea (comma- or newline-separated).",
          "Pick which attributes to analyze (modular filters).",
          "Read the deep attribute breakdown per token.",
        ],
      },
    },
  },
  marketing: {
    aboutKicker: "About",
    aboutHeading: "About Guess Your Face",
    aboutP1:
      "Guess Your Face is a free, real-time AI facial analysis web application powered by Face++ Cognitive Services. It detects faces in photos, compares two portraits for identity verification (1:1 matching), and analyzes face tokens for seven emotional states and ten or more facial attributes — all processed in-memory with zero data retention.",
    aboutP2:
      "Three tools are available: Detect (multi-face detection with emotion, age, gender, smile, beauty, headpose, and face quality scores), Compare (1:1 face matching with confidence score and Face++ false-positive thresholds), and Analyze (deep attribute inspection for up to 5 face tokens, including mask and glasses detection).",
    aboutP3:
      "All uploaded images are processed in-memory and never stored on disk, server, or database. No login is required. The codebase is open source under the MIT License.",
    stats: {
      emotionClasses: "Emotion classes",
      attributes: "Attributes",
      maxTokens: "Max tokens / request",
      imageSize: "Image size limit",
    },
    pickKicker: "Pick a tool",
    pickHeading: "Which tool should I use?",
    card: {
      featured: "Start",
      tool: "Tool",
      inLabel: "in:",
      open: "Open",
    },
    compareCards: {
      detect: {
        when: "You want to read emotions and attributes from a photo.",
        input: "1 photo",
        output: [
          "face_token",
          "7 emotions",
          "age + gender",
          "smile + beauty",
          "headpose",
          "face quality",
        ],
      },
      compare: {
        when: "You want to check if two photos show the same person.",
        input: "2 photos",
        output: [
          "confidence score",
          "thresholds 1e-3, 1e-4, 1e-5",
          "Same / Different verdict",
        ],
      },
      analyze: {
        when:
          "You already have face_tokens from Detect and want deep attributes.",
        input: "1–5 face tokens",
        output: [
          "mask status",
          "glasses status",
          "emotion + beauty",
          "more",
        ],
      },
    },
    faqKicker: "FAQ",
    faqHeading: "Frequently asked questions",
  },
  faqs: [
    {
      question: "Is Guess Your Face free?",
      answer:
        "Yes, Guess Your Face is completely free. There is no signup, no subscription, and no analytics on your photos. All three tools (Detect, Compare, Analyze) run in your browser against our secure API.",
    },
    {
      question: "Are my photos stored on a server?",
      answer:
        "No. All uploaded images are processed in-memory and immediately discarded after the Face++ API responds. Nothing is written to disk, server, or database. The privacy-first architecture is verifiable in the open-source code.",
    },
    {
      question: "How accurate is the emotion detection?",
      answer:
        "Emotion scores are produced by Face++ deep learning models trained on large datasets. Confidence varies by image quality, lighting, and face angle, but the seven emotion classes (Anger, Disgust, Fear, Happiness, Neutral, Sadness, Surprise) are typically reliable for clear frontal faces.",
    },
    {
      question: "What is the difference between Detect, Compare, and Analyze?",
      answer:
        "Detect finds all faces in a photo and reads 7 emotions plus age, gender, smile, beauty, headpose, and face quality. Compare verifies whether two portrait photos show the same person with a 1:1 matching confidence score. Analyze inspects previously detected faces (via face_token) for deeper attributes like mask wearing, eye status, and glasses, up to 5 tokens per request.",
    },
    {
      question: "What is a face token?",
      answer:
        "A face_token is a unique identifier returned by Face++ for each detected face. You can copy it from Detect results and paste it into the Analyze tool to inspect deep attributes without re-uploading the original photo. Face tokens are session-only and expire automatically.",
    },
    {
      question: "Do I need to create an account?",
      answer:
        "No. Guess Your Face has no login, no signup, and no user accounts. Upload an image, read the result, and close the tab.",
    },
    {
      question: "Which languages are supported?",
      answer:
        "Indonesian (default) and English. Switch via the language toggle in the page header. Your choice is saved in your browser's localStorage.",
    },
    {
      question: "Which image formats and sizes are supported?",
      answer:
        "JPG and PNG only, with a maximum file size of 2 MB. Photos are cropped to a 1:1 aspect ratio via an interactive canvas cropper before being sent to Face++.",
    },
    {
      question: "Why does the API sometimes fail?",
      answer:
        "Common reasons: image too large (over 2 MB), unsupported format, no face detected in the photo, Face++ quota exhausted, or temporary rate limit. The UI displays a localized error message explaining the exact cause.",
    },
    {
      question: "Is Guess Your Face open source?",
      answer:
        "Yes. The full source code is available at https://github.com/REY-STTP/Guess-Your-Face under the MIT License. You can audit the privacy claims, file issues, or fork it for your own project.",
    },
  ],
  detect: {
    actionLabel: "Detect Faces",
    faceDetected: "faces detected",
    indexInfo: "Numbered labels on image correspond with result cards below.",
    faceTitle: "Face",
    detectAnother: "Detect another image",
    goToAnalyze: "Analyze face tokens",
    metrics: {
      gender: "Gender",
      age: "Age",
      smiling: "Smiling",
      beauty: "Beauty",
      faceQuality: "Face quality",
      headpose: "Head pose",
    },
    toasts: {
      tokensCopied: "Face tokens copied to clipboard.",
      unknownError: "An unknown error occurred.",
      connectionError: "Failed to connect to server. Please try again.",
    },
  },
  compare: {
    photo1Label: "Photo 1",
    photo2Label: "Photo 2",
    actionLabel: "Compare Faces",
    compareAgain: "Compare again",
    confidenceTitle: "Matching Confidence",
    confidenceExplanation:
      "The higher the confidence score, the higher the likelihood that both faces are the same individual.",
    same: "Same",
    different: "Different",
    footnote:
      "Verdict follows Face++ false-positive thresholds: 1e-3 is lenient, 1e-5 is strict.",
    changePhoto1: "Change photo 1",
    changePhoto2: "Change photo 2",
    toasts: {
      unknownError: "An unknown error occurred.",
      connectionError: "Failed to connect to server. Please try again.",
    },
  },
  analyze: {
    textareaLabel: "Face tokens",
    textareaPlaceholder:
      "Separate with commas or newlines.\ne.g.: 5a23f8b1..., 9d2c1f00...",
    textareaHint: "Obtain from Detect results. Maximum 5 tokens per request.",
    filterLabel: "Attributes to analyze",
    actionLabel: "Analyze Faces",
    analyzeAgain: "Analyze again",
    maxTokensError: "Maximum 5 face tokens allowed per request.",
    faceTitle: "Face",
    attributes: {
      gender: "Gender",
      age: "Age",
      emotion: "Emotion",
      smiling: "Smiling",
      facequality: "Face quality",
      beauty: "Beauty",
      mouthstatus: "Mouth status",
      eyestatus: "Eye status",
      leftEye: "Left eye",
      rightEye: "Right eye",
    },
    mouth: {
      noMask: "no mask",
      surgicalMask: "surgical mask",
      medicalMask: "medical mask",
      mouthOpen: "mouth open",
      mouthOccluded: "mouth occluded",
    },
    eye: {
      open: "open",
      closed: "closed",
      normalGlassesOpen: "open (glasses)",
      normalGlassesClosed: "closed (glasses)",
      darkGlasses: "sunglasses",
      occlusion: "occluded",
    },
    toasts: {
      unknownError: "An unknown error occurred.",
      connectionError: "Failed to connect to server. Please try again.",
    },
  },
  emotions: {
    anger: "Anger",
    disgust: "Disgust",
    fear: "Fear",
    happiness: "Happiness",
    neutral: "Neutral",
    sadness: "Sadness",
    surprise: "Surprise",
    genderMale: "Male",
    genderFemale: "Female",
  },
  notFound: {
    title: "404 · Page Not Found",
    desc: "The face or page you are looking for is unavailable. You can return to the homepage or start detecting faces.",
    startDetect: "Start Detecting",
  },
  footer: {
    disclaimer:
      "Guess Your Face - powered by Face++. Images are processed in-memory and never stored.",
  },
};
