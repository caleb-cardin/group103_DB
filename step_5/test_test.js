// ----------------------------------------------------------------------
// CUSTOMERS HAS ORDERS
// ----------------------------------------------------------------------
let selectCustomersForAEQuery = `
SELECT Customers.customerID FROM Customers;
`;
let selectOrdersForAEQuery = `
SELECT Orders.orderID FROM Orders;
`;
let selectOrdersHasCustomersQuery = `
SELECT * FROM CustomersHasOrders;
`;
app.get('/customers-has-orders-nav', function (req, res) {

    db.pool.query(selectCustomersForAEQuery, function (error, customerRows, fields) {    // Execute the query

        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        // If all went well, send the results of the query back.
        else {
            db.pool.query(selectOrdersForAEQuery, function (error, orderRows, fields) {    // Execute the query

                if (error) {
        
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    db.pool.query(selectOrdersHasCustomersQuery, function (error, rows, fields) {    // Execute the query
                        if (error) {
        
                            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                            console.log(error);
                            res.sendStatus(400);
                        }
                        // If all went well, send the results of the query back.
                        else {
                            res.render('customer_order', { data: rows, customers: customerRows, orders: orderRows });
                        }
        
                    })
        
                }
            })

        }
    })


});
app.post('/add-customer-order-form', function (req, res) {
    let data = req.body;

    query1 = `INSERT INTO CustomersHasOrders (fkCustomerID, fkOrderID) VALUES ('${data.fkCustomerID}', ${data.fkOrderID});`;
    db.pool.query(query1, function (error, rows, fields) {

        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {
            db.pool.query(selectAssignmentQuery, function (error, rows, fields) {

                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }

                else {
                    res.send(rows);
                }
            })
        }
    })
});
