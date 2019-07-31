let weatherForm = document.getElementById('weather__form')
let userInput = document.getElementById('weather__form__input')
let button = document.getElementById('weather__form__button')
let showDateParagraph = document.getElementById('weather__display__date')
let outputArea = document.getElementById('weather__display__data-from-api')
let showTownName = document.getElementById('weather__display__data-from-api__main-features__town')
let showShortDescription = document.getElementById('weather__display__data-from-api__main-features__description')
let showTemperature = document.getElementById('weather__display__data-from-api__main-features__temperature')
let showIcon = document.getElementById('weather__display__data-from-api__main-features__icon')
let showHumidity = document.getElementById('weather__display__data-from-api__details__humidity') 
let showPressure = document.getElementById('weather__display__data-from-api__details__pressure')
let showTempMax = document.getElementById('weather__display__data-from-api__details__temp-max')
let showTempMin = document.getElementById('weather__display__data-from-api__details__temp-min')
let showSunrise = document.getElementById('weather__display__data-from-api__details__sunrise')
let showSunset = document.getElementById('weather__display__data-from-api__details__sunset')
let showWind = document.getElementById('weather__display__data-from-api__details__wind')
let DataFromAPI

outputArea.style.display = 'none'

//Fetch Data from openweather API
const reciveData = async () => {
  let userInputValue = userInput.value

  if (userInputValue === '') {
    showDateParagraph.style.display = 'block'
    showDateParagraph.style.color = 'red'
    showDateParagraph.innerText = 'Ошибка! Введите наименование населенного пункта!'
    outputArea.style.display = 'none'
  } else {
    outputArea.style.display = 'flex'
    let urlToFetch = `https://api.openweathermap.org/data/2.5/weather?q=${userInputValue}&APPID=181262891917dd3e32f0214aea1a3c9c`

    await fetch(urlToFetch)
    .then((response) => response.json())
    .then((myJson) => DataFromAPI = myJson)
  }
}

//Show Weather Details
const showParam = () => {
  if (DataFromAPI.cod === '404') {
    outputArea.style.display = 'none'
    showDateParagraph.style.display = 'block'
    showDateParagraph.style.color = 'red'
    showDateParagraph.innerText = 'Ошибка! Город не найден, попробуйте снова!'
  } else {
    let timeFix = (i) => {
      if (i < 10) {
        i = '0' + i
      }
      return i
    }
    
    let currentDateAndTime = (new Date).toLocaleDateString() + ', ' + timeFix((new Date).getHours()) + ':' + timeFix((new Date).getMinutes())
    
    outputArea.style.display = 'flex'
    showDateParagraph.style.color = ''
    showDateParagraph.style.display = 'block'
    showDateParagraph.innerText = currentDateAndTime
    showTownName.innerText = DataFromAPI.name
    showTemperature.innerText = Math.floor(DataFromAPI.main.temp - 273,15) + ' °С'
    showShortDescription.innerText = DataFromAPI.weather[0].description
    showIcon.src = 'http://openweathermap.org/img/wn/' + DataFromAPI.weather[0].icon + '@2x.png'
    showHumidity.innerText = 'Влажность: ' + DataFromAPI.main.humidity + " %"
    showPressure.innerText = 'Давление: ' + DataFromAPI.main.pressure/1000 + " Бар"
    showTempMax.innerText = 'Максимальная температура: ' + Math.floor(DataFromAPI.main.temp_max - 273,15) + ' °С'
    showTempMin.innerText = 'Минимальная температура: ' + Math.floor(DataFromAPI.main.temp_min - 273,15) + ' °С'
    showSunrise.innerText = 'Восход солнца: ' + new Date(DataFromAPI.sys.sunrise).toString().substring(16,24)
    showSunset.innerText = 'Закат: ' + new Date(DataFromAPI.sys.sunset).toString().substring(16,24)
    showWind.innerText = 'Ветер: ' + DataFromAPI.wind.speed + " м/с"
  }
}

const InitShowAll = async () => {
  event.preventDefault()
  await reciveData()
  showParam()
  DataFromAPI = null
}

button.addEventListener('click', InitShowAll)
weatherForm.addEventListener('submit', InitShowAll)