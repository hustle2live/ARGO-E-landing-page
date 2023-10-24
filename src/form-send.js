// EXAMPLE POST QUERY - from postman

// https://api.telegram.org/bot6717439509:AAHaPvuHO3WORt6_3p3CMIJgoCp5fECbX8s/sendMessage?chat_id=843486240&text=Hello Vova, this is a postman ddsaad 😜 ..

const feedbackWrapper = document.querySelector('.feedback-wrapper');
const feedbackForm = document.querySelector('.feedback-wrapper form');
const buttonFeedbackClose = document.querySelector('.feedback-wrapper .btn-close');
// const buttonFeedbackSubmit = document.querySelector('.feedback-wrapper .btn-submit');
const ctaButtonsAll = document.querySelectorAll('.cta-button');

const showHideFeedbackWrapper = () => feedbackWrapper.classList.toggle('hidden');

ctaButtonsAll.forEach((btn) => btn.addEventListener('click', showHideFeedbackWrapper));
buttonFeedbackClose.addEventListener('click', showHideFeedbackWrapper);

// POST API TO TELEGRAM BOT

const postFeedback = async (TOKEN, DATA, METHOD_NAME = `sendMessage`) => {
   const response = await fetch(`https://api.telegram.org/bot${TOKEN}/${METHOD_NAME}`, {
      method: 'POST',
      body: DATA
   });
   if (!response.ok) throw new Error("User's registration Failed. Error");
   const data = await response.json();
   console.log(data);
   return data;
};

const bot_token = `6717439509:AAHaPvuHO3WORt6_3p3CMIJgoCp5fECbX8s`; // токен бота
const chat_id = `843486240`; // Володимир Кузнєцов
// const chat_id = `471789797`; // Павло Титаренко

// // параметры, которые отправятся в api телеграм
// const params = {
//    chat_id: tg_user, // id получателя
//    text: textMessage, // текст сообщения
//    parse_mode: 'HTML'
// }; // режим отображения сообщения HTML (не все HTML теги работают)

const params = (id, text) => `chat_id=${id}&text=${text}`;

// <--/ POST API TO TELEGRAM BOT -->

const getCurrentTime = () => new Date().toString();

const dateTimeMessageFormatt = (date) => `${date.substring(8, 10)} ${date.substring(4, 7)} ${date.substring(11, 24)}`;

const onFormSubmit = (e) => {
   e.preventDefault();
   const formData = new FormData(feedbackForm);

   const bodyForm = {
      name: formData.get('name'),
      tel: formData.get('phone'),
      msg: formData.get('message') || '-',
      time: dateTimeMessageFormatt(getCurrentTime())
   };

   const textMessage = (data) =>
      `<b>👋 ✉️ НОВЕ ПОВІДОМЛЕННЯ з сайту ARGO-E.com.ua</b> - ФОРМА ЗВОРОТНЬОГО ЗВ'ЯЗКУ [CONTACT FORM]:
<b>Ім'я:</b> ${data.name}
<b>Телефон:</b> ${data.tel}
<b>Повідомлення:</b> ${data.msg}
<b>Надіслано:</b> ${data.time}`;

   formData.append('chat_id', chat_id);
   formData.append('parse_mode', 'HTML');
   formData.append('text', textMessage(bodyForm));

   postFeedback(bot_token, formData);
};

feedbackForm.onsubmit = (e) => onFormSubmit(e);
