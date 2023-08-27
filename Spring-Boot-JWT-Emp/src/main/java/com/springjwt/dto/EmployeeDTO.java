package com.springjwt.dto;

import lombok.Data;

@Data
public class EmployeeDTO {

    private Long id;

    private String firstName;

    private String lastName;

    private String emailId;

    private String mobileNumber;

    private boolean status;

}
