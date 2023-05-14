const day = document.querySelector('.countdown-number');
const currentDay = new Date();
const weddingDay = new Date('11/3/2023');
const remainingDays = Math.floor((weddingDay - currentDay) / 1000 / 60 / 60 / 24);

day.textContent = remainingDays;