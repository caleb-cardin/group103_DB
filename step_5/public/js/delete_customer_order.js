// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
function deleteCustomerOrder(customerOrderID) {
  let link = '/delete-customer-order-ajax/';
  let data = {
    customerOrderID: customerOrderID
  };

  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      deleteRow(customerOrderID);
    }
  });
}

function deleteRow(customerOrderID) {

  let table = document.getElementById("customer-order-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute("data-value") == customerOrderID) {
      table.deleteRow(i);
      break;
    }
  }
}

