let weatherForm = document.getElementById('weather__form')
let userInput = document.getElementById('weather__form__input')
let button = document.getElementById('weather__form__button')
let dateParagraph = document.getElementById('weather__display__date')
let errorParagraph = document.getElementById('weather__display__error')
let outputArea = document.getElementById('weather__display__data-from-api')
let townName = document.getElementById('weather__display__data-from-api__main-features__town')
let shortDescription = document.getElementById('weather__display__data-from-api__main-features__description')
let temperature = document.getElementById('weather__display__data-from-api__main-features__temperature')
let icon = document.getElementById('weather__display__data-from-api__main-features__icon')
let humidity = document.getElementById('weather__display__data-from-api__details__humidity') 
let pressure = document.getElementById('weather__display__data-from-api__details__pressure')
let tempMax = document.getElementById('weather__display__data-from-api__details__temp-max')
let tempMin = document.getElementById('weather__display__data-from-api__details__temp-min')
let sunrise = document.getElementById('weather__display__data-from-api__details__sunrise')
let sunset = document.getElementById('weather__display__data-from-api__details__sunset')
let wind = document.getElementById('weather__display__data-from-api__details__wind')
let dataFromAPI

//Fetch Data from openweather API
const reciveData = async () => {
  let userInputValue = userInput.value
  if (!userInputValue) {
    outputArea.classList.remove('visible')
    outputArea.classList.add('hidden')
    dateParagraph.classList.remove('visible')
    dateParagraph.classList.add('hidden')
    errorParagraph.classList.remove('hidden')
    errorParagraph.classList.add('visible')
    errorParagraph.innerText = 'Ошибка! Введите наименование населенного пункта!'
    return
  }
  outputArea.classList.remove('hidden')
  outputArea.classList.add('visible')
  errorParagraph.classList.add('hidden')
  errorParagraph.classList.remove('visible')
  dateParagraph.classList.remove('hidden')
  dateParagraph.classList.add('visible')

  let urlToFetch = `https://api.openweathermap.org/data/2.5/weather?q=${userInputValue}&APPID=181262891917dd3e32f0214aea1a3c9c`

  await fetch(urlToFetch)
  .then((response) => response.json())
  .then((myJson) => dataFromAPI = myJson)
}

//Show Weather Details

let currentDateAndTime = {
  timeFix (i) {
    if (i < 10) {
      i = '0' + i
    }
    return i
  },

  showDateAndTime () {
    let DateAndTime = (new Date).toLocaleDateString() + ', ' + this.timeFix((new Date).getHours()) + ':' + this.timeFix((new Date).getMinutes())
    return DateAndTime
  }
}

const showParam = () => {
  if (dataFromAPI.cod === '404') {
    outputArea.classList.remove('visible')
    outputArea.classList.add('hidden')
    dateParagraph.classList.remove('visible')
    dateParagraph.classList.add('hidden')
    errorParagraph.classList.remove('hidden')
    errorParagraph.classList.add('visible')
    errorParagraph.innerText = 'Ошибка! Город не найден, попробуйте снова!'
    return
  }
  outputArea.classList.remove('hidden')
  outputArea.classList.add('visible')
  errorParagraph.classList.remove('hidden')
  errorParagraph.classList.add('hidden')
  dateParagraph.classList.remove('hidden')
  dateParagraph.classList.add('visible')
  dateParagraph.innerText = currentDateAndTime.showDateAndTime()
  townName.innerText = dataFromAPI.name
  temperature.innerText = Math.floor(dataFromAPI.main.temp - 273,15) + ' °С'
  shortDescription.innerText = dataFromAPI.weather[0].description
  icon.src = 'http://openweathermap.org/img/wn/' + dataFromAPI.weather[0].icon + '@2x.png'
  humidity.innerText = 'Влажность: ' + dataFromAPI.main.humidity + ' %'
  pressure.innerText = 'Давление: ' + dataFromAPI.main.pressure/1000 + ' Бар'
  tempMax.innerText = 'Максимальная температура: ' + Math.floor(dataFromAPI.main.temp_max - 273,15) + ' °С'
  tempMin.innerText = 'Минимальная температура: ' + Math.floor(dataFromAPI.main.temp_min - 273,15) + ' °С'
  sunrise.innerText = 'Восход солнца: ' + new Date(dataFromAPI.sys.sunrise).toString().substring(16,24)
  sunset.innerText = 'Закат: ' + new Date(dataFromAPI.sys.sunset).toString().substring(16,24)
  wind.innerText = 'Ветер: ' + dataFromAPI.wind.speed + ' м/с'
}

const InitShowAll = async () => {
  event.preventDefault()
  await reciveData()
  showParam()
  dataFromAPI = null
}

button.addEventListener('click', InitShowAll)
weatherForm.addEventListener('submit', InitShowAll)