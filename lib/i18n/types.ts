export type Locale = "id" | "en";

export type Dictionary = {
  common: {
    loading: string;
    analyzing: string;
    comparing: string;
    changeImage: string;
    copyFaceToken: string;
    copiedFaceToken: string;
    manualCopyToast: string;
    cropTitle: string;
    cropZoom: string;
    cropCancel: string;
    cropApply: string;
    cropLoading: string;
    dropzoneLabel: string;
    dropzoneHint: string;
    close: string;
    backToHome: string;
    yearsOld: string;
    facePreviewAlt: string;
    languageSelectorLabel: string;
  };
  nav: {
    detect: string;
    compare: string;
    analyze: string;
    detectHint: string;
    compareHint: string;
    analyzeHint: string;
  };
  home: {
    heroTitlePart1: string;
    heroTitleAccent: string;
    heroTitlePart2: string;
    heroDesc: string;
    builtWith: string;
  };
  tools: {
    detect: {
      title: string;
      badge: string;
      desc: string;
      action: string;
      pageDesc: string;
    };
    compare: {
      title: string;
      badge: string;
      desc: string;
      action: string;
      pageDesc: string;
    };
    analyze: {
      title: string;
      badge: string;
      desc: string;
      action: string;
      pageDesc: string;
    };
  };
  tldr: {
    label: string;
    howItWorks: string;
    items: {
      detect: {
        tldr: string;
        steps: string[];
      };
      compare: {
        tldr: string;
        steps: string[];
      };
      analyze: {
        tldr: string;
        steps: string[];
      };
    };
  };
  marketing: {
    aboutKicker: string;
    aboutHeading: string;
    aboutP1: string;
    aboutP2: string;
    aboutP3: string;
    stats: {
      emotionClasses: string;
      attributes: string;
      maxTokens: string;
      imageSize: string;
    };
    pickKicker: string;
    pickHeading: string;
    card: {
      featured: string;
      tool: string;
      inLabel: string;
      open: string;
    };
    compareCards: {
      detect: {
        when: string;
        input: string;
        output: string[];
      };
      compare: {
        when: string;
        input: string;
        output: string[];
      };
      analyze: {
        when: string;
        input: string;
        output: string[];
      };
    };
    faqKicker: string;
    faqHeading: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  detect: {
    actionLabel: string;
    faceDetected: string;
    indexInfo: string;
    faceTitle: string;
    detectAnother: string;
    goToAnalyze: string;
    metrics: {
      gender: string;
      age: string;
      smiling: string;
      beauty: string;
      faceQuality: string;
      headpose: string;
    };
    toasts: {
      tokensCopied: string;
      unknownError: string;
      connectionError: string;
    };
  };
  compare: {
    photo1Label: string;
    photo2Label: string;
    actionLabel: string;
    compareAgain: string;
    confidenceTitle: string;
    confidenceExplanation: string;
    same: string;
    different: string;
    footnote: string;
    changePhoto1: string;
    changePhoto2: string;
    toasts: {
      unknownError: string;
      connectionError: string;
    };
  };
  analyze: {
    textareaLabel: string;
    textareaPlaceholder: string;
    textareaHint: string;
    filterLabel: string;
    actionLabel: string;
    analyzeAgain: string;
    maxTokensError: string;
    faceTitle: string;
    attributes: {
      gender: string;
      age: string;
      emotion: string;
      smiling: string;
      facequality: string;
      beauty: string;
      mouthstatus: string;
      eyestatus: string;
      leftEye: string;
      rightEye: string;
    };
    mouth: {
      noMask: string;
      surgicalMask: string;
      medicalMask: string;
      mouthOpen: string;
      mouthOccluded: string;
    };
    eye: {
      open: string;
      closed: string;
      normalGlassesOpen: string;
      normalGlassesClosed: string;
      darkGlasses: string;
      occlusion: string;
    };
    toasts: {
      unknownError: string;
      connectionError: string;
    };
  };
  emotions: {
    anger: string;
    disgust: string;
    fear: string;
    happiness: string;
    neutral: string;
    sadness: string;
    surprise: string;
    genderMale: string;
    genderFemale: string;
  };
  notFound: {
    title: string;
    desc: string;
    startDetect: string;
  };
  footer: {
    disclaimer: string;
  };
};
