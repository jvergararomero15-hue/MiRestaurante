package com.bakend.bakendProyecto.Controllers;

import com.bakend.bakendProyecto.Modelo.Cliente;
import com.bakend.bakendProyecto.Modelo.Mesa;
import com.bakend.bakendProyecto.Modelo.Reserva;
import com.bakend.bakendProyecto.Repositorys.ClienteRepository;
import com.bakend.bakendProyecto.Repositorys.MesaRepository;
import com.bakend.bakendProyecto.Services.ReservaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/reservas")
@Slf4j
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @Autowired
    private MesaRepository mesaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private com.bakend.bakendProyecto.Repositorys.ReservaRepository reservaRepository;

    @GetMapping
    public List<Reserva> listar() {
        return reservaService.listar();
    }

    @GetMapping("/{id}")
    public Optional<Reserva> buscar(@PathVariable Long id) {
        return reservaService.buscarPorId(id);
    }

    @PostMapping
    public ResponseEntity<?> guardar(@RequestBody Map<String, Object> body) {

        if (body.get("fecha") == null || body.get("hora") == null || body.get("cantidadPersonas") == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Los campos fecha, hora y cantidadPersonas son obligatorios"));
        }

        LocalDate fecha = LocalDate.parse((String) body.get("fecha"));
        String hora = (String) body.get("hora");

        if (body.get("mesaId") != null) {
            Long mesaId = Long.valueOf(body.get("mesaId").toString());

            long conflictos = reservaRepository.existeReservaActiva(mesaId, fecha, hora);
            if (conflictos > 0) {
                log.warn("Conflicto de reserva para mesa {} en {} {}", mesaId, fecha, hora);
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Esa mesa ya está reservada para esa fecha y hora"));
            }
        }

        Reserva reserva = new Reserva();

        reserva.setFecha(fecha);
        reserva.setHora(hora);
        reserva.setCantidadPersonas(Integer.valueOf(body.get("cantidadPersonas").toString()));
        reserva.setEstado((String) body.getOrDefault("estado", "Activa"));

        if (body.get("mesaId") != null) {
            Long mesaId = Long.valueOf(body.get("mesaId").toString());
            mesaRepository.findById(mesaId).ifPresent(reserva::setMesa);
        }

        if (body.get("clienteId") != null) {
            Long clienteId = Long.valueOf(body.get("clienteId").toString());
            clienteRepository.findById(clienteId).ifPresent(reserva::setCliente);
        }

        log.info("Creando reserva para fecha {} hora {}", fecha, hora);
        return ResponseEntity.ok(reservaService.guardar(reserva));
    }

    @PutMapping("/{id}")
    public Reserva actualizar(@PathVariable Long id,
                              @RequestBody Reserva reserva) {
        log.info("Actualizando reserva ID: {}", id);
        return reservaService.actualizar(id, reserva);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        log.info("Eliminando reserva ID: {}", id);
        reservaService.eliminar(id);
    }
}
