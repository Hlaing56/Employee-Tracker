INSERT INTO department (name)
VALUES
  ('sales'),
  ('hr'),
  ('engineers');

INSERT INTO employeeRole (title, salary, department_id)
VALUES
  ('salesManager', 100.00, 2),
  ('hrManager', 150.00, 3),
  ('engineersManager', 200.00, 1),
  ('sales', 50.00, 2),
  ('hr', 75.00, 3),
  ('engineers', 100.00, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('bob', 'mick', 20, NULL),
  ('mark', 'jacobs', 15, NULL),
  ('james', 'mac', 2, NULL),
  ('tim', 'tat', 52, 20),
  ('tom', 'fae', 73, 15),
  ('max', 'crow', 10, 2);