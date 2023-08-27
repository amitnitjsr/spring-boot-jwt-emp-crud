package com.springjwt.services.employee;

import com.springjwt.dto.EmployeeDTO;
import com.springjwt.entities.Employee;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface EmployeeService {
    List<Employee> findEmployeeByStatus();

    Employee createEmployee(EmployeeDTO employeeDTO);

    Employee getEmployeeById(Long id);

//    Employee updateEmployee(Long id, Employee employeeDetails);
Employee updateEmployee(Long id, EmployeeDTO employeeDetails);

    ResponseEntity<Map<String, Boolean>> deleteEmployee(Long id);

}
