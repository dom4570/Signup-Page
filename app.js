const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/ad101edcc9"

    const options = {
        method: "POST",
        auth: "dominic7:d5f5ba5d1041916a5c0be75642808038-us17"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }  else {
            res.sendFile(__dirname+"/failure.html");
        }
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
});


app.listen(3000, function(){
    console.log("server is up and running over porth 3000");
});


// apikey
// d5f5ba5d1041916a5c0be75642808038-us17
//the usxx(mine is 17) at last of api should be need to use on auth!!!

// id--->ad101edcc9
// your id should be used over your url
// audienceid