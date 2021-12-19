INSERT INTO department (name)
VALUES
  ('sales'),
  ('hr'),
  ('engineers');

INSERT INTO employeeRole (title, salary, department_id)
VALUES
  ('salesManager', 100.00, 1),
  ('salesPerson', 50.00, 1),
  ('hrManager', 150.00, 2),
  ('hrStaff', 75.00, 2),
  ('engineersManager', 200.00, 3),
  ('softwareEngineer', 100.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Bob', 'Mick', 1, NULL),
  ('Mark', 'Jacobs', 2, 1),
  ('James', 'Mac', 3, NULL),
  ('Tim', 'Tat', 4, 3),
  ('Tom', 'Fae', 5, NULL),
  ('Max', 'Crow', 6, 5);