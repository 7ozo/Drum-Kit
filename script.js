const playSound = (e) => {
  //to work on capslock
  const keyData = e.key.toLowerCase();
  const audio = document.querySelector(`audio[data-key=${keyData}]`);
  const keyDiv = document.querySelector(`div[data-key=${keyData}]`)
  //to prevent error from console
  if (!audio) return;
  // to spam the audio
  audio.currentTime = 0;
  audio.play();
  //adding playing style to the the key
  // the if statment to fix key-stuck bug
  if(keyDiv.classList.contains('playing')){
    keyDiv.classList.remove("playing");
  }else {
    keyDiv.classList.add("playing");
  }
};

//add event to the key-down event
window.addEventListener("keydown", playSound);

//selecting all keys
const keys = document.querySelectorAll(".key");

//this to remove the playing style class
keys.forEach((key) => {
  key.addEventListener("transitionend", function (e) {
    key.classList.remove("playing");
  });
});
