const images = [
  { file: "edwqwes1.JPG", cat: "edes", title: "Mákosguba torta" },
  { file: "edes2.jpg", cat: "edes", title: "Epres süti" },
  { file: "edes32.jpg", cat: "edes", title: "Térkő guba" },
  { file: "edes3.jpg", cat: "edes", title: "Epres süti" },
  { file: "edes2.jpg", cat: "edes", title: "Epres süti" },
  { file: "edes2.jpg", cat: "edes", title: "Epres süti" },
  { file: "edes2.jpg", cat: "edes", title: "Epres süti" },
  { file: "edes2.jpg", cat: "edes", title: "Epres süti" },

  { file: "sos1.jpg", cat: "sos", title: "Sajtos pogácsa" },
  { file: "sos2.jpg", cat: "sos", title: "Tepertős pogácsa" },

  { file: "torta1.jpg", cat: "torta", title: "Esküvői torta" },
  { file: "torta2.jpg", cat: "torta", title: "Csokis torta deluxe" }
];

const gallery = document.getElementById("gallery");
const tabs = document.querySelectorAll(".tab");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close");

let currentCat = "edes";
let currentList = [];
let currentIndex = 0;

// render
function render() {
  gallery.innerHTML = "";

  currentList = images.filter(i => i.cat === currentCat);

  currentList.forEach((imgData, index) => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = "images/" + imgData.file;

    img.onclick = () => openLightbox(index);

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = imgData.title;

    card.appendChild(img);
    card.appendChild(title);
    gallery.appendChild(card);
  });
}

// open
function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = "flex";
  showImage();
}

// show
function showImage() {
  lightboxImg.src = "images/" + currentList[currentIndex].file;
}

// navigation
function nextImage() {
  currentIndex = (currentIndex + 1) % currentList.length;
  showImage();
}

function prevImage() {
  currentIndex =
    (currentIndex - 1 + currentList.length) % currentList.length;
  showImage();
}

// ✅ FIX: globális elérés (nyilaknak)
window.nextImage = nextImage;
window.prevImage = prevImage;

// tabs
tabs.forEach(tab => {
  tab.onclick = () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    currentCat = tab.dataset.cat;
    render();
  };
});

// close
closeBtn.onclick = () => lightbox.style.display = "none";

lightbox.onclick = (e) => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = "none";
  }
};

// keyboard
document.addEventListener("keydown", e => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") lightbox.style.display = "none";
  }
});

render();
