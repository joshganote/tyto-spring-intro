console.log('Hey there!');
$(document).ready(init);

const employeeArray = [];

function init() {
    console.log('init');
    $('#employeeSubmitForm').on('submit', submitEmployeeForm);
    getEmployee();
}

function submitEmployeeForm(event) {
    event.preventDefault();
    console.log('submitEmployeeForm');
    const employeeFormObject = {

        "id": $('.iDNumber').val(),
        "firstName": $('.firstName').val(),
        "lastName": $('.lastName').val(),
        "position": $('.position').val(),
        "salary": $('.salary').val(),
    }
    addToEmployeeArray(employeeFormObject)
    postEmployee(employeeFormObject);
    resetInputs();

}

function addToEmployeeArray(employeeFormObject) {
    employeeArray.push(employeeFormObject);
}

function resetInputs() {

    $('.iDNumber').val('');
    $('.firstName').val('');
    $('.lastName').val('');
    $('.position').val('');
    $('.salary').val('');
}

function getEmployee() {
    $.ajax({
        method: 'GET',
        url: '/api/employees/all',
    })
        .then(function (response) {
            console.log('GET employee', response);
            render(response);
        })
        .catch(function(err) {
            console.log(`couldn't GET employee`, err);
        })
        // render(true);
        // console.log('employees on the way');
}

function postEmployee(new_employee) {
    console.log('POST', new_employee);
    console.log(new_employee);
    $.ajax({
        contentType: 'application/json',
        method: 'POST',
        url: '/api/employee/add',
        data: JSON.stringify(new_employee),
    })
    .then(function(response) {
        console.log('employee added', response);
        getEmployee();
    })
    .catch(function(err) {
        console.log(`couldn't POST employee`, err)
    })
}


function render() {
    const $getEmployee = $('.getEmployee');

    $getEmployee.empty();
    for (let i = 0; i < employeeArray.length; i++) {
        const employee = employeeArray[i];
        $getEmployee.append(`
        <li data-id="${i}">
            <p>${employee.id}</p>
            <p>${employee.firstName}</p>
            <p>${employee.lastName}</p>
            <p>${employee.position}</p>
            <p>${employee.salary}</p>
        <li>
        `);
    }

}