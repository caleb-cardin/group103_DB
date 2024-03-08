-- CS 340 : Project Step 3 DDL with Sample Data
-- Group 103: Sharon Bousso, Caleb Cardin
-- Last edited: 02-15-24
-- Contains project data definition queries and sample data insert statements

-- -----------------------------------------------------
-- Table `Orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Orders` (
  orderID INT UNSIGNED NOT NULL AUTO_INCREMENT,
  orderRequest VARCHAR(255) NULL,
  PRIMARY KEY (orderID),
  UNIQUE INDEX idorders_UNIQUE (orderID ASC));

-- -----------------------------------------------------
-- Table `Assignments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Assignments` (
  assignmentID INT UNSIGNED NOT NULL AUTO_INCREMENT,
  isComplete TINYINT NULL DEFAULT 0,
  employeeNotes VARCHAR(255) NULL,
  fkOrderID INT UNSIGNED NOT NULL,
  PRIMARY KEY (assignmentID),
  CONSTRAINT fk_Assignments_Orders1
    FOREIGN KEY (fkOrderID)
    REFERENCES `Orders` (orderID)
    ON DELETE CASCADE);

-- -----------------------------------------------------
-- Table `Customers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Customers` (
  customerID INT UNSIGNED NOT NULL AUTO_INCREMENT,
  customerEmail VARCHAR(255) NOT NULL,
  customerName VARCHAR(255) NOT NULL,
  PRIMARY KEY (customerID),
  UNIQUE INDEX idcustomers_UNIQUE (customerID ASC));

-- -----------------------------------------------------
-- Table `Employees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Employees` (
  employeeID INT UNSIGNED NOT NULL AUTO_INCREMENT,
  employeeEmail VARCHAR(255) NOT NULL,
  employeeName VARCHAR(255) NOT NULL,
  PRIMARY KEY (employeeID),
  UNIQUE INDEX idemployees_UNIQUE (employeeID ASC));


-- -----------------------------------------------------
-- Table `Customers_has_Orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CustomersHasOrders` (
  customerOrderID INT UNSIGNED NOT NULL AUTO_INCREMENT,
  fkCustomerID INT UNSIGNED NOT NULL,
  fkOrderID INT UNSIGNED NOT NULL,
  PRIMARY KEY (customerOrderID),
  INDEX fk_customers_has_orders_orders1_idx (fkOrderID ASC),
  INDEX fk_customers_has_orders_customers1_idx (fkCustomerID ASC),
  CONSTRAINT fk_customers_has_orders_customers1
    FOREIGN KEY (fkCustomerID)
    REFERENCES `Customers` (customerID)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT fk_customers_has_orders_orders1
    FOREIGN KEY (fkOrderID)
    REFERENCES `Orders` (orderID)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `AssignmentsHasEmployees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AssignmentsHasEmployees` (
  assignmentEmployeeID INT UNSIGNED NOT NULL AUTO_INCREMENT,
  fkAssignmentID INT UNSIGNED NOT NULL,
  fkEmployeeID INT UNSIGNED NOT NULL,
  PRIMARY KEY (assignmentEmployeeID),
  INDEX fk_assignments_has_employees_employees1_idx (fkEmployeeID ASC),
  INDEX fk_assignments_has_employees_assignments1_idx (fkAssignmentID ASC),
  CONSTRAINT fk_assignments_has_employees_assignments1
    FOREIGN KEY (fkAssignmentID)
    REFERENCES `Assignments` (assignmentID)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT fk_assignments_has_employees_employees1
    FOREIGN KEY (fkEmployeeID)
    REFERENCES `Employees` (employeeID)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

-- -----------------------------------------------------
-- Inserts
-- -----------------------------------------------------

-- Insert data into the Customers table
INSERT INTO Customers (customerID, customerEmail, customerName)
VALUES
    (1, 'bigdata@data.data', 'BigData Co.'),
    (2, 'localfarmsMGMT@farms.com', 'LocalFarmersDB'),
    (3, 'sandyapples@apples.com', 'Sandy Arthurs Apples'),
    (4, 'john_frill@hello.com', 'Johnny Frillkist');
    
-- Insert data into the Employees table
INSERT INTO Employees (employeeID, employeeEmail, employeeName)
VALUES
    (1, 'joeF@dbRus.com', 'Joe Friday'),
    (2, 'maryA@dbRus.com', 'Mary Alberteen'),
    (3, 'carolS@dbRus.com', 'Carol Smith'),
    (4, 'daveV@dbRus.com', 'Dave Vermation');

-- Insert data into the Orders table
INSERT INTO Orders (orderID, orderRequest)
VALUES
    (1, 'Need to update/ add to stock types on existing DB'),
    (2, 'Dropped entire DB - need help!'),
    (3, 'Need new query to find all apples of a particular variety and weight'),
    (4, 'Need to create a new DBMS for my company');
    
    -- Insert data into the Assignments table
INSERT INTO Assignments (assignmentID, isComplete, employeeNotes, fkOrderID)
VALUES
    (1, TRUE, '1 - Started work on mm-dd-yy, 2 - Mary joined assignment, 3 - Completed mm-dd-yy', 1),
    (2, FALSE, '1 - Carol and Mary started work dd-mm-yy', 3),
    (3, FALSE, '1 - Dave started mm-dd-yy', 4);

-- Insert data into the Customers_has_Orders table
INSERT INTO CustomersHasOrders (customerOrderID, fkCustomerID, fkOrderID)
VALUES
    (1, 2, 1),
    (2, 1, 2),
    (3, 3, 3),
    (4, 2, 3),
    (5, 4, 4);
    
-- Insert data into the Assignments_has_Employees table
INSERT INTO AssignmentsHasEmployees (assignmentEmployeeID, fkAssignmentID, fkEmployeeID)
VALUES
    (1, 1, 1),
    (2, 1, 2),
    (3, 2, 2),
    (4, 2, 3),
    (5, 3, 4);
