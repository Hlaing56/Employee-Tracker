INSERT INTO department (name)
VALUES
  ('sales'),
  ('hr'),
  ('engineers');

INSERT INTO employeeRole (title, salary, department_id)
VALUES
  ('salesManager', 100.00, 1),
  ('hrManager', 150.00, 2),
  ('engineersManager', 200.00, 3),
  ('sales', 50.00, 1),
  ('hr', 75.00, 2),
  ('engineers', 100.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('bob', 'mick', 1, NULL),
  ('mark', 'jacobs', 2, NULL),
  ('james', 'mac', 3, NULL),
  ('tim', 'tat', 4, 20),
  ('tom', 'fae', 5, 15),
  ('max', 'crow', 6, 2);