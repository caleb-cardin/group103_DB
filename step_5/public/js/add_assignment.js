// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

let addAssignmentForm = document.getElementById('add-assignment-employee-form-ajax');

// Modify the objects we need
addAssignmentForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderID = document.getElementById("input-id-add");
    let inputEmployeeNotes = document.getElementById("input-employee-notes");


    // Get the values from the form fields
    let employeeNotesValue = inputEmployeeNotes.value;
    let orderIDValue = inputOrderID.value;

    // Put our data we want to send in a javascript object
    let data = {
        employeeNotes: employeeNotesValue,
        fkOrderID: orderIDValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-assignment-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputEmployeeNotes.value = '';
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
    let currentTable = document.getElementById("assignment-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let completeCell = document.createElement("TD");
    let notesCell = document.createElement("TD");
    let orderCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.assignmentID;
    completeCell.innerText = newRow.isComplete;
    notesCell.innerText = newRow.employeeNotes;
    orderCell.innerText = newRow.fkOrderID;
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function () {
        deleteAssignment(newRow.assignmentID);
    };


    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(completeCell);
    row.appendChild(notesCell);
    row.appendChild(orderCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.assignmentID);

    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu1 = document.getElementById("input-id-add");
    for (let i = 0; i < selectMenu1.length; i++) {
        if (Number(selectMenu1.options[i].value) === Number(newRow.fkOrderID)) {
            selectMenu1[i].remove();
            break;
        }
    }

    let selectMenuUpdate = document.getElementById("input-id-update");
    let option = document.createElement("option");
    option.text = newRow.assignmentID;
    option.value = newRow.assignmentID;
    selectMenuUpdate.add(option);
}