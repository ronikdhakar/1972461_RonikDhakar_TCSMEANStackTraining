let app=require('express')()
let http=require('http').Server(app)
let io=require('socket.io')(http)
let port=9090
let obj=require("mongoose")
let url="mongodb://localhost:27017/chatlog"
let mongoDbWarn={
    useNewUrlParser:true,
    useUnifiedTopology:true
}

obj.connect(url,mongoDbWarn)
let db=obj.connection

db.on("error",(err)=>{console.log(err)})

db.once("open",()=>{
    console.log("connected to database")
})

let chatSchema=obj.Schema({
    name:String,
    message:String
})

let chat=obj.model("",chatSchema,"chat_details")

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

io.on("connection",(socket)=>{
    console.log("socket io connected")   

    socket.on("message",(msg)=>{
        console.log(`
        Hello ${msg.name},
        Your Message : ${msg.message}

        `)     

        let c = new chat({name:msg.name,message:msg.message })

        c.save(function (err) {
            if (err) {
            console.log(err);
            }
          }); 
    })     
})


http.listen(port,()=>{console.log(`Running on port ${port}`)})