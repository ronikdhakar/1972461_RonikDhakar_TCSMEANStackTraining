let fs=require("fs")
let obj=require("readline-sync")


let display=()=>{
        let flag=true
        let data_array=[]

        var today = new Date();

        while (flag==true){    
            
            let data={}
            let firstName=obj.question("Enter firstname : ")
            data.firstName=firstName

            let lastName=obj.question("Enter lastname : ")
            data.lastName=lastName

            let gender=obj.question("Enter gender : ")
            data.gender=gender

            let email=obj.question("Enter email : ")
            data.email=email
            
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            data.date=date

            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            data.time=time

            data_array.push(data)
            debugger
            


            let more_records=obj.question("Do you want to enter more records ? Type y for Yes or n for No : ")
            if (more_records=="yes" || more_records=="y"){
                if(!fs.existsSync('log.json')){
                    let data_string=JSON.stringify(data_array)
                    fs.writeFileSync("log.json",data_string)
                }
                else{
                    const fileData = JSON.parse(fs.readFileSync('log.json'))
                    fileData.push(data)
                    fs.writeFileSync('log.json', JSON.stringify(fileData));
                }
                flag=true
                debugger
                
            }
            else{
                if(!fs.existsSync('log.json')){
                    let data_string=JSON.stringify(data_array)
                    fs.writeFileSync("log.json",data_string)
                    console.log("I am here")
                }
                else{
                    const fileData = JSON.parse(fs.readFileSync('log.json'))
                    fileData.push(data)
                    fs.writeFileSync('log.json', JSON.stringify(fileData));
                }
                flag=false   
                debugger
            }  
        }
    }
    



exports.display=display