import { galleryItems } from './gallery-items.js';
// Change code below this line


const gallery = document.querySelector(".gallery");

function createGalleryEl(array) {
  const galleryItem = array
    .map(({ preview, original, description } = {}) => {
      return `<div class="gallery__item">
        <a
        class="gallery__link"
        href="${original}"
        >
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        />
        </a>
        </div>`;
    })
    .join("");
  gallery.insertAdjacentHTML("afterbegin", galleryItem);
}

createGalleryEl(galleryItems);

gallery.addEventListener("click", openModal);

function openModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const sourceImg = event.target.dataset.source;

  const instance = basicLightbox.create(
    `
    <img src="${sourceImg}" width="800" height="600">`,
    {
      onShow: () => {
        window.addEventListener("keydown", closeEsc);
      },
      onClose: () => {
        window.removeEventListener("keydown", closeEsc);
      },
    }
  );

  instance.show();

  function closeEsc(event) {
    if (event.code === "Escape") {
      instance.close();
    }
  }
}