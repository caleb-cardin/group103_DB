// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
function deleteCustomer(customerID) {
  let link = '/delete-customer-ajax/';
  let data = {
    customerID: customerID
  };

  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      deleteRow(customerID);
    }
  });
}

function deleteRow(customerID) {

  let table = document.getElementById("customer-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute("data-value") == customerID) {
      table.deleteRow(i);
      deleteDropDownMenu(customerID);
      break;
    }
  }
}


function deleteDropDownMenu(customerID) {
  let selectMenu = document.getElementById("input-id");
  for (let i = 0; i < selectMenu.length; i++) {
    if (Number(selectMenu.options[i].value) === Number(customerID)) {
      selectMenu[i].remove();
      break;
    }

  }
}
