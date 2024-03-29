// EXAMPLE POST QUERY - from postman
// https://api.telegram.org/bot6717439509:AAHaPvuHO3WORt6_3p3CMIJgoCp5fECbX8s/sendMessage?chat_id=843486240&text=Hello Vova, this is a postman ddsaad ..

// const chat_id = `843486240`; // Володимир Кузнєцов
// const chat_id = `471789797`; // Павло Титаренко

// // параметры, которые отправятся в api телеграм
// const params = {
//    chat_id: tg_user, // id получателя
//    text: textMessage, // текст сообщения
//    parse_mode: 'HTML'
// }; // режим отображения сообщения HTML (не все HTML теги работают)

const regExpName = /[a-z а-яёЁЇїІіЄєҐґ ,.'-]/i;
const regExpPhone = /[\d-\+]/;
const regExpTextArea = /[a-z а-яёЁЇїІіЄєҐґ 0-9 ,.'\-)(\+]/i;

const feedbackWrapper = document.querySelector('.feedback-wrapper');
const feedbackForm = document.querySelector('.feedback-wrapper form');
const buttonFeedbackClose = document.querySelector('.feedback-wrapper .btn-close');
const ctaButtonsAll = document.querySelectorAll('button.cta-button');
const submitButton = document.querySelector('.btn-submit');

const inputName = document.querySelector('.feedback-wrapper form input[name="name"]');
const inputNumber = document.querySelector('.feedback-wrapper form input[name="phone"]');
const inputText = document.querySelector('.feedback-wrapper form textarea');

const inputNameHandler = (e, regex) => (!regex.test(e.key) ? e.preventDefault() : e.key);

const getCurrentTime = () => new Date().toString();

const dateTimeMessageFormatt = (date) => `${date.substring(8, 10)} ${date.substring(4, 7)} ${date.substring(11, 24)}`;

const showHideFeedbackWrapper = () => feedbackWrapper.classList.toggle('hidden');

const bot_token = `6717439509:AAHaPvuHO3WORt6_3p3CMIJgoCp5fECbX8s`; // токен бота
const chat_id = `471789797`; // id користувача

const textMessageFormatter = ({ name, tel, msg = '-' }) => {
   const time = dateTimeMessageFormatt(getCurrentTime());
   return `<b>👋 ✉️ НОВЕ ПОВІДОМЛЕННЯ з сайту ARGO-E.com.ua</b> - ФОРМА ЗВОРОТНЬОГО ЗВ'ЯЗКУ [CONTACT FORM]:
<b>Ім'я:</b> ${name}
<b>Телефон:</b> ${tel}
<b>Повідомлення:</b> ${msg}
<b>Надіслано:</b> ${time}`;
};

// POST API TO TELEGRAM BOT

const postFeedback = async (TOKEN, DATA, METHOD_NAME = `sendMessage`) => {
   const response = await fetch(`https://api.telegram.org/bot${TOKEN}/${METHOD_NAME}`, {
      method: 'POST',
      body: DATA
   });
   if (!response.ok) throw new Error("User's registration Failed. Error");
   const data = await response.json();
   return data;
};

// <--/ POST API TO TELEGRAM BOT -->

const onFormSubmit = (e) => {
   e.preventDefault();
   const formData = new FormData(feedbackForm);
   const formValues = {
      name: formData.get('name'),
      tel: formData.get('phone'),
      msg: formData.get('message') || ' - '
   };
   const textMessage = textMessageFormatter(formValues);

   formData.append('chat_id', chat_id);
   formData.append('text', textMessage);
   formData.append('parse_mode', 'HTML');

   return formData;
};

const hideFormAfterFourSec = () => {
   window.setTimeout(() => {
      feedbackWrapper.classList.add('fadeout');
   }, 4000);

   window.setTimeout(() => {
      showHideFeedbackWrapper();
      feedbackWrapper.classList.remove('fadeout');
   }, 5000);
};

const onSuccess = () => {
   feedbackWrapper.lastElementChild.innerHTML = `<span class='green'>Дякуємо! Ваше повідомлення отримано.</span>`;
   feedbackForm.reset();
   submitButton.disabled = true;
   hideFormAfterFourSec();
};

const onError = () => {
   feedbackWrapper.lastElementChild.innerHTML = `<span class='red'>*Помилка відправки повідомлення...</span>`;
};

const hadleSubmit = (formData) => {
   return new Promise(function (resolve, reject) {
      postFeedback(bot_token, formData)
         .then((data) => {
            onSuccess();
         })
         .catch((error) => {
            onError();
            submitButton.disabled = true;
            reject(error.message);
         });
   });
};

feedbackForm.onsubmit = (e) => hadleSubmit(onFormSubmit(e));

buttonFeedbackClose.addEventListener('click', showHideFeedbackWrapper);
ctaButtonsAll.forEach((btn) => btn.addEventListener('click', showHideFeedbackWrapper));

inputName.addEventListener('keypress', (e) => inputNameHandler(e, regExpName));
inputNumber.addEventListener('keypress', (e) => inputNameHandler(e, regExpPhone));
inputText.addEventListener('keypress', (e) => inputNameHandler(e, regExpTextArea));

// добавить очистку FORM ELEMENTS после отправки        - done!
// закрытие формы после успешной отправки через 3 сек       - done!
// disable отправки формы       - done!

// добавить макс длину и формат номера телефона      - done!
// добавить ReGex валидацию инпутов      - done!

// поменять слайдеры      - done!
// Павлу проверить слайдеры т текст      - done!

// уменьшить изобраения в розмірі    - done!
// прописать ALT тексти    - done!

// додати lazy loading    - done!
// <img src="image.jpg" alt="..." loading="lazy" />

// прописати оптимізовані зображення для gallery slides
// srcset="1.jpg 640w, 1.jpg 920w, !.jpg 1280w, 1.jpg 1600w"
// https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images

// optimized css feedback form     - done!
