function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');

let timerId;

startBtnEl.addEventListener('click', ({target}) => {
  target.disabled = true;
  stopBtnEl.disabled = false;
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtnEl.addEventListener('click', ({target}) => {
  startBtnEl.disabled = false;
  target.disabled = true;
  clearInterval(timerId);
});