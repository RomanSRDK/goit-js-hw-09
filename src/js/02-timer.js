import Notiflix from 'notiflix';

import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const spansEl = document.querySelectorAll('.value');
const startBtnEl = document.querySelector('button[data-start]');
const choosenDateEl = document.querySelector('#datetime-picker');
const dayRefEl = document.querySelector('[data-days]');
const hourRefEl = document.querySelector('[data-hours]');
const minuteRefEl = document.querySelector('[data-minutes]');
const secondRefEl = document.querySelector('[data-seconds]');

let timer = null;
startBtnEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      startBtnEl.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtnEl.disabled = false;

      startBtnEl.addEventListener('click', countdownTime);
      spansEl.forEach(item => item.classList.toggle('end'));

      function countdownTime() {
        timer = setInterval(() => {
          choosenDateEl.disabled = true;
          startBtnEl.disabled = true;

          const dateChoosen = new Date(choosenDateEl.value).getTime();
          const currentTime = new Date().getTime();
          const timeLeft = dateChoosen - currentTime;

          const data = convertMs(timeLeft);

          dayRefEl.textContent = addLeadingZero(data.days);
          hourRefEl.textContent = addLeadingZero(data.hours);
          minuteRefEl.textContent = addLeadingZero(data.minutes);
          secondRefEl.textContent = addLeadingZero(data.seconds);

          if (timeLeft <= 1000) {
            spansEl.forEach(item => item.classList.toggle('end'));
            clearInterval(timer);
            choosenDateEl.disabled = false;
            startBtnEl.disabled = false;
          }
        }, 1000);
      }

      function addLeadingZero(value) {
        const stringValue = String(value);
        return stringValue.padStart(2, '0');
      }
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  console.log(ms);
  return { days, hours, minutes, seconds };
}
flatpickr(choosenDateEl, options);