const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const https=require("https");
const request=require("request");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,response){
    response.sendFile(__dirname+"/sign_ip_form.html");
})

app.post("/",function(req,response){
  var first=req.body.First_name;
  var second=req.body.Last_name;
  var email=req.body.email;
  var data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:first,
          LNAME:second
        }

      }
    ]
  };
  var jsonData=JSON.stringify(data);

  const url= "https://us8.api.mailchimp.com/3.0/lists/d66817cc3d";

  const options={
    method:"POST",
    auth:"any_username:9fd94dd9e475579f9eaa3f9eb9065699-us8"
  }

const request= https.request(url,options,function(resp){

  if(resp.statusCode===200)
  {
    response.sendFile(__dirname+"/success.html");
  }
  else{
    response.sendFile(__dirname+"/fail.html");
  }
    resp.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
})

app.post("/failure",function(req,response){
  response.redirect("/")
})
app.listen(3000,function(){
   console.log("Server is running at port 3000");
})

//API KEYS
// 9fd94dd9e475579f9eaa3f9eb9065699-us8
//list id d66817cc3d
