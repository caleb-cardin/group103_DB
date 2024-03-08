// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

let addCustomerOrderForm = document.getElementById('add-customer-order-form-ajax');

// Modify the objects we need
addCustomerOrderForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerID = document.getElementById("input-customer-id-add");
    let inputOrderID = document.getElementById("input-order-id-add");


    // Get the values from the form fields
    let customerIDValue = inputCustomerID.value;
    let orderIDValue = inputOrderID.value;

    // Put our data we want to send in a javascript object
    let data = {
        fkCustomerID: customerIDValue,
        fkOrderID: orderIDValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-order-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCustomerID.value = 'test';
            inputOrderID.value = 'test';
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
    let currentTable = document.getElementById("customer-order-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let customerCell = document.createElement("TD");
    let orderCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.customerOrderID;
    customerCell.innerText = newRow.fkCustomerID;
    orderCell.innerText = newRow.fkOrderID;
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function () {
        deleteCustomerOrder(newRow.customerOrderID);
    };


    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(customerCell);
    row.appendChild(orderCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.customerOrderID);

    // Add the row to the table
    currentTable.appendChild(row);
}