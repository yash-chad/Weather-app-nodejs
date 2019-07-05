console.log("Client side Javascript!!")

// fetch('http://localhost:3000/weather?address=!').then((response)=>{
//         response.json().then((data)=>{

//             if(data.error){
//                 console.log(data.error)
//             }
//             else{
//                 console.log(data.location)
//                 console.log(data.forecast)
//             }
//         })
// })


const weatherForm=document.querySelector("form");
const search=document.querySelector("input");

const message_1=document.getElementById("loc");
const message_2=document.getElementById("forecast");

weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault();  //Restricts the refreshing of the page on input
    const location=search.value;
    const loc_url="http://localhost:3000/weather?address="+location;  
    message_1.textContent="LOADING....";
    message_2.textContent='';
    fetch(loc_url).then((response)=>{
        response.json().then((data)=>{

            if(data.error){
               message_1.textContent=data.error;
            }
            else{
                message_1.textContent=data.location;
                message_2.textContent=data.forecast;
            }
        })
    })

})