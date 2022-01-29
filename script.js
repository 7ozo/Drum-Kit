let record = [];
let isRecording = false;
const playBtn = document.querySelector("#play");
const recordBtn = document.querySelector("#record");


const playSound = (e) => {
  //to work on capslock
  const keyData = e.key.toLowerCase();
  const audio = document.querySelector(`audio[data-key=${keyData}]`);
  const keyDiv = document.querySelector(`div[data-key=${keyData}]`);
  //to prevent error from console
  if (!audio) return;
  // to spam the audio
  audio.currentTime = 0;
  audio.play();
  if (isRecording) {
    record.push(e);
  }

  //adding playing style to the the key
  addEffect(keyDiv);
};

const addEffect = (div) => {
  // the if statment to fix key-stuck bug
  if (div.classList.contains("playing")) {
    div.classList.remove("playing");
  } else {
    div.classList.add("playing");
  }
};

//add event to the key-down event
window.addEventListener("keydown", playSound);

//selecting all keys to remove the playing style class
const keys = document.querySelectorAll(".key");
keys.forEach((key) => {
  key.addEventListener("transitionend", function (e) {
    key.classList.remove("playing");
  });
});
///////////////////////////////////////////////////////////

recordBtn.addEventListener("click", function () {
  isRecording = !isRecording;
  if (isRecording) {
    record = [];
  }
  recordBtn.classList.toggle("active");
  if (record.length > 0) {
    playBtn.style.cursor = "pointer";
  }
});

playBtn.addEventListener("click", function () {

  let delay = record[0]["timeStamp"];
  for (let keyPressed of record) {

    setTimeout(playSound, keyPressed.timeStamp - delay, keyPressed);
  }
});
