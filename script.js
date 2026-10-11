const galleryItems = Array.from(
    document.querySelectorAll(".gallery-item")
);

const filterButtons = document.querySelectorAll(".filters button");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const counter = document.getElementById("image-counter");

let visibleItems = galleryItems.slice();
let currentIndex = 0;

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        visibleItems = galleryItems.filter(item => {
            return category === "all" ||
                item.dataset.category === category;
        });

        galleryItems.forEach(item => {
            item.hidden = !visibleItems.includes(item);
        });
    });
});

function openLightbox(index) {
    if (visibleItems.length === 0) return;

    currentIndex =
        (index + visibleItems.length) % visibleItems.length;

    const selectedImage = visibleItems[currentIndex]
        .querySelector("img");

    lightboxImg.src = selectedImage.src;
    lightboxImg.alt = selectedImage.alt;

    counter.textContent =
        `${currentIndex + 1} / ${visibleItems.length}`;

    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
}

galleryItems.forEach(item => {
    item.addEventListener("click", () => {
        const index = visibleItems.indexOf(item);

        if (index !== -1) {
            openLightbox(index);
        }
    });
});

nextBtn.addEventListener("click", () => {
    openLightbox(currentIndex + 1);
});

prevBtn.addEventListener("click", () => {
    openLightbox(currentIndex - 1);
});

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("show")) return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        openLightbox(currentIndex + 1);
    }

    if (event.key === "ArrowLeft") {
        openLightbox(currentIndex - 1);
    }
});