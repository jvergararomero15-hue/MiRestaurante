package com.bakend.bakendProyecto.Modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "MESA")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Mesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_MESA")
    private Long idMesa;

    @Column(name = "NUMERO")
    private Integer numero;

    @Column(name = "CAPACIDAD")
    private Integer capacidad;

    @Column(name = "ESTADO")
    private String estado;

    @Column(name = "RESERVADO_POR")
    private String reservadoPor;

}