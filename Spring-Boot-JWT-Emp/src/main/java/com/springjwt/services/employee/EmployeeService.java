package com.springjwt.services.employee;

import com.springjwt.model.Employee;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface EmployeeService {
    List<Employee> findEmployeeByStatus();

    Employee createEmployee(Employee employee);

    Employee getEmployeeById(Long id);

    Employee updateEmployee(Long id, Employee employeeDetails);

    ResponseEntity<Map<String, Boolean>> deleteEmployee(Long id);

}
