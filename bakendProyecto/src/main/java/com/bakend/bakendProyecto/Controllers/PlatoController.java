package com.bakend.bakendProyecto.Controllers;

import com.bakend.bakendProyecto.Modelo.Plato;
import com.bakend.bakendProyecto.Services.PlatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/platos")
@CrossOrigin(origins = "*")
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
    public Plato guardar(@RequestBody Plato plato) {
        return platoService.guardar(plato);
    }

    @PutMapping("/{id}")
    public Plato actualizar(@PathVariable Long id,
                            @RequestBody Plato plato) {
        return platoService.actualizar(id, plato);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        platoService.eliminar(id);
    }

}