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
app.get('/', function (req, res) {


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

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});