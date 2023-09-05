package com.springjwt;

import com.springjwt.entities.Employee;
import com.springjwt.repositories.EmployeeRepository;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.jupiter.api.Order;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class EmployeeTests {

    @Autowired
    private EmployeeRepository employeeRepository;

    // JUnit test for saveEmployee
    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveEmployeeTest(){

        Employee employee = Employee.builder()
                .firstName("Rajesh")
                .lastName("Patel")
                .emailId("patel@gmail.com")
                .mobileNumber("1234567890")
                .status(false)
                .id(111)
                .build();
        employeeRepository.save(employee);

        Assertions.assertThat(employee.getId()).isGreaterThan(0);
    }

    // JUnit test for getEmployeeById
    @Test
    @Order(2)
    public void getEmployeeByIdTest(){

        Employee employee = employeeRepository.findById(1L).get();

        Assertions.assertThat(employee.getId()).isEqualTo(1L);
    }

    // JUnit test for getListOfEmployees
    @Test
    @Order(3)
    public void getListOfEmployeesTest(){

        String sortDir="asc";
        String sortBy="id";
        int pageNo=0;
        int pageSize=5;

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        List<Employee> employees =  employeeRepository.findEmployeeByStatus(pageable,false);

        Assertions.assertThat(employees.size()).isGreaterThan(0);
    }

    // JUnit test for updateEmployeeTest
    @Test
    @Order(4)
    @Rollback(value = false)
    public void updateEmployeeTest(){

        Employee employee = employeeRepository.findById(1L).get();
        employee.setEmailId("ram@gmail.com");
        Employee employeeUpdated =  employeeRepository.save(employee);

        Assertions.assertThat(employeeUpdated.getEmailId()).isEqualTo("ram@gmail.com");

    }

    // JUnit test for deleteEmployeeTest
    @Test
    @Order(5)
    @Rollback(value = false)
    public void deleteEmployeeTest(){

        Employee employee = employeeRepository.findById(1L).get();
        employee.setStatus(Boolean.TRUE);
        employeeRepository.save(employee);

        Assertions.assertThat(employee.getEmailId()).isEqualTo("ram@gmail.com");
    }

}
