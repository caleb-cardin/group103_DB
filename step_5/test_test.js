// ----------------------------------------------------------------------
// ASSIGNMENTS HAS EMPLOYEES
// ----------------------------------------------------------------------
let selectAssignmentsForAEQuery = `
SELECT * FROM Orders;
`;
let selectEmployeesForAEQuery = `
SELECT * FROM Orders;
`;
let selectEmployeesHasAssignmentsQuery = `
SELECT * FROM CustomersHasOrders;
`;
app.get('/assignments-employees-nav', function (req, res) {

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
                            res.render('assignment_employee', { data: rows, assignments: assignmentRows, empoyees: employeeRows });
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