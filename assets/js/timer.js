// Neandro Area
const display = document.querySelector('.timer .time');
const som = document.querySelector('.timer #som');
const btnPauseAlarm = document.querySelector('.timer #alarm');
const buttonTimerRight = document.querySelector('.timer .buttonTimerRight');
const buttonTimerLeft = document.querySelector('.timer .buttonTimerLeft');
const btnStart = document.querySelector('.timer .time');
let whachTime = 1000

let defaultTime = 30
let time = defaultTime * 60;
let running = false;
let interval;
let alarmActive = true;
let alarmPaused = false;

buttonTimerLeft.addEventListener('click', toDecrease);
buttonTimerRight.addEventListener('click', increase);
btnStart.addEventListener('click', start);
btnPauseAlarm.addEventListener('click', toggleAlarm);


function toDecrease() {
  if (!running && defaultTime >= 10) {
    display.textContent = defaultTime -= 5;
  }
  return defaultTime;
}

function increase() {
  if (!running && defaultTime <= 85) {
    display.textContent = defaultTime += 5;
  }
  return defaultTime;
}

function start() {
  if (!running) {
    running = true;
    time = defaultTime * 60;
    watch();
    interval = setInterval(watch, whachTime);
  }
}

function stop() {
  clearInterval(interval);
  time = 0;
  running = false;
}

function watch() {
  if (time >= 0) {
    const { minutes, seconds } = getTimeComponents(time);
    if (time >= 60) {
      display.textContent = formatTime(minutes);
    } else {
      changeColor();
      display.textContent = seconds;
    }
  }
  if (time <= 0) {
    stop();
    showAlert();
  } else {
    time--;
  }
}

function getTimeComponents(time) {
  const minutes = Math.floor((time % 7200) / 60);
  const seconds = time % 60;
  console.log(minutes, seconds)
  return { minutes, seconds };
}

function formatTime(time) {
  return String(time).padStart(1, '0');
}

function showAlert() {
  if(alarmActive && !alarmPaused) {
    alarmActive = false;
    som.play();
    setTimeout(() => {
      alert('Tempo esgotado!');
      som.pause();
      window.location.href = "index.html";
      som.currentTime = 0;
      alarmActive = true;
    }, 100);
  }else {
    toggleAlarm();
    setTimeout(() => {
      alert('Tempo esgotado!');
      window.location.href = "index.html";
      alarmActive = true;
    }, 100);
  }
}

function toggleAlarm() {
  alarmPaused = !alarmPaused;
  if(alarmPaused) {
    som.pause();
  }
}

function changeColor() {
  let cor = document.querySelector('.time')
  if (time % 2 == 0) {
    cor.style.backgroundColor = '#ce5454'
  } else {
    cor.style.backgroundColor = '#de2e2e'
  }
}