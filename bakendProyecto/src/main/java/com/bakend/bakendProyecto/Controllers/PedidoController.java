package com.bakend.bakendProyecto.Controllers;

import com.bakend.bakendProyecto.Modelo.Cliente;
import com.bakend.bakendProyecto.Modelo.Mesa;
import com.bakend.bakendProyecto.Modelo.Pedido;
import com.bakend.bakendProyecto.Repositorys.ClienteRepository;
import com.bakend.bakendProyecto.Repositorys.MesaRepository;
import com.bakend.bakendProyecto.Services.PedidoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "*")
@Slf4j
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private MesaRepository mesaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<Pedido> listar() {
        return pedidoService.listar();
    }

    @GetMapping("/{id}")
    public Optional<Pedido> buscar(@PathVariable Long id) {
        return pedidoService.buscarPorId(id);
    }

    @PostMapping
    public Pedido guardar(@RequestBody Map<String, Object> body) {

        if (body.get("fecha") == null || body.get("total") == null) {
            throw new IllegalArgumentException("Los campos fecha y total son obligatorios");
        }

        Pedido pedido = new Pedido();

        pedido.setFecha(LocalDate.parse((String) body.get("fecha")));
        pedido.setTotal(Double.valueOf(body.get("total").toString()));
        pedido.setEstado((String) body.getOrDefault("estado", "Activo"));

        if (body.get("mesaId") != null) {
            Long mesaId = Long.valueOf(body.get("mesaId").toString());
            mesaRepository.findById(mesaId).ifPresent(pedido::setMesa);
        }

        if (body.get("clienteId") != null) {
            Long clienteId = Long.valueOf(body.get("clienteId").toString());
            clienteRepository.findById(clienteId).ifPresent(pedido::setCliente);
        }

        log.info("Creando pedido para fecha {} total {}", pedido.getFecha(), pedido.getTotal());
        return pedidoService.guardar(pedido);
    }

    @PutMapping("/{id}")
    public Pedido actualizar(@PathVariable Long id,
                             @RequestBody Pedido pedido) {
        log.info("Actualizando pedido ID: {}", id);
        return pedidoService.actualizar(id, pedido);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        log.info("Eliminando pedido ID: {}", id);
        pedidoService.eliminar(id);
    }
}
