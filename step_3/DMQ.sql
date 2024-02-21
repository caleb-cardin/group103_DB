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




-- AssignmentsHasEmployees ----------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------

SELECT * FROM AssignmentsHasEmployees;

-- Display single Assignment's Employees
SELECT
    AssignmentsHasEmployees.fkEmployeeID,
FROM
	Assignments
JOIN AssignmentsHasEmployees ON AssignmentsHasEmployees.fkAssignmentID = :assignment_id_selected_from_search_by_assignment_page;
 

-- Display single Employee's Assignments
SELECT
    AssignmentsHasEmployees.fkAssignmentID,
FROM
	Employees
JOIN AssignmentsHasEmployees ON AssignmentsHasEmployees.fkEmployeeID = :employee_id_selected_from_search_by_employees_page;


-- Associate an Assignment with a Employee
INSERT INTO AssignmentsHasEmployees (fkAssignmentID, fkEmployeeID) VALUES (:assignment_id_selected_from_add_assignment_page, :employee_id_selected_from_add_assignment_page);

-- ON UPDATE NO ACTION

-- Manually deleting a single relationship by its PK.
DELETE FROM AssignmentsHasEmployees USING assignmentEmployeeID = :assignment_employee_id_selected_from_browse_assignments_employees_page;

-- Manually deleting all relationships between an Assignment and its Employees.
DELETE FROM AssignmentsHasEmployees USING fkAssignmentID = :assignment_id_selected_from_delete_assignment_employees_page;

-- Manually deleting all relationships between an Employee and its Assignments.
DELETE FROM AssignmentsHasEmployees USING fkEmployeeID = :employee_id_selected_from_delete_assignments_employees_page;





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
INSERT INTO Assignments (isComplete, employeeNotes, fkOrderID) VALUES (:is_complete_input, :employee_notes_input, :order_id_selected_from_create_assignment_via_order_page);

-- Update order information
UPDATE Assignments SET isComplete = :is_complete_input, employeeNotes = :employee_notes_input
WHERE assignmentID = :assignment_id_from_update_form,


-- Delete an assignment (entries in intersection are cascaded)
DELETE FROM Assignments USING assignmentID = :assignment_ID_selected_from_browse_assignment_page;




-- Orders ---------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------
 
  -- Display all order information
SELECT
    Orders.orderID,
    Orders.orderRequest,
    Orders.fkAssignmentID,
FROM
	Orders
JOIN Assignments ON Orders.orderID = Assignments.fkOrderID;

 -- Create a new order
INSERT INTO Orders (orderRequest) VALUES (:request_text_input);

-- Update order information
UPDATE Orders SET orderRequest = :request_text_input WHERE orderID = :order_id_from_update_form;

-- Delete a order
DELETE FROM Orders USING orderID = :order_id_selected_from_browse_order_page;

-- Cleaning up /deleting all orders left hanging from deleted customers
DELETE FROM Orders WHERE Orders.orderID NOT IN (SELECT CustomersHasOrders.fkOrderID FROM CustomersHasOrders);




-- CustomersHasOrders ---------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------

-- Display all entries 
SELECT * FROM CustomersHasOrders;

-- Display single Customer's Orders
SELECT
    CustomersHasOrders.fkOrderID,
FROM
	Orders
JOIN CustomersHasOrders ON CustomersHasOrders.fkCustomerID = :customer_id_selected_from_search_by_customer_page;
 

-- Display single Order's Customers
SELECT
    CustomersHasOrders.fkCustomerID,
FROM
	Customers
JOIN CustomersHasOrders ON CustomersHasOrders.fkOrderID = :order_id_selected_from_search_by_orders_page;

-- Associate an order with a customer
INSERT INTO CustomersHasOrders (fkCustomerID, fkOrderID) VALUES (:customer_id_selected_from_add_order_page, :order_id_selected_from_add_order_page);

-- ON UPDATE NO ACTION

-- Manually deleting a single relationship by its PK.
DELETE FROM CustomersHasOrders USING customersOrdersID = :customer_order_id_selected_from_customers_orders_page;

-- Manually deleting all relationships between an order and its customers.
DELETE FROM CustomersHasOrders USING fkOrdersID = :order_id_selected_from_delete_customers_orders_page;

-- Manually deleting all relationships between an customers and its orders.
DELETE FROM CustomersHasOrders USING fkCustomerID = :customer_id_selected_from_delete_customers_orders_page;




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
WHERE customerID = :customer_id_from_update_form;

-- Delete a Customer (entries in intersection are cascaded)
DELETE FROM Customers USING customerID = :customer_id_selected_from_browse_customer_page;



