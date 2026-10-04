/* isi */
const GIFT = {
  name: "Caliya",

  letter: {
    title: "Pesan Untuk Kamu",
    paragraphs: [
      "Happy birthday, Sayang ♡",
      "Mungkin aku belum bisa ada di samping kamu buat rayain hari ini secara langsung, tapi aku harap kamu bisa rasain kalau hari ini ada seseorang yang bener-bener seneng karna kamu lahir ke dunia.",
      "Aku seneng kamu lahir ke dunia.",
      "Di ulang tahun kamu ini, aku ga punya harapan yang sempurna dan ga punya jaminan harapan ini 100% bakal jadi nyata. Tapi, aku harap senyum kamu lebih banyak di umur yang baru ini, lebih banyak pengalaman yang baik, dan hal-hal yang kamu inginkan tercapai",
      "Kalau nanti ada hari dimana semuanya ga berjalan lancar, kamu harus selalu ingat kalau hari itu ga selamanya, hari itu pasti bakal berakhir cepat atau lambat. Kamu cuman butuh sabar dan yakin semuanya bisa kamu lewati, jangan pernah biarin pikiran buruk kamu yang menang.",
      "Terakhir, makasih udah nerima aku jadi bagian kecil dari hidup kamu ♡"
    ],
    sign: "— dari Princess kamu"
  },

  song: {
    title: "Until I Found You",
    artist: "Stephen Sanchez ft. Em Beihold ",
    note: "Aku ga tau kenapa, tapi jujur aku pilih ini karna menurut aku liriknya tuh cocok aja sama cerita kita. Aku juga ga nyangka ternyata liriknya cocok sama kita >0<",
    link: "https://youtu.be/zYlP2W_dhr0?si=KE_TzoA423YJ9lJi"
  },
  
  wishes: [
    "Semoga kamu selalu punya alasan buat bangga sama diri kamu sendiri.",
    "Semoga hal-hal yang selama ini kamu tunggu perlahan datang ke kamu.",
    "Semoga kamu selalu dikelilingi orang-orang yang buat kamu merasa dihargai.",
    "Semoga tahun ini lebih baik dan lebih oke buat kamu.",
    "Dan semoga aku masih bisa jadi bagian dari beberapa momen bahagia kamu."
  ],

  secret: {
    message:
      "Aku ga tau masa depan bakal gimana. Tapi untuk hari ini, aku senang bisa jadi salah satu orang yang ucapin selamat ulang tahun ke kamu."
  }
};

let opened= new Set();

/* screen */
const opening= document.getElementById("opening");
const menu= document.getElementById("menu");
const secret= document.getElementById("secret");
  
function showScreen(screen) {
  opening.classList.remove("active");
  menu.classList.remove("active");
  secret.classList.remove("active");
  screen.classList.add("active");
}

/* open gift */
function buka() {
  showScreen(menu);
}

/* set nama */
document.getElementById("nameMenu").textContent= GIFT.name;
document.getElementById("nameSecret").textContent= GIFT.name;

/* Open Contn */
function bukaSection(section) {
  opened.add(section);
  updateProgress();
  let content = "";

  /* Letter */
  if (section === "letter") {
    content = `
      <p class="modal-eyebrow">01 / PESAN</p>
      <h2 class="modal-title">${GIFT.letter.title}</h2>
      <div class="letter">
        ${GIFT.letter.paragraphs
          .map(paragraph =>
            `<p>${paragraph}</p>`
          )
          .join("")
        }
        <p class="sign">${GIFT.letter.sign}</p>
      </div>
    `;
  }

  /* Song */
  if (section === "song") {
    content = `
      <p class="modal-eyebrow">02 / LAGU</p>
      <h2 class="modal-title">Lagu Buat Kamu</h2>
      <div class="song-box">
        <div class="song-name">${GIFT.song.title}</div>
        <div class="song-artist">${GIFT.song.artist}</div>
        <p class="song-note">${GIFT.song.note}</p>
        <a class="song-link" href="${GIFT.song.link}" target="_blank">LISTEN →</a>
      </div>
    `;
  }

  /* Wish */
  if (section === "wish") {
    content = `
      <p class="modal-eyebrow">03 / HARAPAN</p>
      <h2 class="modal-title">Untuk tahun baru kamu</h2>
      <ul class="wish-list">
        ${GIFT.wishes
          .map(wish =>
            `<li>${wish}</li>`
          )
          .join("")
        }
      </ul>
    `;
  }

  document.getElementById("modalContent").innerHTML= content;
  document.getElementById("modal").classList.add("open");
}

/* Tutup Modal */
function tutupModal() {
  document.getElementById("modal").classList.remove("open");
}

/* Proses */
function updateProgress() {
  document.getElementById("progress").textContent= opened.size;
  if (opened.size >= 3) {
    const card =
      document.getElementById("secretCard");
      card.classList.remove("locked");
      document.getElementById("secretText").textContent=
      "kamu nemuin ini";
  }
}

/* Seceret */
function bukaSecret() {
  if (opened.size < 3) {
    const card =
      document.getElementById("secretCard");
      card.animate(
        [
        { transform: "translateX(0)" },
        { transform: "translateX(-5px)" },
        { transform: "translateX(5px)" },
        { transform: "translateX(0)" }
        ],
      {
        duration: 250
      }
    );
    return;
  }

  tutupModal();
  setTimeout(() => {
    showScreen(secret);
  }, 200);
}

/* ulang */
function restart() {
  opened.clear();
  updateProgress();
  document.getElementById("secretCard").classList.add("locked");
  document.getElementById("secretText").textContent = "locked for now";
  showScreen(opening);
}