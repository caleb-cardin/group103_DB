// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js

// App.js
/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
PORT = 13256;                 // Set a port number at the top so it's easy to change in the future
var db = require('./database/db-connector');
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
/*
    ROUTES
*/

app.get('/', function (req, res) {
    res.render('index');
});


// ----------------------------------------------------------------------
// EMPLOYEES
// ----------------------------------------------------------------------
let selectEmployeeQuery = `
SELECT
    Employees.employeeID,
    Employees.employeeName,
    Employees.employeeEmail,
    COUNT(AssignmentsHasEmployees.assignmentEmployeeID) as \`assignmentCount\`
FROM
    Employees
LEFT JOIN AssignmentsHasEmployees ON AssignmentsHasEmployees.fkEmployeeID = Employees.employeeID
GROUP BY
    Employees.employeeID
ASC;
`;
app.get('/employees-nav', function (req, res) {

    db.pool.query(selectEmployeeQuery, function (error, rows, fields) {    // Execute the query

        res.render('employee', { data: rows });                  // Render the employee.hbs file, and also send the renderer
    })
});
app.post('/add-employee-form', function (req, res) {
    let data = req.body;

    query1 = `INSERT INTO Employees (employeeEmail, employeeName) VALUES ('${data.employeeEmail}', '${data.employeeName}');`;
    db.pool.query(query1, function (error, rows, fields) {

        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {
            db.pool.query(selectEmployeeQuery, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});


app.delete('/delete-employee-ajax', function (req, res, next) {
    let data = req.body;
    let deleteEmployeeQuery = `DELETE FROM Employees WHERE Employees.employeeID = ${data.employeeID};`;

    db.pool.query(deleteEmployeeQuery, function (error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

app.put('/put-employee-ajax', function (req, res, next) {
    let data = req.body;


    let updateEmployee = `UPDATE Employees SET Employees.employeeEmail = '${data.employeeEmail}', Employees.employeeName= '${data.employeeName}' 
    WHERE Employees.employeeID = ${data.employeeID};`;

    db.pool.query(updateEmployee, function (error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(selectEmployeeQuery, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});


// ----------------------------------------------------------------------
// ASSIGNMENTS HAS EMPLOYEES
// ----------------------------------------------------------------------
let selectAssignmentsForAEQuery = `
SELECT Assignments.assignmentID FROM Assignments;
`;
let selectEmployeesForAEQuery = `
SELECT Employees.employeeID FROM Employees;
`;
let selectEmployeesHasAssignmentsQuery = `
SELECT * FROM AssignmentsHasEmployees;
`;
app.get('/assignments-has-employees-nav', function (req, res) {

    db.pool.query(selectAssignmentsForAEQuery, function (error, assignmentRows, fields) {    // Execute the query

        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        // If all went well, send the results of the query back.
        else {
            db.pool.query(selectEmployeesForAEQuery, function (error, employeeRows, fields) {    // Execute the query

                if (error) {
        
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    db.pool.query(selectEmployeesHasAssignmentsQuery, function (error, rows, fields) {    // Execute the query
                        if (error) {
        
                            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                            console.log(error);
                            res.sendStatus(400);
                        }
                        // If all went well, send the results of the query back.
                        else {
                            res.render('assignment_employee', { data: rows, assignments: assignmentRows, employees: employeeRows });
                        }
        
                    })
        
                }
            })

        }
    })


});
app.post('/add-assignment-employee-form', function (req, res) {
    let data = req.body;

    query1 = `INSERT INTO AssignmentsHasEmployees (employeeNotes, fkOrderID) VALUES ('${data.employeeNotes}', ${data.fkOrderID});`;
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


// ----------------------------------------------------------------------
// ASSIGNMENTS
// ----------------------------------------------------------------------
let selectOrderForAssignmentQuery = `
SELECT
    Orders.orderID
FROM
	Orders
LEFT JOIN Assignments ON Orders.orderID = Assignments.fkOrderID 
WHERE Assignments.fkOrderID IS NULL;
`;
let selectAssignmentQuery = `
SELECT
    Assignments.assignmentID,
    Assignments.isComplete,
    Assignments.employeeNotes,
    Assignments.fkOrderID
FROM
    Assignments;
`;
app.get('/assignments-nav', function (req, res) {

    db.pool.query(selectOrderForAssignmentQuery, function (error, orderRows, fields) {    // Execute the query

        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        // If all went well, send the results of the query back.
        else {
            db.pool.query(selectAssignmentQuery, function (error, rows, fields) {    // Execute the query
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.render('assignment', { data: rows, orders: orderRows });
                }

            })

        }
    })


});
app.post('/add-assignment-form', function (req, res) {
    let data = req.body;

    query1 = `INSERT INTO Assignments (employeeNotes, fkOrderID) VALUES ('${data.employeeNotes}', ${data.fkOrderID});`;
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


app.delete('/delete-assignment-ajax', function (req, res, next) {
    let data = req.body;
    let deleteAssignmentQuery = `DELETE FROM Assignments WHERE Assignments.assignmentID = ${data.assignmentID};`;

    db.pool.query(deleteAssignmentQuery, function (error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

app.put('/put-assignment-ajax', function (req, res, next) {
    let data = req.body;


    let updateAssignment = `UPDATE Assignments SET Assignments.employeeNotes = '${data.employeeNotes}',  Assignments.isComplete = ${data.isComplete}
    WHERE Assignments.assignmentID = ${data.assignmentID};`;

    db.pool.query(updateAssignment, function (error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
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



// ----------------------------------------------------------------------
// ORDERS
// ----------------------------------------------------------------------
let selectOrderQuery = `
SELECT
    Orders.orderID,
    Orders.orderRequest,
    Assignments.fkOrderID as \`assignmentID\`
FROM
	Orders
LEFT JOIN Assignments ON Assignments.fkOrderID = Orders.orderID;
`;
app.get('/orders-nav', function (req, res) {

    db.pool.query(selectOrderQuery, function (error, rows, fields) {    // Execute the query

        res.render('order', { data: rows });                  // Render the order.hbs file, and also send the renderer
    })
});
app.post('/add-order-form', function (req, res) {
    let data = req.body;

    query1 = `INSERT INTO Orders (orderRequest) VALUES ('${data.orderRequest}');`;
    db.pool.query(query1, function (error, rows, fields) {

        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {
            db.pool.query(selectOrderQuery, function (error, rows, fields) {

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


app.delete('/delete-order-ajax', function (req, res, next) {
    let data = req.body;
    let deleteOrderQuery = `DELETE FROM Orders WHERE Orders.orderID = ${data.orderID};`;

    db.pool.query(deleteOrderQuery, function (error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

app.put('/put-order-ajax', function (req, res, next) {
    let data = req.body;


    let updateOrder = `UPDATE Orders SET Orders.orderRequest = '${data.orderRequest}' 
    WHERE Orders.orderID = ${data.orderID};`;

    db.pool.query(updateOrder, function (error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(selectOrderQuery, function (error, rows, fields) {

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


// ----------------------------------------------------------------------
// CUSTOMERS
// ----------------------------------------------------------------------
let selectCustomerQuery = `
SELECT
    Customers.customerID,
    Customers.customerName,
    Customers.customerEmail,
    COUNT(CustomersHasOrders.customerOrderID) as \`orderCount\`
FROM
    Customers
LEFT JOIN CustomersHasOrders ON CustomersHasOrders.fkCustomerID = Customers.customerID
GROUP BY
    Customers.customerID
ASC;
`;
app.get('/customers-nav', function (req, res) {

    db.pool.query(selectCustomerQuery, function (error, rows, fields) {    // Execute the query

        res.render('customer', { data: rows });                  // Render the customer.hbs file, and also send the renderer
    })
});
app.post('/add-customer-form', function (req, res) {
    let data = req.body;

    query1 = `INSERT INTO Customers (customerEmail, customerName) VALUES ('${data.customerEmail}', '${data.customerName}');`;
    db.pool.query(query1, function (error, rows, fields) {

        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {
            db.pool.query(selectCustomerQuery, function (error, rows, fields) {

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


app.delete('/delete-customer-ajax', function (req, res, next) {
    let data = req.body;
    let deleteCustomerQuery = `DELETE FROM Customers WHERE Customers.customerID = ${data.customerID};`;

    db.pool.query(deleteCustomerQuery, function (error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

app.put('/put-customer-ajax', function (req, res, next) {
    let data = req.body;


    let updateCustomer = `UPDATE Customers SET Customers.customerEmail = '${data.customerEmail}', Customers.customerName= '${data.customerName}' 
    WHERE Customers.customerID = ${data.customerID};`;

    db.pool.query(updateCustomer, function (error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(selectCustomerQuery, function (error, rows, fields) {

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

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});