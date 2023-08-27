package com.springjwt.controllers;

import com.springjwt.dto.APIResponse;
import com.springjwt.dto.EmployeeDTO;
import com.springjwt.entities.Employee;
import com.springjwt.repositories.EmployeeRepository;
import com.springjwt.services.employee.EmployeeService;
import com.springjwt.util.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

//    @GetMapping("/{field}")
//    private APIResponse<List<Product>> getProductsWithSort(@PathVariable String field) {
//        List<Product> allProducts = service.findProductsWithSorting(field);
//        return new APIResponse<>(allProducts.size(), allProducts);
//    }
//
//    @GetMapping("/pagination/{offset}/{pageSize}")
//    private APIResponse<Page<Product>> getProductsWithPagination(@PathVariable int offset, @PathVariable int pageSize) {
//        Page<Product> productsWithPagination = service.findProductsWithPagination(offset, pageSize);
//        return new APIResponse<>(productsWithPagination.getSize(), productsWithPagination);
//    }

    @GetMapping("/employees")
    public APIResponse<List<Employee>> findEmployeeByStatus(
            @RequestParam(value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir

    ){
//      return employeeService.findEmployeeByStatus( pageNo,  pageSize,  sortBy,  sortDir);
        List<Employee> employee = employeeService.findEmployeeByStatus( pageNo,  pageSize,  sortBy,  sortDir);
        List<Employee> employeeTotal = employeeService.findAll();
        return new APIResponse<>(employeeTotal.size(), employee);
    }


    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody EmployeeDTO employeeDTO) {
            return employeeService.createEmployee(employeeDTO);
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody EmployeeDTO employeeDetails){
        Employee updatedEmployee = employeeService.updateEmployee(id,employeeDetails);
        return ResponseEntity.ok(updatedEmployee);
    }

    @PatchMapping("/employees/{id}/delete")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
        return employeeService.deleteEmployee(id);
    }

}
