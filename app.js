const express = require("express");
const bodyparser = require("body-parser");
const date = require(__dirname + "/date.js")


const app = express();
const  items = ["Buy Food", "Cock Food", "Eat Food"];
const workItems = [];
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/" , function(req , res){

    const day = date.getDate();

   
   
        res.render("list", {listTitle: day, newItems: items});
});

app.post("/" , function(req , res ) {

    const item = req.body.newitem;

    if(req.body.list === "workList") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
   
});


app.get("/work" , function(req ,res){
    res.render("list" , {listTitle: "workList", newItems: workItems});
});
app.post("/work" , function(req , res) {
    let item = req.body.items;
    workItems.push(item);
    res.redirect("/work");

});
app.get("/about" , function(req,res) {
    res.render("about");
})
app.listen(3000 , function(){
    console.log("server is starter on port 3000.")
});