-- Database Services Database Data Queries -- Authors: Sharon Bousso, Caleb Cardin -- Created 02.15.2024  -- Last Edited 02.15.2024
-- Citation for the following code snippet:
-- Date(mm/dd/YYYY): 02/15/2024 
-- Adapted from: Project Step 3 Draft Version: Design HTML Interface + DML SQL (Canvas Module 6)
-- Source URL: https://canvas.oregonstate.edu/courses/1946034/assignments/9456216 
 
-- Employees  -----------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------
-- Show all employees with their repective number of assignments 
SELECT
    Employees.employeeName,
    Employees.employeeEmail,
    COUNT(AssignmentsHasEmployees.assignmentEmployeeID) as `Assignment Count`
FROM
    Employees
LEFT JOIN AssignmentsHasEmployees ON AssignmentsHasEmployees.fkEmployeeID = Employees.employeeID
GROUP BY
    Employees.employeeName,
    Employees.employeeEmail
DESC;

-- Create a new employee
INSERT INTO Employees (employeeEmail, employeeName) VALUES ( :emailInput, :nameInput);

-- Update Employee information
UPDATE Employees SET employeeEmail = :emailInput, lname= :nameInput, 
WHERE employeeID = :employee_ID_from_update_form;

-- Delete an Employee
DELETE FROM Employees USING employeeID = :employee_ID_selected_from_browse_employee_page;



-- Assignments ----------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------
 
 -- Display assignment information along with respective order
SELECT
	Assignments.assignmentId,
    Assignments.isComplete,
    Assignments.employeeNotes,
    Orders.orderID,
    Orders.orderRequest
FROM
    Assignments
JOIN Orders ON Assignments.fkOrderID = Orders.orderID;
 
  -- Create a new assignment
INSERT INTO Assignments (isComplete, employeeNotes, fkOrderID) VALUES (:is_complete_input, :employee_notes_input, :order_ID_selected_from_create_assignment_from_order_page);
-- Assosiate an order with a Employee
INSERT INTO AssignmentsHasEmployees (fkAssignmentID, fkEmployeeID) VALUES (:assignment_ID_selected_from_add_assignment_page, :employee_ID_selected_from_add_assignment_page);

-- Update order information
UPDATE Assignments SET isComplete = :is_complete_input, employeeNotes = :employee_notes_input
WHERE assignmentID = :assignment_ID_from_update_form,


-- Delete an assignment
DELETE FROM Assignments USING assignmentID = :assignment_ID_selected_from_browse_assignment_page;


-- Orders ---------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------
 
  -- Display order information
SELECT
    Orders.orderID,
    Orders.orderRequest,
    Assignments.isComplete
FROM
	Orders
JOIN Assignments ON Orders.orderID = Assignments.fkOrderID;

 
 
 -- Create a new order
INSERT INTO Orders (orderRequest) VALUES (:request_text_input);
-- Assosiate an order with a customer
INSERT INTO CustomersHasOrders (fkCustomerID, fkOrderID) VALUES (:customer_ID_selected_from_add_order_page, :order_ID_selected_from_add_order_page);

-- Update order information
UPDATE Orders SET orderRequest = :request_text_input WHERE orderID = :order_ID_from_update_form;

-- Delete a Customer
DELETE FROM Orders USING orderID = :order_ID_selected_from_browse_order_page;

-- Customers ------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------
 
-- Show all customers with their repective number of assignments 
SELECT
    Customers.employeeName,
    Customers.employeeEmail,
    COUNT(CustomersHasOrders.assignmentOrderID) as `Order Count`
FROM
    Customers
LEFT JOIN CustomersHasOrders ON CustomersHasOrders.fkCustomerID = Customers.customerID
GROUP BY
    Customers.customerName,
    Customers.customerEmail
DESC;

-- Create a new customer
INSERT INTO Customers (customerEmail, customerName) VALUES ( :email_input, :name_input);

-- Update Employee information
UPDATE Customers SET customerEmail = :email_input, customerName= :name_input, 
WHERE customerID = :customer_ID_from_update_form;

-- Delete a Customer
DELETE FROM Customers USING customerID = :customer_ID_selected_from_browse_customer_page;



