package com.bakend.bakendProyecto.Controllers;

import com.bakend.bakendProyecto.DTO.ClienteRequest;
import com.bakend.bakendProyecto.Modelo.Cliente;
import com.bakend.bakendProyecto.Services.ClienteService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "*")
@Slf4j
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public List<Cliente> listar() {
        return clienteService.listar();
    }

    @GetMapping("/{id}")
    public Optional<Cliente> buscar(@PathVariable Long id) {
        return clienteService.buscarPorId(id);
    }

    @PostMapping
    public Cliente guardar(@Valid @RequestBody ClienteRequest request) {
        log.info("Creando cliente: {} {}", request.getNombre(), request.getApellido());
        Cliente cliente = new Cliente();
        cliente.setNombre(request.getNombre());
        cliente.setApellido(request.getApellido());
        cliente.setCedula(request.getCedula());
        cliente.setCorreo(request.getCorreo());
        cliente.setTelefono(request.getTelefono());
        cliente.setDireccion(request.getDireccion());
        cliente.setEstado(request.getEstado() != null ? request.getEstado() : "Activo");
        cliente.setFechaRegistro(LocalDate.now());
        return clienteService.guardar(cliente);
    }

    @PutMapping("/{id}")
    public Cliente actualizar(@PathVariable Long id,
                              @Valid @RequestBody ClienteRequest request) {
        log.info("Actualizando cliente ID: {}", id);
        Cliente cliente = new Cliente();
        cliente.setNombre(request.getNombre());
        cliente.setApellido(request.getApellido());
        cliente.setCedula(request.getCedula());
        cliente.setCorreo(request.getCorreo());
        cliente.setTelefono(request.getTelefono());
        cliente.setDireccion(request.getDireccion());
        cliente.setEstado(request.getEstado());
        return clienteService.actualizar(id, cliente);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        log.info("Eliminando cliente ID: {}", id);
        clienteService.eliminar(id);
    }
}
