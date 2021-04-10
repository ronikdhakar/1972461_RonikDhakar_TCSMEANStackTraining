let http=require("http")
let port=9090
let fs=require("fs")
let url=require("url")
let alert = require('alert');  


let loginInfo=`
<body >
<h2>Task Planner </h2>
    <h4>Add Task</h4>
    <form action="/login" method="get">
        <label>Emp Id : </label>
        <input type="text" name="empId"/><br/>
        <label>Task Id : <label>
        <input type="text" name="taskId"><br/>
        <label>Task : <label>
        <textarea name="task"/></textarea><br/>
        <label>Deadline : </label>
        <input type="date" name="deadline"/><br/>
        <input type="submit" value="Add Task"/>
    </form>
    <br/>
    <br/>

    <h4>Delete Task</h4>
    <form action="/delete" method="get">
        <label>Task Id : </label>
        <input type="text" name="taskId"/><br/>
        <input type="submit" value="Delete Task"/>
    </form>
    <br/>
    <br/>

    <h4> List Tasks </h4>
    <form action="/list" method="get">
        <input type="submit" value="List all tasks"/>
    </form>

</body>
`


let server=http.createServer((req,res)=>{
    var pathInfo=url.parse(req.url,true).pathname
    
    if (pathInfo=="/"){
        res.setHeader("content-type","text/html")
        res.end(loginInfo)
    }
    else if (pathInfo=="/login"){
        var data=url.parse(req.url,true).query
        
        var data_array=[]
        var obj={}
        obj.empId=data.empId
        obj.taskId=data.taskId
        obj.task=data.task
        obj.deadline=data.deadline
        
        data_array.push(obj)

        if(!fs.existsSync('login.json')){
            let data_string=JSON.stringify(data_array)
            fs.writeFileSync("login.json",data_string)
        }
        else{
            const fileData = JSON.parse(fs.readFileSync('login.json'))
            fileData.push(data)
            fs.writeFileSync('login.json', JSON.stringify(fileData));
        }

        res.end(loginInfo)
    }
    else if (pathInfo=="/delete"){
        var data=url.parse(req.url,true).query
        var check=0
        
        if(fs.existsSync('login.json')){
            var new_data_array=[]
            const fileData = JSON.parse(fs.readFileSync('login.json'))
            
            for (i in fileData) {
                if(fileData[i].taskId!=data.taskId){
                    new_data_array.push(fileData[i])
                    check+=1
                }
              }
            
            if (check==fileData.length){
                alert("Record does not exists")
            }
            else{
                fs.writeFileSync('login.json', JSON.stringify(new_data_array));
            }
                      
        }
        else if (!fs.existsSync('login.json') ){
            alert("Record does not exists")
            
        }
        
        res.end(loginInfo)
    }
    else if (pathInfo=="/list"){
        if(!fs.existsSync('login.json')){
            alert("No records exists")
            res.end(loginInfo)
        }
        else{
            const fileData = JSON.parse(fs.readFileSync('login.json'))          
            
            res.end(
            `
            <body >
            <h2>Task Planner </h2>
                <h4>Add Task</h4>
                <form action="/login" method="get">
                    <label>EmpId </label>
                    <input type="text" name="empId"/><br/>
                    <label>TaskId <label>
                    <input type="text" name="taskId"><br/>
                    <label>Task <label>
                    <textarea name="task"/></textarea><br/>
                    <label>Deadline </label>
                    <input type="date" name="deadline"/><br/>
                    <input type="submit" value="Add Task"/>
                </form>
                <br/>
                <br/>
            
                <h4>Delete Task</h4>
                <form action="/delete" method="get">
                    <label>TaskId</label>
                    <input type="text" name="taskId"/><br/>
                    <input type="submit" value="Delete"/>
                </form>
                <br/>
                <br/>
            
                <h4> List Tasks </h4>
                <form action="/list" method="get">
                    <input type="submit" value="List all tasks"/>
                
                </form>         

                <table >
                    <thead>
                        <tr>
                            <th>
                                Employee-Id
                            </th>
                            <th>
                                Task-Id
                            </th>
                            <th>
                                Task
                            </th>
                            <th>
                                Deadline
                            </th>  
                        </tr>
                    </thead>
                    <tbody>
                    
                        ${fileData.map(obj=>`
                        <tr>
                        <td>
                            ${obj.empId}
                        </td>
                        <td>
                            ${obj.taskId}
                        </td>
                        <td>
                            ${obj.task}
                        </td>
                        <td>
                            ${obj.deadline}
                        </td>
                        </tr>`).join("")}
                    
                    </tbody>
                
                </table>
                    
                  
            </body>
            
            `)
                   
        }     
    }
    
})

server.listen(port,()=>{console.log(`running on port ${port}`)})