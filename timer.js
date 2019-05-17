const electron = window.require('electron');
const dayjs = window.require('dayjs');

const notification = ({ title, body }) => {
  new electron.remote.Notification({ title, body }).show();
};

let interval
const startCountdown = (minutes = 25) => {
  const end = dayjs().add(minutes, 'minutes');

  interval = setInterval(() => {
    const now = new Date().getTime();
    let time = new Date(end).getTime() - now;

    if (time >= 0) {

    const mins =  Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds =  Math.floor((time % (1000 * 60)) / 1000);

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
  document.getElementById("mins").innerHTML = ("25")
  document.getElementById("seconds").innerHTML = ("00")
}

document.getElementById('start').addEventListener('click', () => {
  startCountdown(1);
});

document.getElementById('pause').addEventListener('click', () => {
  clearInterval(interval);
});

document.getElementById('reset').addEventListener('click', () => {
  resetCountdown()
});
