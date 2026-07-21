package com.bakend.bakendProyecto.Repositorys;

import com.bakend.bakendProyecto.Modelo.Plato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlatoRepository extends JpaRepository<Plato, Long> {

}