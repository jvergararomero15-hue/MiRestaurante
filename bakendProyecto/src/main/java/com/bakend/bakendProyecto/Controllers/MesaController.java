package com.bakend.bakendProyecto.Controllers;

import com.bakend.bakendProyecto.DTO.MesaRequest;
import com.bakend.bakendProyecto.Modelo.Mesa;
import com.bakend.bakendProyecto.Services.MesaService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mesas")
@CrossOrigin(origins = "*")
@Slf4j
public class MesaController {

    @Autowired
    private MesaService mesaService;

    @GetMapping
    public List<Mesa> listar() {
        return mesaService.listar();
    }

    @GetMapping("/{id}")
    public Optional<Mesa> buscar(@PathVariable Long id) {
        return mesaService.buscarPorId(id);
    }

    @PostMapping
    public Mesa guardar(@Valid @RequestBody MesaRequest request) {
        log.info("Creando mesa número: {}", request.getNumero());
        Mesa mesa = new Mesa();
        mesa.setNumero(request.getNumero());
        mesa.setCapacidad(request.getCapacidad());
        mesa.setEstado(request.getEstado() != null ? request.getEstado() : "Libre");
        mesa.setReservadoPor(request.getReservadoPor());
        return mesaService.guardar(mesa);
    }

    @PutMapping("/{id}")
    public Mesa actualizar(@PathVariable Long id,
                           @Valid @RequestBody MesaRequest request) {
        log.info("Actualizando mesa ID: {}", id);
        Mesa mesa = new Mesa();
        mesa.setNumero(request.getNumero());
        mesa.setCapacidad(request.getCapacidad());
        mesa.setEstado(request.getEstado());
        mesa.setReservadoPor(request.getReservadoPor());
        return mesaService.actualizar(id, mesa);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        log.info("Eliminando mesa ID: {}", id);
        mesaService.eliminar(id);
    }
}
