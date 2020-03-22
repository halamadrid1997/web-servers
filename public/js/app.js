const form = document.querySelector('form')

const input = document.querySelector('input')

const forecastelem = document.getElementById('forecast')

const locelem = document.getElementById('location')


form.addEventListener('submit',(e)=>{

    e.preventDefault()

    const location = input.value

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            forecastelem.textContent = data.error
            locelem.textContent = ''
        }
        else
        {
            forecastelem.textContent = data.forecast
            locelem.textContent = data.location
        }

    })})
})