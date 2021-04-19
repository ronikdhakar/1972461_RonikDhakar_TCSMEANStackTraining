let express=require("express")
let app=express()
let bodyParser=require("body-parser")
let port=9090
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'));
let mongoose=require("mongoose")
mongoose.Promise=global.Promise
let url="mongodb://localhost:27017/course"
const mongoDbwarn={
    useNewUrlParser:true,
    useUnifiedTopology:true
}
mongoose.connect(url,mongoDbwarn)
let db=mongoose.connection

db.on("error",err=>{console.log(err)})


db.once("open",()=>{
    console.log("connected successfully")
    
})


let courseSchema=mongoose.Schema({
    course_id:String,
    course_name:String,
    description:String,
    amount:String
})


let course=mongoose.model("",courseSchema,"course_details")



app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.get("/index.html",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.get("/add.html",(req,res)=>{
    res.sendFile(__dirname+"/add.html")
})

app.get("/update.html",(req,res)=>{
    res.sendFile(__dirname+"/update.html")
})

app.get("/delete.html",(req,res)=>{
    res.sendFile(__dirname+"/delete.html")
})

app.get("/fetch.html",(req,res)=>{
    res.sendFile(__dirname+"/fetch.html")
})

app.post("/addDetails",(req,res)=>{
    let course_id=req.body.course_id
    let course_name=req.body.course_name
    let description=req.body.description
    let amount=req.body.amount
    
    let c=new course({course_id:course_id,course_name:course_name,description:description,amount:amount})
    console.log(c)
    course.insertMany(c).then(function(){
        console.log("Data inserted successfully")  
        res.sendFile(__dirname+"/add.html")
              
        
    }).catch(function(error){
        console.log(error)      
        res.send(error)
    });
    
})

app.post("/updateDetails",(req,res)=>{
    let id=req.body.course_id
    let amt=req.body.amount

    course.updateMany({course_id:id},{$set:{amount:amt}},(err,result)=>{
        if(!err){
            console.log("Updated Successfully")
            res.sendFile(__dirname+"/update.html")
        }
        else{
            console.log(err)
        }
    })
})


app.post("/deleteDetails",(req,res)=>{
    let id=req.body.course_id
    course.deleteOne({course_id:id},(err,result)=>{
        if(!err){
            console.log("deleted successfully")
            res.sendFile(__dirname+"/delete.html")
        }
        else{
            console.log(err)
        }
    })
})

app.get("/fetchDetails",(req,res)=>{
    let data=[]
    course.find({},(err,result)=>{
        if(!err){
            result.forEach(doc=>{
                let obj={}
                obj.course_id=doc.course_id
                obj.course_name=doc.course_name
                obj.description=doc.description
                obj.amount=doc.amount
                data.push(obj)
            })
            res.send(data)
        }
        else{
            res.send("No records exists")
        }
    })
})

app.listen(port,()=>console.log(`running on port ${port}`))