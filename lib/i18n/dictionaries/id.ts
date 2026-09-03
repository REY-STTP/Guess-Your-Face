import type { Dictionary } from "../types";

export const idDictionary: Dictionary = {
  common: {
    loading: "Memuat...",
    analyzing: "Menganalisis...",
    comparing: "Membandingkan...",
    changeImage: "Ganti gambar",
    copyFaceToken: "Salin face token",
    copiedFaceToken: "Face token tersalin",
    manualCopyToast: "Token dapat disalin manual lewat tombol di kartu.",
    cropTitle: "Pangkas ke 1:1",
    cropZoom: "Zoom",
    cropCancel: "Batal",
    cropApply: "Terapkan",
    cropLoading: "Memuat gambar...",
    dropzoneLabel: "Seret & lepas foto wajah di sini",
    dropzoneHint: "atau klik untuk memilih - JPG / PNG, dipangkas ke 1:1",
    close: "Tutup",
    backToHome: "Kembali ke Beranda",
    yearsOld: "tahun",
    facePreviewAlt: "Pratinjau foto wajah",
    languageSelectorLabel: "Pemilih bahasa",
  },
  nav: {
    detect: "Detect",
    compare: "Compare",
    analyze: "Analyze",
    detectHint: "Deteksi wajah + atribut",
    compareHint: "Bandingkan dua wajah (1:1)",
    analyzeHint: "Analisis face token",
  },
  home: {
    heroTitlePart1: "Tebak",
    heroTitleAccent: "wajahmu",
    heroTitlePart2: "biar AI yang membaca.",
    heroDesc:
      "Tiga alat deteksi wajah bertenaga Face++. Unggah gambar, dapatkan atribut wajah, bandingkan dua foto, dan analisis face token. Semua diproses real-time dan tidak disimpan.",
    builtWith: "Dibangun di atas Face++ (Detect, Compare, Face Analyze API).",
  },
  tools: {
    detect: {
      title: "Detect",
      badge: "Multi-Face & Atribut",
      desc: "Unggah foto, deteksi semua wajah secara serentak, serta analisis spektrum emosi, estimasi usia, gender, dan beauty score.",
      action: "Mulai Deteksi Wajah",
      pageDesc:
        "Unggah foto, lalu aplikasi mendeteksi semua wajah dan membaca emosi, usia, jenis kelamin, senyum, dan atribut lainnya. Wajah yang terdeteksi otomatis diberi penanda di gambar.",
    },
    compare: {
      title: "Compare",
      badge: "1:1 Verification",
      desc: "Bandingkan dua foto wajah secara akurat dengan skor confidence dan toleransi threshold Face++.",
      action: "Bandingkan 2 Foto",
      pageDesc:
        "Unggah dua foto wajah dan bandingkan apakah keduanya orang yang sama (1:1). Dapatkan skor confidence beserta ambang batas kesamaan.",
    },
    analyze: {
      title: "Analyze",
      badge: "Deep Batch",
      desc: "Inspeksi atribut mendalam dari sekumpulan face token yang sudah dideteksi sebelumnya.",
      action: "Inspeksi Face Token",
      pageDesc:
        "Masukkan face token (dari hasil Detect) untuk menganalisis atribut wajah tanpa mengunggah ulang gambar. Maksimal 5 token per permintaan.",
    },
  },
  tldr: {
    label: "TL;DR",
    howItWorks: "Cara pakai",
    items: {
      detect: {
        tldr:
          "Unggah foto untuk mendeteksi semua wajah sekaligus dan membaca tujuh emosi (Marah, Jijik, Takut, Bahagia, Netral, Sedih, Terkejut), usia, jenis kelamin, intensitas senyum, beauty score, headpose 3D, dan kualitas wajah. Hasil ditampilkan real-time dengan bounding box interaktif pada setiap wajah.",
        steps: [
          "Letakkan foto JPG atau PNG (maks 2 MB) ke dropzone.",
          "Pangkas ke 1:1 lewat kanvas interaktif jika diperlukan.",
          "Baca kartu metrik per wajah: bar emosi, usia, gender, senyum, beauty, headpose, kualitas wajah.",
          "Salin setiap face_token untuk memeriksa atribut lebih dalam di Analyze.",
        ],
      },
      compare: {
        tldr:
          "Unggah dua foto wajah dan tentukan apakah orangnya sama (1:1 face matching). Guess Your Face mengembalikan skor confidence dan menerapkan ambang false-positive Face++ (1e-3, 1e-4, 1e-5) supaya kamu bisa memilih seberapa ketat putusannya.",
        steps: [
          "Letakkan foto pertama (Foto 1) ke dropzone kiri.",
          "Letakkan foto kedua (Foto 2) ke dropzone kanan.",
          "Pangkas masing-masing ke 1:1 jika diperlukan.",
          "Baca skor confidence dan putusan ambang (Sama / Beda).",
        ],
      },
      analyze: {
        tldr:
          "Tempelkan hingga 5 face_token dari hasil Detect sebelumnya untuk menginspeksi atribut mendalam tanpa unggah ulang: gender, usia, emosi, senyum, kualitas wajah, beauty, status mulut (masker bedah / medis), dan status mata (kacamata / kacamata hitam / terhalang).",
        steps: [
          "Salin satu atau beberapa face_token dari kartu hasil Detect.",
          "Tempelkan ke area teks (pisahkan dengan koma atau baris baru).",
          "Pilih atribut yang ingin dianalisis (filter modular).",
          "Baca rincian atribut mendalam per token.",
        ],
      },
    },
  },
  marketing: {
    aboutKicker: "Tentang",
    aboutHeading: "Tentang Guess Your Face",
    aboutP1:
      "Guess Your Face adalah aplikasi web analisis wajah AI gratis dan real-time yang ditenagai Face++ Cognitive Services. Aplikasi ini mendeteksi wajah di foto, membandingkan dua potret untuk verifikasi identitas (1:1 matching), dan menganalisis face token untuk tujuh kondisi emosi serta sepuluh atau lebih atribut wajah — semua diproses di memori dengan tanpa penyimpanan data.",
    aboutP2:
      "Tiga alat tersedia: Detect (deteksi multi-wajah dengan skor emosi, usia, gender, senyum, beauty, headpose, dan kualitas wajah), Compare (1:1 face matching dengan skor confidence dan ambang false-positive Face++), dan Analyze (inspeksi atribut mendalam untuk hingga 5 face token, termasuk deteksi masker dan kacamata).",
    aboutP3:
      "Semua gambar yang diunggah diproses di memori dan tidak pernah disimpan di disk, server, maupun basis data. Tidak perlu login. Basis kode sumber terbuka di bawah Lisensi MIT.",
    stats: {
      emotionClasses: "Kelas emosi",
      attributes: "Atribut",
      maxTokens: "Maks token / permintaan",
      imageSize: "Batas ukuran gambar",
    },
    pickKicker: "Pilih alat",
    pickHeading: "Alat mana yang sebaiknya dipakai?",
    card: {
      featured: "Mulai",
      tool: "Alat",
      inLabel: "masukan:",
      open: "Buka",
    },
    compareCards: {
      detect: {
        when: "Kamu ingin membaca emosi dan atribut dari sebuah foto.",
        input: "1 foto",
        output: [
          "face_token",
          "7 emosi",
          "usia + gender",
          "senyum + beauty",
          "headpose",
          "kualitas wajah",
        ],
      },
      compare: {
        when:
          "Kamu ingin mengecek apakah dua foto menunjukkan orang yang sama.",
        input: "2 foto",
        output: [
          "skor confidence",
          "ambang 1e-3, 1e-4, 1e-5",
          "putusan Sama / Beda",
        ],
      },
      analyze: {
        when:
          "Kamu sudah punya face_token dari Detect dan ingin atribut yang lebih dalam.",
        input: "1–5 face token",
        output: [
          "status masker",
          "status kacamata",
          "emosi + beauty",
          "lainnya",
        ],
      },
    },
    faqKicker: "FAQ",
    faqHeading: "Pertanyaan yang sering diajukan",
  },
  faqs: [
    {
      question: "Apakah Guess Your Face gratis?",
      answer:
        "Ya, Guess Your Face sepenuhnya gratis. Tidak ada pendaftaran, tidak ada langganan, dan tidak ada analitik pada fotomu. Ketiga alat (Detect, Compare, Analyze) berjalan di browser terhadap API aman kami.",
    },
    {
      question: "Apakah foto saya disimpan di server?",
      answer:
        "Tidak. Semua gambar yang diunggah diproses di memori dan langsung dibuang setelah Face++ API merespons. Tidak ada yang ditulis ke disk, server, atau basis data. Arsitektur yang mengutamakan privasi ini bisa diverifikasi pada kode sumber terbuka.",
    },
    {
      question: "Seberapa akurat deteksi emosinya?",
      answer:
        "Skor emosi dihasilkan oleh model deep learning Face++ yang dilatih pada dataset besar. Keyakinan bervariasi tergantung kualitas gambar, pencahayaan, dan sudut wajah, tetapi tujuh kelas emosi (Marah, Jijik, Takut, Bahagia, Netral, Sedih, Terkejut) umumnya dapat diandalkan untuk wajah frontal yang jelas.",
    },
    {
      question: "Apa perbedaan Detect, Compare, dan Analyze?",
      answer:
        "Detect menemukan semua wajah di foto dan membaca 7 emosi serta usia, gender, senyum, beauty, headpose, dan kualitas wajah. Compare memverifikasi apakah dua foto potret menunjukkan orang yang sama dengan skor pencocokan 1:1. Analyze memeriksa wajah yang sebelumnya terdeteksi (melalui face_token) untuk atribut yang lebih dalam seperti pemakaian masker, status mata, dan kacamata, hingga 5 token per permintaan.",
    },
    {
      question: "Apa itu face token?",
      answer:
        "Face_token adalah pengenal unik yang dikembalikan oleh Face++ untuk setiap wajah yang terdeteksi. Kamu dapat menyalinnya dari hasil Detect dan menempelkannya ke alat Analyze untuk memeriksa atribut mendalam tanpa mengunggah ulang foto aslinya. Face token hanya berlaku untuk sesi dan kedaluwarsa secara otomatis.",
    },
    {
      question: "Apakah saya perlu membuat akun?",
      answer:
        "Tidak. Guess Your Face tidak memiliki login, pendaftaran, maupun akun pengguna. Unggah gambar, baca hasilnya, dan tutup tab.",
    },
    {
      question: "Bahasa apa saja yang didukung?",
      answer:
        "Bahasa Indonesia (default) dan Bahasa Inggris. Beralih melalui tombol bahasa di header halaman. Pilihanmu disimpan di localStorage browser.",
    },
    {
      question: "Format dan ukuran gambar apa yang didukung?",
      answer:
        "Hanya JPG dan PNG, dengan ukuran file maksimum 2 MB. Foto dipangkas ke rasio aspek 1:1 lewat pemangkas kanvas interaktif sebelum dikirim ke Face++.",
    },
    {
      question: "Mengapa API kadang gagal?",
      answer:
        "Alasan yang umum: gambar terlalu besar (lebih dari 2 MB), format tidak didukung, tidak ada wajah yang terdeteksi pada foto, kuota Face++ habis, atau batas laju sementara. Antarmuka akan menampilkan pesan kesalahan terlokalisasi yang menjelaskan penyebab spesifiknya.",
    },
    {
      question: "Apakah Guess Your Face sumber terbuka?",
      answer:
        "Ya. Kode sumber lengkap tersedia di https://github.com/REY-STTP/Guess-Your-Face di bawah Lisensi MIT. Kamu bisa mengaudit klaim privasi, melaporkan masalah, atau melakukan fork untuk proyekmu sendiri.",
    },
  ],
  detect: {
    actionLabel: "Deteksi Wajah",
    faceDetected: "wajah terdeteksi",
    indexInfo: "Urutan nomor di gambar sama dengan kartu hasil di bawah.",
    faceTitle: "Wajah",
    detectAnother: "Deteksi gambar lain",
    goToAnalyze: "Analisis face token",
    metrics: {
      gender: "Jenis kelamin",
      age: "Usia",
      smiling: "Senyum",
      beauty: "Beauty",
      faceQuality: "Kualitas wajah",
      headpose: "Head pose",
    },
    toasts: {
      tokensCopied: "Face token tersalin ke clipboard.",
      unknownError: "Terjadi kesalahan yang tidak diketahui.",
      connectionError: "Gagal terhubung ke server. Coba lagi.",
    },
  },
  compare: {
    photo1Label: "Foto 1",
    photo2Label: "Foto 2",
    actionLabel: "Bandingkan Wajah",
    compareAgain: "Bandingkan lagi",
    confidenceTitle: "Skor Kecocokan (Confidence)",
    confidenceExplanation:
      "Semakin tinggi, semakin besar kemungkinan dua wajah ini orang yang sama.",
    same: "Sama",
    different: "Beda",
    footnote:
      "Verdict mengikuti ambang batas false-positive Face++: 1e-3 paling longgar, 1e-5 paling ketat.",
    changePhoto1: "Ganti foto 1",
    changePhoto2: "Ganti foto 2",
    toasts: {
      unknownError: "Terjadi kesalahan yang tidak diketahui.",
      connectionError: "Gagal terhubung ke server. Coba lagi.",
    },
  },
  analyze: {
    textareaLabel: "Face token",
    textareaPlaceholder:
      "Pisahkan dengan koma atau baris baru.\ncth: 5a23f8b1..., 9d2c1f00...",
    textareaHint: "Ambil dari hasil Detect. Maksimal 5 token per permintaan.",
    filterLabel: "Atribut yang dianalisis",
    actionLabel: "Analisis Wajah",
    analyzeAgain: "Analisis lagi",
    maxTokensError: "Maksimal 5 face token per permintaan.",
    faceTitle: "Wajah",
    attributes: {
      gender: "Jenis kelamin",
      age: "Usia",
      emotion: "Emosi",
      smiling: "Senyum",
      facequality: "Kualitas wajah",
      beauty: "Beauty",
      mouthstatus: "Status mulut",
      eyestatus: "Status mata",
      leftEye: "Mata kiri",
      rightEye: "Mata kanan",
    },
    mouth: {
      noMask: "tanpa masker",
      surgicalMask: "masker bedah",
      medicalMask: "masker medis",
      mouthOpen: "mulut terbuka",
      mouthOccluded: "mulut tertutup objek",
    },
    eye: {
      open: "terbuka",
      closed: "tertutup",
      normalGlassesOpen: "terbuka (kacamata)",
      normalGlassesClosed: "tertutup (kacamata)",
      darkGlasses: "kacamata hitam",
      occlusion: "terhalang",
    },
    toasts: {
      unknownError: "Terjadi kesalahan yang tidak diketahui.",
      connectionError: "Gagal terhubung ke server. Coba lagi.",
    },
  },
  emotions: {
    anger: "Marah",
    disgust: "Jijik",
    fear: "Takut",
    happiness: "Bahagia",
    neutral: "Netral",
    sadness: "Sedih",
    surprise: "Terkejut",
    genderMale: "Pria",
    genderFemale: "Wanita",
  },
  notFound: {
    title: "404 · Halaman Tidak Ditemukan",
    desc: "Wajah atau halaman yang kamu cari tidak tersedia. Kamu dapat kembali ke beranda atau langsung mulai deteksi wajah.",
    startDetect: "Mulai Deteksi",
  },
  footer: {
    disclaimer:
      "Guess Your Face - ditenagai Face++. Gambar diproses real-time dan tidak disimpan.",
  },
};
