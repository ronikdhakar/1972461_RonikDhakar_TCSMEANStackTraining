function addDetails(){
    var data=insertRecord()
    var parentDiv = document.getElementById("blogs")

    var newDiv = document.createElement("div");
    newDiv.style.display.flexDirection='row'
    newDiv.style.cssText = ';margin-bottom: 10px;color:black;font-size: 100%;font-weight: 900;text-align:center';
    
    newDiv.innerHTML = data.title;
    parentDiv.appendChild(newDiv);


    var newDiv1 = document.createElement("div");
    newDiv.style.display.flexDirection='row'
    newDiv1.style.cssText = 'border:solid;border-right:double;margin-bottom: 10px;margin-left:70px;margin-right:90px;text-align: justify;color:black;font-size: 100%;font-weight: lighter;';


    newDiv1.innerHTML=data.content;
    parentDiv.appendChild(newDiv1);

        
 
    var newDiv2 = document.createElement ("img");

    newDiv2.src = data.image;
   
    
    newDiv2.style.setProperty('height','300px');
    newDiv2.style.setProperty('margin-left','550px');
 

    parentDiv.appendChild(newDiv2);

      
    var elem = document. createElement("hr");
    parentDiv.appendChild(elem);

    document.getElementById("title").value=""
    document.getElementById("content").value=""
    document.getElementById("image").src=""

    
}

function insertRecord(){
    var obj={}
    obj.title=document.getElementById("title").value
    obj.content=document.getElementById("content").value
    obj.image=document.getElementById("image").files[0].name
    console.log(obj.image)
    return obj
}