// 뉴스 문장 리스트 (자유롭게 추가 가능)
const sentences = [
  "정부는 오늘 오전 긴급 회의를 열고 대책을 발표했다.",
  "기상청은 내일부터 전국에 많은 비가 내릴 것이라고 예보했다.",
  "서울시가 공공데이터를 활용한 새로운 서비스를 공개했다.",
  "최근 온라인 쇼핑몰 이용자가 급증하고 있다.",
  "환경부는 미세먼지 저감 정책을 강화하겠다고 밝혔다.",
  "교육부는 올해 수능 난이도를 조정할 계획이라고 전했다.",
  "금융당국은 가상화폐 거래에 대한 규제를 검토 중이다.",
  "국제 유가 상승으로 물가 부담이 커지고 있다.",
  "보건당국은 여름철 식중독 예방 수칙을 당부했다.",
  "경찰은 대규모 사이버 범죄 조직을 검거했다고 밝혔다."
];

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const startBtn = document.getElementById("startBtn");
const resultEl = document.getElementById("result");
const timerEl = document.getElementById("timer");

let selectedSentence = "";
let timer = null;
let timeLeft = 30;

startBtn.addEventListener("click", () => {
  // 문장 랜덤 선택
  selectedSentence = sentences[Math.floor(Math.random() * sentences.length)];
  quoteEl.textContent = selectedSentence;

  // UI 초기화
  inputEl.value = "";
  inputEl.disabled = false;
  inputEl.focus();
  resultEl.textContent = "";
  startBtn.disabled = true;

  // 타이머 초기화
  timeLeft = 30;
  timerEl.textContent = `${timeLeft}초 남음`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `${timeLeft}초 남음`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      inputEl.disabled = true;
      evaluateResult();
      startBtn.disabled = false;
    }
  }, 1000);
});

function evaluateResult() {
  const userInput = inputEl.value;
  const correctChars = countCorrectChars(selectedSentence, userInput);
  const totalTyped = userInput.length;
  const accuracy = totalTyped > 0 ? ((correctChars / totalTyped) * 100).toFixed(1) : 0;
  const wpm = Math.round((totalTyped / 5) * (60 / 30)); // WPM 기준 (5자 기준, 30초 기준)

  resultEl.innerHTML = `
    ✅ 총 입력 글자 수: ${totalTyped}자<br>
    ✅ 정확히 맞춘 글자 수: ${correctChars}자<br>
    🎯 정확도: ${accuracy}%<br>
    ⌨️ 타자 속도: ${wpm} WPM
  `;
}

function countCorrectChars(expected, actual) {
  let count = 0;
  for (let i = 0; i < Math.min(expected.length, actual.length); i++) {
    if (expected[i] === actual[i]) count++;
  }
  return count;
}
