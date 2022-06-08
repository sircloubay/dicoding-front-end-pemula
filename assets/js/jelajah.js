let i = 0;
let txt = 'Mari Berkenalan dengan Semua Planet di Galaksi Bimasakti';
let speed = 50;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("typing").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

setTimeout(typeWriter(), 500);