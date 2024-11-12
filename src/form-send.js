
const bot_token = process.env.BOT_TOKEN; // токен бота
const chat_id = process.env.CHAT_ID; // id користувача

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
