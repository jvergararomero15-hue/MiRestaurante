package com.bakend.bakendProyecto.Modelo;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "PLATOS")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Plato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPlato;
    
    private String nombre;
    private String descripcion;
    private Double precio;
    private String imagenUrl;
    private String categoria;
    private String disponible;
}
