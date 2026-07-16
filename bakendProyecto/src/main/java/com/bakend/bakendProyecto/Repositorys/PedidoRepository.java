package com.bakend.bakendProyecto.Repositorys;

import com.bakend.bakendProyecto.Modelo.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByClienteIdCliente(Long idCliente);
}
