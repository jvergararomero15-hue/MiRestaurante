package com.bakend.bakendProyecto.Controllers;

import com.bakend.bakendProyecto.DTO.PlatoRequest;
import com.bakend.bakendProyecto.Modelo.Plato;
import com.bakend.bakendProyecto.Services.PlatoService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/platos")
@CrossOrigin(origins = "*")
@Slf4j
public class PlatoController {

    @Autowired
    private PlatoService platoService;

    @GetMapping
    public List<Plato> listar() {
        return platoService.listar();
    }

    @GetMapping("/{id}")
    public Optional<Plato> buscar(@PathVariable Long id) {
        return platoService.buscarPorId(id);
    }

    @PostMapping
    public Plato guardar(@Valid @RequestBody PlatoRequest request) {
        log.info("Creando plato: {}", request.getNombre());
        Plato plato = new Plato();
        plato.setNombre(request.getNombre());
        plato.setPrecio(request.getPrecio());
        plato.setDescripcion(request.getDescripcion());
        plato.setImagen(request.getImagen());
        plato.setCategoria(request.getCategoria());
        plato.setDisponible(request.getDisponible());
        return platoService.guardar(plato);
    }

    @PutMapping("/{id}")
    public Plato actualizar(@PathVariable Long id,
                            @Valid @RequestBody PlatoRequest request) {
        log.info("Actualizando plato ID: {}", id);
        Plato plato = new Plato();
        plato.setNombre(request.getNombre());
        plato.setPrecio(request.getPrecio());
        plato.setDescripcion(request.getDescripcion());
        plato.setImagen(request.getImagen());
        plato.setCategoria(request.getCategoria());
        plato.setDisponible(request.getDisponible());
        return platoService.actualizar(id, plato);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        log.info("Eliminando plato ID: {}", id);
        platoService.eliminar(id);
    }
}
