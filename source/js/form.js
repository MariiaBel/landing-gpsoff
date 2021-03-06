const phpServerSend = 'php/send.php';


const popupThanks = document.querySelector("#modal-thanks");  
const popupSend = document.querySelector("#modal-send");  
const forms = document.querySelectorAll("[send-to]");
let isStorageSupport = true,
  storage = "",
  modalCloseBtn;

try {
  storage = localStorage.getItem("sendName");
} catch (err) {
  isStorageSupport = false;
}

forms.forEach(item => formValidation(item));

function formValidation(form) {
  const inputName = form.querySelector("input[name='firstname']");
  const inputPhone = form.querySelector("input[name='phone']");
  
  // if (storage) {
  //   inputName.value = storage;
  //   inputPhone.focus();
  // } else {
  //   inputName.focus();
  // }

  form.addEventListener("submit", function(evt) {
    evt.preventDefault();
    if (!inputName.value || !inputPhone.value) {
      evt.preventDefault();
      if(!inputName.value) {
        inputName.classList.add("form__input--error");
      } else {
        inputName.classList.remove("form__input--error");
      }
      if(!inputPhone.value) {
        inputPhone.classList.add("form__input--error");
      } else {
        inputPhone.classList.remove("form__input--error");
      }
    } else {
      if (isStorageSupport) {
        localStorage.setItem("sendName", inputName.value);
      }
      inputName.classList.remove("form__input--error");
      inputPhone.classList.remove("form__input--error");

      // Close popup Send
      if (popupSend) {
        popupSend.classList.remove("modal--active");
      }

      var form_data = $(this).serialize()+"&obj=form"; // Собираем все данные из формы

      $.ajax({
          type: "POST", // Метод отправки
          url: phpServerSend, // Путь до php файла отправителя
          data: form_data,
          crossDomain: true,
          success: function () {
              // Код в этом блоке выполняется при успешной отправке сообщения
              // Open popup Thanks
              if (popupThanks) {
                popupThanks.classList.add("modal--active");
                closePopup(popupThanks); 
              } 
          }
      });
    }
  });
}

function closePopup(popup) {
  modalCloseBtn = popup.querySelector("[data-modal-close]");

  modalCloseBtn.addEventListener("click", function(evt) {
    evt.preventDefault();
    popup.classList.remove("modal--active");
  });
}


window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    if (popupThanks.classList.contains("modal--active")) {
      evt.preventDefault();
      popupThanks.classList.remove("modal--active");
    }
  }
});

