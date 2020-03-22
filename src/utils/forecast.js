const request = require('request')

const getforecast = (lat,lon,callback)=>{

const url = 'https://api.darksky.net/forecast/0506194fe5fd43854be1bf15cd07aa74/'+encodeURIComponent(lat)+','+encodeURIComponent(lon)+'?units=si'

request({url:url,json:true},(error,response)=>{
    if(error)
    {
        callback('Unable to connect to the internet',undefined)
    }
    else if(response.body.error)
    {
        callback('Unable to locate given address. Please try again!')//Giving nothing sends second argument as undefined by default
    }
    else{
        callback(undefined,response.body.daily.data[0].summary+'It is '+response.body.currently.temperature+' degree Celsius.There is '+response.body.currently.precipProbability+'% chance of rain')
    }
})

}

module.exports = {
    getforecast : getforecast
}