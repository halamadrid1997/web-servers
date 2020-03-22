
const request = require('request')

const getgeocode = (address,callback)=>{

const geocode = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaGVsbG93b3JsZDc3NyIsImEiOiJjazd1d292dm0xNjBsM2xucWU2aGliZzI2In0.Dg9bF-tvUDzaZJQfF_Mpkg'

request({url:geocode,json:true},(error,response)=>{
    if(error)
    {
        callback('Unable to connect to the internet',undefined)
    }
    else if(response.body.features.length === 0)
    {
        callback('Unable to locate given address. Please try again!')//Giving nothing sends second argument as undefined by default
    }
    else{
        callback(undefined,{
            latitude:response.body.features[0].center[1],
            longitude:response.body.features[0].center[0],
            location:response.body.features[0].place_name
        })
    }
})

}

module.exports = {
    getgeocode:getgeocode}