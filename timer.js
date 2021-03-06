const electron = window.require('electron');
const dayjs = window.require('dayjs');
const Store = window.require('electron-store');
const store = new Store();

const notification = ({ title, body }) => {
  new electron.remote.Notification({ title, body }).show();
};

const carryOnCounting = (minutes, seconds) => {
  document.getElementById("mins").innerHTML = ("0" + minutes);
  document.getElementById("seconds").innerHTML = (seconds < 10 ? "0" + seconds : seconds);
  startCountdown(minutes, seconds);
};

let interval
const startCountdown = (minutes = 25, seconds = 0) => {
  const end = dayjs().add(minutes, 'minutes').add(seconds, 'seconds');
  
  interval = setInterval(() => {
    const now = new Date().getTime();
    let time = new Date(end).getTime() - now;
    
    if (time >= 0) {
      const mins =  Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      const seconds =  Math.floor((time % (1000 * 60)) / 1000);
      store.set('mins', mins);
      store.set('seconds', seconds);

      document.getElementById("mins").innerHTML = ("0" + mins).slice(-2)
      document.getElementById("seconds").innerHTML = ("0" + seconds).slice(-2)
    } else {
      clearInterval(interval);
      notification({
        title: 'Pomodoro',
        body: 'Great work! Time to take a 5 minute break.',
      });
      document.getElementById("mins").innerHTML = ("00")
      document.getElementById("seconds").innerHTML = ("00")
    }
  }, 1000);
};

const resetCountdown = () => {
  clearInterval(interval);
  document.getElementById("mins").innerHTML = ("25");
  document.getElementById("seconds").innerHTML = ("00");
}

document.addEventListener('DOMContentLoaded', () => {
  if (store.get('timerStarted') === true) {
    const minState = store.get('mins')
    const secondState = store.get('seconds')
    carryOnCounting(minState, secondState);
  } else {
    store.clear()
  }
});

document.getElementById('start').addEventListener('click', () => {
  store.clear();
  store.set('timerStarted', true);
  startCountdown();
});

document.getElementById('stop').addEventListener('click', () => {
  clearInterval(interval);
});

document.getElementById('reset').addEventListener('click', () => {
  store.clear();
  resetCountdown();
});
