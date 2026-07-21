package com.bakend.bakendProyecto.Controllers;

import com.bakend.bakendProyecto.Modelo.Mesa;
import com.bakend.bakendProyecto.Services.MesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mesas")
@CrossOrigin(origins = "*")
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
    public Mesa guardar(@RequestBody Mesa mesa) {
        return mesaService.guardar(mesa);
    }

    @PutMapping("/{id}")
    public Mesa actualizar(@PathVariable Long id,
                           @RequestBody Mesa mesa) {
        return mesaService.actualizar(id, mesa);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        mesaService.eliminar(id);
    }

}