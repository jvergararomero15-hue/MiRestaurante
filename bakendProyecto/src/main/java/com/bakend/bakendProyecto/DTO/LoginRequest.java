package com.bakend.bakendProyecto.DTO;

import lombok.Data;

@Data
public class LoginRequest {

    private String email;
    private String password;

}