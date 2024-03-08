// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
function deleteAssignmentEmployee(assignmentEmployeeID) {
  let link = '/delete-assignment-employee-employeeajax/';
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
      fkOrderID = Number(table.getElementsByTagName("tr")[i].getElementsByTagName("td")[3].innerText);
      table.deleteRow(i);
      deleteDropDownMenu(assignmentEmployeeID, fkOrderID);
      break;
    }
  }
}


function deleteDropDownMenu(assignmentEmployeeID, fkOrderID) {
  let selectMenu1 = document.getElementById("input-id-update");
  for (let i = 0; i < selectMenu1.length; i++) {
    if (Number(selectMenu1.options[i].value) === Number(assignmentEmployeeID)) {
      selectMenu1[i].remove();
      break;
    }

  }
  let selectMenu2 = document.getElementById("input-id-add");
    let option = document.createElement("option");
    option.text = fkOrderID;
    option.value = fkOrderID;
    selectMenu2.add(option);
}
