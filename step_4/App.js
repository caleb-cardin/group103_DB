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
    db.pool.query(selectEmployeeQuery, function (error, rows, fields) {    // Execute the query

        res.render('employee', { data: rows });                  // Render the employee.hbs file, and also send the renderer
    })
});

app.post('/add-employee-form', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Employees (employeeEmail, employeeName) VALUES ('${data['input-email']}', '${data['input-name']}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else {
            res.redirect('/');
        }
    })
});

app.delete('/delete-employee-ajax/', function (req, res, next) {
    let data = req.body;
    let deleteEmployees = `DELETE FROM Employees WHERE employeeID = ${data['employeeID']}`;

    db.pool.query(deleteEmployees, function (error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

app.put('/put-employee-form', function (req, res, next) {
    let data = req.body;

    let updateEmployee = `UPDATE Employees SET employeeEmail = '${data['input-email']}', employeeName= '${data['input-name']}' 
    WHERE employeeID = ${data['input-id']}`;

    db.pool.query(updateEmployee, function (error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.send(rows);
        }
    })
});

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});