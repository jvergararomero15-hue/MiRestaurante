package com.bakend.bakendProyecto.Servicios;

import com.bakend.bakendProyecto.Modelo.Usuario;
import com.bakend.bakendProyecto.Repositorys.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepositorio;

    public UsuarioService(UsuarioRepository usuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
    }

    public Optional<Usuario> login(String email, String password) {
        return usuarioRepositorio.findByEmail(email)
                .filter(u -> u.getPassword().equals(password));
    }
    
    public Usuario register(Usuario usuario) {
        usuario.setRol("CLIENTE");
        usuario.setFechaRegistro(LocalDate.now());
        return usuarioRepositorio.save(usuario);
    }
}