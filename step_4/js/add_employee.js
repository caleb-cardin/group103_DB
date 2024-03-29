let addEmployeeForm = document.getElementById('add-employee-form');

// Modify the objects we need
addEmployeeForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputEmail = document.getElementById("input-email");
    let inputName = document.getElementById("input-name");

    // Get the values from the form fields
    let emailValue = inputEmail.value;
    let nameValue = inputName.value;

    // Put our data we want to send in a javascript object
    let data = {
        employeeEmail: emailValue,
        employeeName: nameValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputEmail.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("employee-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.id;
    nameCell.innerText = newRow.name;
    emailCell.innerText = newRow.email;
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteEmployee(newRow.id);
    };


    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.id);

    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.name;
    option.value = newRow.id;
    selectMenu.add(option);
}