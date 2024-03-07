// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

let updateEmployeeForm = document.getElementById('update-employee-form-ajax');

// Modify the objects we need
updateEmployeeForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputID = document.getElementById("input-id");
    let inputEmail = document.getElementById("input-email-update");
    let inputName = document.getElementById("input-name-update");

    // Get the values from the form fields
    let idValue = inputID.value;
    let emailValue = inputEmail.value;
    let nameValue = inputName.value;
    
    if (isNaN(idValue)) 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        employeeID: idValue,
        employeeEmail: emailValue,
        employeeName: nameValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, data.employeeID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})


function updateRow(data, employeeID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("employee-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == employeeID) {

            // Get the location of the row where we found the matching employee ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of name value
            let tdn = updateRowIndex.getElementsByTagName("td")[1];
            let tde = updateRowIndex.getElementsByTagName("td")[2];
            // Reassign name to our value we updated to
            tde.innerText = parsedData[parsedData.length - 1].employeeEmail;
            tdn.innerText = parsedData[parsedData.length - 1].employeeName;
       }
    }
}
