const request = require('request');


const foreCast= (latitude ,longitude , callback)=>{
    const url = "https://api.darksky.net/forecast/8d27f431e7735881132068e0ac92d293/"+ encodeURIComponent(latitude)+ ","+encodeURIComponent(longitude) + "?units=si"
    console.log("url",url)
    request({url , json:true},(error , {body})=>{
        if(error){
            callback("Unable to connect weather service.........", undefined);
        }else if(!body.daily){
              callback("Unable to find Location......", undefined)
        }else{
              callback(undefined , body.daily.data[0].summary + " There is currently "+ body.currently.temperature  + "  There is "+ body.currently.cloudCover +"% chances of rainning")
        }
    })
}

module.exports =foreCast;