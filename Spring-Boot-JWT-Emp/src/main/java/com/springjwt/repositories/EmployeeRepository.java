package com.springjwt.repositories;

import com.springjwt.entities.Employee;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long> {

    public List<Employee> findEmployeeByStatus(Pageable pageable, Boolean b);

}
