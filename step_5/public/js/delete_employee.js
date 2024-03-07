// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
function deleteEmployee(employeeID) {
  let link = '/delete-employee-ajax/';
  let data = {
    employeeID: employeeID
  };

  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      deleteRow(employeeID);
    }
  });
}

function deleteRow(employeeID) {

  let table = document.getElementById("employee-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute("data-value") == employeeID) {
      table.deleteRow(i);
      deleteDropDownMenu(employeeID);
      break;
    }
  }
}


function deleteDropDownMenu(employeeID) {
  let selectMenu = document.getElementById("mySelect");
  for (let i = 0; i < selectMenu.length; i++) {
    if (Number(selectMenu.options[i].value) === Number(employeeID)) {
      selectMenu[i].remove();
      break;
    }

  }
}
