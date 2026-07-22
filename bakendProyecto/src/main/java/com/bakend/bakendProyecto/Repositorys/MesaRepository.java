package com.bakend.bakendProyecto.Repositorys;

import com.bakend.bakendProyecto.Modelo.Mesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MesaRepository extends JpaRepository<Mesa, Long> {

    @Query("SELECT COUNT(m) FROM Mesa m WHERE m.estado = :estado")
    long contarPorEstado(String estado);

}
