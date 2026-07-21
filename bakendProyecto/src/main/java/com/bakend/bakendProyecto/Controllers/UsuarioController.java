package com.bakend.bakendProyecto.Controllers;

import com.bakend.bakendProyecto.Modelo.Usuario;
import com.bakend.bakendProyecto.Services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Listar todos
    @GetMapping
    public List<Usuario> listar() {
        return usuarioService.listar();
    }

    // Buscar por ID
    @GetMapping("/{id}")
    public Optional<Usuario> buscar(@PathVariable Long id) {
        return usuarioService.buscarPorId(id);
    }

    // Crear usuario
    @PostMapping
    public Usuario guardar(@RequestBody Usuario usuario) {
        return usuarioService.guardar(usuario);
    }

    // Actualizar usuario
    @PutMapping("/{id}")
    public Usuario actualizar(@PathVariable Long id,
                              @RequestBody Usuario usuario) {
        return usuarioService.actualizar(id, usuario);
    }

    // Eliminar usuario
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        usuarioService.eliminar(id);
    }

}