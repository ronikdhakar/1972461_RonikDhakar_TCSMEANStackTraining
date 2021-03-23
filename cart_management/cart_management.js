var data = [];
var size = 0;
function add(product_name, product_price) {
    var obj = {};
    size = size + 1;
    obj.product_name = product_name;
    obj.product_price = product_price;
    data.push(obj);
    console.log(data);
    document.getElementById("cartSize").innerHTML = "Size : " + size;
    sessionStorage.setItem("cart_data", JSON.stringify(data));
}
function checkout() {
    var table_data = JSON.parse(sessionStorage.getItem("cart_data"));
    var table = document.getElementById("cart_list");
    var body = table.getElementsByTagName("tbody")[0];
    var total = 0;
    table_data.map(function (row, index) {
        var newRow = body.insertRow(index);
        newRow.insertCell(0).innerHTML = row.product_name;
        newRow.insertCell(1).innerHTML = row.product_price;
        total += parseInt(row.product_price);
    });
    document.getElementById('total').innerHTML = "Total : $" + total;
}
