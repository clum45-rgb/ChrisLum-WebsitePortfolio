const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");
const triggerImages = document.querySelectorAll(".lightbox-trigger");

triggerImages.forEach((img) => {
  img.addEventListener("click", function () {
    lightbox.classList.add("active");
    lightboxImg.src = this.src;
    lightboxImg.alt = this.alt;
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", function (e) {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeLightbox();
  }
});
