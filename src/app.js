const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode.js')
const foreCast = require('./utils/foreCast.js')
const app = express();


const partialpath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialpath);

const viewsPath = path.join(__dirname, '../templates/views');
app.set('view engine','hbs');

app.use(express.static(path.join(__dirname, '../public')));

app.get('',(req, res)=>{

    res.render('index', {
        title: "Weather APP",
        name: "Vishal"
    })
})

app.get('',(req ,res)=>{

    res.send("<h1>Hello welcome to express</h1>")

})

app.get('/help', (req,res) => {
    res.render('help' , {
        helpText: "This is some helpful text",
        title: "Help for  Weather APP",
        name: "Vishal K",
        
    })
})

app.get('/help' , (req ,res)=>{

    res.send([{
        name : "Vishal",
        age: 23
    }])
})


app.get('/about', (req,res) => {
    res.render('about' , {
        title: "About Weather APP",
        name: " me Vishal"
    })
})

app.get('/about' , (req ,res)=>{

    res.send("<h1>This is all about weather app....</h1>")
})

app.get('/weather' , (req ,res)=>{
    if(!req.query.address){
        return res.send({
            code: 20,
            message: "Missing Query String Parameter: address"
        })
    }

    geoCode(req.query.address, (error, { location, longitude, latitude } = {}) => {
        if(error){
            return res.send({error})
        }
        foreCast(latitude, longitude, (error , foreCastData) =>{
            if(error){
                return res.send({error})
            }

            const apiresponse ={
                foreCast: foreCastData,
                location,
                address: req.query.address
            };
            console.log(apiresponse)
            res.send(apiresponse);
        })


    })

    /*res.send({
        location: "dublin",
        temp: 27,
        rain: "may rain",
        address: req.query.address
    })*/
})


app.get('/products' ,(req, res)=>{
    if(!req.query.search){
        return res.send({
            code: 20,
            message: "Missing Query String Parameter: search"
        })
    }
    console.log(req.query)
    res.send({
        products:[{

        }]
    })
})

app.get('/help/*' , (req ,res)=>{
    res.render("404" , {
        title: "404",
        name: " me Vishal",
        errorMessage:" Help page article  not found"
        
    })
})

app.get('*' , (req ,res)=>{

    res.render("404" ,{
        title: "404",
        name: " me Vishal",
        errorMessage:" page not found"
        
    })
})


app.listen(3000, () =>{
    console.log("port is listening at 3000 port number.....")
})