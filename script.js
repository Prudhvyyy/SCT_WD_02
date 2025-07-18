let startTime = 0;
let elapsed = 0;
let intervalId;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function updateDisplay(ms) {
  const date = new Date(ms);
  const min = String(date.getUTCMinutes()).padStart(2, '0');
  const sec = String(date.getUTCSeconds()).padStart(2, '0');
  const cent = String(Math.floor(date.getUTCMilliseconds()/10)).padStart(2, '0');
  display.textContent = `${min}:${sec}:${cent}`;
}

function start() {
  if (!running) {
    startTime = Date.now() - elapsed;
    intervalId = setInterval(() => {
      elapsed = Date.now() - startTime;
      updateDisplay(elapsed);
    }, 10);
    running = true;
    startPauseBtn.textContent = 'Pause';
    lapBtn.disabled = false;
  }
}

function pause() {
  if (running) {
    clearInterval(intervalId);
    running = false;
    startPauseBtn.textContent = 'Start';
    lapBtn.disabled = true;
  }
}

function reset() {
  clearInterval(intervalId);
  running = false;
  elapsed = 0;
  updateDisplay(0);
  startPauseBtn.textContent = 'Start';
  lapBtn.disabled = true;
  laps = [];
  renderLaps();
}

function lap() {
  if (running) {
    laps.push(elapsed);
    renderLaps();
  }
}

function renderLaps() {
  lapsList.innerHTML = '';
  laps.forEach((ms, idx) => {
    const li = document.createElement('li');
    const date = new Date(ms);
    const min = String(date.getUTCMinutes()).padStart(2, '0');
    const sec = String(date.getUTCSeconds()).padStart(2, '0');
    const cent = String(Math.floor(date.getUTCMilliseconds()/10)).padStart(2, '0');
    li.textContent = `Lap ${idx + 1}: ${min}:${sec}:${cent}`;
    lapsList.appendChild(li);
  });
}

startPauseBtn.addEventListener('click', () => running ? pause() : start());
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

updateDisplay(0);
lapBtn.disabled = true;
