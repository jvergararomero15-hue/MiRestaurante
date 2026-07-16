package com.bakend.bakendProyecto.Modelo;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "DETALLE_PEDIDO")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetallePedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDetalle;
    
    @ManyToOne
    @JoinColumn(name = "id_pedido")
    private Pedido pedido;
    
    @ManyToOne
    @JoinColumn(name = "id_plato")
    private Plato plato;
    
    private Integer cantidad;
    private Double precioUnitario;
}