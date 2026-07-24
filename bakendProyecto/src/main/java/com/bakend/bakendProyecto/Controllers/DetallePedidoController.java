package com.bakend.bakendProyecto.Controllers;

import com.bakend.bakendProyecto.Modelo.DetallePedido;
import com.bakend.bakendProyecto.Services.DetallePedidoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/detalle-pedidos")
@CrossOrigin(origins = "*")
@Slf4j
public class DetallePedidoController {

    @Autowired
    private DetallePedidoService detallePedidoService;

    @GetMapping
    public List<DetallePedido> listar() {
        return detallePedidoService.listar();
    }

    @GetMapping("/{id}")
    public Optional<DetallePedido> buscar(@PathVariable Long id) {
        return detallePedidoService.buscarPorId(id);
    }

    @PostMapping
    public DetallePedido guardar(@RequestBody DetallePedido detallePedido) {
        log.info("Creando detalle de pedido");
        return detallePedidoService.guardar(detallePedido);
    }

    @PutMapping("/{id}")
    public DetallePedido actualizar(@PathVariable Long id,
                                    @RequestBody DetallePedido detallePedido) {
        log.info("Actualizando detalle de pedido ID: {}", id);
        return detallePedidoService.actualizar(id, detallePedido);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        log.info("Eliminando detalle de pedido ID: {}", id);
        detallePedidoService.eliminar(id);
    }
}
