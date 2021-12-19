const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      user: 'root',
      password: 'h',
      database: 'EmployeeTracker'
    },
    console.log('Connected to the EmployeeTracker database.')
);

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    main();
});

function main(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'main',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add a employee', 'Update an employee role', 'test', 'done']
        }
    ]).then (data => {
        switch(data.main){
            case 'View all departments':
                viewDepartment();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add a employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployee();
                break;
            case 'test':
                test();
                break;
            case 'done':
                break;
        }
    })
};

function viewDepartment(){
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, tab) => {
        if (err) throw err;
        console.table(tab);
        main();
    })
};

function viewRoles(){
    const sql = `select employeeRole.id, employeeRole.title, employeeRole.salary, 
    department.name as department
    from department 
    left join employeeRole on department.id = employeeRole.department_id`;
    db.query(sql, (err, tab) => {
        if (err) throw err;
        console.table(tab);
        main();
    })
};

function viewEmployees(){
    const sql = 
    // `select employee.id, employee.first_name, employee.last_name, employeeRole.title as role, employeeRole.salary as salary
    // from employeeRole
    // join employee on employeeRole.id = employee.role_id`;
    `SELECT e.id, e.first_name, e.last_name, r.title as role, r.salary as salary,
    CONCAT(mgr.first_name, ' ',mgr.last_name) AS Manager FROM employee AS e 
    JOIN employeeRole AS r ON e.role_id = r.id 
    LEFT JOIN employee AS mgr ON e.manager_id = mgr.id`
    db.query(sql, (err, tab) => {
        if (err) throw err;
        console.table(tab);
        main();
    })
};

function addDepartment(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'What is the name of the new department?'
        }
    ]).then (data => {
        const params = [data.newDepartment];
        const sql = `INSERT INTO department (name)VALUES (?)`;
        db.query(sql, params, (err, tab) => {
        if (err) throw err;
        main();
        })
    })
};

function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'What is the name of the new title?'
        },
        {
            type: 'input',
            name: 'newSalary',
            message: 'What is the salary of this role?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'What department is this role in?',
            choices: ['sales', 'hr', 'engineers',]
        },
    ]).then (data => {
        if (data.department === 'sales') {
            data.department = 1;
        } else if (data.department === 'hr') {
            data.department = 2;
        } else if (data.department === 'engineers') {
            data.department = 3;
        };
        const params = [data.newRole, data.newSalary, data.department];
        const sql = `INSERT INTO employeeRole (title, salary, department_id)VALUES (?,?,?)`;
        db.query(sql, params, (err, tab) => {
        if (err) throw err;
        main();
        })
    })
};

function addEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is your first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is your last name?'
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is your role?',
            choices: ['salesManager', 'salesPerson', 'hrManager', 'hrStaff', 'engineersManager', 'softwareEngineer']
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is your manager?',
            choices: ['Bob Mick', 'Mark Jacobs', 'James Mac', 'Nobody']
        }
    ]).then (data => {
        if (data.role === 'salesManager') {
            data.role = 1;
        } else if (data.role === 'salesPerson') {
            data.role = 2;
        } else if (data.role === 'hrManager') {
            data.role = 3;
        } else if (data.role === 'hrStaff') {
            data.role = 4;
        } else if (data.role === 'engineersManager') {
            data.role = 5;
        } else if (data.role === 'softwareEngineer') {
            data.role = 6;
        };

        if (data.manager === 'Bob Mick') {
            data.manager = 1;
        } else if (data.manager === 'Mark Jacobs') {
            data.manager = 2;
        } else if (data.manager === 'James Mac') {
            data.manager = 3;
        } else if (data.manager === 'Nobody') {
            data.manager = null;
        };
        const params = [data.firstName, data.lastName, data.role, data.manager];
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)VALUES (?,?,?,?)`;
        db.query(sql, params, (err, tab) => {
        if (err) throw err;
        main();
        })
    })
};

function updateEmployee(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Who is the employee?',
            choices: ['Bob Mick', 'Mark Jacobs', 'James Mac', 'Tim Tat', 'Tom Fae', 'Max Crow']
        },
        {
            type: 'list',
            name: 'role',
            message: 'Where to put?',
            choices: ['salesManager', 'salesPerson', 'hrManager', 'hrStaff', 'engineersManager', 'softwareEngineer']
        }
    ]).then (data => {
        if (data.role === 'salesManager') {
            data.role = 1;
        } else if (data.role === 'salesPerson') {
            data.role = 2;
        } else if (data.role === 'hrManager') {
            data.role = 3;
        } else if (data.role === 'hrStaff') {
            data.role = 4;
        } else if (data.role === 'engineersManager') {
            data.role = 5;
        } else if (data.role === 'softwareEngineer') {
            data.role = 6;
        };

        if (data.employee === 'Bob Mick') {
            data.employee = 1;
        } else if (data.employee === 'Mark Jacobs') {
            data.employee = 2;
        } else if (data.employee === 'James Mac') {
            data.employee = 3;
        } else if (data.employee === 'Tim Tat') {
            data.employee = 4;
        } else if (data.employee === 'Tom Fae') {
            data.employee = 5;
        } else if (data.employee === 'Max Crow') {
            data.employee = 6;
        };
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
        const params = [data.role, data.employee];
        db.query(sql, params, (err, tab) => {
            if (err) throw err;
            main();
        })
    })
};