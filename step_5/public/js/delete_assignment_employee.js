// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
function deleteAssignmentEmployee(assignmentEmployeeID) {
  let link = '/delete-assignment-employee-ajax/';
  let data = {
    assignmentEmployeeID: assignmentEmployeeID
  };

  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      deleteRow(assignmentEmployeeID);
    }
  });
}

function deleteRow(assignmentEmployeeID) {

  let table = document.getElementById("assignment-employee-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute("data-value") == assignmentEmployeeID) {
      table.deleteRow(i);
      break;
    }
  }
}

