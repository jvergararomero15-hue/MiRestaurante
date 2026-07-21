package com.bakend.bakendProyecto.Repositorys;

import com.bakend.bakendProyecto.Modelo.DetallePedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetallePedidoRepository extends JpaRepository<DetallePedido, Long> {

}