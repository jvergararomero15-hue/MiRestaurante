package com.bakend.bakendProyecto.Services;

import com.bakend.bakendProyecto.Modelo.Usuario;
import com.bakend.bakendProyecto.Repositorys.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }


    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }


    public Optional<Usuario> buscarPorCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo);
    }


    public Usuario guardar(Usuario usuario) {

        // Encripta la contraseña antes de guardar
        usuario.setPassword(
                passwordEncoder.encode(usuario.getPassword())
        );

        return usuarioRepository.save(usuario);
    }


    public Usuario actualizar(Long id, Usuario usuario) {

        Usuario usuarioActual = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));


        usuarioActual.setNombre(usuario.getNombre());
        usuarioActual.setApellido(usuario.getApellido());
        usuarioActual.setCorreo(usuario.getCorreo());
        usuarioActual.setTelefono(usuario.getTelefono());
        usuarioActual.setRol(usuario.getRol());
        usuarioActual.setEstado(usuario.getEstado());
        usuarioActual.setFechaRegistro(usuario.getFechaRegistro());


        // Solo cambia contraseña si llega una nueva
        if (usuario.getPassword() != null 
                && !usuario.getPassword().isEmpty()) {

            usuarioActual.setPassword(
                    passwordEncoder.encode(usuario.getPassword())
            );
        }


        return usuarioRepository.save(usuarioActual);
    }


    public void eliminar(Long id) {
        usuarioRepository.deleteById(id);
    }

}