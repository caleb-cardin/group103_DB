let updateEmployeeForm = document.getElementById('put-employee-form');

// Modify the objects we need
updateEmployeeForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputID = document.getElementById("mySelect");
    let inputEmail = document.getElementById("input-email");
    let inputName = document.getElementById("input-name");

    // Get the values from the form fields
    let idValue = inputID.value;
    let emailValue = inputEmail.value;
    let nameValue = inputName.value;
    

    // Put our data we want to send in a javascript object
    let data = {
        employeeID: idValue,
        employeeEmail: emailValue,
        employeeName: nameValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-employee-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("employee-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == parsedData[0].employeeID) {

            // Get the location of the row where we found the matching employee ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of name value
            let tde = updateRowIndex.getElementsByTagName("td")[2];
            let tdn = updateRowIndex.getElementsByTagName("td")[1];
            // Reassign name to our value we updated to
            tde.innerHTML = parsedData[0].employeeEmail; 
            tdn.innerHTML = parsedData[0].employeeName; 
       }
    }
}
