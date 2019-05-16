const electron = window.require('electron');
const dayjs = window.require('dayjs');

const notification = ({ title, body }) => {
  new electron.remote.Notification({ title, body }).show();
};

const startCountdown = (minutes = 25) => {
  const end = dayjs().add(minutes, 'minutes');

  const interval = setInterval(() => {
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
    }
  }, 1000);
};

document.getElementById('start').addEventListener('click', () => {
  startCountdown();
});
