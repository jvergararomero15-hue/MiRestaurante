package com.bakend.bakendProyecto.DTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MesaRequest {

    @Min(value = 1, message = "El número de mesa debe ser mayor a 0")
    private Integer numero;

    @Min(value = 1, message = "La capacidad debe ser mayor a 0")
    private Integer capacidad;

    private String estado;
    private String reservadoPor;
}
