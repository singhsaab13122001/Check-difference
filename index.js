const express=require('express');
const app=express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
var hackerEarth=require('hackerearth-node'); //require the Library
//Now set your application
var hackerEarth=new hackerEarth(
                                'bd6dc402598c5cb3ea1798edb05f66fe2547448f',  //Your Client Secret Key here this is mandatory
                                ''  //mode sync=1 or async(optional)=0 or null async is by default and preferred for nodeJS
);
var config={};
config.time_limit=1;  //your time limit in integer
config.memory_limit=323244;  //your memory limit in integer
config.source='';  //your source code for which you want to use hackerEarth api
config.input="";  //input against which you have to test your source code
config.language="C++"; //optional choose any one of them or none



app.listen(process.env.PORT || 3000,function (req,res) {
    console.log("server started");
});
app.get("/",function(req,res){
    res.render("ans",{
      ans:"differnt logic! differnt lang! no worry check differce here",
      code1:"code1",
      code2:"code2",
      code1_time:"0",
      code2_time:"0",
      code1_space:"0",
      code2_space:"0",
      inp:"test case",
      inout1:"code1",
      inout2:"code2"
    });
});
app.post("/",function(req,res){
  var code1=req.body.code1;
  var code2=req.body.code2;
  var code1_time;
  var code2_time;
  var code1_space;
  var code2_space;
  var code1_lang=req.body.code1_lang;
  var code2_lang=req.body.code2_lang;
  var input=req.body.input;
  config.source=code1;
  config.input=input;
  config.language=code1_lang;
  var data1;
  var data2;
  hackerEarth.run(config,function(err,response){
        if(err) {
        res.render("404");
        console.log(err);
        } else {
          response=JSON.parse(response);
          data1=(response.run_status.output);
          code1_time=response.run_status.time_used;
          code1_space=response.run_status.memory_used;
          if(response.compile_status===false)
          {
            data1="failed";
            code1_time="failed";
            code1_space="failed"
          }
          console.log(response);
          config.source=code2;
          config.language=code2_lang;
         hackerEarth.run(config,function(err,response){
                if(err) {
                  console.log(err);
                  res.render("404");
                } else {
                  response=JSON.parse(response);
                //  console.log(JSON.parse(response));
                if(response.compile_status===false)
                {
                  data2="failed";
                  code2_time="failed";
                  code2_space="failed"
                }
                  data2=(response.run_status.output);
                  code2_time=response.run_status.time_used;
                  code2_space=response.run_status.memory_used;
                  //
                  console.log(data1,data2);
                  console.log(response);

                  ///
                  var con="Oops output is differnt! and go back to not fill code again!";
                  if(data1===data2)
                  {
                    con="output is same! and go back to not fill code again!";
                  }
                  res.render("ans",{
                    ans:con,
                    code1:data1,
                    code2:data2,
                    code1_time:code1_time,
                    code2_time:code2_time,
                    code1_space:code1_space,
                    code2_space:code2_space,
                    inp:input,
                    inout1:"output",
                    inout2:"output"
                  });
                }
          });
        }
  });



});
