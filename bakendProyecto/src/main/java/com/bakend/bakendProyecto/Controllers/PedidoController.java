package com.bakend.bakendProyecto.Controllers;

import com.bakend.bakendProyecto.Modelo.Cliente;
import com.bakend.bakendProyecto.Modelo.Mesa;
import com.bakend.bakendProyecto.Modelo.Pedido;
import com.bakend.bakendProyecto.Repositorys.ClienteRepository;
import com.bakend.bakendProyecto.Repositorys.MesaRepository;
import com.bakend.bakendProyecto.Services.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "*")
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

        return pedidoService.guardar(pedido);
    }

    @PutMapping("/{id}")
    public Pedido actualizar(@PathVariable Long id,
                             @RequestBody Pedido pedido) {
        return pedidoService.actualizar(id, pedido);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        pedidoService.eliminar(id);
    }

}