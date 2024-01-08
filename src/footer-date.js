const footerYearElement = document.querySelector('.year');

const currentYear = new Date().getFullYear();

footerYearElement.innerHTML = currentYear;
