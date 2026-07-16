package com.bakend.bakendProyecto.Repositorys;

import com.bakend.bakendProyecto.Modelo.DetallePedido;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DetallePedidoRepository extends JpaRepository<DetallePedido, Long> {
    List<DetallePedido> findByPedidoIdPedido(Long idPedido);
}