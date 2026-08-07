package com.bakend.bakendProyecto.Services;

import com.bakend.bakendProyecto.Modelo.Mesa;
import com.bakend.bakendProyecto.Modelo.Pedido;
import com.bakend.bakendProyecto.Modelo.Reserva;
import com.bakend.bakendProyecto.Repositorys.DetallePedidoRepository;
import com.bakend.bakendProyecto.Repositorys.MesaRepository;
import com.bakend.bakendProyecto.Repositorys.PedidoRepository;
import com.bakend.bakendProyecto.Repositorys.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MesaService {

    @Autowired
    private MesaRepository mesaRepository;

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private DetallePedidoRepository detallePedidoRepository;

    public List<Mesa> listar() {
        return mesaRepository.findAll();
    }

    public Optional<Mesa> buscarPorId(Long id) {
        return mesaRepository.findById(id);
    }

    public Mesa guardar(Mesa mesa) {
        return mesaRepository.save(mesa);
    }

    @Transactional
    public Mesa actualizar(Long id, Mesa mesa) {

        Mesa existente = mesaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mesa no encontrada"));

        if (mesa.getNumero() != null) existente.setNumero(mesa.getNumero());
        if (mesa.getCapacidad() != null) existente.setCapacidad(mesa.getCapacidad());
        if (mesa.getEstado() != null) existente.setEstado(mesa.getEstado());
        if (mesa.getReservadoPor() != null) existente.setReservadoPor(mesa.getReservadoPor());
        if (mesa.getEstado() != null && mesa.getEstado().equals("Libre")) existente.setReservadoPor(null);

        if ("Ocupada".equals(mesa.getEstado())) {
            List<Reserva> activas = reservaRepository.findByMesa_IdMesaAndEstado(id, "Activa");
            for (Reserva r : activas) {
                r.setEstado("Atendida");
                reservaRepository.save(r);
            }
        }

        return mesaRepository.save(existente);
    }

    @Transactional
    public void eliminar(Long id) {

        Mesa mesa = mesaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mesa no encontrada"));

        if (!"Libre".equals(mesa.getEstado())) {
            throw new IllegalStateException("No se puede eliminar una mesa ocupada o reservada");
        }
        if (reservaRepository.countByMesa_IdMesaAndEstado(id, "Activa") > 0) {
            throw new IllegalStateException("No se puede eliminar una mesa con reservas activas");
        }

        List<Reserva> reservas = reservaRepository.findByMesa_IdMesa(id);
        reservaRepository.deleteAll(reservas);

        List<Pedido> pedidos = pedidoRepository.findByMesa_IdMesa(id);
        for (Pedido pedido : pedidos) {
            detallePedidoRepository.deleteAll(
                    detallePedidoRepository.findByPedido_IdPedido(pedido.getIdPedido())
            );
        }
        pedidoRepository.deleteAll(pedidos);

        mesaRepository.deleteById(id);
    }

}
