const TOTAL_PAGES = 20; // 0 到 19 共 20 頁
let currentPage = 0;

const imgElement = document.getElementById('book-img');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageIndicator = document.getElementById('page-indicator');

const bgmPlayer = document.getElementById('bgm-player');
const speechPlayer = document.getElementById('speech-player');

const bgmToggle = document.getElementById('bgm-toggle');
const speechToggle = document.getElementById('speech-toggle');

// 更新頁面與聲音
function loadPage(page) {
  currentPage = page;

  // 1. 更新圖片與頁數
  imgElement.src = `assets/graphics/${page}.jpg`;
  pageIndicator.textContent = `第 ${page} / ${TOTAL_PAGES - 1} 頁`;

  // 2. 更新按鈕狀態
  prevBtn.disabled = (currentPage === 0);
  nextBtn.disabled = (currentPage === TOTAL_PAGES - 1);

  // 3. 播放背景音樂
  if (bgmToggle.checked) {
    bgmPlayer.src = `assets/music/music${page}.mp3`;
    bgmPlayer.play().catch(err => console.log("BGM autoplay blocked:", err));
  } else {
    bgmPlayer.pause();
  }

  // 4. 播放朗讀語音
  if (speechToggle.checked) {
    speechPlayer.src = `assets/speech/speech${page}.mp3`;
    speechPlayer.play().catch(err => console.log("Speech autoplay blocked:", err));
  } else {
    speechPlayer.pause();
  }
}

// 換頁事件
prevBtn.addEventListener('click', () => {
  if (currentPage > 0) loadPage(currentPage - 1);
});

nextBtn.addEventListener('click', () => {
  if (currentPage < TOTAL_PAGES - 1) loadPage(currentPage + 1);
});

// 音訊開關切換
bgmToggle.addEventListener('change', () => {
  if (!bgmToggle.checked) {
    bgmPlayer.pause();
  } else {
    bgmPlayer.src = `assets/music/music${currentPage}.mp3`;
    bgmPlayer.play().catch(e => {});
  }
});

speechToggle.addEventListener('change', () => {
  if (!speechToggle.checked) {
    speechPlayer.pause();
  } else {
    speechPlayer.src = `assets/speech/speech${currentPage}.mp3`;
    speechPlayer.play().catch(e => {});
  }
});

// 初始化載入第 0 頁
loadPage(0);