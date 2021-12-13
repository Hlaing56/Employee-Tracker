DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS employeeRole;
DROP TABLE IF EXISTS department;



CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE employeeRole (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(5,2),
  department_id INTEGER,
  CONSTRAINT fk_role FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER,
  CONSTRAINT fk_roleId FOREIGN KEY (role_id) REFERENCES employeeRole(id) ON DELETE SET NULL,
  CONSTRAINT fk_managerId FOREIGN KEY (manager_id) REFERENCES employee(id)
);
