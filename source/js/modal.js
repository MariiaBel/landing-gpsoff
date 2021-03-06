const modalOpenBtn = document.querySelectorAll("[data-modal-open]");
let modalCloseBtn,
    popup;


modalOpenBtn.forEach(btnItem => btnItem.addEventListener(`click`, openPopup));

function openPopup(evt) {
  evt.preventDefault();
  let dataPopup = this.dataset.modalOpen,
      video;
  popup = document.querySelector(`#modal-${dataPopup}`); 

  if(dataPopup == 'video') {
    video = popup.querySelector("[data-video-play]");
    video.src += "&autoplay=1"
  }
  closePopup(popup, video); 
  popup.classList.add("modal--active");
  
}

function closePopup(popup, video) {
  modalCloseBtn = popup.querySelector("[data-modal-close]");

  modalCloseBtn.addEventListener("click", function(evt) {
    evt.preventDefault();
    popup.classList.remove("modal--active");

    if(video) {      
      console.dir(video.src)
      video.src= video.src.split('&')[0];
    }
  });
  
}

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    if (popup.classList.contains("modal--active")) {
      evt.preventDefault();
      popup.classList.remove("modal--active");
    }
  }
});



