package com.josh.data;

import com.josh.model.Employee;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class EmployeeRepository {

    private List<Employee> employeeList = new ArrayList<>();

    public List<Employee> getEmployees() {
        return employeeList;
    }

    public Employee addEmployee(Employee employee) {
        employeeList.add(employee);
        return employee;
    }
}
