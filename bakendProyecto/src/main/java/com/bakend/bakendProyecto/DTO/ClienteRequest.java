package com.bakend.bakendProyecto.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ClienteRequest {

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "El apellido es obligatorio")
    private String apellido;

    @NotBlank(message = "La cédula es obligatoria")
    private String cedula;

    @Email(message = "El correo debe ser válido")
    private String correo;

    @Size(min = 10, message = "El teléfono debe tener al menos 10 caracteres")
    private String telefono;

    private String direccion;
    private String estado;
}
