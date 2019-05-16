const electron = window.require('electron');

const notification = ({ title, body }) => {
  new electron.remote.Notification({ title, body }).show();
};

const startCountdown = (minutes = 25) => {
  let counter = minutes;

  const interval = setInterval(() => {
    console.log(`${counter} mins left`);
    counter -= 1;

    if (counter < 0) {
      clearInterval(interval);
      notification({
        title: 'Pomodoro',
        body: 'Great work! Time to take a 5 minute break.',
      });
    }
  }, 60000);
};

document.getElementById('start').addEventListener('click', () => {
  startCountdown();
});
