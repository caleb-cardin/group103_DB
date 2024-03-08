// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

let updateOrderForm = document.getElementById('update-order-form-ajax');

// Modify the objects we need
updateOrderForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputID = document.getElementById("input-id");
    let inputRequest = document.getElementById("input-request-update");


    // Get the values from the form fields
    let idValue = inputID.value;
    let requestValue = inputRequest.value;

    
    if (isNaN(idValue)) 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        orderID: idValue,
        orderRequest: requestValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-order-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, data.orderID);
            inputID.value = "test";
            inputRequest.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})


function updateRow(data, orderID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("order-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == orderID) {

            // Get the location of the row where we found the matching order ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of name value
            let tdr = updateRowIndex.getElementsByTagName("td")[1];
            // Reassign name to our value we updated to
            tdr.innerText = parsedData[i-1].orderRequest;
       }
    }
}
