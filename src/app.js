const path=require('path')

const express = require('express')

const hbs = require('hbs')
console.log('git')
const geocode = require('./utils/geocode')

const forecast  = require('./utils/forecast')

const app = express()

const partialpath = path.join(__dirname,'../views/partials')

app.set('view engine','hbs')

app.use(express.static(path.join(__dirname,'../public')))

hbs.registerPartials(partialpath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Shubha'
    })//needs to match with index.hbs
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About page',
        name:'Shubha'
    })
})

app.get('/help',(req,res)=>{
    res.render('message',{
        title:'Help',
        name:'Shubha'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)//req.query contains all the query strings from the url as an object.
    {
        return res.send({
            error:'Please provide an address'
        })
    }
    geocode.getgeocode(req.query.address,(error,{latitude,longitude,location}={})=>{

        if(error)
        {
            return res.send({error:error})
        }
        forecast.getforecast(latitude,longitude,(error,forecastdata)=>{
    
            if(error)
            {
                res.send(error)
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
        })
    })
    }
)

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        error:'Help article not found',
        name:'Shubha'

    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        error:'Page not found',
        name:'Shubha'
    })
})

app.listen(3000,()=>{
    console.log('Server running on port 3000')
})