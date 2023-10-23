const galleryElement = document.querySelector('.our-clients__gallery');
const slidersNodeList = document.querySelectorAll('.card');
const wrapperFeedback = document.querySelector('.feedback-wrapper');
const buttonFeedbackClose = document.querySelector('.feedback-wrapper .btn-close');
const formFeedback = document.querySelector('.feedback-wrapper form');
const ctaButtonsAll = document.querySelectorAll('.cta-button');

const showHideFeedbackWrapper = () => wrapperFeedback.classList.toggle('hidden');

ctaButtonsAll.forEach((btn) => btn.addEventListener('click', showHideFeedbackWrapper));
buttonFeedbackClose.addEventListener('click', showHideFeedbackWrapper);

// POST API TO TELEGRAM BOT

const postFeedback = async (TOKEN, METHOD_NAME = 'sendMessage', PARAMS) => {
   const response = await fetch(`https://api.telegram.org/bot${TOKEN}/${METHOD_NAME}?${PARAMS}`, {
      method: 'POST'
   });
   if (!response.ok) throw new Error("User's registration Failed. Error");
   const data = await response.json();
   console.log(data);
   return data;
};

const tg_user = '843486240'; // id пользователя, для отправки сообщения
const bot_token = '6717439509:AAHaPvuHO3WORt6_3p3CMIJgoCp5fECbX8s'; // токен бота
const chat_id = '';
const textMessage = 'Первая строка сообщения со ссылкой \n Вторая строка с жирным текстом';
// const params = '';

// параметры, которые отправятся в api телеграм
const params = {
   chat_id: tg_user, // id получателя
   text: textMessage, // текст сообщения
   parse_mode: 'HTML'
}; // режим отображения сообщения HTML (не все HTML теги работают)

const paramsQuery = (id, text) => {
   if (!id || !text) return;

   return `chat_id=${id}&text=${text}`;
};

console.log(JSON.stringify(params));

// <--/ POST API TO TELEGRAM BOT -->

const galleryFullWidth = () => galleryElement.offsetWidth;
const sliderWidth = () => slidersNodeList[0].offsetWidth;

const sliderPosStart = 0;
const sliderPosEnd = () => galleryFullWidth() - sliderWidth();

let sliderPosition = 0;

const checkingIsSliderPoscorrectly = () => sliderPosition % sliderWidth();

const calcSliderPos = (next = false) => {
   const tempPosition = next ? sliderPosition + sliderWidth() : sliderPosition - sliderWidth();

   sliderPosition =
      tempPosition > sliderPosEnd()
         ? sliderPosStart
         : tempPosition < sliderPosStart
         ? sliderPosEnd()
         : tempPosition || sliderPosStart;

   return sliderPosition;
};

const setPosGallery = () => {
   galleryElement.style.left = '-' + sliderPosition + 'px';
   galleryElement.style.transform = `translateX(-)${sliderPosition}px`;
};

const prevSlide = () => setPosGallery(calcSliderPos());
const nextSlide = () => setPosGallery(calcSliderPos(true));

document.querySelector('.prev-btn').addEventListener('click', prevSlide);
document.querySelector('.next-btn').addEventListener('click', nextSlide);
