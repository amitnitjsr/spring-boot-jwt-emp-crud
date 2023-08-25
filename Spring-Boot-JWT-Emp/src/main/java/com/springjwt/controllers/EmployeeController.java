package com.springjwt.controllers;

import com.springjwt.model.Employee;
import com.springjwt.repositories.EmployeeRepository;
import com.springjwt.services.employee.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/employees")

    public List<Employee> findEmployeeByStatus(){
        return employeeService.findEmployeeByStatus();
    }

    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeService.createEmployee(employee);
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails){
        Employee updatedEmployee = employeeService.updateEmployee(id,employeeDetails);
        return ResponseEntity.ok(updatedEmployee);
    }

    @PatchMapping("/employees/{id}/delete")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
        return employeeService.deleteEmployee(id);
    }

}
