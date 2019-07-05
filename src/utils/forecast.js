const request=require("request")

const forecast=(latitude,longitude,callback)=>{
    const forecast_url="https://api.darksky.net/forecast/8508d015d258f4533d0aa700532fb9fb/"+latitude+","+longitude+"?units=si"

    request({url:forecast_url , json:true },(error,response)=>{

        if(error){
             callback("Unable to connect to weather service!!",undefined)
         }

        else if(response.body.error){
            callback("UNable to find location",undefined)
        }

        else{
             callback(undefined,response.body.daily.data[0].summary+"It is currently "+response.body.currently.temperature +" degrees out! There is "+response.body.currently.precipProbability*100+"% chance of rain");
         }

    })

}

module.exports=forecast;