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
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add a employee', 'update an employee role']
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
    const sql = `select employee.id, employee.first_name, employee.last_name, 
    employeeRole.title as role,
    employeeRole.salary as salary
    from employeeRole
    left join employee on employeeRole.id = employee.role_id`;
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
            choices: ['sales', 'hr', 'engineers']
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