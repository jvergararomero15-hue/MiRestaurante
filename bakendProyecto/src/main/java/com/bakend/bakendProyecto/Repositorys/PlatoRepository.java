package com.bakend.bakendProyecto.Repositorys;


import com.bakend.bakendProyecto.Modelo.Plato;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlatoRepository extends JpaRepository<Plato, Long> {
    List<Plato> findByDisponible(String disponible);
}
