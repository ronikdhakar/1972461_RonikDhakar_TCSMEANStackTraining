let data:any=[]
let size:number=0


function add(product_name,product_price):void{
    var obj:any={}
    size=size+1
    
    obj.product_name=product_name
    obj.product_price=product_price
    
    data.push(obj)
    console.log(data)
    document.getElementById("cartSize").innerHTML=`Size : ${size}`

    sessionStorage.setItem("cart_data",JSON.stringify(data))
}


function checkout():void{
    let table_data=JSON.parse(sessionStorage.getItem("cart_data"))
    let table=document.getElementById("cart_list")
    let body=table.getElementsByTagName("tbody")[0]

    let total:number=0

    table_data.map((row:any,index:any)=>{
        let newRow=body.insertRow(index)

        newRow.insertCell(0).innerHTML=row.product_name
        newRow.insertCell(1).innerHTML=row.product_price
        total+=parseInt(row.product_price)
    })
    document.getElementById('total').innerHTML=`Total : $${total}`
}
