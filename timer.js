const startCountdown = (minutes = 25) => {
  let counter = minutes;

  console.log('Timer started');
  const interval = setInterval(() => {
    console.log(counter);
    counter -= 1;

    if (counter < 0) {
      clearInterval(interval);
      console.log('Times up!');
    }
  }, 60000);
};

module.exports = { startCountdown };
