let fs=require("fs")
let obj=require("mongoose")
obj.Promise=global.Promise
let url="mongodb://localhost:27017/call_record"


const mongoDbwarn={
    useNewUrlParser:true,
    useUnifiedTopology:true
}

obj.connect(url,mongoDbwarn)
let db=obj.connection
db.on("error",(err)=>console.log(err))

db.once("open",()=>{
    let callSchema=obj.Schema({
        _id:Number,
        source:String,
        destination:String,
        sourceLocation:String,
        destinationLocation:String,
        callDuration:String,
        roaming:String,
        callCharge:String,
    })

    let Call=obj.model("",callSchema,"call_record_details")

    let data=fs.readFileSync("call_data.json")
    let data_json=JSON.parse(data.toString())
    
    Call.insertMany(data_json).then(function(){
        console.log("Data inserted successfully")  
        obj.disconnect()
    }).catch(function(error){
        console.log(error)      
    });
       
})

