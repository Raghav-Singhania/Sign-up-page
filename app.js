const express = require('express')
const request = require('request');
const path = require('path')
const http = require('http');
const app = express();
const bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})

app.post('/',(req,res)=>{
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;


    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName, 
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = 'http://us10.api.mailchimp.com/3.0/lists/b24d1d1fc8'

    const options = {
        method: "POST",
        auth: "Raghav:0fdb35fb25d8b80f78a0dd778acb04e1-us10"
    }

    const request = http.request(url,options,(response)=>{
        console.log(response.statusCode);
        if(response.statusCode===200 || response.statusCode===426){
            res.sendFile(__dirname+"/success.html")
        }else{
            res.sendFile(__dirname+"/failure.html")
        }
        // response.on("data",(data)=>{
        //     console.log(JSON.parse(data));
        // })
    })

    request.write(jsonData);
    request.end();                  
});

app.listen(process.env.PORT || 5000,()=>{
    console.log('server is listning on port 5000...');
})




//API KEY
//13f5f29e5f5661ce1ebf15256c68e8a8-us10

//list id
//b24d1d1fc8