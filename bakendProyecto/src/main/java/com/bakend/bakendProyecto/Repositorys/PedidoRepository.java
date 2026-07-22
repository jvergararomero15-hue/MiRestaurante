package com.bakend.bakendProyecto.Repositorys;

import com.bakend.bakendProyecto.Modelo.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido> findByFecha(LocalDate fecha);

    @Query("SELECT COALESCE(SUM(p.total), 0.0) FROM Pedido p WHERE p.fecha = :fecha AND p.estado = 'Cobrado'")
    Double totalVentasPorFecha(@Param("fecha") LocalDate fecha);

    @Query("SELECT COUNT(p) FROM Pedido p WHERE p.fecha = :fecha")
    long contarPedidosPorFecha(@Param("fecha") LocalDate fecha);

    @Query("SELECT COALESCE(SUM(p.total), 0.0) FROM Pedido p WHERE p.estado = 'Cobrado'")
    Double totalVentasGeneral();

}
