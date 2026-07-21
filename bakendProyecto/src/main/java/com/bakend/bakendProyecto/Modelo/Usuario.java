package com.bakend.bakendProyecto.Modelo;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "USUARIO")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_USUARIO")
    private Long idUsuario;

    @Column(name = "NOMBRE")
    private String nombre;

    @Column(name = "APELLIDO")
    private String apellido;

    @Column(name = "CORREO")
    private String correo;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "TELEFONO")
    private String telefono;

    @Column(name = "ROL")
    private String rol;

    @Column(name = "ESTADO")
    private String estado;

    @Column(name = "FECHA_REGISTRO")
    private LocalDate fechaRegistro;

}