let app=require('express')()
let http=require('http').Server(app)
let io=require('socket.io')(http)
let port=9090

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

io.on("connection",(socket)=>{
    console.log("connected....")
    socket.on("message",(msg)=>{
        console.log(`
        Hello ${msg.name},
        Your Message : ${msg.message}
        `)
    })
})

http.listen(port,()=>{console.log(`Running on port ${port}`)})