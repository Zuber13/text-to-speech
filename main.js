var selectInput = document.querySelector('select');
var textArea = document.querySelector('textarea');
var stopBtn = document.querySelector('.stopBtn');
var speakBtn = document.querySelector('.speakBtn');
var rangeInput = document.querySelectorAll('[type="range"] , [name="text"]');
var msg = new SpeechSynthesisUtterance();
var voices = [];
msg.text = document.querySelector('[name="text"]').value;

function getVoice() {
    voices = this.getVoices();
    var options = voices.map(voice => `<option value="${voice.name}">${voice.name}(${voice.lang})</option>`).join("");
    selectInput.innerHTML = options;
}

function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
}

function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg);
    }
}


function setRange() {
    msg[this.name] = this.value;
    toggle();
}

selectInput.addEventListener('change', setVoice);
speechSynthesis.addEventListener("voiceschanged", getVoice);

rangeInput.forEach(option => option.addEventListener('change', setRange));
speakBtn.addEventListener("click", toggle);
stopBtn.addEventListener('click', () => toggle(false));