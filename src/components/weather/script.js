let showDateParagraph = document.getElementById('weather__show__display__date')

let currentDate = (new Date).toLocaleDateString()

showDateParagraph.innerHTML = `Текущая дата ${currentDate}`;