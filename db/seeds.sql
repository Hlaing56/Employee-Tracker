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
  ('bob', 'mick', 1, NULL),
  ('mark', 'jacobs', 2, NULL),
  ('james', 'mac', 3, NULL),
  ('tim', 'tat', 4, 1),
  ('tom', 'fae', 5, 2),
  ('max', 'crow', 6, 3);