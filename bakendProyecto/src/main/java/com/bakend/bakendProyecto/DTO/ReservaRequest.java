package com.bakend.bakendProyecto.DTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ReservaRequest {

    @NotBlank(message = "La fecha es obligatoria")
    private String fecha;

    @NotBlank(message = "La hora es obligatoria")
    private String hora;

    @Min(value = 1, message = "La cantidad de personas debe ser mayor a 0")
    private Integer cantidadPersonas;

    private String estado;
    private Long mesaId;
    private Long clienteId;
}
