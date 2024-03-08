// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
function deleteOrder(orderID) {
  let link = '/delete-order-ajax/';
  let data = {
    orderID: orderID
  };

  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      deleteRow(orderID);
    }
  });
}

function deleteRow(orderID) {

  let table = document.getElementById("order-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute("data-value") == orderID) {
      table.deleteRow(i);
      deleteDropDownMenu(orderID);
      break;
    }
  }
}


function deleteDropDownMenu(orderID) {
  let selectMenu = document.getElementById("input-id");
  for (let i = 0; i < selectMenu.length; i++) {
    if (Number(selectMenu.options[i].value) === Number(orderID)) {
      selectMenu[i].remove();
      break;
    }

  }
}
