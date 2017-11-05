const $d = document;
const $slides = $d.querySelectorAll(".js-slide");
let slides = [];
let currentSlide = 0;

[].forEach.call($slides, function($slide) {
  slides.push($slide);
  $slide.style["z-index"] = 1;
});

function getNextSlide(i) {
  return i > slides.length - 1 ? 0 : i;
}

function showNextSlide(i) {
  let $slide = slides[i];
  slides[getNextSlide(i)].style["z-index"] = 200;
  $slide.style["z-index"] = 300;
  $slide.classList.add("play");
  setTimeout(t => {
    $slide.style["z-index"] = 100;
    $slide.classList.remove("play");
    let nextI = i + 1;
    showNextSlide(getNextSlide(nextI));
  }, 3000);
}

setTimeout(t => {
  showNextSlide(slides.length - 1);
}, 3000);

document.querySelector(".js-toggle").addEventListener("click", e => {
  e.preventDefault();
  document.body.classList.toggle("showdetail");
});
