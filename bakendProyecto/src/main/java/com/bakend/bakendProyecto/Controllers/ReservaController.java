package com.bakend.bakendProyecto.Controllers;

import com.bakend.bakendProyecto.Modelo.Cliente;
import com.bakend.bakendProyecto.Modelo.Mesa;
import com.bakend.bakendProyecto.Modelo.Reserva;
import com.bakend.bakendProyecto.Repositorys.ClienteRepository;
import com.bakend.bakendProyecto.Repositorys.MesaRepository;
import com.bakend.bakendProyecto.Services.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @Autowired
    private MesaRepository mesaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<Reserva> listar() {
        return reservaService.listar();
    }

    @GetMapping("/{id}")
    public Optional<Reserva> buscar(@PathVariable Long id) {
        return reservaService.buscarPorId(id);
    }

    @PostMapping
    public Reserva guardar(@RequestBody Map<String, Object> body) {

        Reserva reserva = new Reserva();

        reserva.setFecha(LocalDate.parse((String) body.get("fecha")));
        reserva.setHora((String) body.get("hora"));
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

        return reservaService.guardar(reserva);
    }

    @PutMapping("/{id}")
    public Reserva actualizar(@PathVariable Long id,
                              @RequestBody Reserva reserva) {
        return reservaService.actualizar(id, reserva);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        reservaService.eliminar(id);
    }

}
