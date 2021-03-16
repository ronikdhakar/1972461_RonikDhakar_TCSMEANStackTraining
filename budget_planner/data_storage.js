var data_session=[]

function storeInSession(){
    var data = insertData()
    
    data_session.push(data)
    sessionStorage.setItem("manager_data",JSON.stringify(data_session))
    var obj=sessionStorage.getItem("manager_data")
    var obj_saved = JSON.parse(obj);
    console.log(obj_saved)
}

function insertData(){
    var obj={}
    obj.client_name=document.getElementById("client_name").value
    obj.project_name=document.getElementById("project_name").value
    obj.budget=document.getElementById("budget").value

    return obj
}

function reset_data(){
    document.getElementById("client_name").value=""
    document.getElementById("project_name").value=""
    document.getElementById("budget").value=""

}

function insertNewRecord(){
    var data=JSON.parse(sessionStorage.getItem("manager_data"))
    var table=document.getElementById("project_list")
    var body=table.getElementsByTagName("tbody")[0]

    var total=0

    data.map((row,index)=>{
        var newRow=body.insertRow(index)

        newRow.insertCell(0).innerHTML=row.client_name
        newRow.insertCell(1).innerHTML=row.project_name
        newRow.insertCell(2).innerHTML='$'+row.budget
        total+=parseInt(row.budget)
    })   
    console.log(total)
    document.getElementById('total').innerHTML=`Total : $${total}`
        
}

function clearEntry(){
    reset_data()
}