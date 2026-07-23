package com.bakend.bakendProyecto.Repositorys;

import com.bakend.bakendProyecto.Modelo.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    List<Reserva> findByFecha(LocalDate fecha);

    @Query("SELECT COUNT(r) FROM Reserva r WHERE r.fecha = :fecha AND r.estado = :estado")
    long contarPorFechaYEstado(@Param("fecha") LocalDate fecha, @Param("estado") String estado);

    @Query("SELECT COUNT(r) FROM Reserva r WHERE r.mesa.idMesa = :mesaId AND r.fecha = :fecha AND r.hora = :hora AND r.estado = 'Activa'")
    long existeReservaActiva(@Param("mesaId") Long mesaId, @Param("fecha") LocalDate fecha, @Param("hora") String hora);

}
