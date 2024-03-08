// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

let updateAssignmentForm = document.getElementById('update-assignment-form-ajax');

// Modify the objects we need
updateAssignmentForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputID = document.getElementById("input-id-update");
    let inputEmployeeNotes = document.getElementById("input-employee-notes-update");
    let inputIsComplete = document.getElementById("input-is-complete-update");


    // Get the values from the form fields
    let idValue = inputID.value;
    let employeeNotesValue = inputEmployeeNotes.value;
    let isCompleteValue = inputIsComplete.value;


    if (isNaN(idValue)) {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        assignmentID: idValue,
        employeeNotes: employeeNotesValue,
        isComplete: isCompleteValue
    }

    // Setup our AJAX Request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-assignment-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX Request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, data.assignmentID);
            inputID.value = "test";
            inputEmployeeNotes.value = '';
            inputIsComplete.value = '0';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    // Send the Request and wait for the response
    xhttp.send(JSON.stringify(data));
})


function updateRow(data, assignmentID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("assignment-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == assignmentID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let tdc = updateRowIndex.getElementsByTagName("td")[1];
            if (parsedData[i - 1].isComplete == '1')
            {
                tdc.innerText = '1';
            }else{
                tdc.innerText = '0';
            }
            let tdn = updateRowIndex.getElementsByTagName("td")[2];
            tdn.innerText = parsedData[i - 1].employeeNotes;
        }
    }
}
