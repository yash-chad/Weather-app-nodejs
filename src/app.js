const path=require("path")   //Inbuilt Javascript module
const express=require("express")
const hbs=require("hbs")
const geocode=require("./utils/geocode")
const forecast=require("./utils/forecast")
const request=require("request")

const app=express();
const port=process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath= path.join(__dirname,'../public');
const viewsPath= path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');

//Setup handelbars engine and views location
app.set('view engine','hbs'); //Sets up handelbars(hbs)
app.set('views',viewsPath);  //By default node searches for the dynamic pages inside the 'views folder',but we have them in 'templates'
hbs.registerPartials(partialsPath); //partialsPath contains the location that the handlebars module needs

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index.hbs',{
        title:'Weather app!!',
        name:'Yash Chachad'
    })
})


app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title:'About Me',
        name:'Yash Chachad'
    })
})


app.get('/help',(req,res)=>{
    res.render('help.hbs',{
        description:"Some helpful text!",
        title:'Help',
        name:'Yash Chachad'
    })
})




app.get("/weather",(req,res)=>{

    if(!req.query.address){
        res.send({
            error:"Please provide address property"
        })
    }

    else{
        const address=req.query.address;
        geocode( address, (error,data)=>{

            if(error){
              return  res.send({error})
            }
            
            forecast( data.latitude , data.longitude, (error, forecastData) => {
                if(error){
                   return res.send({error})
                }
                else{
                    return res.send({
                        forecast:forecastData,
                        location:data.location,
                        address:req.query.address
                    })
                }

                })

      
        })
    }

})







app.get('/product', (req,res)=>{

    if(!req.query.search){
        res.send({
            errors:'Please provide a search term'
        })
    }
    else{
        res.send({
            products:[]
        })
    }

})


//"*"  wildcard character ,matches eveything that hasnt been matched so far!

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:"404",
        name:"Yash Chachad",
        message:"Help article not found!"
    })
})


app.get('*',(req,res)=>{
    res.render('error.hbs',{    
        title:"404",
        name:"Yash Chachad",
        message:"Page not found!"
    })
})


app.listen(port,()=>{
    console.log("Server is up on the port" +port);
})